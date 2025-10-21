import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Prevent the browser from restoring scroll position automatically
// before the app and fonts/styles are fully loaded which can cause jumps.
try{
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
}catch(e){/* ignore */}

const basename = import.meta.env.MODE === 'production' ? '/portfolio' : ''

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Once the window is fully loaded (fonts/images), allow the browser to manage scroll again
window.addEventListener('load', ()=>{
  try{ if ('scrollRestoration' in history) history.scrollRestoration = 'auto' }catch(e){}
})

// Additional protections to avoid initial jump caused by hash restore or focus
try{
  // Remove any existing hash from the URL to avoid browser auto-jump on reload
  const initialHash = window.location.hash
  if(initialHash){
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  // Force scroll to top for a short window to avoid jumps due to late layout shifts
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
