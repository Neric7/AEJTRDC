import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBullseye, FaHandshake, FaMapMarkedAlt, FaLightbulb, FaUsers, FaHeart, FaBalanceScale, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'Historique', icon: <FaUsers /> },
    { id: 'mission', label: 'Mission & Vision', icon: <FaBullseye /> },
    { id: 'objectives', label: 'Objectifs', icon: <FaCheckCircle /> },
    { id: 'zones', label: 'Extensions', icon: <FaMapMarkedAlt /> }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Éléments décoratifs de fond */}
      <div className={styles.decorativeCircle1}></div>
      <div className={styles.decorativeCircle2}></div>
      
      <div className={styles.container}>
        
        {/* En-tête moderne */}
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Depuis 2006
          </div>
          <h2 className={styles.sectionTitle}>
            Notre <span className={styles.titleGradient}>Organisation</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            « Rien pour nous sans nous »
          </p>
        </div>

        {/* Grille principale */}
        <div className={styles.contentGrid}>
          
          {/* Colonne image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageGlow}></div>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <img 
                  src="/src/assets/Ressources/children.png" 
                  alt="Enfants et jeunes travailleurs AEJT-RDC" 
                  className={styles.aboutImage}
                />
                <div className={styles.imageOverlay}></div>
                
                {/* Stats overlay */}
                <div className={styles.statsOverlay}>
                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <div className={styles.statNumber}>8</div>
                      <div className={styles.statLabel}>Extensions</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statNumber}>18+</div>
                      <div className={styles.statLabel}>Ans d'action</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statNumber}>RDC</div>
                      <div className={styles.statLabel}>Couverture</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne contenu */}
          <div className={styles.contentColumn}>
            {/* Tabs navigation */}
            <div className={styles.tabsWrapper}>
              <div className={styles.tabsList}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  >
                    <span className={styles.tabIcon}>{tab.icon}</span>
                    <span className={styles.tabLabel}>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu des tabs */}
            <div className={styles.tabContent}>
              
              {/* Historique */}
              {activeTab === 'history' && (
                <div className={styles.tabPane}>
                  <h3 className={styles.contentTitle}>Notre Histoire</h3>
                  
                  <div className={styles.timelineContainer}>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineIcon}>2006</div>
                      <div className={styles.timelineCard}>
                        <h4 className={styles.timelineTitle}>Fondation</h4>
                        <p className={styles.timelineDesc}>Création de l'AEJT-RDC, représentant les différents groupes de métier.</p>
                      </div>
                    </div>

                    <div className={styles.timelineItem}>
                      <div className={styles.timelineIcon}>2008</div>
                      <div className={styles.timelineCard}>
                        <h4 className={styles.timelineTitle}>Première Extension</h4>
                        <p className={styles.timelineDesc}>Implantation à Uvira, marquant le début de notre expansion.</p>
                      </div>
                    </div>

                    <div className={styles.timelineItem}>
                      <div className={styles.timelineIcon}>→</div>
                      <div className={styles.timelineCard}>
                        <h4 className={styles.timelineTitle}>Expansion Nationale</h4>
                        <p className={styles.timelineDesc}>Installation à Goma, Idjwi, Kalemie, Moba, Kinshasa et Kavumu.</p>
                      </div>
                    </div>

                    <div className={styles.timelineItem}>
                      <div className={styles.timelineIcon}>2024</div>
                      <div className={styles.timelineCard}>
                        <h4 className={styles.timelineTitle}>Reconnaissance Officielle</h4>
                        <p className={styles.timelineDesc}>Reconnaissance le 06 mai 2024 et affiliation au mouvement africain.</p>
                      </div>
                    </div>
                  </div>

                  <Link to="/about/history" className={styles.seeMoreLink} onClick={() => window.scrollTo(0, 0)}>
                    <span>Découvrir plus</span>
                    <FaArrowRight />
                  </Link>
                </div>
              )}

              {/* Mission & Vision */}
              {activeTab === 'mission' && (
                <div className={styles.tabPane}>
                  <h3 className={styles.contentTitle}>Mission & Vision</h3>
                  
                  <div className={styles.missionGrid}>
                    <div className={`${styles.missionCard} ${styles.missionCardBlue}`}>
                      <div className={styles.missionIcon}>
                        <FaBullseye />
                      </div>
                      <h4 className={styles.missionTitle}>Notre Mission</h4>
                      <p className={styles.missionText}>
                        Promouvoir, défendre et faire respecter les droits des enfants et jeunes travailleurs.
                      </p>
                    </div>

                    <div className={`${styles.missionCard} ${styles.missionCardYellow}`}>
                      <div className={styles.missionIcon}>
                        <FaLightbulb />
                      </div>
                      <h4 className={styles.missionTitle}>Notre Vision</h4>
                      <p className={styles.missionText}>
                        La solidarité, la paix et l'entraide pour l'épanouissement de toute personne.
                      </p>
                    </div>
                  </div>

                  <div className={styles.valuesSection}>
                    <h4 className={styles.valuesTitle}>Nos Valeurs</h4>
                    <div className={styles.valuesGrid}>
                      <div className={styles.valueCard}>
                        <span className={styles.valueIcon}><FaUsers /></span>
                        <span className={styles.valueName}>Participation</span>
                      </div>
                      <div className={styles.valueCard}>
                        <span className={styles.valueIcon}><FaBalanceScale /></span>
                        <span className={styles.valueName}>Transparence</span>
                      </div>
                      <div className={styles.valueCard}>
                        <span className={styles.valueIcon}><FaHandshake /></span>
                        <span className={styles.valueName}>Paix</span>
                      </div>
                      <div className={styles.valueCard}>
                        <span className={styles.valueIcon}><FaHeart /></span>
                        <span className={styles.valueName}>Solidarité</span>
                      </div>
                    </div>
                  </div>

                  <Link to="/about/mission" className={styles.seeMoreLink} onClick={() => window.scrollTo(0, 0)}>
                    <span>En savoir plus</span>
                    <FaArrowRight />
                  </Link>
                </div>
              )}

              {/* Objectifs */}
              {activeTab === 'objectives' && (
                <div className={styles.tabPane}>
                  <h3 className={styles.contentTitle}>Nos Objectifs</h3>
                  
                  <div className={styles.objectivesContainer}>
                    <div className={`${styles.objectiveCard} ${styles.objectiveBlue}`}>
                      <div className={styles.objectiveIconWrapper}>
                        <FaBullseye />
                      </div>
                      <h4 className={styles.objectiveTitle}>Objectifs Généraux</h4>
                      <ul className={styles.objectiveList}>
                        <li>Promouvoir les droits des enfants et jeunes travailleurs</li>
                        <li>Améliorer les conditions de vie des communautés</li>
                      </ul>
                    </div>

                    <div className={`${styles.objectiveCard} ${styles.objectiveGreen}`}>
                      <div className={styles.objectiveIconWrapper}>
                        <FaCheckCircle />
                      </div>
                      <h4 className={styles.objectiveTitle}>Objectifs Spécifiques</h4>
                      <ul className={styles.objectiveList}>
                        <li>Sensibiliser sur les droits des EJT</li>
                        <li>Accompagner les enfants vulnérables</li>
                        <li>Organiser des AGR et groupes de métier</li>
                        <li>Renforcer les AVEC/GEC</li>
                      </ul>
                    </div>
                  </div>

                  <Link to="/about/objectives" className={styles.seeMoreLink} onClick={() => window.scrollTo(0, 0)}>
                    <span>Voir les détails</span>
                    <FaArrowRight />
                  </Link>
                </div>
              )}

              {/* Zones */}
              {activeTab === 'zones' && (
                <div className={styles.tabPane}>
                  <h3 className={styles.contentTitle}>Zones d'Intervention</h3>
                  
                  <div className={styles.zonesContainer}>
                    <div className={styles.zonesHeader}>
                      <div className={styles.zonesIcon}>
                        <FaMapMarkedAlt />
                      </div>
                      <p className={styles.zonesText}>Nos extensions à travers la RDC</p>
                    </div>
                    
                    <div className={styles.zonesTags}>
                      <span className={styles.zoneTag}>Bukavu (Siège)</span>
                      <span className={styles.zoneTag}>Uvira (2008)</span>
                      <span className={styles.zoneTag}>Goma (2010)</span>
                      <span className={styles.zoneTag}>Idjwi (2012)</span>
                      <span className={styles.zoneTag}>Kalemie (2016)</span>
                      <span className={styles.zoneTag}>Moba (2018)</span>
                      <span className={styles.zoneTag}>Kinshasa (2020)</span>
                      <span className={styles.zoneTag}>Kavumu (2023)</span>
                    </div>
                  </div>

                  <Link to="/about/zones" className={styles.seeMoreLink} onClick={() => window.scrollTo(0, 0)}>
                    <span>Explorer les extensions</span>
                    <FaArrowRight />
                  </Link>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}