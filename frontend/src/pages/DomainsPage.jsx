// src/pages/DomainsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaHeartbeat, FaBriefcase, FaLeaf, FaBullhorn, FaShieldAlt, FaRing, FaIndustry, FaUserMd, FaFootballBall, FaFemale, FaChild, FaAmbulance, FaArrowRight } from 'react-icons/fa';
import styles from './DomainsPage.module.css';

export default function DomainsPage() {
  const domains = [
    {
      id: 1,
      title: "Éducation des enfants marginalisés",
      description: "L'AEJT – RDC œuvre pour garantir l'accès à l'éducation aux populations marginalisées...",
      image: "/src/assets/images/domains/68fa9ecaf1d0c0.29467065.jpg",
      icon: FaGraduationCap,
    },
    {
      id: 2,
      title: "Éducation inclusive pour les enfants vivant avec un handicap",
      description: "AEJT – RDC s'engage à promouvoir une éducation inclusive pour les enfants...",
      image: "/src/assets/images/domains/68fa9e8c319630.69281871.jpg",
      icon: FaShieldAlt,
    },
    {
      id: 3,
      title: "Lutte contre le mariage précoce des enfants",
      description: "L'AEJT – RDC œuvre pour prévenir et réduire les mariages précoces, qui...",
      image: "/src/assets/images/domains/68fa9dfa8a2832.75914076.jpg",
      icon: FaRing,
    },
    {
      id: 4,
      title: "Protection des enfants dans les mines artisanales",
      description: "AEJT – RDC s'engage activement à mettre fin à l'implication d'enfants...",
      image: "/src/assets/images/domains/68fa9d2bd69995.07585915.jpg",
      icon: FaIndustry,
    },
    {
      id: 5,
      title: "Santé sexuelle et reproductive des adolescents",
      description: "L'AEJT – RDC œuvre à l'amélioration de la santé sexuelle et reproductive...",
      image: "/src/assets/images/domains/68fa99cc335d81.89565554.jpg",
      icon: FaUserMd,
    },
    {
      id: 6,
      title: "L'inclusion par le sport",
      description: "L'AEJT – RDC utilise le sport comme outil d'inclusion sociale et d'éducation...",
      image: "/src/assets/images/domains/68fa99594efc66.96353983.jpg",
      icon: FaFootballBall,
    },
    {
      id: 7,
      title: "Lutte contre la violence faite aux filles dans les écoles",
      description: "L'AEJT – RDC œuvre à la création d'un environnement scolaire sûr et protecteur...",
      image: "/src/assets/images/domains/68fa991ad97ed4.30888153.jpg",
      icon: FaFemale,
    },
    {
      id: 8,
      title: "Les pires formes de travail des enfants",
      description: "L'AEJT – RDC s'engage à protéger les enfants des pires dangers...",
      image: "/src/assets/images/domains/68fa9d52352c47.74657218.jpg",
      icon: FaChild,
    },
    {
      id: 9,
      title: "Éducation d'urgence pour les enfants, jeunes et femmes touchés par les crises",
      description: "AEJT – RDC intervient dans des contextes de crises, de conflits ou de catastrophes...",
      image: "/src/assets/images/domains/68fa986295af79.24579904.jpg",
      icon: FaAmbulance,
    },
    {
      id: 10,
      title: "Entrepreneuriat et autonomisation des femmes et des jeunes",
      description: "L'AEJT – RDC soutient les femmes et les jeunes dans leur emploi socio-économique...",
      image: "/src/assets/images/domains/68fa95578fa5a4.49222161.jpg",
      icon: FaBriefcase,
    },
    {
      id: 11,
      title: "Règlement pacifique des conflits, paix et bonne gouvernance",
      description: "L'AEJT – RDC promeut une paix durable et la cohésion sociale dans la région...",
      image: "/src/assets/images/domains/68fa939535deb2.67763353.jpg",
      icon: FaBullhorn,
    },
    {
      id: 12,
      title: "Nutrition, sécurité alimentaire et environnement",
      description: "L'AEJT – RDC œuvre pour améliorer la sécurité alimentaire et préserver l'environnement...",
      image: "/src/assets/images/domains/68fa90f927f355.68983087.jpg",
      icon: FaHeartbeat,
    },
    {
      id: 13,
      title: "Conservation de la biodiversité",
      description: "AEJT - RDC s'engage pour la conservation de la biodiversité et la protection...",
      image: "/src/assets/images/domains/68fa8cd4e55465.16973276.jpg",
      icon: FaLeaf,
    }
  ];

  return (
    <div className={styles.domainsPage}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <span className={styles.headerBadge}>
            Nos Domaines d'Activités
          </span>
          <h1 className={styles.headerTitle}>
            Découvrez Nos Principales Activités
            <br />
            et Services pour la Communauté
          </h1>
        </div>
      </div>

      {/* Domains Grid Section */}
      <div className={styles.domainsSection}>
        <div className={styles.domainsGrid}>
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <div key={domain.id} className={styles.domainCard}>
                {/* Image Container */}
                <div className={styles.imageContainer}>
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className={styles.domainImage}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>

                {/* Icon Badge */}
                <div className={styles.iconBadge}>
                  <Icon className={styles.domainIcon} />
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.domainTitle}>
                    {domain.title}
                  </h3>
                  <p className={styles.domainDescription}>
                    {domain.description}
                  </p>
                  
                  {/* Read More Button */}
                  <div className={styles.cardFooter}>
                    <Link
                      to={`/domains/${domain.id}`}
                      className={styles.readMoreLink}
                    >
                      Lire Plus
                      <FaArrowRight className={styles.readMoreIcon} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ensemble, redonnons espoir aux enfants et jeunes travailleurs de la RDC
          </h2>
          <p className={styles.ctaSubtitle}>
            Votre soutien peut transformer des vies. Rejoignez notre mission aujourd'hui.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/donate" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
              Faire un don
            </Link>
            <Link to="/volunteer" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
              Devenir bénévole
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}