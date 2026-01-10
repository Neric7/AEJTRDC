import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// ============================================================
// CONFIGURATION AXIOS
// ============================================================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// AUTHENTIFICATION
// ============================================================
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/admin/login', credentials);
      
      const { token, user } = response.data;
      
      // Stocker le token et l'utilisateur
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      console.error('Erreur login:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/admin/logout');
    } catch (error) {
      console.error('Erreur logout:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/admin/user');
      return response.data;
    } catch (error) {
      const user = localStorage.getItem('admin_user');
      return user ? JSON.parse(user) : null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },
};

// ============================================================
// DASHBOARD / STATISTIQUES
// ============================================================
export const dashboardAPI = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getRecentActivities: () => api.get('/admin/dashboard/activities'),
};

// ============================================================
// PROJETS
// ============================================================
export const projectsAPI = {
  getAll: (params) => api.get('/admin/projects', { params }),
  getById: (id) => api.get(`/admin/projects/${id}`),
  getStatistics: () => api.get('/admin/projects/statistics'),
  create: (data) => api.post('/admin/projects', data),
  update: (id, data) => api.put(`/admin/projects/${id}`, data),
  delete: (id) => api.delete(`/admin/projects/${id}`),
  publish: (id) => api.post(`/admin/projects/${id}/publish`),
  unpublish: (id) => api.post(`/admin/projects/${id}/unpublish`),
  toggleFeatured: (id) => api.post(`/admin/projects/${id}/toggle-featured`),
  uploadImage: (id, formData) => 
    api.post(`/admin/projects/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadImages: (id, formData) => 
    api.post(`/admin/projects/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// ============================================================
// ACTUALITÉS
// ============================================================
export const newsAPI = {
  getAll: (params) => api.get('/admin/news', { params }),
  getById: (id) => api.get(`/admin/news/${id}`),
  create: (data) => api.post('/admin/news', data),
  update: (id, data) => api.put(`/admin/news/${id}`, data),
  delete: (id) => api.delete(`/admin/news/${id}`),
  publish: (id) => api.post(`/admin/news/${id}/publish`),
  unpublish: (id) => api.post(`/admin/news/${id}/unpublish`),
  uploadImage: (id, formData) => 
    api.post(`/admin/news/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// ============================================================
// DOMAINES D'INTERVENTION
// ============================================================
export const domainsAPI = {
  getAll: (params) => api.get('/admin/domains', { params }),
  getById: (id) => api.get(`/admin/domains/${id}`),
  create: (formData) => 
    api.post('/admin/domains', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) => 
    api.post(`/admin/domains/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/admin/domains/${id}`),
  toggleStatus: (id) => api.post(`/admin/domains/${id}/toggle-status`),
};

// ============================================================
// PARTENAIRES
// ============================================================
export const partnersAPI = {
  getAll: (params) => api.get('/admin/partners', { params }),
  getById: (id) => api.get(`/admin/partners/${id}`),
  create: (data) => api.post('/admin/partners', data),
  update: (id, data) => api.put(`/admin/partners/${id}`, data),
  delete: (id) => api.delete(`/admin/partners/${id}`),
  uploadLogo: (id, formData) => 
    api.post(`/admin/partners/${id}/upload-logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

// ============================================================
// OFFRES D'EMPLOI
// ============================================================
export const jobsAPI = {
  getAll: (params) => api.get('/admin/jobs', { params }),
  getById: (id) => api.get(`/admin/jobs/${id}`),
  create: (data) => api.post('/admin/jobs', data),
  update: (id, data) => api.put(`/admin/jobs/${id}`, data),
  delete: (id) => api.delete(`/admin/jobs/${id}`),
  publish: (id) => api.post(`/admin/jobs/${id}/publish`),
  close: (id) => api.post(`/admin/jobs/${id}/close`),
};

// ============================================================
// ALERTES HUMANITAIRES
// ============================================================
export const alertsAPI = {
  getAll: (params) => api.get('/admin/alerts', { params }),
  getById: (id) => api.get(`/admin/alerts/${id}`),
  create: (data) => api.post('/admin/alerts', data),
  update: (id, data) => api.put(`/admin/alerts/${id}`, data),
  delete: (id) => api.delete(`/admin/alerts/${id}`),
  activate: (id) => api.post(`/admin/alerts/${id}/activate`),
  deactivate: (id) => api.post(`/admin/alerts/${id}/deactivate`),
};

// ============================================================
// RAPPORTS / TRANSPARENCE
// ============================================================
export const reportsAPI = {
  getAll: (params) => api.get('/admin/reports', { params }),
  getById: (id) => api.get(`/admin/reports/${id}`),
  create: (data) => api.post('/admin/reports', data),
  update: (id, data) => api.put(`/admin/reports/${id}`, data),
  delete: (id) => api.delete(`/admin/reports/${id}`),
  uploadDocument: (id, formData) => 
    api.post(`/admin/reports/${id}/document`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// ============================================================
// MÉDIAS
// ============================================================
export const mediaAPI = {
  getAll: (params) => api.get('/admin/media', { params }),
  upload: (formData) => 
    api.post('/admin/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/admin/media/${id}`),
};

// ============================================================
// UTILISATEURS
// ============================================================
export const usersAPI = {
  getAll: (params) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
  create: (data) => api.post('/admin/users', data),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
  toggleStatus: (id) => api.post(`/admin/users/${id}/toggle-status`),
};

// ============================================================
// CONTACTS / MESSAGES
// ============================================================
export const contactsAPI = {
  getAll: (params) => api.get('/admin/contacts', { params }),
  getById: (id) => api.get(`/admin/contacts/${id}`),
  markAsRead: (id) => api.post(`/admin/contacts/${id}/read`),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
};

// ============================================================
// DONS
// ============================================================
export const donationsAPI = {
  getAll: (params) => api.get('/admin/donations', { params }),
  getById: (id) => api.get(`/admin/donations/${id}`),
  getStats: () => api.get('/admin/donations/stats'),
};

// ============================================================
// BÉNÉVOLES / VOLONTAIRES
// ============================================================
export const volunteersAPI = {
  // Récupérer toutes les candidatures avec filtres optionnels
  getAll: (params) => api.get('/admin/volunteers', { params }),
  
  // Récupérer une candidature spécifique
  getById: (id) => api.get(`/admin/volunteers/${id}`),
  
  // Récupérer les statistiques des candidatures
  getStats: () => api.get('/admin/volunteers/stats'),
  
  // Mettre à jour une candidature (statut, notes, message)
  update: (id, data) => api.put(`/admin/volunteers/${id}`, data),
  
  // Mettre à jour uniquement le statut
  updateStatus: (id, status) => 
    api.put(`/admin/volunteers/${id}/status`, { status }),
  
  // Accepter une candidature
  accept: (id, data) => 
    api.post(`/admin/volunteers/${id}/accept`, data),
  
  // Rejeter une candidature
  reject: (id, data) => 
    api.post(`/admin/volunteers/${id}/reject`, data),
  
  // Supprimer une candidature
  delete: (id) => api.delete(`/admin/volunteers/${id}`),
  
  // Envoyer un email au candidat
  sendEmail: (id, data) => 
    api.post(`/admin/volunteers/${id}/send-email`, data),
  
  // Exporter les candidatures (CSV, Excel)
  export: (params) => 
    api.get('/admin/volunteers/export', { 
      params,
      responseType: 'blob' 
    }),
};

// ============================================================
// COMMENTAIRES (Admin peut modérer)
// ============================================================
export const commentsAPI = {
  getAll: (params) => api.get('/admin/comments', { params }),
  approve: (id) => api.put(`/admin/comments/${id}/approve`),
  reject: (id) => api.put(`/admin/comments/${id}/reject`),
  delete: (id) => api.delete(`/admin/comments/${id}`),
};

// Export par défaut de l'instance axios configurée
export default api;

// À ajouter dans admin/src/services/adminApi.js

// ============================================================
// ÉQUIPE / TEAM  
// ============================================================
export const teamAPI = {
  getAll: (params) => api.get('/admin/team', { params }),
  getById: (id) => api.get(`/admin/team/${id}`),
  getStatistics: () => api.get('/admin/team/statistics'),
  
  create: (data) => {
    const formData = new FormData();
    
    // Champs requis - toujours envoyer
    const requiredFields = ['full_name', 'email', 'category', 'position'];
    requiredFields.forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // Champs optionnels - envoyer seulement si non vides
    const optionalFields = ['role', 'phone', 'bio', 'display_order'];
    optionalFields.forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });
    
    // Boolean is_active
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active ? '1' : '0');
    }
    
    // Social links
    if (data.social_links && Object.keys(data.social_links).length > 0) {
      formData.append('social_links', JSON.stringify(data.social_links));
    }
    
    // Photo file
    if (data.photo instanceof File) {
      formData.append('photo', data.photo);
    }
    
    return api.post('/admin/team', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  update: (id, data) => {
    const formData = new FormData();
    
    // Champs requis - toujours envoyer
    const requiredFields = ['full_name', 'email', 'category', 'position'];
    requiredFields.forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // Champs optionnels - envoyer seulement si non vides
    const optionalFields = ['role', 'phone', 'bio', 'display_order'];
    optionalFields.forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });
    
    // Boolean is_active
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active ? '1' : '0');
    }
    
    // Social links
    if (data.social_links && Object.keys(data.social_links).length > 0) {
      formData.append('social_links', JSON.stringify(data.social_links));
    }
    
    // Photo file - seulement si c'est un nouveau fichier
    if (data.photo instanceof File) {
      formData.append('photo', data.photo);
    }
    
    // Utiliser POST avec _method pour Laravel
    formData.append('_method', 'PUT');
    
    return api.post(`/admin/team/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  delete: (id) => api.delete(`/admin/team/${id}`),
  toggleStatus: (id) => api.post(`/admin/team/${id}/toggle-status`),
  reorder: (members) => api.post('/admin/team/reorder', { members }),
  
  uploadPhoto: (id, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    return api.post(`/admin/team/${id}/upload-photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  deletePhoto: (id) => api.delete(`/admin/team/${id}/photo`)
};