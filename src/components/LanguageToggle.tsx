import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn-subtle btn-no-border btn-gloss focus-ring"
        aria-label="Cambiar idioma"
        title="Cambiar idioma"
        aria-expanded={isOpen}
      >
        <svg className="icon-md icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-color-900/95 backdrop-blur-sm border border-color-500/20 rounded-lg shadow-xl overflow-hidden z-50 min-w-[80px]">
          <button
            className="block w-full text-center px-4 py-3 text-color-100 hover:bg-color-500/10 hover:text-color-300 transition-colors text-sm font-medium"
            onClick={handleLanguageChange}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      )}
    </div>
  )
}
