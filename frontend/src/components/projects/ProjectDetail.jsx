import React from 'react';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onClose }) => {
  return (
    <div className="project-detail">
      <div className="detail-header">
        <img src={project.image} alt={project.title} />
        <div className="detail-overlay">
          <h1 className="detail-title">{project.title}</h1>
          <div className="detail-meta-bar">
            <div className="detail-meta-item">
              <i className="fas fa-calendar"></i>
              <span>{project.duration}</span>
            </div>
            <div className="detail-meta-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{project.location || 'Uvira, RDC'}</span>
            </div>
            <div className="detail-meta-item">
              <i className="fas fa-tag"></i>
              <span>{project.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h2 className="detail-section-title">Description du projet</h2>
          <p className="detail-text">{project.fullDescription}</p>
        </div>

        <div className="detail-section">
          <h2 className="detail-section-title">Objectifs</h2>
          <ul className="objectives-list">
            {project.objectives.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h2 className="detail-section-title">Impact</h2>
          <div className="impact-stats">
            {project.impact.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="project-btn" onClick={onClose}>
          <i className="fas fa-arrow-left"></i>
          Retour aux projets
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;