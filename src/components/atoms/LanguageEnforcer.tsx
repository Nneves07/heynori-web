import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageEnforcer: React.FC = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Force English language on mount
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en')
    }

    // Update HTML lang attribute
    document.documentElement.lang = 'en'
    document.documentElement.setAttribute('xml:lang', 'en')

    // Update meta tags
    const metaLanguage = document.querySelector('meta[http-equiv="content-language"]')
    if (metaLanguage) {
      metaLanguage.setAttribute('content', 'en')
    }

    // Update title and meta description to English
    const title = document.querySelector('title')
    if (title) {
      title.textContent = 'heynori! - AI that truly understands how you work'
    }

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Nori connects all your work tools to eliminate repetitive tasks and multiply your team\'s productivity. AI that learns, adapts and optimizes your workflow.')
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'heynori! - AI that truly understands how you work')
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Connect all your work tools automatically. Eliminate repetitive tasks. Multiply your team\'s productivity.')
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'heynori! - AI that truly understands how you work')
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Connect all your work tools automatically. Eliminate repetitive tasks. Multiply your team\'s productivity.')
    }
  }, [i18n])

  return null // This component doesn't render anything
}

export default LanguageEnforcer 