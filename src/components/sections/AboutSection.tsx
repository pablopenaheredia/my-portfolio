import React from 'react'
import { motion } from 'framer-motion'

/**
 * About section component - extracted from Home.jsx
 */
export default function AboutSection() {
  return (
    <section id="about" className="about-section section-padding">
      <div className="about-container site-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Foto primero en móvil, después en desktop */}
        <aside className="about-visual order-1 lg:order-2" aria-labelledby="stack-heading">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="max-w-md mx-auto lg:sticky lg:top-20 mb-8 lg:mb-0"
          >
            <img 
              src="/profile.svg" 
              alt="Pablo Peña" 
              loading="lazy" 
              width="560" 
              height="420" 
              className="w-full rounded-lg animate-soft-pulse elevated" 
            />
          </motion.div>
        </aside>

        <article className="about-text order-2 lg:order-1">
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="text-color-100 text-xl font-light leading-relaxed mb-8"
          >
            Me llamo Pablo Pena Heredia, y soy Analista QA y Desarrollador Fullstack. Me apasiona asegurar la calidad del software desde el inicio del ciclo de vida del desarrollo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="bio-text space-y-6 text-color-100/70 font-light"
          >
            <p>
              Durante mi recorrido, trabajé como QA Manual Trainee, diseñando planes de prueba, ejecutando casos y gestionando defectos en Jira X-Ray.
              Además, desarrollé un proyecto personal de automatización con Playwright y TypeScript. También participé en equipos de trabajo donde aplicamos estrategias de testing reales en entornos de prueba de aplicaciones web de Startups.
            </p>
            <p>
              En mi tésis, desarrollé un sistema fullstack orientado a salones de estética con React, TypeScript, NestJS y MySQL, aplicando buenas prácticas de desarrollo y metodologías ágiles.
            </p>
            <p>
              Hoy mi objetivo es seguir creciendo en el campo de la calidad de software y el desarrollo del mismo, aportando soluciones escalables. Me motiva aprender nuevas tecnologías y compartir lo que aprendo, colaborar con equipos y construyendo productos que ofrezcan experiencias confiables.
            </p>
          </motion.div>
        </article>
      </div>
    </section>
  )
}
