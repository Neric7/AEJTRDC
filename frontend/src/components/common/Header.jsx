import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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
    },
    {
      label: 'Actualités',
      href: '/news',
    },
    {
      label: 'Nos actions',
      href: '#',
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
    },
    {
      label: 'Transparence',
      href: '#',
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
    },
    {
      label: 'À propos',
      href: '#',
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
          {/* Logo/Brand : Maintenant cliquable et renvoie à la page d'accueil */}
          <a href="/index" className={styles.brandLink}> 
            <div className={styles.brand}>
              <img src="/src/assets/images/logo/logo.png" alt="" />
              <span className={styles.brandName}>AEJT-RDC</span>
            </div>
          </a>

          {/* Navigation Desktop */}
          <div className={styles.nav}>
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className={styles.navItem}
                onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
                onMouseLeave={() => item.submenu && setOpenSubmenu(null)}
              >
                <a href={item.href} className={styles.link}>
                  {item.label}
                  {item.submenu && (
                    <svg 
                      className={styles.chevron}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
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
            ))}
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
            {menuItems.map((item, index) => (
              <div key={index} className={styles.mobileItem}>
                <div className={styles.mobileItemHeader}>
                  <a
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={() => !item.submenu && setIsMenuOpen(false)}
                  >
                    {item.label}
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
            ))}

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