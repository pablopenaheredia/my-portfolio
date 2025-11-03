import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toast } from '../common'
import { navItems } from '../../data'
import { useLanguage } from '../../contexts/LanguageContext'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const { language, setLanguage } = useLanguage()

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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel del menú */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu-panel"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-6">
                <div className="mb-6">
                  <p className="text-color-300 text-xs tracking-[0.3em] uppercase font-light mb-2">Navegación</p>
                  <div className="h-px bg-gradient-to-r from-color-500/50 to-transparent" />
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 380px)' }}>
                  <ul className="flex flex-col gap-2 pr-2">
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

                <div className="mt-auto pt-6 flex-shrink-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-color-500/30 to-transparent mb-6" />
                  <div className="flex justify-center gap-4">
                    <a href="https://github.com/pablopenaheredia" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="GitHub">
                      <svg className="w-5 h-5 text-color-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/pablopenah/" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="LinkedIn">
                      <svg className="w-5 h-5 text-color-300" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const email = 'pablopenaheredia@gmail.com'
                        const doShowSuccess = () => {
                          setToastMessage('Email copiado en el portapapeles')
                          setShowToast(true)
                        }
                        const doShowFail = () => {
                          setToastMessage('No se pudo copiar el email')
                          setShowToast(true)
                        }

                        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(email).then(() => doShowSuccess()).catch(() => doShowFail())
                        } else {
                          try {
                            const ta = document.createElement('textarea')
                            ta.value = email
                            document.body.appendChild(ta)
                            ta.select()
                            document.execCommand('copy')
                            document.body.removeChild(ta)
                            doShowSuccess()
                          } catch (err) {
                            doShowFail()
                          }
                        }

                        // cerrar menú después de copiar
                        setIsOpen(false)
                      }}
                      className="mobile-social-btn"
                      aria-label="Copiar email"
                    >
                      <svg className="w-5 h-5 text-color-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage(language === 'es' ? 'en' : 'es')
                        setIsOpen(false)
                      }}
                      className="mobile-social-btn"
                      aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                    >
                      <svg className="w-5 h-5 text-color-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
