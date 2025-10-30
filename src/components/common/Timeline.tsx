import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { useLanguage } from '../../contexts/LanguageContext'

// Work icon component (replaces MUI icon)
const WorkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
  </svg>
)

interface TimelineProps {
  limit?: number;
}

const experienceKeys = [
  'experience.xacademy.automation',
  'experience.xacademy.manual',
  'experience.upex'
]

export default function Timeline({ limit = 3 }: TimelineProps) {
  const { t } = useLanguage()
  const items = experienceKeys.slice(0, limit)

  return (
    <VerticalTimeline>
      {items.map((key, idx) => {
        const year = t(`${key}.year`)
        const title = t(`${key}.title`)
        const position = t(`${key}.position`)
        const company = t(`${key}.company`)
        const description = t(`${key}.description`)
        
        return (
        <VerticalTimelineElement
          key={key + '-' + idx}
          className="vertical-timeline-element--work"
          contentArrowStyle={{ borderRight: '7px solid #0a0614' }}
          iconStyle={{ background: 'linear-gradient(135deg,#7B4BE2,#5E24DB)', color: '#fff' }}
          icon={<WorkIcon />}
        >
          {/* Renderizar la fecha dentro de la tarjeta para evitar solaparse con la línea central */}
          <div className="timeline-date">{year}</div>
          <h3 className="vertical-timeline-element-title timeline-title">{title}</h3>
          <h4 className="vertical-timeline-element-subtitle timeline-subtitle">{position} — <strong>{company}</strong></h4>
          {
            (() => {
              const desc = description || ''
              const lines = desc.split('\n').map(l => l.trim()).filter(Boolean)
              const isBullet = lines.length > 0 && lines.every(l => /^[-•*]/.test(l))

              if(isBullet){
                return (
                  <ul className="timeline-list">
                    {lines.map((l, i) => (
                      <li key={i}>{l.replace(/^[-•*]\s*/, '')}</li>
                    ))}
                  </ul>
                )
              }

              return (
                <div className="timeline-description">
                  {lines.map((l, i) => (
                    <p key={i} className={i === 0 ? 'first' : ''}>{l}</p>
                  ))}
                </div>
              )
            })()
          }
        </VerticalTimelineElement>
        )
      })}
    </VerticalTimeline>
  )
}
