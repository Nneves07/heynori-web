import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import BrandLogo from '@/components/atoms/BrandLogo'

const integrations = [
  // Communication & Collaboration
  { 
    name: 'Slack', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    category: 'communication'
  },
  { 
    name: 'Microsoft Teams', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg',
    category: 'communication'
  },
  { 
    name: 'Zoom', 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg',
    category: 'communication'
  },
  
  // Project Management
  { 
    name: 'Asana', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/asana-1.svg',
    category: 'project-management'
  },
  { 
    name: 'Jira', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
    category: 'project-management'
  },
  { 
    name: 'Trello', 
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
    category: 'project-management'
  },
  { 
    name: 'Notion', 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    category: 'project-management'
  },
  
  // Development & Design
  { 
    name: 'GitHub', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg',
    category: 'development'
  },
  { 
    name: 'Figma', 
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'development'
  },
  
  // Cloud Storage & Productivity
  { 
    name: 'Google Workspace', 
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    category: 'productivity'
  },
  { 
    name: 'Dropbox', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/dropbox-2.svg',
    category: 'productivity'
  },
  
  // CRM & Business
  { 
    name: 'Salesforce', 
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
    category: 'business'
  }
]



const Integrations: React.FC<BaseComponentProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()
  const [searchTerm] = useState('')

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden',
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 leading-tight p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('integrations.title')}
          </motion.h2>
          <motion.p
            className="text-sm md:text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connect with 100+ tools you already use. No complex setup required.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
        </motion.div>

        {/* Integrations Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
                            {filteredIntegrations.map((integration) => (
              <motion.div
                key={integration.name}
                variants={itemVariants}
                layout
                className="group relative"
              >
                <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group-hover:border-primary-300 h-32 flex flex-col items-center justify-center">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Logo */}
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 mb-3">
                    <BrandLogo
                      name={integration.name}
                      logoUrl={integration.logoUrl}
                      size={32}
                    />
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-sm font-semibold text-secondary-900 text-center group-hover:text-primary-600 transition-colors duration-300">
                    {integration.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredIntegrations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No tools found
            </h3>
            <p className="text-secondary-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to contact section
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <span>See all 100+ integrations</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Integrations 