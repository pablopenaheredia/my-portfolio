// hook para prevenir cambios de url y bloquear navegacion fuera de la raiz
import { useEffect } from 'react'

export function useUrlLock(): void {
  useEffect(() => {
    try {
      const loc = window.location
      const isRoot = loc.pathname === '/' && !loc.hash
      if (!isRoot) {
        history.replaceState(null, '', '/')
      }
    } catch (err) {
      /* ignore */
    }

    const onPop = () => {
      try {
        if (window.location.pathname !== '/' || window.location.hash) {
          history.replaceState(null, '', '/')
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
