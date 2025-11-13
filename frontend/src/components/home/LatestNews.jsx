import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './LatestNews.module.css';

export default function LatestNews({ limit = 4 }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Appel à votre API pour récupérer les dernières actualités
        const response = await api.get('/news', {
          params: {
            limit: limit,
            page: 1,
            sort: 'published_at',
            order: 'desc'
          }
        });

        if (!mounted) return;

        // Gérer différents formats de réponse
        let newsData = [];
        if (response.data && Array.isArray(response.data)) {
          newsData = response.data;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          newsData = response.data.data;
        } else if (Array.isArray(response)) {
          newsData = response;
        }

        // Limiter aux n premiers articles
        setNews(newsData.slice(0, limit));

      } catch (err) {
        console.error('Erreur lors du chargement des actualités:', err);
        if (mounted) {
          setError('Impossible de charger les actualités');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchLatestNews();

    return () => {
      mounted = false;
    };
  }, [limit]);

  // État de chargement
  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Dernières Actualités</h2>
            <p className={styles.subtitle}>Restez informé de nos actions sur le terrain</p>
          </div>

          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.loadingCard}>
                <div className={styles.loadingImage}></div>
                <div className={styles.loadingContent}>
                  <div className={styles.loadingTitle}></div>
                  <div className={styles.loadingText}></div>
                  <div className={styles.loadingText}></div>
                  <div className={styles.loadingText}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // En cas d'erreur ou pas de données, ne rien afficher
  if (error || news.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Dernières Actualités</h2>
          <p className={styles.subtitle}>Restez informé de nos actions sur le terrain</p>
        </div>

        {/* Grid des articles */}
        <div className={styles.grid}>
          {news.map((article) => (
            <article key={article.id} className={styles.card}>
              {/* Image */}
              {article.image && (
                <div className={styles.imageWrapper}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>
              )}

              {/* Contenu */}
              <div className={styles.content}>
                {/* Tag */}
                {article.tags && article.tags.length > 0 && (
                  <span className={styles.tag}>
                    {article.tags[0]}
                  </span>
                )}

                {/* Titre */}
                <h3 className={styles.cardTitle}>
                  {article.title}
                </h3>

                {/* Date */}
                {article.published_at && (
                  <time className={styles.date} dateTime={article.published_at}>
                    {new Date(article.published_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}

                {/* Extrait */}
                <p className={styles.excerpt}>
                  {article.excerpt || article.content?.slice(0, 150)}
                </p>

                {/* Bouton */}
                <Link 
                  to={`/news/${article.slug || article.id}`} 
                  className={styles.readButton}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Lire l'article
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA pour voir toutes les actualités */}
        <div className={styles.ctaSection}>
          <Link 
            to="/news" 
            className={styles.ctaButton}
            onClick={() => window.scrollTo(0, 0)}
          >
            Voir toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  );
}