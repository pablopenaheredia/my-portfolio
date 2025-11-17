// seccion de contacto con tarjetas informativas y enlaces sociales
import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { Toast } from '../common'

function ContactSection() {
  const { t, language } = useLanguage()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleCopyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const email = 'pablopenaheredia@gmail.com'
    
    const doShowSuccess = () => {
      setToastMessage(language === 'es' ? 'Email copiado' : 'Email copied')
      setShowToast(true)
    }
    const doShowFail = () => {
      setToastMessage(language === 'es' ? 'No se pudo copiar' : 'Could not copy')
      setShowToast(true)
    }

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(doShowSuccess).catch(doShowFail)
    } else {
      try {
        const ta = document.createElement('textarea')
        ta.value = email
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        doShowSuccess()
      } catch {
        doShowFail()
      }
    }
  }
  
  return (
    <section id="contact" className="contact-section section-padding py-16">
      <div className="site-container max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <h2 className="text-color-100 text-3xl md:text-4xl font-light mb-4">{t('contact.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.4 }} 
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8"
        >
          <a 
            href="#" 
            onClick={handleCopyEmail} 
            className="contact-link"
          >
            {t('contact.links.email')}
          </a>
          <a href="https://github.com/pablopenaheredia" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.links.github')}</a>
          <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.links.linkedin')}</a>
        </motion.div>

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

      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </section>
  )
}

export default memo(ContactSection)
