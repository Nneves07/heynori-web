import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/utils/cn'
import { LanguageProps } from '@/types'
import { trackLanguageChange } from '@/utils/analytics'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

const LanguageSelector: React.FC<LanguageProps> = ({
  currentLanguage,
  onLanguageChange,
  className,
  id
}) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  // Asegurar que el idioma mostrado coincida con el idioma actual de i18n
  const actualLanguage = i18n.language || currentLanguage
  const currentLang = languages.find(lang => lang.code === actualLanguage) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    const previousLanguage = currentLanguage
    onLanguageChange(languageCode)
    i18n.changeLanguage(languageCode)
    trackLanguageChange(previousLanguage, languageCode)
    setIsOpen(false)
  }

  return (
    <div id={id} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 transition-colors duration-200"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden md:inline">{currentLang.name}</span>
        <ChevronDown 
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-50"
            role="listbox"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 text-left text-sm hover:bg-secondary-50 transition-colors duration-200',
                  actualLanguage === language.code && 'bg-primary-50 text-primary-700'
                )}
                role="option"
                aria-selected={actualLanguage === language.code}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector 