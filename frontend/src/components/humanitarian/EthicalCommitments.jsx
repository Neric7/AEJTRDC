// ============================================
// FRONTEND PUBLIC - Affichage Lecture Seule
// Chemin: frontend/src/components/humanitarian/EthicalCommitments.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { Shield, Heart, Users, Scale, Globe, Book, FileText } from 'lucide-react';
import axios from 'axios';
import './EthicalCommitments.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const EthicalCommitments = () => {
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Icônes par catégorie
  const categoryIcons = {
    principes_humanitaires: <Heart size={40} />,
    protection: <Shield size={40} />,
    safeguarding: <Users size={40} />,
    code_conduite: <Book size={40} />,
    normes_qualite: <Scale size={40} />,
    environnement: <Globe size={40} />
  };

  // Couleurs par catégorie
  const categoryColors = {
    principes_humanitaires: '#e74c3c',
    protection: '#3498db',
    safeguarding: '#9b59b6',
    code_conduite: '#f39c12',
    normes_qualite: '#1abc9c',
    environnement: '#27ae60'
  };

  // Labels lisibles
  const categoryLabels = {
    principes_humanitaires: 'Principes Humanitaires',
    protection: 'Protection',
    safeguarding: 'Safeguarding',
    code_conduite: 'Code de Conduite',
    normes_qualite: 'Normes de Qualité',
    environnement: 'Environnement'
  };

  useEffect(() => {
    fetchCommitments();
  }, []);

  const fetchCommitments = async () => {
    try {
      setLoading(true);
      // ✅ CORRECTION : Utiliser la bonne route /humanitarian/ethical-commitments
      const response = await axios.get(`${API_URL}/humanitarian/ethical-commitments`);
      setCommitments(response.data.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      console.error('URL appelée:', `${API_URL}/humanitarian/ethical-commitments`);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les engagements par catégorie
  const filteredCommitments = activeCategory === 'all' 
    ? commitments 
    : commitments.filter(c => c.category === activeCategory);

  // Extraire les catégories uniques
  const categories = [...new Set(commitments.map(c => c.category))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des engagements éthiques...</p>
      </div>
    );
  }

  return (
    <div className="ethical-commitments-public">
      {/* En-tête Hero */}
      <section className="hero-section">
        <div className="hero-icon-wrapper">
          <Shield size={80} />
        </div>
        <h1>Nos Engagements Éthiques et Humanitaires</h1>
        <p className="hero-description">
          Guidés par des principes humanitaires universels, nous nous engageons à servir 
          les populations vulnérables avec intégrité, dignité et respect.
        </p>
      </section>

      {/* Filtres par catégorie */}
      {categories.length > 0 && (
        <div className="category-filters">
          <button
            className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Tous les engagements
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-button ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      )}

      {/* Grille des engagements */}
      <div className="commitments-container">
        {filteredCommitments.length === 0 ? (
          <div className="empty-state">
            <Shield size={64} />
            <h3>Aucun engagement disponible</h3>
            <p>Les engagements seront bientôt disponibles</p>
          </div>
        ) : (
          <div className="commitments-grid">
            {filteredCommitments.map((commitment) => (
              <div key={commitment.id} className="commitment-card">
                <div 
                  className="card-icon" 
                  style={{ 
                    backgroundColor: `${categoryColors[commitment.category]}20`,
                    color: categoryColors[commitment.category]
                  }}
                >
                  {categoryIcons[commitment.category] || <Shield size={40} />}
                </div>
                
                <div className="card-content">
                  <span 
                    className="category-badge"
                    style={{ 
                      backgroundColor: `${categoryColors[commitment.category]}15`,
                      color: categoryColors[commitment.category]
                    }}
                  >
                    {categoryLabels[commitment.category]}
                  </span>
                  
                  <h3>{commitment.title}</h3>
                  <p className="description">{commitment.description}</p>
                  
                  {commitment.reference_documents && (
                    <div className="reference-docs">
                      <FileText size={16} />
                      <span>{commitment.reference_documents}</span>
                    </div>
                  )}

                  {commitment.implementation_date && (
                    <div className="implementation-date">
                      <span>Mis en œuvre le {new Date(commitment.implementation_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section additionnelle : Documents de référence */}
      <section className="references-section">
        <h2>Documents de Référence</h2>
        <div className="references-grid">
          <div className="reference-item">
            <Book size={24} />
            <span>Charte Humanitaire et normes minimales de Sphere</span>
          </div>
          <div className="reference-item">
            <Book size={24} />
            <span>Code de conduite du Mouvement international de la Croix-Rouge</span>
          </div>
          <div className="reference-item">
            <Book size={24} />
            <span>Normes minimales de protection de l'enfance (CPMS)</span>
          </div>
          <div className="reference-item">
            <Book size={24} />
            <span>Principes de partenariat humanitaire</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EthicalCommitments;