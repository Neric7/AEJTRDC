import { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './NewsArticle.module.css';

export default function NewsArticle({ article, onBack, onRelatedArticle }) {
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    fetchRelatedArticles();
  }, [article.id]);

  const fetchRelatedArticles = async () => {
    try {
      const response = await api.get(`/news/${article.id}/related`);
      setRelatedArticles(response.data);
    } catch (error) {
      console.error('Erreur chargement articles connexes:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className={styles.backButton}
        >
          Retour aux actualités
        </button>

        {/* Article principal */}
        <article className={styles.article}>
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className={styles.heroImage}
            />
          )}
          
          <div className={styles.articleContent}>
            {/* Tags */}
            <div className={styles.tags}>
              {article.tags?.map(tag => (
                <span 
                  key={tag}
                  className={styles.tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Titre */}
            <h1 className={styles.title}>
              {article.title}
            </h1>

            {/* Métadonnées */}
            <div className={styles.meta}>
              <span className={`${styles.metaItem} ${styles.metaAuthor}`}>
                Par {article.author}
              </span>
              <span className={styles.metaSeparator}>•</span>
              <span className={styles.metaItem}>
                {new Date(article.published_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className={styles.metaSeparator}>•</span>
              <span className={`${styles.metaItem} ${styles.metaViews}`}>
                {article.views} vues
              </span>
            </div>

            {/* Extrait */}
            <p className={styles.excerpt}>
              {article.excerpt}
            </p>

            {/* Contenu */}
            <div className={styles.body}>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </article>

        {/* Articles connexes */}
        {relatedArticles.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>
              Articles connexes
            </h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map(related => (
                <div 
                  key={related.id}
                  className={styles.relatedCard}
                  onClick={() => onRelatedArticle(related.id)}
                >
                  {related.image && (
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className={styles.relatedImage}
                    />
                  )}
                  <div className={styles.relatedContent}>
                    <h3 className={styles.relatedCardTitle}>
                      {related.title}
                    </h3>
                    <p className={styles.relatedExcerpt}>
                      {related.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}