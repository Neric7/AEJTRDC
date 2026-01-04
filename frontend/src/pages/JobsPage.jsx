import { useState, useEffect } from 'react';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiCalendar, 
  FiClock, 
  FiSearch,
  FiFileText,
  FiUsers,
  FiMessageCircle,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiX,
  FiEye
} from 'react-icons/fi';
import { jobsAPI } from '../services/api'; // ← Import de l'API
import './JobsPage.css';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('offers');
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);

  // ✅ RÉCUPÉRATION DES OFFRES DEPUIS L'API
  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Paramètres selon le filtre
      const params = {
        pageSize: 50,
        ...(filter !== 'all' && { type: filter.toUpperCase() }) // CDI, CDD, STAGE
      };

      const response = await jobsAPI.getAll(params);
      
      // Adapter selon la structure de votre réponse API
      const jobsData = response.data.data || response.data;
      setJobs(jobsData);
      
    } catch (error) {
      console.error('Erreur lors du chargement des offres:', error);
      setError('Impossible de charger les offres. Veuillez réessayer.');
      // toast.error('Erreur lors du chargement des offres'); // Si vous utilisez toast
    } finally {
      setLoading(false);
    }
  };

  // ✅ FORMATER LA DATE DEADLINE
  const formatDeadline = (deadline) => {
    if (!deadline) return null;
    return new Date(deadline).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // ✅ VÉRIFIER SI UNE OFFRE EST EXPIRÉE
  const isExpired = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="jobs-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des offres...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-page">
        <div className="error-container">
          <FiX className="error-icon" />
          <p>{error}</p>
          <button className="btn-retry" onClick={fetchJobs}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      {/* HERO */}
      <section className="jobs-hero">
        <div className="hero-background">
          <div className="hero-circle hero-circle-1"></div>
          <div className="hero-circle hero-circle-2"></div>
        </div>
        <div className="container">
          <h1>Offres d'Emploi & Stages</h1>
          <p>Rejoignez notre équipe et participez à notre mission humanitaire</p>
        </div>
      </section>

      {/* TABS */}
      <div className="careers-tabs">
        <div className="container">
          <div className="tabs-navigation">
            <button
              className={`tab-button ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveTab('offers')}
            >
              Nos Offres
            </button>
            <button
              className={`tab-button ${activeTab === 'process' ? 'active' : ''}`}
              onClick={() => setActiveTab('process')}
            >
              Comment Postuler ?
            </button>
          </div>
        </div>
      </div>

      {/* FILTRES */}
      {activeTab === 'offers' && (
        <div className="jobs-filters">
          <div className="container">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Toutes les offres ({jobs.length})
            </button>
            <button
              className={`filter-btn ${filter === 'cdi' ? 'active' : ''}`}
              onClick={() => setFilter('cdi')}
            >
              CDI
            </button>
            <button
              className={`filter-btn ${filter === 'cdd' ? 'active' : ''}`}
              onClick={() => setFilter('cdd')}
            >
              CDD
            </button>
            <button
              className={`filter-btn ${filter === 'stage' ? 'active' : ''}`}
              onClick={() => setFilter('stage')}
            >
              Stages
            </button>
          </div>
        </div>
      )}

      {/* OFFRES */}
      {activeTab === 'offers' && (
        <div className="jobs-content">
          <div className="container">
            <div className="jobs-grid">
              {jobs.length > 0 ? (
                jobs.map((job) => {
                  const expired = isExpired(job.deadline);
                  
                  return (
                    <div 
                      key={job.id} 
                      className={`job-card ${expired ? 'expired' : ''}`}
                    >
                      <div className="job-card-border"></div>
                      
                      {/* Badge vedette */}
                      {job.featured && (
                        <div className="featured-badge">
                          ★ En vedette
                        </div>
                      )}
                      
                      {/* Badge expiré */}
                      {expired && (
                        <div className="expired-badge">
                          Offre expirée
                        </div>
                      )}

                      <div className="job-header">
                        <h3>{job.title}</h3>
                        <span className={`job-badge ${job.type.toLowerCase()}`}>
                          {job.type}
                        </span>
                      </div>

                      <div className="job-meta">
                        <span className="meta-item">
                          <FiMapPin className="meta-icon" /> {job.location}
                        </span>
                        <span className="meta-item">
                          <FiBriefcase className="meta-icon" /> {job.department}
                        </span>
                        {job.deadline && (
                          <span className="meta-item">
                            <FiCalendar className="meta-icon" /> 
                            {formatDeadline(job.deadline)}
                          </span>
                        )}
                        {job.duration && (
                          <span className="meta-item">
                            <FiClock className="meta-icon" /> {job.duration}
                          </span>
                        )}
                      </div>

                      <p className="job-description">{job.description}</p>

                      <div className="job-actions">
                        <button 
                          className="btn-details" 
                          onClick={() => setSelectedJob(job)}
                        >
                          <FiEye /> Voir les détails
                        </button>
                        <button 
                          className="btn-apply"
                          disabled={expired}
                        >
                          {expired ? 'Expiré' : 'Postuler'}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-jobs">
                  <FiSearch className="no-jobs-icon" />
                  <p>Aucune offre disponible pour cette catégorie</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PROCESS */}
      {activeTab === 'process' && (
        <section className="process-section">
          <div className="container">
            <h2>Comment postuler ?</h2>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <FiSearch className="step-icon" />
                <p>Consulter les offres disponibles</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <FiFileText className="step-icon" />
                <p>Envoyer votre CV et lettre de motivation</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <FiBriefcase className="step-icon" />
                <p>Analyse des candidatures</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <FiMessageCircle className="step-icon" />
                <p>Entretiens</p>
              </div>
              <div className="process-step">
                <div className="step-number">5</div>
                <FiCheckCircle className="step-icon" />
                <p>Décision finale</p>
              </div>
            </div>

            <div className="contact-info">
              <h3><FiMail className="contact-icon" /> Contact Recrutement</h3>
              <p>
                <strong>Email :</strong> 
                <a href="mailto:recrutement@aejtrdc.org">recrutement@aejtrdc.org</a>
              </p>
              <p>
                <FiPhone className="contact-icon" />
                <strong>Téléphone :</strong> +243 XXX XXX XXX
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MODAL */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-gradient">
              <button className="modal-close" onClick={() => setSelectedJob(null)}>
                <FiX />
              </button>
              <h2>{selectedJob.title}</h2>
              <p className="modal-subtitle">{selectedJob.department}</p>
            </div>

            <div className="modal-body">
              <div className="modal-badges">
                <span className="modal-badge">
                  <FiMapPin /> {selectedJob.location}
                </span>
                <span className={`modal-badge ${selectedJob.type.toLowerCase()}`}>
                  {selectedJob.type}
                </span>
                {selectedJob.deadline && (
                  <span className="modal-badge">
                    <FiCalendar /> {formatDeadline(selectedJob.deadline)}
                  </span>
                )}
              </div>

              <div className="modal-description">
                <p>{selectedJob.description}</p>
              </div>

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div className="modal-section">
                  <h3>
                    <FiUsers className="section-icon" /> Profil recherché
                  </h3>
                  <ul>
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div className="modal-section">
                  <h3>
                    <FiBriefcase className="section-icon" /> Responsabilités
                  </h3>
                  <ul>
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-actions">
                <button 
                  className="btn-apply-modal"
                  disabled={isExpired(selectedJob.deadline)}
                >
                  {isExpired(selectedJob.deadline) ? 'Offre expirée' : 'Postuler maintenant'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;