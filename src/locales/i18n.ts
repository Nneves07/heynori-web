import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from './en.json'
import esTranslations from './es.json'

const resources = {
  en: {
    translation: enTranslations
  },
  es: {
    translation: esTranslations
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Forzar inglés como idioma por defecto
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false,
    },
  })

// Función para asegurar que el idioma por defecto sea inglés
export const ensureEnglishDefault = () => {
  const currentLang = i18n.language
  if (!currentLang || (currentLang !== 'en' && currentLang !== 'es')) {
    i18n.changeLanguage('en')
  }
}

// Asegurar inglés por defecto al cargar
ensureEnglishDefault()

export default i18n 