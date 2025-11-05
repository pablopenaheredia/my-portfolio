import { Fragment, useState } from 'react'
import CVDropdown from './CVDropdown'
import { Toast } from '../common'
import { useLanguage } from '../../contexts/LanguageContext'

interface GradientHeroProps {
  highlight: string
  titleRest?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDownload?: boolean
  extraActions?: React.ReactNode
}

export default function GradientHero({
  highlight,
  titleRest,
  description,
  ctaLabel,
  ctaHref,
  ctaDownload,
  extraActions
}: GradientHeroProps) {
  const parts = String(highlight || '').split('\n')
  const { language, setLanguage } = useLanguage()
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  return (
    <>
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
        <p className="text-color-100 text-lg lg:text-xl max-w-xl font-light mb-8">{description}</p>
      )}

      {ctaLabel && (
        <div className="mt-8 hero-cta-wrapper">
          <CVDropdown ctaLabel={ctaLabel} />

          {extraActions && (
            <div className="ml-4 flex items-center gap-3">
              {extraActions}
            </div>
          )}
        </div>
      )}

      {/* Social Icons - Visible only on mobile/tablet */}
      <div className="mt-8 flex justify-center gap-6 md:hidden">
        <a 
          href="https://github.com/pablopenaheredia" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hero-social-btn" 
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/in/pablopenah/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hero-social-btn" 
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <button
          type="button"
          onClick={() => {
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
          className="hero-social-btn"
          aria-label="Copiar email"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            setLanguage(language === 'es' ? 'en' : 'es')
          }}
          className="hero-social-btn"
          aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
        </button>
      </div>

      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
