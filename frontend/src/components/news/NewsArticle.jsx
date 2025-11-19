import { useState, useEffect } from 'react';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './NewsArticle.module.css';

export default function NewsArticle({ article, onBack, onRelatedArticle }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [imageError, setImageError] = useState(false);
  
  // État pour les commentaires
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (article?.id) {
      fetchRelatedArticles();
      fetchComments();
    }
  }, [article?.id]);

  const fetchRelatedArticles = async () => {
    try {
      // Essayer de charger des articles avec les mêmes tags
      if (article.tags && article.tags.length > 0) {
        const tag = article.tags[0];
        const response = await api.get(`/news/tag/${tag}`);
        
        // S'assurer que response.data est un tableau
        const articles = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data || response.data?.articles || []);
        
        // Filtrer l'article actuel et limiter à 3 articles
        const filtered = articles
          .filter(item => item.id !== article.id)
          .slice(0, 3);
        
        setRelatedArticles(filtered);
      }
    } catch (error) {
      console.error('Erreur chargement articles connexes:', error);
      setRelatedArticles([]);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/news/${article.id}/comments`);
      setComments(response.data || []);
    } catch (error) {
      console.error('Erreur chargement commentaires:', error);
      // Utiliser des commentaires de démonstration si l'API n'est pas prête
      setComments([
        {
          id: 1,
          name: 'Marie Kalala',
          email: 'marie@example.com',
          message: 'Excellente initiative ! Merci pour tout ce que vous faites pour nos enfants.',
          created_at: new Date().toISOString(),
          replies: []
        },
        {
          id: 2,
          name: 'Jean-Pierre Mukendi',
          email: 'jean@example.com',
          message: 'Ce programme est vraiment nécessaire. Comment peut-on participer en tant que bénévole ?',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          replies: []
        }
      ]);
    }
  };

  const handleCommentFormChange = (e) => {
    const { name, value } = e.target;
    setCommentFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmittingComment(true);

    try {
      // Envoyer le commentaire à l'API
      const response = await api.post(`/news/${article.id}/comments`, commentFormData);
      
      // Ajouter le nouveau commentaire à la liste
      setComments(prev => [response.data, ...prev]);
      
      // Réinitialiser le formulaire
      setCommentFormData({ name: '', email: '', message: '' });
      setShowCommentForm(false);
      
      alert('Commentaire publié avec succès !');
    } catch (error) {
      console.error('Erreur soumission commentaire:', error);
      alert('Erreur lors de la publication du commentaire. Veuillez réessayer.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = '/images/placeholder-news.jpg';
    }
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    // Convertir les retours à la ligne en paragraphes
    return content
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!article) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p style={{ padding: '2rem', textAlign: 'center' }}>
            Article introuvable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className={styles.backButton}
          aria-label="Retour aux actualités"
        >
          Retour aux actualités
        </button>

        {/* Article principal */}
        <article className={styles.article}>
          
          {/* Hero Section: Image + Title side by side */}
          <div className={styles.heroSection}>
            {/* Image à gauche */}
            {article.image && (
              <div>
                <img 
                  src={getImageUrl(article.image)}
                  alt={article.title}
                  className={styles.heroImage}
                  onError={handleImageError}
                  loading="eager"
                />
              </div>
            )}
            
            {/* Header Content à droite (Tags + Title + Meta) */}
            <div className={styles.headerContent}>
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className={styles.tags}>
                  {article.tags.map((tag, index) => (
                    <span 
                      key={`${tag}-${index}`}
                      className={styles.tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Titre */}
              <h1 className={styles.title}>
                {article.title}
              </h1>

              {/* Métadonnées */}
              <div className={styles.meta}>
                <span className={`${styles.metaItem} ${styles.metaAuthor}`}>
                  Par {article.author || 'AEJT-RDC'}
                </span>
                <span className={styles.metaSeparator}>•</span>
                <span className={styles.metaItem}>
                  {new Date(article.published_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {article.views && (
                  <>
                    <span className={styles.metaSeparator}>•</span>
                    <span className={`${styles.metaItem} ${styles.metaViews}`}>
                      {article.views.toLocaleString('fr-FR')} vues
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Section: Excerpt + Body (full width below) */}
          <div className={styles.articleContent}>
            {/* Extrait */}
            {article.excerpt && (
              <p className={styles.excerpt}>
                {article.excerpt}
              </p>
            )}

            {/* Contenu */}
            <div className={styles.body}>
              <div dangerouslySetInnerHTML={{ 
                __html: formatContent(article.content) 
              }} />
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
                  onClick={() => onRelatedArticle(related.slug || related.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onRelatedArticle(related.slug || related.id);
                    }
                  }}
                >
                  {related.image && (
                    <div style={{ overflow: 'hidden' }}>
                      <img 
                        src={getImageUrl(related.image)}
                        alt={related.title}
                        className={styles.relatedImage}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-news.jpg';
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className={styles.relatedContent}>
                    <h3 className={styles.relatedCardTitle}>
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className={styles.relatedExcerpt}>
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Commentaires */}
        <div className={styles.commentsSection}>
          <div className={styles.commentsSectionHeader}>
            <h2 className={styles.commentsTitle}>
              Commentaires ({comments.length})
            </h2>
            {!showCommentForm && (
              <button
                onClick={() => setShowCommentForm(true)}
                className={styles.addCommentButton}
              >
                Ajouter un commentaire
              </button>
            )}
          </div>

          {/* Formulaire de commentaire */}
          {showCommentForm && (
            <div className={styles.commentFormWrapper}>
              <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={commentFormData.name}
                    onChange={handleCommentFormChange}
                    className={styles.formInput}
                    required
                    placeholder="Votre nom"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={commentFormData.email}
                    onChange={handleCommentFormChange}
                    className={styles.formInput}
                    required
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Commentaire *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={commentFormData.message}
                    onChange={handleCommentFormChange}
                    className={styles.formTextarea}
                    required
                    rows="5"
                    placeholder="Partagez votre commentaire..."
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className={styles.cancelButton}
                    disabled={submittingComment}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={submittingComment}
                  >
                    {submittingComment ? 'Publication...' : 'Publier'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Liste des commentaires */}
          <div className={styles.commentsList}>
            {comments.length === 0 ? (
              <p className={styles.noComments}>
                Aucun commentaire pour le moment. Soyez le premier à commenter !
              </p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <div className={styles.commentAvatar}>
                      {getInitials(comment.name || comment.author)}
                    </div>
                    <div className={styles.commentMeta}>
                      <div className={styles.commentAuthor}>
                        {comment.name || comment.author || 'Anonyme'}
                      </div>
                      <div className={styles.commentDate}>
                        {formatDate(comment.created_at || comment.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className={styles.commentBody}>
                    {comment.message || comment.content || comment.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}