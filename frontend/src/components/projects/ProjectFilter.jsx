import React from 'react';
import './ProjectFilter.css';

const ProjectFilter = ({ filters, onFilterChange, onSearch, onReset }) => {
  return (
    <div className="project-filter">
      <div className="filter-header">
        <h2 className="filter-title">Filtrer les projets</h2>
        <button className="filter-reset" onClick={onReset}>
          <i className="fas fa-redo"></i> Réinitialiser
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un projet..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <div className="filter-group">
        <label className="filter-label">Statut</label>
        <div className="filter-options">
          {['Tous', 'En cours', 'Terminé', 'Planifié'].map(status => (
            <button
              key={status}
              className={`filter-option ${filters.status === status ? 'active' : ''}`}
              onClick={() => onFilterChange('status', status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Catégorie</label>
        <div className="filter-options">
          {['Tous', 'Éducation', 'Santé', 'Humanitaire', 'Développement'].map(category => (
            <button
              key={category}
              className={`filter-option ${filters.category === category ? 'active' : ''}`}
              onClick={() => onFilterChange('category', category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;