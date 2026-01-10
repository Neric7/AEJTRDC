import React, { useState } from 'react';
import { Shield, AlertTriangle, Target, FileText } from 'lucide-react';
import EthicalCommitments from '../components/humanitarian/EthicalCommitments';
import ViolationReport from '../components/humanitarian/ViolationReport';
import HumanitarianAlerts from '../components/humanitarian/HumanitarianAlerts';
import AdvocacyTracking from '../components/humanitarian/AdvocacyTracking';
import './HumanitarianSpacePage.css';

const HumanitarianSpacePage = () => {
  const [activeTab, setActiveTab] = useState('commitments');

  const tabs = [
    {
      id: 'commitments',
      label: 'Engagements Éthiques',
      icon: Shield,
      component: EthicalCommitments,
      description: 'Principes humanitaires et normes éthiques'
    },
    {
      id: 'violations',
      label: 'Signalements',
      icon: AlertTriangle,
      component: ViolationReport,
      description: 'Gestion des violations et incidents'
    },
    {
      id: 'alerts',
      label: 'Alertes Humanitaires',
      icon: AlertTriangle,
      component: HumanitarianAlerts,
      description: 'Crises et situations d\'urgence'
    },
    {
      id: 'advocacy',
      label: 'Plaidoyer',
      icon: Target,
      component: AdvocacyTracking,
      description: 'Suivi des campagnes de plaidoyer'
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="humanitarian-space-page">
      <div className="page-hero">
        <div className="hero-content">
          <h1>Espace Humanitaire</h1>
          <p>
            Gestion des principes humanitaires, engagements éthiques et interventions d'urgence
          </p>
        </div>
      </div>

      <div className="tabs-navigation">
        <div className="tabs-container">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <div className="tab-content">
                  <span className="tab-label">{tab.label}</span>
                  <span className="tab-description">{tab.description}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="tab-content-container">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default HumanitarianSpacePage;