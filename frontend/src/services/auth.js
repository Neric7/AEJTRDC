import api, { invalidateAuthCache, isAuthCacheValid, getCachedAuthCheck, setCachedAuthCheck } from './api';

export async function register(payload) {
  const response = await api.post('/register', payload);
  invalidateAuthCache(); // Invalider le cache après l'inscription
  return response.data;
}

export async function login(payload) {
  const response = await api.post('/login', payload);
  invalidateAuthCache(); // Invalider le cache après la connexion
  return response.data;
}

export async function logout() {
  const response = await api.post('/logout');
  invalidateAuthCache(); // Invalider le cache après la déconnexion
  return response.data;
}

// OPTIMISATION MAJEURE: Cache pour fetchCurrentUser
let userCache = null;
let userCacheTime = 0;
const USER_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchCurrentUser(forceRefresh = false) {
  const now = Date.now();
  
  // Si on a un cache valide et pas de forceRefresh, retourner le cache
  if (!forceRefresh && userCache && (now - userCacheTime < USER_CACHE_DURATION)) {
    if (import.meta.env.MODE === 'development') {
      console.log('📦 Using cached user data');
    }
    return userCache;
  }
  
  // Si une requête est déjà en cours, attendre son résultat
  const cachedPromise = getCachedAuthCheck();
  if (cachedPromise && !forceRefresh) {
    if (import.meta.env.MODE === 'development') {
      console.log('⏳ Waiting for pending auth check');
    }
    return cachedPromise;
  }
  
  // Faire la nouvelle requête
  if (import.meta.env.MODE === 'development') {
    console.log('🔄 Fetching fresh user data');
  }
  
  const promise = api.get('/user').then(response => {
    userCache = response.data;
    userCacheTime = now;
    return response.data;
  }).catch(error => {
    // En cas d'erreur, invalider le cache
    userCache = null;
    userCacheTime = 0;
    throw error;
  });
  
  setCachedAuthCheck(promise);
  return promise;
}

export async function updateProfile(payload) {
  const response = await api.put('/user/profile', payload);
  
  // Invalider le cache utilisateur après mise à jour
  userCache = null;
  userCacheTime = 0;
  invalidateAuthCache();
  
  return response.data;
}

export async function changePassword(payload) {
  const response = await api.put('/user/password', payload);
  return response.data;
}

// NOUVELLE FONCTION: Précharger l'utilisateur
export function preloadUser() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    fetchCurrentUser().catch(() => {
      // Ignorer les erreurs de préchargement
    });
  }
}

// NOUVELLE FONCTION: Invalider le cache utilisateur
export function invalidateUserCache() {
  userCache = null;
  userCacheTime = 0;
  invalidateAuthCache();
}