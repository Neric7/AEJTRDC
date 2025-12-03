import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onViewDetails }) => {
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'encours' || statusLower === 'ongoing') return 'status-ongoing';
    if (statusLower === 'terminer' || statusLower === 'completed') return 'status-completed';
    if (statusLower === 'planifié' || statusLower === 'planned') return 'status-planned';
    return 'status-ongoing';
  };

  return (
    <div className="project-card">
      <div className="project-card-thumb">
        <img src={project.image} alt={project.title} />
        <div className={`project-card-tag ${getStatusClass(project.status)}`}>
          <i className="fas fa-info-circle"></i>
          <span>{project.status}</span>
        </div>
        {project.category && (
          <div className="project-category">
            <i className="fas fa-tag"></i>
            <span>{project.category}</span>
          </div>
        )}
      </div>
      <div className="project-card-content">
        <h3 className="project-title" onClick={() => onViewDetails(project)}>
          {project.title}
        </h3>
        <p className="project-description">{project.description}</p>
        <div className="project-meta">
          <div className="meta-item">
            <i className="far fa-eye"></i>
            <span>{project.views} vue{project.views !== 1 ? 's' : ''}</span>
          </div>
          <div className="meta-item">
            <i className="far fa-clock"></i>
            <span>{project.duration}</span>
          </div>
        </div>
        <button className="project-btn" onClick={() => onViewDetails(project)}>
          Voir les détails
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;