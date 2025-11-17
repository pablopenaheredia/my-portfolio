// seccion de habilidades tecnicas organizadas por categoria
import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks'

import htmlSvg from '../../assets/html.svg'
import css3 from '../../assets/css3.svg'
import tailwindSvg from '../../assets/tailwind.svg'
import jsImg from '../../assets/js.svg'
import tsImg from '../../assets/ts.svg'
import reactImg from '../../assets/react.png'
import viteSvg from '../../assets/Vite.svg'

import nodePng from '../../assets/nodejs.png'
import nestImg from '../../assets/nestjs.svg'
import typeormPng from '../../assets/typeorm.png'

import sqlPng from '../../assets/sql.png'
import postgresqlSvg from '../../assets/postgresql-vertical.svg'
import mysqlPng from '../../assets/mysql.png'

import cypressImg from '../../assets/cypress.svg'
import pwImg from '../../assets/playwright-logo.svg'
import xrayPng from '../../assets/xray.svg'
import jiraPng from '../../assets/jira.svg'

import gitPng from '../../assets/git.png'
import githubSvg from '../../assets/github.svg'

import supabasePng from '../../assets/icons8-supabase-48.png'
import vercelSvg from '../../assets/vercel.svg'

interface Skill {
  src: string;
  name: string;
}

const skillCategories: Record<string, Skill[]> = {
  Frontend: [
    { src: htmlSvg, name: 'HTML' },
    { src: css3, name: 'CSS' },
    { src: tailwindSvg, name: 'Tailwind CSS' },
    { src: jsImg, name: 'JavaScript' },
    { src: tsImg, name: 'TypeScript' },
    { src: reactImg, name: 'React' },
    { src: viteSvg, name: 'Vite' }
  ],
  Backend: [
    { src: nodePng, name: 'Node.js' },
    { src: nestImg, name: 'NestJS' },
    { src: typeormPng, name: 'TypeORM' }
  ],
  'Bases de Datos': [
    { src: sqlPng, name: 'SQL' },
    { src: postgresqlSvg, name: 'PostgreSQL' },
    { src: mysqlPng, name: 'MySQL' }
  ],
  'Testing / QA': [
    { src: cypressImg, name: 'Cypress' },
    { src: pwImg, name: 'Playwright' },
    { src: xrayPng, name: 'Xray' },
    { src: jiraPng, name: 'Jira' }
  ],
  'Control de Versiones': [
    { src: gitPng, name: 'Git' },
    { src: githubSvg, name: 'GitHub' }
  ],
  'Infra / Deployment': [
    { src: supabasePng, name: 'Supabase' },
    { src: vercelSvg, name: 'Vercel' }
  ]
}

interface SkillItemProps {
  skill: Skill;
  index: number;
}

const SkillItem = memo(({ skill }: SkillItemProps) => {
  const itemVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 8, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 16, stiffness: 220 } }
  }), [])

  return (
    <motion.li 
      variants={itemVariant}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div 
        className="skill-item-grouped" 
        aria-label={skill.name}
      >
        {skill.name === 'GitHub' ? (
          <div className="w-12 h-12 flex items-center justify-center rounded-md elevated icon-img" aria-hidden="true">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#e8e6ef' }}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
        ) : (
          <img 
            src={skill.src} 
            alt="" 
            role="presentation"
            loading="lazy" 
            className="w-12 h-12 object-contain elevated rounded-md" 
          />
        )}
      </div>
      <span className="skill-tooltip">{skill.name}</span>
    </motion.li>
  )
}, (prevProps, nextProps) => prevProps.skill.name === nextProps.skill.name)

SkillItem.displayName = 'SkillItem'

function SkillsSection(){
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '100px' })

  return (
    <div className="stack-block" ref={containerRef}>
      {isVisible ? (
        <div className="p-6 rounded-lg elevated skills-wrapper-grouped">
          <div className="skill-category">
            <h3 className="skill-category-title">Frontend</h3>
            <ul className="skill-category-grid">
              {skillCategories.Frontend.map((skill, i) => (
                <SkillItem key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Backend</h3>
            <ul className="skill-category-grid">
              {skillCategories.Backend.map((skill, i) => (
                <SkillItem key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Bases de Datos</h3>
            <ul className="skill-category-grid">
              {skillCategories['Bases de Datos'].map((skill, i) => (
                <SkillItem key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Testing / QA</h3>
            <ul className="skill-category-grid">
              {skillCategories['Testing / QA'].map((skill, i) => (
                <SkillItem key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Control de Versiones</h3>
            <ul className="skill-category-grid">
              {skillCategories['Control de Versiones'].map((skill, i) => (
                <SkillItem key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Infra / Deployment</h3>
            <ul className="skill-category-grid">
              {skillCategories['Infra / Deployment'].map((skill, i) => (
                <SkillItem key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-lg elevated skills-wrapper-grouped" style={{ minHeight: '400px' }}>
          <div className="skills-grid animate-pulse">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-12 h-12 bg-color-500/10 rounded-md" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(SkillsSection)
