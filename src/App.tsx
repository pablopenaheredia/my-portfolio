import { useState, useEffect } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import SwirlBackground from './components/SwirlBackground'
import './index.css'

// Componente raíz que renderiza las rutas con animación.
// Nota: El Router se inicializa en `main.tsx`.
export default function App(){
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <>
      {!isMobile && <SwirlBackground />}
      <AnimatedRoutes />
    </>
  )
}
