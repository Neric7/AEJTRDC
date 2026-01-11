// ============================================
// ADMIN DASHBOARD - Gestion des Violations
// Chemin: admin/src/components/humanitarian/ViolationReportAdmin.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Eye, Clock, CheckCircle, XCircle, 
  Filter, RefreshCw, User, MapPin, Calendar, FileText,
  Edit, Trash2, X, Save, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './ViolationReportAdmin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ViolationReportAdmin = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState(false);

  const [editFormData, setEditFormData] = useState({
    status: 'pending',
    priority: 'medium',
    assigned_to: '',
    actions_taken: '',
    notes: ''
  });

  const categories = [
    { value: 'safeguarding', label: 'Safeguarding', color: 'red' },
    { value: 'corruption', label: 'Corruption', color: 'orange' },
    { value: 'discrimination', label: 'Discrimination', color: 'purple' },
    { value: 'harassment', label: 'Harcèlement', color: 'pink' },
    { value: 'fraud', label: 'Fraude', color: 'yellow' },
    { value: 'misconduct', label: 'Mauvaise conduite', color: 'blue' },
    { value: 'other', label: 'Autre', color: 'gray' }
  ];

  const statuses = [
    { value: 'pending', label: 'En attente', color: 'yellow', icon: Clock },
    { value: 'investigating', label: 'En investigation', color: 'blue', icon: Eye },
    { value: 'resolved', label: 'Résolu', color: 'green', icon: CheckCircle },
    { value: 'closed', label: 'Fermé', color: 'gray', icon: XCircle }
  ];

  const priorities = [
    { value: 'low', label: 'Basse', color: 'blue' },
    { value: 'medium', label: 'Moyenne', color: 'yellow' },
    { value: 'high', label: 'Haute', color: 'orange' },
    { value: 'urgent', label: 'Urgente', color: 'red' }
  ];

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, [filter, statusFilter]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return { Authorization: `Bearer ${token}` };
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filter !== 'all') params.category = filter;
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const response = await axios.get(`${API_URL}/admin/humanitarian/violations`, {
        headers: getAuthHeaders(),
        params
      });
      
      setReports(response.data.data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des signalements');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/humanitarian/violations/stats`, {
        headers: getAuthHeaders()
      });
      setStats(response.data.data || {});
    } catch (error) {
      console.error('Erreur stats:', error);
    }
  };

  const updateStatus = async (id, newStatus, additionalData = {}) => {
    try {
      setUpdating(true);
      await axios.put(
        `${API_URL}/admin/humanitarian/violations/${id}/status`,
        { status: newStatus, ...additionalData },
        { headers: getAuthHeaders() }
      );
      toast.success('Statut mis à jour avec succès');
      fetchReports();
      fetchStats();
      
      if (selectedReport && selectedReport.id === id) {
        const updatedReport = await axios.get(
          `${API_URL}/admin/humanitarian/violations/${id}`,
          { headers: getAuthHeaders() }
        );
        setSelectedReport(updatedReport.data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const viewDetails = async (report) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/humanitarian/violations/${report.id}`,
        { headers: getAuthHeaders() }
      );
      setSelectedReport(response.data.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des détails');
    }
  };

  const openEditModal = (report) => {
    setSelectedReport(report);
    setEditFormData({
      status: report.status,
      priority: report.priority,
      assigned_to: report.assigned_to || '',
      actions_taken: report.actions_taken || '',
      notes: report.notes || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await axios.put(
        `${API_URL}/admin/humanitarian/violations/${selectedReport.id}/status`,
        editFormData,
        { headers: getAuthHeaders() }
      );
      toast.success('Signalement mis à jour avec succès');
      setShowEditModal(false);
      fetchReports();
      fetchStats();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Êtes-vous sûr de vouloir supprimer ce signalement ?')) return;
    
    try {
      await axios.delete(`${API_URL}/admin/humanitarian/violations/${id}`, {
        headers: getAuthHeaders()
      });
      toast.success('Signalement supprimé avec succès');
      fetchReports();
      fetchStats();
      setShowDetailModal(false);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const getCategoryColor = (category) => {
    return categories.find(c => c.value === category)?.color || 'gray';
  };

  const getStatusInfo = (status) => {
    return statuses.find(s => s.value === status);
  };

  const getPriorityColor = (priority) => {
    return priorities.find(p => p.value === priority)?.color || 'gray';
  };

  return (
    <div className="violation-admin">
      {/* Bouton Retour */}
      <button 
        className="btn-back"
        onClick={() => navigate('/admin/dashboard')}
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

      {/* En-tête */}
      <div className="admin-header">
        <div className="header-left">
          <AlertTriangle size={32} className="header-icon" />
          <div>
            <h1>Signalements de Violations</h1>
            <p>Gestion confidentielle des signalements éthiques</p>
          </div>
        </div>
        <button className="btn-icon" onClick={fetchReports} title="Actualiser">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Statistiques */}
      <div className="stats-cards">
        <div className="stat-card total">
          <h3>{stats.total || 0}</h3>
          <p>Total</p>
        </div>
        <div className="stat-card pending">
          <h3>{stats.pending || 0}</h3>
          <p>En attente</p>
        </div>
        <div className="stat-card investigating">
          <h3>{stats.investigating || 0}</h3>
          <p>En investigation</p>
        </div>
        <div className="stat-card urgent">
          <h3>{stats.urgent || 0}</h3>
          <p>Urgents</p>
        </div>
        <div className="stat-card resolved">
          <h3>{stats.resolved || 0}</h3>
          <p>Résolus</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        <div className="filter-group">
          <Filter size={16} />
          <span>Catégorie:</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Toutes</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <span>Statut:</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tous</option>
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des signalements */}
      {loading ? (
        <div className="loading-state">
          <RefreshCw className="spin" size={32} />
          <p>Chargement...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="empty-state">
          <AlertTriangle size={64} />
          <h3>Aucun signalement</h3>
          <p>Aucun signalement pour les filtres sélectionnés</p>
        </div>
      ) : (
        <div className="reports-table">
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Catégorie</th>
                <th>Titre</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const statusInfo = getStatusInfo(report.status);
                const StatusIcon = statusInfo?.icon || Clock;
                
                return (
                  <tr key={report.id} className={`priority-${report.priority}`}>
                    <td>
                      <strong className="reference">{report.reference}</strong>
                    </td>
                    <td>
                      <span className={`badge badge-${getCategoryColor(report.category)}`}>
                        {categories.find(c => c.value === report.category)?.label}
                      </span>
                    </td>
                    <td>
                      <strong>{report.title}</strong>
                      <p className="location">
                        <MapPin size={14} /> {report.location}
                      </p>
                    </td>
                    <td>
                      <span className={`badge badge-${getPriorityColor(report.priority)}`}>
                        {priorities.find(p => p.value === report.priority)?.label}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${statusInfo?.color}`}>
                        <StatusIcon size={14} />
                        {statusInfo?.label}
                      </span>
                    </td>
                    <td>
                      {new Date(report.incident_date).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => viewDetails(report)}
                          title="Voir détails"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn-icon edit"
                          onClick={() => openEditModal(report)}
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(report.id)}
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Détails */}
      {showDetailModal && selectedReport && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails - {selectedReport.reference}</h2>
              <button className="btn-close" onClick={() => setShowDetailModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Catégorie</label>
                  <span className={`badge badge-${getCategoryColor(selectedReport.category)}`}>
                    {categories.find(c => c.value === selectedReport.category)?.label}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Priorité</label>
                  <span className={`badge badge-${getPriorityColor(selectedReport.priority)}`}>
                    {priorities.find(p => p.value === selectedReport.priority)?.label}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Statut</label>
                  <span className={`badge badge-${getStatusInfo(selectedReport.status)?.color}`}>
                    {getStatusInfo(selectedReport.status)?.label}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Description</h3>
                <p>{selectedReport.description}</p>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <label>Lieu</label>
                  <p>{selectedReport.location}</p>
                </div>
                <div className="detail-item">
                  <label>Date incident</label>
                  <p>{new Date(selectedReport.incident_date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="detail-item">
                  <label>Type rapporteur</label>
                  <p>{selectedReport.reporter_type}</p>
                </div>
                <div className="detail-item">
                  <label>Info rapporteur</label>
                  <p>{selectedReport.reporter_info || 'Anonyme'}</p>
                </div>
              </div>

              {selectedReport.assigned_to && (
                <div className="detail-section">
                  <h3>Assignation</h3>
                  <p>{selectedReport.assigned_to}</p>
                </div>
              )}

              {selectedReport.actions_taken && (
                <div className="detail-section">
                  <h3>Actions entreprises</h3>
                  <p>{selectedReport.actions_taken}</p>
                </div>
              )}

              {selectedReport.notes && (
                <div className="detail-section">
                  <h3>Notes internes</h3>
                  <p>{selectedReport.notes}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDetailModal(false)}>
                Fermer
              </button>
              <button className="btn-primary" onClick={() => {
                setShowDetailModal(false);
                openEditModal(selectedReport);
              }}>
                <Edit size={18} />
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Édition */}
      {showEditModal && selectedReport && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Modifier - {selectedReport.reference}</h2>
              <button className="btn-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Statut *</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    required
                  >
                    {statuses.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Priorité *</label>
                  <select
                    value={editFormData.priority}
                    onChange={(e) => setEditFormData({...editFormData, priority: e.target.value})}
                    required
                  >
                    {priorities.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Assigné à</label>
                <input
                  type="text"
                  value={editFormData.assigned_to}
                  onChange={(e) => setEditFormData({...editFormData, assigned_to: e.target.value})}
                  placeholder="Nom du responsable"
                />
              </div>

              <div className="form-group">
                <label>Actions entreprises</label>
                <textarea
                  value={editFormData.actions_taken}
                  onChange={(e) => setEditFormData({...editFormData, actions_taken: e.target.value})}
                  rows="4"
                  placeholder="Décrivez les actions menées..."
                />
              </div>

              <div className="form-group">
                <label>Notes internes</label>
                <textarea
                  value={editFormData.notes}
                  onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                  rows="3"
                  placeholder="Notes confidentielles..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary" disabled={updating}>
                  {updating ? <RefreshCw className="spin" size={18} /> : <Save size={18} />}
                  {updating ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViolationReportAdmin;