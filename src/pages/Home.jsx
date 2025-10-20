import React, { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavDot from '../components/NavDot'
import InPageNavManager from '../components/InPageNavManager'
import Timeline from '../components/TimelineOld'
import MobileMenu from '../components/MobileMenu'
// MUI icons for social buttons
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Toast from '../components/Toast'

import css3 from '../assets/css3.svg'
import SkillsSection from '../components/SkillsSection'

import projects from '../data/projects'

export default function Home(){
  // Ensure we reset scroll to top before first paint to avoid jump on reload
  useLayoutEffect(()=>{ window.scrollTo(0,0) }, [])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
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
    window.addEventListener('resize', setInset)
    return () => window.removeEventListener('resize', setInset)
  }, [])

  return (
  <>
  <main id="home" className="min-h-screen relative overflow-hidden">
    {/* Skip link for keyboard users */}
    <a href="#home" className="skip-link">Saltar al contenido</a>
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
                <NavDot href="#about" label="Sobre mí" />
                <NavDot href="#experience" label="Experiencia" />
                <NavDot href="#projects" label="Proyectos" />
                <NavDot href="#skills" label="Habilidades" />
                <NavDot href="#contact" label="Contacto" />
            </div>
          </div>
        </div>
      </nav>

  <div className="content md:ml-14 lg:ml-14 xl:ml-14">
        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center px-4 md:px-12 relative">
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
                          const email = 'pablopenaheredia@gmail.com'
                          const doShowSuccess = () => {
                            setToastMessage('Email copiado en el portapapeles')
                            setShowToast(true)
                          }

                          const doShowFail = () => {
                            setToastMessage('No se pudo copiar el email')
                            setShowToast(true)
                          }

                          if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(email).then(() => doShowSuccess()).catch(() => doShowFail())
                          } else {
                            try {
                              const ta = document.createElement('textarea')
                              ta.value = email
                              document.body.appendChild(ta)
                              ta.select()
                              document.execCommand('copy')
                              document.body.removeChild(ta)
                              doShowSuccess()
                            } catch (err) {
                              doShowFail()
                            }
                          }
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
                            <React.Fragment key={i}>
                              {p}
                              {i < parts.length - 1 ? <br /> : ''}
                            </React.Fragment>
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
            <aside className="hero-visual" aria-hidden="true">
              <div className="visual-nav-inner">
                <div className="grid grid-cols-1 gap-6">
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#about" className="underline-animated">SOBRE MÍ</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#experience" className="underline-animated">EXPERIENCIA</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#projects" className="underline-animated">PROYECTOS</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#skills" className="underline-animated">HABILIDADES</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#contact" className="underline-animated">CONTACTO</a></motion.div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        

        {/* ABOUT (merged) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">SOBRE MÍ</div>
  </div>
  <section id="about" className="about-section px-4 md:px-12">
          <div className="about-container site-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Foto primero en móvil, después en desktop */}
            <aside className="about-visual order-1 lg:order-2" aria-labelledby="stack-heading">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-md mx-auto lg:sticky lg:top-20 mb-8 lg:mb-0">
                <img src="/profile.svg" alt="Pablo Pena" loading="lazy" width="560" height="420" className="w-full rounded-lg animate-soft-pulse elevated" />
              </motion.div>
            </aside>

            <article className="about-text order-2 lg:order-1">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-color-100 text-xl font-light leading-relaxed mb-8">Me llamo Pablo Pena Heredia, y soy Analista QA y Desarrollador Fullstack. Me apasiona asegurar la calidad del software desde el inicio del ciclo de vida del desarrollo.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bio-text space-y-6 text-color-100/70 font-light">
                <p>Durante mi recorrido, trabajé como QA Manual Trainee, diseñando planes de prueba, ejecutando casos y gestionando defectos en Jira X-Ray.
                  Además, desarrollé un proyecto personal de automatización con Playwright y TypeScript. También participé en equipos de trabajo donde aplicamos estrategias de testing reales en entornos de prueba de aplicaciones web de Startups.</p>
                <p>En mi tésis, desarrollé un sistema fullstack orientado a salones de estética con React, TypeScript, NestJS y MySQL, aplicando buenas prácticas de desarrollo y metodologías ágiles.</p>
                <p>Hoy mi objetivo es seguir creciendo en el campo de la calidad de software y el desarrollo del mismo, aportando soluciones escalables. Me motiva aprender nuevas tecnologías y compartir lo que aprendo, colaborar con equipos y construyendo productos que ofrezcan experiencias confiables.</p>
              </motion.div>
            </article>
          </div>
        </section>

        {/* EXPERIENCE (moved out from About) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">EXPERIENCIA</div>
  </div>
  <section id="experience" className="experience-section px-4 md:px-12">
          <div className="site-container">
            <Timeline />
          </div>
        </section>

  {/* PROJECTS (merged) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">PROYECTOS</div>
  </div>
  <section id="projects" className="projects-section px-4 md:px-12">
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
        <div className="section-divider-wrapper">
          <div className="section-divider" aria-hidden="true">HABILIDADES</div>
        </div>
        <section id="skills" className="skills-section px-4 md:px-12">
          <div className="site-container">
            <SkillsSection />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <div className="section-divider-wrapper">
          <div className="section-divider" aria-hidden="true">CONTACTO</div>
        </div>
        <section id="contact" className="contact-section px-4 md:px-12 py-16">
          <div className="site-container max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-color-100 text-3xl md:text-4xl font-light mb-4">Quieres...</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Offer Job Opportunity */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="contact-card">
                <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">¿Ofrecer una oportunidad laboral?</h3>
                <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
                  Estoy abierto a oportunidades laborales o colaboraciones. Con experiencia en aseguramiento de calidad y desarrollo de software, me interesan roles que me permitan trabajar en proyectos desafiantes y significativos. Si tienes un proyecto o una posición en mente contáctame!.
                </p>
              </motion.div>

              {/* Connect */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="contact-card">
                <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">¿Conectar?</h3>
                <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
                  El networking es clave en la industria IT, y siempre busco conocer gente nueva y ampliar mi círculo profesional. Si compartes intereses similares o estas interesado en conversar sobre algo, no dudes en contactarme.
                </p>
              </motion.div>

              {/* Build Something */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="contact-card">
                <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">¿Que testee tu software o construir algo juntos?</h3>
                <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
                  Me apasiona tanto el testing como el desarrollo de software aplicando buenas prácticas. Ya sea desarrollar un proyecto o testear uno existente, estoy listo para nuevos desafíos. Si tienes una idea o proyecto en mente, hablemos y veamos cómo podemos colaborar.
                </p>
              </motion.div>
            </div>

            {/* Contact Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              <a href="mailto:pablopenaheredia@gmail.com" className="contact-link">Correo</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
              <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
              <a href="/resume.pdf" download className="contact-link">CV</a>
            </motion.div>

            {/* Back to top arrow */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex justify-center mt-12">
              <a href="#home" className="back-to-top" aria-label="Back to top">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7-7 7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
    {/* Toast portal */}
    <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
  </>
  )
}
