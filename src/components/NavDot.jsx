import React from 'react'
import { Link } from 'react-router-dom'

export default function NavDot({ href, label, active=false, icon=null, onClick }){
  // if the href starts with '#' we render a native anchor so the browser scrolls to the in-page section
  const isHash = href && href.startsWith('#')

  const dot = (
    <span className={`${active ? 'bg-color-100' : 'bg-color-100/30'} w-2 h-2 rounded-full transition-colors duration-200`} aria-hidden="true" />
  )

  // common props for the link element
  const commonProps = {
    onClick,
    className: `nav-icon w-6 h-6 flex items-center justify-center group relative ${active ? 'active' : ''}`,
    title: label,
    'aria-label': label,
    'aria-current': active ? 'page' : undefined
  }

  const content = (
    <>
      {dot}
      <span className="nav-label absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-180 text-sm text-color-100/70 font-medium whitespace-nowrap group-hover:opacity-100">{label}</span>
    </>
  )

  if (isHash) {
    // ensure the anchor has href (so IntersectionObserver queries work) and allow onClick override
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    )
  }

  return (
    <Link to={href} {...commonProps}>
      {content}
    </Link>
  )
}
