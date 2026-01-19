import { useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './ActivityChart.css';

const ActivityChart = ({ data, type = 'line' }) => {
  // Préparer les données pour le graphique
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      // Données de démonstration si pas de données
      return [
        { name: 'Lun', volunteers: 4, news: 2, projects: 1, domains: 0 },
        { name: 'Mar', volunteers: 3, news: 1, projects: 2, domains: 1 },
        { name: 'Mer', volunteers: 7, news: 3, projects: 1, domains: 0 },
        { name: 'Jeu', volunteers: 5, news: 2, projects: 3, domains: 1 },
        { name: 'Ven', volunteers: 8, news: 4, projects: 2, domains: 2 },
        { name: 'Sam', volunteers: 6, news: 1, projects: 1, domains: 0 },
        { name: 'Dim', volunteers: 4, news: 2, projects: 0, domains: 1 },
      ];
    }
    return data;
  }, [data]);

  // Configuration des couleurs
  const colors = {
    volunteers: '#f59e0b',
    news: '#10b981',
    projects: '#0ea5e9',
    domains: '#6366f1',
  };

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.name}: <strong>{entry.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.volunteers} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.volunteers} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.news} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.news} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.projects} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.projects} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDomains" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.domains} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.domains} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '0.75rem' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '0.875rem' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="volunteers"
            name="Bénévoles"
            stroke={colors.volunteers}
            fillOpacity={1}
            fill="url(#colorVolunteers)"
          />
          <Area
            type="monotone"
            dataKey="news"
            name="Actualités"
            stroke={colors.news}
            fillOpacity={1}
            fill="url(#colorNews)"
          />
          <Area
            type="monotone"
            dataKey="projects"
            name="Projets"
            stroke={colors.projects}
            fillOpacity={1}
            fill="url(#colorProjects)"
          />
          <Area
            type="monotone"
            dataKey="domains"
            name="Domaines"
            stroke={colors.domains}
            fillOpacity={1}
            fill="url(#colorDomains)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Par défaut: LineChart
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280"
          style={{ fontSize: '0.75rem' }}
        />
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: '0.75rem' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ fontSize: '0.875rem' }}
          iconType="circle"
        />
        <Line
          type="monotone"
          dataKey="volunteers"
          name="Bénévoles"
          stroke={colors.volunteers}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="news"
          name="Actualités"
          stroke={colors.news}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="projects"
          name="Projets"
          stroke={colors.projects}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="domains"
          name="Domaines"
          stroke={colors.domains}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;