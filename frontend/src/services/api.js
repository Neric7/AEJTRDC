import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// OPTIMISATION 1: Cache pour éviter les appels multiples
let authCheckPromise = null;
let lastAuthCheck = 0;
const AUTH_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Ajouter automatiquement le token si présent
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // OPTIMISATION 2: Logs en mode développement uniquement
    if (import.meta.env.MODE === 'development') {
      console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      if (config.data) console.log('Data:', config.data);
      if (config.params) console.log('Params:', config.params);
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

// Debug: Log toutes les réponses
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === 'development') {
      console.log('✅ API Response:', response);
    }
    return response;
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.error('❌ API Error:', {
        message: error.message,
        response: error.response,
        config: error.config
      });
    }
    
    // OPTIMISATION 3: Nettoyer le cache si 401 (non autorisé)
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('cachedUser');
      authCheckPromise = null;
      lastAuthCheck = 0;
      
      // Rediriger vers login si nécessaire
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        // window.location.href = '/login';
      }
    }
    
    // Gestion des erreurs de validation Laravel
    if (error.response?.status === 422) {
      const validationErrors = error.response.data?.errors;
      if (validationErrors) {
        const errorMessages = Object.values(validationErrors).flat().join(', ');
        throw new Error(errorMessages);
      }
    }
    
    return Promise.reject(error);
  }
);

// OPTIMISATION 4: Fonction helper pour vérifier si le cache est valide
export function isAuthCacheValid() {
  const now = Date.now();
  return now - lastAuthCheck < AUTH_CACHE_DURATION;
}

// OPTIMISATION 5: Fonction pour invalider le cache
export function invalidateAuthCache() {
  authCheckPromise = null;
  lastAuthCheck = 0;
}

// OPTIMISATION 6: Fonction wrapper pour fetchCurrentUser avec cache
export function getCachedAuthCheck() {
  return authCheckPromise;
}

export function setCachedAuthCheck(promise) {
  authCheckPromise = promise;
  lastAuthCheck = Date.now();
}

// Offres d'emploi
export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  getFeatured: () => api.get('/jobs/featured'),
  getOpen: () => api.get('/jobs/open'),
  getTypes: () => api.get('/jobs/types'),
};

export default api;

