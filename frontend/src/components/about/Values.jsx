
// Values.jsx
import React from 'react';
import Button from '../common/Button';
import styles from './Values.module.css';

export default function Values() {
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
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Decorative circles */}
        <div className={styles.decorCirclePurple}></div>
        <div className={styles.decorCircleBlue}></div>
        <div className={styles.decorCircleGreen}></div>
        <div className={styles.decorCircleOrange}></div>
        <div className={styles.decorDots}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>Nos principes</div>
            <h1 className={styles.heroTitle}>Nos Valeurs</h1>
            <p className={styles.heroSubtitle}>
              Les principes fondamentaux qui guident notre action au quotidien
            </p><br />
            <Button className={styles.heroButton}>Découvrir nos valeurs</Button>

            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>4</div>
                <div className={styles.heroStatLabel}>Valeurs clés</div>
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
        {/* Introduction */}
        <section className={styles.introSection}>
          <p className={styles.introText}>
            Nos valeurs constituent le socle de notre organisation et orientent chacune de nos actions 
            pour le bien-être des enfants et jeunes travailleurs de la RDC.
          </p>
        </section>

        {/* Values Cards */}
        <section className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              {/* Header */}
              <div className={styles.valueHeader} style={{background: value.color}}>
                <div className={styles.valueIconBox}>
                  {value.icon}
                </div>
                <div>
                  <h2 className={styles.valueTitle}>{value.title}</h2>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className={styles.valueContent}>
                <h3 className={styles.detailsTitle}>Concrètement :</h3>
                <ul className={styles.detailsList}>
                  {value.details.map((detail, idx) => (
                    <li key={idx} className={styles.detailItem}>
                      <div className={styles.checkIcon}>
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
        </section>

        {/* Additional Values Context */}
        <section className={styles.additionalSection}>
          <div className={styles.additionalCard}>
            <h2 className={styles.additionalTitle}>Des Valeurs en Action</h2>
            <div className={styles.additionalGrid}>
              {additionalValues.map((item, index) => (
                <div key={index} className={styles.additionalItem}>
                  <div className={styles.additionalIcon}>
                    {item.icon}
                  </div>
                  <h3 className={styles.additionalItemTitle}>{item.title}</h3>
                  <p className={styles.additionalItemDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className={styles.quoteSection}>
          <div className={styles.quoteCard}>
            <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className={styles.quoteText}>
              Nos valeurs ne sont pas de simples mots, elles sont le reflet de notre engagement quotidien 
              envers les enfants et jeunes travailleurs de la RDC.
            </p>
            <p className={styles.quoteAuthor}>AEJT RDC</p>
          </div>
        </section>
      </main>
    </div>
  );
}