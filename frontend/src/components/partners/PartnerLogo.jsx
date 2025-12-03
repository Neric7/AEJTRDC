import React from 'react';
import './PartnerLogo.css';

const PartnerLogo = ({ partner }) => {
  return (
    <div className="partner-card">
      <div className="partner-card-content">
        {/* Logo */}
        <div className="partner-logo-container">
          <img 
            src={partner.logo} 
            alt={`Logo ${partner.name}`}
            className="partner-logo-image"
          />
        </div>
        
        {/* Nom */}
        <h3 className="partner-name">
          {partner.name}
        </h3>
        
        {/* Description */}
        <p className="partner-description">
          {partner.description}
        </p>
        
        {/* Lien vers site web */}
        {partner.website && partner.website !== '#' && (
          <a 
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-website-link"
          >
            Visiter le site →
          </a>
        )}
      </div>
    </div>
  );
};

export default PartnerLogo;