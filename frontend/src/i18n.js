import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des fichiers de traduction
import frTranslation from './locales/fr/translation.json';
import enTranslation from './locales/en/translation.json';
import swTranslation from './locales/sw/translation.json';
import lnTranslation from './locales/ln/translation.json';

i18n
  .use(initReactI18next) // Passe i18n à react-i18next
  .init({
    resources: {
      fr: {
        translation: frTranslation
      },
      en: {
        translation: enTranslation
      },
      sw: {
        translation: swTranslation
      },
      ln: {
        translation: lnTranslation
      }
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de secours si une traduction est manquante
    interpolation: {
      escapeValue: false // React gère déjà l'échappement
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;