import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Heart, ArrowUp, Linkedin } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// SVG oficial de X (Twitter)
function XIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="X (Twitter)"
      className={className}
      {...props}
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

const Footer: React.FC<BaseComponentProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const footerSections = [
    {
      title: t('footer.sections.product'),
      links: [
        { name: t('footer.links.features'), href: '#benefits' },
        { name: t('footer.links.integrations'), href: '#integrations' }
      ]
    },
    {
      title: t('footer.sections.company'),
      links: [
        { name: t('footer.links.about'), href: '#problems' },
        { name: t('footer.links.contact'), href: '#contact' }
      ]
    },
    {
      title: t('footer.sections.support'),
      links: [
        { name: t('footer.links.helpCenter'), href: '#contact' },
        { name: t('footer.links.contact'), href: '#contact' }
      ]
    }
  ]

  const socialLinks = [
    { icon: XIcon, href: 'https://x.com/heynoriHQ', label: 'X (Twitter)' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/heynori/posts/?feedView=all', label: 'LinkedIn' }
  ]

  return (
    <footer
      id={id}
      ref={elementRef}
      className={cn(
        'relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto px-6 py-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  heynori!
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:hello@heynori.ai" 
                  className="hover:text-primary-400 transition-colors duration-300"
                >
                  hello@heynori.ai
                </a>
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <motion.div key={section.title} variants={itemVariants}>
                <h3 className="text-white font-semibold text-lg mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleScrollToSection(link.href)}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            className="pt-8 border-t border-gray-700/50"
            variants={itemVariants}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-4 text-gray-400">
                <span>{t('footer.copyright')}</span>
                <div className="flex items-center space-x-1">
                  <span>{t('footer.madeWith')}</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                  <span>{t('footer.forTeams')}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800/50 hover:bg-primary-500/20 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all duration-300 border border-gray-700/50 hover:border-primary-500/50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.label === 'X (Twitter)'
                      ? <social.icon className="w-5 h-5" />
                      : <social.icon className="w-5 h-5" />}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl shadow-2xl hover:shadow-primary-500/25 flex items-center justify-center text-white transition-all duration-300 z-50"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  )
}

export default Footer 