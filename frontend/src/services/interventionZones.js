import api from './api';

const interventionZonesService = {
  // ✅ ROUTES PUBLIQUES
  
  // Récupérer toutes les zones actives
  getAll: (params = {}) => api.get('/intervention-zones', { params }),
  
  // Récupérer une zone spécifique
  getById: (id) => api.get(`/intervention-zones/${id}`),
  
  // Filtrer par province
  getByProvince: (province) => api.get('/intervention-zones', { params: { province } }),
  
  // Filtrer par type
  getByType: (type) => api.get('/intervention-zones', { params: { type } }),

  // ✅ ROUTES ADMIN
  
  admin: {
    // Récupérer toutes les zones (incluant inactives)
    getAll: (params = {}) => api.get('/admin/intervention-zones', { params }),
    
    // Statistiques
    getStats: () => api.get('/admin/intervention-zones/stats'),
    
    // Récupérer une zone
    getById: (id) => api.get(`/admin/intervention-zones/${id}`),
    
    // Créer une zone
    create: (data) => api.post('/admin/intervention-zones', data),
    
    // Mettre à jour une zone
    update: (id, data) => api.put(`/admin/intervention-zones/${id}`, data),
    
    // Supprimer une zone
    delete: (id) => api.delete(`/admin/intervention-zones/${id}`),
    
    // Activer/Désactiver
    toggleStatus: (id) => api.patch(`/admin/intervention-zones/${id}/toggle-status`),
    
    // Réorganiser
    reorder: (zones) => api.post('/admin/intervention-zones/reorder', { zones })
  }
};

export default interventionZonesService;
