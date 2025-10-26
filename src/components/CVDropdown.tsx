import { useState, useRef, useEffect } from 'react'

interface CVDropdownProps {
  ctaLabel: string
}

export default function CVDropdown({ ctaLabel }: CVDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
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
        <div className="absolute top-full mt-2 left-0 bg-color-900/95 backdrop-blur-sm border border-color-500/20 rounded-lg shadow-xl overflow-hidden z-50 min-w-[120px]">
          <a
            href="/CV Pablo Pena Heredia - QA Tester1.pdf"
            download="CV_Pablo_Pena_Heredia_QA_ES.pdf"
            className="block px-4 py-3 text-color-100 hover:bg-color-500/10 hover:text-color-300 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            ES
          </a>
          <div className="h-px bg-color-500/10"></div>
          <a
            href="/CV Pablo Pena Heredia - QA Tester Eng.pdf"
            download="CV_Pablo_Pena_Heredia_QA_EN.pdf"
            className="block px-4 py-3 text-color-100 hover:bg-color-500/10 hover:text-color-300 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            EN
          </a>
        </div>
      )}
    </div>
  )
}
