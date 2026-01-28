import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './NewsArticle.module.css';

export default function NewsArticle({ article, onBack, onRelatedArticle, allNews = [] }) {
  const { user, isAuthenticated } = useAuth();
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [imageError, setImageError] = useState(false);
  
  // États pour la galerie lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // États pour les commentaires
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState(5);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentFormData, setCommentFormData] = useState({
    message: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState({});

  const COMMENTS_PER_PAGE = 5;
  const MAX_RELATED_ARTICLES = 4;

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
      
      if (article.tags && article.tags.length > 0) {
        const tag = article.tags[0];
        try {
          const response = await api.get(`/news/tag/${tag}`);
          const articles = Array.isArray(response.data) 
            ? response.data 
            : (response.data?.data || response.data?.articles || []);
          
          related = articles.filter(item => item.id !== article.id);
        } catch (error) {
          console.warn('Pas d\'articles avec ce tag');
        }
      }
      
      if (related.length < MAX_RELATED_ARTICLES && allNews.length > 0) {
        const otherArticles = allNews
          .filter(item => item.id !== article.id)
          .filter(item => !related.some(r => r.id === item.id));
        
        related = [...related, ...otherArticles];
      }
      
      if (related.length === 0) {
        try {
          const response = await api.get('/news');
          const articles = Array.isArray(response.data)
            ? response.data
            : (response.data?.data || response.data?.news || []);
          
          related = articles.filter(item => item.id !== article.id);
        } catch (error) {
          console.error('Erreur récupération articles:', error);
        }
      }
      
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

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => 
      prev < (article.images_urls?.length || 0) - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setLightboxIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

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
    setCommentFormData({ message: '' });
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setCommentFormData({ message: '' });
  };

  const toggleReplies = (commentId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
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

  const renderComment = (comment) => {
    const isReplying = replyingTo === comment.id;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const repliesExpanded = expandedReplies[comment.id];

    return (
      <div key={comment.id} className={styles.commentItem}>
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
        
        <div className={styles.commentActions}>
          {isAuthenticated && (
            <button
              onClick={() => handleReplyClick(comment.id)}
              className={styles.replyButton}
            >
              Répondre
            </button>
          )}
          
          {hasReplies && (
            <button
              onClick={() => toggleReplies(comment.id)}
              className={styles.showRepliesButton}
            >
              {repliesExpanded ? 'Masquer' : `Afficher ${comment.replies.length}`} {comment.replies.length > 1 ? 'réponses' : 'réponse'}
            </button>
          )}
        </div>

        {isReplying && (
          <div className={styles.replyForm}>
            <h4>Répondre à {comment.name || comment.author}</h4>
            <p className={styles.formUserInfo}>
              Commenter en tant que <strong>{user?.name}</strong>
            </p>
            <textarea
              name="message"
              value={commentFormData.message}
              onChange={handleCommentFormChange}
              required
              rows="4"
              className={styles.textarea}
              placeholder="Écrivez votre réponse..."
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
        )}

        {hasReplies && repliesExpanded && (
          <div className={styles.repliesContainer}>
            {comment.replies.map(reply => (
              <div key={reply.id} className={styles.replyItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentAvatar}>
                    {getInitials(reply.name || reply.author)}
                  </div>
                  <div className={styles.commentMeta}>
                    <div className={styles.commentAuthor}>
                      {reply.name || reply.author || 'Anonyme'}
                    </div>
                    <div className={styles.commentDate}>
                      {formatDate(reply.created_at || reply.createdAt)}
                    </div>
                  </div>
                </div>
                <div className={styles.commentBody}>
                  {reply.message || reply.content || reply.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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
      <div className={styles.backButtonContainer}>
        <button onClick={onBack} className={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Retour aux actualités</span>
        </button>
      </div>

      <div className={styles.articleLayout}>
        <main className={styles.mainContent}>
          <article className={styles.articleCard}>
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

            <h1 className={styles.title}>{article.title}</h1>

            {article.excerpt && (
              <div className={styles.excerpt}>{article.excerpt}</div>
            )}

            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ 
                __html: formatContent(article.content) 
              }} />
            </div>

            {/* 🖼️ GALERIE PHOTOS */}
            {article.images_urls && article.images_urls.length > 0 && (
              <div className={styles.photoGallery}>
                <h3 className={styles.galleryTitle}>
                  Galerie photos ({article.images_urls.length})
                </h3>
                <div className={styles.galleryGrid}>
                  {article.images_urls.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={styles.galleryItem}
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={imageUrl}
                        alt={`${article.title} - Photo ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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

            {showCommentForm && isAuthenticated && !replyingTo && (
              <div className={styles.commentForm}>
                <h3>Laisser un commentaire</h3>
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
                  placeholder="Partagez votre commentaire..."
                />
                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCommentForm(false);
                      setCommentFormData({ message: '' });
                    }}
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
            )}

            <div className={styles.commentsList}>
              {visibleComments.length === 0 ? (
                <p className={styles.noComments}>
                  Aucun commentaire pour le moment. Soyez le premier à commenter !
                </p>
              ) : (
                <>
                  {visibleComments.map(comment => renderComment(comment))}
                  
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

        {/* Sidebar */}
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

          <div className={styles.ctaCard}>
            <h4 className={styles.ctaTitle}>Soutenez notre action</h4>
            <p className={styles.ctaText}>
              Votre don peut changer des vies. Rejoignez-nous dans notre mission.
            </p>
            <Link to="/donate" className={styles.ctaButton}>
              Faire un don
            </Link>
          </div>
        </aside>
      </div>

      {/* 🔦 LIGHTBOX */}
      {lightboxOpen && article.images_urls && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox}>
              <X size={24} />
            </button>
            
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={prevImage}
              disabled={lightboxIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={article.images_urls[lightboxIndex]}
              alt={`${article.title} - Photo ${lightboxIndex + 1}`}
              className={styles.lightboxImage}
            />

            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={nextImage}
              disabled={lightboxIndex === article.images_urls.length - 1}
            >
              <ChevronRight size={24} />
            </button>

            <div className={styles.lightboxCounter}>
              {lightboxIndex + 1} / {article.images_urls.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}