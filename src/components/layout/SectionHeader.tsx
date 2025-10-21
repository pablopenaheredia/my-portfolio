import React from 'react'
import { motion } from 'framer-motion'

// Encabezado reutilizable para secciones de la página
export default function SectionHeader({ title, subtitle }){
  return (
    <header className="section-header mb-16" role="banner">
      <motion.h2 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="app-h2 text-color-100 mb-4">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="text-color-100/60 font-light max-w-2xl">
          {subtitle}
        </motion.p>
      )}
    </header>
  )
}
