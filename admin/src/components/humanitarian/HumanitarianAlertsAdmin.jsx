// ============================================
// ADMIN - Gestion des Alertes Humanitaires
// Chemin: admin/src/components/humanitarian/HumanitarianAlerts.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Plus, Edit, Trash2, Save, X, Eye, EyeOff,
  Bell, MapPin, Users, Calendar, TrendingUp, Activity, RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import humanitarianService from '../../services/humanitarian';
import './HumanitarianAlertsAdmin.css';

const HumanitarianAlertsAdmin = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [filter, setFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    alert_type: 'natural_disaster',
    severity: 'medium',
    location: '',
    affected_population: '',
    description: '',
    needs_identified: '',
    response_actions: '',
    contact_person: '',
    contact_phone: '',
    start_date: '',
    end_date: '',
    is_active: true
  });

  const alertTypes = [
    { value: 'natural_disaster', label: 'Catastrophe naturelle', icon: '🌪️' },
    { value: 'conflict', label: 'Conflit', icon: '⚔️' },
    { value: 'epidemic', label: 'Épidémie', icon: '🦠' },
    { value: 'food_insecurity', label: 'Insécurité alimentaire', icon: '🌾' },
    { value: 'displacement', label: 'Déplacement de population', icon: '👥' },
    { value: 'infrastructure', label: 'Défaillance infrastructure', icon: '🏗️' },
    { value: 'other', label: 'Autre', icon: '⚠️' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Faible', color: 'green' },
    { value: 'medium', label: 'Moyenne', color: 'yellow' },
    { value: 'high', label: 'Élevée', color: 'orange' },
    { value: 'critical', label: 'Critique', color: 'red' }
  ];

  useEffect(() => {
    fetchAlerts();
  }, [filter]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const params = { isAdmin: true };
      
      if (filter !== 'all') {
        params.alert_type = filter;
      }
      
      const data = await humanitarianService.getAlerts(params);
      setAlerts(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors du chargement des alertes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.location || !formData.description || 
        !formData.contact_person || !formData.contact_phone || !formData.start_date) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setSubmitting(true);
      
      if (editingAlert) {
        await humanitarianService.updateAlert(editingAlert.id, formData);
        toast.success('Alerte mise à jour avec succès');
      } else {
        await humanitarianService.createAlert(formData);
        toast.success('Alerte créée avec succès');
      }
      
      closeModal();
      fetchAlerts();
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage = error.response?.data?.errors 
        ? Object.values(error.response.data.errors).flat().join(', ')
        : error.response?.data?.message || 'Erreur lors de l\'enregistrement';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?')) return;
    
    try {
      await humanitarianService.deleteAlert(id);
      toast.success('Alerte supprimée avec succès');
      fetchAlerts();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await humanitarianService.updateAlert(id, { is_active: !currentStatus });
      toast.success('Statut mis à jour');
      fetchAlerts();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  const openModal = (alert = null) => {
    if (alert) {
      setEditingAlert(alert);
      setFormData({
        title: alert.title,
        alert_type: alert.alert_type,
        severity: alert.severity,
        location: alert.location,
        affected_population: alert.affected_population || '',
        description: alert.description,
        needs_identified: alert.needs_identified || '',
        response_actions: alert.response_actions || '',
        contact_person: alert.contact_person,
        contact_phone: alert.contact_phone,
        start_date: alert.start_date || '',
        end_date: alert.end_date || '',
        is_active: alert.is_active
      });
    } else {
      setEditingAlert(null);
      setFormData({
        title: '',
        alert_type: 'natural_disaster',
        severity: 'medium',
        location: '',
        affected_population: '',
        description: '',
        needs_identified: '',
        response_actions: '',
        contact_person: '',
        contact_phone: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        is_active: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAlert(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const getSeverityColor = (severity) => {
    return severityLevels.find(s => s.value === severity)?.color || 'gray';
  };

  const getAlertTypeInfo = (type) => {
    return alertTypes.find(t => t.value === type);
  };

  const getStats = () => {
    return {
      critical: alerts.filter(a => a.is_active && a.severity === 'critical').length,
      active: alerts.filter(a => a.is_active).length,
      total: alerts.length
    };
  };

  const stats = getStats();

  return (
    <div className="humanitarian-alerts">
      {/* Bouton Retour */}
      <button 
        onClick={() => navigate('/dashboard')} 
        className="btn-back"
      >
        <ArrowLeft size={20} />
        Retour au Dashboard
      </button>

      <div className="page-header">
        <div>
          <h1>
            <AlertTriangle size={28} />
            Alertes Humanitaires
          </h1>
          <p>Gestion des situations d'urgence et crises humanitaires</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon" onClick={fetchAlerts} title="Actualiser">
            <RefreshCw size={20} />
          </button>
          <button className="btn-primary" onClick={() => openModal()}>
            <Plus size={20} />
            Nouvelle alerte
          </button>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card critical">
          <Activity size={24} />
          <div>
            <span className="stat-value">{stats.critical}</span>
            <span className="stat-label">Alertes critiques</span>
          </div>
        </div>
        <div className="stat-card active">
          <Bell size={24} />
          <div>
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Alertes actives</span>
          </div>
        </div>
        <div className="stat-card total">
          <TrendingUp size={24} />
          <div>
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Toutes ({alerts.length})
        </button>
        {alertTypes.map(type => (
          <button
            key={type.value}
            className={`filter-btn ${filter === type.value ? 'active' : ''}`}
            onClick={() => setFilter(type.value)}
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">
          <RefreshCw className="spin" size={32} />
          <p>Chargement des alertes...</p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="empty-state">
          <AlertTriangle size={48} />
          <h3>Aucune alerte</h3>
          <p>Aucune alerte humanitaire pour le moment</p>
          <button className="btn-primary" onClick={() => openModal()}>
            <Plus size={20} />
            Créer une alerte
          </button>
        </div>
      ) : (
        <div className="alerts-grid">
          {alerts.map((alert) => {
            const typeInfo = getAlertTypeInfo(alert.alert_type);
            
            return (
              <div key={alert.id} className={`alert-card severity-${alert.severity}`}>
                <div className="card-header">
                  <div className="alert-title">
                    <span className="alert-icon">{typeInfo?.icon}</span>
                    <div>
                      <h3>{alert.title}</h3>
                      <span className="alert-type">{typeInfo?.label}</span>
                    </div>
                  </div>
                  <span className={`severity-badge ${getSeverityColor(alert.severity)}`}>
                    {severityLevels.find(s => s.value === alert.severity)?.label}
                  </span>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <MapPin size={16} />
                    <span><strong>Localisation:</strong> {alert.location}</span>
                  </div>

                  {alert.affected_population && (
                    <div className="info-row">
                      <Users size={16} />
                      <span><strong>Population affectée:</strong> {alert.affected_population}</span>
                    </div>
                  )}

                  <p className="description">{alert.description}</p>

                  {alert.needs_identified && (
                    <div className="needs-section">
                      <strong>Besoins identifiés:</strong>
                      <p>{alert.needs_identified}</p>
                    </div>
                  )}

                  {alert.response_actions && (
                    <div className="response-section">
                      <strong>Actions en cours:</strong>
                      <p>{alert.response_actions}</p>
                    </div>
                  )}

                  <div className="contact-info">
                    <strong>Contact:</strong> {alert.contact_person} - {alert.contact_phone}
                  </div>

                  <div className="dates-info">
                    <Calendar size={16} />
                    <span>Début: {alert.start_date}</span>
                    {alert.end_date && <span> • Fin: {alert.end_date}</span>}
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className={`status-badge ${alert.is_active ? 'active' : 'inactive'}`}
                    onClick={() => toggleStatus(alert.id, alert.is_active)}
                  >
                    {alert.is_active ? <Bell size={16} /> : <EyeOff size={16} />}
                    {alert.is_active ? 'Active' : 'Inactive'}
                  </button>

                  <div className="action-buttons">
                    <button
                      className="btn-icon"
                      onClick={() => openModal(alert)}
                      title="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon danger"
                      onClick={() => handleDelete(alert.id)}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAlert ? 'Modifier l\'alerte' : 'Nouvelle alerte humanitaire'}</h2>
              <button className="btn-icon" onClick={closeModal} disabled={submitting}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Titre de l'alerte *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Type d'alerte *</label>
                  <select
                    name="alert_type"
                    value={formData.alert_type}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  >
                    {alertTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Niveau de sévérité *</label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  >
                    {severityLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Localisation *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ex: Mahajanga, District Marovoay"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label>Population affectée</label>
                  <input
                    type="text"
                    name="affected_population"
                    value={formData.affected_population}
                    onChange={handleInputChange}
                    placeholder="Ex: 10,000 personnes"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description de la situation *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>Besoins identifiés</label>
                <textarea
                  name="needs_identified"
                  value={formData.needs_identified}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Ex: Eau potable, nourriture, abris..."
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>Actions de réponse</label>
                <textarea
                  name="response_actions"
                  value={formData.response_actions}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Actions entreprises ou planifiées..."
                  disabled={submitting}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Personne de contact *</label>
                  <input
                    type="text"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label>Téléphone de contact *</label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date de début *</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label>Date de fin (si applicable)</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    disabled={submitting}
                  />
                  Alerte active
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="spin" size={20} />
                      {editingAlert ? 'Mise à jour...' : 'Création...'}
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {editingAlert ? 'Mettre à jour' : 'Créer l\'alerte'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanitarianAlertsAdmin;