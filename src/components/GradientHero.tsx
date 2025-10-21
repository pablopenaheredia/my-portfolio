import { Fragment } from 'react'
import { motion } from 'framer-motion'

interface GradientHeroProps {
  highlight: string
  titleRest?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDownload?: boolean
  extraActions?: React.ReactNode
}

export default function GradientHero({
  highlight,
  titleRest,
  description,
  ctaLabel,
  ctaHref,
  ctaDownload,
  extraActions
}: GradientHeroProps) {
  const parts = String(highlight || '').split('\n')

  return (
    <>
      <h1 className="mb-6 text-color-100 font-light">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-300 to-color-500 block hero-headline-large">
          {parts.map((p, i) => (
            <Fragment key={i}>
              {p}
              {i < parts.length - 1 ? <br /> : ''}
            </Fragment>
          ))}
        </span>
        {titleRest && <span className="block text-color-100/70 mt-1 hero-headline-small">{titleRest}</span>}
      </h1>

      {description && (
        <p className="text-color-100 text-base lg:text-lg max-w-xl font-light">{description}</p>
      )}

      {ctaLabel && ctaHref && (
        <div className="mt-6 hero-cta-wrapper">
          <a href={ctaHref} download={ctaDownload} className="btn-primary inline-flex items-center hero-cta-large" aria-label={ctaLabel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="ml-2">{ctaLabel}</span>
          </a>

          {extraActions && (
            <div className="ml-4 flex items-center gap-3">
              {extraActions}
            </div>
          )}
        </div>
      )}
    </>
  )
}
