import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import ProjectDetail from '../components/projects/ProjectDetail';
import TestimonySection from '../components/projects/TestimonySection';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [filters, setFilters] = useState({ status: 'Tous', category: 'Tous' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    // import { getProjects } from '../services/api';
    // getProjects().then(data => setProjects(data));
    
    // Données de démo pour l'instant
    setProjects([
      {
        id: 1,
        title: 'Colonie éducative annuelle',
        description: 'Programme de vacances éducatives alliant apprentissages...',
        fullDescription: 'La colonie éducative annuelle est un programme intensif...',
        image: '/assets/images/projects/projet1.jpg',
        status: 'En cours',
        category: 'Éducation',
        views: 1,
        duration: '1 mois',
        location: 'Uvira, Sud-Kivu',
        objectives: [
          'Offrir un apprentissage de qualité',
          'Développer les compétences sociales',
          'Promouvoir la culture et les arts'
        ],
        impact: [
          { number: '150+', label: 'Enfants bénéficiaires' },
          { number: '20', label: 'Éducateurs formés' }
        ]
      }
      // Ajouter plus de projets...
    ]);
    setLoading(false);
  }, []);

  const testimonies = [
    {
      name: 'Marie Lukusa',
      role: 'Mère de famille',
      text: 'Grâce à l\'AEJT, ma fille a pu continuer ses études...'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filters.status === 'Tous' || project.status === filters.status;
    const matchesCategory = filters.category === 'Tous' || project.category === filters.category;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleReset = () => {
    setFilters({ status: 'Tous', category: 'Tous' });
    setSearchTerm('');
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="projects-page">
      <div className="projects-container">
        {!selectedProject ? (
          <>
            <ProjectFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={setSearchTerm}
              onReset={handleReset}
            />
            
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>Aucun projet trouvé</p>
              </div>
            )}

            <TestimonySection testimonies={testimonies} />
          </>
        ) : (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;