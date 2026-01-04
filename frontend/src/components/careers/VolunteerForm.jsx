import { useState } from 'react';
import axios from 'axios';
import './VolunteerForm.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL + '/api' || 'http://localhost:8000/api';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Congo',
    interest_domain: '',
    skills: '',
    availability: 'flexible',
    message: '',
  });

  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const availabilityOptions = [
    { value: 'full_time', label: 'Temps plein' },
    { value: 'part_time', label: 'Temps partiel' },
    { value: 'weekends', label: 'Week-ends uniquement' },
    { value: 'flexible', label: 'Flexible' },
  ];

  const interestDomains = [
    'Santé',
    'Éducation',
    'Eau et Assainissement',
    'Sécurité Alimentaire',
    'Protection de l\'Enfance',
    'Droits Humains',
    'Environnement',
    'Communication',
    'Administration',
    'Logistique',
    'Autre',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validation du fichier
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, cv: 'Le CV doit être au format PDF, DOC ou DOCX' }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, cv: 'Le CV ne doit pas dépasser 5MB' }));
        return;
      }

      setCvFile(file);
      setErrors(prev => ({ ...prev, cv: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      
      // Ajouter tous les champs
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Ajouter le CV si présent
      if (cvFile) {
        formDataToSend.append('cv', cvFile);
      }

      const response = await axios.post(`${API_URL}/volunteers`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      // Réinitialiser le formulaire
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'Congo',
        interest_domain: '',
        skills: '',
        availability: 'flexible',
        message: '',
      });
      setCvFile(null);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Erreur:', error);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ 
          general: error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="volunteer-success">
        <div className="success-icon">✓</div>
        <h2>Candidature envoyée avec succès !</h2>
        <p>Merci pour votre intérêt à rejoindre notre équipe de bénévoles.</p>
        <p>Nous examinerons votre candidature et vous contacterons dans les plus brefs délais.</p>
        <button 
          className="btn-primary"
          onClick={() => setSuccess(false)}
        >
          Envoyer une autre candidature
        </button>
      </div>
    );
  }

  return (
    <div className="volunteer-form-container">
      <div className="volunteer-form-header">
        <h2>Devenir Bénévole</h2>
        <p>Rejoignez notre équipe et faites la différence dans la vie de ceux qui en ont besoin</p>
      </div>

      {errors.general && (
        <div className="alert alert-error">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="volunteer-form">
        {/* Informations personnelles */}
        <div className="form-section">
          <h3>Informations personnelles</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">Prénom *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className={errors.first_name ? 'error' : ''}
              />
              {errors.first_name && <span className="error-message">{errors.first_name[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Nom *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className={errors.last_name ? 'error' : ''}
              />
              {errors.last_name && <span className="error-message">{errors.last_name[0]}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+243 XXX XXX XXX"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone[0]}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Kinshasa, Lubumbashi..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Pays</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse complète</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              placeholder="Votre adresse complète"
            />
          </div>
        </div>

        {/* Compétences et disponibilité */}
        <div className="form-section">
          <h3>Compétences et Disponibilité</h3>

          <div className="form-group">
            <label htmlFor="interest_domain">Domaine d'intérêt</label>
            <select
              id="interest_domain"
              name="interest_domain"
              value={formData.interest_domain}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un domaine</option>
              {interestDomains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Vos compétences</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              placeholder="Décrivez vos compétences, formations, expériences pertinentes..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="availability">Disponibilité *</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              {availabilityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cv">CV (PDF, DOC, DOCX - Max 5MB)</label>
            <input
              type="file"
              id="cv"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className={errors.cv ? 'error' : ''}
            />
            {cvFile && <span className="file-name">📄 {cvFile.name}</span>}
            {errors.cv && <span className="error-message">{errors.cv}</span>}
          </div>
        </div>

        {/* Message de motivation */}
        <div className="form-section">
          <h3>Message de motivation</h3>
          
          <div className="form-group">
            <label htmlFor="message">Pourquoi souhaitez-vous devenir bénévole ? *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
              placeholder="Parlez-nous de vos motivations... (minimum 50 caractères)"
              className={errors.message ? 'error' : ''}
            />
            <span className="char-count">{formData.message.length} / 50 minimum</span>
            {errors.message && <span className="error-message">{errors.message[0]}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;