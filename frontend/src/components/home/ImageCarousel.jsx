import { useState, useEffect, useRef } from 'react';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null); // Pour stocker le timer

  const slides = [
    {
      image: '/src/assets/images/carousel/protect.jpg',
      title: 'Protection de l\'enfance',
      description: 'Accompagnement des enfants travailleurs vers un avenir meilleur'
    },
    {
      image: '/src/assets/images/carousel/education.jpg',
      title: 'Éducation et formation',
      description: 'Accès à l\'éducation pour tous les enfants de la RDC'
    },
    {
      image: '/src/assets/images/carousel/sante.jpg',
      title: 'Santé communautaire',
      description: 'Des soins de santé accessibles pour les communautés vulnérables'
    },
    {
      image: '/src/assets/images/carousel/insert.jpeg',
      title: 'Insertion socio-économique',
      description: 'Formation professionnelle et appui à l\'entrepreneuriat'
    }
  ];

  // Fonction pour démarrer le timer
  const startTimer = () => {
    // Nettoyer l'ancien timer s'il existe
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Créer un nouveau timer
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  // Démarrer le timer au montage du composant
  useEffect(() => {
    startTimer();

    // Nettoyer le timer au démontage
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [slides.length]);

  // Fonction pour changer de slide et réinitialiser le timer
  const changeSlide = (newIndex) => {
    setCurrentSlide(newIndex);
    startTimer(); // Réinitialiser le timer
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    changeSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(newIndex);
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Nos Actions sur le Terrain</h2>
        
        <div className={styles.carouselWrapper}>
          {/* Slides */}
          <div className={styles.slidesContainer}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === currentSlide ? styles.active : ''
                }`}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.image}
                  />
                  <div className={styles.overlay}></div>
                </div>
                <div className={styles.slideContent}>
                  <h3 className={styles.slideTitle}>{slide.title}</h3>
                  <p className={styles.slideDescription}>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Slide précédent"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Slide suivant"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ''
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}