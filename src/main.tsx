import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './index.css'

// Evitar que el navegador restaure la posición de scroll automáticamente
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
