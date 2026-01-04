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
  
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(item?.image_url || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  // ==================== IMAGES ====================
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages(prev => [...prev, ...newImages]);
    
    if (imagePreview && newImages.length > 0) {
      setImagePreview(null);
    }
  };

  const removeImage = (index) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      
      if (newImages.length === 0 && item?.image_url) {
        setImagePreview(item.image_url);
      }
      
      return newImages;
    });
  };

  const removeCurrentImage = () => {
    setImagePreview(null);
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

      // Upload des images si présentes
      if (images.length > 0) {
        await uploadImages(savedProject.id || savedProject.data?.id);
      }

      onSave();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (projectId) => {
    try {
      if (images.length > 0) {
        const formData = new FormData();
        formData.append('image', images[0].file);

        await projectsAPI.uploadImage(projectId, formData);
        toast.success('Image uploadée avec succès');
      }
    } catch (error) {
      console.error('Erreur upload image:', error);
      toast.error('Erreur lors de l\'upload de l\'image');
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
          
          {/* Titre */}
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

          {/* Extrait */}
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

          {/* Objectif */}
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

          {/* Zone d'exécution */}
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

          {/* Partenaires */}
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

          {/* Featured */}
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

        {/* ========== IMAGES ========== */}
        <div className="form-section">
          <h3 className="section-title">Image principale</h3>
          
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
              {images.length > 0 || imagePreview ? 'Remplacer l\'image' : 'Ajouter une image'}
            </button>
          </div>

          {/* Preview de l'image actuelle */}
          {imagePreview && images.length === 0 && (
            <div className="image-preview-grid">
              <div className="image-preview-item">
                <img src={imagePreview} alt="Image actuelle" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeCurrentImage}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
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
            Formats acceptés : JPG, PNG, WebP (max 2MB)
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