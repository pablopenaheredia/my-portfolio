import React, { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavDot from '../components/NavDot'
import InPageNavManager from '../components/InPageNavManager'
import Timeline from '../components/TimelineOld'
import GradientHero from '../components/GradientHero'
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
            <a href="#home" className="hidden md:inline-block text-color-100 text-sm font-light tracking-wider rotate-180 vertical-rl">HOME</a>
            <a href="#home" className="md:hidden text-color-100 text-sm font-light tracking-wider">HOME</a>
          </div>

          <div className="mx-auto">
              <div className="nav-icons flex flex-col gap-8 items-center">
              <NavDot href="#about" label="About" />
              <NavDot href="#experience" label="Experience" />
              <NavDot href="#projects" label="Projects" />
              <NavDot href="#skills" label="Skills" />
            </div>
          </div>
        </div>
      </nav>

  <div className="content ml-16 md:ml-16 ml-0">
        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center px-4 md:px-12 relative">
          <div className="hero-content-container site-container flex items-center justify-between gap-4">
            <header className="hero-content flex-1 md:-ml-10 lg:-ml-20 xl:-ml-28" aria-labelledby="hero-title">
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
                  )}
                />
              </motion.div>
            </header>

            {/* right visual nav placed side-by-side with hero content to avoid vertical scroll */}
            {/* right-side menu: absolutely positioned to the right on md+, hidden on small */}
            <aside className="hero-visual" aria-hidden="true">
              <div className="visual-nav-inner">
                <div className="grid grid-cols-1 gap-6">
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#about" className="underline-animated">ABOUT</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#experience" className="underline-animated">EXPERIENCE</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#projects" className="underline-animated">PROJECTS</a></motion.div>
                    <motion.div whileHover={{ x: -20 }} className="nav-word"><a href="#skills" className="underline-animated">SKILLS</a></motion.div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        

        {/* ABOUT (merged) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">ABOUT</div>
  </div>
  <section id="about" className="about-section px-4 md:px-12">
          <div className="about-container site-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Foto primero en móvil, después en desktop */}
            <aside className="about-visual order-1 lg:order-2" aria-labelledby="stack-heading">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-md mx-auto lg:sticky lg:top-20 mb-8 lg:mb-0">
                <img src="/profile.svg" alt="Pablo Peña" loading="lazy" width="560" height="420" className="w-full rounded-lg animate-soft-pulse elevated" />
              </motion.div>
            </aside>

            <article className="about-text order-2 lg:order-1">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-color-100 text-xl font-light leading-relaxed mb-8">I'm Pablo. QA engineer, automation specialist and fullstack developer focused on quality and scalability.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bio-text space-y-6 text-color-100/70 font-light">
                <p>The intersection of software quality and product development has always fascinated me. I've jumped in to try everything from manual testing and Playwright automation to fullstack development with React and NestJS.</p>
                <p>Fast-forward to 2025: I've worked on test strategy, QA automation, web development, REST APIs, database design and product management. Each project helped me grow toward where I am now.</p>
              </motion.div>
            </article>
          </div>
        </section>

        {/* EXPERIENCE (moved out from About) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">EXPERIENCE</div>
  </div>
  <section id="experience" className="experience-section px-4 md:px-12">
          <div className="site-container">
            <Timeline />
          </div>
        </section>

  {/* PROJECTS (merged) */}
  <div className="section-divider-wrapper">
    <div className="section-divider" aria-hidden="true">PROJECTS</div>
  </div>
  <section id="projects" className="projects-section px-4 md:px-12">
          <div className="projects-list site-container">
            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6">
              {projects.slice(0,3).map((project, i) => {
                // Bento layout: first item is large (left) spanning 4 cols and 2 rows on md+
                const itemClass = i === 0 ? 'col-span-1 md:col-span-4 md:row-span-2' : 'col-span-1 md:col-span-2'
                const imgClass = i === 0 ? 'w-full h-auto md:h-[520px] object-cover' : 'w-full h-auto md:h-[260px] object-cover'

                return (
                  <motion.article key={project.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className={`project-item group ${itemClass}`}>
                    <div className="mb-4 overflow-hidden rounded-lg elevated">
                      <img src={project.image} alt={project.name} loading="lazy" width="1000" height="600" className={`${imgClass} transition-transform duration-500 group-hover:scale-105`} />
                    </div>

                    <div className="md:px-2">
                      <h3 className="app-h3 text-color-100 mb-2">{project.name}</h3>
                      <p className="text-color-100 font-light mb-4">{project.description}</p>
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
        <section id="skills" className="skills-section px-4 md:px-12">
          <div className="site-container">
            <SkillsSection />
          </div>
        </section>

        {/* CONTACT SECTION */}
        <div className="section-divider-wrapper">
          <div className="section-divider" aria-hidden="true">CONTACT</div>
        </div>
        <section id="contact" className="contact-section px-4 md:px-12 py-16">
          <div className="site-container max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-color-100 text-3xl md:text-4xl font-light mb-4">Want To</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Offer Job Opportunity */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="contact-card">
                <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">offer job opportunity?</h3>
                <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
                  I am open to discussing potential job opportunities or collaborations. With experience in web development and software engineering, I am interested in roles that allow me to work on exciting and challenging projects. If you have a project or role in mind, feel free to reach out and let's discuss!
                </p>
              </motion.div>

              {/* Connect */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="contact-card">
                <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">Connect?</h3>
                <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
                  Networking is key in the tech industry, and I'm always looking to meet new people and expand my professional circle. Whether you're a fellow developer, designer, or entrepreneur, I'd love to chat and learn more about your work. Let's grab a virtual coffee and see where the conversation takes us!
                </p>
              </motion.div>

              {/* Build Something */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="contact-card">
                <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">Build something?</h3>
                <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
                  I have a passion for developing innovative web applications that solve complex problems. Whether it's building a custom e-commerce platform or a cutting-edge web app, I'm always ready for a new challenge. Let's create something amazing together!
                </p>
              </motion.div>
            </div>

            {/* Contact Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              <a href="mailto:pablopenaheredia@gmail.com" className="contact-link">Email</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
              <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
              <a href="/resume.pdf" download className="contact-link">Resume</a>
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
    {/* Footer: page closure */}
    <footer className="site-footer py-12 mt-8">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="footer-left text-color-100/70">
          <p className="mb-2">Built & curated by Pablo Peña Heredia — QA Analyst & Fullstack Developer</p>
          <p className="text-sm">© {new Date().getFullYear()} Pablo Peña Heredia. All Rights Reserved.</p>
        </div>

        <div className="footer-actions flex items-center gap-4">
          <a href="#home" className="underline-animated text-color-100 hover:text-color-400">Back to top</a>
          <a href="mailto:pablopenaheredia@gmail.com" className="btn-subtle">Contact</a>
        </div>
      </div>
    </footer>
    {/* Toast portal */}
    <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
  </>
  )
}
