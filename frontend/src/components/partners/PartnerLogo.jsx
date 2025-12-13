import React from 'react';
import './PartnerLogo.css';

const PartnerLogo = ({ partner }) => {
  const logoUrl = partner.logo_url || partner.logo;

  return (
    <div className="partner-card">
      <div className="partner-card-content">
        {/* Logo agrandi et plus visible */}
        <div className="partner-logo-container">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`Logo ${partner.name}`}
              className="partner-logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="partner-logo-placeholder" 
            style={{ display: logoUrl ? 'none' : 'flex' }}
          >
            <span>{partner.name.charAt(0)}</span>
          </div>
        </div>
        
        {/* Nom */}
        <h3 className="partner-name">
          {partner.name}
        </h3>
        
        {/* Type de partenaire */}
        {partner.type && (
          <span className={`partner-type partner-type-${partner.type.toLowerCase()}`}>
            {partner.type}
          </span>
        )}
        
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

        {/* Contact info */}
        {(partner.email || partner.phone) && (
          <div className="partner-contact">
            {partner.email && (
              <a href={`mailto:${partner.email}`} className="partner-contact-item">
                ✉ {partner.email}
              </a>
            )}
            {partner.phone && (
              <a href={`tel:${partner.phone}`} className="partner-contact-item">
                ☎ {partner.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerLogo;