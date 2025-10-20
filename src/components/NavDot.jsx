import React from 'react'

export default function NavDot({ href, label, active=false, icon=null, onClick }){
  const commonProps = {
    onClick,
    className: `nav-icon flex items-center justify-center group relative ${active ? 'active' : ''}`,
    title: label,
    'aria-label': label,
    'aria-current': active ? 'page' : undefined
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
