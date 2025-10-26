import { memo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

/**
 * Sección de contacto - extraída desde Home.jsx
 */
function ContactSection() {
  const { t } = useLanguage()
  
  return (
    <section id="contact" className="contact-section section-padding py-16">
      <div className="site-container max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <h2 className="text-color-100 text-3xl md:text-4xl font-light mb-4">{t('contact.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Ofrecer oportunidad laboral */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="contact-card"
          >
            <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">
              {t('contact.card1.title')}
            </h3>
            <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
              {t('contact.card1.description')}
            </p>
          </motion.div>

          {/* Conectar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="contact-card"
          >
            <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">
              {t('contact.card2.title')}
            </h3>
            <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
              {t('contact.card2.description')}
            </p>
          </motion.div>

          {/* Construir algo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3 }} 
            className="contact-card"
          >
            <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">
              {t('contact.card3.title')}
            </h3>
            <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
              {t('contact.card3.description')}
            </p>
          </motion.div>
        </div>

  {/* Enlaces de contacto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.4 }} 
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8"
        >
          <a href="mailto:pablopenaheredia@gmail.com" className="contact-link">{t('contact.links.email')}</a>
          <a href="https://github.com/pablopenaheredia" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.links.github')}</a>
          <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.links.linkedin')}</a>
        </motion.div>

  {/* Flecha de volver arriba */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.5 }} 
          className="flex justify-center mt-12"
        >
          <a href="#home" className="back-to-top" aria-label="Volver arriba">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7-7 7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(ContactSection)
