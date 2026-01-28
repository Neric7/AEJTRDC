import { useState, useEffect } from 'react';
import { X, Save, MapPin, Plus, Minus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './Editor.css';

const InterventionZoneEditor = ({ item, onSave, onCancel, api }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    type: item?.type || 'extension',
    province: item?.province || '',
    year_established: item?.year_established || new Date().getFullYear(),
    address: item?.address || '',
    phone: item?.phone || '',
    email: item?.email || '',
    latitude: item?.latitude || '',
    longitude: item?.longitude || '',
    color: item?.color || '#2563EB',
    description: item?.description || '',
    is_active: item?.is_active !== undefined ? item.is_active : true,
    order: item?.order || 0,
  });

  const [projects, setProjects] = useState(
    item?.projects && Array.isArray(item.projects) ? item.projects : []
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const provinces = [
    'Kinshasa',
    'Kongo Central',
    'Kwango',
    'Kwilu',
    'Mai-Ndombe',
    'Kasaï',
    'Kasaï-Central',
    'Kasaï-Oriental',
    'Lomami',
    'Sankuru',
    'Maniema',
    'Sud-Kivu',
    'Nord-Kivu',
    'Ituri',
    'Haut-Uélé',
    'Tshopo',
    'Bas-Uélé',
    'Nord-Ubangi',
    'Mongala',
    'Sud-Ubangi',
    'Équateur',
    'Tshuapa',
    'Tanganyika',
    'Haut-Lomami',
    'Lualaba',
    'Haut-Katanga'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleProjectChange = (index, value) => {
    const newProjects = [...projects];
    newProjects[index] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, '']);
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.province) {
      newErrors.province = 'La province est requise';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    if (!formData.latitude || isNaN(formData.latitude)) {
      newErrors.latitude = 'Latitude invalide';
    } else if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude doit être entre -90 et 90';
    }

    if (!formData.longitude || isNaN(formData.longitude)) {
      newErrors.longitude = 'Longitude invalide';
    } else if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude doit être entre -180 et 180';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setLoading(true);

    try {
      const validProjects = projects.filter(p => p.trim() !== '');

      const dataToSend = {
        ...formData,
        projects: validProjects.length > 0 ? validProjects : null,
      };

      if (item?.id) {
        await api.update(item.id, dataToSend);
        toast.success('Zone mise à jour avec succès');
      } else {
        await api.create(dataToSend);
        toast.success('Zone créée avec succès');
      }

      onSave();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour obtenir les coordonnées via géocodage (optionnel)
  const handleGeocodeAddress = async () => {
    if (!formData.address || !formData.province) {
      toast.error('Veuillez renseigner l\'adresse et la province');
      return;
    }

    toast.info('Recherche des coordonnées...');
    
    // Note: Vous devrez implémenter le géocodage avec l'API Google Maps
    // ou une autre API de géocodage
    toast.info('Fonctionnalité de géocodage à venir');
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>
          <MapPin size={24} style={{ marginRight: '8px' }} />
          {item ? 'Modifier la zone' : 'Nouvelle zone d\'intervention'}
        </h2>
        <button className="close-btn" onClick={onCancel} type="button">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        {/* Nom et Type */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Nom de la zone <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Bukavu, Uvira, Goma..."
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Type <span className="required">*</span>
            </label>
            <select
              name="type"
              className="form-input"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="extension">Extension Locale</option>
              <option value="branch">Antenne Provinciale</option>
              <option value="headquarters">Siège National</option>
            </select>
          </div>
        </div>

        {/* Province et Année */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Province <span className="required">*</span>
            </label>
            <select
              name="province"
              className={`form-input ${errors.province ? 'error' : ''}`}
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner --</option>
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
            {errors.province && <span className="error-message">{errors.province}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Année d'installation <span className="required">*</span>
            </label>
            <input
              type="number"
              name="year_established"
              className="form-input"
              value={formData.year_established}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />
          </div>
        </div>

        {/* Adresse */}
        <div className="form-group">
          <label className="form-label">
            Adresse complète <span className="required">*</span>
          </label>
          <textarea
            name="address"
            className={`form-textarea ${errors.address ? 'error' : ''}`}
            value={formData.address}
            onChange={handleChange}
            placeholder="Ex: Avenue de la Paix, Quartier Ibanda, Bukavu"
            rows="2"
            required
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        {/* Coordonnées GPS */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Latitude <span className="required">*</span>
            </label>
            <input
              type="number"
              step="0.0000001"
              name="latitude"
              className={`form-input ${errors.latitude ? 'error' : ''}`}
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Ex: -2.5085"
              required
            />
            {errors.latitude && <span className="error-message">{errors.latitude}</span>}
            <p className="form-hint">Entre -90 et 90</p>
          </div>

          <div className="form-group">
            <label className="form-label">
              Longitude <span className="required">*</span>
            </label>
            <input
              type="number"
              step="0.0000001"
              name="longitude"
              className={`form-input ${errors.longitude ? 'error' : ''}`}
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Ex: 28.8617"
              required
            />
            {errors.longitude && <span className="error-message">{errors.longitude}</span>}
            <p className="form-hint">Entre -180 et 180</p>
          </div>
        </div>

        <p className="form-hint" style={{ marginTop: '-10px', marginBottom: '20px' }}>
          💡 Astuce : Utilisez <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps</a> pour obtenir les coordonnées GPS (clic droit sur la carte)
        </p>

        {/* Contact */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+243 XXX XXX XXX"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        {/* Couleur et Ordre */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Couleur du marqueur</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                name="color"
                className="form-input"
                value={formData.color}
                onChange={handleChange}
                placeholder="#2563EB"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Ordre d'affichage</label>
            <input
              type="number"
              name="order"
              className="form-input"
              value={formData.order}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description (optionnel)</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description supplémentaire de la zone..."
            rows="3"
          />
        </div>

        {/* Projets actifs */}
        <div className="form-group">
          <label className="form-label">Projets actifs dans cette zone</label>
          {projects.map((project, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="text"
                className="form-input"
                value={project}
                onChange={(e) => handleProjectChange(index, e.target.value)}
                placeholder={`Projet ${index + 1}`}
              />
              <button
                type="button"
                className="btn-icon btn-danger"
                onClick={() => removeProject(index)}
                title="Supprimer"
              >
                <Minus size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={addProject}
          >
            <Plus size={18} />
            Ajouter un projet
          </button>
        </div>

        {/* Statut */}
        <div className="form-group">
          <label className="form-checkbox">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span>Zone active (visible sur la carte publique)</span>
          </label>
        </div>

        {/* Actions */}
        <div className="editor-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={20} />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterventionZoneEditor;