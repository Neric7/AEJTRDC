// ============================================
// ADMIN DASHBOARD - CRUD Complet
// Chemin: admin/src/components/humanitarian/EthicalCommitmentsAdmin.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Shield, 
  FileText, Calendar, CheckCircle, AlertCircle, Eye, EyeOff, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './EthicalCommitmentsAdmin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const EthicalCommitmentsAdmin = () => {
  const navigate = useNavigate();
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCommitment, setEditingCommitment] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  const [formData, setFormData] = useState({
    title: '',
    category: 'principes_humanitaires',
    description: '',
    reference_documents: '',
    implementation_date: '',
    review_date: '',
    is_active: true,
    priority: 'medium',
    order: 0
  });

  const categories = [
    { value: 'principes_humanitaires', label: 'Principes Humanitaires', icon: '🤝' },
    { value: 'protection', label: 'Protection', icon: '🛡️' },
    { value: 'safeguarding', label: 'Safeguarding', icon: '👶' },
    { value: 'code_conduite', label: 'Code de Conduite', icon: '📜' },
    { value: 'normes_qualite', label: 'Normes de Qualité', icon: '⭐' },
    { value: 'environnement', label: 'Environnement', icon: '🌍' }
  ];

  const priorities = [
    { value: 'low', label: 'Basse', color: '#3498db' },
    { value: 'medium', label: 'Moyenne', color: '#f39c12' },
    { value: 'high', label: 'Haute', color: '#e67e22' },
    { value: 'critical', label: 'Critique', color: '#e74c3c' }
  ];

  useEffect(() => {
    fetchCommitments();
    fetchStats();
  }, [filter]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return { Authorization: `Bearer ${token}` };
  };

  const fetchCommitments = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { category: filter } : {};
      const response = await axios.get(`${API_URL}/admin/ethical-commitments`, {
        headers: getAuthHeaders(),
        params
      });
      setCommitments(response.data.data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des engagements');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/ethical-commitments/stats`, {
        headers: getAuthHeaders()
      });
      setStats(response.data.data);
    } catch (error) {
      console.error('Erreur stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCommitment) {
        await axios.put(
          `${API_URL}/admin/ethical-commitments/${editingCommitment.id}`,
          formData,
          { headers: getAuthHeaders() }
        );
        toast.success('✅ Engagement mis à jour avec succès');
      } else {
        await axios.post(
          `${API_URL}/admin/ethical-commitments`,
          formData,
          { headers: getAuthHeaders() }
        );
        toast.success('✅ Engagement ajouté avec succès');
      }
      
      closeModal();
      fetchCommitments();
      fetchStats();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Êtes-vous sûr de vouloir supprimer cet engagement ?')) return;
    
    try {
      await axios.delete(`${API_URL}/admin/ethical-commitments/${id}`, {
        headers: getAuthHeaders()
      });
      toast.success('🗑️ Engagement supprimé avec succès');
      fetchCommitments();
      fetchStats();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/admin/ethical-commitments/${id}/toggle-status`,
        {},
        { headers: getAuthHeaders() }
      );
      toast.success('✅ Statut mis à jour');
      fetchCommitments();
      fetchStats();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const openModal = (commitment = null) => {
    if (commitment) {
      setEditingCommitment(commitment);
      setFormData({
        title: commitment.title,
        category: commitment.category,
        description: commitment.description,
        reference_documents: commitment.reference_documents || '',
        implementation_date: commitment.implementation_date || '',
        review_date: commitment.review_date || '',
        is_active: commitment.is_active,
        priority: commitment.priority,
        order: commitment.order || 0
      });
    } else {
      setEditingCommitment(null);
      setFormData({
        title: '',
        category: 'principes_humanitaires',
        description: '',
        reference_documents: '',
        implementation_date: '',
        review_date: '',
        is_active: true,
        priority: 'medium',
        order: 0
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCommitment(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const getPriorityColor = (priority) => {
    return priorities.find(p => p.value === priority)?.color || '#95a5a6';
  };

  return (
    <div className="ethical-admin">
      {/* Bouton Retour */}
      <button 
        onClick={() => navigate('/dashboard')} 
        className="btn-back"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          background: '#ecf0f1',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          fontWeight: '600',
          color: '#2c3e50',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#bdc3c7';
          e.currentTarget.style.transform = 'translateX(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#ecf0f1';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={20} />
        Retour au Dashboard
      </button>

      {/* En-tête avec statistiques */}
      <div className="admin-header">
        <div className="header-left">
          <Shield size={32} className="header-icon" />
          <div>
            <h1>Engagements Éthiques</h1>
            <p>Gérez les engagements éthiques et normatifs de l'organisation</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Ajouter un engagement
        </button>
      </div>

      {/* Statistiques */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total</p>
        </div>
        <div className="stat-card active">
          <h3>{stats.active}</h3>
          <p>Actifs</p>
        </div>
        <div className="stat-card inactive">
          <h3>{stats.inactive}</h3>
          <p>Inactifs</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tous ({commitments.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
            onClick={() => setFilter(cat.value)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Liste des engagements */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      ) : commitments.length === 0 ? (
        <div className="empty-state">
          <Shield size={64} />
          <h3>Aucun engagement</h3>
          <p>Commencez par ajouter votre premier engagement éthique</p>
          <button className="btn-primary" onClick={() => openModal()}>
            <Plus size={20} />
            Ajouter un engagement
          </button>
        </div>
      ) : (
        <div className="commitments-table">
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Priorité</th>
                <th>Date mise en œuvre</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commitments.map((commitment) => (
                <tr key={commitment.id}>
                  <td>
                    <strong>{commitment.title}</strong>
                    <p className="table-description">{commitment.description.substring(0, 80)}...</p>
                  </td>
                  <td>
                    <span className={`badge-category ${commitment.category}`}>
                      {categories.find(c => c.value === commitment.category)?.label}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="badge-priority"
                      style={{ backgroundColor: getPriorityColor(commitment.priority) }}
                    >
                      {priorities.find(p => p.value === commitment.priority)?.label}
                    </span>
                  </td>
                  <td>
                    {commitment.implementation_date 
                      ? new Date(commitment.implementation_date).toLocaleDateString('fr-FR')
                      : 'Non définie'
                    }
                  </td>
                  <td>
                    <button
                      className={`status-toggle ${commitment.is_active ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(commitment.id)}
                      title={commitment.is_active ? 'Désactiver' : 'Activer'}
                    >
                      {commitment.is_active ? (
                        <>
                          <CheckCircle size={16} />
                          <span>Actif</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} />
                          <span>Inactif</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon edit"
                        onClick={() => openModal(commitment)}
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDelete(commitment.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Formulaire */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingCommitment ? 'Modifier l\'engagement' : 'Ajouter un engagement'}
              </h2>
              <button className="btn-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Titre *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Respect de la dignité humaine"
                />
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
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Priorité *</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    {priorities.map(p => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  placeholder="Décrivez l'engagement éthique en détail..."
                />
              </div>

              <div className="form-group">
                <label>Documents de référence</label>
                <input
                  type="text"
                  name="reference_documents"
                  value={formData.reference_documents}
                  onChange={handleInputChange}
                  placeholder="Ex: Charte humanitaire, Code de conduite CRF"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date de mise en œuvre</label>
                  <input
                    type="date"
                    name="implementation_date"
                    value={formData.implementation_date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Date de révision</label>
                  <input
                    type="date"
                    name="review_date"
                    value={formData.review_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ordre d'affichage</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                />
                <small>Ordre croissant (0 = premier)</small>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                  />
                  <span>Engagement actif (visible publiquement)</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={20} />
                  {editingCommitment ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthicalCommitmentsAdmin;