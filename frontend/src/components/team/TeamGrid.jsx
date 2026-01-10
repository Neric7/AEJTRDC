import React, { useState, useEffect } from 'react';
import MemberCard from './MemberCard';
import { AlertCircle, Loader } from 'lucide-react';
import teamService from '../../services/teamService';
import './TeamGrid.css';

const TeamGrid = ({ category, title }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, [category]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await teamService.getMembers(category);
      
      if (result.success) {
        setMembers(result.data);
      } else {
        setError(result.error || 'Erreur lors du chargement des membres');
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Impossible de charger les membres de l\'équipe');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="team-loading">
        <Loader className="animate-spin" size={40} />
        <p>Chargement des membres...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-error">
        <AlertCircle size={40} />
        <p>{error}</p>
        <button onClick={fetchTeamMembers} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="team-empty">
        <p>Aucun membre à afficher pour le moment</p>
      </div>
    );
  }

  return (
    <div className="team-section">
      {title && <h2 className="team-title">{title}</h2>}
      <div className="team-grid">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;