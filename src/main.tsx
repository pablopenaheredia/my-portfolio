import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './index.css'

// Evitar que el navegador restaure la posición de scroll automáticamente
// antes de que la app y fuentes/estilos estén totalmente cargados, lo cual puede causar saltos.
try{
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
}catch(e){/* ignore */}

// Basename dinámico: "/" en local, "/my-portfolio" en producción
const basename = import.meta.env.MODE === 'production' ? '/my-portfolio' : '/'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Una vez que la ventana esté completamente cargada (fuentes/imagenes), permitir que el navegador gestione el scroll nuevamente
window.addEventListener('load', ()=>{
  try{ if ('scrollRestoration' in history) history.scrollRestoration = 'auto' }catch(e){}
})

// Protecciones adicionales para evitar el salto inicial causado por la restauración del hash o el foco
try{
  // Eliminar cualquier hash existente de la URL para evitar que el navegador haga un salto automático al recargar
  const initialHash = window.location.hash
  if(initialHash){
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  // Forzar el scroll a la parte superior durante una breve ventana para evitar saltos por cambios tardíos de layout
  const holdScrollTop = ()=>{
    window.scrollTo(0,0)
    const start = performance.now()
    const id = setInterval(()=>{
      window.scrollTo(0,0)
      if(performance.now() - start > 160) clearInterval(id)
    }, 20)
  }
  if(document.readyState === 'complete') holdScrollTop()
  else window.addEventListener('load', holdScrollTop, { once: true })
}catch(e){/* ignore */}
