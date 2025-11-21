import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaChevronDown, 
  FaHome, 
  FaNewspaper, 
  FaHandsHelping, 
  FaHandshake, 
  FaChartLine, 
  FaGlobeAfrica, 
  FaInfoCircle 
} from 'react-icons/fa';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const userMenuRef = useRef(null);

  // Fonction pour vérifier si un item est actif
  const isActive = (href, submenu) => {
    // Pour l'accueil
    if (href === '/' || href === '/index') {
      return location.pathname === '/' || location.pathname === '/index' || location.pathname === '';
    }
    // Pour les items avec submenu
    if (submenu) {
      return submenu.some(subItem => location.pathname.startsWith(subItem.href));
    }
    // Pour les autres items
    return location.pathname.startsWith(href) && href !== '/';
  };

  console.log('Current path:', location.pathname); // Debug

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      label: 'Accueil',
      href: '/',
      icon: FaHome,
    },
    {
      label: 'Actualités',
      href: '/news',
      icon: FaNewspaper,
    },
    {
      label: 'Nos actions',
      href: '#',
      icon: FaHandsHelping,
      submenu: [
        { label: 'Protection de l\'enfance', href: '/projects/child-protection' },
        { label: 'Santé communautaire', href: '/projects/health' },
        { label: 'Insertion socio-économique', href: '/projects/economic' },
        { label: 'Environnement', href: '/projects/environment' },
        { label: 'Plaidoyer', href: '/projects/advocacy' },
        { label: 'Tous les projets', href: '/projects' },
      ]
    },
    {
      label: 'Partenaires',
      href: '/partners',
      icon: FaHandshake,
    },
    {
      label: 'Transparence',
      href: '#',
      icon: FaChartLine,
      submenu: [
        { label: 'Rapports d\'activités', href: '/transparency/reports' },
        { label: 'Rapports financiers', href: '/transparency/financial' },
        { label: 'Politiques internes', href: '/transparency/policies' },
        { label: 'Gouvernance', href: '/transparency/governance' },
        { label: 'Carrières', href: '/careers' },
        { label: 'Bénévolat', href: '/volunteer' },
      ]
    },
    {
      label: 'Espace humanitaire',
      href: '/humanitarian',
      icon: FaGlobeAfrica,
    },
    {
      label: 'À propos',
      href: '#',
      icon: FaInfoCircle,
      submenu: [
        { label: 'Notre histoire', href: '/about/history' },
        { label: 'Mission & Vision', href: '/about/mission' },
        { label: 'Valeurs', href: '/about/values' },
        { label: 'Objectifs', href: '/about/objectives' },
        { label: 'Organigramme', href: '/about/structure' },
        { label: 'Zones d\'intervention', href: '/about/zones' },
        { label: 'Notre équipe', href: '/about/team' },
        { label: 'Contact', href: '/about/contact' },
      ]
    },
  ];

  return (
    <header className={styles.headerWrapper}>
      <nav>
        <div className={styles.bar}>
          {/* Logo/Brand */}
          <a href="/" className={styles.brandLink}> 
            <div className={styles.brand}>
              <img src="/src/assets/images/logo/logo.png" alt="AEJT-RDC" />
              <span className={styles.brandName}>AEJT-RDC</span>
            </div>
          </a>

          {/* Navigation Desktop avec icônes et effet tiroir */}
          <div className={styles.nav}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const itemIsActive = isActive(item.href, item.submenu);
              const shouldShowLabel = hoveredItem === index || itemIsActive;
              
              return (
                <div 
                  key={index} 
                  className={styles.navItem}
                  onMouseEnter={() => {
                    setHoveredItem(index);
                    if (item.submenu) setOpenSubmenu(item.label);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    if (item.submenu) setOpenSubmenu(null);
                  }}
                >
                  <a 
                    href={item.href} 
                    className={`${styles.iconLink} ${itemIsActive ? styles.iconLinkActive : ''}`}
                  >
                    <div className={styles.iconWrapper}>
                      <Icon className={styles.navIcon} />
                      <span className={`${styles.labelDrawer} ${shouldShowLabel ? styles.labelDrawerOpen : ''}`}>
                        {item.label}
                      </span>
                    </div>
                    {item.submenu && (
                      <FaChevronDown className={styles.chevronSmall} />
                    )}
                  </a>

                  {/* Submenu Desktop */}
                  {item.submenu && openSubmenu === item.label && (
                    <div className={styles.submenu}>
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className={styles.submenuLink}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Boutons CTA Desktop */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userButton}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  title={user?.name}
                >
                  <FaUserCircle size={24} />
                  <FaChevronDown 
                    size={12} 
                    className={isUserMenuOpen ? styles.chevronRotated : ''}
                  />
                </button>
                {isUserMenuOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <strong>{user?.name}</strong>
                    </div>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        navigate('/profile');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Mon profil
                    </button>
                    <button
                      className={styles.dropdownItem}
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await logout();
                        navigate('/');
                      }}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authLinks}>
                <Link to="/login" className={styles.loginLink}>
                  Se connecter
                </Link>
                <Link to="/register" className={styles.signupBtn}>
                  S'inscrire
                </Link>
              </div>
            )}
            <Button className={styles.primaryBtn}>
              Faire un don
            </Button>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.menuBtn}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={styles.mobileItem}>
                  <div className={styles.mobileItemHeader}>
                    <a
                      href={item.href}
                      className={styles.mobileLink}
                      onClick={() => !item.submenu && setIsMenuOpen(false)}
                    >
                      <Icon className={styles.mobileIcon} />
                      <span>{item.label}</span>
                    </a>
                    {item.submenu && (
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`${styles.submenuToggle} ${openSubmenu === item.label ? styles.open : ''}`}
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Submenu Mobile */}
                  {item.submenu && openSubmenu === item.label && (
                    <div className={styles.mobileSubmenu}>
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className={styles.mobileSubmenuLink}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTA Mobile */}
            <div className={styles.mobileCta}>
              {isAuthenticated ? (
                <div className={styles.mobileAuth}>
                  <p className={styles.mobileUser}>Connecté en tant que <strong>{user?.name}</strong></p>
                  <Link
                    to="/profile"
                    className={styles.secondaryBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mon profil
                  </Link>
                  <button
                    className={styles.primaryBtn}
                    onClick={async () => {
                      await logout();
                      setIsMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className={styles.mobileAuth}>
                  <Link
                    to="/login"
                    className={styles.secondaryBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className={styles.primaryBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Créer un compte
                  </Link>
                </div>
              )}
              <Button 
                className={styles.primaryBtn}
                onClick={() => setIsMenuOpen(false)}
              >
                Faire un don
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}