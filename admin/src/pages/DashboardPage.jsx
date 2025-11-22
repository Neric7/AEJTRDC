import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Briefcase,
  DollarSign,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { dashboardAPI } from '../services/adminApi';
import toast from 'react-hot-toast';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivities(),
      ]);

      setStats(statsRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Projets actifs',
      value: stats?.projects || 0,
      icon: <Briefcase size={24} />,
      color: '#0ea5e9',
      change: '+12%',
    },
    {
      title: 'Actualités publiées',
      value: stats?.news || 0,
      icon: <FileText size={24} />,
      color: '#10b981',
      change: '+8%',
    },
    {
      title: 'Bénévoles',
      value: stats?.volunteers || 0,
      icon: <Users size={24} />,
      color: '#f59e0b',
      change: '+25%',
    },
    {
      title: 'Dons ce mois',
      value: `${stats?.donations || 0}€`,
      icon: <DollarSign size={24} />,
      color: '#8b5cf6',
      change: '+18%',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Bienvenue sur votre espace d'administration</p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Graphique d'activité */}
        <div className="card dashboard-chart">
          <div className="card-header">
            <h3 className="card-title">Activité récente</h3>
            <Activity size={20} />
          </div>
          <div className="chart-placeholder">
            <p>Graphique des activités (à intégrer avec Recharts)</p>
          </div>
        </div>

        {/* Alertes actives */}
        <div className="card dashboard-alerts">
          <div className="card-header">
            <h3 className="card-title">Alertes actives</h3>
            <AlertTriangle size={20} />
          </div>
          <div className="alerts-list">
            {stats?.activeAlerts > 0 ? (
              <div className="alert-item">
                <AlertTriangle size={20} className="alert-icon" />
                <div>
                  <p className="alert-title">{stats.activeAlerts} alertes actives</p>
                  <p className="alert-desc">Nécessitent votre attention</p>
                </div>
              </div>
            ) : (
              <p className="no-data">Aucune alerte active</p>
            )}
          </div>
        </div>

        {/* Activités récentes */}
        <div className="card dashboard-activities">
          <div className="card-header">
            <h3 className="card-title">Dernières activités</h3>
          </div>
          <div className="activities-list">
            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.description}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">Aucune activité récente</p>
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="card dashboard-quick-actions">
          <div className="card-header">
            <h3 className="card-title">Actions rapides</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <FileText size={20} />
              <span>Nouvelle actualité</span>
            </button>
            <button className="quick-action-btn">
              <Briefcase size={20} />
              <span>Nouveau projet</span>
            </button>
            <button className="quick-action-btn">
              <AlertTriangle size={20} />
              <span>Nouvelle alerte</span>
            </button>
            <button className="quick-action-btn">
              <Users size={20} />
              <span>Gérer l'équipe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;