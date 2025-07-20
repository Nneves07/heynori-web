import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, BrainCircuit, Zap, BarChart3, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { SolutionProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Solution: React.FC<SolutionProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()
  const [currentIndex, setCurrentIndex] = useState(0)

  const features = [
    {
      icon: Share2,
      title: t('solution.connectivity.title'),
      description: t('solution.connectivity.desc'),
      items: [
        t('solution.connectivity.setup'),
        t('solution.connectivity.friction'),
        t('solution.connectivity.tools')
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BrainCircuit,
      title: t('solution.ai.title'),
      description: t('solution.ai.desc'),
      items: [
        t('solution.ai.learning'),
        t('solution.ai.predictions'),
        t('solution.ai.optimization')
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: t('solution.automation.title'),
      description: t('solution.automation.desc'),
      items: [
        t('solution.automation.workflows'),
        t('solution.automation.reports'),
        t('solution.automation.alerts')
      ],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: t('solution.insights.title'),
      description: t('solution.insights.desc'),
      items: [
        t('solution.insights.metrics'),
        t('solution.insights.roi'),
        t('solution.insights.continuous')
      ],
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  const goToCard = (index: number) => {
    setCurrentIndex(index)
  }

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
      filter: "blur(10px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
      filter: "blur(10px)"
    })
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
          >
            {t('solution.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
          >
            {t('solution.subtitle')}
          </motion.p>
        </div>

        {/* Main Card Display with Navigation */}
        <div className="relative">
          {/* Navigation Arrows - Positioned on sides */}
          <motion.button
            onClick={prevCard}
            className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:shadow-3xl transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ChevronLeft className="w-7 h-7 text-secondary-600 group-hover:text-primary-600 transition-colors duration-300" />
          </motion.button>

          <motion.button
            onClick={nextCard}
            className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:shadow-3xl transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
            whileHover={{ scale: 1.15, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ChevronRight className="w-7 h-7 text-secondary-600 group-hover:text-primary-600 transition-colors duration-300" />
          </motion.button>

          {/* Card Container */}
          <div className="flex items-center justify-center min-h-[600px] px-20 lg:px-32">
            <AnimatePresence initial={false} custom={currentIndex} mode="wait">
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 },
                  filter: { duration: 0.3 }
                }}
                className="w-full max-w-4xl lg:max-w-5xl"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12 flex flex-col items-center text-center border border-gray-100 relative overflow-hidden hover:shadow-3xl transition-all duration-700 group">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 from-primary-500 to-accent-500" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute top-10 left-10 w-2 h-2 bg-primary-400 rounded-full opacity-20"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute top-20 right-20 w-1 h-1 bg-accent-400 rounded-full opacity-30"
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </div>
                  
                  <motion.div 
                    className={`w-24 h-24 bg-gradient-to-br ${features[currentIndex].gradient} rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-3xl group-hover:rotate-3`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
                  >
                    {(() => {
                      const IconComponent = features[currentIndex].icon
                      return <IconComponent className="w-12 h-12 text-white" />
                    })()}
                  </motion.div>
                  
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full"
                  >
                    <motion.h3 
                      className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6 transition-colors duration-300 group-hover:text-primary-600"
                      variants={itemVariants}
                    >
                      {features[currentIndex].title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-lg lg:text-xl text-secondary-600 mb-8 leading-relaxed max-w-3xl mx-auto"
                      variants={itemVariants}
                    >
                      {features[currentIndex].description}
                    </motion.p>
                    
                    <motion.ul 
                      className="space-y-4 w-full max-w-2xl mx-auto"
                      variants={contentVariants}
                    >
                      {features[currentIndex].items.map((item, itemIndex) => (
                        <motion.li 
                          key={itemIndex} 
                          className="flex items-start text-secondary-700 transition-all duration-300 hover:text-secondary-900 group/item"
                          variants={itemVariants}
                        >
                          <motion.div
                            className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover/item:bg-primary-200 transition-colors duration-300"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Check className="w-4 h-4 text-primary-600" />
                          </motion.div>
                          <span className="text-left text-lg">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator - Below the card */}
        <div className="flex justify-center mt-4 space-x-4">
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToCard(index)}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-500 shadow-lg",
                index === currentIndex 
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 scale-125 shadow-primary-500/50" 
                  : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
              )}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 flex justify-center">
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / features.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solution 