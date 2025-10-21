import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './pages/Home'
// About/Projects/Contact ahora son secciones internas dentro de Home

export default function AnimatedRoutes(){
  const location = useLocation()

  // Variantes de transición para las rutas (entrada/salida)
  const pageTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}><Home/></motion.div>} />
      </Routes>
    </AnimatePresence>
  )
}
