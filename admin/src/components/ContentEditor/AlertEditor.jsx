import { useState } from 'react';
import { X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import './Editor.css';

const AlertEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    priority: item?.priority || 'medium',
    location: item?.location || '',
    description: item?.description || '',
    status: item?.status || 'draft',
    type: item?.type || 'urgence',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success(item ? 'Alerte modifiée avec succès' : 'Alerte créée avec succès');
    onSave(formData);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier l\'alerte' : 'Nouvelle alerte humanitaire'}</h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label className="form-label">
            Titre de l'alerte <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre de l'alerte"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="urgence">Urgence</option>
              <option value="sanitaire">Sanitaire</option>
              <option value="securite">Sécurité</option>
              <option value="naturelle">Catastrophe naturelle</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priorité</label>
            <select
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="critical">Critique</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Lieu</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              placeholder="Zone concernée"
            />
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
              <option value="published">Active</option>
              <option value="archived">Résolue</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Description <span className="required">*</span>
          </label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description détaillée de l'alerte"
            rows="10"
            required
          />
        </div>

        <div className="editor-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={20} />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlertEditor;