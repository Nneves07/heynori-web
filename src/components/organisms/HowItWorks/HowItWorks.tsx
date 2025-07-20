import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Zap, Users, BarChart3, Target } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const HowItWorks: React.FC<BaseComponentProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const steps = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Connect',
      description: 'Connect all your work tools in minutes with our intelligent integration system'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborate',
      description: 'Your team works seamlessly across all platforms with real-time synchronization'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analyze',
      description: 'Get insights into your workflow and identify optimization opportunities'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Optimize',
      description: 'AI automatically suggests and implements improvements to boost productivity'
    }
  ]

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'py-20 bg-white',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {t('solution.title')}
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            {t('solution.description')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                {step.title}
              </h3>
              <p className="text-secondary-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              See it in action
            </h3>
            <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
              Watch how heynori! transforms your workflow in just a few minutes
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <div className="aspect-video bg-secondary-100 rounded-lg flex items-center justify-center">
                <span className="text-secondary-500 text-lg">Demo Video Placeholder</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks 