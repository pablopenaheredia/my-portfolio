import { useState, useEffect } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import SwirlBackground from './components/SwirlBackground'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'

// root component with routes. router initialized in main.tsx
export default function App(){
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <LanguageProvider>
      {!isMobile && <SwirlBackground />}
      <AnimatedRoutes />
    </LanguageProvider>
  )
}
