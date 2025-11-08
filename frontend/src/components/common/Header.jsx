import { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

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