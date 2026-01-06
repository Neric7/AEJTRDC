import { useState } from 'react';
import { X, Save, User, Mail, Phone, MapPin, Clock, FileText, Download, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import './Editor.css';

const VolunteerExaminer = ({ volunteer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    status: volunteer?.status || 'pending',
    admin_notes: volunteer?.admin_notes || '',
    response_message: volunteer?.response_message || ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const statusOptions = [
    { value: 'pending', label: 'En attente', icon: '⏳', color: '#ff9800' },
    { value: 'in_progress', label: 'En cours d\'examen', icon: '🔍', color: '#2196F3' },
    { value: 'accepted', label: 'Accepté', icon: '✅', color: '#4caf50' },
    { value: 'rejected', label: 'Rejeté', icon: '❌', color: '#f44336' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:8000/api/admin/volunteers/${volunteer.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Candidature mise à jour avec succès' });
        setTimeout(() => {
          onSave();
        }, 1500);
      } else {
        const error = await response.json();
        setNotification({ type: 'error', message: error.message || 'Erreur lors de la mise à jour' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getAvailabilityLabel = (availability) => {
    const map = {
      full_time: 'Temps plein',
      part_time: 'Temps partiel',
      weekends: 'Week-ends',
      flexible: 'Flexible'
    };
    return map[availability] || availability;
  };

  const handleDownloadCV = () => {
    if (volunteer.cv_url) {
      window.open(volunteer.cv_url, '_blank');
    }
  };

  return (
    <div className="editor-container">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className="editor-header">
        <div>
          <h2>Examiner la candidature</h2>
          <p>Examinez et répondez à la candidature de bénévolat</p>
        </div>
        <button className="close-btn" onClick={onCancel} type="button">
          <X size={24} />
        </button>
      </div>

      <div className="editor-form">
        {/* Informations du candidat */}
        <div className="form-section">
          <h3 className="section-title">
            <User size={20} />
            Informations du candidat
          </h3>
          
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">
                <User size={16} />
                Prénom
              </label>
              <p className="info-value">{volunteer.first_name}</p>
            </div>

            <div className="info-item">
              <label className="info-label">
                <User size={16} />
                Nom
              </label>
              <p className="info-value">{volunteer.last_name}</p>
            </div>

            <div className="info-item">
              <label className="info-label">
                <Mail size={16} />
                Email
              </label>
              <p className="info-value">{volunteer.email}</p>
            </div>

            <div className="info-item">
              <label className="info-label">
                <Phone size={16} />
                Téléphone
              </label>
              <p className="info-value">{volunteer.phone}</p>
            </div>

            {volunteer.city && (
              <div className="info-item">
                <label className="info-label">
                  <MapPin size={16} />
                  Ville
                </label>
                <p className="info-value">{volunteer.city}</p>
              </div>
            )}

            <div className="info-item">
              <label className="info-label">
                <MapPin size={16} />
                Pays
              </label>
              <p className="info-value">{volunteer.country || 'Congo'}</p>
            </div>

            {volunteer.address && (
              <div className="info-item full-width">
                <label className="info-label">
                  <MapPin size={16} />
                  Adresse
                </label>
                <p className="info-value">{volunteer.address}</p>
              </div>
            )}

            {volunteer.interest_domain && (
              <div className="info-item">
                <label className="info-label">
                  <FileText size={16} />
                  Domaine d'intérêt
                </label>
                <p className="info-value">{volunteer.interest_domain}</p>
              </div>
            )}

            <div className="info-item">
              <label className="info-label">
                <Clock size={16} />
                Disponibilité
              </label>
              <p className="info-value">{getAvailabilityLabel(volunteer.availability)}</p>
            </div>

            {volunteer.skills && (
              <div className="info-item full-width">
                <label className="info-label">
                  <FileText size={16} />
                  Compétences
                </label>
                <p className="info-value multiline">{volunteer.skills}</p>
              </div>
            )}

            <div className="info-item full-width">
              <label className="info-label">
                <FileText size={16} />
                Message de motivation
              </label>
              <p className="info-value multiline">{volunteer.message}</p>
            </div>

            <div className="info-item">
              <label className="info-label">
                <Clock size={16} />
                Date de candidature
              </label>
              <p className="info-value">
                {new Date(volunteer.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Section CV */}
        <div className="form-section">
          <h3 className="section-title">
            <FileText size={20} />
            Curriculum Vitae
          </h3>
          
          {volunteer.cv_path ? (
            <div className="cv-section">
              <div className="cv-info">
                <div className="cv-icon">📄</div>
                <div className="cv-details">
                  <p className="cv-name">CV - {volunteer.full_name}</p>
                  <p className="cv-meta">
                    Fichier PDF/DOC • Téléversé le {new Date(volunteer.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                className="btn-download"
                onClick={handleDownloadCV}
              >
                <Download size={18} />
                Télécharger le CV
              </button>
            </div>
          ) : (
            <div className="no-cv-section">
              <AlertCircle size={24} color="#ff9800" />
              <p>Aucun CV n'a été fourni par le candidat</p>
            </div>
          )}
        </div>

        {/* Statut de la candidature */}
        <div className="form-section">
          <h3 className="section-title">Statut de la candidature</h3>
          
          <div className="form-group">
            <label className="form-label">Statut *</label>
            <div className="status-options">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`status-option ${formData.status === option.value ? 'active' : ''}`}
                  onClick={() => handleChange('status', option.value)}
                  style={{
                    borderColor: formData.status === option.value ? option.color : '#e0e0e0',
                    backgroundColor: formData.status === option.value ? `${option.color}15` : '#fff'
                  }}
                >
                  <span className="status-icon">{option.icon}</span>
                  <span className="status-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes administrateur */}
        <div className="form-section">
          <h3 className="section-title">Notes administrateur (internes)</h3>
          
          <div className="form-group">
            <label className="form-label">
              Notes internes
              <span className="form-hint">Ces notes ne seront pas visibles par le candidat</span>
            </label>
            <textarea
              className="form-textarea"
              value={formData.admin_notes}
              onChange={(e) => handleChange('admin_notes', e.target.value)}
              placeholder="Ajoutez vos notes internes sur cette candidature..."
              rows={4}
            />
          </div>
        </div>

        {/* Message de réponse */}
        <div className="form-section">
          <h3 className="section-title">Message de réponse au candidat</h3>
          
          <div className="form-group">
            <label className="form-label">
              Message au candidat
              <span className="form-hint">Ce message sera envoyé par email au candidat lors de la mise à jour du statut</span>
            </label>
            <textarea
              className="form-textarea"
              value={formData.response_message}
              onChange={(e) => handleChange('response_message', e.target.value)}
              placeholder="Rédigez un message personnalisé pour le candidat..."
              rows={6}
            />
          </div>

          {formData.status === 'accepted' && (
            <div className="status-alert status-alert-success">
              <div className="alert-header">
                <CheckCircle size={20} />
                <strong>Candidature acceptée</strong>
              </div>
              <p>Le candidat sera informé de son acceptation par email et recevra les prochaines étapes.</p>
            </div>
          )}

          {formData.status === 'rejected' && (
            <div className="status-alert status-alert-error">
              <div className="alert-header">
                <XCircle size={20} />
                <strong>Candidature rejetée</strong>
              </div>
              <p>Le candidat sera informé avec courtoisie. Assurez-vous que le message soit respectueux.</p>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="editor-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Enregistrement...' : 'Enregistrer et notifier'}
          </button>
        </div>
      </div>

      <style>{`
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideIn 0.3s ease;
        }

        .notification-success {
          background: #e8f5e9;
          border: 1px solid #4caf50;
          color: #2e7d32;
        }

        .notification-error {
          background: #ffebee;
          border: 1px solid #f44336;
          color: #c62828;
        }

        .notification button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          margin-left: 10px;
          opacity: 0.7;
        }

        .notification button:hover {
          opacity: 1;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .info-grid {
          display: grid;
          gridTemplateColumns: repeat(2, 1fr);
          gap: 20px;
          padding: 20px;
          backgroundColor: #f8f9fa;
          borderRadius: 8px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-item.full-width {
          grid-column: 1 / -1;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 15px;
          color: #333;
          margin: 0;
          padding: 10px;
          background: white;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        }

        .info-value.multiline {
          white-space: pre-wrap;
          line-height: 1.6;
          min-height: 60px;
        }

        .cv-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px dashed #2196F3;
        }

        .cv-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cv-icon {
          font-size: 48px;
        }

        .cv-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cv-name {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          margin: 0;
        }

        .cv-meta {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        .btn-download {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #2196F3;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-download:hover {
          background: #1976D2;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
        }

        .no-cv-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          padding: 40px;
          background: #fff8e1;
          border: 2px dashed #ff9800;
          border-radius: 8px;
          text-align: center;
        }

        .no-cv-section p {
          margin: 0;
          color: #666;
          font-size: 15px;
        }

        .status-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .status-option {
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .status-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .status-option.active {
          font-weight: 600;
        }

        .status-icon {
          font-size: 24px;
        }

        .status-label {
          font-size: 15px;
        }

        .form-hint {
          display: block;
          font-size: 13px;
          color: #666;
          font-weight: normal;
          margin-top: 4px;
        }

        .status-alert {
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .status-alert-success {
          background: #e8f5e9;
          border: 1px solid #4caf50;
        }

        .status-alert-error {
          background: #ffebee;
          border: 1px solid #f44336;
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .status-alert-success .alert-header {
          color: #2e7d32;
        }

        .status-alert-error .alert-header {
          color: #c62828;
        }

        .status-alert p {
          margin: 0;
          font-size: 14px;
        }

        .status-alert-success p {
          color: #2e7d32;
        }

        .status-alert-error p {
          color: #c62828;
        }
      `}</style>
    </div>
  );
};

export default VolunteerExaminer;