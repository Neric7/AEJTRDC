import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, 
  Upload, AlertCircle, CheckCircle, Loader, User
} from 'lucide-react';
import { teamAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';
import './TeamEditor.css';

const TeamEditor = ({ item, onSave, onCancel }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filter, setFilter] = useState('all');
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    category: 'conseil_administration',
    position: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
    photo: null,
    display_order: 0,
    is_active: true,
    social_links: {}
  });

  useEffect(() => {
    fetchMembers();
  }, [filter]);

  // Si on passe un item en props (mode édition depuis ContentPage)
  useEffect(() => {
    if (item) {
      openModal(item);
    }
  }, [item]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { category: filter } : {};
      const response = await teamAPI.getAll(params);
      
      if (response.data.success) {
        setMembers(response.data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des membres');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        await teamAPI.update(editingMember.id, formData);
        toast.success('Membre mis à jour avec succès');
      } else {
        await teamAPI.create(formData);
        toast.success('Membre ajouté avec succès');
      }
      
      closeModal();
      fetchMembers();
      
      // Si utilisé depuis ContentPage, appeler onSave
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;

    try {
      await teamAPI.delete(id);
      toast.success('Membre supprimé avec succès');
      fetchMembers();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await teamAPI.toggleStatus(id);
      toast.success('Statut mis à jour');
      fetchMembers();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        full_name: member.full_name,
        category: member.category,
        position: member.position,
        role: member.role || '',
        email: member.email,
        phone: member.phone || '',
        bio: member.bio || '',
        photo: null,
        display_order: member.display_order,
        is_active: member.is_active,
        social_links: member.social_links || {}
      });
      setPhotoPreview(member.photo);
    } else {
      setEditingMember(null);
      setFormData({
        full_name: '',
        category: 'conseil_administration',
        position: '',
        role: '',
        email: '',
        phone: '',
        bio: '',
        photo: null,
        display_order: 0,
        is_active: true,
        social_links: {}
      });
      setPhotoPreview(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setPhotoPreview(null);
    
    // Si utilisé depuis ContentPage, appeler onCancel
    if (onCancel) {
      onCancel();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Si utilisé comme modal depuis ContentPage, retourner seulement le formulaire
  if (item && onSave && onCancel) {
    return (
      <div className="team-editor-modal">
        <div className="modal-header">
          <h2>{item.id ? 'Modifier le membre' : 'Ajouter un membre'}</h2>
          <button className="btn-icon" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label>Photo</label>
              <div className="photo-upload">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="photo-preview" />
                ) : (
                  <div className="photo-placeholder">
                    <User size={40} />
                  </div>
                )}
                <label className="upload-btn">
                  <Upload size={20} />
                  Choisir une photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nom complet *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Catégorie *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="conseil_administration">Conseil d'Administration</option>
                <option value="coordination">Coordination</option>
              </select>
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Ex: Président, Coordonnateur..."
                required
              />
            </div>

            <div className="form-group">
              <label>Rôle</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Ex: Chargé de l'éducation..."
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Biographie</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              placeholder="Décrivez brièvement le parcours et les responsabilités..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ordre d'affichage</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                Membre actif
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              <Save size={20} />
              {item.id ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Sinon, afficher la page complète
  return (
    <div className="team-editor">
      <div className="editor-header">
        <div>
          <h1>Gestion de l'Équipe</h1>
          <p>Gérez les membres du conseil d'administration et de la coordination</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Ajouter un membre
        </button>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tous ({members.length})
        </button>
        <button
          className={`filter-btn ${filter === 'conseil_administration' ? 'active' : ''}`}
          onClick={() => setFilter('conseil_administration')}
        >
          Conseil d'Administration
        </button>
        <button
          className={`filter-btn ${filter === 'coordination' ? 'active' : ''}`}
          onClick={() => setFilter('coordination')}
        >
          Coordination
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader className="animate-spin" size={40} />
          <p>Chargement...</p>
        </div>
      ) : (
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Position</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>
                    {member.photo ? (
                      <img src={member.photo} alt={member.full_name} className="member-thumb" />
                    ) : (
                      <div className="member-thumb-placeholder">
                        <User size={20} />
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{member.full_name}</strong>
                    {member.role && <div className="text-muted">{member.role}</div>}
                  </td>
                  <td>
                    <span className={`badge ${member.category}`}>
                      {member.category === 'conseil_administration' ? 'Conseil' : 'Coordination'}
                    </span>
                  </td>
                  <td>{member.position}</td>
                  <td>{member.email}</td>
                  <td>{member.phone || '-'}</td>
                  <td>
                    <button
                      className={`status-badge ${member.is_active ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(member.id)}
                    >
                      {member.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                      {member.is_active ? 'Actif' : 'Inactif'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => openModal(member)}
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => handleDelete(member.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMember ? 'Modifier le membre' : 'Ajouter un membre'}</h2>
              <button className="btn-icon" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Photo</label>
                  <div className="photo-upload">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="photo-preview" />
                    ) : (
                      <div className="photo-placeholder">
                        <User size={40} />
                      </div>
                    )}
                    <label className="upload-btn">
                      <Upload size={20} />
                      Choisir une photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        hidden
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="conseil_administration">Conseil d'Administration</option>
                    <option value="coordination">Coordination</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Ex: Président, Coordonnateur..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rôle</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Ex: Chargé de l'éducation..."
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Biographie</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Décrivez brièvement le parcours et les responsabilités..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ordre d'affichage</label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                    Membre actif
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={20} />
                  {editingMember ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamEditor;