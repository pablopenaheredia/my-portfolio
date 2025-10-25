import { useEffect, useLayoutEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { NavDot, InPageNavManager, MobileMenu } from '../components/navigation'
import { Timeline } from '../components/layout'
import { SectionDivider, Toast } from '../components/common'
import { AboutSection, ContactSection, SkillsSection } from '../components/sections'
import GradientHero from '../components/GradientHero'

import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

import { projects, navItems } from '../data'
import { useClipboard } from '../hooks'
import { debounce } from '../utils'

export default function Home(){
  // Asegurar que resetemos el scroll al top antes del primer paint para evitar saltos al recargar
  useLayoutEffect(()=>{ window.scrollTo(0,0) }, [])
  
  // Usar el hook personalizado de portapapeles
  const { copyToClipboard, showToast, setShowToast, toastMessage } = useClipboard()

  // Contenido del hero trasladado a componente - memoizado para evitar re-creación
  const highlight = useMemo(() => 'Analista QA', [])
  const titleRest = useMemo(() => '& Desarrollador Fullstack', [])
  const description = useMemo(() => 'Ingeniero de QA y desarrollador Fullstack enfocado en automatización de pruebas, confiabilidad y arquitecturas claras. Actualmente disponible para proyectos y colaboraciones.', [])
  const ctaLabel = useMemo(() => 'Descargar CV', [])
  const ctaHref = useMemo(() => '/resume.pdf', [])
  const ctaDownload = useMemo(() => true, [])
  
  // Memoizar el handler de email
  const handleEmailClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    copyToClipboard('pablopenaheredia@gmail.com')
  }, [copyToClipboard])
  
  const extraActions = useMemo(() => (
    <>
      <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="btn-subtle btn-no-border btn-gloss focus-ring" title="LinkedIn">
        <LinkedInIcon className="icon-md icon-hover" />
      </a>

      <a href="https://github.com/" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="btn-subtle btn-no-border btn-gloss focus-ring" title="GitHub">
        <GitHubIcon className="icon-md icon-hover" />
      </a>

      {/* Icono de email + dirección mostrado junto a GitHub - coincide con el espaciado y estilo de los botones sociales */}
      <button
        type="button"
        aria-label="Copiar email"
        title="Copiar email"
        className="btn-subtle btn-no-border btn-gloss focus-ring flex items-center gap-2"
        onClick={handleEmailClick}
      >
        <EmailOutlinedIcon className="icon-md icon-hover" />
        <span className="text-color-100 text-base font-medium hidden sm:inline">pablopenaheredia@gmail.com</span>
      </button>
    </>
  ), [handleEmailClick])
  
  // exponer la diferencia izquierda del contenido del hero como variable CSS para que la navegación visual derecha pueda alinearse
  useEffect(() => {
    const setInset = () => {
      try {
  // medir el contenedor del contenido del hero (site-container) para evitar contar la navegación izquierda fija
        const heroContainer = document.querySelector('.hero-content-container')
        if (!heroContainer) return
        const rect = heroContainer.getBoundingClientRect()
        const inset = Math.round(rect.left)
        document.documentElement.style.setProperty('--hero-left-inset', `${inset}px`)
      } catch (err) {
  // ignorar
      }
    }

    setInset()
    
  // Debounce del manejador de resize para evitar cálculos excesivos
    const debouncedSetInset = debounce(setInset, 150)
    window.addEventListener('resize', debouncedSetInset)
    
    return () => {
      window.removeEventListener('resize', debouncedSetInset)
    }
  }, [])

  return (
  <>
  <main id="main-content" className="min-h-screen relative overflow-hidden">
  {/* Enlace de salto para usuarios de teclado */}
    <a href="#main-content" className="skip-link">Saltar al contenido</a>
    <InPageNavManager />
    <MobileMenu />
    {/* navegación izquierda con anclas a secciones - oculto en móvil */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-50 hidden md:flex" aria-label="Main navigation">
        <div className="relative h-full flex items-center">
            <div className="absolute top-6 left-0 w-full flex flex-col items-center gap-2">
              <a href="#home" className="hidden md:inline-block text-color-1npm run00 text-sm font-light tracking-wider rotate-180 vertical-rl">INICIO</a>
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
                <GradientHero
                  highlight={highlight}
                  titleRest={titleRest}
                  description={description}
                  ctaLabel={ctaLabel}
                  ctaHref={ctaHref}
                  ctaDownload={ctaDownload}
                  extraActions={extraActions}
                />
              </motion.div>
            </header>

            {/* navegación visual derecha colocada junto al contenido del hero para evitar scroll vertical */}
            {/* menú lateral derecho: posicionado absolutamente a la derecha en md+, oculto en pantallas pequeñas */}
            <aside className="hero-visual" aria-label="Navegación rápida">
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

        

  {/* ABOUT (fusionado) */}
  <SectionDivider label="SOBRE MÍ" />
  <AboutSection />

  {/* EXPERIENCE (movido fuera de About) */}
  <SectionDivider label="EXPERIENCIA" />
  <section id="experience" className="experience-section section-padding">
          <div className="site-container">
            <Timeline />
          </div>
        </section>

  {/* PROJECTS*/}
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
                      <img 
                        src={project.image} 
                        alt={`Captura de pantalla del proyecto ${project.name}`} 
                        loading={i === 0 ? "eager" : "lazy"} 
                        width="1000" 
                        height="600" 
                        decoding="async"
                        className={`${imgClass} transition-transform duration-500 group-hover:scale-105`} 
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-color-300 text-xl md:text-2xl font-light mb-3 group-hover:text-color-400 transition-colors">{project.name}</h3>
                      <p className="text-color-100/80 font-light mb-3 text-sm md:text-base leading-relaxed">{project.description}</p>
                      
                      {/* Explicación detallada sin icono */}
                      {project.explanation && (
                        <div className="mb-4 p-4 rounded-lg bg-color-500/5 border-l-2 border-color-400/40">
                          <p className="text-color-100/70 font-light text-xs md:text-sm leading-relaxed">{project.explanation}</p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="project-tech-tag">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <a 
                          href={project.githubUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-color-500/10 hover:bg-color-500/20 border border-color-500/20 hover:border-color-400/40 text-color-300 hover:text-color-200 text-sm font-medium transition-all duration-300"
                          aria-label={`Ver repositorio de GitHub de ${project.name}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          Ver GitHub
                        </a>
                        
                        {project.docsUrl && (
                          <a 
                            href={project.docsUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-color-400/10 hover:bg-color-400/20 border border-color-400/20 hover:border-color-400/40 text-color-300 hover:text-color-200 text-sm font-medium transition-all duration-300"
                            aria-label={`Ver documentación de ${project.name}`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Ver Documentación
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>

        </section>

  {/* SKILLS*/}
        <SectionDivider label="HABILIDADES" />
        <section id="skills" className="skills-section section-padding">
          <div className="site-container">
            <SkillsSection />
          </div>
        </section>

  {/*CONTACTO */}
        <SectionDivider label="CONTACTO" />
        <ContactSection />

      </div>
    </main>
  {/* Portal de Toast */}
    <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
  </>
  )
}
