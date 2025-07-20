import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'
import Button from '@/components/atoms/Button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const CTA: React.FC<BaseComponentProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const features = [
    t('cta.feature.setup'),
    t('cta.feature.support'),
    t('cta.feature.roadmap')
  ]

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'py-20 bg-gradient-to-br from-primary-500 to-accent-500 text-white',
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          {t('cta.title')}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 text-white/90"
        >
          {t('cta.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const element = document.getElementById('contact')
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }}
            className="w-full sm:w-auto"
          >
            {t('cta.btn-access')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white/90"
            >
              <CheckCircle className="w-5 h-5 text-white" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CTA 