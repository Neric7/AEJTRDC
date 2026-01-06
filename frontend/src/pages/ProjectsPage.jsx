import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectGrid from '../components/projects/ProjectGrid';
import ProjectFilter from '../components/projects/ProjectFilter';
import ProjectDetail from '../components/projects/ProjectDetail';
import TestimonySection from '../components/projects/TestimonySection';
import LoginRequiredMessage from '../components/common/LoginRequiredMessage';
import api from '../services/api';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    domain: '',
    search: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger tous les projets au montage (seulement si authentifié)
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  // Filtrer les projets quand les filtres changent
  useEffect(() => {
    applyFilters();
  }, [projects, filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/projects');
      const projectsData = Array.isArray(response.data)
        ? response.data
        : (response.data?.data || response.data?.projects || []);
      
      console.log('✅ Projets chargés:', projectsData.length);
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      
    } catch (err) {
      console.error('❌ Erreur chargement projets:', err);
      setError('Impossible de charger les projets. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Filtre par statut
    if (filters.status) {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    // Filtre par domaine
    if (filters.domain) {
      filtered = filtered.filter(project => project.domain?.id === filters.domain);
    }

    // Filtre par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(project =>
        project.title?.toLowerCase().includes(searchLower) ||
        project.excerpt?.toLowerCase().includes(searchLower) ||
        project.execution_zone?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProjects(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProjectSelect = async (projectId) => {
    try {
      // Charger les détails complets du projet
      const response = await api.get(`/projects/${projectId}`);
      const projectData = response.data?.data || response.data;
      
      setSelectedProject(projectData);
      
    } catch (err) {
      console.error('❌ Erreur chargement projet:', err);
      
      // Fallback : utiliser les données déjà chargées
      const fallbackProject = projects.find(p => p.id === projectId);
      if (fallbackProject) {
        setSelectedProject(fallbackProject);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRelatedProject = (projectSlugOrId) => {
    // Trouver le projet par slug ou ID
    const relatedProject = projects.find(
      p => p.slug === projectSlugOrId || p.id === projectSlugOrId
    );
    
    if (relatedProject) {
      handleProjectSelect(relatedProject.id);
    }
  };

  // Témoignages
  const testimonies = [
    {
      name: 'Marie Lukusa',
      role: 'Mère de famille',
      text: 'Grâce à l\'AEJT, ma fille a pu continuer ses études et développer ses talents. Les éducateurs sont dévoués et le programme est excellent.'
    },
    {
      name: 'Jean-Paul Kabongo',
      role: 'Directeur d\'école',
      text: 'Le partenariat avec l\'AEJT a transformé notre communauté. Les projets éducatifs apportent un réel changement dans la vie des enfants.'
    },
    {
      name: 'Sarah Ndaya',
      role: 'Bénéficiaire',
      text: 'J\'ai participé à la colonie éducative et j\'ai appris tellement de choses ! C\'était une expérience inoubliable qui m\'a aidée à grandir.'
    }
  ];

  // Si en cours de vérification d'authentification
  if (authLoading || loading) {
    return (
      <div className="projects-page">
        <div className="projects-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  // Si non authentifié, afficher le message de connexion requise
  if (!isAuthenticated) {
    return (
      <div className="projects-page">
        <div className="projects-header">
          <h1>Nos Projets</h1>
          <p className="projects-subtitle">
            Découvrez nos initiatives pour améliorer la vie des enfants et des jeunes travailleurs
          </p>
        </div>
        <LoginRequiredMessage 
          title="Connexion requise"
          message="Pour consulter nos projets et suivre leur évolution, veuillez vous connecter à votre compte."
        />
      </div>
    );
  }

  // Si erreur de chargement
  if (error) {
    return (
      <div className="projects-page">
        <div className="projects-container">
          <div className="error-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>{error}</p>
            <button onClick={fetchProjects} className="retry-button">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Contenu normal si authentifié
  return (
    <div className="projects-page">
      <div className="projects-container">
        {!selectedProject ? (
          <>
            {/* En-tête de la page */}
            <div className="projects-header">
              <h1>Nos Projets</h1>
              <p className="projects-subtitle">
                Découvrez nos initiatives pour améliorer la vie des enfants et des jeunes travailleurs
              </p>
            </div>

            {/* Filtres */}
            <ProjectFilter
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />

            {/* Compteur de résultats */}
            <div className="projects-count">
              <p>
                {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
                {filters.search && ` pour "${filters.search}"`}
              </p>
            </div>

            {/* Grille de projets */}
            {filteredProjects.length > 0 ? (
              <ProjectGrid
                projects={filteredProjects}
                onProjectSelect={handleProjectSelect}
              />
            ) : (
              <div className="no-results">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <h3>Aucun projet trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
                <button 
                  onClick={() => setFilters({ status: '', domain: '', search: '' })}
                  className="reset-filters-button"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Section témoignages */}
            {filteredProjects.length > 0 && (
              <TestimonySection testimonies={testimonies} />
            )}
          </>
        ) : (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToList}
            onRelatedProject={handleRelatedProject}
            allProjects={projects}
          />
        )}
      </div>
    </div>
  );
}