import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle }){
  return (
    <header className="section-header mb-16" role="banner">
      <motion.h2 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-[#e8e6ef] text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] mb-4">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="text-[#e8e6ef]/60 text-base font-light max-w-2xl">
          {subtitle}
        </motion.p>
      )}
    </header>
  )
}
