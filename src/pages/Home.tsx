import { useEffect, useLayoutEffect } from 'react'
import { NavDot, InPageNavManager, MobileMenu } from '../components/navigation'
import { Timeline } from '../components/layout'
import { SectionDivider, Toast } from '../components/common'
import { AboutSection, ContactSection, SkillsSection } from '../components/sections'
import GradientHero from '../components/GradientHero'
import LanguageToggle from '../components/LanguageToggle'
import { useLanguage } from '../contexts/LanguageContext'

import { projects, navItems } from '../data'
import { useClipboard } from '../hooks'
import { debounce } from '../utils'

export default function Home(){
  // reset scroll before first paint
  useLayoutEffect(()=>{ window.scrollTo(0,0) }, [])
  
  // clipboard hook
  const { copyToClipboard, showToast, setShowToast, toastMessage } = useClipboard()
  
  // translation hook
  const { t } = useLanguage()

  // Contenido del hero trasladado a componente
  const highlight = t('hero.title')
  const titleRest = t('hero.subtitle')
  const description = t('hero.description')
  const ctaLabel = t('hero.downloadCV')
  const extraActions = (
    <>
      <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="btn-subtle btn-no-border btn-gloss focus-ring" title="LinkedIn">
        <svg className="icon-md icon-hover" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      <a href="https://github.com/pablopenaheredia" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="btn-subtle btn-no-border btn-gloss focus-ring" title="GitHub">
        <svg className="icon-md icon-hover" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>

      {/* Icono de email + dirección mostrado junto a GitHub - coincide con el espaciado y estilo de los botones sociales */}
      <button
        type="button"
        aria-label="Copiar email"
        title="Copiar email"
        className="btn-subtle btn-no-border btn-gloss focus-ring flex items-center gap-2"
        onClick={(e) => {
          e.preventDefault()
          copyToClipboard('pablopenaheredia@gmail.com')
        }}
      >
        <svg className="icon-md icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <span className="text-color-100 font-medium hidden sm:inline" style={{ fontSize: '0.95rem' }}>pablopenaheredia@gmail.com</span>
      </button>

      <LanguageToggle />
    </>
  )
  
  // expose hero left inset as css var for visual nav alignment
  useEffect(() => {
    const setInset = () => {
      try {
  // measure hero container to get left offset
        const heroContainer = document.querySelector('.hero-content-container')
        if (!heroContainer) return
        const rect = heroContainer.getBoundingClientRect()
        const inset = Math.round(rect.left)
        document.documentElement.style.setProperty('--hero-left-inset', `${inset}px`)
      } catch (err) {
  // silent fail
      }
    }

    setInset()
    
  // debounced resize handler
    const debouncedSetInset = debounce(setInset, 150)
    window.addEventListener('resize', debouncedSetInset)
    
    return () => {
      window.removeEventListener('resize', debouncedSetInset)
    }
  }, [])

  return (
  <>
  <main id="main-content" className="min-h-screen relative overflow-hidden">
  {/* skip link for keyboard users */}
    <a href="#main-content" className="skip-link">Saltar al contenido</a>
    <InPageNavManager />
    <MobileMenu />
    {/* left nav - hidden on mobile */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-50 hidden md:flex" aria-label="Main navigation">
          <div className="relative h-full flex items-center">
            <div className="absolute top-6 left-0 w-full flex flex-col items-center gap-2">
              <a href="#home" className="hidden md:inline-block text-color-100 text-sm font-light tracking-wider rotate-180 vertical-rl">{t('nav.home')}</a>
              <a href="#home" className="md:hidden text-color-100 text-sm font-light tracking-wider">{t('nav.home')}</a>
          </div>          <div className="mx-auto">
              <div className="nav-icons flex flex-col gap-8 items-center">
                {navItems.map((item) => (
                  <NavDot key={item.href} href={item.href} label={item.label} />
                ))}
            </div>
          </div>
        </div>
      </nav>

  <div className="content md:ml-14 lg:ml-14 xl:ml-14">
  {/* hero */}
        <section id="home" className="hero min-h-screen flex items-center section-padding relative">
          <div className="hero-content-container site-container flex items-center justify-between gap-4">
            <header className="hero-content flex-1 max-w-2xl" aria-labelledby="hero-title">
              <div className="hero-label mb-8 animate-fade-in">
                <p className="text-color-100/60 text-sm tracking-[0.3em] uppercase font-light">{t('hero.name')}</p>
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

            {/* right visual nav - absolute positioned on md+, hidden on mobile */}
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

        

  {/* about */}
  <SectionDivider label={t('section.about')} />
  <AboutSection />

  {/* experience */}
  <SectionDivider label={t('section.experience')} />
  <section id="experience" className="experience-section section-padding">
          <div className="site-container">
            <Timeline />
          </div>
        </section>

  {/* projects */}
  <SectionDivider label={t('section.projects')} />
  <section id="projects" className="projects-section section-padding">
          <div className="projects-list site-container">
            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6">
              {projects.slice(0,3).map((project, i) => {
                const itemClass = i === 0 ? 'col-span-1 md:col-span-4 md:row-span-2' : 'col-span-1 md:col-span-2'
                const imgClass = i === 0 ? 'w-full h-auto md:h-[520px] object-cover' : 'w-full h-auto md:h-[260px] object-cover'

                return (
                  <article key={project.id} className={`project-item group fade-in-on-scroll ${itemClass} bg-gradient-to-br from-color-900/30 to-color-950/30 rounded-xl border border-color-500/10 hover:border-color-400/30 transition-all duration-300 overflow-hidden`} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className="overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={`Captura de pantalla del proyecto ${project.name}`} 
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        width={1000} 
                        height={600}
                        className={`${imgClass} transition-transform duration-500 group-hover:scale-105`} 
                      />
                    </div>

                    <div className="p-6">
                      <h2 className="text-color-300 text-xl md:text-2xl font-light mb-3 group-hover:text-color-400 transition-colors">{t(`project.${project.id === 'p1' ? 'trimly' : project.id === 'p2' ? 'orangehrm' : 'spaceinvaders'}.name`)}</h2>
                      <p className="text-color-100/80 font-light mb-2 text-sm md:text-base leading-relaxed">{t(`project.${project.id === 'p1' ? 'trimly' : project.id === 'p2' ? 'orangehrm' : 'spaceinvaders'}.description`)}</p>
                      {project.explanation && (
                        <p className="text-color-100/60 font-light mb-4 text-xs md:text-sm leading-relaxed">{t(`project.${project.id === 'p1' ? 'trimly' : project.id === 'p2' ? 'orangehrm' : 'spaceinvaders'}.explanation`)}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="project-tech-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 items-center">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer noopener" 
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-color-500/10 hover:bg-color-500/20 border border-color-500/20 hover:border-color-400/30 rounded-lg text-color-400 text-sm hover:text-color-300 transition-all group/github"
                          aria-label={`Ver código de ${project.name} en GitHub`}
                        >
                          <svg className="w-4 h-4 transition-transform group-hover/github:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>{t('project.button.github')}</span>
                        </a>
                        {project.docsUrl && (
                          <a 
                            href={project.docsUrl} 
                            target="_blank" 
                            rel="noreferrer noopener" 
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-color-500/10 hover:bg-color-500/20 border border-color-500/20 hover:border-color-400/30 rounded-lg text-color-400 text-sm hover:text-color-300 transition-all group/docs"
                            aria-label={`Ver documentación de ${project.name}`}
                          >
                            <svg className="w-4 h-4 transition-transform group-hover/docs:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{t('project.button.docs')}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

        </section>

  {/* skills */}
        <SectionDivider label={t('section.skills')} />
        <section id="skills" className="skills-section section-padding">
          <div className="site-container">
            <SkillsSection />
          </div>
        </section>

  {/* contact */}
        <SectionDivider label={t('section.contact')} />
        <ContactSection />

      </div>
    </main>
  {/* toast portal */}
    <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
  </>
  )
}
