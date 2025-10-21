import { useEffect } from 'react'

/**
 * Hook para prevenir cambios de URL y bloquear la navegación en la ruta raíz
 * Normaliza la URL en la carga y previene navegación hacia atrás/adelante
 */
export function useUrlLock(): void {
  useEffect(() => {
  // Normalizar la URL al cargar: eliminar cualquier path o hash para que la app quede en la raíz
    try {
      const loc = window.location
      const isRoot = loc.pathname === '/' && !loc.hash
      if (!isRoot) {
        history.replaceState(null, '', '/')
      }
    } catch (err) {
      /* ignore */
    }

  // Prevenir la navegación manual con atrás/adelante: mantener al usuario en la raíz
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
