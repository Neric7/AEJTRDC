import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './NewsArticle.module.css';

export default function NewsArticle({ article, onBack, onRelatedArticle, allNews = [] }) {
  const { user, isAuthenticated } = useAuth();
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [imageError, setImageError] = useState(false);
  
  // États pour les commentaires
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState(5);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentFormData, setCommentFormData] = useState({
    message: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  const COMMENTS_PER_PAGE = 5;
  const MAX_RELATED_ARTICLES = 4; // ✅ Limité à 4

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (article?.id) {
      fetchRelatedArticles();
      fetchComments();
    }
  }, [article?.id]);

  const fetchRelatedArticles = async () => {
    try {
      let related = [];
      
      // 1️⃣ Essayer d'abord de récupérer par tag
      if (article.tags && article.tags.length > 0) {
        const tag = article.tags[0];
        try {
          const response = await api.get(`/news/tag/${tag}`);
          const articles = Array.isArray(response.data) 
            ? response.data 
            : (response.data?.data || response.data?.articles || []);
          
          related = articles.filter(item => item.id !== article.id);
        } catch (error) {
          console.warn('Pas d\'articles avec ce tag, utilisation de tous les articles');
        }
      }
      
      // 2️⃣ Si pas assez d'articles via tag, utiliser tous les articles disponibles
      if (related.length < MAX_RELATED_ARTICLES && allNews.length > 0) {
        const otherArticles = allNews
          .filter(item => item.id !== article.id)
          .filter(item => !related.some(r => r.id === item.id));
        
        related = [...related, ...otherArticles];
      }
      
      // 3️⃣ Si toujours rien, récupérer tous les articles depuis l'API
      if (related.length === 0) {
        try {
          const response = await api.get('/news');
          const articles = Array.isArray(response.data)
            ? response.data
            : (response.data?.data || response.data?.news || []);
          
          related = articles.filter(item => item.id !== article.id);
        } catch (error) {
          console.error('Erreur récupération articles depuis API:', error);
        }
      }
      
      // 4️⃣ Trier par date (plus récent en premier) et limiter à 4
      const sortedRelated = related
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, MAX_RELATED_ARTICLES);
      
      setRelatedArticles(sortedRelated);
      
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

  const handleLoadMoreComments = () => {
    setDisplayedComments(prev => prev + COMMENTS_PER_PAGE);
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
        setComments(prev => [response.data, ...prev]);
      }
      
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

  const visibleComments = comments.slice(0, displayedComments);
  const hasMoreComments = comments.length > displayedComments;
  const totalComments = comments.length;

  const renderComment = (comment, isReply = false) => (
    <div 
      key={comment.id} 
      className={`${styles.commentItem} ${isReply ? styles.replyItem : ''}`}
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
      
      {!isReply && isAuthenticated && (
        <button
          onClick={() => handleReplyClick(comment.id)}
          className={styles.replyButton}
        >
          Répondre
        </button>
      )}

      {!isReply && comment.replies && comment.replies.length > 0 && (
        <div className={styles.repliesContainer}>
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  if (!article) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorMessage}>
          <p>Article introuvable</p>
          <button onClick={onBack} className={styles.backButton}>
            Retour aux actualités
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Bouton retour */}
      <div className={styles.backButtonContainer}>
        <button onClick={onBack} className={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Retour aux actualités</span>
        </button>
      </div>

      <div className={styles.articleLayout}>
        {/* Contenu principal - Gauche */}
        <main className={styles.mainContent}>
          {/* Article */}
          <article className={styles.articleCard}>
            {/* Image hero */}
            {article.image && (
              <div className={styles.imageContainer}>
                <img 
                  src={getImageUrl(article.image)}
                  alt={article.title}
                  className={styles.heroImage}
                  onError={handleImageError}
                  loading="eager"
                />
              </div>
            )}

            {/* Métadonnées */}
            <div className={styles.metadata}>
              {article.tags && article.tags.length > 0 && (
                <div className={styles.tags}>
                  {article.tags.map((tag, index) => (
                    <span key={`${tag}-${index}`} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className={styles.info}>
                <span className={styles.author}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  {article.author || 'AEJT-RDC'}
                </span>
                <span className={styles.date}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
                  </svg>
                  {new Date(article.published_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {article.views && (
                  <span className={styles.views}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {article.views || 0} vues
                  </span>
                )}
              </div>
            </div>

            {/* Titre */}
            <h1 className={styles.title}>{article.title}</h1>

            {/* Extrait */}
            {article.excerpt && (
              <div className={styles.excerpt}>{article.excerpt}</div>
            )}

            {/* Contenu */}
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ 
                __html: formatContent(article.content) 
              }} />
            </div>
          </article>

          {/* Section Commentaires */}
          <section className={styles.commentsSection}>
            <div className={styles.commentsSectionHeader}>
              <h2 className={styles.commentsTitle}>
                Commentaires ({totalComments})
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

            {/* Message connexion */}
            {!isAuthenticated && (
              <div className={styles.loginPrompt}>
                <p><strong>Vous devez être connecté pour commenter</strong></p>
                <p>
                  <a href="/login" className={styles.loginLink}>Se connecter</a>
                  {' ou '}
                  <a href="/register" className={styles.loginLink}>S'inscrire</a>
                </p>
              </div>
            )}

            {/* Formulaire */}
            {showCommentForm && isAuthenticated && (
              <div className={styles.commentForm}>
                <h3>
                  {replyingTo ? 'Répondre au commentaire' : 'Laisser un commentaire'}
                </h3>
                <div>
                  <p className={styles.formUserInfo}>
                    Commenter en tant que <strong>{user?.name}</strong>
                  </p>
                  <textarea
                    name="message"
                    value={commentFormData.message}
                    onChange={handleCommentFormChange}
                    required
                    rows="5"
                    className={styles.textarea}
                    placeholder={replyingTo ? "Écrivez votre réponse..." : "Partagez votre commentaire..."}
                  />
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
                      type="button"
                      onClick={handleCommentSubmit}
                      className={styles.submitButton}
                      disabled={submittingComment}
                    >
                      {submittingComment ? 'Publication...' : 'Publier'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste commentaires */}
            <div className={styles.commentsList}>
              {visibleComments.length === 0 ? (
                <p className={styles.noComments}>
                  Aucun commentaire pour le moment. Soyez le premier à commenter !
                </p>
              ) : (
                <>
                  {visibleComments.map(comment => renderComment(comment))}
                  
                  {/* Bouton Voir plus */}
                  {hasMoreComments && (
                    <button 
                      onClick={handleLoadMoreComments}
                      className={styles.loadMoreButton}
                    >
                      Voir plus de commentaires ({totalComments - displayedComments} restants)
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        </main>

        {/* Sidebar - Droite */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Autres actualités</h3>
            <div className={styles.otherNewsList}>
              {relatedArticles.length > 0 ? (
                relatedArticles.map((related) => (
                  <div 
                    key={related.id} 
                    className={styles.otherNewsItem}
                    onClick={() => onRelatedArticle(related.slug || related.id)}
                  >
                    {related.image && (
                      <img 
                        src={getImageUrl(related.image)} 
                        alt={related.title}
                        className={styles.otherNewsImage}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-news.jpg';
                        }}
                      />
                    )}
                    <div className={styles.otherNewsContent}>
                      <h4 className={styles.otherNewsTitle}>{related.title}</h4>
                      <span className={styles.otherNewsDate}>
                        {new Date(related.published_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noOtherNews}>Aucune autre actualité disponible</p>
              )}
            </div>
          </div>

          {/* CTA Card */}
          <div className={styles.ctaCard}>
            <h4 className={styles.ctaTitle}>Soutenez notre action</h4>
            <p className={styles.ctaText}>
              Votre don peut changer des vies. Rejoignez-nous dans notre mission.
            </p>
            <button className={styles.ctaButton}>
              Faire un don
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}