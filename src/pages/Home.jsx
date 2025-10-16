import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import NavDot from '../components/NavDot'
import InPageNavManager from '../components/InPageNavManager'
import Timeline from '../components/TimelineOld'
import GradientHero from '../components/GradientHero'
// MUI icons for social buttons
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

import css3 from '../assets/css3.svg'
import SkillsSection from '../components/SkillsSection'

import projects from '../data/projects'

export default function Home(){
  useEffect(()=>{ window.scrollTo({top:0, behavior:'auto'}) }, [])

  return (
  <main id="home" className="min-h-screen bg-color-950 relative overflow-hidden">
    <InPageNavManager />
      {/* left nav with anchors to sections */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-50">
        <div className="relative h-full flex items-center">
            <div className="absolute top-6 left-0 w-full flex flex-col items-center gap-2">
            <a href="#home" className="hidden md:inline-block text-color-100 text-sm font-light tracking-wider rotate-180 vertical-rl">HOME</a>
            <a href="#home" className="md:hidden text-color-100 text-sm font-light tracking-wider">HOME</a>

            {/* social icons under HOME (vertical) */}
            <div className="left-socials hidden md:flex flex-col items-center gap-3 mt-6">
              <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="social-icon p-1 rounded">
                <LinkedInIcon className="icon-sm icon-hover" />
              </a>

              <a href="https://github.com/" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="social-icon p-1 rounded">
                <GitHubIcon className="icon-sm icon-hover" />
              </a>
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

      <div className="content ml-16 min-h-screen">
        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center px-12 relative">
          <div className="hero-content-container site-container w-full mx-0 flex items-center justify-between gap-8">
            <header className="hero-content flex-1 text-left md:-ml-10 lg:-ml-20 xl:-ml-28" aria-labelledby="hero-title">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="hero-label mb-8">
                <p className="text-color-100/60 text-sm tracking-[0.3em] uppercase font-light">PABLO PEÑA HEREDIA</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <GradientHero ctaLabel={"Download CV"} ctaHref={"/resume.pdf"} ctaDownload={true} />
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
        <section id="about" className="about-section min-h-screen px-12 py-24">
          <div className="about-container site-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <article className="about-text">
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="app-h2 text-color-100 font-light leading-[1.1] tracking-tight mb-8">About</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-color-100 text-xl font-light leading-relaxed mb-8">I'm Pablo. QA engineer, automation specialist and fullstack developer focused on quality and scalability.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bio-text space-y-6 text-color-100/70 text-base leading-relaxed font-light">
                <p>The intersection of software quality and product development has always fascinated me. I've jumped in to try everything from manual testing and Playwright automation to fullstack development with React and NestJS.</p>
                <p>Fast-forward to 2025: I've worked on test strategy, QA automation, web development, REST APIs, database design and product management. Each project helped me grow toward where I am now.</p>
              </motion.div>
            </article>

            <aside className="about-visual" aria-labelledby="stack-heading">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="sticky-wrapper max-w-md mx-auto lg:sticky lg:top-20">
                <div className="image-container w-full">
                  <img src="/profile.svg" alt="Pablo Peña" className="w-full h-auto rounded-lg mb-4 img-elevated animate-soft-pulse" />
                </div>
                {/* Profile image only; Stack moved to Projects section */}
              </motion.div>
            </aside>
          </div>
        </section>

        {/* EXPERIENCE (moved out from About) */}
        <section id="experience" className="experience-section min-h-screen px-12 py-24">
          <div className="site-container">
            <header className="mb-8">
              <h2 className="app-h2 text-[#e8e6ef] font-light">Experience</h2>
              <p className="text-[#e8e6ef]/60 mt-2">Extract from CV — roles and responsibilities.</p>
            </header>
            <Timeline />
          </div>
        </section>

        {/* PROJECTS (merged) */}
        <section id="projects" className="projects-section min-h-screen px-12 py-24">
          <header className="section-header site-container mb-12">
            <motion.h2 className="app-h2 text-[#e8e6ef] font-light leading-[1.1] mb-4">Projects</motion.h2>
            <p className="text-[#e8e6ef]/60 text-base font-light max-w-2xl">A curated selection of work across automation, fullstack development and product.</p>
          </header>

          <div className="projects-list site-container">
            <div className="grid grid-cols-6 gap-6">
              {projects.map((project, i) => {
                const isLarge = i % 3 === 0
                return (
                  <motion.article key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }} className={`project-item group ${isLarge ? 'col-span-4 md:col-span-4' : 'col-span-2 md:col-span-2'}`}>
                      <div className="block mb-4 overflow-hidden rounded-lg card-hover box-violet card-border">
                        <img src={project.image} alt={project.name} className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105 card-border" />
                      </div>

                      <h3 className="app-h3 text-color-100 font-light mb-1">{project.name}</h3>
                      <p className="text-color-100/60 text-sm font-light leading-relaxed mb-3">{project.description}</p>
                      <p className="text-color-500 text-xs mb-2 font-medium tech-shadow">{project.technologies.join(' · ')}</p>
                      <a href={`#projects`} className="text-color-100/60 text-sm hover:text-color-500 transition-colors">View case →</a>
                  </motion.article>
                )
              })}
            </div>
          </div>

          <SkillsSection />
        </section>

        {/* contact section removed */}

      </div>
    </main>
  )
}
