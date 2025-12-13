import React, { useState, useEffect } from 'react';
import partnersAPI from '../services/partners';
import PartnerLogo from '../components/partners/PartnerLogo';
import './PartnersPage.css';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    loadPartners();
    loadTypes();
  }, [selectedType]);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const params = selectedType !== 'all' ? { type: selectedType } : {};
      const response = await partnersAPI.getActive(params);
      setPartners(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des partenaires:', err);
      setError('Impossible de charger les partenaires. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const response = await partnersAPI.getTypes();
      setTypes(response.data.types || {});
    } catch (err) {
      console.error('Erreur lors du chargement des types:', err);
    }
  };

  return (
    <div className="partners-page">
      {/* Hero Section */}
      <div className="partners-hero">
        <div className="hero-content">
          <div className="hero-badge">NOS PARTENAIRES</div>
          <h1 className="hero-title">
            Découvrez Nos Partenaires<br/>
            Engagés pour le Changement
          </h1>
          <p className="hero-description">
            Nous travaillons main dans la main avec des organisations nationales et internationales 
            pour améliorer la vie des enfants et jeunes travailleurs en RDC.
          </p>
        </div>
      </div>

      {/* Filtres par type */}
      {Object.keys(types).length > 0 && (
        <div className="partners-filters">
          <div className="filters-container">
            <button
              className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              Tous les partenaires
            </button>
            {Object.entries(types).map(([key, label]) => (
              <button
                key={key}
                className={`filter-btn ${selectedType === key ? 'active' : ''}`}
                onClick={() => setSelectedType(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="partners-content">
        <div className="partners-container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Chargement des partenaires...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-btn" onClick={loadPartners}>
                Réessayer
              </button>
            </div>
          ) : partners.length === 0 ? (
            <div className="empty-container">
              <p>Aucun partenaire trouvé.</p>
            </div>
          ) : (
            <>
              {/* Grille des partenaires */}
              <div className="partner-grid">
                {partners.map(partner => (
                  <PartnerLogo key={partner.id} partner={partner} />
                ))}
              </div>

              {/* Message de reconnaissance */}
              <div className="partners-recognition">
                <p className="recognition-text">
                  "Nous remercions nos partenaires pour leur soutien continu et leur engagement 
                  envers notre mission commune."
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;