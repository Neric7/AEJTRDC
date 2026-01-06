import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  AlertTriangle,
  FolderOpen,
  Users,
  UserPlus,      // ← Icône pour Bénévoles
  Handshake,
  FileSpreadsheet,
  Image,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { authAPI } from '../services/adminApi';
import toast from 'react-hot-toast';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const currentUser = authAPI.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      title: 'Actualités',
      icon: <FileText size={20} />,
      path: '/content/news',
    },
    {
      title: 'Domaines',
      icon: <FolderOpen size={20} />,
      path: '/content/domains',
    },
    {
      title: 'Projets',
      icon: <Briefcase size={20} />,
      path: '/content/projects',
    },
    {
      title: 'Offres d\'emploi',
      icon: <Briefcase size={20} />,
      path: '/content/jobs',
    },
    {
      title: 'Alertes',
      icon: <AlertTriangle size={20} />,
      path: '/content/alerts',
    },
    {
      title: 'Équipe',
      icon: <Users size={20} />,
      path: '/content/team',
    },
    {
      title: 'Bénévoles',           // ← NOUVEAU
      icon: <UserPlus size={20} />,  // ← NOUVEAU
      path: '/content/volunteers',   // ← NOUVEAU
    },
    {
      title: 'Partenaires',
      icon: <Handshake size={20} />,
      path: '/content/partners',
    },
    {
      title: 'Rapports',
      icon: <FileSpreadsheet size={20} />,
      path: '/content/reports',
    },
    {
      title: 'Médias',
      icon: <Image size={20} />,
      path: '/content/media',
    },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h2>SOS Congo</h2>
            <span>Admin</span>
          </div>
          <button className="sidebar-toggle" onClick={onToggle}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="user-info">
            <p className="user-name">{currentUser?.name || 'Administrateur'}</p>
            <p className="user-role">{currentUser?.role || 'Admin'}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/settings" className="sidebar-link">
            <span className="sidebar-icon"><Settings size={20} /></span>
            <span className="sidebar-text">Paramètres</span>
          </NavLink>
          
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <span className="sidebar-icon"><LogOut size={20} /></span>
            <span className="sidebar-text">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}
    </>
  );
};

export default Sidebar;