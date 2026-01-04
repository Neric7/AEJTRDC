import api from './api';

// ========== CACHE UTILISATEUR ==========
let userCache = null;
let userCacheTime = 0;
const USER_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Invalider le cache utilisateur
 */
export function invalidateUserCache() {
  userCache = null;
  userCacheTime = 0;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cachedUser');
  }
}

// ========== AUTHENTIFICATION ==========

/**
 * Inscription
 */
export async function register(payload) {
  const response = await api.post('/register', payload);
  invalidateUserCache();
  return response.data;
}

/**
 * Connexion
 */
export async function login(payload) {
  const response = await api.post('/login', payload);
  invalidateUserCache();
  return response.data;
}

/**
 * Déconnexion
 */
export async function logout() {
  const response = await api.post('/logout');
  invalidateUserCache();
  return response.data;
}

/**
 * Récupérer l'utilisateur connecté (avec cache)
 */
export async function fetchCurrentUser(forceRefresh = false) {
  const now = Date.now();
  
  // Si on a un cache valide et pas de forceRefresh, retourner le cache
  if (!forceRefresh && userCache && (now - userCacheTime < USER_CACHE_DURATION)) {
    if (import.meta.env.MODE === 'development') {
      console.log('📦 Using cached user data');
    }
    return userCache;
  }
  
  // Faire la nouvelle requête
  if (import.meta.env.MODE === 'development') {
    console.log('🔄 Fetching fresh user data');
  }
  
  try {
    const response = await api.get('/user');
    userCache = response.data;
    userCacheTime = now;
    return response.data;
  } catch (error) {
    // En cas d'erreur, invalider le cache
    invalidateUserCache();
    throw error;
  }
}

// ========== PROFIL ==========

/**
 * Mettre à jour le profil
 */
export async function updateProfile(payload) {
  const response = await api.put('/user/profile', payload);
  invalidateUserCache();
  return response.data;
}

/**
 * Upload avatar
 */
export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await api.post('/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  invalidateUserCache();
  return response.data;
}

/**
 * Supprimer avatar
 */
export async function deleteAvatar() {
  const response = await api.delete('/user/avatar');
  invalidateUserCache();
  return response.data;
}

/**
 * Changer le mot de passe
 */
export async function changePassword(payload) {
  const response = await api.put('/user/password', payload);
  return response.data;
}

// ========== UTILITAIRES ==========

/**
 * Précharger l'utilisateur
 */
export function preloadUser() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    fetchCurrentUser().catch(() => {
      // Ignorer les erreurs de préchargement
    });
  }
}