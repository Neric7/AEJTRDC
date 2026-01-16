import { useState, useEffect } from 'react';
import api from '../../services/api';
import './VolunteerForm.css';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',    // ✅ Changé de full_name
    last_name: '',     // ✅ Ajouté
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
  const [userData, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await api.get('/user');
      const userData = response.data;
      setUser(userData);
      
      // Pré-remplir le formulaire avec les données de l'utilisateur
      // ✅ Séparer le nom complet en prénom et nom
      const fullName = userData.user.name || '';
      const nameParts = fullName.trim().split(' ');
      
      setFormData(prev => ({
        ...prev,
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        email: userData.user.email || '',
        phone: userData.user.phone || '',
      }));
      
      console.log("formdata", userData.user);
    } catch (error) {
      console.error('Erreur chargement utilisateur:', error);
    }
  };

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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024;

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
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (cvFile) {
        formDataToSend.append('cv', cvFile);
      }

      // ✅ Changé de /volunteers à /user/volunteers
      await api.post('/user/volunteers', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Erreur:', error);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ 
          general: error.response?.data?.message || 'Une erreur est survenue.' 
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
        <div className="success-actions">
          <button 
            className="btn-primary"
            onClick={() => window.location.href = '/my-applications'}
          >
            📋 Voir mes candidatures
          </button>
          <button 
            className="btn-secondary"
            onClick={() => window.location.reload()}
          >
            ➕ Nouvelle candidature
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="volunteer-form-container">
      <div className="volunteer-form-header">
        <h2>Devenir Bénévole</h2>
        <p>Rejoignez notre équipe et faites la différence</p>
      </div>

      {errors.general && (
        <div className="alert alert-error">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="volunteer-form">
        <div className="form-section">
          <h3>Informations personnelles</h3>
          
          {/* ✅ Deux champs séparés au lieu d'un seul full_name */}
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
              />
              {errors.first_name && (
                <span className="error-message">{errors.first_name}</span>
              )}
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
              />
              {errors.last_name && (
                <span className="error-message">{errors.last_name}</span>
              )}
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
                disabled
                className="disabled-field"
                title="L'email est celui de votre compte et ne peut pas être modifié"
              />
              <span className="info-text">
                ℹ️ L'email de votre compte (non modifiable)
              </span>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
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
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
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
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Compétences et Disponibilité</h3>

          <div className="form-group">
            <label htmlFor="interest_domain">Domaine d'intérêt *</label>
            <select
              id="interest_domain"
              name="interest_domain"
              value={formData.interest_domain}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un domaine</option>
              {interestDomains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            {errors.interest_domain && (
              <span className="error-message">{errors.interest_domain}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="skills">Vos compétences</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              placeholder="Décrivez vos compétences..."
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
            />
            {cvFile && <span className="file-name">📄 {cvFile.name}</span>}
            {errors.cv && <span className="error-message">{errors.cv}</span>}
          </div>
        </div>

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
            />
            <span className={`char-count ${formData.message.length < 50 ? 'text-red' : 'text-green'}`}>
              {formData.message.length} / 50 minimum
            </span>
            {errors.message && (
              <span className="error-message">{errors.message}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading || formData.message.length < 50}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;