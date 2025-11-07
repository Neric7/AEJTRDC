import React from 'react';
import Button from '../common/Button';
import styles from './History.module.css';

export default function History() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Decorative circles */}
        <div className={styles.decorCircleOrange}></div>
        <div className={styles.decorCircleGreen}></div>
        <div className={styles.decorCircleYellow}></div>
        <div className={styles.decorCircleBlue}></div>
        <div className={styles.decorDots}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}><br/><br />
            <h1 className={styles.heroTitle}>
              Notre Histoire
            </h1>
            <p className={styles.heroSubtitle}>
              L'Association des Enfants et Jeunes Travailleurs de la RD CONGO, AEJT RDC en sigle, 
              a été créé en 2006 et reconnue officiellement le 06 mai 2024 et affiliée au mouvement 
              africain des enfants et jeunes travailleurs, représentant les différents groupes de métier.
            </p>
            <Button className={styles.heroButton}>EN SAVOIR PLUS</Button>
            
            {/* Stats intégrées dans le hero */}
            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>2006</div>
                <div className={styles.heroStatLabel}>Création</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>8</div>
                <div className={styles.heroStatLabel}>Antennes</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>2024</div>
                <div className={styles.heroStatLabel}>Reconnaissance</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>RDC</div>
                <div className={styles.heroStatLabel}>Nationale</div>
              </div>
            </div>
          </div>
          
          <div className={styles.heroImage}>
            <div className={styles.imageShape}>
              <div className={styles.imagePlaceholder}>
                <img src="src/assets/Ressources/image-enfant.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Who We Are Section */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>Notre identité</div>
          <h2 className={styles.sectionTitle}>Qui sommes-nous</h2>
          
          <div className={styles.contentCard}>
            <p className={styles.textLead}>
              L'Association des Enfants et Jeunes Travailleurs de la RDC (AEJT-RDC) est une asbl 
              conformément à la loi n°004/2001 du 20 Juillet 2001, portant dispositions générales 
              applicables aux Associations sans but lucratif et aux établissements d'utilité publique.
            </p>
            
            <div className={styles.highlightBox}>
              <p className={styles.highlightText}>
                Le siège social est fixé à BUKAVU en République Démocratique du Congo.
              </p>
            </div>
            
            <p className={styles.text}>
              L'association est indépendante de tout groupe politique, économique, ethnique et confessionnel. 
              La durée de l'association est illimitée.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>Notre parcours</div>
          <h2 className={styles.sectionTitle}>Notre Expansion à Travers le Pays</h2>
          <p className={styles.sectionDescription}>
            Les rayons d'action de l'AEJT RDC s'étant sur toute l'étendue de la RDC, implantée à Uvira 
            le 25 juin 2008 ; installée à Goma en 2010 ; à Idjwi en 2012 ; à Kinshasa en 2020 ; 
            à Kalémie en 2016 ; à Moba en 2018 et à Kavumu en 2023.
          </p>
          
          <div className={styles.timeline}>
            {[
              { year: '2006', event: 'Créé', location: '' },
              { year: '2008', event: 'Implantée à Uvira', location: 'le 25 juin' },
              { year: '2010', event: 'Installée à Goma', location: '' },
              { year: '2012', event: 'À Idjwi', location: '' },
              { year: '2016', event: 'À Kalémie', location: '' },
              { year: '2018', event: 'À Moba', location: '' },
              { year: '2020', event: 'À Kinshasa', location: '' },
              { year: '2023', event: 'À Kavumu', location: '' },
              { year: '2024', event: 'Reconnue officiellement', location: 'le 06 mai' }
            ].map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div className={styles.timelineEvent}>{item.event}</div>
                  {item.location && <div className={styles.timelineLocation}>{item.location}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Network Section */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>Présence nationale</div>
          <h2 className={styles.sectionTitle}>Notre Réseau à Travers la RDC</h2>
          <p className={styles.sectionDescription}>
            8 antennes actives réparties dans différentes provinces
          </p>
          
          <div className={styles.locationGrid}>
            {[
              { city: 'Bukavu', label: 'Siège Social' },
              { city: 'Uvira', label: 'Antenne' },
              { city: 'Goma', label: 'Antenne' },
              { city: 'Idjwi', label: 'Antenne' },
              { city: 'Kalémie', label: 'Antenne' },
              { city: 'Moba', label: 'Antenne' },
              { city: 'Kinshasa', label: 'Antenne' },
              { city: 'Kavumu', label: 'Antenne' }
            ].map((location, index) => (
              <div key={index} className={styles.locationCard}>
                <div className={styles.locationIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                </div>
                <h3 className={styles.locationCity}>{location.city}</h3>
                <p className={styles.locationLabel}>{location.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliation Section */}
        <section className={styles.affiliationSection}>
          <div className={styles.affiliationCard}>
            <div className={styles.affiliationIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className={styles.affiliationTitle}>Affilié au Mouvement Africain</h3>
              <p className={styles.affiliationText}>
                L'AEJT RDC est affiliée au mouvement africain des enfants et jeunes travailleurs, 
                ce qui renforce notre capacité d'action et notre impact continental.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}