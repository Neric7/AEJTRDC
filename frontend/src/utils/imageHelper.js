/**
 * Utilitaire pour gérer les URLs des images
 */

/**
 * Obtient l'URL complète d'une image
 * @param {string} imagePath - Le chemin de l'image (ex: "news/image.jpg" ou URL complète)
 * @returns {string} L'URL complète de l'image
 */
export function getImageUrl(imagePath) {
  // Si pas d'image, retourner placeholder
  if (!imagePath) {
    return '/images/placeholder-news.jpg';
  }

  // Si c'est déjà une URL complète (http:// ou https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Si c'est une URL relative locale (commence par /)
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Obtenir l'URL de base de l'API (sans /api à la fin)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  const baseUrl = apiBaseUrl.replace('/api', '');

  // Si le chemin contient déjà "storage/", ne pas le rajouter
  if (imagePath.includes('storage/')) {
    const fullUrl = `${baseUrl}/${imagePath}`;
    console.log('🖼️ Image URL (avec storage):', fullUrl);
    return fullUrl;
  }

  // Sinon, construire l'URL avec /storage/
  const fullUrl = `${baseUrl}/storage/${imagePath}`;
  console.log('🖼️ Image URL construite:', fullUrl);
  
  return fullUrl;
}

/**
 * Obtient les URLs complètes pour un tableau d'images
 * @param {Array<string>} images - Tableau de chemins d'images
 * @returns {Array<string>} Tableau d'URLs complètes
 */
export function getImagesUrls(images) {
  if (!Array.isArray(images)) {
    return [];
  }
  
  return images.map(image => getImageUrl(image));
}

/**
 * Vérifie si une image existe en faisant une requête HEAD
 * @param {string} imageUrl - URL de l'image à vérifier
 * @returns {Promise<boolean>} true si l'image existe
 */
export async function checkImageExists(imageUrl) {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Erreur vérification image:', error);
    return false;
  }
}

/**
 * Obtient l'URL d'une image avec fallback vers placeholder si erreur
 * @param {string} imagePath - Le chemin de l'image
 * @param {string} placeholder - Image de remplacement (optionnel)
 * @returns {string} L'URL de l'image ou du placeholder
 */
export function getImageUrlWithFallback(imagePath, placeholder = '/images/placeholder-news.jpg') {
  if (!imagePath) {
    return placeholder;
  }
  
  return getImageUrl(imagePath);
}

/**
 * Formate le nom d'un fichier pour le web (slug)
 * @param {string} filename - Nom du fichier original
 * @returns {string} Nom formaté
 */
export function formatFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default {
  getImageUrl,
  getImagesUrls,
  checkImageExists,
  getImageUrlWithFallback,
  formatFilename,
};