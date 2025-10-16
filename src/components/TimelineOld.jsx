import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import WorkIcon from '@mui/icons-material/Work'
import experiences from '../data/experiences'

export default function TimelineOld(){
  const items = experiences || []

  return (
    <VerticalTimeline>
      {items.map((it, idx) => (
        <VerticalTimelineElement
          key={it.year + '-' + idx}
          className="vertical-timeline-element--work"
          contentStyle={{ background: '#0a0614', color: '#e8e6ef', border: '1px solid rgba(232,230,239,0.04)' }}
          contentArrowStyle={{ borderRight: '7px solid  #0a0614' }}
          date={it.year}
          iconStyle={{ background: 'linear-gradient(135deg,#7B4BE2,#5E24DB)', color: '#fff' }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title" style={{ margin: 0, color: '#e8e6ef', fontWeight: 500 }}>{it.title}</h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ marginTop: 6, color: '#e8e6ef66', fontWeight: 400 }}>{it.position} — <strong style={{ color: '#e8e6ef' }}>{it.company}</strong></h4>
          <p style={{ color: '#e8e6efaa', marginTop: 8 }}>{it.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}
