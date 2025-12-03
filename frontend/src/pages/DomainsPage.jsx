import React from 'react';
import { FaGraduationCap, FaHeartbeat, FaBriefcase, FaLeaf, FaBullhorn, FaShieldAlt, FaRing, FaIndustry, FaUserMd, FaFootballBall, FaFemale, FaChild, FaAmbulance, FaArrowRight } from 'react-icons/fa';
import styles from './DomainsPage.module.css';

export default function DomainsPage() {
  const domains = [
    {
      id: 1,
      title: "Éducation des enfants marginalisés",
      description: "L'AEJT – RDC œuvre pour garantir l'accès à l'éducation aux populations marginalisées...",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
      icon: FaGraduationCap,
    },
    {
      id: 2,
      title: "Éducation inclusive pour les enfants vivant avec un handicap",
      description: "AEJT – RDC s'engage à promouvoir une éducation inclusive pour les enfants...",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      icon: FaShieldAlt,
    },
    {
      id: 3,
      title: "Lutte contre le mariage précoce des enfants",
      description: "L'AEJT – RDC œuvre pour prévenir et réduire les mariages précoces, qui...",
      image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80",
      icon: FaRing,
    },
    {
      id: 4,
      title: "Protection des enfants dans les mines artisanales",
      description: "AEJT – RDC s'engage activement à mettre fin à l'implication d'enfants...",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      icon: FaIndustry,
    },
    {
      id: 5,
      title: "Santé sexuelle et reproductive des adolescents",
      description: "L'AEJT – RDC œuvre à l'amélioration de la santé sexuelle et reproductive...",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      icon: FaUserMd,
    },
    {
      id: 6,
      title: "L'inclusion par le sport",
      description: "L'AEJT – RDC utilise le sport comme outil d'inclusion sociale et d'éducation...",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
      icon: FaFootballBall,
    },
    {
      id: 7,
      title: "Lutte contre la violence faite aux filles dans les écoles",
      description: "L'AEJT – RDC œuvre à la création d'un environnement scolaire sûr et protecteur...",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      icon: FaFemale,
    },
    {
      id: 8,
      title: "Les pires formes de travail des enfants",
      description: "L'AEJT – RDC s'engage à protéger les enfants des pires dangers...",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      icon: FaChild,
    },
    {
      id: 9,
      title: "Éducation d'urgence pour les enfants, jeunes et femmes touchés par les crises",
      description: "AEJT – RDC intervient dans des contextes de crises, de conflits ou de catastrophes...",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      icon: FaAmbulance,
    },
    {
      id: 10,
      title: "Entrepreneuriat et autonomisation des femmes et des jeunes",
      description: "L'AEJT – RDC soutient les femmes et les jeunes dans leur emploi socio-économique...",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
      icon: FaBriefcase,
    },
    {
      id: 11,
      title: "Règlement pacifique des conflits, paix et bonne gouvernance",
      description: "L'AEJT – RDC promeut une paix durable et la cohésion sociale dans la région...",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      icon: FaBullhorn,
    },
    {
      id: 12,
      title: "Nutrition, sécurité alimentaire et environnement",
      description: "L'AEJT – RDC œuvre pour améliorer la sécurité alimentaire et préserver l'environnement...",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      icon: FaHeartbeat,
    },
    {
      id: 13,
      title: "Conservation de la biodiversité",
      description: "AEJT - RDC s'engage pour la conservation de la biodiversité et la protection...",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
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
                    <a
                      href={`/domains/${domain.id}`}
                      className={styles.readMoreLink}
                    >
                      Lire Plus
                      <FaArrowRight className={styles.readMoreIcon} />
                    </a>
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
            <a href="/donate" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
              Faire un don
            </a>
            <a href="/volunteer" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
              Devenir bénévole
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}