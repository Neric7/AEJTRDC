import React from 'react';
import PartnerGrid from '../components/partners/PartnerGrid';
import './PartnersPage.css';

const PartnersPage = () => {
  return (
    <div className="partners-page">
      {/* Hero Section */}
      <div className="partners-hero">
        <div className="hero-content">
          <div className="hero-badge">NOS DOMAINES D'ACTIVITÉS</div>
          <h1 className="hero-title">
            Découvrez Nos Principales Activités<br/>
            et Services pour la Communauté
          </h1>
          <p className="hero-description">
            Nous travaillons main dans la main avec des organisations nationales et internationales 
            pour améliorer la vie des enfants et jeunes travailleurs en RDC.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="partners-content">
        <div className="partners-container">
          {/* Grille des partenaires */}
          <PartnerGrid />

          {/* Message de reconnaissance */}
          <div className="partners-recognition">
            <p className="recognition-text">
              "Nous remercions nos partenaires pour leur soutien continu et leur engagement 
              envers notre mission commune."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;