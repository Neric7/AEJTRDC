import { useState } from 'react';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './NewsGrid.module.css';

export default function NewsGrid({ news, onArticleSelect }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (articleId, e) => {
    if (!imageErrors[articleId]) {
      console.error('❌ Erreur chargement image pour article:', articleId);
      setImageErrors(prev => ({ ...prev, [articleId]: true }));
      e.target.src = '/images/placeholder-news.jpg';
    }
  };

  return (
    <div className={styles.grid}>
      {news.map(article => {
        // Utiliser image_url si disponible, sinon construire l'URL
        const imageUrl = article.image_url || getImageUrl(article.image);
        
        // Debug uniquement en développement
        if (import.meta.env.MODE === 'development') {
          console.log('🖼️ NewsGrid - Image URL:', {
            id: article.id,
            title: article.title,
            image: article.image,
            image_url: article.image_url,
            finalUrl: imageUrl
          });
        }

        return (
          <div 
            key={article.id}
            className={styles.card}
            onClick={() => onArticleSelect(article.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onArticleSelect(article.id);
              }
            }}
          >
            {/* Image */}
            {(article.image || article.image_url) && (
              <div className={styles.imageWrapper}>
                <img 
                  src={imageUrl}
                  alt={article.title}
                  className={styles.image}
                  onError={(e) => handleImageError(article.id, e)}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
              </div>
            )}
            
            {/* Contenu */}
            <div className={styles.content}>
              {/* Tags */}
              <div className={styles.tags}>
                {article.tags?.map((tag, index) => (
                  <span 
                    key={`${tag}-${index}`}
                    className={styles.tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Titre */}
              <h3 className={styles.title}>
                {article.title}
              </h3>
              
              {/* Extrait */}
              <p className={styles.excerpt}>
                {article.excerpt}
              </p>
              
              {/* Footer */}
              <div className={styles.footer}>
                <span className={styles.author}>
                  {article.author || 'AEJT-RDC'}
                </span>
                <span className={styles.date}>
                  {new Date(article.published_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}