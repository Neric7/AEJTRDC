import styles from './Footer.module.css';
import Button from './Button';
import { CONTACT_INFO } from '../../data/contactData'; 

const formatPhoneForWhatsApp = (phone) => {
  return phone.replace(/[\s+\(\)-]/g, '');
};

const formatPhoneForTel = (phone) => {
  return phone.replace(/\s/g, '');
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Section principale du footer */}
        <div className={styles.footerMain}>
          
          {/* Colonne Logo et description */}
          <div className={styles.footerColumn}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <img src="src/assets/images/logo/logo.png" alt="" />
                <span className={styles.logoText}>AEJT-RDC</span>
              </div>
              <p className={styles.organizationDescription}>
                Organisation humanitaire engagée pour la protection des enfants 
                et jeunes travailleurs en République Démocratique du Congo.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.765 3.73 13.614 3.73 12.317s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne Liens rapides */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Liens Rapides</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#about" className={styles.footerLink}>À propos</a></li>
              <li><a href="#programs" className={styles.footerLink}>Nos programmes</a></li>
              <li><a href="#impact" className={styles.footerLink}>Notre impact</a></li>
              <li><a href="#stories" className={styles.footerLink}>Témoignages</a></li>
              <li><a href="/contact" className={styles.footerLink}>Contact</a></li>
            </ul>
          </div>

          {/* Colonne Programmes */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Nos Programmes</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>Éducation</a></li>
              <li><a href="#" className={styles.footerLink}>Protection de l'enfance</a></li>
              <li><a href="#" className={styles.footerLink}>Santé communautaire</a></li>
              <li><a href="#" className={styles.footerLink}>Eau et assainissement</a></li>
              <li><a href="#" className={styles.footerLink}>Insertion économique</a></li>
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
                <a href={`tel:${formatPhoneForTel(CONTACT_INFO.directionNationale)}`} className={styles.contact}>
                        {CONTACT_INFO.directionNationale}
                    </a>
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Newsletter</h4>
              <p className={styles.newsletterText}>Restez informé de nos activités</p>
              <div className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className={styles.newsletterInput}
                />
                <Button className={styles.newsletterButton}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section inférieure du footer */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              © 2025 NEXA. Tous droits réservés.
            </div>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>Politique de confidentialité</a>
              <a href="#" className={styles.legalLink}>Mentions légales</a>
              <a href="#" className={styles.legalLink}>Conditions d'utilisation</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}