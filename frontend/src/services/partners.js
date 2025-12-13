import api from './api';

const partnersAPI = {
  // Récupérer tous les partenaires
  getAll: (params = {}) => {
    return api.get('/partners', { params });
  },

  // Récupérer un partenaire par ID ou slug
  getById: (id) => {
    return api.get(`/partners/${id}`);
  },

  // Récupérer les partenaires actifs
  getActive: (params = {}) => {
    return api.get('/partners', { 
      params: { ...params, status: 'active' } 
    });
  },

  // Récupérer les partenaires en vedette
  getFeatured: (params = {}) => {
    return api.get('/partners', { 
      params: { ...params, featured: true, status: 'active' } 
    });
  },

  // Récupérer les partenaires par type
  getByType: (type, params = {}) => {
    return api.get('/partners', { 
      params: { ...params, type, status: 'active' } 
    });
  },

  // Rechercher des partenaires
  search: (query, params = {}) => {
    return api.get('/partners', { 
      params: { ...params, search: query, status: 'active' } 
    });
  },

  // Récupérer les types de partenaires
  getTypes: () => {
    return api.get('/partners/types');
  },
};

export default partnersAPI;