import React, { useState, useEffect } from 'react';
import { 
  Target, Users, Calendar, TrendingUp, Award,
  Clock, CheckCircle, AlertCircle, FileText,
  Activity, MessageCircle, Eye, RefreshCw,
  Filter, Search, ChevronRight, BarChart
} from 'lucide-react';
import toast from 'react-hot-toast';
import humanitarianService from '../../services/humanitarian';
import './AdvocacyTracking.css';

const AdvocacyTracking = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

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
  }, [filterTheme, filterStatus]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filterTheme !== 'all') params.theme = filterTheme;
      if (filterStatus !== 'all') params.status = filterStatus;
      
      // Route publique - seulement les campagnes actives
      const data = await humanitarianService.getPublicAdvocacyCampaigns(params);
      setCampaigns(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des campagnes');
    } finally {
      setLoading(false);
    }
  };

  const openDetailsModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCampaign(null);
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

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.objective.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStats = () => {
    return {
      total: filteredCampaigns.length,
      ongoing: filteredCampaigns.filter(c => c.status === 'ongoing').length,
      completed: filteredCampaigns.filter(c => c.status === 'completed').length,
      avgProgress: filteredCampaigns.length > 0 
        ? Math.round(filteredCampaigns.reduce((sum, c) => sum + c.progress, 0) / filteredCampaigns.length)
        : 0
    };
  };

  const stats = getStats();

  return (
    <div className="advocacy-public">
      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <Target size={48} />
          </div>
          <h1>Nos Campagnes de Plaidoyer</h1>
          <p>
            Découvrez nos actions d'advocacy pour défendre les droits et améliorer 
            les conditions de vie des populations vulnérables
          </p>
        </div>
      </div>

      {/* STATISTIQUES RAPIDES */}
      <div className="stats-bar">
        <div className="stat-item">
          <TrendingUp size={24} />
          <div>
            <span className="stat-number">{stats.total}</span>
            <span className="stat-text">Campagnes actives</span>
          </div>
        </div>
        <div className="stat-item ongoing">
          <Clock size={24} />
          <div>
            <span className="stat-number">{stats.ongoing}</span>
            <span className="stat-text">En cours</span>
          </div>
        </div>
        <div className="stat-item completed">
          <CheckCircle size={24} />
          <div>
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-text">Réalisées</span>
          </div>
        </div>
        <div className="stat-item progress">
          <BarChart size={24} />
          <div>
            <span className="stat-number">{stats.avgProgress}%</span>
            <span className="stat-text">Progression moyenne</span>
          </div>
        </div>
      </div>

      {/* FILTRES ET RECHERCHE */}
      <div className="filters-container">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher une campagne..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>
              <Filter size={16} />
              Thématique:
            </label>
            <select value={filterTheme} onChange={(e) => setFilterTheme(e.target.value)}>
              <option value="all">Toutes</option>
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
              <option value="all">Tous</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-refresh" onClick={fetchCampaigns}>
            <RefreshCw size={18} />
            Actualiser
          </button>
        </div>
      </div>

      {/* THÉMATIQUES POPULAIRES */}
      <div className="themes-showcase">
        <h2>Nos domaines d'intervention</h2>
        <div className="themes-grid">
          {themes.map(theme => {
            const count = campaigns.filter(c => c.theme === theme.value).length;
            return (
              <button
                key={theme.value}
                className={`theme-card ${filterTheme === theme.value ? 'active' : ''}`}
                onClick={() => setFilterTheme(theme.value)}
                style={{ borderColor: theme.color }}
              >
                <span className="theme-icon" style={{ backgroundColor: theme.color }}>
                  {theme.icon}
                </span>
                <h3>{theme.label}</h3>
                <span className="theme-count">{count} campagne{count > 1 ? 's' : ''}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CAMPAGNES */}
      {loading ? (
        <div className="loading-state">
          <RefreshCw className="spin" size={40} />
          <p>Chargement des campagnes...</p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="empty-state">
          <Target size={56} />
          <h3>Aucune campagne disponible</h3>
          <p>
            {searchTerm 
              ? 'Aucune campagne ne correspond à votre recherche' 
              : 'Aucune campagne active pour le moment'}
          </p>
        </div>
      ) : (
        <>
          <div className="campaigns-section">
            <div className="section-header">
              <h2>
                {filterTheme === 'all' 
                  ? 'Toutes nos campagnes' 
                  : `Campagnes: ${getThemeInfo(filterTheme)?.label}`}
              </h2>
              <span className="results-count">
                {filteredCampaigns.length} campagne{filteredCampaigns.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="campaigns-grid">
              {filteredCampaigns.map((campaign) => {
                const statusInfo = getStatusInfo(campaign.status);
                const themeInfo = getThemeInfo(campaign.theme);
                const StatusIcon = statusInfo?.icon || Clock;
                
                return (
                  <div key={campaign.id} className="campaign-card">
                    <div className="card-ribbon" style={{ backgroundColor: themeInfo?.color }}>
                      {themeInfo?.icon} {themeInfo?.label}
                    </div>

                    <div className="card-content">
                      <div className="card-header">
                        <h3>{campaign.title}</h3>
                        <span className={`status-badge ${statusInfo?.color}`}>
                          <StatusIcon size={14} />
                          {statusInfo?.label}
                        </span>
                      </div>

                      <div className="card-body">
                        <div className="objective-section">
                          <div className="icon-wrapper">
                            <Target size={18} />
                          </div>
                          <div>
                            <strong>Objectif</strong>
                            <p className="truncate-3">{campaign.objective}</p>
                          </div>
                        </div>

                        <div className="info-row">
                          <div className="info-item">
                            <Users size={16} />
                            <span>{campaign.target_audience}</span>
                          </div>
                        </div>

                        {campaign.partners && (
                          <div className="partners-row">
                            <Award size={14} />
                            <span className="truncate">{campaign.partners}</span>
                          </div>
                        )}

                        <div className="progress-wrapper">
                          <div className="progress-label">
                            <span>Progression</span>
                            <span className={`progress-percent ${getProgressColor(campaign.progress)}`}>
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

                        <div className="timeline-info">
                          <Calendar size={14} />
                          <span>
                            Depuis {new Date(campaign.start_date).toLocaleDateString('fr-FR', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <button 
                          className="btn-details"
                          onClick={() => openDetailsModal(campaign)}
                        >
                          <Eye size={18} />
                          Voir les détails
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* MODAL DÉTAILS */}
      {showDetailsModal && selectedCampaign && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDetailsModal}>
              ×
            </button>

            <div className="modal-header">
              <div className="modal-theme" style={{ 
                backgroundColor: getThemeInfo(selectedCampaign.theme)?.color 
              }}>
                {getThemeInfo(selectedCampaign.theme)?.icon}
              </div>
              <div>
                <h2>{selectedCampaign.title}</h2>
                <div className="modal-meta">
                  <span className="theme-badge">
                    {getThemeInfo(selectedCampaign.theme)?.label}
                  </span>
                  <span className={`status-badge ${getStatusInfo(selectedCampaign.status)?.color}`}>
                    {getStatusInfo(selectedCampaign.status)?.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              {/* Objectif */}
              <div className="detail-block">
                <h3>
                  <Target size={20} />
                  Objectif de la campagne
                </h3>
                <p>{selectedCampaign.objective}</p>
              </div>

              {/* Public cible */}
              <div className="detail-block">
                <h3>
                  <Users size={20} />
                  Public cible
                </h3>
                <p>{selectedCampaign.target_audience}</p>
              </div>

              {/* Messages clés */}
              {selectedCampaign.key_messages && (
                <div className="detail-block">
                  <h3>
                    <MessageCircle size={20} />
                    Messages clés
                  </h3>
                  <p className="whitespace-pre-wrap">{selectedCampaign.key_messages}</p>
                </div>
              )}

              {/* Activités */}
              {selectedCampaign.activities && (
                <div className="detail-block">
                  <h3>
                    <Activity size={20} />
                    Activités et actions
                  </h3>
                  <p className="whitespace-pre-wrap">{selectedCampaign.activities}</p>
                </div>
              )}

              {/* Progression */}
              <div className="detail-block">
                <h3>
                  <TrendingUp size={20} />
                  État d'avancement
                </h3>
                <div className="progress-detail">
                  <div className="progress-bar-large">
                    <div 
                      className={`progress-fill ${getProgressColor(selectedCampaign.progress)}`}
                      style={{ width: `${selectedCampaign.progress}%` }}
                    />
                  </div>
                  <span className={`progress-value ${getProgressColor(selectedCampaign.progress)}`}>
                    {selectedCampaign.progress}%
                  </span>
                </div>
              </div>

              {/* Timeline et Budget */}
              <div className="detail-grid">
                {selectedCampaign.timeline && (
                  <div className="detail-item">
                    <h4>
                      <Clock size={18} />
                      Durée
                    </h4>
                    <p>{selectedCampaign.timeline}</p>
                  </div>
                )}

                {selectedCampaign.budget && (
                  <div className="detail-item">
                    <h4>Budget</h4>
                    <p>{selectedCampaign.budget}</p>
                  </div>
                )}
              </div>

              {/* Partenaires */}
              {selectedCampaign.partners && (
                <div className="detail-block">
                  <h3>
                    <Award size={20} />
                    Partenaires
                  </h3>
                  <p>{selectedCampaign.partners}</p>
                </div>
              )}

              {/* Indicateurs */}
              {selectedCampaign.indicators && (
                <div className="detail-block">
                  <h3>
                    <BarChart size={20} />
                    Indicateurs de succès
                  </h3>
                  <p className="whitespace-pre-wrap">{selectedCampaign.indicators}</p>
                </div>
              )}

              {/* Période */}
              <div className="detail-block">
                <h3>
                  <Calendar size={20} />
                  Période
                </h3>
                <p>
                  <strong>Début:</strong> {new Date(selectedCampaign.start_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  {selectedCampaign.end_date && (
                    <>
                      <br/>
                      <strong>Fin prévue:</strong> {new Date(selectedCampaign.end_date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-close" onClick={closeDetailsModal}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALL TO ACTION */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Soutenez nos actions de plaidoyer</h2>
          <p>
            Votre soutien nous aide à défendre les droits des plus vulnérables et 
            à créer un changement durable dans nos communautés.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary-large">
              En savoir plus
            </button>
            <button className="btn-outline-large">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocacyTracking;