import { useEffect, useRef, useState } from 'react';
import GoogleTranslate from './GoogleTranslate';
import Button from './Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { 
  FaUserCircle, 
  FaChevronDown, 
  FaHome, 
  FaNewspaper, 
  FaHandsHelping, 
  FaChartLine, 
  FaInfoCircle, 
  FaUser,
  FaEnvelope,
  FaHandshake,
  FaBullseye,
  FaProjectDiagram,
  FaFileAlt,
  FaMoneyBillWave,
  FaGavel,
  FaUsers,
  FaBriefcase,
  FaHandHoldingHeart,
  FaBook,
  FaEye,
  FaListUl,
  FaMapMarkedAlt,
  FaUserTie,
  FaSignInAlt,
  FaUserPlus,
  FaGlobeAfrica,
  FaHeart
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
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const { i18n, t } = useTranslation();

  const languages = [
    { 
      code: 'fr', 
      name: t('language.french'), 
      flag: '/src/assets/images/flags/fr.svg' 
    },
    { 
      code: 'en', 
      name: t('language.english'), 
      flag: '/src/assets/images/flags/en.svg' 
    },
    { 
      code: 'sw', 
      name: t('language.swahili'), 
      flag: '/src/assets/images/flags/globe.svg' 
    },
    { 
      code: 'ln', 
      name: t('language.lingala'), 
      flag: '/src/assets/images/flags/globe.svg' 
    }
  ];

  useEffect(() => {
    if (!i18n || typeof i18n.changeLanguage !== 'function') {
      console.warn('i18n not properly initialized');
      return;
    }

    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['fr', 'en', 'sw', 'ln'];
    
    const langToUse = savedLang || (supportedLangs.includes(browserLang) ? browserLang : 'fr');
    
    setCurrentLang(langToUse);
    i18n.changeLanguage(langToUse).catch(err => {
      console.error('Erreur lors du changement de langue:', err);
    });
  }, [i18n]);

  const isActive = (href, submenu) => {
    if (href === '/' || href === '/index') {
      return location.pathname === '/' || location.pathname === '/index' || location.pathname === '';
    }
    if (submenu) {
      return submenu.some(subItem => location.pathname.startsWith(subItem.href));
    }
    return location.pathname.startsWith(href) && href !== '/';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleLanguageChange = async (langCode) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
  
    localStorage.setItem('lang', langCode);
  
    try {
      await i18n.changeLanguage(langCode);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Marquer la déconnexion avant d'appeler logout
      // pour éviter que l'intercepteur ne redirige vers login
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggingOut', 'true');
      }
      
      await logout();
      
      // Nettoyer le flag après un court délai
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('isLoggingOut');
        }
      }, 1000);
      
      // Rediriger vers la page d'accueil (route publique)
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      // Même en cas d'erreur, nettoyer et rediriger
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggingOut');
      }
      navigate('/', { replace: true });
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleDonateClick = () => {
    setIsMenuOpen(false);
    navigate('/donate');
  };

  const menuItems = [
    {
      label: t('nav.home'),
      href: '/',
      icon: FaHome,
    },
    {
      label: t('nav.news'),
      href: '/news',
      icon: FaNewspaper,
    },
    {
      label: t('nav.actions'),
      href: '#',
      icon: FaHandsHelping,
      submenu: [
        { label: t('nav.domains'), href: '/domains', icon: FaBullseye },
        { label: t('nav.projects'), href: '/projects', icon: FaProjectDiagram },
        { label: t('nav.humanitarian'), href: '/humanitarian', icon: FaGlobeAfrica },
      ]
    },
    {
      label: t('nav.organization'),
      href: '#',
      icon: FaInfoCircle,
      submenu: [
        { label: t('nav.about'), href: '/about/history', icon: FaBook },
        { label: t('nav.mission'), href: '/about/mission', icon: FaEye },
        { label: t('nav.team'), href: '/about/team', icon: FaUserTie },
        { label: t('nav.zones'), href: '/about/zones', icon: FaMapMarkedAlt },
        { label: t('nav.partners'), href: '/partners', icon: FaHandshake },
      ]
    },
    {
      label: t('nav.transparency'),
      href: '#',
      icon: FaChartLine,
      submenu: [
        { label: t('nav.reports'), href: '/transparency/reports', icon: FaFileAlt },
        { label: t('nav.financial'), href: '/transparency/financial', icon: FaMoneyBillWave },
        { label: t('nav.policies'), href: '/transparency/policies', icon: FaGavel },
      ]
    },
    {
      label: t('nav.join'),
      href: '#',
      icon: FaUsers,
      submenu: [
        { label: t('nav.careers'), href: '/careers', icon: FaBriefcase },
        { label: t('nav.volunteer'), href: '/volunteer', icon: FaHandHoldingHeart },
        { label: t('nav.contact'), href: '/contact', icon: FaEnvelope },
      ]
    },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang);
  
  return (
    <header className={styles.headerWrapper} translate="no">
      <nav>
        <div className={styles.bar}>
          <Link to="/" className={styles.brandLink}> 
            <div className={styles.brand}>
              <img src="/src/assets/images/logo/logo.png" alt="AEJT-RDC" />
              <span className={styles.brandName}>AEJT-RDC</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
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
                  <Link 
                    to={item.href} 
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
                  </Link>

                  {item.submenu && openSubmenu === item.label && (
                    <div className={styles.submenu}>
                      {item.submenu.map((subItem, subIndex) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className={styles.submenuLink}
                          >
                            <SubIcon className={styles.submenuIcon} />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions Desktop */}
          <div className={styles.actions}>
            {/* Sélecteur de langue i18n (Interface) */}
            <div className={styles.langMenu} ref={langMenuRef}>
              <button
                className={styles.langButton}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-label={t('language.label')}
                title={currentLanguage?.name || t('language.label')}
              >
                <img 
                  src={currentLanguage?.flag} 
                  alt={currentLanguage?.name}
                  className={styles.flagImage}
                />
                <FaChevronDown 
                  size={10} 
                  className={isLangMenuOpen ? styles.chevronRotated : ''}
                />
              </button>
              {isLangMenuOpen && (
                <div className={styles.langDropdown}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`${styles.langDropdownItem} ${currentLang === lang.code ? styles.langDropdownItemActive : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name}
                        className={styles.flagImage}
                      />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Google Translate (Contenu des pages) */}
            <GoogleTranslate />

            {/* Menu utilisateur */}
            {isAuthenticated ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userButton}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  title={user?.name}
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className={styles.userAvatar}
                    />
                  ) : (
                    <div className={styles.userAvatarFallback}>
                      {getUserInitials()}
                    </div>
                  )}
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
                      <FaUser className={styles.dropdownIcon} />
                      <span>{t('buttons.profile')}</span>
                    </button>
                    <button
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      <FaSignInAlt className={styles.dropdownIcon} />
                      <span>{t('buttons.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authMenu} ref={userMenuRef}>
                <button
                  className={styles.authButton}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label={t('buttons.login')}
                >
                  <FaUserCircle size={24} />
                </button>
                {isUserMenuOpen && (
                  <div className={styles.authDropdown}>
                    <Link
                      to="/login"
                      className={styles.authDropdownItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaSignInAlt className={styles.authDropdownIcon} />
                      <span>{t('buttons.login')}</span>
                    </Link>
                    <Link
                      to="/register"
                      className={styles.authDropdownItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUserPlus className={styles.authDropdownIcon} />
                      <span>{t('buttons.register')}</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Bouton Faire un don */}
            <button 
              className={styles.donateBtn}
              onClick={handleDonateClick}
              title={t('buttons.donate')}
            >
              <FaHeart className={styles.donateIcon} />
              <span>{t('buttons.donate')}</span>
            </button>
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
            {/* Sélecteur de langue i18n mobile */}
            <div className={styles.mobileLangSection}>
              <span className={styles.mobileLangLabel}>{t('language.interfaceLanguage')}:</span>
              <div className={styles.mobileLangButtons}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.mobileLangButton} ${currentLang === lang.code ? styles.mobileLangButtonActive : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                    title={lang.name}
                  >
                    <img 
                      src={lang.flag} 
                      alt={lang.name}
                      className={styles.flagImage}
                    />
                    <span className={styles.mobileLangCode}>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Translate mobile */}
            <div className={styles.mobileLangSection}>
              <span className={styles.mobileLangLabel}>{t('language.contentTranslation')}:</span>
              <GoogleTranslate />
            </div>

            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={styles.mobileItem}>
                  <div className={styles.mobileItemHeader}>
                    <Link
                      to={item.href}
                      className={styles.mobileLink}
                      onClick={() => !item.submenu && setIsMenuOpen(false)}
                    >
                      <Icon className={styles.mobileIcon} />
                      <span>{item.label}</span>
                    </Link>
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

                  {item.submenu && openSubmenu === item.label && (
                    <div className={styles.mobileSubmenu}>
                      {item.submenu.map((subItem, subIndex) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className={styles.mobileSubmenuLink}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <SubIcon className={styles.mobileSubmenuIcon} />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTA Mobile */}
            <div className={styles.mobileCta}>
              {isAuthenticated ? (
                <div className={styles.mobileAuth}>
                  <div className={styles.mobileUserInfo}>
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className={styles.mobileUserAvatar}
                      />
                    ) : (
                      <div className={styles.mobileUserAvatarFallback}>
                        {getUserInitials()}
                      </div>
                    )}
                    <p className={styles.mobileUser}>
                      {t('auth.connectedAs')} <strong>{user?.name}</strong>
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className={styles.secondaryBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('buttons.profile')}
                  </Link>
                  <button
                    className={styles.primaryBtn}
                    onClick={handleLogout}
                  >
                    {t('buttons.logout')}
                  </button>
                </div>
              ) : (
                <div className={styles.mobileAuth}>
                  <Link
                    to="/login"
                    className={styles.secondaryBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('buttons.login')}
                  </Link>
                  <Link
                    to="/register"
                    className={styles.primaryBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('buttons.createAccount')}
                  </Link>
                </div>
              )}
              <button 
                className={styles.donateBtnMobile}
                onClick={handleDonateClick}
              >
                <FaHeart className={styles.donateIcon} />
                <span>{t('buttons.donate')}</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal de confirmation */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title={t('modal.logoutTitle')}
        message={t('modal.logoutMessage')}
        confirmText={t('buttons.logout')}
        cancelText={t('modal.cancel')}
        variant="logout"
        loading={isLoggingOut}
      />
    </header>
  );
}