import styles from './NewsGrid.module.css';

export default function NewsGrid({ news, onArticleSelect }) {
  return (
    <div className={styles.grid}>
      {news.map(article => (
        <div 
          key={article.id}
          className={styles.card}
          onClick={() => onArticleSelect(article.id)}
        >
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
          
          <div className={styles.content}>
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
            
            <h3 className={styles.title}>
              {article.title}
            </h3>
            
            <p className={styles.excerpt}>
              {article.excerpt}
            </p>
            
            <div className={styles.footer}>
              <span className={styles.author}>
                {article.author}
              </span>
              <span className={styles.date}>
                {new Date(article.published_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}