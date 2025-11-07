import { useState, useEffect } from 'react';
import api from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import NewsArticle from '../components/news/NewsArticle';
import Loader from '../components/common/Loader';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    total: 0,
    lastPage: 1
  });
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchNews();
  }, [pagination.page, search, selectedTag]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/news';
      const params = {
        pageSize: pagination.pageSize,
        page: pagination.page,
      };

      if (selectedTag) {
        endpoint = `/news/tag/${selectedTag}`;
      }
      if (search) {
        params.search = search;
      }

      console.log('📡 Fetching news from:', endpoint, params);

      const response = await api.get(endpoint, { params });

      // ✅ CORRECTION ICI : Gestion robuste de la réponse
      if (!response) {
        throw new Error('Aucune réponse du serveur');
      }

      // Vérifier la structure de réponse de votre API
      console.log('📦 Response structure:', response);

      // Votre API retourne probablement directement les données
      // et non response.data.data
      if (response.data && Array.isArray(response.data)) {
        // Format: { data: [], pagination: {} }
        setNews(response.data);
        if (response.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.pagination
          }));
        }
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Format: { data: { data: [], pagination: {} } }
        setNews(response.data.data);
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination
          }));
        }
      } else if (Array.isArray(response.data)) {
        // Format: { data: [] } (simple array)
        setNews(response.data);
      } else {
        console.warn('Format de réponse inattendu:', response);
        setNews([]);
      }

      // Extraire les tags
      extractTags(news);

    } catch (err) {
      console.error('💥 Fetch error:', err);
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Erreur de connexion au serveur';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const extractTags = (newsData) => {
    const tags = new Set();
    newsData.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => tags.add(tag));
      }
    });
    setAvailableTags([...tags].sort());
  };

  const handleArticleSelect = async (articleId) => {
    try {
      setLoading(true);
      const response = await api.get(`/news/${articleId}`);
      setSelectedArticle(response.data);
    } catch (err) {
      setError('Erreur lors du chargement de l\'article');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Si un article est sélectionné
  if (selectedArticle) {
    return (
      <NewsArticle 
        article={selectedArticle}
        onBack={handleBackToList}
        onRelatedArticle={handleArticleSelect}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Actualités
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restez informé de nos dernières actions et projets sur le terrain
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une actualité..."
                className="w-full px-6 py-4 pr-32 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Erreur de chargement
              </h3>
              <p className="text-red-600 mb-2">{error}</p>
              <p className="text-sm text-gray-600 mb-4">
                Vérifiez que l'API est accessible
              </p>
              <button
                onClick={fetchNews}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Réessayer
              </button>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              Aucune actualité trouvée
            </p>
          </div>
        ) : (
          <>
            <NewsGrid 
              news={news} 
              onArticleSelect={handleArticleSelect}
            />
          </>
        )}
      </div>
    </div>
  );
}