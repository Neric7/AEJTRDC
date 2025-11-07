import api from './api';

const mockArticles = [
  {
    id: 1,
    slug: 'protection-enfance-initiative-2025',
    title: "Nouvelle initiative pour la protection de l'enfance",
    excerpt: "Lancement d'un programme de sensibilisation et de prise en charge...",
    content: "Contenu détaillé de l'article...",
    image: '/src/assets/images/carousel/activity-1.webp',
    publishedAt: '2025-10-02T10:00:00Z',
    author: 'Rédaction AEJT-RDC',
    tags: ['Protection', 'Enfance'],
  },
  {
    id: 2,
    slug: 'education-acceleree-rdc',
    title: "Éducation accélérée pour les enfants vulnérables",
    excerpt: "Un dispositif pour rattraper la scolarité dans plusieurs provinces...",
    content: "Contenu détaillé de l'article...",
    image: '/src/assets/images/carousel/activity-2.webp',
    publishedAt: '2025-09-18T09:00:00Z',
    author: 'Équipe Programmes',
    tags: ['Éducation'],
  },
];

export async function fetchNewsList({ page = 1, pageSize = 9, search = '' } = {}) {
  try {
    return await api.get('/news', { params: { page, pageSize, search } });
  } catch (e) {
    if (api.useMock) {
      return { data: mockArticles, pagination: { page: 1, pageSize: mockArticles.length, total: mockArticles.length } };
    }
    throw e;
  }
}

export async function fetchNewsById(idOrSlug) {
  try {
    return await api.get(`/news/${idOrSlug}`);
  } catch (e) {
    if (api.useMock) {
      return mockArticles.find(a => String(a.id) === String(idOrSlug) || a.slug === idOrSlug) || null;
    }
    throw e;
  }
}

export async function fetchLatestNews({ limit = 3 } = {}) {
  try {
    return await api.get('/news/latest', { params: { limit } });
  } catch (e) {
    if (api.useMock) {
      return mockArticles.slice(0, limit);
    }
    throw e;
  }
}


