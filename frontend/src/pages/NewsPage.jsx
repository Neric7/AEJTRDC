import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { clearCache, prefetchNews } from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import NewsArticle from '../components/news/NewsArticle';
import Loader from '../components/common/Loader';
import { FaLock, FaUserPlus, FaSignInAlt, FaRedo } from 'react-icons/fa';
import styles from './NewsPage.module.css';

export default function NewsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
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

  // ✅ Refs pour éviter les appels multiples
  const isFetchingRef = useRef(false);
  const fetchTimeoutRef = useRef(null);

  // ✅ Scroller vers le haut
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // ✅ Prefetch au montage pour accélérer le chargement
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      prefetchNews();
    }
  }, [isAuthenticated, authLoading]);

  // ✅ Charger un article spécifique
  useEffect(() => {
    if (authLoading) return;

    if (slug) {
      loadArticleBySlug(slug);
    } else {
      setSelectedArticle(null);
      if (isAuthenticated) {
        fetchNews();
      } else {
        setLoading(false);
      }
    }
  }, [slug, isAuthenticated, authLoading]);

  // ✅ Charger les news avec debounce
  useEffect(() => {
    if (authLoading || slug) return;
    
    // Annuler le timeout précédent
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    // Debounce de 300ms pour la recherche
    fetchTimeoutRef.current = setTimeout(() => {
      if (isAuthenticated) {
        fetchNews();
      }
    }, search ? 300 : 0);

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [pagination.page, search, selectedTag, isAuthenticated, authLoading, slug]);

  // ✅ Fonction optimisée pour charger un article
  const loadArticleBySlug = useCallback(async (articleSlug) => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/news/${articleSlug}`);
      
      if (response?.data) {
        setSelectedArticle(response.data);
        setRetryCount(0);
      } else {
        throw new Error('Article non trouvé');
      }

    } catch (err) {
      console.error('Error loading article:', err);
      
      if (err.response?.status === 401) {
        setError('Vous devez être connecté pour lire cet article');
      } else if (err.response?.status === 404) {
        setError('Article introuvable');
      } else if (err.code === 'ECONNABORTED') {
        setError('Le chargement prend trop de temps. Vérifiez votre connexion.');
      } else {
        setError(err.message || 'Erreur lors du chargement de l\'article');
      }
      
      setTimeout(() => navigate('/news'), 2000);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [isAuthenticated, navigate]);

  // ✅ Fonction optimisée pour charger les news avec retry
  const fetchNews = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

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

      const response = await api.get(endpoint, { params });

      if (!response) {
        throw new Error('Aucune réponse du serveur');
      }

      // ✅ Gestion flexible de la structure de réponse
      let newsData = [];
      let paginationData = null;

      if (Array.isArray(response.data)) {
        newsData = response.data;
        paginationData = response.pagination;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        newsData = response.data.data;
        paginationData = response.data.pagination;
      } else if (response.data && typeof response.data === 'object') {
        newsData = [response.data];
      }

      setNews(newsData);
      
      if (paginationData) {
        setPagination(prev => ({ ...prev, ...paginationData }));
      }

      extractTags(newsData);
      setRetryCount(0); // Reset retry counter

    } catch (err) {
      console.error('Fetch error:', err);
      
      let errorMessage = 'Erreur de chargement';
      
      if (err.response?.status === 401) {
        errorMessage = 'Votre session a expiré';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Le serveur met trop de temps à répondre. Veuillez réessayer.';
      } else if (err.message === 'Network Error') {
        errorMessage = 'Problème de connexion. Vérifiez votre connexion internet.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [pagination.page, pagination.pageSize, search, selectedTag]);

  // ✅ Fonction de retry
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    clearCache('/news');
    
    if (slug) {
      loadArticleBySlug(slug);
    } else {
      fetchNews();
    }
  }, [slug, loadArticleBySlug, fetchNews]);

  const extractTags = useCallback((newsData) => {
    const tags = new Set();
    newsData.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => tags.add(tag));
      }
    });
    setAvailableTags([...tags].sort());
  }, []);

  const handleArticleSelect = useCallback((articleSlugOrId) => {
    navigate(`/news/${articleSlugOrId}`);
  }, [navigate]);

  const handleBackToList = useCallback(() => {
    navigate('/news');
  }, [navigate]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handleTagFilter = useCallback((tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [selectedTag]);

  const handlePageChange = useCallback((newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  }, []);

  // ✅ Loading state avec message personnalisé
  if (authLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.loadingContainer}>
            <Loader />
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>
              Vérification de votre session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Message si non authentifié
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.authRequired}>
            <div className={styles.authRequiredCard}>
              <div className={styles.lockIcon}>
                <FaLock size={64} />
              </div>
              
              <h2 className={styles.authRequiredTitle}>
                Contenu Réservé aux Membres
              </h2>
              
              <p className={styles.authRequiredText}>
                Pour accéder aux actualités et rester informé de nos actions,
                vous devez être connecté.
              </p>

              <div className={styles.authRequiredBenefits}>
                <h3>En vous connectant :</h3>
                <ul>
                  <li>📰 Lisez toutes nos actualités</li>
                  <li>💬 Commentez et échangez</li>
                  <li>📌 Sauvegardez vos favoris</li>
                  <li>🔔 Recevez des notifications</li>
                </ul>
              </div>

              <div className={styles.authRequiredActions}>
                <Link to="/login" className={styles.btnPrimary}>
                  <FaSignInAlt /> Se connecter
                </Link>
                <Link to="/register" className={styles.btnSecondary}>
                  <FaUserPlus /> Créer un compte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Affichage d'un article
  if (selectedArticle?.id) {
    return (
      <NewsArticle 
        article={selectedArticle}
        onBack={handleBackToList}
        onRelatedArticle={handleArticleSelect}
      />
    );
  }

  // ✅ Page principale avec gestion d'erreur améliorée
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Actualités</h1>
          <p className={styles.subtitle}>
            Restez informé de nos dernières actions sur le terrain
          </p>
          {user && (
            <p className={styles.welcomeText}>
              Bienvenue, <strong>{user.name}</strong> 👋
            </p>
          )}
        </div>

        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Rechercher
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader />
            {retryCount > 0 && (
              <p style={{ marginTop: '1rem', color: '#6b7280' }}>
                Tentative {retryCount}...
              </p>
            )}
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <div className={styles.errorBox}>
              <h3 className={styles.errorTitle}>Erreur de chargement</h3>
              <p className={styles.errorMessage}>{error}</p>
              
              {error.includes('temps') && (
                <p className={styles.errorHint}>
                  💡 Le serveur semble lent. Vérifiez votre connexion.
                </p>
              )}
              
              <button onClick={handleRetry} className={styles.retryButton}>
                <FaRedo /> Réessayer
              </button>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>Aucune actualité trouvée</p>
          </div>
        ) : (
          <NewsGrid news={news} onArticleSelect={handleArticleSelect} />
        )}
      </div>
    </div>
  );
}