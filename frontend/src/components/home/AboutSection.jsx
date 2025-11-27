import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBullseye, FaHandshake, FaMapMarkedAlt, FaLightbulb, FaUsers, FaHeart, FaBalanceScale, FaCheckCircle } from 'react-icons/fa';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'Historique' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'objectives', label: 'Objectifs' },
    { id: 'zones', label: 'Extensions' }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* En-tête de section */}
        <div className={styles.sectionHeader}>
          <br />
          <h2 className={styles.sectionTitle}>
            Notre Organisation
          </h2>
          <p className={styles.sectionSubtitle}>
            Depuis 2006 : « Rien pour nous sans nous »
          </p>
        </div>

        {/* Contenu principal avec image à gauche */}
        <div className={styles.contentGrid}>
          {/* Colonne image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageContainer}>
              <img 
                src="/src/assets/Ressources/children.png" 
                alt="Équipe AEJT-RDC en action" 
                className={styles.aboutImage}
              />
            </div>
          </div>

          {/* Colonne contenu */}
          <div className={styles.contentColumn}>
            {/* Onglets de navigation */}
            <div className={styles.tabsContainer}>
              <div className={styles.tabsList}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Contenu des onglets */}
              <div className={styles.tabContent}>
                
                {/* Historique */}
                {activeTab === 'history' && (
                  <div className={styles.historyContent}>
                    <h3 className={styles.contentTitle}>Notre Histoire</h3>
                    <div className={styles.timeline}>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2006</div>
                        <div className={styles.timelineContent}>
                          <h4>Fondation</h4>
                          <p>Création de l'AEJT-RDC, représentant les différents groupes de métier des enfants et jeunes travailleurs.</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2008</div>
                        <div className={styles.timelineContent}>
                          <h4>Première Extension</h4>
                          <p>Implantation à Uvira le 25 juin 2008, marquant le début de notre expansion provinciale.</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2010-2023</div>
                        <div className={styles.timelineContent}>
                          <h4>Expansion Nationale</h4>
                          <p>Installation progressive à Goma (2010), Idjwi (2012), Kalemie (2016), Moba (2018), Kinshasa (2020) et Kavumu (2023).</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2024</div>
                        <div className={styles.timelineContent}>
                          <h4>Reconnaissance Officielle</h4>
                          <p>Reconnaissance officielle le 06 mai 2024 et affiliation au mouvement africain des enfants et jeunes travailleurs.</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/about/history" className={styles.seeMoreLink} onClick={() => window.scrollTo(0, 0)}>
                      Voir plus →
                    </Link>
                  </div>
                )}

                {/* Mission & Vision */}
                {activeTab === 'mission' && (
                  <div className={styles.missionContent}>
                    <div className={styles.missionGrid}>
                      <div className={styles.missionCard}>
                        <div className={styles.cardIcon}><FaBullseye /></div>
                        <h4 className={styles.cardTitle}>Notre Mission</h4>
                        <p className={styles.cardText}>
                          Promouvoir, défendre et faire respecter les droits des enfants et jeunes travailleurs, 
                          en favorisant leur participation active dans toutes les décisions qui les concernent, 
                          afin d'améliorer leurs conditions de vie, de travail et d'avenir.
                        </p>
                      </div>
                      <div className={styles.missionCard}>
                        <div className={styles.cardIcon}><FaLightbulb /></div>
                        <h4 className={styles.cardTitle}>Notre Vision</h4>
                        <p className={styles.cardText}>
                          La solidarité, la paix et l'entraide pour l'épanouissement de toute personne, 
                          notamment celle vulnérable et en situation particulièrement difficile, et l'auto-prise 
                          en charge pour les changements positifs de condition de vie socio-économico-culturelle.
                        </p>
                      </div>
                    </div>
                    
                    <div className={styles.valuesSection}>
                      <h4 className={styles.valuesTitle}>Nos Valeurs</h4>
                      <div className={styles.valuesGrid}>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}><FaUsers /></span>
                          <span className={styles.valueName}>Participation</span>
                        </div>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}><FaBalanceScale /></span>
                          <span className={styles.valueName}>Transparence</span>
                        </div>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}><FaHandshake /></span>
                          <span className={styles.valueName}>Paix</span>
                        </div>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}><FaHeart /></span>
                          <span className={styles.valueName}>Solidarité</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/about/mission" className={styles.seeMoreLink} onClick={() => window.scrollTo(0, 0)}>
                      Voir plus →
                    </Link>
                  </div>
                )}

                {/* Objectifs */}
                {activeTab === 'objectives' && (
                  <div className={styles.objectivesContent}>
                    <h3 className={styles.contentTitle}>Nos Objectifs</h3>
                    
                    <div className={styles.objectivesGrid}>
                      <div className={styles.objectiveCard}>
                        <div className={styles.objectiveIcon}><FaBullseye /></div>
                        <h4 className={styles.objectiveTitle}>Objectifs Généraux</h4>
                        <ul className={styles.objectiveList}>
                          <li>Promouvoir les droits des enfants et jeunes travailleurs</li>
                          <li>Améliorer les conditions de vie des communautés</li>
                        </ul>
                      </div>

                      <div className={styles.objectiveCard}>
                        <div className={styles.objectiveIcon}><FaCheckCircle /></div>
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
                      Voir plus →
                    </Link>
                  </div>
                )}

                {/* Zones d'intervention */}
                {activeTab === 'zones' && (
                  <div className={styles.zonesContent}>
                    <h3 className={styles.contentTitle}>Zones d'Intervention</h3>
                    <div className={styles.mapContainer}>
                      <div className={styles.mapPlaceholder}>
                        <div className={styles.mapIcon}><FaMapMarkedAlt /></div>
                        <p className={styles.mapText}>Nos extensions à travers la RDC</p>
                        <div className={styles.provincesList}>
                          <span className={styles.provinceTag}>Bukavu (Siège)</span>
                          <span className={styles.provinceTag}>Uvira (2008)</span>
                          <span className={styles.provinceTag}>Goma (2010)</span>
                          <span className={styles.provinceTag}>Idjwi (2012)</span>
                          <span className={styles.provinceTag}>Kalemie (2016)</span>
                          <span className={styles.provinceTag}>Moba (2018)</span>
                          <span className={styles.provinceTag}>Kinshasa (2020)</span>
                          <span className={styles.provinceTag}>Kavumu (2023)</span>
                        </div>
                        {/* Les informations de contact ont été retirées comme demandé */}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}