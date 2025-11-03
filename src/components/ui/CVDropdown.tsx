interface CVDropdownProps {
  ctaLabel: string
}

export default function CVDropdown({ ctaLabel }: CVDropdownProps) {
  const handleDownload = () => {
    window.open('https://drive.google.com/drive/folders/1YaAqRCJygFHN9hxA05dXBIvGfXtWli26?usp=sharing', '_blank')
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="btn-primary inline-flex items-center hero-cta-large"
      aria-label={ctaLabel}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="ml-2">{ctaLabel}</span>
    </button>
  )
}
