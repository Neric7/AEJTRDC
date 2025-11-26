import { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react';
import api from '../services/api';
import * as authService from '../services/auth';
import {
  changePassword as changePasswordRequest,
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  updateProfile as updateProfileRequest,
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
  changePassword: async () => {},
  refreshUser: async () => {},
});

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isInitialized = useRef(false);
  const isFetchingUser = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      // Empêcher les appels multiples
      if (isInitialized.current) {
        return;
      }
      
      isInitialized.current = true;
      
      // Récupérer le token du localStorage
      const storedToken = localStorage.getItem('authToken');
      
      // Pas de token = pas connecté
      if (!storedToken) {
        setAuthHeader(null);
        setUser(null);
        setLoading(false);
        return;
      }
      
      // Token présent, configurer le header
      setAuthHeader(storedToken);
      
      // Charger l'utilisateur depuis le cache
      const cachedUser = localStorage.getItem('cachedUser');
      if (cachedUser) {
        try {
          const userData = JSON.parse(cachedUser);
          setUser(userData);
          setLoading(false);
        } catch (e) {
          console.error('Erreur parsing cachedUser:', e);
        }
      }
      
      // Vérifier le token avec l'API
      if (!isFetchingUser.current) {
        isFetchingUser.current = true;
        
        try {
          const data = await fetchCurrentUser();
          const userData = data.user || data;
          setUser(userData);
          localStorage.setItem('cachedUser', JSON.stringify(userData));
        } catch (err) {
          console.error('Token invalide ou expiré:', err.message);
          
          // Nettoyer tout si le token est invalide
          setToken(null);
          setUser(null);
          localStorage.removeItem('authToken');
          localStorage.removeItem('cachedUser');
          setAuthHeader(null);
        } finally {
          setLoading(false);
          isFetchingUser.current = false;
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // Exécuter une seule fois au montage

  const handleAuthResponse = useCallback((data) => {
    const nextUser = data.user || null;
    const nextToken = data.token || null;

    if (nextToken) {
      localStorage.setItem('authToken', nextToken);
      setAuthHeader(nextToken);
      setToken(nextToken);
    }

    if (nextUser) {
      localStorage.setItem('cachedUser', JSON.stringify(nextUser));
    }

    setUser(nextUser);
    return nextUser;
  }, []);

  const extractError = (err, fallback = 'Une erreur est survenue') => {
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0];
      if (firstError && firstError.length) {
        return firstError[0];
      }
    }
    return fallback;
  };

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
    [handleAuthResponse]
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
    [handleAuthResponse]
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.warn('Erreur lors de la déconnexion', err);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('cachedUser');
      setAuthHeader(null);
      setToken(null);
      setUser(null);
      isInitialized.current = false;
    }
  }, []);

  const updateProfile = useCallback(
    async (payload) => {
      try {
        setError(null);
        const data = await updateProfileRequest(payload);
        const userData = data.user || data;
        setUser(userData);
        localStorage.setItem('cachedUser', JSON.stringify(userData));
        return data;
      } catch (err) {
        const message = extractError(err, 'Mise à jour impossible');
        setError(message);
        throw new Error(message);
      }
    },
    []
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
    []
  );

  const refreshUser = useCallback(async () => {
    if (!token) return null;
    
    if (isFetchingUser.current) {
      return user;
    }
    
    try {
      isFetchingUser.current = true;
      const data = await fetchCurrentUser();
      const userData = data.user || data;
      setUser(userData);
      localStorage.setItem('cachedUser', JSON.stringify(userData));
      return userData;
    } catch (err) {
      await logout();
      throw err;
    } finally {
      isFetchingUser.current = false;
    }
  }, [logout, token, user]);

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
      changePassword,
      refreshUser,
      setError,
    }),
    [changePassword, error, loading, login, logout, refreshUser, register, updateProfile, user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}