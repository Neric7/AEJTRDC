import React, { useState, useEffect } from 'react';
import { User, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import teamService from '../../services/teamService';
import './OrganizationChart.css';

const OrganizationChart = () => {
  const [conseilMembers, setConseilMembers] = useState([]);
  const [coordinationMembers, setCoordinationMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    conseil: true,
    coordination: true
  });

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const fetchAllMembers = async () => {
    try {
      setLoading(true);
      const [conseilResult, coordinationResult] = await Promise.all([
        teamService.getMembers('conseil_administration'),
        teamService.getMembers('coordination')
      ]);

      if (conseilResult.success) {
        setConseilMembers(conseilResult.data);
      }
      if (coordinationResult.success) {
        setCoordinationMembers(coordinationResult.data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const MemberNode = ({ member, isPresident = false, isCoordinator = false }) => (
    <div className={`org-node ${isPresident ? 'president' : ''} ${isCoordinator ? 'coordinator' : ''}`}>
      <div className="node-photo">
        {member.photo ? (
          <img src={member.photo} alt={member.full_name} />
        ) : (
          <div className="node-photo-placeholder">
            <User size={24} />
          </div>
        )}
      </div>
      <div className="node-info">
        <h4 className="node-name">{member.full_name}</h4>
        <p className="node-position">{member.position}</p>
        {member.role && <p className="node-role">{member.role}</p>}
        <div className="node-contact">
          {member.email && (
            <a href={`mailto:${member.email}`} title={member.email}>
              <Mail size={14} />
            </a>
          )}
          {member.phone && (
            <a href={`tel:${member.phone}`} title={member.phone}>
              <Phone size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="org-chart-loading">
        <div className="spinner"></div>
        <p>Chargement de l'organigramme...</p>
      </div>
    );
  }

  // Trouver le président et les autres membres du conseil
  const president = conseilMembers.find(m => m.position.toLowerCase().includes('président'));
  const vicePresident = conseilMembers.find(m => m.position.toLowerCase().includes('vice'));
  const otherConseilMembers = conseilMembers.filter(m => 
    m.id !== president?.id && m.id !== vicePresident?.id
  );

  // Trouver le coordonnateur et les autres membres de la coordination
  const coordinator = coordinationMembers.find(m => 
    m.position.toLowerCase().includes('coordonnateur') || 
    m.position.toLowerCase().includes('coordinateur')
  );
  const directors = coordinationMembers.filter(m => 
    m.id !== coordinator?.id && 
    (m.position.toLowerCase().includes('directeur') || m.position.toLowerCase().includes('director'))
  );
  const otherCoordinationMembers = coordinationMembers.filter(m => 
    m.id !== coordinator?.id && 
    !directors.some(d => d.id === m.id)
  );

  return (
    <div className="organization-chart">
      <div className="org-chart-header">
        <h2>Organigramme de CEFOD</h2>
        <p>Structure organisationnelle et hiérarchique</p>
      </div>

      <div className="org-chart-container">
        {/* Niveau 1: Conseil d'Administration */}
        <div className="org-level conseil-level">
          <div className="level-header" onClick={() => toggleSection('conseil')}>
            <h3>Conseil d'Administration</h3>
            {expandedSections.conseil ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSections.conseil && (
            <div className="level-content">
              {/* Président */}
              {president && (
                <div className="org-row president-row">
                  <MemberNode member={president} isPresident={true} />
                </div>
              )}

              {/* Connecteur vertical */}
              {president && (vicePresident || otherConseilMembers.length > 0) && (
                <div className="vertical-connector"></div>
              )}

              {/* Vice-président et autres membres */}
              {(vicePresident || otherConseilMembers.length > 0) && (
                <div className="org-row conseil-members-row">
                  {vicePresident && <MemberNode member={vicePresident} />}
                  {otherConseilMembers.map(member => (
                    <MemberNode key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Connecteur entre conseil et coordination */}
        <div className="main-vertical-connector">
          <div className="connector-line"></div>
          <div className="connector-label">supervise</div>
        </div>

        {/* Niveau 2: Équipe de Coordination */}
        <div className="org-level coordination-level">
          <div className="level-header" onClick={() => toggleSection('coordination')}>
            <h3>Équipe de Coordination</h3>
            {expandedSections.coordination ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSections.coordination && (
            <div className="level-content">
              {/* Coordonnateur */}
              {coordinator && (
                <div className="org-row coordinator-row">
                  <MemberNode member={coordinator} isCoordinator={true} />
                </div>
              )}

              {/* Connecteur vertical */}
              {coordinator && (directors.length > 0 || otherCoordinationMembers.length > 0) && (
                <div className="vertical-connector"></div>
              )}

              {/* Directeurs */}
              {directors.length > 0 && (
                <>
                  <div className="org-row directors-row">
                    {directors.map(member => (
                      <MemberNode key={member.id} member={member} />
                    ))}
                  </div>

                  {/* Connecteur vers autres membres */}
                  {otherCoordinationMembers.length > 0 && (
                    <div className="vertical-connector"></div>
                  )}
                </>
              )}

              {/* Autres membres de la coordination */}
              {otherCoordinationMembers.length > 0 && (
                <div className="org-row other-members-row">
                  {otherCoordinationMembers.map(member => (
                    <MemberNode key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Légende */}
      <div className="org-chart-legend">
        <div className="legend-item">
          <div className="legend-color president"></div>
          <span>Président</span>
        </div>
        <div className="legend-item">
          <div className="legend-color coordinator"></div>
          <span>Coordonnateur</span>
        </div>
        <div className="legend-item">
          <div className="legend-color conseil"></div>
          <span>Conseil d'Administration</span>
        </div>
        <div className="legend-item">
          <div className="legend-color coordination"></div>
          <span>Équipe de Coordination</span>
        </div>
      </div>
    </div>
  );
};

export default OrganizationChart;