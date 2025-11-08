// frontend/src/utils/imageHelper.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Génère l'URL complète pour une image
 * @param {string} imagePath - Chemin de l'image depuis la base de données
 * @returns {string} URL complète de l'image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/placeholder.jpg';
  }

  // Si c'est déjà une URL complète, la retourner telle quelle
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Si le chemin commence par /storage, le retirer
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/storage/')) {
    cleanPath = cleanPath.replace('/storage/', '');
  }

  // Construire l'URL complète
  return `${API_URL}/storage/${cleanPath}`;
};

/**
 * Vérifie si une image existe
 * @param {string} imageUrl - URL de l'image
 * @returns {Promise<boolean>}
 */
export const checkImageExists = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Erreur vérification image:', error);
    return false;
  }
};

/**
 * Obtient une image de placeholder selon le type
 * @param {string} type - Type de placeholder (news, team, project, etc.)
 * @returns {string} URL du placeholder
 */
export const getPlaceholder = (type = 'default') => {
  const placeholders = {
    news: '/images/placeholder-news.jpg',
    team: '/images/placeholder-team.jpg',
    project: '/images/placeholder-project.jpg',
    default: '/images/placeholder.jpg'
  };

  return placeholders[type] || placeholders.default;
};

/**
 * Optimise l'URL d'une image pour le chargement
 * @param {string} imagePath - Chemin de l'image
 * @param {object} options - Options d'optimisation
 * @returns {string} URL optimisée
 */
export const getOptimizedImageUrl = (imagePath, options = {}) => {
  const {
    width = null,
    height = null,
    quality = 85,
    format = 'webp'
  } = options;

  const baseUrl = getImageUrl(imagePath);

  // Si on a un service d'optimisation d'images (à implémenter côté backend)
  // On pourrait ajouter des paramètres de query
  // Exemple: ?w=800&h=600&q=85&f=webp

  return baseUrl;
};

export default {
  getImageUrl,
  checkImageExists,
  getPlaceholder,
  getOptimizedImageUrl
};