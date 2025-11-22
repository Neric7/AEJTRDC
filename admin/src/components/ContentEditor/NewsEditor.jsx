import { useState, useRef } from 'react';
import { X, Save, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { newsAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';
import './Editor.css';

const NewsEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    category: item?.category || 'general',
    content: item?.content || '',
    excerpt: item?.excerpt || '',
    status: item?.status || 'draft',
    author: item?.author || '',
    tags: item?.tags ? (Array.isArray(item.tags) ? item.tags.join(', ') : item.tags) : '',
    featured: item?.featured || false,
  });

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
    
    if (!formData.title || !formData.content) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      // Préparer les données
      const dataToSend = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      };

      let savedNews;

      // Créer ou mettre à jour l'actualité
      if (item?.id) {
        const response = await newsAPI.update(item.id, dataToSend);
        savedNews = response.data;
        toast.success('Actualité modifiée avec succès');
      } else {
        const response = await newsAPI.create(dataToSend);
        savedNews = response.data;
        toast.success('Actualité créée avec succès');
      }

      // Upload des images si présentes
      if (images.length > 0) {
        await uploadImages(savedNews.id || savedNews.data?.id);
      }

      onSave();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (newsId) => {
    try {
      // Pour l'instant, on upload la première image comme image principale
      if (images.length > 0) {
        const formData = new FormData();
        formData.append('image', images[0].file);

        await newsAPI.uploadImage(newsId, formData);
        toast.success('Image uploadée avec succès');
      }
    } catch (error) {
      console.error('Erreur upload image:', error);
      toast.error('Erreur lors de l\'upload de l\'image');
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier l\'actualité' : 'Nouvelle actualité'}</h2>
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
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre de l'actualité"
            required
          />
        </div>

        {/* Catégorie et Statut */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Catégorie</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="general">Général</option>
              <option value="projet">Projet</option>
              <option value="urgence">Urgence</option>
              <option value="evenement">Événement</option>
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
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>

        {/* Auteur et Tags */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Auteur</label>
            <input
              type="text"
              name="author"
              className="form-input"
              value={formData.author}
              onChange={handleChange}
              placeholder="Nom de l'auteur"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (séparés par des virgules)</label>
            <input
              type="text"
              name="tags"
              className="form-input"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
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
            <span>Mettre en avant cette actualité</span>
          </label>
        </div>

        {/* Extrait */}
        <div className="form-group">
          <label className="form-label">Extrait</label>
          <textarea
            name="excerpt"
            className="form-textarea"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Court résumé de l'actualité (optionnel mais recommandé)"
            rows="3"
          />
        </div>

        {/* Contenu */}
        <div className="form-group">
          <label className="form-label">
            Contenu <span className="required">*</span>
          </label>
          <textarea
            name="content"
            className="form-textarea"
            value={formData.content}
            onChange={handleChange}
            placeholder="Contenu complet de l'actualité"
            rows="10"
            required
          />
        </div>

        {/* Images */}
        <div className="form-group">
          <label className="form-label">Images</label>
          
          <div className="image-upload-area">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            
            <button
              type="button"
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={20} />
              Ajouter des images
            </button>
          </div>

          {/* Preview des images existantes */}
          {imagePreview && images.length === 0 && (
            <div className="image-preview-grid">
              <div className="image-preview-item">
                <img src={imagePreview} alt="Image actuelle" />
                <p className="image-name">Image actuelle</p>
              </div>
            </div>
          )}

          {/* Preview des nouvelles images */}
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
            Formats acceptés : JPG, PNG, GIF, WebP (max 2MB par image)
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

export default NewsEditor;