import { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react';
import api from '../services/api';
import {
  changePassword as changePasswordRequest,
  deleteAvatar as deleteAvatarRequest,
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  updateProfile as updateProfileRequest,
  uploadAvatar as uploadAvatarRequest,
  invalidateUserCache,
} from '../services/auth';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  uploadAvatar: async () => {},
  deleteAvatar: async () => {},
  changePassword: async () => {},
  refreshUser: async () => {},
});

// ✅ OPTIMISATION 1: Cache avec expiration (1 heure)
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure
const CACHE_KEY = 'cachedUser';
const CACHE_TIME_KEY = 'cachedUserTime';

const getCachedUser = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (!cached || !cacheTime) return null;
    
    const age = Date.now() - parseInt(cacheTime, 10);
    if (age > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIME_KEY);
      return null;
    }
    
    return JSON.parse(cached);
  } catch {
    return null;
  }
};

const setCachedUser = (user) => {
  if (!user) {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIME_KEY);
    return;
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify(user));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
};

// ✅ OPTIMISATION 2: Centraliser la gestion des headers
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('authToken');
  }
};

export function AuthProvider({ children }) {
  // ✅ OPTIMISATION 3: Initialisation synchrone du token
  const [token] = useState(() => {
    if (typeof window === 'undefined') return null;
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) setAuthHeader(storedToken);
    return storedToken;
  });

  // ✅ OPTIMISATION 4: Initialisation synchrone du user depuis le cache
  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getCachedUser();
  });

  const [loading, setLoading] = useState(!user); // Si user en cache, pas de loading
  const [error, setError] = useState(null);
  
  const initPromise = useRef(null);

  // ✅ OPTIMISATION 5: Init async en background sans bloquer le render
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    // Si on a déjà un user en cache, on fetch en arrière-plan
    const shouldShowLoading = !user;

    const initAuth = async () => {
      try {
        const data = await fetchCurrentUser();
        const userData = data.user || data;
        setUser(userData);
        setCachedUser(userData);
      } catch (err) {
        console.error('Token invalide:', err.message);
        setUser(null);
        setAuthHeader(null);
        setCachedUser(null);
      } finally {
        if (shouldShowLoading) setLoading(false);
      }
    };

    // Éviter les appels multiples
    if (!initPromise.current) {
      initPromise.current = initAuth();
    }
  }, [token, user]);

  // ✅ OPTIMISATION 6: Mémoïser handleAuthResponse
  const handleAuthResponse = useCallback((data) => {
    const nextUser = data.user || null;
    const nextToken = data.token || null;

    if (nextToken) setAuthHeader(nextToken);
    if (nextUser) setCachedUser(nextUser);

    setUser(nextUser);
    return nextUser;
  }, []);

  const extractError = useCallback((err, fallback = 'Une erreur est survenue') => {
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0];
      if (firstError?.length) return firstError[0];
    }
    return fallback;
  }, []);

  const login = useCallback(
    async (credentials) => {
      try {
        setError(null);
        const data = await loginRequest(credentials);
        handleAuthResponse(data);
      } catch (err) {
        const message = extractError(err, 'Impossible de se connecter');
        setError(message);
        throw new Error(message);
      }
    },
    [handleAuthResponse, extractError]
  );

  const register = useCallback(
    async (userData) => {
      try {
        setError(null);
        const data = await registerRequest(userData);
        handleAuthResponse(data);
      } catch (err) {
        const message = extractError(err, 'Erreur lors de l\'inscription');
        setError(message);
        throw new Error(message);
      }
    },
    [handleAuthResponse, extractError]
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.warn('Erreur lors de la déconnexion', err);
    } finally {
      setAuthHeader(null);
      setCachedUser(null);
      setUser(null);
      initPromise.current = null;
    }
  }, []);

  const updateProfile = useCallback(
    async (payload) => {
      try {
        setError(null);
        const data = await updateProfileRequest(payload);
        const userData = data.user || data;
        setUser(userData);
        setCachedUser(userData);
        invalidateUserCache();
        return data;
      } catch (err) {
        const message = extractError(err, 'Mise à jour impossible');
        setError(message);
        throw new Error(message);
      }
    },
    [extractError]
  );

  const uploadAvatar = useCallback(
    async (file) => {
      try {
        setError(null);
        const data = await uploadAvatarRequest(file);
        const userData = data.user || data;
        setUser(userData);
        setCachedUser(userData);
        invalidateUserCache();
        return data;
      } catch (err) {
        const message = extractError(err, 'Upload impossible');
        setError(message);
        throw new Error(message);
      }
    },
    [extractError]
  );

  const deleteAvatar = useCallback(
    async () => {
      try {
        setError(null);
        const data = await deleteAvatarRequest();
        const userData = data.user || data;
        setUser(userData);
        setCachedUser(userData);
        invalidateUserCache();
        return data;
      } catch (err) {
        const message = extractError(err, 'Suppression impossible');
        setError(message);
        throw new Error(message);
      }
    },
    [extractError]
  );

  const changePassword = useCallback(
    async (payload) => {
      try {
        setError(null);
        return await changePasswordRequest(payload);
      } catch (err) {
        const message = extractError(err, 'Changement de mot de passe impossible');
        setError(message);
        throw new Error(message);
      }
    },
    [extractError]
  );

  const refreshUser = useCallback(async () => {
    if (!token) return null;
    
    try {
      const data = await fetchCurrentUser();
      const userData = data.user || data;
      setUser(userData);
      setCachedUser(userData);
      return userData;
    } catch (err) {
      await logout();
      throw err;
    }
  }, [logout, token]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user),
      loading,
      error,
      login,
      register,
      logout,
      updateProfile,
      uploadAvatar,
      deleteAvatar,
      changePassword,
      refreshUser,
      setError,
    }),
    [user, token, loading, error, login, register, logout, updateProfile, 
     uploadAvatar, deleteAvatar, changePassword, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}