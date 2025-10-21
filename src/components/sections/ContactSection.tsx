import React from 'react'
import { motion } from 'framer-motion'

/**
 * Sección de contacto - extraída desde Home.jsx
 */
export default function ContactSection() {
  return (
    <section id="contact" className="contact-section section-padding py-16">
      <div className="site-container max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <h2 className="text-color-100 text-3xl md:text-4xl font-light mb-4">¿Quieres...</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Ofrecer oportunidad laboral */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="contact-card"
          >
            <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">
              ¿Ofrecer una oportunidad laboral?
            </h3>
            <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
              Estoy abierto a oportunidades laborales o colaboraciones. Con experiencia en aseguramiento de calidad y desarrollo de software, me interesan roles que me permitan trabajar en proyectos desafiantes y significativos. Si tienes un proyecto o una posición en mente contáctame!.
            </p>
          </motion.div>

          {/* Conectar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="contact-card"
          >
            <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">
              ¿Conectar?
            </h3>
            <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
              El networking es clave en la industria IT, y siempre busco conocer gente nueva y ampliar mi círculo profesional. Si compartes intereses similares o estas interesado en conversar sobre algo, no dudes en contactarme.
            </p>
          </motion.div>

          {/* Construir algo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3 }} 
            className="contact-card"
          >
            <h3 className="text-color-400 text-xl md:text-2xl font-light mb-4">
              ¿Que testee tu software o construir algo juntos?
            </h3>
            <p className="text-color-100/70 text-sm md:text-base leading-relaxed">
              Me apasiona tanto el testing como el desarrollo de software aplicando buenas prácticas. Ya sea desarrollar un proyecto o testear uno existente, estoy listo para nuevos desafíos. Si tienes una idea o proyecto en mente, hablemos y veamos cómo podemos colaborar.
            </p>
          </motion.div>
        </div>

  {/* Enlaces de contacto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.4 }} 
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8"
        >
          <a href="mailto:pablopenaheredia@gmail.com" className="contact-link">Correo</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
          <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
          <a href="/resume.pdf" download className="contact-link">CV</a>
        </motion.div>

  {/* Flecha de volver arriba */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.5 }} 
          className="flex justify-center mt-12"
        >
          <a href="#home" className="back-to-top" aria-label="Volver arriba">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7-7 7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
