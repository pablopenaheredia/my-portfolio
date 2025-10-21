import { useEffect, useLayoutEffect, Fragment } from 'react'
import { motion } from 'framer-motion'
import { NavDot, InPageNavManager, MobileMenu } from '../components/navigation'
import { Timeline } from '../components/layout'
import { SectionDivider, Toast } from '../components/common'
import { AboutSection, ContactSection, SkillsSection } from '../components/sections'
// MUI icons for social buttons - optimized imports
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

import { projects, navItems } from '../data'
import { useClipboard } from '../hooks'
import { debounce } from '../utils'

export default function Home(){
  // Ensure we reset scroll to top before first paint to avoid jump on reload
  useLayoutEffect(()=>{ window.scrollTo(0,0) }, [])
  
  // Use custom clipboard hook
  const { copyToClipboard, showToast, setShowToast, toastMessage } = useClipboard()
  
  // expose hero content left inset as a CSS variable so the right-side visual nav can align to it
  useEffect(() => {
    const setInset = () => {
      try {
        // measure the hero content container (site-container) to avoid counting the fixed left nav
        const heroContainer = document.querySelector('.hero-content-container')
        if (!heroContainer) return
        const rect = heroContainer.getBoundingClientRect()
        const inset = Math.round(rect.left)
        document.documentElement.style.setProperty('--hero-left-inset', `${inset}px`)
      } catch (err) {
        // ignore
      }
    }

    setInset()
    
    // Debounce resize handler to avoid excessive calculations
    const debouncedSetInset = debounce(setInset, 150)
    window.addEventListener('resize', debouncedSetInset)
    
    return () => {
      window.removeEventListener('resize', debouncedSetInset)
    }
  }, [])

  return (
  <>
  <main id="main-content" className="min-h-screen relative overflow-hidden">
    {/* Skip link for keyboard users */}
    <a href="#main-content" className="skip-link">Saltar al contenido</a>
    <InPageNavManager />
    <MobileMenu />
      {/* left nav with anchors to sections - hidden on mobile */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-50 hidden md:flex" aria-label="Main navigation">
        <div className="relative h-full flex items-center">
            <div className="absolute top-6 left-0 w-full flex flex-col items-center gap-2">
              <a href="#home" className="hidden md:inline-block text-color-100 text-sm font-light tracking-wider rotate-180 vertical-rl">INICIO</a>
              <a href="#home" className="md:hidden text-color-100 text-sm font-light tracking-wider">INICIO</a>
          </div>

          <div className="mx-auto">
              <div className="nav-icons flex flex-col gap-8 items-center">
                {navItems.map((item) => (
                  <NavDot key={item.href} href={item.href} label={item.label} />
                ))}
            </div>
          </div>
        </div>
      </nav>

  <div className="content md:ml-14 lg:ml-14 xl:ml-14">
        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center section-padding relative">
          <div className="hero-content-container site-container flex items-center justify-between gap-4">
            <header className="hero-content flex-1 max-w-2xl" aria-labelledby="hero-title">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="hero-label mb-8">
                <p className="text-color-100/60 text-sm tracking-[0.3em] uppercase font-light">PABLO PENA HEREDIA</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                {/* Inlined GradientHero content (moved from src/components/GradientHero.jsx)") */}
                {(() => {
                  const highlight = 'Analista QA'
                  const titleRest = '& Desarrollador Fullstack'
                  const description = 'Ingeniero de QA y desarrollador Fullstack enfocado en automatización de pruebas, confiabilidad y arquitecturas claras. Actualmente disponible para proyectos y colaboraciones.'
                  const ctaLabel = 'Descargar CV'
                  const ctaHref = '/resume.pdf'
                  const ctaDownload = true
                  const extraActions = (
                    <>
                      <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="btn-subtle btn-no-border btn-gloss focus-ring" title="LinkedIn">
                        <LinkedInIcon className="icon-md icon-hover" />
                      </a>

                      <a href="https://github.com/" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="btn-subtle btn-no-border btn-gloss focus-ring" title="GitHub">
                        <GitHubIcon className="icon-md icon-hover" />
                      </a>

                      {/* Email icon + address shown next to GitHub - matches social buttons spacing and style */}
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
                        <EmailOutlinedIcon className="icon-md icon-hover" />
                        <span className="text-color-100 text-base font-medium hidden sm:inline">pablopenaheredia@gmail.com</span>
                      </button>
                    </>
                  )

                  // allow newline in highlight ("QA\nAUTOMATION")
                  const parts = String(highlight).split('\n')

                  return (
                    <div>
                      <h1 className="mb-6 text-color-100 font-light">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-300 to-color-500 block hero-headline-large">
                          {parts.map((p, i) => (
                            <Fragment key={i}>
                              {p}
                              {i < parts.length - 1 ? <br /> : ''}
                            </Fragment>
                          ))}
                        </span>
                        {titleRest && <span className="block text-color-100/70 mt-1 hero-headline-small">{titleRest}</span>}
                      </h1>

                      {description && (
                        <p className="text-color-100 text-base lg:text-lg max-w-xl font-light">{description}</p>
                      )}

                      {ctaLabel && ctaHref && (
                        <div className="mt-6 hero-cta-wrapper">
                          <a href={ctaHref} download={ctaDownload} className="btn-primary inline-flex items-center hero-cta-large" aria-label={ctaLabel}>
                            {/* download icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span className="ml-2">{ctaLabel}</span>
                          </a>

                          {extraActions && (
                            <div className="ml-4 flex items-center gap-3">
                              {extraActions}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })()}
              </motion.div>
            </header>

            {/* right visual nav placed side-by-side with hero content to avoid vertical scroll */}
            {/* right-side menu: absolutely positioned to the right on md+, hidden on small */}
            <aside className="hero-visual" aria-label="Quick navigation">
              <div className="visual-nav-inner">
                <div className="grid grid-cols-1 gap-6">
                  {navItems.map((item) => (
                    <motion.div key={item.href} whileHover={{ x: -20 }} className="nav-word">
                      <a href={item.href} className="underline-animated">{item.label.toUpperCase()}</a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        

        {/* ABOUT (merged) */}
  <SectionDivider label="SOBRE MÍ" />
  <AboutSection />

        {/* EXPERIENCE (moved out from About) */}
  <SectionDivider label="EXPERIENCIA" />
  <section id="experience" className="experience-section section-padding">
          <div className="site-container">
            <Timeline />
          </div>
        </section>

  {/* PROJECTS (merged) */}
  <SectionDivider label="PROYECTOS" />
  <section id="projects" className="projects-section section-padding">
          <div className="projects-list site-container">
            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6">
              {projects.slice(0,3).map((project, i) => {
                const itemClass = i === 0 ? 'col-span-1 md:col-span-4 md:row-span-2' : 'col-span-1 md:col-span-2'
                const imgClass = i === 0 ? 'w-full h-auto md:h-[520px] object-cover' : 'w-full h-auto md:h-[260px] object-cover'

                return (
                  <motion.article key={project.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className={`project-item group ${itemClass} bg-gradient-to-br from-color-900/30 to-color-950/30 rounded-xl border border-color-500/10 hover:border-color-400/30 transition-all duration-300 overflow-hidden`}>
                    <div className="overflow-hidden">
                      <img src={project.image} alt={project.name} loading="lazy" width="1000" height="600" className={`${imgClass} transition-transform duration-500 group-hover:scale-105`} />
                    </div>

                    <div className="p-6">
                      <h3 className="text-color-300 text-xl md:text-2xl font-light mb-3 group-hover:text-color-400 transition-colors">{project.name}</h3>
                      <p className="text-color-100/80 font-light mb-4 text-sm md:text-base leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="project-tech-tag">{tech}</span>
                        ))}
                      </div>
                      <a href={`#projects`} className="inline-flex items-center gap-2 text-color-400 text-sm hover:text-color-300 transition-colors group/link">
                        <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>

        </section>

        {/* SKILLS (moved out from Projects) */}
        <SectionDivider label="HABILIDADES" />
        <section id="skills" className="skills-section section-padding">
          <div className="site-container">
            <SkillsSection />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <SectionDivider label="CONTACTO" />
        <ContactSection />

      </div>
    </main>
    {/* Toast portal */}
    <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
  </>
  )
}
