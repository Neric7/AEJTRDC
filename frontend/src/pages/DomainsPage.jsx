// src/pages/DomainsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaHeartbeat, FaBriefcase, FaLeaf, FaBullhorn, FaShieldAlt, FaRing, FaIndustry, FaUserMd, FaFootballBall, FaFemale, FaChild, FaAmbulance, FaArrowRight } from 'react-icons/fa';
import { getAllDomains } from '../services/domains';
import styles from './DomainsPage.module.css';

export default function DomainsPage() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping des icônes
  const iconMapping = {
    'FaGraduationCap': FaGraduationCap,
    'FaHeartbeat': FaHeartbeat,
    'FaBriefcase': FaBriefcase,
    'FaLeaf': FaLeaf,
    'FaBullhorn': FaBullhorn,
    'FaShieldAlt': FaShieldAlt,
    'FaRing': FaRing,
    'FaIndustry': FaIndustry,
    'FaUserMd': FaUserMd,
    'FaFootballBall': FaFootballBall,
    'FaFemale': FaFemale,
    'FaChild': FaChild,
    'FaAmbulance': FaAmbulance,
  };

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllDomains();
        
        if (response.success) {
          setDomains(response.data);
        } else {
          setError('Impossible de charger les domaines');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue lors du chargement des domaines');
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  if (loading) {
    return (
      <div className={styles.domainsPage}>
        <div className={styles.loadingContainer}>
          {/* Logo AEJT-RDC CENTRÉ VERTICALEMENT */}
          <div className={styles.logoCenterContainer}>
            <div className={styles.logoCircle}>
              <span className={styles.logoText}>AEJT-RDC</span>
            </div>
            
            {/* Animation de chargement */}
            <div className={styles.loadingAnimation}>
              <div className={styles.spinner}></div>
              <div className={styles.loadingTextContainer}>
                <h3 className={styles.loadingTitle}>Chargement des domaines</h3>
                <div className={styles.loadingDots}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
                <p className={styles.loadingSubtitle}>
                  Récupération des activités en cours...
                </p>
              </div>
            </div>
          </div>
          
          {/* Mini preview des cartes (animation) */}
          <div className={styles.cardsPreview}>
            <div className={styles.previewCard}></div>
            <div className={styles.previewCard}></div>
            <div className={styles.previewCard}></div>
          </div>
          
          {/* Message de patience */}
          <div className={styles.patienceMessage}>
            <svg className={styles.clockIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <p>Merci de patienter pendant le chargement</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.domainsPage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 className={styles.errorTitle}>Erreur de chargement</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            <svg className={styles.retryIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.domainsPage}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <span className={styles.headerBadge}>
            Nos Domaines d'Activités
          </span>
          <h1 className={styles.headerTitle}>
            Découvrez Nos Principales Activités
            <br />
            et Services pour la Communauté
          </h1>
        </div>
      </div>

      {/* Domains Grid Section */}
      <div className={styles.domainsSection}>
        <div className={styles.domainsGrid}>
          {domains.map((domain) => {
            const Icon = iconMapping[domain.icon] || FaGraduationCap;
            
            return (
              <div key={domain.id} className={styles.domainCard}>
                {/* Image Container */}
                <div className={styles.imageContainer}>
                  <img
                    src={domain.image}
                    alt={domain.titre}
                    className={styles.domainImage}
                    onError={(e) => {
                      e.target.src = '/placeholder-domain.jpg';
                    }}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>

                {/* Icon Badge */}
                <div className={styles.iconBadge}>
                  <Icon className={styles.domainIcon} />
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.domainTitle}>
                    {domain.titre}
                  </h3>
                  <p className={styles.domainDescription}>
                    {domain.description_courte}
                  </p>
                  
                  {/* Read More Button */}
                  <div className={styles.cardFooter}>
                    <Link
                      to={`/domains/${domain.id}`}
                      className={styles.readMoreLink}
                    >
                      Lire Plus
                      <FaArrowRight className={styles.readMoreIcon} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ensemble, redonnons espoir aux enfants et jeunes travailleurs de la RDC
          </h2>
          <p className={styles.ctaSubtitle}>
            Votre soutien peut transformer des vies. Rejoignez notre mission aujourd'hui.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/donate" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
              Faire un don
            </Link>
            <Link to="/volunteer" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
              Devenir bénévole
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}