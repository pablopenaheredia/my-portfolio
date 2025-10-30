interface NavDotProps {
  href: string;
  label: string;
  active?: boolean;
  icon?: null;
  onClick?: () => void;
}

export default function NavDot({ href, label, active = false, onClick }: NavDotProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Forzar blur para quitar el hover state
    e.currentTarget.blur()
    if (onClick) onClick()
  }

  // Props comunes para el enlace de navegación
  const commonProps = {
    onClick: handleClick,
    className: `nav-icon flex items-center justify-center group relative ${active ? 'active' : ''}`,
    title: label,
    'aria-label': label,
    'aria-current': active ? ('page' as const) : undefined
  }

  const content = (
    <>
      <span className={`nav-line ${active ? 'active' : ''}`} aria-hidden="true" />
      <span className="nav-label absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-180 text-sm text-color-100/70 font-medium whitespace-nowrap group-hover:opacity-100">{label}</span>
    </>
  )

  return (
    <a href={href} {...commonProps}>
      {content}
    </a>
  )
}
