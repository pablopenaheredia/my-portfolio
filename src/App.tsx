// componente raiz de la aplicacion con proveedores de contexto y rutas
import { lazy, Suspense } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'

const SwirlBackground = lazy(() => import('./components/SwirlBackground'))

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
