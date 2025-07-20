import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { NavigationProps } from '@/types'
import Button from '@/components/atoms/Button'
import LanguageSelector from '@/components/molecules/LanguageSelector'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ensureEnglishDefault } from '@/locales/i18n'

const Navigation: React.FC<NavigationProps> = ({
  isOpen = false,
  onToggle,
  className,
  id
}) => {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useLocalStorage('language', i18n.language || 'en')

  // Sincronizar el idioma de i18n con el localStorage
  useEffect(() => {
    // Asegurar que el idioma por defecto sea inglés
    ensureEnglishDefault()
    
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#problems', label: t('nav.problemas') },
    { href: '#como-funciona', label: t('nav.como-funciona') },
    { href: '#benefits', label: t('nav.beneficios') },
    { href: '#integrations', label: t('nav.integraciones') },
    { href: '#contact', label: t('nav.contacto') }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isMobile: boolean = false) => {
    e.preventDefault()
    const sectionId = href.replace('#', '')
    console.log('Navigating to section:', sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log('Section found, scrolling to:', sectionId)
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      console.log('Section not found:', sectionId)
    }
    // Solo cerrar el menú móvil si estamos en móvil
    if (isMobile) {
      onToggle?.()
    }
  }

  return (
    <nav
      id={id}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img
                src="/assets/images/heynori-logo.png"
                alt="heynori!"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, false)}
                className="text-secondary-700 hover:text-primary-500 transition-colors duration-200 font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
            <Button 
              variant="primary" 
              size="md"
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }
              }}
            >
              {t('nav.solicitar-acceso')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onToggle}
              className="text-secondary-700 hover:text-primary-500 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-secondary-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, true)}
                  className="block text-secondary-700 hover:text-primary-500 transition-colors duration-200 font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-secondary-200">
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                />
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                  onToggle?.() // Close mobile menu
                }}
              >
                {t('nav.solicitar-acceso')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation 