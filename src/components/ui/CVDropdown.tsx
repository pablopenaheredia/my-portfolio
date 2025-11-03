import { useDropdown } from '../../hooks'
import { useLanguage } from '../../contexts/LanguageContext'
import { useState } from 'react'

// Importar los PDFs
import cvQaEs from '../../assets/QA Tester - Pablo Pena Heredia.pdf'
import cvQaEn from '../../assets/QA Tester - Pablo Pena Heredia - English.pdf'
import cvDevEs from '../../assets/Fullstack Developer - Pablo Pena Heredia.pdf'
import cvDevEn from '../../assets/Fullstack Developer - Pablo Pena Heredia English.pdf'

interface CVDropdownProps {
  ctaLabel: string
}

export default function CVDropdown({ ctaLabel }: CVDropdownProps) {
  const { isOpen, setIsOpen, ref } = useDropdown()
  const { language } = useLanguage()
  const [hoveredRole, setHoveredRole] = useState<'qa' | 'dev' | null>(null)

  const handleDownload = () => {
    setIsOpen(false)
    setHoveredRole(null)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary inline-flex items-center hero-cta-large"
        aria-label={ctaLabel}
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span className="ml-2">{ctaLabel}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-left" style={{ minWidth: '140px' }}>
          {/* QA Section */}
          <div 
            className="cv-role-item"
            onMouseEnter={() => setHoveredRole('qa')}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="cv-role-trigger">
              <span>QA</span>
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            {hoveredRole === 'qa' && (
              <div className="cv-lang-submenu">
                <a
                  href={cvQaEs}
                  download="CV_Pablo_Pena_Heredia_QA_ES.pdf"
                  className="cv-lang-item"
                  onClick={handleDownload}
                >
                  ES
                </a>
                <a
                  href={cvQaEn}
                  download="CV_Pablo_Pena_Heredia_QA_EN.pdf"
                  className="cv-lang-item"
                  onClick={handleDownload}
                >
                  EN
                </a>
              </div>
            )}
          </div>

          <div className="dropdown-divider"></div>

          {/* Desarrollador Section */}
          <div 
            className="cv-role-item"
            onMouseEnter={() => setHoveredRole('dev')}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="cv-role-trigger">
              <span>{language === 'es' ? 'Desarrollador' : 'Developer'}</span>
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            {hoveredRole === 'dev' && (
              <div className="cv-lang-submenu">
                <a
                  href={cvDevEs}
                  download="CV_Pablo_Pena_Heredia_Dev_ES.pdf"
                  className="cv-lang-item"
                  onClick={handleDownload}
                >
                  ES
                </a>
                <a
                  href={cvDevEn}
                  download="CV_Pablo_Pena_Heredia_Dev_EN.pdf"
                  className="cv-lang-item"
                  onClick={handleDownload}
                >
                  EN
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
