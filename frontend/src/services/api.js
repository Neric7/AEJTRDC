import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Ajouter automatiquement le token si présent
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('Data:', config.data); // CHANGÉ: afficher data au lieu de params
    console.log('Params:', config.params);

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Debug: Log toutes les réponses
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      response: error.response,
      config: error.config
    });
    
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

export default api;