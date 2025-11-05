// MissionVision.jsx
import React from 'react';
import styles from './MissionVision.module.css';

export default function MissionVision() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Decorative circles */}
        <div className={styles.decorCircleBlue}></div>
        <div className={styles.decorCircleGreen}></div>
        <div className={styles.decorCirclePurple}></div>
        <div className={styles.decorCircleOrange}></div>
        <div className={styles.decorDots}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>Notre engagement</div>
            <h1 className={styles.heroTitle}>Mission & Vision</h1>
            <p className={styles.heroSubtitle}>
              Notre engagement pour un avenir meilleur pour les enfants et jeunes travailleurs
            </p><br />
            <button className={styles.heroButton}>Découvrir notre impact</button>
            
            {/* Hero Stats - Ajouté comme dans History */}
            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>4</div>
                <div className={styles.heroStatLabel}>Piliers d'action</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>8</div>
                <div className={styles.heroStatLabel}>Provinces</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>2006</div>
                <div className={styles.heroStatLabel}>Création</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>100%</div>
                <div className={styles.heroStatLabel}>Engagement</div>
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
        {/* Vision Section */}
        <section className={styles.section}>
          <div className={styles.visionCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox} style={{background: 'linear-gradient(135deg, #475569, #334155)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <div className={styles.sectionLabel}>Notre vision</div>
                <h2 className={styles.cardTitle}>Vision</h2>
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <p className={styles.textLarge}>
                La Vision de l'AEJT-RDC est la <span className={styles.highlight}>solidarité, la paix et l'entraide</span> pour 
                l'épanouissement de toute personne, notamment celle vulnérable et en situation particulièrement difficile, 
                et <span className={styles.highlight}>l'auto prise en charge</span> pour les changements positifs de 
                condition de vie socio-économico-culturelle.
              </p>
            </div>

            {/* Vision pillars */}
            <div className={styles.pillarsGrid}>
              {[
                { icon: '🤝', title: 'Solidarité', desc: 'Union et entraide mutuelle' },
                { icon: '☮️', title: 'Paix', desc: 'Cohabitation pacifique' },
                { icon: '💪', title: 'Auto-prise en charge', desc: 'Autonomisation et changement' }
              ].map((pillar, index) => (
                <div key={index} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{pillar.icon}</div>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.section}>
          <div className={styles.missionCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox} style={{background: 'linear-gradient(135deg, #1e293b, #0f172a)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className={styles.sectionLabel}>Notre mission</div>
                <h2 className={styles.cardTitle}>Mission</h2>
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <p className={styles.textLarge}>
                La mission de l'AEJT RDC est de <span className={styles.highlightGreen}>promouvoir, défendre et faire respecter 
                les droits des enfants et jeunes travailleurs</span>, en favorisant leur participation active dans toutes les 
                décisions qui les concernent, afin d'améliorer leurs conditions de vie, de travail et d'avenir.
              </p>
              <p className={styles.text}>
                Nous nous engageons également à <span className={styles.highlightGreen}>promouvoir une culture de paix, 
                justice, solidarité, entraide, démocratie et cohabitation pacifique</span>.
              </p>
            </div>

            {/* Mission components */}
            <div className={styles.componentsGrid}>
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  ),
                  title: 'Droits des EJT',
                  desc: 'Promotion et défense des droits des enfants et jeunes travailleurs'
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  ),
                  title: 'Participation Active',
                  desc: 'Implication des jeunes dans les décisions qui les concernent'
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  title: 'Amélioration des conditions',
                  desc: 'Meilleures conditions de vie, de travail et d\'avenir'
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ),
                  title: 'Culture de Paix',
                  desc: 'Justice, solidarité, démocratie et cohabitation pacifique'
                }
              ].map((item, index) => (
                <div key={index} className={styles.componentCard}>
                  <div className={styles.componentIcon}>
                    {item.icon}
                  </div>
                  <h3 className={styles.componentTitle}>{item.title}</h3>
                  <p className={styles.componentDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statement */}
        <section className={styles.impactSection}>
          <div className={styles.impactCard}>
            <h3 className={styles.impactTitle}>
              Ensemble pour un Avenir Meilleur
            </h3>
            <p className={styles.impactText}>
              À travers notre mission et notre vision, nous travaillons chaque jour pour créer un environnement 
              où chaque enfant et jeune travailleur peut s'épanouir pleinement et contribuer positivement au 
              développement de notre société.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}