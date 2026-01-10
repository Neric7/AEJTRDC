import { useState } from 'react';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ImpactStories.css';

function ImpactStories() {
  const [currentStory, setCurrentStory] = useState(0);

  const stories = [
    {
      id: 1,
      name: 'Grace, 14 ans',
      location: 'Bukavu',
      image: '/src/assets/Ressources/children.png',
      story: 'Grâce au soutien de nos donateurs, j\'ai pu reprendre l\'école et rêver d\'un avenir meilleur. Aujourd\'hui, je suis en 6ème année primaire et je veux devenir infirmière pour aider ma communauté.',
      impact: 'Scolarisée depuis 2 ans',
      category: 'Éducation'
    },
    {
      id: 2,
      name: 'Jean, 16 ans',
      location: 'Goma',
      image: '/src/assets/Ressources/children.png',
      story: 'J\'ai appris la menuiserie grâce au programme de formation professionnelle. Maintenant, j\'ai mon propre petit atelier et je peux aider ma famille. Je forme même d\'autres jeunes !',
      impact: 'Autonome depuis 1 an',
      category: 'Formation Professionnelle'
    },
    {
      id: 3,
      name: 'Marie, 12 ans',
      location: 'Uvira',
      image: '/src/assets/Ressources/children.png',
      story: 'Avant, je ne mangeais qu\'un repas par jour. Maintenant, avec le programme de nutrition, je suis en bonne santé et je peux bien étudier. Mes résultats scolaires se sont beaucoup améliorés.',
      impact: 'Bien nourrie quotidiennement',
      category: 'Nutrition'
    },
    {
      id: 4,
      name: 'David, 15 ans',
      location: 'Kalemie',
      image: '/src/assets/Ressources/children.png',
      story: 'J\'ai été soigné pour le paludisme grâce au programme de santé. Les équipes m\'ont aussi appris à me protéger des maladies. Je suis maintenant ambassadeur santé dans mon quartier.',
      impact: 'En bonne santé',
      category: 'Santé'
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const story = stories[currentStory];

  return (
    <section className="impact-stories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Histoires d'Impact</h2>
          <p className="section-subtitle">
            Découvrez comment vos dons transforment des vies
          </p>
        </div>

        <div className="story-container">
          <div className="story-content">
            
            <div className="story-image-wrapper">
              <img 
                src={story.image} 
                alt={story.name}
                className="story-image"
              />
              <div className="story-category-badge">{story.category}</div>
            </div>

            <div className="story-text-content">
              <FaQuoteLeft className="quote-icon" />
              
              <div className="story-header">
                <h3 className="story-name">{story.name}</h3>
                <span className="story-location">📍 {story.location}</span>
              </div>

              <p className="story-text">{story.story}</p>

              <div className="story-impact">
                <span className="impact-label">Impact</span>
                <span className="impact-value">{story.impact}</span>
              </div>

              <div className="story-navigation">
                <button 
                  onClick={prevStory}
                  className="nav-btn"
                  aria-label="Histoire précédente"
                >
                  <FaArrowLeft />
                </button>

                <div className="story-indicators">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStory(index)}
                      className={`indicator ${index === currentStory ? 'active' : ''}`}
                      aria-label={`Aller à l'histoire ${index + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextStory}
                  className="nav-btn"
                  aria-label="Histoire suivante"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="stories-stats">
            <div className="stat-box">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Histoires comme celle-ci</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">95%</span>
              <span className="stat-label">Taux de satisfaction</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">8</span>
              <span className="stat-label">Provinces couvertes</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="stories-cta">
          <h3>Vous aussi, écrivez une histoire</h3>
          <p>Chaque don crée une nouvelle histoire de réussite</p>
          <button className="cta-button">
            Faire un don maintenant
          </button>
        </div>
      </div>
    </section>
  );
}

export default ImpactStories;