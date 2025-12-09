// src/components/DomaineDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { getDomaineById, getAutresDomaines } from '../../data/domainsData';
import styles from './DomaineDetail.module.css';

export default function DomaineDetail() {
  const { id } = useParams();
  
  // Récupérer le domaine actuel
  const domaine = getDomaineById(id);
  
  // Récupérer les autres domaines pour la sidebar
  const autresDomaines = getAutresDomaines(id);

  // Si le domaine n'existe pas
  if (!domaine) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorMessage}>
          <h2>Domaine non trouvé</h2>
          <p>Le domaine que vous recherchez n'existe pas.</p>
          <a href="/domains" className={styles.backLink}>
            Retour aux domaines
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.domaineContainer}>
        {/* Contenu Principal - Gauche */}
        <div className={styles.domaineMain}>
          <img 
            src={domaine.image} 
            alt={domaine.titre}
            className={styles.domaineImage}
          />
          
          <div className={styles.domaineContent}>
            <h3 className={styles.domaineTitle}>
              {domaine.titre}
            </h3>
            
            {domaine.contenu.map((paragraphe, index) => (
              <p key={index} className={styles.domaineText}>
                {paragraphe}
              </p>
            ))}
          </div>
        </div>

        {/* Sidebar - Droite */}
        <div className={styles.domaineSidebar}>
          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarTitle}>Autres Domaines</h4>
            <ul className={styles.domainesList}>
              {autresDomaines.map((autreDomaine) => (
                <li key={autreDomaine.id} className={styles.domaineItem}>
                  <a 
                    href={`/domains/${autreDomaine.id}`} 
                    className={styles.domaineLink}
                  >
                    {autreDomaine.titre}
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