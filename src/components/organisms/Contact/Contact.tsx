import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Rocket, Shield, HeadphonesIcon, CheckCircle, AlertCircle, Send, Building2, Users, Briefcase, MessageSquare } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// Componente de confeti
const Confetti: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#FF8A80', '#80DEEA']
  
  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => {
        const isSquare = Math.random() > 0.7
        const size = Math.random() * 8 + 4
        const color = colors[i % colors.length]
        
        return (
          <motion.div
            key={i}
            className={cn(
              "absolute",
              isSquare ? "rounded-sm" : "rounded-full"
            )}
            style={{
              backgroundColor: color,
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: '-20px'
            }}
            initial={{ 
              y: -20, 
              x: 0, 
              rotate: 0,
              scale: 0,
              opacity: 0
            }}
            animate={{
              y: window.innerHeight + 100,
              x: Math.random() * 300 - 150,
              rotate: Math.random() * 720 - 360,
              scale: [0, 1, 0.8, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 1,
              ease: "easeOut"
            }}
          />
        )
      })}
    </div>
  )
}

const Contact: React.FC<BaseComponentProps> = ({
  className,
  id
}) => {
  const { t, i18n } = useTranslation()
  const { elementRef, hasIntersected } = useIntersectionObserver()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    teamSize: '',
    stack: [] as string[],
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setShowConfetti(false)
    
    try {
      // Validar campos requeridos
      const requiredFields = ['name', 'email', 'company', 'industry', 'teamSize'];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`Campo requerido: ${field}`);
        }
      }

      // Validar que al menos una categoría de Stack esté seleccionada
      if (formData.stack.length === 0) {
        throw new Error('Por favor selecciona al menos una categoría de herramientas');
      }

      // Validar email corporativo
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = formData.email.split('@')[1]?.toLowerCase();
      if (personalDomains.includes(domain)) {
        throw new Error('Por favor usa tu email corporativo');
      }

      console.log('Sending form data:', {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        industry: formData.industry,
        teamSize: formData.teamSize,
        stack: formData.stack,
        message: formData.message
      })
      
      // Preparar datos para el servidor proxy
      const serverData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.industry, // Mapear industry a role
        team_size: formData.teamSize,
        tech_stack: formData.stack,
        use_case: formData.message || '',
        message: formData.message || ''
      };

      console.log('Datos que se envían al servidor:', serverData);

      // En desarrollo, simular envío exitoso pero también guardar en Baserow
      if (import.meta.env.DEV) {
        console.log('DEV MODE: Simulating successful form submission and saving to Baserow');
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Guardar en Baserow en desarrollo
        try {
          // Mapear valores de stack a valores válidos de Baserow
          const stackMapping: Record<string, string> = {
            'project': 'project_management',
            'communication': 'communication',
            'development': 'development',
            'productivity': 'project_management', // Mapear a project_management ya que productivity no existe
            'business': 'project_management', // Mapear a project_management
            'crm': 'project_management', // Mapear a project_management
            'marketing': 'project_management', // Mapear a project_management
            'design': 'project_management', // Mapear a project_management
            'analytics': 'analytics',
            'others': 'project_management' // Mapear a project_management
          };

          // Convertir stack a valores válidos de Baserow
          const validStackValues = formData.stack.map(stackValue => 
            stackMapping[stackValue] || 'project_management'
          );

          const baserowData = {
            "Name": formData.name,
            "Email": formData.email,
            "Company": formData.company,
            "Industry": formData.industry,
            "Team Size": formData.teamSize,
            "Stack": validStackValues,
            "Message": formData.message || '',
            "Created At": new Date().toISOString()
          };

          console.log('Enviando a Baserow (DEV):', baserowData);

          const baserowResponse = await fetch('https://api.baserow.io/api/database/rows/table/602481/?user_field_names=true', {
            method: 'POST',
            headers: {
              'Authorization': 'Token PSP8nLZ92SFUcl1hVJ6PDoCwIF3c4fkV',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(baserowData)
          });

          if (baserowResponse.ok) {
            const baserowResult = await baserowResponse.json();
            console.log('✅ Datos guardados en Baserow (DEV):', baserowResult);
          } else {
            const errorText = await baserowResponse.text();
            console.error('❌ Error al guardar en Baserow (DEV):', errorText);
          }
        } catch (baserowError) {
          console.error('❌ Error de red al guardar en Baserow (DEV):', baserowError);
        }
        
        setSubmitStatus('success');
        setShowConfetti(true);
        
        // Limpiar formulario
        setFormData({ 
          name: '', 
          email: '', 
          company: '', 
          industry: '', 
          teamSize: '', 
          stack: [], 
          message: '' 
        });
        
        // Ocultar confeti después de 4 segundos
        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);
        
        return;
      }

      // En producción, simular envío exitoso y guardar en Baserow
      console.log('PROD MODE: Simulating successful form submission and saving to Baserow');
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Guardar en Baserow en producción
      try {
        // Mapear valores de stack a valores válidos de Baserow
        const stackMapping: Record<string, string> = {
          'project': 'project_management',
          'communication': 'communication',
          'development': 'development',
          'productivity': 'project_management',
          'business': 'project_management',
          'crm': 'project_management',
          'marketing': 'project_management',
          'design': 'project_management',
          'analytics': 'analytics',
          'others': 'project_management'
        };

        // Convertir stack a valores válidos de Baserow
        const validStackValues = formData.stack.map(stackValue => 
          stackMapping[stackValue] || 'project_management'
        );

        const baserowData = {
          "Name": formData.name,
          "Email": formData.email,
          "Company": formData.company,
          "Industry": formData.industry,
          "Team Size": formData.teamSize,
          "Stack": validStackValues,
          "Message": formData.message || '',
          "Created At": new Date().toISOString()
        };

        console.log('Enviando a Baserow (PROD):', baserowData);

        const baserowResponse = await fetch('https://api.baserow.io/api/database/rows/table/602481/?user_field_names=true', {
          method: 'POST',
          headers: {
            'Authorization': 'Token PSP8nLZ92SFUcl1hVJ6PDoCwIF3c4fkV',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(baserowData)
        });

        if (baserowResponse.ok) {
          const baserowResult = await baserowResponse.json();
          console.log('✅ Datos guardados en Baserow (PROD):', baserowResult);
        } else {
          const errorText = await baserowResponse.text();
          console.error('❌ Error al guardar en Baserow (PROD):', errorText);
        }
      } catch (baserowError) {
        console.error('❌ Error de red al guardar en Baserow (PROD):', baserowError);
      }
      
      setSubmitStatus('success');
      setShowConfetti(true);
      
      // Limpiar formulario
      setFormData({ 
        name: '', 
        email: '', 
        company: '', 
        industry: '', 
        teamSize: '', 
        stack: [], 
        message: '' 
      });
      
      // Ocultar confeti después de 4 segundos
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleStackChange = (stackValue: string) => {
    setFormData(prev => ({
      ...prev,
      stack: prev.stack.includes(stackValue)
        ? prev.stack.filter(s => s !== stackValue)
        : [...prev.stack, stackValue]
    }))
  }

  return (
    <>
      <Confetti isActive={showConfetti} />
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('contact.title')}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('contact.subtitle')}
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Features */}
              <div className="space-y-8">
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-4 rounded-2xl shadow-lg">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {t('contact.feature.setup.title')}
                      </h3>
                      <p className="text-secondary-600 leading-relaxed">
                        {t('contact.feature.setup.desc')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {t('contact.feature.security.title')}
                      </h3>
                      <p className="text-secondary-600 leading-relaxed">
                        {t('contact.feature.security.desc')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                      <HeadphonesIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {t('contact.feature.support247.title')}
                      </h3>
                      <p className="text-secondary-600 leading-relaxed">
                        {t('contact.feature.support247.desc')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-gray-50/95 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
                
                <div className="relative">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                      {t('contact.form.title')}
                    </h3>
                    <p className="text-secondary-600">
                      {t('contact.subtitle')}
                    </p>
                  </div>
                  
                  {/* Status Messages */}
                  <AnimatePresence mode="sync">
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <p className="text-green-800 font-medium">
                            {i18n.language === 'es' 
                              ? '¡Gracias! Tu solicitud ha sido enviada correctamente. Te contactaremos pronto.'
                              : 'Thank you! Your request has been sent successfully. We will contact you soon.'
                            }
                          </p>
                        </div>
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl"
                      >
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                          <p className="text-red-800 font-medium">
                            {i18n.language === 'es'
                              ? 'Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.'
                              : 'There was an error sending your request. Please try again.'
                            }
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-secondary-700">
                          {t('contact.form.name')} *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg"
                            placeholder={t('contact.form.name')}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-secondary-700">
                          {t('contact.form.email')} *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Company */}
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-semibold text-secondary-700">
                          {t('contact.form.company')} *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg"
                            placeholder={t('contact.form.company')}
                          />
                        </div>
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <label htmlFor="industry" className="block text-sm font-semibold text-secondary-700">
                          {t('contact.form.industry')} *
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg"
                            placeholder="Tecnología, Finanzas, etc."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Team Size */}
                    <div className="space-y-2">
                      <label htmlFor="teamSize" className="block text-sm font-semibold text-secondary-700">
                        {t('contact.form.teamSize')} *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg appearance-none"
                        >
                          <option value="">{t('contact.form.selectPlaceholder')}</option>
                          <option value="1-10">1-10 empleados</option>
                          <option value="11-50">11-50 empleados</option>
                          <option value="51-200">51-200 empleados</option>
                          <option value="201+">201+ empleados</option>
                        </select>
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-secondary-700">
                        {t('contact.form.stack')}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(t('contact.form.stackOptions', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                          <motion.label 
                            key={key} 
                            className="flex items-center space-x-3 p-3 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="checkbox"
                              name="Stack"
                              value={key}
                              checked={formData.stack.includes(key)}
                              onChange={() => handleStackChange(key)}
                              className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-secondary-700">{label}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-secondary-700">
                        {t('contact.form.message')} *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg resize-none"
                          placeholder={t('contact.form.message')}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{i18n.language === 'es' ? 'Enviando...' : 'Sending...'}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>{t('contact.form.submit')}</span>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact 