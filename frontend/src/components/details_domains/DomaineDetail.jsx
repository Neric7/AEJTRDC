// src/components/details_domains/DomaineDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDomainById, getOtherDomains } from '../../services/domains';
import styles from './DomaineDetail.module.css';

export default function DomaineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [domaine, setDomaine] = useState(null);
  const [autresDomaines, setAutresDomaines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        setLoading(true);
        setError(null);

        const domainResponse = await getDomainById(id);
        
        if (domainResponse.success) {
          setDomaine(domainResponse.data);
          
          const othersResponse = await getOtherDomains(id);
          if (othersResponse.success) {
            setAutresDomaines(othersResponse.data);
          }
        } else {
          setError('Domaine non trouvé');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          {/* Logo ou icône AEJT-RDC */}
          <div className={styles.logoContainer}>
            <div className={styles.logoCircle}>
              <span className={styles.logoText}>AEJT-RDC</span>
            </div>
          </div>
          
          {/* Animation de chargement avec texte */}
          <div className={styles.loadingAnimation}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingTextContainer}>
              <h3 className={styles.loadingTitle}>Chargement du domaine</h3>
              <div className={styles.loadingDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <p className={styles.loadingSubtitle}>
                Préparation des informations en cours...
              </p>
            </div>
          </div>
          
          {/* Message de patience */}
          <div className={styles.patienceMessage}>
            <svg className={styles.clockIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <p>Merci de votre patience</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !domaine) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorMessage}>
          <h2>Domaine non trouvé</h2>
          <p>{error || 'Le domaine que vous recherchez n\'existe pas.'}</p>
          <Link to="/domains" className={styles.backLink}>
            Retour aux domaines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Bouton de retour */}
      <div className={styles.backButtonContainer}>
        <button 
          onClick={() => navigate('/domains')} 
          className={styles.backButton}
          aria-label="Retour aux domaines"
        >
          <svg 
            className={styles.backIcon} 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Retour aux domaines</span>
        </button>
      </div>

      <section className={styles.domaineContainer}>
        {/* Contenu Principal - Gauche */}
        <div className={styles.domaineMain}>
          <img 
            src={domaine.image} 
            alt={domaine.titre}
            className={styles.domaineImage}
            onError={(e) => {
              e.target.src = '/placeholder-domain.jpg';
            }}
          />
          
          <div className={styles.domaineContent}>
            <h3 className={styles.domaineTitle}>
              {domaine.titre}
            </h3>
            
            {/* Contenu (paragraphes) */}
            {domaine.contenu && domaine.contenu.map((paragraphe, index) => (
              <p key={index} className={styles.domaineText}>
                {paragraphe}
              </p>
            ))}
          </div>
        </div>

        {/* Sidebar - Droite */}
        <div className={styles.domaineSidebar}>
          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarTitle}>Autres Domaines</h4>
            {autresDomaines.length > 0 ? (
              <ul className={styles.domainesList}>
                {autresDomaines.map((autreDomaine) => (
                  <li key={autreDomaine.id} className={styles.domaineItem}>
                    <Link 
                      to={`/domains/${autreDomaine.id}`} 
                      className={styles.domaineLink}
                    >
                      {autreDomaine.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noOtherDomains}>
                Aucun autre domaine disponible
              </p>
            )}
          </div>

          {/* CTA Card - EN BAS */}
          <div className={styles.ctaCard}>
            <h4 className={styles.ctaTitle}>Soutenez notre action</h4>
            <p className={styles.ctaText}>
              Votre don peut changer des vies. Rejoignez-nous dans notre mission.
            </p>
            <Link to="/donate" className={styles.ctaButton}>
              Faire un don
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}