import { lazy, Suspense } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'

// Lazy load SwirlBackground to reduce initial bundle size
const SwirlBackground = lazy(() => import('./components/SwirlBackground'))

// root component with routes. router initialized in main.tsx
export default function App(){
  return (
    <LanguageProvider>
      <Suspense fallback={<div style={{ background: 'hsla(260, 40%, 5%, 1)', minHeight: '100vh' }} />}>
        <SwirlBackground />
      </Suspense>
      <AnimatedRoutes />
    </LanguageProvider>
  )
}
