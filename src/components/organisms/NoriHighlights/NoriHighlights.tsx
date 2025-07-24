import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Link2, Brain } from 'lucide-react'

const highlights = [
  {
    icon: <BarChart3 className="w-7 h-7 md:w-10 md:h-10 text-primary-600" aria-hidden="true" />,
    title: 'Insights for leaders',
    description: 'Actionable analytics and reports for decision makers.'
  },
  {
    icon: <Link2 className="w-7 h-7 md:w-10 md:h-10 text-primary-600" aria-hidden="true" />,
    title: 'Unlimited connectivity',
    description: 'Integrate all your tools and platforms without limits.'
  },
  {
    icon: <Brain className="w-7 h-7 md:w-10 md:h-10 text-primary-600" aria-hidden="true" />,
    title: 'AI that learns your context',
    description: 'Personalized automation that adapts to your workflow.'
  }
]

const NoriHighlights: React.FC = () => (
  <section
    aria-label="Nori Highlights"
    className="py-8 md:py-12 bg-white w-full"
  >
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <h2 className="text-xl md:text-2xl font-bold text-secondary-900 mb-4 md:mb-6 text-center">
        Where Nori is different
      </h2>
      <div
        className="flex overflow-x-auto gap-x-4 md:gap-x-8 pb-2 md:pb-4 snap-x snap-mandatory"
        tabIndex={0}
        role="list"
        aria-label="Highlights carousel"
      >
        {highlights.map((item, idx) => (
          <motion.div
            key={item.title}
            className="min-w-[220px] max-w-xs bg-primary-50 rounded-xl shadow-md flex-shrink-0 px-4 py-5 md:px-6 md:py-8 flex flex-col justify-center items-center text-center snap-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            role="listitem"
            aria-label={item.title}
          >
            <div className="mb-3 md:mb-5 flex justify-center w-full">{item.icon}</div>
            <h3 className="text-base md:text-lg font-semibold text-secondary-900 mb-2 md:mb-3 w-full flex justify-center text-center break-words leading-tight">{item.title}</h3>
            <p className="text-xs md:text-sm text-secondary-600 text-center break-words leading-snug">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default NoriHighlights 