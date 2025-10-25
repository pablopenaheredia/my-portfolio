import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
// Import optimizado de MUI
import GitHubIcon from '@mui/icons-material/GitHub'
import { useIntersectionObserver } from '../../hooks'

import htmlSvg from '../../assets/html.svg'
import tailwindSvg from '../../assets/tailwind.svg'
import css3 from '../../assets/css3.svg'
import jsImg from '../../assets/js.svg'
import tsImg from '../../assets/ts.svg'
import reactImg from '../../assets/react.png'
import nodePng from '../../assets/nodejs.png'
import nestImg from '../../assets/nestjs.svg'
import pythonSvg from '../../assets/python.svg'
import mysqlPng from '../../assets/mysql.png'
import sqlPng from '../../assets/sql.png'
import typeormPng from '../../assets/typeorm.png'
import pwImg from '../../assets/playwright-logo.svg'
import cypressImg from '../../assets/cypress.svg'
import gitPng from '../../assets/git.png'
import githubSvg from '../../assets/github.svg'
import jiraPng from '../../assets/jira.svg'
import xrayPng from '../../assets/xray.svg'

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
    { src: reactImg, name: 'React' }
  ],
  Backend: [
    { src: nodePng, name: 'Node.js' },
    { src: nestImg, name: 'NestJS' },
    { src: pythonSvg, name: 'Python' },
    { src: mysqlPng, name: 'MySQL' },
    { src: sqlPng, name: 'SQL' },
    { src: typeormPng, name: 'TypeORM' }
  ],
  Testing: [
    { src: pwImg, name: 'Playwright' },
    { src: cypressImg, name: 'Cypress' }
  ],
  Tools: [
    { src: gitPng, name: 'Git' },
    { src: githubSvg, name: 'GitHub' },
    { src: jiraPng, name: 'Jira' },
    { src: xrayPng, name: 'Xray' }
  ]
}

interface SkillItemProps {
  skill: Skill;
  index: number;
}

// Componente de item de skill memoizado
const SkillItem = memo(({ skill }: SkillItemProps) => {
  const itemVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 8, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 16, stiffness: 220 } }
  }), [])

  return (
    <motion.li 
      className="skill-sheen" 
      variants={itemVariant} 
      whileHover={{ scale: 1.08 }} 
      aria-label={skill.name}
    >
      {skill.name === 'GitHub' ? (
        <div className="w-12 h-12 flex items-center justify-center rounded-md elevated icon-img" aria-hidden="true">
          <GitHubIcon className="icon-svg" />
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
      <span className="skill-label">{skill.name}</span>
    </motion.li>
  )
}, (prevProps, nextProps) => prevProps.skill.name === nextProps.skill.name)

SkillItem.displayName = 'SkillItem'

function SkillsSection(){
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '100px' })
  
  // Aplanar todas las categorías en un solo array para renderizar sin encabezados
  const allSkills = useMemo(() => [
    ...skillCategories.Frontend,
    ...skillCategories.Backend,
    ...skillCategories.Testing,
    ...skillCategories.Tools
  ], [])

  return (
    <div className="stack-block" ref={containerRef}>
      {isVisible ? (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-6 rounded-lg elevated skills-wrapper">
          <ul className="skills-grid">
            {allSkills.map((skill, i) => (
              <SkillItem key={skill.name} skill={skill} index={i} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-6 rounded-lg elevated skills-wrapper" style={{ minHeight: '300px' }}>
          <div className="skills-grid animate-pulse">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-12 h-12 bg-color-500/10 rounded-md" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Memorizar el componente completo para prevenir re-renderizados innecesarios
export default memo(SkillsSection)
