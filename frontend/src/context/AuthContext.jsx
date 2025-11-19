import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import * as authService from '../services/auth'; // ou le chemin correct vers ton fichier authService
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

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
      fetchCurrentUser()
        .then((data) => setUser(data.user || data))
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem('authToken');
          setAuthHeader(null);
        })
        .finally(() => setLoading(false));
    } else {
      setAuthHeader(null);
      setLoading(false);
    }
  }, [token]);

  const handleAuthResponse = useCallback((data) => {
    const nextUser = data.user || null;
    const nextToken = data.token || null;

    if (nextToken) {
      localStorage.setItem('authToken', nextToken);
      setAuthHeader(nextToken);
      setToken(nextToken);
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

  // Dans AuthContext.jsx, trouve la fonction register et modifie-la comme ceci :

const register = async (userData) => {
  try {
    setLoading(true);
    const data = await authService.register(userData);
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    // Extraire le message d'erreur le plus spécifique possible
    const errorMessage = error.message || 
                        error.response?.data?.message || 
                        'Erreur lors de l\'inscription';
    
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.warn('Erreur lors de la déconnexion', err);
    } finally {
      localStorage.removeItem('authToken');
      setAuthHeader(null);
      setToken(null);
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(
    async (payload) => {
      try {
        setError(null);
        const data = await updateProfileRequest(payload);
        setUser(data.user || data);
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
    try {
      const data = await fetchCurrentUser();
      setUser(data.user || data);
      return data.user || data;
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

