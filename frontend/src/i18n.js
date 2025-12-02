import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Vos traductions - à adapter selon votre structure de fichiers
// Option 1 : Import de fichiers JSON (recommandé)
// import translationFR from './locales/fr/translation.json';
// import translationEN from './locales/en/translation.json';
// import translationSW from './locales/sw/translation.json';
// import translationLN from './locales/ln/translation.json';

// Option 2 : Traductions inline (pour débuter rapidement)
const resources = {
  fr: {
    translation: {
      // Ajoutez vos traductions françaises ici
      "welcome": "Bienvenue",
      "home": "Accueil",
      "news": "Actualités",
      "contact": "Contact",
      // ... autres traductions
    }
  },
  en: {
    translation: {
      // Ajoutez vos traductions anglaises ici
      "welcome": "Welcome",
      "home": "Home",
      "news": "News",
      "contact": "Contact",
      // ... autres traductions
    }
  },
  sw: {
    translation: {
      // Ajoutez vos traductions swahili ici
      "welcome": "Karibu",
      "home": "Nyumbani",
      "news": "Habari",
      "contact": "Wasiliana",
      // ... autres traductions
    }
  },
  ln: {
    translation: {
      // Ajoutez vos traductions lingala ici
      "welcome": "Boyei malamu",
      "home": "Ndako",
      "news": "Nsango",
      "contact": "Benisa",
      // ... autres traductions
    }
  }
};

i18n
  .use(initReactI18next) // Passe i18n à react-i18next
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de secours si la traduction n'existe pas
    
    interpolation: {
      escapeValue: false // React échappe déjà les valeurs
    },

    // Options supplémentaires (optionnel)
    debug: false, // Mettre à true pour voir les logs de debug
    
    react: {
      useSuspense: false // Désactive Suspense pour éviter les problèmes de chargement
    }
  });

export default i18n;