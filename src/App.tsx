import AnimatedRoutes from './AnimatedRoutes'
import SwirlBackground from './components/SwirlBackground'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'

// root component with routes. router initialized in main.tsx
export default function App(){
  return (
    <LanguageProvider>
      <SwirlBackground />
      <AnimatedRoutes />
    </LanguageProvider>
  )
}
