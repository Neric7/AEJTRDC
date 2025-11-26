import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './NewsArticle.module.css';

export default function NewsArticle({ article, onBack, onRelatedArticle }) {
  const { user, isAuthenticated } = useAuth();
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [imageError, setImageError] = useState(false);
  
  // État pour les commentaires
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // ID du commentaire auquel on répond
  const [commentFormData, setCommentFormData] = useState({
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
      if (article.tags && article.tags.length > 0) {
        const tag = article.tags[0];
        const response = await api.get(`/news/tag/${tag}`);
        
        const articles = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data || response.data?.articles || []);
        
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
      setComments([]);
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
    
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour commenter');
      return;
    }

    setSubmittingComment(true);

    try {
      const payload = {
        message: commentFormData.message,
        parent_id: replyingTo
      };

      const response = await api.post(`/news/${article.id}/comments`, payload);
      
      // Si c'est une réponse, l'ajouter au bon commentaire parent
      if (replyingTo) {
        setComments(prevComments => 
          prevComments.map(comment => {
            if (comment.id === replyingTo) {
              return {
                ...comment,
                replies: [...(comment.replies || []), response.data]
              };
            }
            return comment;
          })
        );
      } else {
        // Sinon, ajouter en tant que nouveau commentaire
        setComments(prev => [response.data, ...prev]);
      }
      
      // Réinitialiser le formulaire
      setCommentFormData({ message: '' });
      setShowCommentForm(false);
      setReplyingTo(null);
      
      alert(replyingTo ? 'Réponse publiée avec succès !' : 'Commentaire publié avec succès !');
    } catch (error) {
      console.error('Erreur soumission commentaire:', error);
      const errorMsg = error.response?.data?.message || 'Erreur lors de la publication du commentaire.';
      alert(errorMsg);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleReplyClick = (commentId) => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour répondre à un commentaire');
      return;
    }
    setReplyingTo(commentId);
    setShowCommentForm(true);
    setCommentFormData({ message: '' });
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setShowCommentForm(false);
    setCommentFormData({ message: '' });
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = '/images/placeholder-news.jpg';
    }
  };

  const formatContent = (content) => {
    if (!content) return '';
    
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

  const renderComment = (comment, isReply = false) => (
    <div 
      key={comment.id} 
      className={`${styles.comment} ${isReply ? styles.commentReply : ''}`}
    >
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
      
      {/* Bouton Répondre (uniquement pour les commentaires parents) */}
      {!isReply && isAuthenticated && (
        <button
          onClick={() => handleReplyClick(comment.id)}
          className={styles.replyButton}
        >
          Répondre
        </button>
      )}

      {/* Afficher les réponses */}
      {!isReply && comment.replies && comment.replies.length > 0 && (
        <div className={styles.repliesContainer}>
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

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
          
          {/* Hero Section */}
          <div className={styles.heroSection}>
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
            
            <div className={styles.headerContent}>
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

              <h1 className={styles.title}>
                {article.title}
              </h1>

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

          {/* Content Section */}
          <div className={styles.articleContent}>
            {article.excerpt && (
              <p className={styles.excerpt}>
                {article.excerpt}
              </p>
            )}

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
            {isAuthenticated && !showCommentForm && (
              <button
                onClick={() => {
                  setShowCommentForm(true);
                  setReplyingTo(null);
                }}
                className={styles.addCommentButton}
              >
                Ajouter un commentaire
              </button>
            )}
          </div>

          {/* Message de connexion */}
          {!isAuthenticated && (
            <div className={styles.loginPrompt}>
              <p>
                <strong>Vous devez être connecté pour commenter</strong>
              </p>
              <p>
                <a href="/login" className={styles.loginLink}>Se connecter</a> 
                {' ou '}
                <a href="/register" className={styles.loginLink}>S'inscrire</a>
              </p>
            </div>
          )}

          {/* Formulaire de commentaire */}
          {showCommentForm && isAuthenticated && (
            <div className={styles.commentFormWrapper}>
              <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                <div className={styles.formHeader}>
                  <p className={styles.formUserInfo}>
                    Commenter en tant que <strong>{user?.name}</strong>
                  </p>
                  {replyingTo && (
                    <p className={styles.replyingToInfo}>
                      En réponse à un commentaire
                    </p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    {replyingTo ? 'Votre réponse' : 'Votre commentaire'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={commentFormData.message}
                    onChange={handleCommentFormChange}
                    className={styles.formTextarea}
                    required
                    rows="5"
                    placeholder={replyingTo ? "Écrivez votre réponse..." : "Partagez votre commentaire..."}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={handleCancelReply}
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
              comments.map(comment => renderComment(comment))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}