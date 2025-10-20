import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import WorkIcon from '@mui/icons-material/Work'
import experiences from '../data/experiences'

export default function TimelineOld({ limit = 3 }){
  const items = (experiences || []).slice(0, limit)

  return (
    <VerticalTimeline>
      {items.map((it, idx) => {
        return (
        <VerticalTimelineElement
          key={it.year + '-' + idx}
          className="vertical-timeline-element--work exp-card"
          contentArrowStyle={{ borderRight: '7px solid #0a0614' }}
          iconStyle={{ background: 'linear-gradient(135deg,#7B4BE2,#5E24DB)', color: '#fff' }}
          icon={<WorkIcon />}
        >
          {/* Render the date inside the card to avoid overlap with the center line */}
          <div className="timeline-date">{it.year}</div>
          <h3 className="vertical-timeline-element-title timeline-title">{it.title}</h3>
          <h4 className="vertical-timeline-element-subtitle timeline-subtitle">{it.position} — <strong>{it.company}</strong></h4>
          {
            (() => {
              const desc = it.description || ''
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
