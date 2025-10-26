import { memo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

/**
 * Sección "Sobre mí" - extraída e integrada desde Home.jsx
 */
function AboutSection() {
  const { t } = useLanguage()
  
  return (
    <section id="about" className="about-section section-padding">
      <div className="about-container site-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Foto primero en móvil, después en desktop */}
        <aside className="about-visual order-1 lg:order-2" aria-labelledby="stack-heading">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="max-w-md mx-auto lg:sticky lg:top-20 mb-8 lg:mb-0"
          >
            <img 
              src="/profile.svg" 
              alt="Pablo Pena" 
              loading="lazy" 
              width="560" 
              height="420" 
              className="w-full rounded-lg animate-soft-pulse elevated" 
            />
          </motion.div>
        </aside>

        <article className="about-text order-2 lg:order-1">
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
            className="bio-text space-y-6 text-color-100/70 font-light"
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
