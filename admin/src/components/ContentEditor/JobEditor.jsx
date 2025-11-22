import { useState } from 'react';
import { X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import './Editor.css';

const JobEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    type: item?.type || 'full-time',
    location: item?.location || '',
    description: item?.description || '',
    requirements: item?.requirements || '',
    status: item?.status || 'draft',
    deadline: item?.deadline || '',
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

    toast.success(item ? 'Offre modifiée avec succès' : 'Offre créée avec succès');
    onSave(formData);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier l\'offre' : 'Nouvelle offre d\'emploi'}</h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
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
            placeholder="Ex: Coordinateur de projet"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type de contrat</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="full-time">Temps plein</option>
              <option value="part-time">Temps partiel</option>
              <option value="contract">Contrat</option>
              <option value="internship">Stage</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Lieu</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              placeholder="Kinshasa, RDC"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date limite</label>
            <input
              type="date"
              name="deadline"
              className="form-input"
              value={formData.deadline}
              onChange={handleChange}
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
              <option value="published">Publié</option>
              <option value="archived">Fermé</option>
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
            placeholder="Description du poste"
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Exigences</label>
          <textarea
            name="requirements"
            className="form-textarea"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Compétences et qualifications requises"
            rows="6"
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

export default JobEditor;