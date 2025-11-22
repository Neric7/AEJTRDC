import { useState } from 'react';
import { X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import './Editor.css';

const ProjectEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    location: item?.location || '',
    description: item?.description || '',
    budget: item?.budget || '',
    status: item?.status || 'draft',
    startDate: item?.startDate || '',
    endDate: item?.endDate || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success(item ? 'Projet modifié avec succès' : 'Projet créé avec succès');
    onSave(formData);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier le projet' : 'Nouveau projet'}</h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label className="form-label">
            Titre du projet <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre du projet"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Lieu <span className="required">*</span>
            </label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ville, Province"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Budget (€)</label>
            <input
              type="number"
              name="budget"
              className="form-input"
              value={formData.budget}
              onChange={handleChange}
              placeholder="10000"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date de début</label>
            <input
              type="date"
              name="startDate"
              className="form-input"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date de fin</label>
            <input
              type="date"
              name="endDate"
              className="form-input"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
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
            <option value="published">En cours</option>
            <option value="archived">Terminé</option>
          </select>
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
            placeholder="Description complète du projet"
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

export default ProjectEditor;