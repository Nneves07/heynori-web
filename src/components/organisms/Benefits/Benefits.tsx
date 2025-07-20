import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, Shield, Zap, TrendingUp } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Benefits: React.FC<BaseComponentProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const benefits = [
    {
      icon: Clock,
      title: t('benefits.create.title'),
      description: t('benefits.create.desc'),
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: t('benefits.scalability.title'),
      description: t('benefits.scalability.desc'),
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100'
    },
    {
      icon: Zap,
      title: t('benefits.flow.title'),
      description: t('benefits.flow.desc'),
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100'
    },
    {
      icon: TrendingUp,
      title: t('benefits.decisions.title'),
      description: t('benefits.decisions.desc'),
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100'
    }
  ]

  const workflowSteps = [
    {
      number: 1,
      title: t('benefits.workflow.step1'),
      description: 'AI analyzes your team patterns',
      icon: Clock,
      gradient: 'from-red-500 to-pink-500'
    },
    {
      number: 2,
      title: t('benefits.workflow.step2'),
      description: 'Automated workflows are created',
      icon: Zap,
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      number: 3,
      title: t('benefits.workflow.step3'),
      description: 'Continuous improvement cycle',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-yellow-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden',
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('benefits.title')}
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your team&apos;s productivity with intelligent automation
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className={cn(
                  "bg-white/90 backdrop-blur-sm border-2 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden",
                  benefit.borderColor
                )}>
                  {/* Hover gradient overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                    benefit.gradient
                  )} />
                  
                  {/* Icon container */}
                  <motion.div 
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-500 group-hover:scale-110",
                      benefit.iconBg
                    )}
                    whileHover={{ rotate: 5 }}
                  >
                    <div className={cn(
                      "w-16 h-16 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg",
                      benefit.gradient
                    )}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Workflow Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-accent-200 to-primary-200 transform -translate-y-1/2 hidden lg:block -z-10" />
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={hasIntersected ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + (index * 0.2),
                    ease: "easeOut"
                  }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step number */}
                  <motion.div 
                    className={cn(
                      "text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-xl relative z-10 bg-gradient-to-r",
                      step.gradient
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </motion.div>
                  
                  <motion.h4 
                    className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + (index * 0.2) }}
                  >
                    {step.title}
                  </motion.h4>
                  <motion.p 
                    className="text-secondary-600 text-sm max-w-48"
                    initial={{ opacity: 0, y: 10 }}
                    animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.4 + (index * 0.2) }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              )
            })}
          </div>
          
          {/* Arrow indicators for mobile */}
          <motion.div 
            className="flex justify-center mt-8 lg:hidden space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {/* ArrowDown className="w-6 h-6 text-primary-400" /> */}
            {/* ArrowDown className="w-6 h-6 text-primary-400" /> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits 