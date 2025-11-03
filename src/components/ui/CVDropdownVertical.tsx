import { useDropdown } from '../../hooks'
import { useLanguage } from '../../contexts/LanguageContext'
import { useState } from 'react'

export default function CVDropdownVertical() {
  const { isOpen, setIsOpen, ref } = useDropdown()
  const { language } = useLanguage()
  const [expandedRole, setExpandedRole] = useState<'qa' | 'dev' | null>(null)
  
  // Base path dinámico según el entorno
  const basePath = import.meta.env.MODE === 'production' ? '/my-portfolio' : ''

  const handleRoleClick = (role: 'qa' | 'dev') => {
    if (expandedRole === role) {
      setExpandedRole(null)
    } else {
      setExpandedRole(role)
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="nav-social-icon"
        aria-label={language === 'es' ? 'Descargar CV' : 'Download CV'}
        title={language === 'es' ? 'Descargar CV' : 'Download CV'}
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
      </button>

      {isOpen && (
        <div className="cv-dropdown-vertical">
          {/* QA Section */}
          <div className="cv-role-section">
            <button
              className="cv-role-button"
              onClick={() => handleRoleClick('qa')}
            >
              <span>QA</span>
              <svg 
                className={`w-3 h-3 transition-transform ${expandedRole === 'qa' ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            {expandedRole === 'qa' && (
              <div className="cv-lang-buttons">
                <a
                  href={`${basePath}/CV Pablo Pena Heredia - QA Tester1.pdf`}
                  download="CV_Pablo_Pena_Heredia_QA_ES.pdf"
                  className="cv-lang-link"
                  onClick={() => setIsOpen(false)}
                >
                  ES
                </a>
                <a
                  href={`${basePath}/CV Pablo Pena Heredia - QA Tester Eng.pdf`}
                  download="CV_Pablo_Pena_Heredia_QA_EN.pdf"
                  className="cv-lang-link"
                  onClick={() => setIsOpen(false)}
                >
                  EN
                </a>
              </div>
            )}
          </div>

          <div className="cv-divider"></div>

          {/* Desarrollador Section */}
          <div className="cv-role-section">
            <button
              className="cv-role-button"
              onClick={() => handleRoleClick('dev')}
            >
              <span>Desarrollador</span>
              <svg 
                className={`w-3 h-3 transition-transform ${expandedRole === 'dev' ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            {expandedRole === 'dev' && (
              <div className="cv-lang-buttons">
                <a
                  href={`${basePath}/CV Pablo Pena Heredia - Dev ES.pdf`}
                  download="CV_Pablo_Pena_Heredia_Dev_ES.pdf"
                  className="cv-lang-link"
                  onClick={() => setIsOpen(false)}
                >
                  ES
                </a>
                <a
                  href={`${basePath}/CV Pablo Pena Heredia - Dev EN.pdf`}
                  download="CV_Pablo_Pena_Heredia_Dev_EN.pdf"
                  className="cv-lang-link"
                  onClick={() => setIsOpen(false)}
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
