import { useState } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { jobsAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';
import './Editor.css';

const JobEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    type: item?.type || 'CDI',
    location: item?.location || '',
    department: item?.department || '',
    description: item?.description || '',
    duration: item?.duration || '',
    deadline: item?.deadline ? new Date(item.deadline).toISOString().split('T')[0] : '',
    status: item?.status || 'draft',
    featured: item?.featured || false,
  });

  const [requirements, setRequirements] = useState(
    item?.requirements || ['']
  );

  const [responsibilities, setResponsibilities] = useState(
    item?.responsibilities || ['']
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Gestion des exigences
  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  // Gestion des responsabilités
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };

  const removeResponsibility = (index) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const updateResponsibility = (index, value) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location || !formData.department) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      // Filtrer les exigences et responsabilités vides
      const cleanRequirements = requirements.filter(r => r.trim() !== '');
      const cleanResponsibilities = responsibilities.filter(r => r.trim() !== '');

      const dataToSend = {
        ...formData,
        requirements: cleanRequirements,
        responsibilities: cleanResponsibilities,
        deadline: formData.deadline || null,
      };

      if (item?.id) {
        await jobsAPI.update(item.id, dataToSend);
        toast.success('Offre modifiée avec succès');
      } else {
        await jobsAPI.create(dataToSend);
        toast.success('Offre créée avec succès');
      }

      onSave();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier l\'offre' : 'Nouvelle offre d\'emploi'}</h2>
        <button className="close-btn" onClick={onCancel} type="button">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        {/* Titre */}
        <div className="form-group">
          <label className="form-label">
            Titre du poste <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Coordinateur de Projet"
            required
          />
        </div>

        {/* Type et Statut */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type de contrat</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Statut</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
              <option value="closed">Fermé</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>

        {/* Localisation et Département */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Localisation <span className="required">*</span>
            </label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Kinshasa"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Département <span className="required">*</span>
            </label>
            <input
              type="text"
              name="department"
              className="form-input"
              value={formData.department}
              onChange={handleChange}
              placeholder="Ex: Programmes"
              required
            />
          </div>
        </div>

        {/* Durée et Date limite */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Durée (optionnel)</label>
            <input
              type="text"
              name="duration"
              className="form-input"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ex: 6 mois, 12 mois"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date limite de candidature</label>
            <input
              type="date"
              name="deadline"
              className="form-input"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Featured */}
        <div className="form-group">
          <label className="form-checkbox">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <span>Mettre en avant cette offre</span>
          </label>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">
            Description <span className="required">*</span>
          </label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description détaillée du poste"
            rows="5"
            required
          />
        </div>

        {/* Exigences / Profil recherché */}
        <div className="form-group">
          <label className="form-label">Profil recherché / Exigences</label>
          {requirements.map((req, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="text"
                className="form-input"
                value={req}
                onChange={(e) => updateRequirement(index, e.target.value)}
                placeholder="Ex: Diplôme universitaire en gestion de projet"
              />
              <div className="dynamic-field-actions">
                <button
                  type="button"
                  className="btn-icon btn-danger"
                  onClick={() => removeRequirement(index)}
                  disabled={requirements.length === 1}
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={addRequirement}
          >
            <Plus size={18} />
            Ajouter une exigence
          </button>
        </div>

        {/* Responsabilités */}
        <div className="form-group">
          <label className="form-label">Responsabilités</label>
          {responsibilities.map((resp, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="text"
                className="form-input"
                value={resp}
                onChange={(e) => updateResponsibility(index, e.target.value)}
                placeholder="Ex: Coordonner les activités du projet"
              />
              <div className="dynamic-field-actions">
                <button
                  type="button"
                  className="btn-icon btn-danger"
                  onClick={() => removeResponsibility(index)}
                  disabled={responsibilities.length === 1}
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={addResponsibility}
          >
            <Plus size={18} />
            Ajouter une responsabilité
          </button>
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
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

export default JobEditor;