import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../../data'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
  {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-btn"
  aria-label="Alternar menú"
        aria-expanded={isOpen}
      >
        <span className={`w-6 h-0.5 bg-color-300 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-color-300 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-color-300 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

  {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-[90] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel del menú */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 140 }}
              className="mobile-menu-panel"
              style={{ willChange: 'transform' }}
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-safe">
                <div className="mb-4">
                  <p className="text-color-300 text-xs tracking-[0.3em] uppercase font-light mb-2">Navegación</p>
                  <div className="h-px bg-gradient-to-r from-color-500/50 to-transparent" />
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
                  <ul className="flex flex-col gap-2 pr-2 pb-4">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <a
                          href={item.href}
                          onClick={handleLinkClick}
                          className="mobile-nav-link"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-color-400" />
                            {item.label}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
