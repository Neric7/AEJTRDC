import React, { useState } from 'react';
import TeamGrid from '../components/team/TeamGrid';
import OrganizationChart from '../components/team/OrganizationChart';
import { Users, Shield, Network } from 'lucide-react';
import './TeamPage.css';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('organigramme');

  return (
    <div className="team-page">
      
      <div className="team-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title" style={{ color: 'white' }}>Notre Équipe</h1>
            <p className="hero-subtitle" style={{ color: 'white' }}>
              Découvrez les personnes dévouées qui dirigent et coordonnent les actions de CEFOD
            </p>
          </div>
        </div>
      </div>

      <div className="team-container">
        <div className="team-tabs">
          <button
            className={`tab-button ${activeTab === 'organigramme' ? 'active' : ''}`}
            onClick={() => setActiveTab('organigramme')}
          >
            <Network size={20} />
            <span>Organigramme</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'conseil' ? 'active' : ''}`}
            onClick={() => setActiveTab('conseil')}
          >
            <Shield size={20} />
            <span>Conseil d'Administration</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'coordination' ? 'active' : ''}`}
            onClick={() => setActiveTab('coordination')}
          >
            <Users size={20} />
            <span>Équipe de Coordination</span>
          </button>
        </div>

        <div className="team-content">
          {activeTab === 'organigramme' && (
            <div className="tab-panel">
              <div className="section-intro">
                <h2>Structure Organisationnelle</h2>
                <p>
                  Visualisez la hiérarchie et la structure de gouvernance de CEFOD. 
                  L'organigramme présente les relations entre le Conseil d'Administration 
                  et l'Équipe de Coordination opérationnelle.
                </p>
              </div>
              <OrganizationChart />
            </div>
          )}

          {activeTab === 'conseil' && (
            <div className="tab-panel">
              <div className="section-intro">
                <h2>Conseil d'Administration</h2>
                <p>
                  Le Conseil d'Administration définit la vision stratégique et supervise 
                  la gouvernance de l'organisation pour garantir l'alignement avec notre mission.
                </p>
              </div>
              <TeamGrid 
                category="conseil_administration"
              />
            </div>
          )}

          {activeTab === 'coordination' && (
            <div className="tab-panel">
              <div className="section-intro">
                <h2>Équipe de Coordination</h2>
                <p>
                  Notre équipe de coordination assure la mise en œuvre opérationnelle des projets 
                  et la gestion quotidienne des activités de CEFOD sur le terrain.
                </p>
              </div>
              <TeamGrid 
                category="coordination"
              />
            </div>
          )}
        </div>

        <div className="team-cta">
          <div className="cta-content">
            <h3>Rejoignez Notre Équipe</h3>
            <p>
              Vous partagez nos valeurs et souhaitez contribuer à notre mission ? 
              Découvrez nos opportunités de carrière et de bénévolat.
            </p>
            <div className="cta-buttons">
              <a href="/careers" className="cta-button primary">
                Opportunités de Carrière
              </a>
              <a href="/volunteer" className="cta-button secondary">
                Devenir Bénévole
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;