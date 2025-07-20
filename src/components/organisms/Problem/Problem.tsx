import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, EyeOff, UserX, TrendingUp } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ProblemProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Problem: React.FC<ProblemProps> = ({
  className,
  id
}) => {
  const { t } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const problems = [
    {
      icon: Clock,
      title: t('problems.time-lost.title'),
      description: t('problems.time-lost.desc')
    },
    {
      icon: EyeOff,
      title: t('problems.visibility.title'),
      description: t('problems.visibility.desc')
    },
    {
      icon: UserX,
      title: t('problems.talent.title'),
      description: t('problems.talent.desc')
    },
    {
      icon: TrendingUp,
      title: t('problems.decisions.title'),
      description: t('problems.decisions.desc')
    }
  ]

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        'py-20 bg-gradient-to-br from-primary-500 to-accent-500 text-white',
        className
      )}
      aria-labelledby="problem-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="problem-title"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
          >
            {t('problems.title')}
          </motion.h2>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto md:overflow-visible">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/20 border border-white/30 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl min-w-[260px] md:min-w-0 hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mb-6 border-4 border-white/40">
                <problem.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 text-center drop-shadow">
                {problem.title}
              </h3>
              <p className="text-white/90 leading-relaxed text-center">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problem 