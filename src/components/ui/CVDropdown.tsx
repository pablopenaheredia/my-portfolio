// boton de descarga de cv que abre google drive
import { useLanguage } from '../../contexts/LanguageContext'

interface CVDropdownProps {
  ctaLabel?: string
}

export default function CVDropdown({ ctaLabel }: CVDropdownProps) {
  const { t } = useLanguage()
  const label = ctaLabel || t('hero.downloadCV')
  const handleDownload = () => {
    window.open('https://drive.google.com/drive/folders/1YaAqRCJygFHN9hxA05dXBIvGfXtWli26?usp=sharing', '_blank')
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="btn-primary inline-flex items-center hero-cta-large text-base"
      aria-label={label}
    >
      <span className="mr-0">{label}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  )
}
