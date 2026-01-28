import React, { useState } from 'react';
import { Download, FileText, TrendingUp, Calendar, Search, Filter, Eye, ExternalLink } from 'lucide-react';
import './ReportsList.css';

const ReportsList = () => {
  const [activeYear, setActiveYear] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données des rapports
  const reports = [
    {
      id: 1,
      title: 'Rapport Annuel 2024',
      type: 'annual',
      year: 2024,
      date: '15 Janvier 2025',
      size: '2.3 MB',
      pages: 68,
      downloads: 1245,
      description: 'Rapport complet des activités, réalisations et finances de l\'année 2024.',
      language: 'FR/EN',
      downloadUrl: '/documents/rapport-annuel-2024.pdf',
      viewUrl: '/documents/rapport-annuel-2024.pdf'
    },
    {
      id: 2,
      title: 'Audit Externe 2024',
      type: 'audit',
      year: 2024,
      date: '28 Décembre 2024',
      size: '1.8 MB',
      pages: 42,
      downloads: 892,
      description: 'Audit financier indépendant réalisé par cabinet Ernst & Young.',
      language: 'FR',
      downloadUrl: '/documents/audit-externe-2024.pdf',
      viewUrl: '/documents/audit-externe-2024.pdf'
    },
    {
      id: 3,
      title: 'Rapport d\'Impact Q4 2024',
      type: 'impact',
      year: 2024,
      date: '10 Janvier 2025',
      size: '3.1 MB',
      pages: 56,
      downloads: 2156,
      description: 'Mesure de l\'impact de nos programmes auprès des bénéficiaires pour le Q4 2024.',
      language: 'FR/EN/SW',
      downloadUrl: '/documents/impact-q4-2024.pdf',
      viewUrl: '/documents/impact-q4-2024.pdf'
    },
    {
      id: 4,
      title: 'États Financiers 2024',
      type: 'financial',
      year: 2024,
      date: '30 Décembre 2024',
      size: '1.5 MB',
      pages: 35,
      downloads: 678,
      description: 'États financiers audités avec bilan, compte de résultat et notes explicatives.',
      language: 'FR',
      downloadUrl: '/documents/etats-financiers-2024.pdf',
      viewUrl: '/documents/etats-financiers-2024.pdf'
    },
    {
      id: 5,
      title: 'Rapport Annuel 2023',
      type: 'annual',
      year: 2023,
      date: '18 Janvier 2024',
      size: '2.1 MB',
      pages: 64,
      downloads: 3421,
      description: 'Rapport complet des activités, réalisations et finances de l\'année 2023.',
      language: 'FR/EN',
      downloadUrl: '/documents/rapport-annuel-2023.pdf',
      viewUrl: '/documents/rapport-annuel-2023.pdf'
    },
    {
      id: 6,
      title: 'Audit Externe 2023',
      type: 'audit',
      year: 2023,
      date: '22 Décembre 2023',
      size: '1.7 MB',
      pages: 38,
      downloads: 1567,
      description: 'Audit financier indépendant réalisé par cabinet Ernst & Young.',
      language: 'FR',
      downloadUrl: '/documents/audit-externe-2023.pdf',
      viewUrl: '/documents/audit-externe-2023.pdf'
    },
    {
      id: 7,
      title: 'Rapport d\'Impact 2023',
      type: 'impact',
      year: 2023,
      date: '15 Janvier 2024',
      size: '2.9 MB',
      pages: 52,
      downloads: 2845,
      description: 'Analyse complète de l\'impact social de nos interventions en 2023.',
      language: 'FR/EN/SW',
      downloadUrl: '/documents/impact-2023.pdf',
      viewUrl: '/documents/impact-2023.pdf'
    },
    {
      id: 8,
      title: 'États Financiers 2023',
      type: 'financial',
      year: 2023,
      date: '28 Décembre 2023',
      size: '1.4 MB',
      pages: 33,
      downloads: 1234,
      description: 'États financiers audités pour l\'exercice fiscal 2023.',
      language: 'FR',
      downloadUrl: '/documents/etats-financiers-2023.pdf',
      viewUrl: '/documents/etats-financiers-2023.pdf'
    },
    {
      id: 9,
      title: 'Rapport Annuel 2022',
      type: 'annual',
      year: 2022,
      date: '20 Janvier 2023',
      size: '1.9 MB',
      pages: 58,
      downloads: 4123,
      description: 'Rapport annuel complet de l\'année 2022.',
      language: 'FR/EN',
      downloadUrl: '/documents/rapport-annuel-2022.pdf',
      viewUrl: '/documents/rapport-annuel-2022.pdf'
    },
    {
      id: 10,
      title: 'Audit Externe 2022',
      type: 'audit',
      year: 2022,
      date: '19 Décembre 2022',
      size: '1.6 MB',
      pages: 36,
      downloads: 1890,
      description: 'Audit financier indépendant pour l\'exercice 2022.',
      language: 'FR',
      downloadUrl: '/documents/audit-externe-2022.pdf',
      viewUrl: '/documents/audit-externe-2022.pdf'
    },
    {
      id: 11,
      title: 'Rapport de Gouvernance 2024',
      type: 'governance',
      year: 2024,
      date: '05 Janvier 2025',
      size: '1.2 MB',
      pages: 28,
      downloads: 456,
      description: 'Rapport sur la gouvernance, le conseil d\'administration et les processus décisionnels.',
      language: 'FR',
      downloadUrl: '/documents/gouvernance-2024.pdf',
      viewUrl: '/documents/gouvernance-2024.pdf'
    },
    {
      id: 12,
      title: 'Rapport de Transparence 2024',
      type: 'transparency',
      year: 2024,
      date: '08 Janvier 2025',
      size: '980 KB',
      pages: 22,
      downloads: 567,
      description: 'Engagement de transparence, mécanismes de redevabilité et système de plaintes.',
      language: 'FR/EN',
      downloadUrl: '/documents/transparence-2024.pdf',
      viewUrl: '/documents/transparence-2024.pdf'
    }
  ];

  // Types de rapports
  const reportTypes = [
    { id: 'all', label: 'Tous les rapports', count: reports.length },
    { id: 'annual', label: 'Rapports Annuels', count: reports.filter(r => r.type === 'annual').length },
    { id: 'audit', label: 'Audits', count: reports.filter(r => r.type === 'audit').length },
    { id: 'financial', label: 'États Financiers', count: reports.filter(r => r.type === 'financial').length },
    { id: 'impact', label: 'Rapports d\'Impact', count: reports.filter(r => r.type === 'impact').length },
    { id: 'governance', label: 'Gouvernance', count: reports.filter(r => r.type === 'governance').length },
    { id: 'transparency', label: 'Transparence', count: reports.filter(r => r.type === 'transparency').length }
  ];

  // Années disponibles
  const years = [
    { id: 'all', label: 'Toutes les années' },
    { id: 2024, label: '2024' },
    { id: 2023, label: '2023' },
    { id: 2022, label: '2022' }
  ];

  // Fonction de filtrage
  const filteredReports = reports.filter(report => {
    const matchesYear = activeYear === 'all' || report.year === activeYear;
    const matchesType = activeType === 'all' || report.type === activeType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesType && matchesSearch;
  });

  // Fonction pour obtenir le badge de type
  const getTypeBadge = (type) => {
    const badges = {
      annual: { label: 'Rapport Annuel', color: '#2C5F2D' },
      audit: { label: 'Audit', color: '#C41E3A' },
      financial: { label: 'Financier', color: '#0077B6' },
      impact: { label: 'Impact', color: '#FF6B35' },
      governance: { label: 'Gouvernance', color: '#7B2CBF' },
      transparency: { label: 'Transparence', color: '#06A77D' }
    };
    return badges[type] || { label: type, color: '#718096' };
  };

  return (
    <div className="reports-list-container">
      {/* En-tête avec recherche */}
      <div className="reports-header">
        <div className="reports-title-section">
          <h2 className="reports-title">Bibliothèque de Rapports</h2>
          <p className="reports-subtitle">
            Consultez l'ensemble de nos rapports financiers, audits et documents de transparence
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="reports-search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Rechercher un rapport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filtres */}
      <div className="reports-filters">
        {/* Filtres par année */}
        <div className="filter-group">
          <div className="filter-label">
            <Calendar size={16} />
            <span>Année</span>
          </div>
          <div className="filter-buttons">
            {years.map(year => (
              <button
                key={year.id}
                onClick={() => setActiveYear(year.id)}
                className={`filter-btn ${activeYear === year.id ? 'active' : ''}`}
              >
                {year.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtres par type */}
        <div className="filter-group">
          <div className="filter-label">
            <Filter size={16} />
            <span>Type de document</span>
          </div>
          <div className="filter-buttons">
            {reportTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`filter-btn ${activeType === type.id ? 'active' : ''}`}
              >
                {type.label}
                <span className="filter-count">{type.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="reports-results">
        <div className="results-count">
          <FileText size={18} />
          <span>{filteredReports.length} rapport{filteredReports.length > 1 ? 's' : ''} trouvé{filteredReports.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Liste des rapports */}
      {filteredReports.length > 0 ? (
        <div className="reports-grid">
          {filteredReports.map(report => {
            const badge = getTypeBadge(report.type);
            return (
              <div key={report.id} className="report-card">
                {/* En-tête */}
                <div className="report-card-header">
                  <div className="report-icon">
                    <FileText size={24} />
                  </div>
                  <div className="report-meta">
                    <span 
                      className="report-badge"
                      style={{ backgroundColor: `${badge.color}15`, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                    <span className="report-year">{report.year}</span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="report-content">
                  <h3 className="report-title">{report.title}</h3>
                  <p className="report-description">{report.description}</p>
                </div>

                {/* Informations */}
                <div className="report-info">
                  <div className="info-row">
                    <span className="info-item">
                      <Calendar size={14} />
                      {report.date}
                    </span>
                    <span className="info-item">
                      {report.pages} pages
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-item">
                      {report.size}
                    </span>
                    <span className="info-item">
                      🌐 {report.language}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-item downloads">
                      <TrendingUp size={14} />
                      {report.downloads.toLocaleString()} téléchargements
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="report-actions">
                  <button className="btn-view">
                    <Eye size={16} />
                    <span>Consulter</span>
                  </button>
                  <button className="btn-download">
                    <Download size={16} />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-reports">
          <FileText size={64} className="no-reports-icon" />
          <h3>Aucun rapport trouvé</h3>
          <p>Essayez de modifier vos critères de recherche ou de filtrage.</p>
          <button 
            className="btn-reset"
            onClick={() => {
              setActiveYear('all');
              setActiveType('all');
              setSearchTerm('');
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Pied de page informatif */}
      <div className="reports-footer">
        <div className="footer-info-card">
          <FileText size={24} />
          <div>
            <h4>Publication Régulière</h4>
            <p>Nos rapports sont publiés annuellement et trimestriellement</p>
          </div>
        </div>
        <div className="footer-info-card">
          <ExternalLink size={24} />
          <div>
            <h4>Format Accessible</h4>
            <p>Tous nos documents sont disponibles en PDF avec accessibilité</p>
          </div>
        </div>
        <div className="footer-info-card">
          <TrendingUp size={24} />
          <div>
            <h4>Historique Complet</h4>
            <p>Archives disponibles depuis la création de l'organisation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsList;