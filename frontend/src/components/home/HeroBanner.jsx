import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { IoRestaurant, IoLibrary, IoWater, IoMedical } from 'react-icons/io5';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactStats = [
    { icon: <IoRestaurant />, title: "Nourriture Saine", description: "Nutrition améliorée et hygiène pour une meilleure santé." },
    { icon: <IoLibrary />, title: "Éducation", description: "Accès à une éducation de qualité pour chaque enfant." },
    { icon: <IoWater />, title: "Eau Pure", description: "Eau potable propre pour des communautés en bonne santé." },
    { icon: <IoMedical />, title: "Soins Médicaux", description: "Services de santé essentiels pour tous." }
  ];

  return (
    <div className={styles.heroContainer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Texte */}
          <div className={`${styles.textColumn} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.title}>
            "Ensemble,{' '}
            <span className={styles.highlightedText}>redonnons espoir</span> aux enfants et jeunes travailleurs de la RDC."
          </h1>
            <p className={styles.description}>
              Toutes les cinq secondes, un enfant en Afrique souffre de malnutrition et de maladies évitables — vous pouvez aider à changer cela.
            </p>
            <div className={styles.buttonGroup}>
              <Button className={styles.primaryButton}>Faire un don</Button>
              <Button className={styles.secondaryButton}>Découvrir →</Button>
            </div>
          </div>

          {/* Image avec fond dégradé */}
          <div className={`${styles.imageColumn} ${isVisible ? styles.visible : ''}`}>
            <img 
              src="/src/assets/Ressources/afrique.jpg" 
              alt="Carte de l'Afrique" 
              className={styles.africaImage}
            />
            <div className={styles.statBadge}>
              <div className={styles.statNumber}>288</div>
              <div className={styles.statLabel}>enfants meurent chaque jour en Afrique</div>
            </div>
          </div>
        </div>

        {/* 4 cartes d'impact */}
        <div className={`${styles.impactGrid} ${isVisible ? styles.visible : ''}`}>
          {impactStats.map((stat, index) => (
            <div key={index} className={styles.impactCard}>
              <div className={styles.impactIcon}>{stat.icon}</div>
              <h3 className={styles.impactTitle}>{stat.title}</h3>
              <p className={styles.impactDescription}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}