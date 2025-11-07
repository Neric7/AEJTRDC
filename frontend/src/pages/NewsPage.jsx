import { useState, useEffect } from 'react';
import api from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import NewsArticle from '../components/news/NewsArticle';
import Loader from '../components/common/Loader';
import styles from './NewsPage.module.css';

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

      if (!response) {
        throw new Error('Aucune réponse du serveur');
      }

      console.log('📦 Response structure:', response);

      if (response.data && Array.isArray(response.data)) {
        setNews(response.data);
        if (response.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.pagination
          }));
        }
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setNews(response.data.data);
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination
          }));
        }
      } else if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        console.warn('Format de réponse inattendu:', response);
        setNews([]);
      }

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Actualités
          </h1>
          <p className={styles.subtitle}>
            Restez informé de nos dernières actions et projets sur le terrain
          </p>
        </div>

        {/* Barre de recherche */}
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une actualité..."
                className={styles.searchInput}
              />
              <button
                type="submit"
                className={styles.searchButton}
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader />
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <div className={styles.errorBox}>
              <h3 className={styles.errorTitle}>
                Erreur de chargement
              </h3>
              <p className={styles.errorMessage}>{error}</p>
              <p className={styles.errorHint}>
                Vérifiez que l'API est accessible
              </p>
              <button
                onClick={fetchNews}
                className={styles.retryButton}
              >
                Réessayer
              </button>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>
              Aucune actualité trouvée
            </p>
          </div>
        ) : (
          <NewsGrid 
            news={news} 
            onArticleSelect={handleArticleSelect}
          />
        )}
      </div>
    </div>
  );
}