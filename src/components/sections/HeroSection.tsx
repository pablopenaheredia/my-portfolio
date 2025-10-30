import { useEffect, useMemo, memo } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useClipboard } from '../../hooks'
import { debounce } from '../../utils'
import { GradientHero, LanguageToggle } from '../ui'

function HeroSection() {
  const { t } = useLanguage()
  const { copyToClipboard } = useClipboard()

  // Hero content
  const highlight = t('hero.title')
  const titleRest = t('hero.subtitle')
  const description = t('hero.description')
  const ctaLabel = t('hero.downloadCV')

  const extraActions = useMemo(() => (
    <>
      <a
        href="https://www.linkedin.com/in/pablopenah/"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="LinkedIn"
        className="btn-social"
        title="LinkedIn"
      >
        <svg className="icon-md icon-hover" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      <a
        href="https://github.com/pablopenaheredia"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub"
        className="btn-social"
        title="GitHub"
      >
        <svg className="icon-md icon-hover" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>

      <button
        type="button"
        aria-label="Copiar email"
        title="Copiar email"
        className="btn-social flex items-center gap-2"
        onClick={(e) => {
          e.preventDefault()
          copyToClipboard('pablopenaheredia@gmail.com')
        }}
      >
        <svg className="icon-md icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <span className="text-color-100 font-medium hidden sm:inline" style={{ fontSize: '0.95rem' }}>
          pablopenaheredia@gmail.com
        </span>
      </button>

      <LanguageToggle />
    </>
  ), [copyToClipboard])

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
              extraActions={extraActions}
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
