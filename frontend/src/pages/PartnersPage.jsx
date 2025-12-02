import React from 'react';
import PartnerGrid from '../components/partners/PartnerGrid';
import './PartnersPage.css';

const PartnersPage = () => {
  return (
    <div className="partners-page">
      <div className="partners-container">
        {/* En-tête */}
        <div className="partners-header">
          <h1 className="partners-title">Nos Partenaires</h1>
          <p className="partners-subtitle">
            Nous travaillons main dans la main avec des organisations nationales et internationales 
            pour améliorer la vie des enfants et jeunes travailleurs en RDC.
          </p>
        </div>

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
  );
};

export default PartnersPage;