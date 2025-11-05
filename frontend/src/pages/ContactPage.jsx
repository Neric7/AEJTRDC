import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';
import LocationMap from '../components/contact/LocationMap';
import SocialLinks from '../components/contact/SocialLinks';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Contactez-nous</h1>
          <p className={styles.heroDescription}>
            Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question ou collaboration.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Formulaire de contact - 2/3 de la largeur */}
          <div className={styles.formColumn}>
            <ContactForm />
          </div>

          {/* Informations de contact - 1/3 de la largeur */}
          <div className={styles.sideColumn}>
            <SocialLinks />
          </div>
        </div>

        {/* Carte et localisation */}
        <LocationMap />

        {/* Urgences humanitaires */}
        <div className={styles.emergencyAlert}>
          <div className={styles.alertContent}>
            <div className={styles.alertIcon}>
              <AlertCircle size={24} />
            </div>
            <div className={styles.alertText}>
              <h3 className={styles.alertTitle}>
                Signaler une urgence humanitaire
              </h3>
              <p className={styles.alertDescription}>
                Pour signaler une situation d'urgence humanitaire nécessitant une intervention immédiate, 
                contactez-nous directement par téléphone ou visitez notre page dédiée.
              </p>
              <div className={styles.alertActions}>
                <a
                  href="tel:+24206123456"
                  className={styles.btnEmergencyPrimary}
                >
                  <Phone className={styles.btnIcon} />
                  Appeler maintenant
                </a>
                <a
                  href="/humanitarian"
                  className={styles.btnEmergencySecondary}
                >
                  Espace humanitaire
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;