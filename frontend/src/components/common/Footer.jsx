import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { CONTACT_INFO } from '../../data/contactData'; 

const formatPhoneForWhatsApp = (phone) => {
  return phone.replace(/[\s+\(\)-]/g, '');
};

const formatPhoneForTel = (phone) => {
  return phone.replace(/\s/g, '');
};

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus({ type: 'error', message: 'Veuillez entrer une adresse email valide' });
      return;
    }

    setIsSubmittingNewsletter(true);
    setNewsletterStatus(null);

    try {
      // TODO: Implémenter l'API newsletter quand elle sera disponible
      // Pour l'instant, on simule un envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNewsletterStatus({ 
        type: 'success', 
        message: 'Merci ! Vous êtes maintenant abonné à notre newsletter.' 
      });
      setNewsletterEmail('');
      
      setTimeout(() => setNewsletterStatus(null), 5000);
    } catch (error) {
      setNewsletterStatus({ 
        type: 'error', 
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.' 
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Section principale du footer */}
        <div className={styles.footerMain}>
          
          {/* Colonne Logo et description */}
          <div className={styles.footerColumn}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <img src="/src/assets/images/logo/logo.png" alt="" />
                <span className={styles.logoText}>AEJT-RDC</span>
              </div>
              <p className={styles.organizationDescription}>
                Organisation humanitaire engagée pour la protection des enfants 
                et jeunes travailleurs en République Démocratique du Congo.
              </p>
              <div className={styles.socialLinks}>
                {CONTACT_INFO.social.facebook && CONTACT_INFO.social.facebook !== 'URL_VOTRE_PAGE_FACEBOOK' && (
                  <a 
                    href={CONTACT_INFO.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink} 
                    aria-label="Facebook"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {CONTACT_INFO.social.x && CONTACT_INFO.social.x !== 'URL_VOTRE_PAGE_X_TWITTER' && (
                  <a 
                    href={CONTACT_INFO.social.x} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink} 
                    aria-label="Twitter/X"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
                {CONTACT_INFO.social.instagram && CONTACT_INFO.social.instagram !== 'URL_VOTRE_PAGE_INSTAGRAM' && (
                  <a 
                    href={CONTACT_INFO.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink} 
                    aria-label="Instagram"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {CONTACT_INFO.social.linkedIn && CONTACT_INFO.social.linkedIn !== 'URL_VOTRE_PAGE_LINKEDIN' && (
                  <a 
                    href={CONTACT_INFO.social.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink} 
                    aria-label="LinkedIn"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Colonne Liens rapides */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Liens Rapides</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/about/history" className={styles.footerLink} onClick={scrollToTop}>
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/domains" className={styles.footerLink} onClick={scrollToTop}>
                  Nos domaines
                </Link>
              </li>
              <li>
                <Link to="/projects" className={styles.footerLink} onClick={scrollToTop}>
                  Nos projets
                </Link>
              </li>
              <li>
                <Link to="/news" className={styles.footerLink} onClick={scrollToTop}>
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.footerLink} onClick={scrollToTop}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne Programmes */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Nos Programmes</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/domains" className={styles.footerLink} onClick={scrollToTop}>
                  Domaines d'intervention
                </Link>
              </li>
              <li>
                <Link to="/projects" className={styles.footerLink} onClick={scrollToTop}>
                  Projets en cours
                </Link>
              </li>
              <li>
                <Link to="/humanitarian" className={styles.footerLink} onClick={scrollToTop}>
                  Espace humanitaire
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className={styles.footerLink} onClick={scrollToTop}>
                  Devenir bénévole
                </Link>
              </li>
              <li>
                <Link to="/careers" className={styles.footerLink} onClick={scrollToTop}>
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne Contact */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Contactez-nous</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                <span>Bukavu, Ibanda/Panzi, AV. Jean Miruho</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className={styles.contact}>
                        {CONTACT_INFO.email}
                    </a>
                </span>
              </div>
              <div className={styles.contactItem}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>
                  <a 
                    href={`tel:${formatPhoneForTel(CONTACT_INFO.directionNationale)}`} 
                    className={styles.contact}
                    title="Appeler"
                  >
                    {CONTACT_INFO.directionNationale}
                  </a>
                  {' '}
                  <a 
                    href={`https://wa.me/${formatPhoneForWhatsApp(CONTACT_INFO.directionNationale)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contact}
                    title="Contacter via WhatsApp"
                    style={{ marginLeft: '8px' }}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'middle' }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Newsletter</h4>
              <p className={styles.newsletterText}>Restez informé de nos activités</p>
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className={styles.newsletterInput}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  disabled={isSubmittingNewsletter}
                />
                <button
                  type="submit"
                  className={styles.newsletterButton}
                  disabled={isSubmittingNewsletter}
                  aria-label="S'abonner à la newsletter"
                >
                  {isSubmittingNewsletter ? (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className={styles.spinner}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  )}
                </button>
              </form>
              {newsletterStatus && (
                <div className={`${styles.newsletterStatus} ${styles[newsletterStatus.type]}`}>
                  {newsletterStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section inférieure du footer */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              © {new Date().getFullYear()} AEJT-RDC. Tous droits réservés.
            </div>
            <div className={styles.legalLinks}>
              <a 
                href={`mailto:${CONTACT_INFO.email}?subject=Demande%20-%20Politique%20de%20confidentialité`}
                className={styles.legalLink}
              >
                Politique de confidentialité
              </a>
              <a 
                href={`mailto:${CONTACT_INFO.email}?subject=Demande%20-%20Mentions%20légales`}
                className={styles.legalLink}
              >
                Mentions légales
              </a>
              <Link to="/contact" className={styles.legalLink} onClick={scrollToTop}>
                Contact
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}