import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook qui scroll automatiquement en haut de la page à chaque changement de route
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

/**
 * Alternative : Composant à utiliser dans App.jsx
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}