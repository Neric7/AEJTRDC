import { useEffect, useState, useRef } from 'react';
import styles from './CTASection.module.css';

export default function CTASection() {
  const [yearsCount, setYearsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observer pour détecter quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animation du compteur de 0 à 17
  useEffect(() => {
    if (isVisible && yearsCount < 17) {
      const timer = setTimeout(() => {
        setYearsCount(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isVisible, yearsCount]);

  return (
    <section className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          
          {/* GAUCHE - Texte principal */}
          <div className={styles.leftContent}>
            <div className={styles.textContent}>
              <h2 className={styles.mainTitle}>
                Promouvoir les droits des enfants, l'équité et la résilience communautaire
              </h2>
              <p className={styles.description}>
                L'AEJT autonomise les enfants, les jeunes et les femmes à travers l'éducation, 
                la protection et les programmes de développement local guidés par la solidarité et la justice.
              </p>
              
              {/* Bouton principal */}
              <a href="/about/history" className={styles.discoverButton}>
                Découvrir notre parcours
                <svg 
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  className={styles.arrowIcon}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </a>
              
              {/* Boutons d'appel à l'action */}
              <div className={styles.actionButtons}>
                <a href="#donate" className={`${styles.actionButton} ${styles.donateButton}`}>
                  Faire un don
                </a>
                <a href="/volunteer" className={`${styles.actionButton} ${styles.joinButton}`}>
                  Rejoindre nos actions
                </a>
                <a href="/contact" className={`${styles.actionButton} ${styles.contactButton}`}>
                  Nous contacter
                </a>
              </div>
            </div>
          </div>

          {/* CENTRE - Compteur "17" vertical */}
          <div className={styles.centerContent}>
            <div className={styles.yearsNumber}>{yearsCount}</div>
            <div className={styles.yearsTextWrapper}>
              <span className={styles.yearsOf}>Years of</span>
              <span className={styles.yearsExperience}>Experience</span>
            </div>
          </div>

          {/* DROITE - Logo et overlay séparés */}
          <div className={styles.rightContent}>
            <div className={styles.logoContainer}>
              <img 
                src="/src/assets/Ressources/story_1_111.png" 
                alt="Logo AEJT" 
                className={styles.logo}
              />
            </div>
            {/* Overlay "AEJT - Depuis 2008" séparé du logo */}
            <div className={styles.logoOverlay}>
              <h3 className={styles.overlayTitle}>AEJT - Depuis 2008</h3>
              <p className={styles.overlayText}>
                Née en crise, l'AEJT soutient les enfants et les jeunes vulnérables 
                avec l'éducation, la santé, la protection des droits et l'inclusion 
                socio-économique à travers la RD Congo.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}