import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      default: ['en'],
    },
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,

    ns: ['common', 'menu', 'help', 'validation', 'messages'],
    defaultNS: 'common',
    fallbackNS: 'common',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',

      caches: ['localStorage'],
    },
  })
  .catch((err) => {
    console.log(err);
  });
