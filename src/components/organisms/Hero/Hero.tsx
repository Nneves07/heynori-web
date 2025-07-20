import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { cn } from '@/utils/cn'
import { HeroProps } from '@/types'
import Button from '@/components/atoms/Button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import BrandLogo from '@/components/atoms/BrandLogo'

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const integrations = [
    { 
      name: 'Slack', 
      logoUrl: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg'
    },
    { 
      name: 'Jira', 
      logoUrl: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg'
    },
    { 
      name: 'Microsoft Teams', 
      logoUrl: 'https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg'
    },
    { 
      name: 'Zoom', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg'
    },
    { 
      name: 'GitHub', 
      logoUrl: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg'
    },
    { 
      name: 'Salesforce', 
      logoUrl: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg'
    }
  ]

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden',
        className
      )}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Productivity Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight"
            >
              {title}{' '}
              <motion.span className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                {subtitle}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm md:text-2xl text-secondary-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-6 h-6" />}
                onClick={primaryAction.onClick}
                className="w-full sm:w-auto text-lg px-8 py-4"
              >
                {primaryAction.text}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center justify-center lg:justify-start text-sm text-secondary-500"
            >
              <Zap className="w-4 h-4 mr-2" />
              {t('hero.note')}
            </motion.div>
          </motion.div>

          {/* Enhanced Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Enhanced Logo Container */}
            <div className="text-center mb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={hasIntersected ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative inline-block"
              >
                <motion.img
                  src="/assets/images/heynori-logo.png"
                  alt="heynori!"
                  className="h-56 md:h-72 lg:h-80 mx-auto mb-2 drop-shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-2xl opacity-20 -z-10"></div>
              </motion.div>
            </div>

            {/* Enhanced Integration Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-secondary-700 mb-2">Trusted by teams using</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                    className="flex items-center justify-center p-4 bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                  >
                    <BrandLogo
                      name={integration.name}
                      logoUrl={integration.logoUrl}
                      size={36}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 