import React, { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavDot from '../components/NavDot'
import InPageNavManager from '../components/InPageNavManager'
import Timeline from '../components/TimelineOld'
import GradientHero from '../components/GradientHero'
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
  <main id="home" className="min-h-screen bg-color-950 relative overflow-hidden">
    {/* Skip link for keyboard users */}
    <a href="#home" className="skip-link">Saltar al contenido</a>
    <InPageNavManager />
      {/* left nav with anchors to sections */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-50" aria-label="Main navigation">
        <div className="relative h-full flex items-center">
            <div className="absolute top-6 left-0 w-full flex flex-col items-center gap-2">
            <a href="#home" className="hidden md:inline-block text-color-100 text-sm font-light tracking-wider rotate-180 vertical-rl">HOME</a>
            <a href="#home" className="md:hidden text-color-100 text-sm font-light tracking-wider">HOME</a>

            {/* social icons (moved next to hero CTA on desktop) */}
            <div className="left-socials hidden md:flex flex-col items-center gap-3 mt-6" aria-hidden="true">
              {/* empty placeholder to preserve left column spacing on desktop */}
            </div>
          </div>

          <div className="mx-auto">
              <div className="nav-icons flex flex-col gap-8 items-center justify-center">
              <NavDot href="#about" label="About" />
              <NavDot href="#experience" label="Experience" />
              <NavDot href="#projects" label="Projects" />
            </div>
          </div>
        </div>
      </nav>

  <div className="content ml-16">
        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center px-12 relative">
          <div className="hero-content-container site-container w-full mx-0 flex items-center justify-between gap-8">
            <header className="hero-content flex-1 text-left md:-ml-10 lg:-ml-20 xl:-ml-28" aria-labelledby="hero-title">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="hero-label mb-8">
                <p className="text-color-100/60 text-sm tracking-[0.3em] uppercase font-light">PABLO PEÑA HEREDIA</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <GradientHero
                  ctaLabel={"Download CV"}
                  ctaHref={"/resume.pdf"}
                  ctaDownload={true}
                  extraActions={(
                    <>
                      <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="btn-subtle btn-no-border btn-gloss p-2 rounded focus-ring" title="LinkedIn">
                        <LinkedInIcon className="icon-md icon-hover" />
                      </a>

                      <a href="https://github.com/" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="btn-subtle btn-no-border btn-gloss p-2 rounded focus-ring" title="GitHub">
                        <GitHubIcon className="icon-md icon-hover" />
                      </a>

                      {/* Email icon + address shown next to GitHub - matches social buttons spacing and style */}
                      <button
                        type="button"
                        aria-label="Copiar email"
                        title="Copiar email"
                        className="btn-subtle btn-no-border btn-gloss p-2 rounded focus-ring flex items-center gap-2"
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
                  )}
                />
              </motion.div>
            </header>

            {/* right visual nav placed side-by-side with hero content to avoid vertical scroll */}
            {/* right-side menu: absolutely positioned to the right on md+, hidden on small */}
            <aside className="hero-visual hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-1/3 max-w-[520px] pr-6" aria-hidden="true">
              <div className="visual-nav-inner flex flex-col items-end gap-6">
                <div className="grid grid-cols-1 gap-6 text-right">
                    <motion.div whileHover={{ x: -20 }} className="nav-word text-color-100/70 hover:text-color-100 transition-colors duration-300 text-[clamp(2.5rem,6vw,4rem)] font-light leading-none tracking-tight"><a href="#about" className="underline-animated cursor-pointer">ABOUT</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word text-color-100/70 hover:text-color-100 transition-colors duration-300 text-[clamp(2.5rem,6vw,4rem)] font-light leading-none tracking-tight"><a href="#experience" className="underline-animated cursor-pointer">EXPERIENCE</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word text-color-100/70 hover:text-color-100 transition-colors duration-300 text-[clamp(2.5rem,6vw,4rem)] font-light leading-none tracking-tight"><a href="#projects" className="underline-animated cursor-pointer">PROJECTS</a></motion.div>
                    {/* small Resume button removed - CTA is in the hero */}
                    {/* CONTACT removed */}
                </div>
              </div>
            </aside>
          </div>
        </section>

        

        {/* ABOUT (merged) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">ABOUT</div>
  </div>
  <section id="about" className="about-section px-12 py-12">
          <div className="about-container site-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <article className="about-text">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-color-100 text-xl font-light leading-relaxed mb-8">I'm Pablo. QA engineer, automation specialist and fullstack developer focused on quality and scalability.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bio-text space-y-6 text-color-100/70 text-base leading-relaxed font-light">
                <p>The intersection of software quality and product development has always fascinated me. I've jumped in to try everything from manual testing and Playwright automation to fullstack development with React and NestJS.</p>
                <p>Fast-forward to 2025: I've worked on test strategy, QA automation, web development, REST APIs, database design and product management. Each project helped me grow toward where I am now.</p>
              </motion.div>
            </article>

            <aside className="about-visual" aria-labelledby="stack-heading">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="sticky-wrapper max-w-md mx-auto lg:sticky lg:top-20">
                <div className="image-container w-full">
                  <img src="/profile.svg" alt="Pablo Peña" loading="lazy" width="560" height="420" className="w-full h-auto rounded-lg mb-4 img-elevated animate-soft-pulse" />
                </div>
                {/* Profile image only; Stack moved to Projects section */}
              </motion.div>
            </aside>
          </div>
        </section>

        {/* EXPERIENCE (moved out from About) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">EXPERIENCE</div>
  </div>
  <section id="experience" className="experience-section px-12 py-48">
          <div className="site-container">
            <header className="mb-8">
            </header>
            <Timeline />
          </div>
        </section>

  {/* PROJECTS (merged) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">PROJECTS</div>
  </div>
  <section id="projects" className="projects-section px-12 py-32">

          <div className="projects-list site-container">
            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6">
              {projects.slice(0,3).map((project, i) => {
                // Bento layout: first item is large (left) spanning 4 cols and 2 rows on md+
                const itemClass = i === 0 ? 'col-span-1 md:col-span-4 md:row-span-2' : 'col-span-1 md:col-span-2'
                const imgClass = i === 0 ? 'w-full h-auto md:h-[520px] object-cover' : 'w-full h-auto md:h-[260px] object-cover'

                return (
                  <motion.article key={project.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className={`project-item group ${itemClass}`}>
                    <div className="block mb-4 overflow-hidden rounded-lg card-hover box-violet card-border">
                      <img src={project.image} alt={project.name} loading="lazy" width="1000" height="600" className={`${imgClass} transition-transform duration-500 group-hover:scale-105`} />
                    </div>

                    <div className="px-0 md:px-2">
                      <h3 className="app-h3 text-color-100 font-light mb-2">{project.name}</h3>
                      <p className="text-color-100 text-base font-light leading-relaxed mb-4">{project.description}</p>
                      <p className="text-color-500 text-sm mb-4 font-medium tech-shadow">{project.technologies.join(' · ')}</p>
                      <a href={`#projects`} className="text-color-100 text-sm hover:text-color-500 transition-colors">View case →</a>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>

        </section>

        {/* SKILLS (moved out from Projects) */}
        <div className="section-divider-wrapper">
          <div className="section-divider" aria-hidden="true">SKILLS</div>
        </div>
        <section id="skills" className="skills-section px-12 py-24">
          <div className="site-container">
            <header className="mb-8">
            </header>
            <SkillsSection />
          </div>
        </section>

        {/* contact section removed */}

      </div>
    </main>
    {/* Toast portal */}
    <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
  </>
  )
}
