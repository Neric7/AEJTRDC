import { useState, useRef, useEffect } from 'react';
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

  // État pour l'image principale
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(item?.image_url || null);
  
  // État pour la galerie
  const [galleryImages, setGalleryImages] = useState([]);
  const [existingGallery, setExistingGallery] = useState(item?.images_urls || []);
  
  const [loading, setLoading] = useState(false);
  const mainImageInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Gestion image principale
  const handleMainImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const removeMainImage = () => {
    if (mainImage && mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImage(null);
    setMainImagePreview(item?.image_url || null);
  };

  // Gestion galerie
  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      isNew: true
    }));

    setGalleryImages(prev => [...prev, ...newImages]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const removeExistingGalleryImage = async (imagePath, index) => {
    if (!item?.id) {
      // Juste retirer de l'état si pas encore sauvegardé
      setExistingGallery(prev => prev.filter((_, i) => i !== index));
      return;
    }

    if (!confirm('Voulez-vous vraiment supprimer cette image de la galerie ?')) {
      return;
    }

    try {
      await newsAPI.deleteGalleryImage(item.id, imagePath);
      setExistingGallery(prev => prev.filter((_, i) => i !== index));
      toast.success('Image supprimée de la galerie');
    } catch (error) {
      console.error('Erreur suppression image galerie:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      // 1. Créer/Mettre à jour l'actualité
      const dataToSend = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      };

      let savedNews;
      if (item?.id) {
        const response = await newsAPI.update(item.id, dataToSend);
        savedNews = response.data;
        toast.success('Actualité modifiée');
      } else {
        const response = await newsAPI.create(dataToSend);
        savedNews = response.data;
        toast.success('Actualité créée');
      }

      const newsId = savedNews.id || savedNews.data?.id;

      // 2. Upload image principale si présente
      if (mainImage) {
        const mainFormData = new FormData();
        mainFormData.append('image', mainImage);
        await newsAPI.uploadImage(newsId, mainFormData);
        toast.success('Image principale uploadée');
      }

      // 3. Upload galerie si présente
      if (galleryImages.length > 0) {
        const galleryFormData = new FormData();
        galleryImages.forEach(img => {
          galleryFormData.append('images[]', img.file);
        });
        await newsAPI.uploadGallery(newsId, galleryFormData);
        toast.success(`${galleryImages.length} image(s) ajoutée(s) à la galerie`);
      }

      onSave();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      if (mainImage && mainImagePreview && mainImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mainImagePreview);
      }
      galleryImages.forEach(img => {
        if (img.preview.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []);

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
            placeholder="Court résumé (recommandé)"
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

        {/* IMAGE PRINCIPALE */}
        <div className="form-group">
          <label className="form-label">Image Principale</label>
          
          <div className="image-upload-area">
            <input
              ref={mainImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleMainImageSelect}
              style={{ display: 'none' }}
            />
            
            <button
              type="button"
              className="upload-btn"
              onClick={() => mainImageInputRef.current?.click()}
            >
              <Upload size={20} />
              {mainImagePreview ? 'Changer l\'image principale' : 'Ajouter une image principale'}
            </button>
          </div>

          {mainImagePreview && (
            <div className="image-preview-grid">
              <div className="image-preview-item">
                <img src={mainImagePreview} alt="Image principale" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeMainImage}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
                <p className="image-name">
                  {mainImage ? mainImage.name : 'Image actuelle'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* GALERIE PHOTOS */}
        <div className="form-group">
          <label className="form-label">Galerie Photos</label>
          
          <div className="image-upload-area">
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGallerySelect}
              style={{ display: 'none' }}
            />
            
            <button
              type="button"
              className="upload-btn"
              onClick={() => galleryInputRef.current?.click()}
            >
              <Upload size={20} />
              Ajouter des photos à la galerie
            </button>
          </div>

          {/* Images existantes de la galerie */}
          {existingGallery.length > 0 && (
            <>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                Images existantes ({existingGallery.length})
              </h4>
              <div className="image-preview-grid">
                {existingGallery.map((imageUrl, index) => (
                  <div key={`existing-${index}`} className="image-preview-item">
                    <img src={imageUrl} alt={`Galerie ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        // Extraire le path de l'URL
                        const path = imageUrl.split('/storage/')[1];
                        removeExistingGalleryImage(path, index);
                      }}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                    <p className="image-name">Image {index + 1}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Nouvelles images à ajouter */}
          {galleryImages.length > 0 && (
            <>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                Nouvelles images ({galleryImages.length})
              </h4>
              <div className="image-preview-grid">
                {galleryImages.map((img, index) => (
                  <div key={`new-${index}`} className="image-preview-item">
                    <img src={img.preview} alt={img.name} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeGalleryImage(index)}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                    <p className="image-name">{img.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="form-hint">
            <ImageIcon size={16} />
            Formats acceptés : JPG, PNG, GIF, WebP (max 2MB par image, max 10 images)
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