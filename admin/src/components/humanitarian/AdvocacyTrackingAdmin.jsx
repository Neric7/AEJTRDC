import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, TrendingUp, Target,
  Users, Calendar, FileText, CheckCircle, Clock, 
  AlertCircle, BarChart, RefreshCw, Download, Eye,
  DollarSign, Activity, Award, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import humanitarianService from '../../services/humanitarian';
import './AdvocacyCampaignAdmin.css';

const AdvocacyCampaignAdmin = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    theme: 'protection',
    objective: '',
    target_audience: '',
    key_messages: '',
    activities: '',
    timeline: '',
    budget: '',
    partners: '',
    indicators: '',
    progress: 0,
    status: 'planning',
    start_date: '',
    end_date: '',
    is_active: true
  });

  const themes = [
    { value: 'protection', label: 'Protection', icon: '🛡️', color: '#e74c3c' },
    { value: 'education', label: 'Éducation', icon: '📚', color: '#3498db' },
    { value: 'health', label: 'Santé', icon: '🏥', color: '#e67e22' },
    { value: 'nutrition', label: 'Nutrition', icon: '🍎', color: '#27ae60' },
    { value: 'wash', label: 'WASH', icon: '💧', color: '#1abc9c' },
    { value: 'livelihoods', label: 'Moyens de subsistance', icon: '💼', color: '#f39c12' },
    { value: 'climate', label: 'Climat & Environnement', icon: '🌍', color: '#16a085' },
    { value: 'governance', label: 'Gouvernance', icon: '⚖️', color: '#9b59b6' }
  ];

  const statuses = [
    { value: 'planning', label: 'Planification', color: 'blue', icon: FileText },
    { value: 'ongoing', label: 'En cours', color: 'yellow', icon: Clock },
    { value: 'completed', label: 'Terminé', color: 'green', icon: CheckCircle },
    { value: 'on_hold', label: 'En pause', color: 'orange', icon: AlertCircle }
  ];

  useEffect(() => {
    fetchCampaigns();
    fetchStats();
  }, [filterTheme, filterStatus]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filterTheme !== 'all') params.theme = filterTheme;
      if (filterStatus !== 'all') params.status = filterStatus;
      
      const data = await humanitarianService.getAdvocacyCampaigns(params);
      setCampaigns(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des campagnes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await humanitarianService.getAdvocacyStats();
      setStats(data);
    } catch (error) {
      console.error('Erreur stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.objective || !formData.target_audience || !formData.start_date) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setSubmitting(true);
      
      if (editingCampaign) {
        await humanitarianService.updateAdvocacyCampaign(editingCampaign.id, formData);
        toast.success('Campagne mise à jour avec succès');
      } else {
        await humanitarianService.createAdvocacyCampaign(formData);
        toast.success('Campagne créée avec succès');
      }
      
      closeModal();
      fetchCampaigns();
      fetchStats();
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) return;
    
    try {
      await humanitarianService.deleteAdvocacyCampaign(id);
      toast.success('Campagne supprimée avec succès');
      fetchCampaigns();
      fetchStats();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const openModal = (campaign = null) => {
    if (campaign) {
      setEditingCampaign(campaign);
      setFormData({
        ...campaign,
        start_date: campaign.start_date || '',
        end_date: campaign.end_date || '',
      });
    } else {
      setEditingCampaign(null);
      setFormData({
        title: '',
        theme: 'protection',
        objective: '',
        target_audience: '',
        key_messages: '',
        activities: '',
        timeline: '',
        budget: '',
        partners: '',
        indicators: '',
        progress: 0,
        status: 'planning',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        is_active: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCampaign(null);
  };

  const openDetailsModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCampaign(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const getStatusInfo = (status) => {
    return statuses.find(s => s.value === status);
  };

  const getThemeInfo = (theme) => {
    return themes.find(t => t.value === theme);
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'green';
    if (progress >= 50) return 'yellow';
    if (progress >= 25) return 'orange';
    return 'red';
  };

  const exportReport = () => {
    toast.success('Rapport en cours de génération...');
    // Logique d'export à implémenter
  };

  return (
    <div className="advocacy-admin">
      {/* BOUTON RETOUR AU DASHBOARD */}
      <button 
        className="back-to-dashboard-btn"
        onClick={() => navigate('/admin/dashboard')}
      >
        <ArrowLeft size={20} />
        Retour au Dashboard
      </button>

      <div className="page-header">
        <div>
          <h1>
            <Target size={28} />
            Gestion des Campagnes de Plaidoyer
          </h1>
          <p>Administration et suivi des actions d'advocacy</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon" onClick={fetchCampaigns} title="Actualiser">
            <RefreshCw size={20} />
          </button>
          <button className="btn-outline" onClick={exportReport}>
            <Download size={20} />
            Exporter
          </button>
          <button className="btn-primary" onClick={() => openModal()}>
            <Plus size={20} />
            Nouvelle campagne
          </button>
        </div>
      </div>

      {/* STATISTIQUES */}
      {stats && (
        <div className="stats-dashboard">
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total campagnes</span>
            </div>
          </div>
          
          <div className="stat-card active">
            <div className="stat-icon">
              <Activity size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.active}</span>
              <span className="stat-label">Campagnes actives</span>
            </div>
          </div>
          
          <div className="stat-card ongoing">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.ongoing}</span>
              <span className="stat-label">En cours</span>
            </div>
          </div>
          
          <div className="stat-card completed">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.completed}</span>
              <span className="stat-label">Terminées</span>
            </div>
          </div>
          
          <div className="stat-card progress">
            <div className="stat-icon">
              <BarChart size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{Math.round(stats.avg_progress)}%</span>
              <span className="stat-label">Progression moyenne</span>
            </div>
          </div>
        </div>
      )}

      {/* FILTRES */}
      <div className="filters-section">
        <div className="filter-group">
          <label>
            <Filter size={16} />
            Thématique:
          </label>
          <select value={filterTheme} onChange={(e) => setFilterTheme(e.target.value)}>
            <option value="all">Toutes les thématiques</option>
            {themes.map(theme => (
              <option key={theme.value} value={theme.value}>
                {theme.icon} {theme.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Statut:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tous les statuts</option>
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Grille
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            Liste
          </button>
        </div>
      </div>

      {/* CAMPAGNES */}
      {loading ? (
        <div className="loading-state">
          <RefreshCw className="spin" size={32} />
          <p>Chargement des campagnes...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="empty-state">
          <Target size={48} />
          <h3>Aucune campagne</h3>
          <p>Commencez par créer votre première campagne de plaidoyer</p>
          <button className="btn-primary" onClick={() => openModal()}>
            <Plus size={20} />
            Créer une campagne
          </button>
        </div>
      ) : (
        <div className={`campaigns-container ${viewMode}`}>
          {campaigns.map((campaign) => {
            const statusInfo = getStatusInfo(campaign.status);
            const themeInfo = getThemeInfo(campaign.theme);
            const StatusIcon = statusInfo?.icon || Clock;
            
            return (
              <div key={campaign.id} className="campaign-card">
                <div className="card-header">
                  <div className="campaign-title">
                    <span className="theme-icon" style={{ backgroundColor: themeInfo?.color }}>
                      {themeInfo?.icon}
                    </span>
                    <div>
                      <h3>{campaign.title}</h3>
                      <span className="theme-label">{themeInfo?.label}</span>
                    </div>
                  </div>
                  <div className="header-badges">
                    <span className={`status-badge ${statusInfo?.color}`}>
                      <StatusIcon size={14} />
                      {statusInfo?.label}
                    </span>
                    {!campaign.is_active && (
                      <span className="status-badge inactive">Inactive</span>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-section">
                    <Target size={16} />
                    <div>
                      <strong>Objectif:</strong>
                      <p className="truncate-2">{campaign.objective}</p>
                    </div>
                  </div>

                  <div className="info-section">
                    <Users size={16} />
                    <div>
                      <strong>Public cible:</strong>
                      <p>{campaign.target_audience}</p>
                    </div>
                  </div>

                  <div className="meta-info">
                    {campaign.budget && (
                      <div className="meta-item">
                        <DollarSign size={14} />
                        <span>{campaign.budget}</span>
                      </div>
                    )}
                    {campaign.partners && (
                      <div className="meta-item">
                        <Award size={14} />
                        <span className="truncate">{campaign.partners}</span>
                      </div>
                    )}
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progression</span>
                      <span className={`progress-value ${getProgressColor(campaign.progress)}`}>
                        {campaign.progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getProgressColor(campaign.progress)}`}
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="dates-info">
                    <Calendar size={14} />
                    <span>
                      {new Date(campaign.start_date).toLocaleDateString('fr-FR')}
                      {campaign.end_date && ` → ${new Date(campaign.end_date).toLocaleDateString('fr-FR')}`}
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className="btn-sm btn-outline"
                    onClick={() => openDetailsModal(campaign)}
                  >
                    <Eye size={16} />
                    Détails
                  </button>
                  <div className="action-buttons">
                    <button
                      className="btn-sm btn-secondary"
                      onClick={() => openModal(campaign)}
                    >
                      <Edit size={16} />
                      Modifier
                    </button>
                    <button
                      className="btn-sm btn-danger"
                      onClick={() => handleDelete(campaign.id)}
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

      {/* MODAL FORMULAIRE */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingCampaign ? 'Modifier la campagne' : 'Nouvelle campagne de plaidoyer'}
              </h2>
              <button className="btn-icon" onClick={closeModal} disabled={submitting}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-section">
                <h3>Informations générales</h3>
                
                <div className="form-group">
                  <label>Titre de la campagne *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Campagne contre les violences basées sur le genre"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Thématique *</label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                    >
                      {themes.map(theme => (
                        <option key={theme.value} value={theme.value}>
                          {theme.icon} {theme.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Statut *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                    >
                      {statuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Objectif *</label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Décrivez l'objectif principal de cette campagne..."
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label>Public cible *</label>
                  <input
                    type="text"
                    name="target_audience"
                    value={formData.target_audience}
                    onChange={handleInputChange}
                    placeholder="Ex: Autorités locales, communautés, médias..."
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Stratégie et activités</h3>
                
                <div className="form-group">
                  <label>Messages clés</label>
                  <textarea
                    name="key_messages"
                    value={formData.key_messages}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Listez les messages principaux à véhiculer..."
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label>Activités prévues</label>
                  <textarea
                    name="activities"
                    value={formData.activities}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Décrivez les activités et actions prévues..."
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label>Indicateurs de suivi</label>
                  <textarea
                    name="indicators"
                    value={formData.indicators}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Indicateurs pour mesurer le succès de la campagne..."
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Ressources et planification</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Durée / Timeline</label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      placeholder="Ex: 6 mois, Phase 1-3..."
                      disabled={submitting}
                    />
                  </div>

                  <div className="form-group">
                    <label>Budget estimé</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="Ex: 150,000 USD"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Partenaires</label>
                  <input
                    type="text"
                    name="partners"
                    value={formData.partners}
                    onChange={handleInputChange}
                    placeholder="Ex: UNICEF, Ministère de la Santé, ONGs locales..."
                    disabled={submitting}
                  />
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
                    <label>Date de fin prévue</label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      min={formData.start_date}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Progression (%)</label>
                    <div className="progress-input">
                      <input
                        type="range"
                        name="progress"
                        value={formData.progress}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        disabled={submitting}
                      />
                      <span className="progress-display">{formData.progress}%</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        disabled={submitting}
                      />
                      <span>Campagne active</span>
                    </label>
                  </div>
                </div>
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
                      {editingCampaign ? 'Mise à jour...' : 'Création...'}
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {editingCampaign ? 'Mettre à jour' : 'Créer la campagne'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DÉTAILS */}
      {showDetailsModal && selectedCampaign && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails de la campagne</h2>
              <button className="btn-icon" onClick={closeDetailsModal}>
                <X size={20} />
              </button>
            </div>

            <div className="details-content">
              <div className="details-header">
                <div className="campaign-title-large">
                  <span className="theme-icon-large" style={{ 
                    backgroundColor: getThemeInfo(selectedCampaign.theme)?.color 
                  }}>
                    {getThemeInfo(selectedCampaign.theme)?.icon}
                  </span>
                  <div>
                    <h3>{selectedCampaign.title}</h3>
                    <span className="theme-label-large">
                      {getThemeInfo(selectedCampaign.theme)?.label}
                    </span>
                  </div>
                </div>
                <span className={`status-badge-large ${getStatusInfo(selectedCampaign.status)?.color}`}>
                  {getStatusInfo(selectedCampaign.status)?.label}
                </span>
              </div>

              <div className="details-grid">
                <div className="detail-section">
                  <h4><Target size={18} /> Objectif</h4>
                  <p>{selectedCampaign.objective}</p>
                </div>

                <div className="detail-section">
                  <h4><Users size={18} /> Public cible</h4>
                  <p>{selectedCampaign.target_audience}</p>
                </div>

                {selectedCampaign.key_messages && (
                  <div className="detail-section full-width">
                    <h4><FileText size={18} /> Messages clés</h4>
                    <p className="whitespace-pre-wrap">{selectedCampaign.key_messages}</p>
                  </div>
                )}

                {selectedCampaign.activities && (
                  <div className="detail-section full-width">
                    <h4><Activity size={18} /> Activités</h4>
                    <p className="whitespace-pre-wrap">{selectedCampaign.activities}</p>
                  </div>
                )}

                {selectedCampaign.indicators && (
                  <div className="detail-section full-width">
                    <h4><BarChart size={18} /> Indicateurs</h4>
                    <p className="whitespace-pre-wrap">{selectedCampaign.indicators}</p>
                  </div>
                )}

                <div className="detail-section">
                  <h4><Calendar size={18} /> Timeline</h4>
                  <p>{selectedCampaign.timeline || 'Non spécifié'}</p>
                </div>

                <div className="detail-section">
                  <h4><DollarSign size={18} /> Budget</h4>
                  <p>{selectedCampaign.budget || 'Non spécifié'}</p>
                </div>

                {selectedCampaign.partners && (
                  <div className="detail-section full-width">
                    <h4><Award size={18} /> Partenaires</h4>
                    <p>{selectedCampaign.partners}</p>
                  </div>
                )}

                <div className="detail-section full-width">
                  <h4><TrendingUp size={18} /> Progression</h4>
                  <div className="progress-section-large">
                    <div className="progress-bar-large">
                      <div 
                        className={`progress-fill ${getProgressColor(selectedCampaign.progress)}`}
                        style={{ width: `${selectedCampaign.progress}%` }}
                      />
                    </div>
                    <span className={`progress-value-large ${getProgressColor(selectedCampaign.progress)}`}>
                      {selectedCampaign.progress}%
                    </span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4><Calendar size={18} /> Période</h4>
                  <p>
                    Début: {new Date(selectedCampaign.start_date).toLocaleDateString('fr-FR')}<br/>
                    {selectedCampaign.end_date && `Fin prévue: ${new Date(selectedCampaign.end_date).toLocaleDateString('fr-FR')}`}
                  </p>
                </div>

                <div className="detail-section">
                  <h4>Statut</h4>
                  <p>
                    {selectedCampaign.is_active ? '✅ Active' : '⏸️ Inactive'}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeDetailsModal}>
                Fermer
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  closeDetailsModal();
                  openModal(selectedCampaign);
                }}
              >
                <Edit size={20} />
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvocacyCampaignAdmin;