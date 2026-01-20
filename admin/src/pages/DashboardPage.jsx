import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Handshake,
  Briefcase,
  DollarSign,
  AlertTriangle,
  Activity,
  Layers,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  MessageSquare,
  Calendar,
  BarChart2,
  PieChart
} from 'lucide-react';
import { dashboardAPI } from '../services/adminApi';
import toast from 'react-hot-toast';
import ActivityChart from '../components/Dashboard/ActivityChart';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('line'); // 'line' ou 'area'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes, alertsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivities(),
        dashboardAPI.getActiveAlerts(),
      ]);

      setStats(statsRes.data);
      setActivities(activitiesRes.data);
      setAlerts(alertsRes.data || []);
      
      // Générer les données du graphique (7 derniers jours)
      setChartData(generateChartData(activitiesRes.data));
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Générer les données pour le graphique à partir des activités
  const generateChartData = (activitiesData) => {
    const today = new Date();
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayName = days[date.getDay()];
      
      // Compter les activités par type pour ce jour
      const dayActivities = activitiesData.filter(activity => {
        const activityDate = new Date(activity.created_at);
        return activityDate.toDateString() === date.toDateString();
      });

      data.push({
        name: dayName,
        volunteers: dayActivities.filter(a => a.type === 'volunteer').length,
        news: dayActivities.filter(a => a.type === 'news').length,
        projects: dayActivities.filter(a => a.type === 'project').length,
        domains: dayActivities.filter(a => a.type === 'domain').length,
      });
    }

    return data;
  };

  // ... (reste du code - formatRelativeTime, getActivityIcon, getAlertSeverity, etc.)

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);
    const diffInMonths = Math.floor(diffInMs / 2592000000);

    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInDays < 30) return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    return `Il y a ${diffInMonths} mois`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'volunteer':
        return <UserPlus size={16} className="activity-icon volunteer" />;
      case 'domain':
        return <Layers size={16} className="activity-icon domain" />;
      case 'news':
        return <FileText size={16} className="activity-icon news" />;
      case 'project':
        return <Briefcase size={16} className="activity-icon project" />;
      case 'comment':
        return <MessageSquare size={16} className="activity-icon comment" />;
      default:
        return <Activity size={16} className="activity-icon default" />;
    }
  };

  const getAlertSeverity = (severity) => {
    switch (severity) {
      case 'critical':
        return { icon: <XCircle size={20} />, className: 'alert-critical', label: 'Critique' };
      case 'warning':
        return { icon: <AlertTriangle size={20} />, className: 'alert-warning', label: 'Attention' };
      case 'info':
        return { icon: <CheckCircle size={20} />, className: 'alert-info', label: 'Information' };
      default:
        return { icon: <AlertTriangle size={20} />, className: 'alert-warning', label: 'Alerte' };
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
      title: 'Domaines',
      value: stats?.domains || 0,
      icon: <Layers size={24} />,
      color: '#6366f1',
      change: '+5%',
    },
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
      title: 'Partenaires',
      value: stats?.partners || 0,
      icon: <Handshake size={24} />,
      color: '#ec4899',
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
          <Calendar size={16} />
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
        {/* ✅ Graphique d'activité - NOUVEAU */}
        <div className="card dashboard-chart">
          <div className="card-header">
            <h3 className="card-title">Activité des 7 derniers jours</h3>
            <div className="chart-controls">
              <button
                className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
              >
                <BarChart2 size={16} />
              </button>
              <button
                className={`chart-type-btn ${chartType === 'area' ? 'active' : ''}`}
                onClick={() => setChartType('area')}
              >
                <PieChart size={16} />
              </button>
            </div>
          </div>
          <ActivityChart data={chartData} type={chartType} />
        </div>

        {/* Alertes actives */}
        <div className="card dashboard-alerts">
          <div className="card-header">
            <h3 className="card-title">
              Alertes actives
              {alerts.length > 0 && (
                <span className="alert-badge">{alerts.length}</span>
              )}
            </h3>
            <AlertTriangle size={20} />
          </div>
          <div className="alerts-list">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => {
                const severity = getAlertSeverity(alert.severity);
                return (
                  <div key={index} className={`alert-item ${severity.className}`}>
                    <div className="alert-icon-wrapper">
                      {severity.icon}
                    </div>
                    <div className="alert-content">
                      <div className="alert-header">
                        <span className="alert-severity">{severity.label}</span>
                        <span className="alert-time">
                          <Clock size={12} />
                          {formatRelativeTime(alert.created_at)}
                        </span>
                      </div>
                      <p className="alert-title">{alert.title}</p>
                      <p className="alert-desc">{alert.description}</p>
                    </div>
                    <button className="alert-dismiss" onClick={() => {/* handle dismiss */}}>
                      ×
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="no-data-box">
                <CheckCircle size={40} className="no-data-icon" />
                <p className="no-data-title">Tout est en ordre !</p>
                <p className="no-data-text">Aucune alerte active pour le moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Activités récentes */}
        <div className="card dashboard-activities">
          <div className="card-header">
            <h3 className="card-title">Dernières activités</h3>
            <button className="btn-refresh" onClick={fetchDashboardData}>
              <Activity size={16} />
              Actualiser
            </button>
          </div>
          <div className="activities-list">
            {activities.length > 0 ? (
              activities.slice(0, 8).map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon-wrapper">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.description}</p>
                    <p className="activity-time">
                      <Clock size={12} />
                      {formatRelativeTime(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-box">
                <Activity size={40} className="no-data-icon" />
                <p className="no-data-title">Aucune activité récente</p>
                <p className="no-data-text">Les activités apparaîtront ici</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="card dashboard-quick-actions">
          <div className="card-header">
            <h3 className="card-title">Actions rapides</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => window.location.href = '/content/domains'}>
              <Layers size={20} />
              <span>Nouveau domaine</span>
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/content/news'}>
              <FileText size={20} />
              <span>Nouvelle actualité</span>
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/content/projects'}>
              <Briefcase size={20} />
              <span>Nouveau projet</span>
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/humanitarian/alerts'}>
              <AlertTriangle size={20} />
              <span>Nouvelle alerte</span>
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/content/team'}>
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