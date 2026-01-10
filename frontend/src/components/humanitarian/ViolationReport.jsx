// ============================================
// FRONTEND PUBLIC - Formulaire de signalement
// Chemin: frontend/src/components/humanitarian/ViolationReportForm.jsx
// ============================================

import React, { useState } from 'react';
import { AlertTriangle, Send, CheckCircle, Shield, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import humanitarianService from '../../services/humanitarian';
import './ViolationReport.css';

const ViolationReport = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const [formData, setFormData] = useState({
    category: 'safeguarding',
    title: '',
    description: '',
    reporter_type: 'anonymous',
    reporter_info: '',
    location: '',
    incident_date: '',
    priority: 'medium'
  });

  const categories = [
    { value: 'safeguarding', label: 'Protection de l\'enfance / Safeguarding', icon: '🛡️' },
    { value: 'corruption', label: 'Corruption / Détournement de fonds', icon: '💰' },
    { value: 'discrimination', label: 'Discrimination', icon: '⚖️' },
    { value: 'harassment', label: 'Harcèlement (sexuel, moral)', icon: '⚠️' },
    { value: 'fraud', label: 'Fraude / Falsification', icon: '📋' },
    { value: 'misconduct', label: 'Mauvaise conduite professionnelle', icon: '❌' },
    { value: 'other', label: 'Autre violation', icon: '📢' }
  ];

  const reporterTypes = [
    { value: 'anonymous', label: 'Anonyme (identité protégée)' },
    { value: 'staff', label: 'Membre du personnel' },
    { value: 'beneficiary', label: 'Bénéficiaire' },
    { value: 'partner', label: 'Partenaire' },
    { value: 'other', label: 'Autre' }
  ];

  const priorities = [
    { value: 'low', label: 'Basse', description: 'Situation non urgente' },
    { value: 'medium', label: 'Moyenne', description: 'Nécessite attention' },
    { value: 'high', label: 'Haute', description: 'Situation préoccupante' },
    { value: 'urgent', label: 'Urgente', description: 'Danger immédiat' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.incident_date) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      const response = await humanitarianService.submitViolationReport(formData);
      
      setReference(response.data.reference);
      setSubmitted(true);
      toast.success('Signalement enregistré avec succès !');
      
      // Reset form
      setFormData({
        category: 'safeguarding',
        title: '',
        description: '',
        reporter_type: 'anonymous',
        reporter_info: '',
        location: '',
        incident_date: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi du signalement');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="violation-form-container">
        <div className="success-message">
          <CheckCircle size={64} className="success-icon" />
          <h2>Signalement enregistré</h2>
          <p>Votre signalement a été enregistré avec succès.</p>
          <div className="reference-box">
            <strong>Référence :</strong> <code>{reference}</code>
          </div>
          <p className="info-text">
            Conservez cette référence pour suivre votre signalement. 
            Notre équipe traitera votre demande en toute confidentialité.
          </p>
          <button 
            className="btn-primary"
            onClick={() => setSubmitted(false)}
          >
            Nouveau signalement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="violation-form-container">
      <div className="form-header">
        <div className="header-icon">
          <AlertTriangle size={40} />
        </div>
        <h2>Signaler une violation</h2>
        <p className="subtitle">
          Ce formulaire confidentiel permet de signaler tout comportement contraire 
          aux principes éthiques et humanitaires de l'organisation.
        </p>
        
        <div className="confidentiality-notice">
          <Lock size={20} />
          <span>
            <strong>Confidentialité garantie :</strong> Votre signalement sera traité 
            avec la plus stricte confidentialité. Les signalements anonymes sont acceptés.
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="violation-form">
        {/* Catégorie */}
        <div className="form-section">
          <h3>Type de violation</h3>
          <div className="radio-group">
            {categories.map((cat) => (
              <label key={cat.value} className="radio-card">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={formData.category === cat.value}
                  onChange={handleChange}
                />
                <span className="radio-content">
                  <span className="radio-icon">{cat.icon}</span>
                  <span className="radio-label">{cat.label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Titre */}
        <div className="form-group">
          <label htmlFor="title">
            Titre du signalement <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Suspicion d'abus sur mineur"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">
            Description détaillée <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            placeholder="Décrivez les faits de manière détaillée : qui, quoi, quand, où, comment..."
            required
          />
          <small>Soyez aussi précis que possible pour faciliter l'investigation</small>
        </div>

        {/* Lieu et Date */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">
              Lieu de l'incident <span className="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Bureau de Kinshasa, Quartier Lemba"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="incident_date">
              Date de l'incident <span className="required">*</span>
            </label>
            <input
              type="date"
              id="incident_date"
              name="incident_date"
              value={formData.incident_date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        {/* Type de rapporteur */}
        <div className="form-group">
          <label htmlFor="reporter_type">
            Vous êtes <span className="required">*</span>
          </label>
          <select
            id="reporter_type"
            name="reporter_type"
            value={formData.reporter_type}
            onChange={handleChange}
            required
          >
            {reporterTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Informations rapporteur (optionnel) */}
        {formData.reporter_type !== 'anonymous' && (
          <div className="form-group">
            <label htmlFor="reporter_info">
              Vos coordonnées (optionnel)
            </label>
            <input
              type="text"
              id="reporter_info"
              name="reporter_info"
              value={formData.reporter_info}
              onChange={handleChange}
              placeholder="Nom, email, téléphone (pour vous contacter si nécessaire)"
            />
            <small>
              <Lock size={14} /> Ces informations restent confidentielles
            </small>
          </div>
        )}

        {/* Priorité */}
        <div className="form-section">
          <h3>Niveau d'urgence</h3>
          <div className="priority-group">
            {priorities.map((priority) => (
              <label key={priority.value} className="priority-card">
                <input
                  type="radio"
                  name="priority"
                  value={priority.value}
                  checked={formData.priority === priority.value}
                  onChange={handleChange}
                />
                <span className="priority-content">
                  <span className={`priority-label ${priority.value}`}>
                    {priority.label}
                  </span>
                  <span className="priority-desc">{priority.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Avertissement légal */}
        <div className="legal-notice">
          <Shield size={20} />
          <p>
            En soumettant ce formulaire, vous confirmez que les informations fournies 
            sont exactes et véridiques. Les fausses accusations peuvent avoir des 
            conséquences graves. Votre signalement sera traité avec sérieux et confidentialité.
          </p>
        </div>

        {/* Bouton submit */}
        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Envoi en cours...
            </>
          ) : (
            <>
              <Send size={20} />
              Envoyer le signalement
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ViolationReport;