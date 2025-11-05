import { useState } from 'react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'Historique' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'structure', label: 'Structure' },
    { id: 'partners', label: 'Partenaires' },
    { id: 'zones', label: 'Extensions' }
  ];

  const partners = [
    { 
      name: "UNICEF RDC", 
      type: "International",
      description: "Partenaire stratégique pour la protection de l'enfance et l'éducation"
    },
    { 
      name: "Union Européenne", 
      type: "International",
      description: "Financement de projets de développement communautaire"
    },
    { 
      name: "Ministère du Genre, Famille et Enfant", 
      type: "National",
      description: "Partenaire institutionnel pour les programmes de protection"
    },
    { 
      name: "IFP International", 
      type: "International",
      description: "Appui technique et financier pour les projets éducatifs"
    }
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
            15 ans d'engagement pour la protection des enfants et jeunes travailleurs en RDC
          </p>
        </div>

        {/* Contenu principal avec image à gauche */}
        <div className={styles.contentGrid}>
          {/* Colonne image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageContainer}>
              <img 
                src="/src/assets/Ressources/children.png" 
                alt="Équipe AEJTRD en action" 
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
                        <div className={styles.timelineYear}>2008</div>
                        <div className={styles.timelineContent}>
                          <h4>Fondation</h4>
                          <p>Création de l'AEJTRD par un groupe de travailleurs sociaux préoccupés par la situation des enfants travailleurs à Kinshasa.</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2012</div>
                        <div className={styles.timelineContent}>
                          <h4>Expansion</h4>
                          <p>Extension des activités dans 3 nouvelles provinces avec l'appui de premiers partenaires internationaux.</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2018</div>
                        <div className={styles.timelineContent}>
                          <h4>Reconnaissance</h4>
                          <p>Partenariat stratégique avec l'UNICEF et reconnaissance officielle par le gouvernement congolais.</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2023</div>
                        <div className={styles.timelineContent}>
                          <h4>Consolidation</h4>
                          <p>Présence établie dans 12 provinces avec plus de 50,000 enfants bénéficiaires et 30 partenaires actifs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mission & Vision */}
                {activeTab === 'mission' && (
                  <div className={styles.missionContent}>
                    <div className={styles.missionGrid}>
                      <div className={styles.missionCard}>
                        <div className={styles.cardIcon}>🎯</div>
                        <h4 className={styles.cardTitle}>Notre Mission</h4>
                        <p className={styles.cardText}>
                          Contribuer à l'amélioration des conditions de vie des enfants et jeunes travailleurs 
                          en RDC à travers des programmes intégrés de protection, éducation, santé et insertion 
                          socio-économique.
                        </p>
                      </div>
                      <div className={styles.missionCard}>
                        <div className={styles.cardIcon}>✨</div>
                        <h4 className={styles.cardTitle}>Notre Vision</h4>
                        <p className={styles.cardText}>
                          Une société congolaise où chaque enfant et jeune travailleur jouit pleinement de 
                          ses droits, vit dans la dignité et participe activement au développement de sa communauté.
                        </p>
                      </div>
                    </div>
                    
                    <div className={styles.valuesSection}>
                      <h4 className={styles.valuesTitle}>Nos Valeurs</h4>
                      <div className={styles.valuesGrid}>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}>💙</span>
                          <span className={styles.valueName}>Intégrité</span>
                        </div>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}>🌍</span>
                          <span className={styles.valueName}>Engagement</span>
                        </div>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}>⚖️</span>
                          <span className={styles.valueName}>Justice</span>
                        </div>
                        <div className={styles.valueItem}>
                          <span className={styles.valueIcon}>🤲</span>
                          <span className={styles.valueName}>Solidarité</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Structure organisationnelle */}
                {activeTab === 'structure' && (
                  <div className={styles.structureContent}>
                    <h3 className={styles.contentTitle}>Notre Structure</h3>
                    <div className={styles.orgChart}>
                      <div className={styles.chartLevel}>
                        <div className={styles.chartItem}>
                          <div className={styles.chartTitle}>Conseil d'Administration</div>
                          <div className={styles.chartDescription}>
                            7 membres élus - Orientation stratégique et supervision
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.chartConnector}></div>
                      
                      <div className={styles.chartLevel}>
                        <div className={styles.chartItem}>
                          <div className={styles.chartTitle}>Coordination Nationale</div>
                          <div className={styles.chartDescription}>
                            Direction générale et gestion des programmes nationaux
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.chartConnector}></div>
                      
                      <div className={styles.chartLevel}>
                        <div className={styles.chartRow}>
                          <div className={styles.chartItem}>
                            <div className={styles.chartTitle}>Coordination Provinciale</div>
                            <div className={styles.chartDescription}>
                              12 coordinateurs provinciaux
                            </div>
                          </div>
                          <div className={styles.chartItem}>
                            <div className={styles.chartTitle}>Départements Techniques</div>
                            <div className={styles.chartDescription}>
                              Éducation, Santé, Protection, Insertion
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Partenaires */}
                {activeTab === 'partners' && (
                  <div className={styles.partnersContent}>
                    <h3 className={styles.contentTitle}>Nos Partenaires</h3>
                    <div className={styles.partnersGrid}>
                      {partners.map((partner, index) => (
                        <div key={index} className={styles.partnerCard}>
                          <div className={styles.partnerHeader}>
                            <h4 className={styles.partnerName}>{partner.name}</h4>
                            <span className={styles.partnerType}>{partner.type}</span>
                          </div>
                          <p className={styles.partnerDescription}>{partner.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Zones d'intervention */}
                {activeTab === 'zones' && (
                  <div className={styles.zonesContent}>
                    <h3 className={styles.contentTitle}>Zones d'Intervention</h3>
                    <div className={styles.mapContainer}>
                      <div className={styles.mapPlaceholder}>
                        <div className={styles.mapIcon}>🗺️</div>
                        <p className={styles.mapText}>Carte interactive des 12 provinces couvertes</p>
                        <div className={styles.provincesList}>
                          <span className={styles.provinceTag}>Kinshasa</span>
                          <span className={styles.provinceTag}>Kongo Central</span>
                          <span className={styles.provinceTag}>Kwilu</span>
                          <span className={styles.provinceTag}>Kasaï</span>
                          <span className={styles.provinceTag}>Katanga</span>
                          <span className={styles.provinceTag}>Nord-Kivu</span>
                          <span className={styles.provinceTag}>Sud-Kivu</span>
                          <span className={styles.provinceTag}>Équateur</span>
                        </div>
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