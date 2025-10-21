import { useEffect, useMemo } from 'react'

/**
 * Hook to track active section using IntersectionObserver
 * Adds 'active' class to navigation links when their section is in view
 */
export function useActiveSection(): void {
  // Memoize observer options to prevent recreation
  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: '-20% 0% -60% 0%',
      threshold: 0.1
    }),
    []
  )

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))

    if (!sections.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.target.id) return
        const id = entry.target.id

        // Mark anchors that reference this section
        const matches = Array.from(
          document.querySelectorAll(`a[href="#${id}"], a[href$="/${id}"], a[href$="${id}"]`)
        )

        matches.forEach((a) => {
          if (entry.isIntersecting) {
            a.classList.add('active')
          } else {
            a.classList.remove('active')
          }
        })
      })
    }, observerOptions)

    sections.forEach((s) => observer.observe(s))

    return () => {
      observer.disconnect()
    }
  }, [observerOptions])
}
