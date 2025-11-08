// Objectives.jsx
import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './Objectives.module.css';

export default function Objectives() {
  const [activeTab, setActiveTab] = useState('general');

  const generalObjectives = [
    {
      title: 'Promouvoir les droits des EJT',
      description: 'Promouvoir les droits des enfants et jeunes travailleurs (EJT) selon la Charte africaine et la Convention relative aux droits de l\'enfant.',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      color: '#3b82f6'
    },
    {
      title: 'Amélioration des conditions de vie',
      description: 'Contribuer à l\'amélioration durable des conditions de vie des communautés à travers la promotion de la santé, le développement de l\'agriculture et élevage, la protection de l\'environnement.',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      color: '#10b981'
    },
    {
      title: 'Lutte contre les violences',
      description: 'Prévention et lutte contre les violences basées sur le genre, protection et promotion des droits des femmes et des enfants.',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      color: '#a855f7'
    }
  ];

  const specificObjectives = [
    {
      category: 'Sensibilisation et Protection',
      items: [
        'Sensibiliser la communauté sur les droits des enfants et jeunes travailleurs (droit à l\'éducation, à la santé, à la protection et à la participation)',
        'Identifier et accompagner les enfants vulnérables (travailleurs, orphelins, déplacés, sans acte de naissance, etc.) pour leur réinsertion scolaire ou professionnelle',
        'Collaborer avec les autorités locales et les ONG partenaires pour la protection des droits de l\'enfant'
      ],
      icon: '🛡️',
      color: '#3b82f6'
    },
    {
      category: 'Autonomisation Économique',
      items: [
        'Organiser des groupes de métier et des activités génératrices de revenus pour promouvoir l\'autonomie économique des jeunes',
        'Créer et renforcer les AVEC ou GEC (Associations Villageoises d\'Épargne et de Crédit) pour soutenir les initiatives locales'
      ],
      icon: '💼',
      color: '#10b981'
    },
    {
      category: 'Santé et Nutrition',
      items: [
        'Renforcer la sensibilisation communautaire sur la prévention des maladies',
        'Améliorer les pratiques d\'hygiène et nutrition au sein des ménages'
      ],
      icon: '🏥',
      color: '#ef4444'
    },
    {
      category: 'Agriculture et Sécurité Alimentaire',
      items: [
        'Renforcer la sécurité alimentaire des ménages à travers le développement d\'une agriculture et d\'un élevage durable'
      ],
      icon: '🌾',
      color: '#f59e0b'
    },
    {
      category: 'Environnement',
      items: [
        'Promouvoir la protection et la gestion durable de l\'environnement et des ressources naturelles'
      ],
      icon: '🌍',
      color: '#14b8a6'
    },
    {
      category: 'Égalité et Droits',
      items: [
        'Prévenir et réduire les violences basées sur le genre tout en promouvant l\'égalité des droits de l\'homme et de la femme',
        'Promouvoir et protéger les droits des femmes et des enfants à travers l\'éducation et l\'autonomisation'
      ],
      icon: '⚖️',
      color: '#a855f7'
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Decorative circles */}
        <div className={styles.decorCircleOrange}></div>
        <div className={styles.decorCircleRed}></div>
        <div className={styles.decorCircleYellow}></div>
        <div className={styles.decorCircleBlue}></div>
        <div className={styles.decorDots}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>Notre vision</div>
            <h1 className={styles.heroTitle}>Nos Objectifs</h1>
            <p className={styles.heroSubtitle}>
              Des objectifs clairs pour un impact durable sur les communautés
            </p><br />
            <Button className={styles.heroButton}>Voir notre feuille de route</Button>

            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>3</div>
                <div className={styles.heroStatLabel}>Généraux</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>6</div>
                <div className={styles.heroStatLabel}>Spécifiques</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>8</div>
                <div className={styles.heroStatLabel}>Provinces</div>
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
                <img src="/src/assets/Ressources/image-enfant.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab('general')}
              className={`${styles.tab} ${activeTab === 'general' ? styles.tabActive : ''}`}
            >
              Objectifs Généraux
            </button>
            <button
              onClick={() => setActiveTab('specific')}
              className={`${styles.tab} ${activeTab === 'specific' ? styles.tabActive : ''}`}
            >
              Objectifs Spécifiques
            </button>
          </div>
        </div>

        {/* General Objectives */}
        {activeTab === 'general' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Objectifs Généraux</h2>
              <p className={styles.sectionDescription}>
                Nos trois piliers fondamentaux pour transformer la vie des enfants et jeunes travailleurs
              </p>
            </div>

            <div className={styles.generalGrid}>
              {generalObjectives.map((objective, index) => (
                <div key={index} className={styles.generalCard}>
                  <div className={styles.generalCardBorder} style={{background: objective.color}}></div>
                  <div className={styles.generalCardContent}>
                    <div className={styles.generalIcon} style={{background: objective.color}}>
                      {objective.icon}
                    </div>
                    <h3 className={styles.generalTitle}>{objective.title}</h3>
                    <p className={styles.generalDescription}>{objective.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specific Objectives */}
        {activeTab === 'specific' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Objectifs Spécifiques</h2>
              <p className={styles.sectionDescription}>
                Actions concrètes pour atteindre notre mission et créer un changement durable
              </p>
            </div>

            <div className={styles.specificGrid}>
              {specificObjectives.map((category, index) => (
                <div key={index} className={styles.specificCard}>
                  <div className={styles.specificHeader} style={{background: category.color}}>
                    <span className={styles.specificIcon}>{category.icon}</span>
                    <h3 className={styles.specificTitle}>{category.category}</h3>
                  </div>
                  <div className={styles.specificContent}>
                    <ul className={styles.specificList}>
                      {category.items.map((item, idx) => (
                        <li key={idx} className={styles.specificItem}>
                          <div className={styles.checkIcon}>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ensemble, Réalisons Ces Objectifs</h3>
            <p className={styles.ctaText}>
              Chaque objectif représente un engagement envers un avenir meilleur pour les enfants et jeunes travailleurs de la RDC. 
              Rejoignez-nous dans cette mission transformatrice.
            </p>
            <Button className={styles.ctaButton}>
              Découvrez Comment Nous Aider
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}