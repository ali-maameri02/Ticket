

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import Cookies from 'js-cookie';

// Retrieve language from cookies or default to 'ar'
const storedLanguage = Cookies.get('i18next_lng') || 'ar';
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ar: {
        translation: translationAR,
      },
    },
    lng:storedLanguage,
    fallbackLng: 'ar', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
