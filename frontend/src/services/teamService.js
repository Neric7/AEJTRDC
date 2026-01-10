// frontend/src/services/teamService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Vérifier si l'URL contient déjà /api
const BASE_URL = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

export const teamService = {
  /**
   * Récupère tous les membres actifs
   * @param {string|null} category - 'conseil_administration' ou 'coordination' ou null pour tous
   */
  async getMembers(category = null) {
    try {
      const endpoint = category 
        ? `${BASE_URL}/team?category=${category}`
        : `${BASE_URL}/team`;
      
      console.log('📡 Fetching team members from:', endpoint);
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data
        };
      } else {
        throw new Error(data.message || 'Erreur lors du chargement');
      }
    } catch (error) {
      console.error('❌ Error fetching team members:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Récupère un membre spécifique par ID
   * @param {number} id
   */
  async getMemberById(id) {
    try {
      const endpoint = `${BASE_URL}/team/${id}`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data
        };
      } else {
        throw new Error(data.message || 'Membre introuvable');
      }
    } catch (error) {
      console.error('❌ Error fetching member:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default teamService;