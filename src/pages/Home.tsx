import { useLayoutEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useClipboard } from '../hooks'
import { resetScroll } from '../utils'
import {
  NavigationLayout,
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  SectionDivider,
  Timeline,
  Toast
} from '../components'

export default function Home() {
  // Reset scroll before first paint
  useLayoutEffect(() => { resetScroll() }, [])

  const { t } = useLanguage()
  const { showToast, setShowToast, toastMessage } = useClipboard()

  return (
    <>
      <main id="main-content" className="min-h-screen relative overflow-hidden">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="skip-link">Saltar al contenido</a>

        <NavigationLayout />

        <div className="content md:ml-20 lg:ml-20 xl:ml-20">
          {/* Hero */}
          <HeroSection />

          {/* About */}
          <SectionDivider label={t('section.about')} />
          <AboutSection />

          {/* Experience */}
          <SectionDivider label={t('section.experience')} />
          <section id="experience" className="experience-section section-padding">
            <div className="site-container">
              <Timeline />
            </div>
          </section>

          {/* Projects */}
          <SectionDivider label={t('section.projects')} />
          <ProjectsSection />

          {/* Skills */}
          <SectionDivider label={t('section.skills')} />
          <section id="skills" className="skills-section section-padding">
            <div className="site-container max-w-5xl">
              <SkillsSection />
            </div>
          </section>

          {/* Contact */}
          <SectionDivider label={t('section.contact')} />
          <ContactSection />
        </div>
      </main>

      {/* Toast portal */}
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
