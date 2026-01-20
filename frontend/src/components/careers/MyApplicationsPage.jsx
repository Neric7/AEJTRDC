import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './MyApplicationsPage.css';

const MyApplicationsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [canApply, setCanApply] = useState(true);

  const availabilityLabels = {
    full_time: 'Temps plein',
    part_time: 'Temps partiel',
    weekends: 'Week-ends uniquement',
    flexible: 'Flexible'
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await api.get('/user/volunteers/my-applications');
      setApplications(response.data.applications);
      setCanApply(response.data.can_apply);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', className: 'status-pending', icon: '⏳' },
      accepted: { label: 'Acceptée', className: 'status-accepted', icon: '✅' },
      rejected: { label: 'Rejetée', className: 'status-rejected', icon: '❌' },
      in_progress: { label: 'En cours', className: 'status-progress', icon: '🔄' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.className}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending':
        return {
          type: 'info',
          title: '📌 Candidature en cours d\'examen',
          message: 'Notre équipe examine votre candidature. Nous vous contacterons bientôt.'
        };
      case 'accepted':
        return {
          type: 'success',
          title: '🎉 Félicitations ! Candidature acceptée',
          message: 'Bienvenue dans notre équipe de bénévoles ! Nous vous contacterons pour les prochaines étapes.'
        };
      case 'rejected':
        return {
          type: 'warning',
          title: 'Candidature non retenue',
          message: 'Malheureusement, votre candidature n\'a pas été retenue pour le moment. N\'hésitez pas à postuler à nouveau.'
        };
      case 'in_progress':
        return {
          type: 'info',
          title: '🔄 Dossier en cours de traitement',
          message: 'Nous finalisons l\'examen de votre candidature.'
        };
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="applications-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement de vos candidatures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="applications-container">
        {/* Header */}
        <div className="applications-header">
          <h1>📋 Mes candidatures de bénévolat</h1>
          <p>
            Vous avez {applications.length} candidature{applications.length > 1 ? 's' : ''}
            {applications.length > 0 && ` • ${canApply ? 'Vous pouvez soumettre une nouvelle candidature' : 'Limite atteinte (5 max)'}`}
          </p>
        </div>

        {/* Actions */}
        <div className="applications-actions">
          <button 
            className="btn-primary"
            onClick={() => navigate('/careers')}
            disabled={!canApply}
          >
            ➕ Nouvelle candidature
          </button>
          {!canApply && (
            <p className="limit-message">
              Vous avez atteint le maximum de 5 candidatures actives
            </p>
          )}
        </div>

        {/* Liste des candidatures */}
        {applications.length === 0 ? (
          <div className="no-applications">
            <div className="no-applications-icon">📝</div>
            <h2>Aucune candidature</h2>
            <p>Vous n'avez pas encore soumis de candidature de bénévolat.</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/careers')}
            >
              Soumettre ma première candidature
            </button>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app, index) => {
              const statusMsg = getStatusMessage(app.status);
              
              return (
                <div key={app.id} className="application-card">
                  {/* Card Header */}
                  <div className="card-header">
                    <div className="card-title">
                      <h3>
                        Candidature #{applications.length - index}
                        {app.interest_domain && ` - ${app.interest_domain}`}
                      </h3>
                      {getStatusBadge(app.status)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">📅 Date de soumission</span>
                        <span className="info-value">
                          {new Date(app.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="info-item">
                        <span className="info-label">🕐 Disponibilité</span>
                        <span className="info-value">
                          {availabilityLabels[app.availability] || app.availability}
                        </span>
                      </div>

                      {app.skills && (
                        <div className="info-item full-width">
                          <span className="info-label">💼 Compétences</span>
                          <span className="info-value">{app.skills}</span>
                        </div>
                      )}

                      <div className="info-item full-width">
                        <span className="info-label">✉️ Message de motivation</span>
                        <span className="info-value motivation-text">{app.message}</span>
                      </div>
                    </div>

                    {/* Status Message */}
                    {statusMsg && (
                      <div className={`alert alert-${statusMsg.type}`}>
                        <strong>{statusMsg.title}</strong>
                        <p>{statusMsg.message}</p>
                      </div>
                    )}

                    {/* Admin Response */}
                    {app.response_message && (
                      <div className="admin-response">
                        <h4>💬 Message de l'équipe</h4>
                        <p>{app.response_message}</p>
                      </div>
                    )}

                    {/* CV Download */}
                    {app.cv_url && (
                      <div className="cv-download">
                        <a 
                          href={app.cv_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          📄 Voir mon CV
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;