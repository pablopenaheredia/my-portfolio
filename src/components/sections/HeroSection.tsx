import { useEffect, memo } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { debounce } from '../../utils'
import { GradientHero } from '../ui'

function HeroSection() {
  const { t } = useLanguage()

  // Hero content
  const highlight = t('hero.title')
  const titleRest = t('hero.subtitle')
  const description = t('hero.description')
  const ctaLabel = t('hero.downloadCV')

  // CSS variable for visual nav alignment
  useEffect(() => {
    const setInset = () => {
      try {
        const heroContainer = document.querySelector('.hero-content-container')
        if (!heroContainer) return
        const rect = heroContainer.getBoundingClientRect()
        const inset = Math.round(rect.left)
        document.documentElement.style.setProperty('--hero-left-inset', `${inset}px`)
      } catch (err) {
        // Silent fail
      }
    }

    setInset()
    const debouncedSetInset = debounce(setInset, 150)
    window.addEventListener('resize', debouncedSetInset)

    return () => {
      window.removeEventListener('resize', debouncedSetInset)
    }
  }, [])

  return (
    <section id="home" className="hero min-h-screen flex items-center section-padding relative">
      <div className="hero-content-container site-container flex items-center justify-between gap-4">
        <header className="hero-content flex-1 max-w-2xl" aria-labelledby="hero-title">
          <div className="hero-label mb-8 animate-fade-in">
            <p className="text-color-100/60 text-sm tracking-[0.3em] uppercase font-light">
              {t('hero.name')}
            </p>
          </div>

          <div className="animate-fade-in-delayed">
            <GradientHero
              highlight={highlight}
              titleRest={titleRest}
              description={description}
              ctaLabel={ctaLabel}
            />
          </div>
        </header>

        {/* Right visual nav - absolute positioned on md+, hidden on mobile */}
        <aside className="hero-visual" aria-label="Navegación rápida">
          <div className="visual-nav-inner">
            <div className="grid grid-cols-1 gap-6">
              <div className="nav-word">
                <a href="#about" className="underline-animated">{t('nav.about')}</a>
              </div>
              <div className="nav-word">
                <a href="#experience" className="underline-animated">{t('nav.experience')}</a>
              </div>
              <div className="nav-word">
                <a href="#projects" className="underline-animated">{t('nav.projects')}</a>
              </div>
              <div className="nav-word">
                <a href="#skills" className="underline-animated">{t('nav.skills')}</a>
              </div>
              <div className="nav-word">
                <a href="#contact" className="underline-animated">{t('nav.contact')}</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default memo(HeroSection)
