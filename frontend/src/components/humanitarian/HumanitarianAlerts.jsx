// ============================================
// FRONTEND PUBLIC - Alertes Humanitaires
// Chemin: frontend/src/pages/humanitarian/HumanitarianAlerts.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, MapPin, Users, Calendar, Phone, 
  User, Filter, RefreshCw, Bell, Info
} from 'lucide-react';
import humanitarianService from '../../services/humanitarian';
import './HumanitarianAlerts.css';

const HumanitarianAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

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
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await humanitarianService.getAlerts();
      // Ne garder que les alertes actives (double vérification)
      setAlerts(data.filter(alert => alert.is_active));
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    return severityLevels.find(s => s.value === severity)?.color || 'gray';
  };

  const getAlertTypeInfo = (type) => {
    return alertTypes.find(t => t.value === type);
  };

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filter === 'all' || alert.alert_type === filter;
    const severityMatch = severityFilter === 'all' || alert.severity === severityFilter;
    return typeMatch && severityMatch;
  });

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const highCount = alerts.filter(a => a.severity === 'high').length;

  return (
    <div className="humanitarian-alerts-public">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <Bell className="hero-icon" size={48} />
            <h1>Alertes Humanitaires</h1>
            <p>Situations d'urgence et crises humanitaires en cours à Madagascar</p>
          </div>

          {(criticalCount > 0 || highCount > 0) && (
            <div className="alert-banner critical">
              <AlertTriangle size={24} />
              <div>
                <strong>Situation d'urgence !</strong>
                <p>
                  {criticalCount > 0 && `${criticalCount} alerte${criticalCount > 1 ? 's' : ''} critique${criticalCount > 1 ? 's' : ''}`}
                  {criticalCount > 0 && highCount > 0 && ' et '}
                  {highCount > 0 && `${highCount} alerte${highCount > 1 ? 's' : ''} à sévérité élevée`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="container">
          <div className="filters-header">
            <Filter size={20} />
            <h3>Filtrer les alertes</h3>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label>Type d'alerte</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Toutes les alertes</option>
                {alertTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Niveau de sévérité</label>
              <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
                <option value="all">Tous les niveaux</option>
                {severityLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="results-count">
            <Info size={18} />
            <span>{filteredAlerts.length} alerte{filteredAlerts.length > 1 ? 's' : ''} active{filteredAlerts.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="alerts-container">
        <div className="container">
          {loading ? (
            <div className="loading-state">
              <RefreshCw className="spin" size={48} />
              <p>Chargement des alertes...</p>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="empty-state">
              <Bell size={64} />
              <h3>Aucune alerte active</h3>
              <p>Aucune alerte humanitaire ne correspond à vos critères de recherche</p>
            </div>
          ) : (
            <div className="alerts-grid">
              {filteredAlerts.map((alert) => {
                const typeInfo = getAlertTypeInfo(alert.alert_type);
                
                return (
                  <div key={alert.id} className={`alert-card severity-${alert.severity}`}>
                    {/* Header */}
                    <div className="alert-header">
                      <div className="alert-type-badge">
                        <span className="type-icon">{typeInfo?.icon}</span>
                        <span className="type-label">{typeInfo?.label}</span>
                      </div>
                      <span className={`severity-badge ${getSeverityColor(alert.severity)}`}>
                        {severityLevels.find(s => s.value === alert.severity)?.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="alert-title">{alert.title}</h3>

                    {/* Location & Population */}
                    <div className="alert-meta">
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{alert.location}</span>
                      </div>
                      {alert.affected_population && (
                        <div className="meta-item">
                          <Users size={16} />
                          <span>{alert.affected_population}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="alert-description">{alert.description}</p>

                    {/* Needs */}
                    {alert.needs_identified && (
                      <div className="alert-section">
                        <h4>🆘 Besoins identifiés</h4>
                        <p>{alert.needs_identified}</p>
                      </div>
                    )}

                    {/* Response Actions */}
                    {alert.response_actions && (
                      <div className="alert-section">
                        <h4>✅ Actions en cours</h4>
                        <p>{alert.response_actions}</p>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="alert-contact">
                      <div className="contact-title">
                        <Phone size={16} />
                        <strong>Contact d'urgence</strong>
                      </div>
                      <div className="contact-details">
                        <div className="contact-item">
                          <User size={14} />
                          <span>{alert.contact_person}</span>
                        </div>
                        <div className="contact-item">
                          <Phone size={14} />
                          <a href={`tel:${alert.contact_phone}`}>{alert.contact_phone}</a>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="alert-footer">
                      <div className="alert-dates">
                        <Calendar size={14} />
                        <span>Depuis le {new Date(alert.start_date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      {alert.end_date && (
                        <div className="alert-end-date">
                          Fin prévue: {new Date(alert.end_date).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <div className="container">
          <AlertTriangle size={24} />
          <div>
            <h4>Besoin d'aide ou d'informations ?</h4>
            <p>Si vous êtes concerné par une de ces situations ou si vous souhaitez contribuer, contactez-nous immédiatement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanitarianAlerts;