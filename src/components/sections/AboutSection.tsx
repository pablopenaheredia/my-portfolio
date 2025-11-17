// seccion sobre mi con biografia y foto de perfil
import { memo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

function AboutSection() {
  const { t } = useLanguage()
  
  return (
    <section id="about" className="about-section section-padding">
      <div className="about-container site-container">
        <article className="about-text">
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="text-color-100 text-xl font-light leading-relaxed mb-8"
          >
            {t('about.intro')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="bio-text space-y-6 text-color-100/70 font-light text-base"
          >
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <p>{t('about.paragraph3')}</p>
          </motion.div>
        </article>
      </div>
    </section>
  )
}

export default memo(AboutSection)
