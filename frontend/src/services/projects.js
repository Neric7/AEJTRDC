import api from './api';

export async function fetchProjectsList({ page = 1, pageSize = 9, search = '', status = '', domain = '' } = {}) {
  try {
    const params = { page, pageSize };
    if (search) params.search = search;
    if (status) params.status = status;
    if (domain) params.domain = domain;
    
    return await api.get('/projects', { params });
  } catch (error) {
    console.error('Erreur chargement liste projets:', error);
    throw error;
  }
}

export async function fetchProjectById(idOrSlug) {
  try {
    return await api.get(`/projects/${idOrSlug}`);
  } catch (error) {
    console.error('Erreur chargement projet:', error);
    throw error;
  }
}

export async function fetchFeaturedProjects({ limit = 3 } = {}) {
  try {
    return await api.get('/projects/featured', { params: { limit } });
  } catch (error) {
    console.error('Erreur chargement projets vedette:', error);
    throw error;
  }
}

export async function fetchProjectsByDomain(domainId, { page = 1, pageSize = 9 } = {}) {
  try {
    return await api.get(`/projects/domain/${domainId}`, { 
      params: { page, pageSize } 
    });
  } catch (error) {
    console.error('Erreur chargement projets par domaine:', error);
    throw error;
  }
}

export async function fetchProjectStatuses() {
  try {
    return await api.get('/projects/statuses');
  } catch (error) {
    console.error('Erreur chargement statuts projets:', error);
    return { data: { statuses: [
      { value: 'planning', label: 'En planification' },
      { value: 'ongoing', label: 'En cours' },
      { value: 'completed', label: 'Terminé' },
      { value: 'suspended', label: 'Suspendu' }
    ]}};
  }
}