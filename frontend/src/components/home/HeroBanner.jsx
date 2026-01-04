import { useState, useEffect } from 'react';
import { IoRestaurant, IoLibrary, IoWater, IoMedical } from 'react-icons/io5';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ⏱️ PARAMÈTRES DE DURÉE - Modifiez ces valeurs
  const SLIDE_DURATION = 7000;        // Durée d'affichage de chaque slide (en millisecondes)
  const TRANSITION_OUT_DURATION = 300; // Durée de l'animation de sortie (en millisecondes)

  const slides = [
    {
      title: " Ensemble, redonnons espoir aux enfants et jeunes travailleurs de la RDC.",
      highlight: "enfants et jeunes travailleurs"
    },
    {
      subtitle: "Solidarité, Paix et Développement",
      title: "Nos projets intégrés touchent l'éducation, la santé, l'autonomisation économique, la paix et la protection de l'environnement.",
      highlight: "l'éducation, la santé, l'autonomisation économique"
    },
    {
      subtitle: "AEJT Uvira – 15 ans d'action solidaire",
      title: "Depuis 2008, nous accompagnons enfants, jeunes et femmes pour bâtir une société juste et solidaire à l'Est de la RDC",
      highlight: "société juste et solidaire"
    },
    {
      subtitle: "AEJT UVIRA - RD CONGO",
      title: "Une communauté où chaque enfant, jeune et femme vit dignement dans la solidarité.",
      highlight: "vit dignement dans la solidarité"
    },
    {
      subtitle: "Ensemble pour un avenir meilleur",
      title: "Rejoignez plus de 600 membres et partenaires qui œuvrent pour transformer les vies des plus vulnérables",
      highlight: "transformer les vies"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      // Démarrer la transition de sortie
      setIsTransitioning(true);
      
      // Après la durée de transition, changer le slide et redémarrer l'entrée
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, TRANSITION_OUT_DURATION);
      
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const getCurrentSlideText = () => {
    const slide = slides[currentSlide];
    const parts = slide.title.split(slide.highlight);
    
    return (
      <div key={currentSlide} className={`${styles.slideContent} ${isTransitioning ? styles.slideOut : styles.slideIn}`}>
        <span className={styles.subtitle}>{slide.subtitle}</span>
        <h1 className={styles.title}>
          {parts[0]}
          <span className={styles.highlightedText}>{slide.highlight}</span>
          {parts[1]}
        </h1>
      </div>
    );
  };

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
            <div className={styles.slideContainer}>
              {getCurrentSlideText()}
            </div>
            <p className={styles.description}>
              Toutes les cinq secondes, un enfant en Afrique souffre de malnutrition et de maladies évitables — vous pouvez aider à changer cela.
            </p>
            <div className={styles.buttonGroup}>
              <a href="/donate" className={styles.primaryButton}>
                Faire un don
              </a>
              <a href="/about/mission" className={styles.secondaryButton}>
                Découvrir →
              </a>
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