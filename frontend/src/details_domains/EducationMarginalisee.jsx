import React from 'react';
import styles from './EducationMarginalisee.module.css';

export default function EducationMarginalisee() {
  // Liste des autres domaines pour la sidebar
  const autresDomaines = [
    { id: 2, titre: "Éducation inclusive pour les enfants vivant avec un handicap" },
    { id: 3, titre: "Lutte contre le mariage précoce des enfants" },
    { id: 4, titre: "Protection des enfants dans les mines artisanales" },
    { id: 5, titre: "Santé sexuelle et reproductive des adolescents" },
    { id: 6, titre: "L'inclusion par le sport" },
    { id: 7, titre: "Lutte contre la violence faite aux filles dans les écoles" },
    { id: 8, titre: "Les pires formes de travail des enfants" },
    { id: 9, titre: "Éducation d'urgence pour les enfants, jeunes et femmes touchés par les crises" },
    { id: 10, titre: "Entrepreneuriat et autonomisation des femmes et des jeunes" },
    { id: 11, titre: "Règlement pacifique des conflits, paix et bonne gouvernance" },
    { id: 12, titre: "Nutrition, sécurité alimentaire et environnement" },
    { id: 13, titre: "Conservation de la biodiversité" }
  ];

  return (
    <div className={styles.pageContainer}>
      <section className={styles.domaineContainer}>
        {/* Contenu Principal - Gauche */}
        <div className={styles.domaineMain}>
          <img 
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80" 
            alt="Éducation des enfants marginalisés"
            className={styles.domaineImage}
          />
          
          <div className={styles.domaineContent}>
            <h3 className={styles.domaineTitle}>
              Éducation des enfants marginalisés
            </h3>
            
            <p className={styles.domaineText}>
              L'AEJT – RDC œuvre pour garantir l'accès à l'éducation aux enfants marginalisés, 
              notamment ceux vivant dans la rue, les orphelins, les personnes déplacées internes 
              et les enfants issus de familles vulnérables touchées par les conflits et la pauvreté. 
              Le programme apporte un soutien concret à la scolarité par la distribution de fournitures 
              scolaires, le parrainage scolaire et des séances de soutien pour combler les lacunes.
            </p>
            
            <p className={styles.domaineText}>
              Parallèlement, un accompagnement psychosocial est proposé pour favoriser le développement 
              émotionnel et social des enfants et les aider à surmonter les traumatismes liés à leur 
              situation. Ces interventions visent à promouvoir la continuité de leur scolarité, leur 
              inclusion sociale et leur épanouissement personnel, contribuant ainsi à rompre le cycle 
              de la vulnérabilité et à leur offrir un avenir meilleur.
            </p>
          </div>
        </div>

        {/* Sidebar - Droite */}
        <div className={styles.domaineSidebar}>
          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarTitle}>Autres Domaines</h4>
            <ul className={styles.domainesList}>
              {autresDomaines.map((domaine) => (
                <li key={domaine.id} className={styles.domaineItem}>
                  <a href={`/domains/${domaine.id}`} className={styles.domaineLink}>
                    {domaine.titre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}