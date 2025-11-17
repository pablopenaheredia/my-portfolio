// punto de entrada de la aplicacion con configuracion de router y scroll
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './index.css'

try{
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
}catch(e){/* ignore */}

const basename = import.meta.env.MODE === 'production' ? '/my-portfolio' : '/'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
