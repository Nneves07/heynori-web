import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '@/components/organisms/Navigation'
import Hero from '@/components/organisms/Hero'
import Problem from '@/components/organisms/Problem'
import Solution from '@/components/organisms/Solution'
import Benefits from '@/components/organisms/Benefits'
import Integrations from '@/components/organisms/Integrations'
import CTA from '@/components/organisms/CTA'
import Contact from '@/components/organisms/Contact'
import Footer from '@/components/organisms/Footer'
import LanguageEnforcer from '@/components/atoms/LanguageEnforcer'
import { trackPageView } from '@/utils/analytics'

const App: React.FC = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Track page view on mount
  useEffect(() => {
    trackPageView(window.location.pathname)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleDemoRequest = () => {
    // Scroll to contact section for demo request
    scrollToSection('contact')
    trackPageView('demo-request')
  }

  return (
    <div className="min-h-screen bg-white">
      <LanguageEnforcer />
      <Navigation
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        id="main-navigation"
      />
      
      <main>
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          description={t('hero.description')}
          primaryAction={{
            text: t('hero.btn-solicitar'),
            onClick: handleDemoRequest
          }}
          id="hero-section"
        />
        
        <Problem id="problems" />
        <Solution id="como-funciona" />
        <Benefits id="benefits" />
        <Integrations id="integrations" />
        <CTA id="cta" />
        <Contact id="contact" />
      </main>

      <Footer id="footer" />
    </div>
  )
}

export default App 