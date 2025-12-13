import { useState, useRef } from 'react';
import { X, Save, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { partnersAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';
import './Editor.css';

const PartnerEditor = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    website: item?.website || '',
    email: item?.email || '',
    phone: item?.phone || '',
    address: item?.address || '',
    type: item?.type || 'ong',
    status: item?.status || 'active',
    featured: item?.featured || false,
    order: item?.order || 0,
    partnership_details: item?.partnership_details || '',
    partnership_start: item?.partnership_start || '',
    partnership_end: item?.partnership_end || '',
    social_links: item?.social_links ? JSON.stringify(item.social_links, null, 2) : '',
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(item?.logo_url || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    setLogo({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    });
    
    // Cacher l'ancien logo
    if (logoPreview) {
      setLogoPreview(null);
    }
  };

  const removeLogo = () => {
    if (logo) {
      URL.revokeObjectURL(logo.preview);
      setLogo(null);
    }
    
    // Réafficher l'ancien logo si disponible
    if (item?.logo_url) {
      setLogoPreview(item.logo_url);
    }
  };

  const removeCurrentLogo = () => {
    setLogoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('Le nom du partenaire est obligatoire');
      return;
    }

    setLoading(true);

    try {
      // Préparer les données
      const dataToSend = {
        ...formData,
        social_links: formData.social_links ? JSON.parse(formData.social_links) : null,
      };

      let savedPartner;

      // Créer ou mettre à jour le partenaire
      if (item?.id) {
        const response = await partnersAPI.update(item.id, dataToSend);
        savedPartner = response.data;
        toast.success('Partenaire modifié avec succès');
      } else {
        const response = await partnersAPI.create(dataToSend);
        savedPartner = response.data;
        toast.success('Partenaire créé avec succès');
      }

      // Upload du logo si présent
      if (logo) {
        await uploadLogo(savedPartner.id || savedPartner.data?.id);
      }

      onSave();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const uploadLogo = async (partnerId) => {
    try {
      const formData = new FormData();
      formData.append('logo', logo.file);

      await partnersAPI.uploadLogo(partnerId, formData);
      toast.success('Logo uploadé avec succès');
    } catch (error) {
      console.error('Erreur upload logo:', error);
      toast.error('Erreur lors de l\'upload du logo');
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>{item ? 'Modifier le partenaire' : 'Nouveau partenaire'}</h2>
        <button className="close-btn" onClick={onCancel} type="button">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        {/* Nom */}
        <div className="form-group">
          <label className="form-label">
            Nom du partenaire <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom du partenaire"
            required
          />
        </div>

        {/* Type et Statut */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="ong">ONG</option>
              <option value="international">International</option>
              <option value="national">National</option>
              <option value="local">Local</option>
              <option value="gouvernemental">Gouvernemental</option>
              <option value="prive">Privé</option>
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
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="pending">En attente</option>
            </select>
          </div>
        </div>

        {/* Featured et Order */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span>Mettre en avant ce partenaire</span>
            </label>
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
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description du partenaire"
            rows="4"
          />
        </div>

        {/* Contacts */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Site web</label>
            <input
              type="url"
              name="website"
              className="form-input"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@partenaire.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+243 123 456 789"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse</label>
            <input
              type="text"
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse complète"
            />
          </div>
        </div>

        {/* Partenariat */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Début du partenariat</label>
            <input
              type="date"
              name="partnership_start"
              className="form-input"
              value={formData.partnership_start}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fin du partenariat</label>
            <input
              type="date"
              name="partnership_end"
              className="form-input"
              value={formData.partnership_end}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Détails du partenariat</label>
          <textarea
            name="partnership_details"
            className="form-textarea"
            value={formData.partnership_details}
            onChange={handleChange}
            placeholder="Détails sur la collaboration, projets communs, etc."
            rows="3"
          />
        </div>

        {/* Social Links */}
        <div className="form-group">
          <label className="form-label">Réseaux sociaux (JSON)</label>
          <textarea
            name="social_links"
            className="form-textarea"
            value={formData.social_links}
            onChange={handleChange}
            placeholder='{"facebook": "url", "twitter": "url", "linkedin": "url"}'
            rows="4"
          />
          <p className="form-hint">Format JSON : {"{"}"clé": "valeur"{"}"}</p>
        </div>

        {/* Logo */}
        <div className="form-group">
          <label className="form-label">Logo</label>
          
          <div className="image-upload-area">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoSelect}
              style={{ display: 'none' }}
            />
            
            <button
              type="button"
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={20} />
              {logo || logoPreview ? 'Remplacer le logo' : 'Ajouter un logo'}
            </button>
          </div>

          {/* Preview du logo actuel */}
          {logoPreview && !logo && (
            <div className="image-preview-grid">
              <div className="image-preview-item">
                <img src={logoPreview} alt="Logo actuel" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeCurrentLogo}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
                <p className="image-name">Logo actuel</p>
              </div>
            </div>
          )}

          {/* Preview du nouveau logo */}
          {logo && (
            <div className="image-preview-grid">
              <div className="image-preview-item">
                <img src={logo.preview} alt={logo.name} />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeLogo}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
                <p className="image-name">{logo.name}</p>
              </div>
            </div>
          )}

          <p className="form-hint">
            <ImageIcon size={16} />
            Formats acceptés : JPG, PNG, SVG, WebP (max 2MB)
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

export default PartnerEditor;