// Utilidad para limpiar cache de traducciones
export const clearTranslationCache = () => {
  // Limpiar localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('i18nextLng')
    localStorage.removeItem('language')
    
    // Forzar recarga de la página
    window.location.reload()
  }
}

// Función para verificar si las traducciones están cargadas correctamente
export const checkTranslations = () => {
  if (typeof window !== 'undefined') {
    console.log('Current language:', localStorage.getItem('i18nextLng'))
    console.log('Language from localStorage:', localStorage.getItem('language'))
  }
} 