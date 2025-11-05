import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Rejoignez notre mission pour transformer des vies
          </h2>
          <p className={styles.description}>
            Chaque contribution compte. Ensemble, nous pouvons offrir un avenir meilleur aux enfants et jeunes travailleurs de la RDC.
          </p>

          <div className={styles.ctaButtons}>
            <a href="/donate" className={styles.primaryButton}>
              <svg 
                className={styles.buttonIcon}
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              Faire un don
            </a>

            <a href="/volunteer" className={styles.secondaryButton}>
              <svg 
                className={styles.buttonIcon}
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              Rejoindre nos actions
            </a>

            <a href="/contact" className={styles.tertiaryButton}>
              <svg 
                className={styles.buttonIcon}
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              Nous contacter
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>5000+</div>
            <div className={styles.statLabel}>Enfants accompagnés</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Projets réalisés</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Partenaires actifs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>10 ans</div>
            <div className={styles.statLabel}>D'expérience terrain</div>
          </div>
        </div>
      </div>
    </section>
  );
}