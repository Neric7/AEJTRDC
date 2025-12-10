import { useState, useRef } from 'react';
import { X, Save, Upload, Image as ImageIcon, Trash2, Plus, Minus } from 'lucide-react';
import { domainsAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';
import './Editor.css';

const DomainEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: item?.titre || '',
    slug: item?.slug || '',
    description_courte: item?.description_courte || '',
    icon: item?.icon || '',
    ordre: item?.ordre || 0,
    actif: item?.actif !== undefined ? item.actif : true,
  });

  const [contenu, setContenu] = useState(
    item?.contenu && Array.isArray(item.contenu) 
      ? item.contenu 
      : ['']
  );

  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(item?.image || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Gérer le slug automatique
  const handleTitreChange = (e) => {
    const titre = e.target.value;
    setFormData({
      ...formData,
      titre,
      slug: titre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    });
  };

  // Gérer les contenus (paragraphes)
  const handleContenuChange = (index, value) => {
    const newContenu = [...contenu];
    newContenu[index] = value;
    setContenu(newContenu);
  };

  const addContenu = () => {
    setContenu([...contenu, '']);
  };

  const removeContenu = (index) => {
    if (contenu.length > 1) {
      const newContenu = contenu.filter((_, i) => i !== index);
      setContenu(newContenu);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Créer des previews
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.description_courte) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Valider les contenus
    const validContenu = contenu.filter(c => c.trim() !== '');

    if (validContenu.length === 0) {
      toast.error('Veuillez ajouter au moins un paragraphe de contenu');
      return;
    }

    setLoading(true);

    try {
      // Préparer FormData pour l'envoi avec image
      const formDataToSend = new FormData();
      formDataToSend.append('titre', formData.titre);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('description_courte', formData.description_courte);
      formDataToSend.append('icon', formData.icon);
      formDataToSend.append('ordre', formData.ordre);
      formDataToSend.append('actif', formData.actif ? '1' : '0');

      // Ajouter les contenus
      validContenu.forEach((c, index) => {
        formDataToSend.append(`contenu[${index}]`, c);
      });

      // Ajouter l'image si présente
      if (images.length > 0) {
        formDataToSend.append('image', images[0].file);
      }

      let response;

      // Créer ou mettre à jour le domaine
      if (item?.id) {
        response = await domainsAPI.update(item.id, formDataToSend);
        toast.success('Domaine modifié avec succès');
      } else {
        response = await domainsAPI.create(formDataToSend);
        toast.success('Domaine créé avec succès');
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
        <h2>{item ? 'Modifier le domaine' : 'Nouveau domaine'}</h2>
        <button className="close-btn" onClick={onCancel} type="button">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        {/* Titre */}
        <div className="form-group">
          <label className="form-label">
            Titre <span className="required">*</span>
          </label>
          <input
            type="text"
            name="titre"
            className="form-input"
            value={formData.titre}
            onChange={handleTitreChange}
            placeholder="Ex: Éducation, Santé, Agriculture..."
            required
          />
        </div>

        {/* Slug */}
        <div className="form-group">
          <label className="form-label">
            Slug <span className="form-hint">(généré automatiquement)</span>
          </label>
          <input
            type="text"
            name="slug"
            className="form-input"
            value={formData.slug}
            onChange={handleChange}
            placeholder="education, sante, agriculture..."
          />
        </div>

        {/* Icon et Ordre */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Icône</label>
            <input
              type="text"
              name="icon"
              className="form-input"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Ex: BookOpen, Heart, Sprout..."
            />
            <p className="form-hint">
              Nom de l'icône Lucide React (ex: BookOpen, Heart, Sprout)
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Ordre d'affichage</label>
            <input
              type="number"
              name="ordre"
              className="form-input"
              value={formData.ordre}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        {/* Actif */}
        <div className="form-group">
          <label className="form-checkbox">
            <input
              type="checkbox"
              name="actif"
              checked={formData.actif}
              onChange={handleChange}
            />
            <span>Domaine actif (visible sur le site)</span>
          </label>
        </div>

        {/* Description courte */}
        <div className="form-group">
          <label className="form-label">
            Description courte <span className="required">*</span>
          </label>
          <textarea
            name="description_courte"
            className="form-textarea"
            value={formData.description_courte}
            onChange={handleChange}
            placeholder="Résumé du domaine d'intervention (2-3 phrases)"
            rows="3"
            required
          />
        </div>

        {/* Contenu (paragraphes) */}
        <div className="form-group">
          <label className="form-label">
            Contenu détaillé <span className="required">*</span>
          </label>
          {contenu.map((para, index) => (
            <div key={index} className="dynamic-field">
              <textarea
                className="form-textarea"
                value={para}
                onChange={(e) => handleContenuChange(index, e.target.value)}
                placeholder={`Paragraphe ${index + 1}`}
                rows="4"
              />
              <div className="dynamic-field-actions">
                {contenu.length > 1 && (
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => removeContenu(index)}
                    title="Supprimer"
                  >
                    <Minus size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={addContenu}
          >
            <Plus size={18} />
            Ajouter un paragraphe
          </button>
        </div>

        {/* Image */}
        <div className="form-group">
          <label className="form-label">Image du domaine</label>
          
          <div className="image-upload-area">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            
            <button
              type="button"
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={20} />
              Ajouter une image
            </button>
          </div>

          {/* Preview de l'image existante */}
          {imagePreview && images.length === 0 && (
            <div className="image-preview-grid">
              <div className="image-preview-item">
                <img src={imagePreview} alt="Image actuelle" />
                <p className="image-name">Image actuelle</p>
              </div>
            </div>
          )}

          {/* Preview de la nouvelle image */}
          {images.length > 0 && (
            <div className="image-preview-grid">
              {images.map((img, index) => (
                <div key={index} className="image-preview-item">
                  <img src={img.preview} alt={img.name} />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                  <p className="image-name">{img.name}</p>
                </div>
              ))}
            </div>
          )}

          <p className="form-hint">
            <ImageIcon size={16} />
            Formats acceptés : JPG, PNG, WebP (max 5MB)
          </p>
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

export default DomainEditor;