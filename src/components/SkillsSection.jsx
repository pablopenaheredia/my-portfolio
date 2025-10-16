import React from 'react'
import { motion } from 'framer-motion'
import GitHubIcon from '@mui/icons-material/GitHub'

import htmlSvg from '../assets/html.svg'
import tailwindSvg from '../assets/tailwind.svg'
import css3 from '../assets/css3.svg'
import jsImg from '../assets/js.svg'
import tsImg from '../assets/ts.svg'
import reactImg from '../assets/react.png'
import nodePng from '../assets/nodejs.png'
import nestImg from '../assets/nestjs.svg'
import pythonSvg from '../assets/python.svg'
import mysqlPng from '../assets/mysql.png'
import sqlPng from '../assets/sql.png'
import typeormPng from '../assets/typeorm.png'
import pwImg from '../assets/playwright-logo.svg'
import cypressImg from '../assets/cypress.svg'
import gitPng from '../assets/git.png'
import githubSvg from '../assets/github.svg'
import jiraPng from '../assets/jira.svg'
import xrayPng from '../assets/xray.svg'

const skillCategories = {
  Frontend: [
    { src: htmlSvg, name: 'HTML' },
    { src: tailwindSvg, name: 'Tailwind CSS' },
    { src: css3, name: 'CSS' },
    { src: jsImg, name: 'JavaScript' },
    { src: tsImg, name: 'TypeScript' },
    { src: reactImg, name: 'React' }
  ],
  Backend: [
    { src: nodePng, name: 'Node.js' },
    { src: nestImg, name: 'NestJS' },
    { src: pythonSvg, name: 'Python' },
    { src: mysqlPng, name: 'MySQL' },
    { src: sqlPng, name: 'SQL' }
  ],
  Frameworks: [
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

export default function SkillsSection(){
  const categoryVariant = (dir = 1) => ({
    hidden: { opacity: 0, x: 24 * dir, y: 8, scale: 0.985 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { when: 'beforeChildren', staggerChildren: 0.06, delayChildren: 0.06 } }
  })

  const itemVariant = {
    hidden: { opacity: 0, y: 8, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 16, stiffness: 220 } }
  }

  return (
    <div className="stack-block site-container mt-12">
      <div className="bg-transparent rounded-lg p-6 elevated w-full">
        <h4 className="text-color-100 text-sm font-medium text-center mb-6">Stack</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([category, list], catIndex) => {
            const dir = catIndex % 2 === 0 ? -1 : 1
            return (
              <motion.div key={category} className="category-block" variants={categoryVariant(dir)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
                <h5 className="text-color-100/60 uppercase text-xs mb-4 tracking-wider">{category}</h5>
                <ul className="skills-grid grid grid-cols-4 gap-4 list-none p-0 m-0">
                  {list.map((skill, i) => (
                    <motion.li key={i} className="group relative flex items-center justify-center w-full skill-sheen hover-elevate" variants={itemVariant} whileHover={{ scale: 1.06 }} aria-label={skill.name}>
                      {skill.name === 'GitHub' ? (
                        <div className="w-14 h-14 flex items-center justify-center rounded-md">
                          <GitHubIcon className="icon-lg" />
                        </div>
                      ) : (
                        <img src={skill.src} alt={skill.name} className="w-12 h-12 object-contain" />
                      )}
                      <span className="skill-label">{skill.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
