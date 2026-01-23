import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 30000, // ✅ Augmenté à 30s pour les connexions lentes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ✅ OPTIMISATION 1: Cache intelligent avec TTL
const cache = new Map();
const CACHE_TTL = {
  auth: 5 * 60 * 1000,      // 5 min pour auth
  news: 2 * 60 * 1000,      // 2 min pour news
  static: 10 * 60 * 1000,   // 10 min pour données statiques
};

function getCacheKey(config) {
  return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
}

function getFromCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

function setCache(key, data, ttl = CACHE_TTL.static) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

export function clearCache(pattern) {
  if (!pattern) {
    cache.clear();
    return;
  }
  
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

// ✅ OPTIMISATION 2: Retry automatique avec backoff exponentiel
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 seconde

async function retryRequest(config, retryCount = 0) {
  try {
    return await axios(config);
  } catch (error) {
    // Ne pas retry sur 4xx (sauf 408 timeout et 429 rate limit)
    const shouldRetry = 
      retryCount < MAX_RETRIES &&
      (!error.response || 
       error.response.status === 408 || 
       error.response.status === 429 ||
       error.response.status >= 500 ||
       error.code === 'ECONNABORTED');

    if (!shouldRetry) {
      throw error;
    }

    // Backoff exponentiel: 1s, 2s, 4s
    const delay = RETRY_DELAY * Math.pow(2, retryCount);
    
    if (import.meta.env.MODE === 'development') {
      console.log(`🔄 Retry ${retryCount + 1}/${MAX_RETRIES} dans ${delay}ms...`);
    }

    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(config, retryCount + 1);
  }
}

// ✅ OPTIMISATION 3: Request Interceptor avec cache et deduplication
const pendingRequests = new Map();

api.interceptors.request.use(
  async (config) => {
    // Ajouter le token
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Cache pour GET requests
    if (config.method === 'get' && !config.skipCache) {
      const cacheKey = getCacheKey(config);
      const cached = getFromCache(cacheKey);
      
      if (cached) {
        if (import.meta.env.MODE === 'development') {
          console.log('💾 Cache hit:', cacheKey);
        }
        // Retourner une promesse résolue avec les données en cache
        return Promise.reject({
          __cached: true,
          data: cached,
          config,
        });
      }

      // ✅ Déduplication: éviter les requêtes identiques simultanées
      if (pendingRequests.has(cacheKey)) {
        if (import.meta.env.MODE === 'development') {
          console.log('⏳ Request already pending:', cacheKey);
        }
        return Promise.reject({
          __pending: true,
          promise: pendingRequests.get(cacheKey),
          config,
        });
      }
    }

    if (import.meta.env.MODE === 'development') {
      console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// ✅ OPTIMISATION 4: Response Interceptor avec gestion erreurs avancée
api.interceptors.response.use(
  (response) => {
    // Mettre en cache les réponses GET
    if (response.config.method === 'get' && !response.config.skipCache) {
      const cacheKey = getCacheKey(response.config);
      const ttl = response.config.url.includes('/auth') 
        ? CACHE_TTL.auth 
        : response.config.url.includes('/news')
        ? CACHE_TTL.news
        : CACHE_TTL.static;
      
      setCache(cacheKey, response.data, ttl);
      pendingRequests.delete(cacheKey);
    }

    if (import.meta.env.MODE === 'development') {
      console.log('✅ Response:', response.config.url);
    }

    return response;
  },
  async (error) => {
    // ✅ Gérer les réponses en cache
    if (error.__cached) {
      return Promise.resolve({
        data: error.data,
        status: 200,
        statusText: 'OK (cached)',
        config: error.config,
        headers: {},
      });
    }

    // ✅ Gérer les requêtes en attente
    if (error.__pending) {
      return error.promise;
    }

    // ✅ Erreur 401: Déconnexion automatique
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname.includes('/login');
      const isLoggingOut = localStorage.getItem('isLoggingOut') === 'true';
      const currentPath = window.location.pathname;
      
      // Routes publiques où on ne doit pas rediriger vers login
      const publicRoutes = [
        '/',
        '/about',
        '/domains',
        '/partners',
        '/team',
        '/humanitarian',
        '/contact',
        '/transparency',
        '/legal',
        '/privacy',
        '/register'
      ];
      const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
      
      // Ne pas rediriger si :
      // 1. On est déjà sur la page de login
      // 2. C'est une déconnexion volontaire
      // 3. On est sur une route publique
      if (!isLoginPage && !isLoggingOut && !isPublicRoute) {
        if (import.meta.env.MODE === 'development') {
          console.warn('🔒 Session expirée, nettoyage...');
        }
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('cachedUser');
        localStorage.removeItem('cachedUserTime');
        clearCache();
        
        // Rediriger vers login après 1s seulement si on n'est pas sur une route publique
        setTimeout(() => {
          const stillOnPublicRoute = publicRoutes.some(route => window.location.pathname.startsWith(route));
          if (!window.location.pathname.includes('/login') && !stillOnPublicRoute) {
            window.location.href = '/login?session=expired';
          }
        }, 1000);
      } else if (isLoggingOut) {
        // Nettoyer le flag de déconnexion
        localStorage.removeItem('isLoggingOut');
      }
    }

    // ✅ Erreur 429: Rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60;
      console.warn(`⏸️ Rate limited. Retry après ${retryAfter}s`);
    }

    // ✅ Erreur 422: Validation Laravel
    if (error.response?.status === 422) {
      const validationErrors = error.response.data?.errors;
      if (validationErrors) {
        const messages = Object.values(validationErrors).flat();
        error.validationMessages = messages;
        error.message = messages.join(', ');
      }
    }

    // ✅ Timeout: Retry automatique
    if (error.code === 'ECONNABORTED') {
      if (import.meta.env.MODE === 'development') {
        console.warn('⏱️ Timeout, retry automatique...');
      }
      
      try {
        return await retryRequest(error.config);
      } catch (retryError) {
        // Ajouter un message plus clair
        retryError.message = 'Le serveur met trop de temps à répondre. Vérifiez votre connexion.';
        return Promise.reject(retryError);
      }
    }

    // ✅ Erreur réseau
    if (error.message === 'Network Error') {
      error.message = 'Impossible de joindre le serveur. Vérifiez votre connexion internet.';
    }

    if (import.meta.env.MODE === 'development') {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
      });
    }

    return Promise.reject(error);
  }
);

// ✅ OPTIMISATION 5: Helper pour les requêtes avec retry manuel
export async function apiWithRetry(requestFn, options = {}) {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const shouldRetry = 
        !error.response || 
        error.response.status >= 500 ||
        error.code === 'ECONNABORTED';
      
      if (!shouldRetry) throw error;
      
      await new Promise(resolve => 
        setTimeout(resolve, retryDelay * Math.pow(2, attempt))
      );
    }
  }
}

// ✅ OPTIMISATION 6: Prefetch pour accélérer la navigation
export function prefetchNews() {
  return api.get('/news', { 
    params: { pageSize: 9, page: 1 },
    skipCache: false 
  }).catch(() => {
    // Ignore les erreurs de prefetch
  });
}

export function prefetchProjects() {
  return api.get('/projects', { 
    skipCache: false 
  }).catch(() => {});
}

// ✅ Offres d'emploi avec cache
export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  getFeatured: () => api.get('/jobs/featured'),
  getOpen: () => api.get('/jobs/open'),
  getTypes: () => api.get('/jobs/types'),
};

export default api;