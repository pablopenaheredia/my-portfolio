import { useLanguage } from '../../contexts/LanguageContext'

interface ProjectCardProps {
  project: {
    id: string
    name: string
    image: string
    technologies: string[]
    githubUrl: string
    docsUrl?: string
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage()

  const itemClass = index === 0 ? 'col-span-1 md:col-span-4 md:row-span-2' : 'col-span-1 md:col-span-2'
  const imgClass = index === 0 ? 'w-full h-auto md:h-[520px] object-cover' : 'w-full h-auto md:h-[260px] object-cover'
  
  // Map project IDs to translation keys
  const translationKey = project.id === 'p1' ? 'trimly' : project.id === 'p2' ? 'orangehrm' : 'spaceinvaders'

  return (
    <article
      className={`project-item group fade-in-on-scroll ${itemClass} bg-gradient-to-br from-color-900/30 to-color-950/30 rounded-xl border border-color-500/10 hover:border-color-400/30 transition-all duration-300 overflow-hidden`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={`Captura de pantalla del proyecto ${project.name}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          width={1000}
          height={600}
          className={`${imgClass} transition-transform duration-500 group-hover:scale-105`}
        />
      </div>

      <div className="p-6">
        <h2 className="text-color-300 text-xl md:text-2xl font-light mb-3 group-hover:text-color-400 transition-colors">
          {t(`project.${translationKey}.name`)}
        </h2>
        <p className="text-color-100/80 font-light mb-2 text-sm md:text-base leading-relaxed">
          {t(`project.${translationKey}.description`)}
        </p>
        <p className="text-color-100/60 font-light mb-4 text-xs md:text-sm leading-relaxed">
          {t(`project.${translationKey}.explanation`)}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="project-tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-color-500/10 hover:bg-color-500/20 border border-color-500/20 hover:border-color-400/30 rounded-lg text-color-400 text-sm hover:text-color-300 transition-all group/github"
            aria-label={`Ver código de ${project.name} en GitHub`}
          >
            <svg className="w-4 h-4 transition-transform group-hover/github:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>{t('project.button.github')}</span>
          </a>
          {project.docsUrl && (
            <a
              href={project.docsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-color-500/10 hover:bg-color-500/20 border border-color-500/20 hover:border-color-400/30 rounded-lg text-color-400 text-sm hover:text-color-300 transition-all group/docs"
              aria-label={`Ver documentación de ${project.name}`}
            >
              <svg className="w-4 h-4 transition-transform group-hover/docs:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t('project.button.docs')}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
