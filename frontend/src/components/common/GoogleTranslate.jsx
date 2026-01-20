import { useEffect } from 'react';
import styles from './GoogleTranslate.module.css';

export default function GoogleTranslate() {
  useEffect(() => {
    // Nettoyer les anciens scripts Google Translate s'ils existent
    const cleanupOldScripts = () => {
      const oldScripts = document.querySelectorAll('script[src*="translate.google.com"]');
      oldScripts.forEach(script => script.remove());
      
      // Nettoyer les iframes Google Translate
      const iframes = document.querySelectorAll('iframe.goog-te-banner-frame, iframe.skiptranslate');
      iframes.forEach(iframe => iframe.remove());
      
      // Réinitialiser les fonctions globales
      delete window.google;
      delete window.googleTranslateElementInit;
    };

    cleanupOldScripts();

    // Marquer le header comme non-traduisible AVANT le chargement
    const header = document.querySelector('header');
    if (header) {
      header.setAttribute('translate', 'no');
      header.classList.add('notranslate');
    }

    // Charger le script Google Translate
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    
    // Initialiser Google Translate
    window.googleTranslateElementInit = () => {
      if (!document.getElementById('google_translate_element')) {
        return;
      }

      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'fr',
            includedLanguages: 'fr,en,sw,ln,es,pt,ar,zh-CN,de,it,ru,ja,ko',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
          },
          'google_translate_element'
        );
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Google Translate:', error);
      }
    };

    document.body.appendChild(addScript);

    // Cleanup lors du démontage du composant
    return () => {
      cleanupOldScripts();
    };
  }, []); // ⬅️ Dépendances vides = s'exécute UNE SEULE FOIS

  return (
    <div className={styles.googleTranslateWrapper}>
      <div id="google_translate_element"></div>
    </div>
  );
}