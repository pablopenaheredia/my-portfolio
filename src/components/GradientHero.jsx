import React from 'react'
import PropTypes from 'prop-types'

export default function GradientHero({
  highlight = 'QA Analyst',
  titleRest = '& Fullstack Developer',
  description = 'QA engineer and fullstack developer focused on test automation, reliability and clear architectures. Currently available for projects and collaborations.',
  ctaLabel = null,
  ctaHref = null,
  ctaDownload = false,
  extraActions = null,
}) {
  // allow newline in highlight ("QA\nAUTOMATION")
  const parts = String(highlight).split('\n')

  return (
    <div>
      <h1 className="mb-6 text-color-100 leading-[0.95] tracking-tight font-light">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-300 to-color-500 block hero-headline-large">
          {parts.map((p, i) => (
            <React.Fragment key={i}>
              {p}
              {i < parts.length - 1 ? <br /> : ''}
            </React.Fragment>
          ))}
        </span>
        {titleRest && <span className="block text-color-100/70 mt-1 hero-headline-small font-light">{titleRest}</span>}
      </h1>

      {description && (
        <p className="text-color-100 text-base lg:text-lg max-w-xl leading-relaxed font-light">{description}</p>
      )}

      {ctaLabel && ctaHref && (
        <div className="mt-6 hero-cta-wrapper">
          <a href={ctaHref} download={ctaDownload} className="btn-primary inline-flex items-center hero-cta-large" aria-label={ctaLabel}>
            {/* download icon */}
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
    </div>
  )
}

GradientHero.propTypes = {
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  titleRest: PropTypes.string,
  description: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  ctaDownload: PropTypes.bool,
  extraActions: PropTypes.node,
}
