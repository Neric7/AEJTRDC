import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Download, TrendingUp, Users, DollarSign, Shield, Award, ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import PolicyDocuments from '../components/transparency/PolicyDocuments';
import ReportsList from '../components/transparency/ReportsList';
import './TransparencyPage.css';

const TransparencyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Déterminer l'onglet actif basé sur l'URL
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/certifications')) return 'certifications';
    return 'policies';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());

  // Mettre à jour l'onglet quand l'URL change
  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
  }, [location.pathname]);

  // Fonction pour changer d'onglet avec navigation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'policies') {
      navigate('/transparency/policies');
    } else if (tab === 'reports') {
      navigate('/transparency/reports');
    } else if (tab === 'certifications') {
      navigate('/transparency/certifications');
    }
  };

  // Statistiques de transparence
  const stats = [
    {
      icon: FileText,
      value: '100%',
      label: 'Transparence Financière',
      description: 'Tous nos rapports sont publics'
    },
    {
      icon: Users,
      value: '25K+',
      label: 'Bénéficiaires',
      description: 'Personnes accompagnées en 2025'
    },
    {
      icon: DollarSign,
      value: '95%',
      label: 'Fonds aux Programmes',
      description: 'Allocation directe aux projets'
    },
    {
      icon: Award,
      value: 'A+',
      label: 'Certification',
      description: 'Standards internationaux'
    }
  ];

  // Certifications et accréditations
  const certifications = [
    {
      name: 'Core Humanitarian Standard (CHS)',
      year: '2024',
      status: 'Certifié',
      icon: Shield
    },
    {
      name: 'Protection de l\'Enfance (PSEA)',
      year: '2024',
      status: 'Accrédité',
      icon: Shield
    },
    {
      name: 'Norme Humanitaire Internationale',
      year: '2023',
      status: 'Conforme',
      icon: Award
    }
  ];

  // Documents récents
  const recentDocuments = [
    {
      title: 'Rapport Annuel 2024',
      type: 'Rapport Financier',
      date: '15 Janvier 2025',
      size: '2.3 MB',
      downloads: 1245
    },
    {
      title: 'Audit Externe 2024',
      type: 'Audit',
      date: '28 Décembre 2024',
      size: '1.8 MB',
      downloads: 892
    },
    {
      title: 'Rapport d\'Impact Q4 2024',
      type: 'Impact',
      date: '10 Janvier 2025',
      size: '3.1 MB',
      downloads: 2156
    }
  ];

  return (
    <div className="transparency-page">
      {/* Hero Section */}
      <section className="transparency-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={20} />
            <span>Transparence & Redevabilité</span>
          </div>
          <h1 className="hero-title">
            Notre Engagement pour la Transparence
          </h1>
          <p className="hero-description">
            Nous croyons fermement que la transparence est la pierre angulaire de la confiance. 
            Découvrez nos politiques internes, nos rapports financiers et nos engagements envers 
            les normes humanitaires internationales.
          </p>
          
          {/* Stats rapides */}
          <div className="hero-stats">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-description">{stat.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="transparency-tabs-section">
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => handleTabChange('policies')}
          >
            <Shield size={20} />
            <span>Politiques Internes</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => handleTabChange('reports')}
          >
            <FileText size={20} />
            <span>Rapports & Audits</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => handleTabChange('certifications')}
          >
            <Award size={20} />
            <span>Certifications</span>
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <section className="transparency-content">
        {/* Politiques Internes */}
        {activeTab === 'policies' && (
          <div className="content-section">
            <PolicyDocuments />
          </div>
        )}

        {/* Rapports & Audits */}
        {activeTab === 'reports' && (
          <div className="content-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Rapports Financiers & Audits</h2>
                <p className="section-subtitle">
                  Accédez à l'ensemble de nos rapports financiers, audits externes et rapports d'impact
                </p>
              </div>
              <button className="btn-primary">
                <Download size={18} />
                Télécharger Tout
              </button>
            </div>

            {/* Documents récents en vedette */}
            <div className="featured-documents">
              <h3 className="subsection-title">Documents Récents</h3>
              <div className="documents-grid">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="document-card">
                    <div className="document-header">
                      <div className="document-icon">
                        <FileText size={24} />
                      </div>
                      <div className="document-meta">
                        <h4>{doc.title}</h4>
                        <span className="document-type">{doc.type}</span>
                      </div>
                    </div>
                    <div className="document-info">
                      <span className="info-item">
                        <Calendar size={14} />
                        {doc.date}
                      </span>
                      <span className="info-item">
                        {doc.size}
                      </span>
                      <span className="info-item">
                        <TrendingUp size={14} />
                        {doc.downloads} téléchargements
                      </span>
                    </div>
                    <button className="btn-download-doc">
                      <Download size={16} />
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Liste complète des rapports */}
            <ReportsList />
          </div>
        )}

        {/* Certifications */}
        {activeTab === 'certifications' && (
          <div className="content-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Certifications & Accréditations</h2>
                <p className="section-subtitle">
                  Nos engagements envers les standards internationaux de qualité et de redevabilité
                </p>
              </div>
            </div>

            <div className="certifications-grid">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div key={index} className="certification-card">
                    <div className="cert-icon-wrapper">
                      <Icon size={32} />
                    </div>
                    <div className="cert-content">
                      <h3>{cert.name}</h3>
                      <div className="cert-details">
                        <span className="cert-status">{cert.status}</span>
                        <span className="cert-divider">•</span>
                        <span className="cert-year">Depuis {cert.year}</span>
                      </div>
                    </div>
                    <button className="btn-view-cert">
                      <ExternalLink size={16} />
                      Voir le certificat
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Standards & Engagements */}
            <div className="standards-section">
              <h3 className="subsection-title">Nos Standards & Engagements</h3>
              <div className="standards-grid">
                <div className="standard-item">
                  <div className="standard-number">01</div>
                  <h4>Redevabilité</h4>
                  <p>Engagement envers les populations affectées et nos partenaires</p>
                </div>
                <div className="standard-item">
                  <div className="standard-number">02</div>
                  <h4>Efficacité</h4>
                  <p>Maximisation de l'impact de chaque euro investi</p>
                </div>
                <div className="standard-item">
                  <div className="standard-number">03</div>
                  <h4>Intégrité</h4>
                  <p>Tolérance zéro pour la fraude et la corruption</p>
                </div>
                <div className="standard-item">
                  <div className="standard-number">04</div>
                  <h4>Protection</h4>
                  <p>Sauvegarde des enfants et prévention de l'exploitation</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="transparency-cta">
        <div className="cta-content">
          <h2>Vous avez des questions sur notre transparence ?</h2>
          <p>
            Notre équipe est disponible pour répondre à toutes vos questions concernant 
            nos politiques, nos finances ou nos engagements.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary-large">
              <span>Nous Contacter</span>
              <ArrowRight size={20} />
            </button>
            <button className="btn-secondary-large">
              <FileText size={20} />
              <span>Demander un Document</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransparencyPage;