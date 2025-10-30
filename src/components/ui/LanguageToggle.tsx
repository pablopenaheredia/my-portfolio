import { useLanguage } from '../../contexts/LanguageContext'
import { useDropdown } from '../../hooks'

export default function LanguageToggle() {
  const { isOpen, setIsOpen, ref } = useDropdown()
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn-social"
        aria-label="Cambiar idioma"
        title="Cambiar idioma"
        aria-expanded={isOpen}
      >
        <svg className="icon-md icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-right">
          <button
            className="dropdown-item"
            onClick={handleLanguageChange}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      )}
    </div>
  )
}
