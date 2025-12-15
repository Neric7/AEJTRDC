import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import NewsArticle from '../components/news/NewsArticle';
import Loader from '../components/common/Loader';
import { FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import styles from './NewsPage.module.css';

export default function NewsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  
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

  // Scroller vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Charger un article spécifique si un slug est présent dans l'URL
  useEffect(() => {
    // Attendre que authLoading soit terminé
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

  // Charger les news quand on est sur la liste
  useEffect(() => {
    if (authLoading) return;
    
    if (!slug && isAuthenticated) {
      fetchNews();
    }
  }, [pagination.page, search, selectedTag, isAuthenticated, authLoading]);

  const loadArticleBySlug = async (articleSlug) => {
    // Vérifier l'authentification
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Loading article:', articleSlug);

      const response = await api.get(`/news/${articleSlug}`);
      
      if (response && response.data) {
        setSelectedArticle(response.data);
      } else {
        throw new Error('Article non trouvé');
      }

    } catch (err) {
      console.error('💥 Error loading article:', err);
      
      // Gérer les erreurs 401 (non authentifié)
      if (err.response?.status === 401) {
        setError('Vous devez être connecté pour lire cet article');
      } else {
        setError('Article non trouvé');
      }
      
      // Rediriger vers la liste après 2 secondes
      setTimeout(() => {
        navigate('/news');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

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

      // Gérer différents formats de réponse
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
      } else if (Array.isArray(response)) {
        setNews(response);
      } else {
        console.warn('Format de réponse inattendu:', response);
        setNews([]);
      }

      extractTags(news);

    } catch (err) {
      console.error('💥 Fetch error:', err);
      
      // Gérer spécifiquement l'erreur 401
      if (err.response?.status === 401) {
        setError('Votre session a expiré. Veuillez vous reconnecter.');
        // Optionnel : déconnecter l'utilisateur
        // logout();
      } else {
        const errorMessage = err.response?.data?.message 
          || err.message 
          || 'Erreur de connexion au serveur';
        setError(errorMessage);
      }
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

  const handleArticleSelect = (articleSlugOrId) => {
    navigate(`/news/${articleSlugOrId}`);
  };

  const handleBackToList = () => {
    navigate('/news');
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

  // 🔄 LOADING : Attendre l'initialisation de l'auth
  if (authLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.loadingContainer}>
            <Loader />
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>Vérification de votre session...</p>
          </div>
        </div>
      </div>
    );
  }

  // 🔒 NON AUTHENTIFIÉ : Afficher le message de restriction
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
                Pour accéder aux actualités et rester informé de nos actions sur le terrain,
                vous devez être connecté à votre compte.
              </p>

              <div className={styles.authRequiredBenefits}>
                <h3>En vous connectant, vous pouvez :</h3>
                <ul>
                  <li>📰 Lire toutes nos actualités</li>
                  <li>💬 Commenter et échanger</li>
                  <li>📌 Sauvegarder vos articles favoris</li>
                  <li>🔔 Recevoir des notifications</li>
                </ul>
              </div>

              <div className={styles.authRequiredActions}>
                <Link to="/login" className={styles.btnPrimary}>
                  <FaSignInAlt />
                  Se connecter
                </Link>
                <Link to="/register" className={styles.btnSecondary}>
                  <FaUserPlus />
                  Créer un compte
                </Link>
              </div>

              <p className={styles.authRequiredFooter}>
                Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ AUTHENTIFIÉ : Afficher le contenu normalement

  // Si un article est sélectionné
  if (selectedArticle && selectedArticle.id) {
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
          {user && (
            <p className={styles.welcomeText}>
              Bienvenue, <strong>{user.name}</strong> 👋
            </p>
          )}
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
                onClick={() => slug ? navigate('/news') : fetchNews()}
                className={styles.retryButton}
              >
                {slug ? 'Retour à la liste' : 'Réessayer'}
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