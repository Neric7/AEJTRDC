import { useState } from 'react';
import { getImageUrl } from '../../utils/imageHelper';
import styles from './ProjectGrid.module.css';

export default function ProjectGrid({ projects, onProjectSelect }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (projectId, e) => {
    if (!imageErrors[projectId]) {
      console.error('❌ Erreur chargement image pour projet:', projectId);
      setImageErrors(prev => ({ ...prev, [projectId]: true }));
      e.target.src = '/images/placeholder-project.jpg';
    }
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

  const formatBeneficiaries = (count) => {
    if (!count) return '0';
    return count.toLocaleString('fr-FR');
  };

  return (
    <div className={styles.grid}>
      {projects.map(project => {
        const imageUrl = project.image_url || getImageUrl(project.image);
        
        // Debug uniquement en développement
        if (import.meta.env.MODE === 'development') {
          console.log('🖼️ ProjectGrid - Image URL:', {
            id: project.id,
            title: project.title,
            image: project.image,
            image_url: project.image_url,
            finalUrl: imageUrl
          });
        }

        return (
          <div 
            key={project.id}
            className={styles.card}
            onClick={() => onProjectSelect(project.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onProjectSelect(project.id);
              }
            }}
          >
            {/* Image */}
            {(project.image || project.image_url) && (
              <div className={styles.imageWrapper}>
                <img 
                  src={imageUrl}
                  alt={project.title}
                  className={styles.image}
                  onError={(e) => handleImageError(project.id, e)}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
                
                {/* Badge statut sur l'image */}
                <div className={`${styles.statusBadge} ${getStatusBadgeClass(project.status)}`}>
                  {project.status_label || project.status}
                </div>
              </div>
            )}
            
            {/* Contenu */}
            <div className={styles.content}>
              {/* Domaine */}
              {project.domain && (
                <div className={styles.domain}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  <span>{project.domain.name}</span>
                </div>
              )}
              
              {/* Titre */}
              <h3 className={styles.title}>
                {project.title}
              </h3>
              
              {/* Extrait */}
              <p className={styles.excerpt}>
                {project.excerpt}
              </p>
              
              {/* Infos complémentaires */}
              <div className={styles.metadata}>
                {/* Zone d'exécution */}
                {project.execution_zone && (
                  <div className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{project.execution_zone}</span>
                  </div>
                )}
                
                {/* Bénéficiaires */}
                {project.beneficiaries_count > 0 && (
                  <div className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    <span>{formatBeneficiaries(project.beneficiaries_count)} bénéficiaires</span>
                  </div>
                )}
              </div>
              
              {/* Bouton d'action */}
              <div className={styles.footer}>
                <button className={styles.viewButton}>
                  Voir le projet
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}