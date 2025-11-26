import React from 'react';
import './MergedPage.css';

export default function MissionVisionValues() {
  const values = [
    {
      title: 'Participation',
      description: 'Participation de tout membre à la prise des décisions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: '#3b82f6',
      details: [
        'Décisions collectives et inclusives',
        'Voix égale pour tous les membres',
        'Forums de discussion ouverts',
        'Assemblées générales régulières'
      ]
    },
    {
      title: 'Transparence',
      description: 'Transparence dans la gestion de l\'information et des ressources humaines, matérielles et financières',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: '#10b981',
      details: [
        'Gestion transparente des informations',
        'Ressources humaines gérées avec équité',
        'Suivi rigoureux des ressources matérielles',
        'Comptabilité financière accessible'
      ]
    }
  ];

  const additionalValues = [
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
      ),
      title: 'Démocratie',
      description: 'Chaque voix compte dans nos processus décisionnels'
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      title: 'Intégrité',
      description: 'Gestion honnête et responsable de toutes nos ressources'
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
      ),
      title: 'Ouverture',
      description: 'Communication transparente avec toutes les parties prenantes'
    }
  ];

  return (
    <div className="merged-container">
      {/* Hero Section */}
      <section className="merged-hero">
        <div className="merged-decorCircleBlue"></div>
        <div className="merged-decorCircleGreen"></div>
        <div className="merged-decorCirclePurple"></div>
        <div className="merged-decorCircleOrange"></div>
        <div className="merged-decorDots"></div>
        
        <div className="merged-heroContent">
          <div className="merged-heroText">
            <div className="merged-heroTag">Notre identité</div>
            <h1 className="merged-heroTitle">Mission, Vision & Valeurs</h1>
            <p className="merged-heroSubtitle">
              Les fondements de notre engagement pour un avenir meilleur des enfants et jeunes travailleurs
            </p><br />
            <button className="merged-heroButton">Découvrir notre engagement</button>
            
            <div className="merged-heroStats">
              <div className="merged-heroStatItem">
                <div className="merged-heroStatNumber">4</div>
                <div className="merged-heroStatLabel">Piliers d'action</div>
              </div>
              <div className="merged-heroStatItem">
                <div className="merged-heroStatNumber">8</div>
                <div className="merged-heroStatLabel">Provinces</div>
              </div>
              <div className="merged-heroStatItem">
                <div className="merged-heroStatNumber">2006</div>
                <div className="merged-heroStatLabel">Création</div>
              </div>
              <div className="merged-heroStatItem">
                <div className="merged-heroStatNumber">100%</div>
                <div className="merged-heroStatLabel">Engagement</div>
              </div>
            </div>
          </div>
          
          <div className="merged-heroImage">
            <div className="merged-imageShape">
              <div className="merged-imagePlaceholder">
                <img src="/src/assets/Ressources/image-enfant.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="merged-main">
        {/* Vision Section */}
        <section className="merged-section">
          <div className="merged-visionCard">
            <div className="merged-cardHeader">
              <div className="merged-iconBox" style={{background: 'linear-gradient(135deg, #475569, #334155)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <div className="merged-sectionLabel">Notre vision</div>
                <h2 className="merged-cardTitle">Vision</h2>
              </div>
            </div>
            
            <div className="merged-cardContent">
              <p className="merged-textLarge">
                La Vision de l'AEJT-RDC est la <span className="merged-highlight">solidarité, la paix et l'entraide</span> pour 
                l'épanouissement de toute personne, notamment celle vulnérable et en situation particulièrement difficile, 
                et <span className="merged-highlight">l'auto prise en charge</span> pour les changements positifs de 
                condition de vie socio-économico-culturelle.
              </p>
            </div>

            <div className="merged-pillarsGrid">
              {[
                { icon: '🤝', title: 'Solidarité', desc: 'Union et entraide mutuelle' },
                { icon: '☮️', title: 'Paix', desc: 'Cohabitation pacifique' },
                { icon: '💪', title: 'Auto-prise en charge', desc: 'Autonomisation et changement' }
              ].map((pillar, index) => (
                <div key={index} className="merged-pillarCard">
                  <div className="merged-pillarIcon">{pillar.icon}</div>
                  <h3 className="merged-pillarTitle">{pillar.title}</h3>
                  <p className="merged-pillarDesc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="merged-section">
          <div className="merged-missionCard">
            <div className="merged-cardHeader">
              <div className="merged-iconBox" style={{background: 'linear-gradient(135deg, #1e293b, #0f172a)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="merged-sectionLabel">Notre mission</div>
                <h2 className="merged-cardTitle">Mission</h2>
              </div>
            </div>
            
            <div className="merged-cardContent">
              <p className="merged-textLarge">
                La mission de l'AEJT RDC est de <span className="merged-highlightGreen">promouvoir, défendre et faire respecter 
                les droits des enfants et jeunes travailleurs</span>, en favorisant leur participation active dans toutes les 
                décisions qui les concernent, afin d'améliorer leurs conditions de vie, de travail et d'avenir.
              </p>
              <p className="merged-text">
                Nous nous engageons également à <span className="merged-highlightGreen">promouvoir une culture de paix, 
                justice, solidarité, entraide, démocratie et cohabitation pacifique</span>.
              </p>
            </div>

            <div className="merged-componentsGrid">
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
                <div key={index} className="merged-componentCard">
                  <div className="merged-componentIcon">
                    {item.icon}
                  </div>
                  <h3 className="merged-componentTitle">{item.title}</h3>
                  <p className="merged-componentDesc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="merged-section">
          <div className="merged-valuesIntro">
            <div className="merged-sectionLabel">Nos principes</div>
            <h2 className="merged-sectionTitle">Nos Valeurs</h2>
            <p className="merged-introText">
              Les principes fondamentaux qui guident notre action au quotidien pour le bien-être des enfants et jeunes travailleurs de la RDC.
            </p>
          </div>

          <div className="merged-valuesGrid">
            {values.map((value, index) => (
              <div key={index} className="merged-valueCard">
                <div className="merged-valueHeader" style={{background: value.color}}>
                  <div className="merged-valueIconBox">
                    {value.icon}
                  </div>
                  <div>
                    <h2 className="merged-valueTitle">{value.title}</h2>
                    <p className="merged-valueDescription">{value.description}</p>
                  </div>
                </div>

                <div className="merged-valueContent">
                  <h3 className="merged-detailsTitle">Concrètement :</h3>
                  <ul className="merged-detailsList">
                    {value.details.map((detail, idx) => (
                      <li key={idx} className="merged-detailItem">
                        <div className="merged-checkIcon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Values */}
        <section className="merged-additionalSection">
          <div className="merged-additionalCard">
            <h2 className="merged-additionalTitle">Des Valeurs en Action</h2>
            <div className="merged-additionalGrid">
              {additionalValues.map((item, index) => (
                <div key={index} className="merged-additionalItem">
                  <div className="merged-additionalIcon">
                    {item.icon}
                  </div>
                  <h3 className="merged-additionalItemTitle">{item.title}</h3>
                  <p className="merged-additionalItemDesc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statement */}
        <section className="merged-impactSection">
          <div className="merged-impactCard">
            <h3 className="merged-impactTitle">
              Ensemble pour un Avenir Meilleur
            </h3>
            <p className="merged-impactText">
              À travers notre mission, notre vision et nos valeurs, nous travaillons chaque jour pour créer un environnement 
              où chaque enfant et jeune travailleur peut s'épanouir pleinement et contribuer positivement au 
              développement de notre société.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}