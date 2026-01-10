import React from 'react';
import { Menu } from 'lucide-react';
import './SidebarToggle.css';

const SidebarToggle = ({ isOpen, onToggle }) => {
  // Ne montrer le bouton que si la sidebar est fermée
  if (isOpen) return null;

  return (
    <button 
      className="sidebar-toggle-btn"
      onClick={onToggle}
      title="Ouvrir le menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default SidebarToggle;