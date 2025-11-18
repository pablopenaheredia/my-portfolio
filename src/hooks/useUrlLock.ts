// hook para prevenir cambios de url y bloquear navegacion fuera de la raiz
import { useEffect } from 'react'

export function useUrlLock(): void {
  useEffect(() => {
    const basename = import.meta.env.MODE === 'production' ? '/my-portfolio' : '/'
    
    try {
      const loc = window.location
      const expectedPath = basename + (basename.endsWith('/') ? '' : '/')
      const actualPath = loc.pathname + (loc.pathname.endsWith('/') ? '' : '/')
      
      // Si no está en la ruta base o tiene hash, redirigir a la base
      if (actualPath !== expectedPath || loc.hash) {
        history.replaceState(null, '', basename)
      }
    } catch (err) {
      /* ignore */
    }

    const onPop = () => {
      try {
        const loc = window.location
        const expectedPath = basename + (basename.endsWith('/') ? '' : '/')
        const actualPath = loc.pathname + (loc.pathname.endsWith('/') ? '' : '/')
        
        if (actualPath !== expectedPath || loc.hash) {
          history.replaceState(null, '', basename)
        }
      } catch (err) {
        /* ignore */
      }
    }

    window.addEventListener('popstate', onPop)

    return () => {
      window.removeEventListener('popstate', onPop)
    }
  }, [])
}
