// src/services/domains.js

import api from './api';

/**
 * Service pour gérer les domaines d'intervention
 */

// Récupérer tous les domaines
export const getAllDomains = async () => {
  try {
    const response = await api.get('/domains');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des domaines:', error);
    throw error;
  }
};

// Récupérer un domaine par ID
export const getDomainById = async (id) => {
  try {
    const response = await api.get(`/domains/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du domaine ${id}:`, error);
    throw error;
  }
};

// Récupérer un domaine par slug
export const getDomainBySlug = async (slug) => {
  try {
    const response = await api.get(`/domains/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du domaine ${slug}:`, error);
    throw error;
  }
};

// Récupérer les autres domaines (exclure le domaine actuel)
export const getOtherDomains = async (id) => {
  try {
    const response = await api.get(`/domains/${id}/others`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des autres domaines:', error);
    throw error;
  }
};

// ============ ADMIN ROUTES ============

// Créer un nouveau domaine
export const createDomain = async (domainData) => {
  try {
    const formData = new FormData();
    
    // Ajouter les champs textuels
    formData.append('titre', domainData.titre);
    formData.append('description_courte', domainData.description_courte);
    
    // Ajouter les arrays
    domainData.contenu.forEach((item, index) => {
      formData.append(`contenu[${index}]`, item);
    });
    
    domainData.objectifs.forEach((item, index) => {
      formData.append(`objectifs[${index}]`, item);
    });
    
    // Ajouter les champs optionnels
    if (domainData.slug) formData.append('slug', domainData.slug);
    if (domainData.icon) formData.append('icon', domainData.icon);
    if (domainData.ordre !== undefined) formData.append('ordre', domainData.ordre);
    if (domainData.actif !== undefined) formData.append('actif', domainData.actif);
    
    // Ajouter l'image si présente
    if (domainData.image instanceof File) {
      formData.append('image', domainData.image);
    }
    
    const response = await api.post('/admin/domains', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du domaine:', error);
    throw error;
  }
};

// Mettre à jour un domaine
export const updateDomain = async (id, domainData) => {
  try {
    const formData = new FormData();
    
    // Ajouter les champs modifiés
    Object.keys(domainData).forEach(key => {
      if (key === 'contenu' || key === 'objectifs') {
        domainData[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (key === 'image' && domainData[key] instanceof File) {
        formData.append('image', domainData[key]);
      } else if (domainData[key] !== null && domainData[key] !== undefined) {
        formData.append(key, domainData[key]);
      }
    });
    
    const response = await api.post(`/admin/domains/${id}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du domaine:', error);
    throw error;
  }
};

// Supprimer un domaine
export const deleteDomain = async (id) => {
  try {
    const response = await api.delete(`/admin/domains/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du domaine:', error);
    throw error;
  }
};