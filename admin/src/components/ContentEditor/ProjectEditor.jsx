import { useState, useRef, useEffect } from 'react';
import { X, Save, Upload, Image as ImageIcon, Trash2, Plus, Minus } from 'lucide-react';
import { projectsAPI, domainsAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';
import './Editor.css';

const ProjectEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    excerpt: item?.excerpt || '',
    objective: item?.objective || '',
    execution_zone: item?.execution_zone || '',
    start_date: item?.start_date || '',
    end_date: item?.end_date || '',
    status: item?.status || 'planning',
    domain_id: item?.domain_id || '',
    budget: item?.budget || '',
    beneficiaries_count: item?.beneficiaries_count || 0,
    featured: item?.featured || false,
    partners: item?.partners ? (Array.isArray(item.partners) ? item.partners.join(', ') : item.partners) : '',
  });

  const [results, setResults] = useState(item?.results || ['']);
  const [indicators, setIndicators] = useState(item?.indicators || [{ label: '', value: '', unit: '' }]);
  const [testimonials, setTestimonials] = useState(item?.testimonials || []);
  const [domains, setDomains] = useState([]);
  
  // IMAGE PRINCIPALE
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(item?.image_url || null);
  const mainImageInputRef = useRef(null);

  // GALERIE D'IMAGES
  const [galleryImages, setGalleryImages] = useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState(item?.images_urls || []);
  const galleryInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // Charger les domaines
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await domainsAPI.getAll();
        setDomains(response.data.data || response.data);
      } catch (error) {
        console.error('Erreur chargement domaines:', error);
        toast.error('Erreur lors du chargement des domaines');
      }
    };
    fetchDomains();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // ==================== RÉSULTATS ====================
  const addResult = () => {
    setResults([...results, '']);
  };

  const removeResult = (index) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const updateResult = (index, value) => {
    const newResults = [...results];
    newResults[index] = value;
    setResults(newResults);
  };

  // ==================== INDICATEURS ====================
  const addIndicator = () => {
    setIndicators([...indicators, { label: '', value: '', unit: '' }]);
  };

  const removeIndicator = (index) => {
    setIndicators(indicators.filter((_, i) => i !== index));
  };

  const updateIndicator = (index, field, value) => {
    const newIndicators = [...indicators];
    newIndicators[index][field] = value;
    setIndicators(newIndicators);
  };

  // ==================== TÉMOIGNAGES ====================
  const addTestimonial = () => {
    setTestimonials([...testimonials, { name: '', role: '', message: '', photo: '' }]);
  };

  const removeTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
    setTestimonials(newTestimonials);
  };

  // ==================== IMAGE PRINCIPALE ====================
  const handleMainImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 2 Mo');
      return;
    }

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  // ==================== GALERIE D'IMAGES ====================
  const handleGalleryImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Vérifier la taille de chaque fichier
    const invalidFiles = files.filter(file => file.size > 2 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error(`${invalidFiles.length} image(s) dépassent 2 Mo et seront ignorées`);
    }

    const validFiles = files.filter(file => file.size <= 2 * 1024 * 1024);

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
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

  const removeExistingGalleryImage = async (index) => {
    if (!item?.id) {
      // Si c'est un nouveau projet, juste retirer de l'état
      setExistingGalleryImages(prev => prev.filter((_, i) => i !== index));
      return;
    }

    // Confirmer la suppression
    if (!window.confirm('Voulez-vous vraiment supprimer cette image ?')) {
      return;
    }

    try {
      const imageUrl = existingGalleryImages[index];
      
      // Extraire le chemin relatif de l'URL
      // Ex: http://localhost:8000/storage/projects/image.jpg → projects/image.jpg
      const imagePath = imageUrl.includes('/storage/')
        ? imageUrl.split('/storage/')[1]
        : imageUrl;

      // Appeler l'API pour supprimer l'image
      await projectsAPI.deleteGalleryImage(item.id, imagePath);
      
      // Retirer l'image de l'état
      setExistingGalleryImages(prev => prev.filter((_, i) => i !== index));
      
      toast.success('Image supprimée avec succès');
    } catch (error) {
      console.error('Erreur suppression image:', error);
      toast.error('Erreur lors de la suppression de l\'image');
    }
  };

  // ==================== SOUMISSION ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.objective || !formData.execution_zone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      // Préparer les données
      const dataToSend = {
        ...formData,
        partners: formData.partners ? formData.partners.split(',').map(p => p.trim()) : [],
        results: results.filter(r => r.trim() !== ''),
        indicators: indicators.filter(ind => ind.label && ind.value),
        testimonials: testimonials.filter(t => t.name && t.message),
        budget: parseFloat(formData.budget) || 0,
        beneficiaries_count: parseInt(formData.beneficiaries_count) || 0,
      };

      let savedProject;

      // Créer ou mettre à jour le projet
      if (item?.id) {
        const response = await projectsAPI.update(item.id, dataToSend);
        savedProject = response.data;
        toast.success('Projet modifié avec succès');
      } else {
        const response = await projectsAPI.create(dataToSend);
        savedProject = response.data;
        toast.success('Projet créé avec succès');
      }

      const projectId = savedProject.id || savedProject.data?.id;

      // Upload de l'image principale si présente
      if (mainImage) {
        await uploadMainImage(projectId);
      }

      // Upload des images de la galerie si présentes
      if (galleryImages.length > 0) {
        await uploadGalleryImages(projectId);
      }

      onSave();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const uploadMainImage = async (projectId) => {
    try {
      const formData = new FormData();
      formData.append('image', mainImage);

      await projectsAPI.uploadImage(projectId, formData);
      toast.success('Image principale uploadée');
    } catch (error) {
      console.error('Erreur upload image principale:', error);
      toast.error('Erreur lors de l\'upload de l\'image principale');
    }
  };

  const uploadGalleryImages = async (projectId) => {
    try {
      const formData = new FormData();
      galleryImages.forEach((img) => {
        formData.append('images[]', img.file);
      });

      await projectsAPI.uploadImages(projectId, formData);
      toast.success(`${galleryImages.length} image(s) de galerie uploadées`);
    } catch (error) {
      console.error('Erreur upload galerie:', error);
      toast.error('Erreur lors de l\'upload des images de galerie');
    }
  };

  const statusOptions = [
    { value: 'planning', label: 'En planification' },
    { value: 'ongoing', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'suspended', label: 'Suspendu' },
  ];

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier le projet' : 'Nouveau projet'}</h2>
        <button className="close-btn" onClick={onCancel} type="button">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        {/* ========== INFORMATIONS DE BASE ========== */}
        <div className="form-section">
          <h3 className="section-title">Informations de base</h3>
          
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
              placeholder="Ex: Programme d'éducation accélérée dans le Nord-Kivu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Extrait</label>
            <textarea
              name="excerpt"
              className="form-textarea"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Résumé court du projet (recommandé)"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Objectif du projet <span className="required">*</span>
            </label>
            <textarea
              name="objective"
              className="form-textarea"
              value={formData.objective}
              onChange={handleChange}
              placeholder="Décrivez l'objectif principal du projet"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Zone d'exécution <span className="required">*</span>
            </label>
            <input
              type="text"
              name="execution_zone"
              className="form-input"
              value={formData.execution_zone}
              onChange={handleChange}
              placeholder="Ex: Nord-Kivu (Goma, Rutshuru, Masisi)"
              required
            />
          </div>
        </div>

        {/* ========== DATES ET STATUT ========== */}
        <div className="form-section">
          <h3 className="section-title">Période et statut</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date de début</label>
              <input
                type="date"
                name="start_date"
                className="form-input"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date de fin</label>
              <input
                type="date"
                name="end_date"
                className="form-input"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Statut</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Domaine d'intervention</label>
              <select
                name="domain_id"
                className="form-select"
                value={formData.domain_id}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner un domaine --</option>
                {domains.map(domain => (
                  <option key={domain.id} value={domain.id}>
                    {domain.titre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ========== BUDGET ET BÉNÉFICIAIRES ========== */}
        <div className="form-section">
          <h3 className="section-title">Budget et bénéficiaires</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Budget (USD)</label>
              <input
                type="number"
                name="budget"
                className="form-input"
                value={formData.budget}
                onChange={handleChange}
                placeholder="180000"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nombre de bénéficiaires</label>
              <input
                type="number"
                name="beneficiaries_count"
                className="form-input"
                value={formData.beneficiaries_count}
                onChange={handleChange}
                placeholder="1500"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Partenaires (séparés par des virgules)</label>
            <input
              type="text"
              name="partners"
              className="form-input"
              value={formData.partners}
              onChange={handleChange}
              placeholder="UNICEF, Save the Children, Ministère de l'EPST"
            />
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span>Mettre ce projet en avant</span>
            </label>
          </div>
        </div>

        {/* ========== RÉSULTATS ========== */}
        <div className="form-section">
          <h3 className="section-title">Résultats obtenus</h3>
          
          {results.map((result, index) => (
            <div key={index} className="form-group-with-action">
              <input
                type="text"
                className="form-input"
                value={result}
                onChange={(e) => updateResult(index, e.target.value)}
                placeholder="Ex: 1245 enfants réinscrits dans le programme"
              />
              <button
                type="button"
                className="btn-icon btn-danger"
                onClick={() => removeResult(index)}
                title="Supprimer"
              >
                <Minus size={18} />
              </button>
            </div>
          ))}
          
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addResult}
          >
            <Plus size={18} />
            Ajouter un résultat
          </button>
        </div>

        {/* ========== INDICATEURS ========== */}
        <div className="form-section">
          <h3 className="section-title">Indicateurs</h3>
          
          {indicators.map((indicator, index) => (
            <div key={index} className="indicator-group">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    value={indicator.label}
                    onChange={(e) => updateIndicator(index, 'label', e.target.value)}
                    placeholder="Label (ex: Enfants bénéficiaires)"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    value={indicator.value}
                    onChange={(e) => updateIndicator(index, 'value', e.target.value)}
                    placeholder="Valeur (ex: 1245)"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    value={indicator.unit}
                    onChange={(e) => updateIndicator(index, 'unit', e.target.value)}
                    placeholder="Unité (ex: enfants)"
                  />
                </div>
                <button
                  type="button"
                  className="btn-icon btn-danger"
                  onClick={() => removeIndicator(index)}
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addIndicator}
          >
            <Plus size={18} />
            Ajouter un indicateur
          </button>
        </div>

        {/* ========== TÉMOIGNAGES ========== */}
        <div className="form-section">
          <h3 className="section-title">Témoignages</h3>
          
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-group">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                    placeholder="Nom"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    value={testimonial.role}
                    onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                    placeholder="Rôle (ex: Mère d'élève, Goma)"
                  />
                </div>
              </div>
              <textarea
                className="form-textarea"
                value={testimonial.message}
                onChange={(e) => updateTestimonial(index, 'message', e.target.value)}
                placeholder="Témoignage"
                rows="3"
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeTestimonial(index)}
              >
                <Trash2 size={16} />
                Supprimer le témoignage
              </button>
            </div>
          ))}
          
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addTestimonial}
          >
            <Plus size={18} />
            Ajouter un témoignage
          </button>
        </div>

        {/* ========== IMAGE PRINCIPALE ========== */}
        <div className="form-section">
          <h3 className="section-title">Image principale</h3>
          
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
              {mainImagePreview ? 'Remplacer l\'image principale' : 'Ajouter une image principale'}
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
                <p className="image-name">Image principale</p>
              </div>
            </div>
          )}

          <p className="form-hint">
            <ImageIcon size={16} />
            Formats acceptés : JPG, PNG, WebP (max 2MB)
          </p>
        </div>

        {/* ========== GALERIE D'IMAGES ========== */}
        <div className="form-section">
          <h3 className="section-title">Galerie d'images</h3>
          
          <div className="image-upload-area">
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesSelect}
              style={{ display: 'none' }}
            />
            
            <button
              type="button"
              className="upload-btn"
              onClick={() => galleryInputRef.current?.click()}
            >
              <Upload size={20} />
              Ajouter des images à la galerie
            </button>
          </div>

          {/* Images existantes de la galerie */}
          {existingGalleryImages.length > 0 && (
            <>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Images actuelles de la galerie
              </h4>
              <div className="image-preview-grid">
                {existingGalleryImages.map((imgUrl, index) => (
                  <div key={`existing-${index}`} className="image-preview-item">
                    <img src={imgUrl} alt={`Galerie ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeExistingGalleryImage(index)}
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

          {/* Nouvelles images de la galerie */}
          {galleryImages.length > 0 && (
            <>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Nouvelles images à ajouter
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
            Vous pouvez ajouter plusieurs images pour créer une galerie (max 2MB par image)
          </p>
        </div>

        {/* ========== ACTIONS ========== */}
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

export default ProjectEditor;