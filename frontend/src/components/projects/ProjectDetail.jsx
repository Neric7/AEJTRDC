import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project, onBack, onRelatedProject, allProjects = [] }) {
  const { user, isAuthenticated } = useAuth();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const sidebarRef = useRef(null);

  const MAX_RELATED_PROJECTS = 4;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (project?.id) {
      fetchRelatedProjects();
    }
  }, [project?.id]);

  const fetchRelatedProjects = async () => {
    try {
      let related = [];
      
      if (project.domain?.id) {
        try {
          const response = await api.get(`/projects/domain/${project.domain.id}`);
          const projects = Array.isArray(response.data) 
            ? response.data 
            : (response.data?.data || response.data?.projects || []);
          
          related = projects.filter(item => item.id !== project.id);
        } catch (error) {
          console.warn('Pas de projets dans ce domaine');
        }
      }
      
      if (related.length < MAX_RELATED_PROJECTS && allProjects.length > 0) {
        const otherProjects = allProjects
          .filter(item => item.id !== project.id)
          .filter(item => !related.some(r => r.id === item.id));
        
        related = [...related, ...otherProjects];
      }
      
      const sortedRelated = related
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, MAX_RELATED_PROJECTS);
      
      setRelatedProjects(sortedRelated);
      
    } catch (error) {
      console.error('Erreur chargement projets connexes:', error);
      setRelatedProjects([]);
    }
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = '/images/placeholder-project.jpg';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'planning': styles.statusPlanning,
      'ongoing': styles.statusOngoing,
      'completed': styles.statusCompleted,
      'suspended': styles.statusSuspended
    };
    return statusClasses[status] || styles.statusDefault;
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (!project) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorMessage}>
          <p>Projet introuvable</p>
          <button onClick={onBack} className={styles.backButton}>
            Retour aux projets
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
          <span>Retour aux projets</span>
        </button>
      </div>

      <div className={styles.projectLayout}>
        {/* Contenu principal */}
        <main className={styles.mainContent}>
          <article className={styles.projectCard}>
            {/* Image principale */}
            {project.image && (
              <div className={styles.imageContainer}>
                <img 
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className={styles.heroImage}
                  onError={handleImageError}
                  loading="eager"
                  onClick={() => openImageModal(getImageUrl(project.image))}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}

            {/* En-tête du projet */}
            <div className={styles.projectHeader}>
              <div className={styles.metadata}>
                <span className={`${styles.statusBadge} ${getStatusBadgeClass(project.status)}`}>
                  {project.status_label || project.status}
                </span>
                {project.domain && (
                  <span className={styles.domain}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    {project.domain.name}
                  </span>
                )}
              </div>
              
              <h1 className={styles.title}>{project.title}</h1>
              
              {project.excerpt && (
                <p className={styles.excerpt}>{project.excerpt}</p>
              )}

              <div className={styles.projectInfo}>
                <div className={styles.infoItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <strong>Zone d'exécution</strong>
                    <span>{project.execution_zone}</span>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
                  </svg>
                  <div>
                    <strong>Période</strong>
                    <span>{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                  </div>
                </div>
                
                {project.beneficiaries_count > 0 && (
                  <div className={styles.infoItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    <div>
                      <strong>Bénéficiaires</strong>
                      <span>{project.beneficiaries_count.toLocaleString('fr-FR')} personnes</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Objectif du projet */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Objectif du projet
              </h2>
              <p className={styles.objective}>{project.objective}</p>
            </section>

            {/* Résultats obtenus */}
            {project.results && project.results.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                  Résultats obtenus
                </h2>
                <ul className={styles.resultsList}>
                  {project.results.map((result, index) => (
                    <li key={index} className={styles.resultItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Indicateurs */}
            {project.indicators && project.indicators.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                  Indicateurs clés
                </h2>
                <div className={styles.indicatorsGrid}>
                  {project.indicators.map((indicator, index) => (
                    <div key={index} className={styles.indicatorCard}>
                      <div className={styles.indicatorValue}>
                        {indicator.value}
                        {indicator.unit && <span className={styles.indicatorUnit}>{indicator.unit}</span>}
                      </div>
                      <div className={styles.indicatorLabel}>{indicator.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Galerie photos */}
            {project.images && project.images.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  Galerie photos
                </h2>
                <div className={styles.gallery}>
                  {project.images.map((img, index) => (
                    <img
                      key={index}
                      src={getImageUrl(img)}
                      alt={`${project.title} - Photo ${index + 1}`}
                      className={styles.galleryImage}
                      onClick={() => openImageModal(getImageUrl(img))}
                      onError={(e) => { e.target.src = '/images/placeholder-project.jpg'; }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Témoignages */}
            {project.testimonials && project.testimonials.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                  Témoignages
                </h2>
                <div className={styles.testimonials}>
                  {project.testimonials.map((testimonial, index) => (
                    <div key={index} className={styles.testimonialCard}>
                      <div className={styles.testimonialHeader}>
                        {testimonial.photo && (
                          <img
                            src={getImageUrl(testimonial.photo)}
                            alt={testimonial.name}
                            className={styles.testimonialPhoto}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                        <div className={styles.testimonialInfo}>
                          <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                          <p className={styles.testimonialRole}>{testimonial.role}</p>
                        </div>
                      </div>
                      <p className={styles.testimonialMessage}>"{testimonial.message}"</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Partenaires */}
            {project.partners && project.partners.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  Partenaires
                </h2>
                <div className={styles.partners}>
                  {project.partners.map((partner, index) => (
                    <span key={index} className={styles.partnerBadge}>{partner}</span>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>

        {/* Sidebar avec ref */}
        <aside ref={sidebarRef} className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Autres projets</h3>
            <div className={styles.otherProjectsList}>
              {relatedProjects.length > 0 ? (
                relatedProjects.map((related) => (
                  <div 
                    key={related.id} 
                    className={styles.otherProjectItem}
                    onClick={() => onRelatedProject(related.slug || related.id)}
                  >
                    {related.image && (
                      <img 
                        src={getImageUrl(related.image)} 
                        alt={related.title}
                        className={styles.otherProjectImage}
                        onError={(e) => { e.target.src = '/images/placeholder-project.jpg'; }}
                      />
                    )}
                    <div className={styles.otherProjectContent}>
                      <h4 className={styles.otherProjectTitle}>{related.title}</h4>
                      <span className={styles.otherProjectZone}>
                        📍 {related.execution_zone}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noOtherProjects}>Aucun autre projet disponible</p>
              )}
            </div>
          </div>

          <div className={styles.ctaCard}>
            <h4 className={styles.ctaTitle}>Soutenez nos projets</h4>
            <p className={styles.ctaText}>
              Votre soutien permet de réaliser ces projets qui changent des vies.
            </p>
            <button className={styles.ctaButton}>
              Faire un don
            </button>
          </div>
        </aside>
      </div>

      {/* Modal pour afficher l'image en grand */}
      {selectedImage && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div className={styles.imageModalContent}>
            <button className={styles.closeModal} onClick={closeImageModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <img src={selectedImage} alt="Agrandir" className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
}