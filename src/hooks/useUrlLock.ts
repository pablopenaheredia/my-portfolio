import { useEffect } from 'react'

/**
 * Hook to prevent URL changes and lock navigation to root path
 * Normalizes URL on load and prevents back/forward navigation
 */
export function useUrlLock(): void {
  useEffect(() => {
    // Normalize URL on load: remove any path or hash so the app stays at root
    try {
      const loc = window.location
      const isRoot = loc.pathname === '/' && !loc.hash
      if (!isRoot) {
        history.replaceState(null, '', '/')
      }
    } catch (err) {
      /* ignore */
    }

    // Prevent manual navigation via back/forward: keep user at root
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
