import { Fragment } from 'react'
import { motion } from 'framer-motion'
import CVDropdown from './CVDropdown'

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
        <p className="text-color-100 text-lg lg:text-xl max-w-xl font-light">{description}</p>
      )}

      {ctaLabel && (
        <div className="mt-6 hero-cta-wrapper">
          <CVDropdown ctaLabel={ctaLabel} />

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
