import { useEffect, useMemo } from 'react'

/**
 * Hook para rastrear la sección activa usando IntersectionObserver
 * Añade la clase 'active' a los enlaces de navegación cuando su sección está en vista
 */
export function useActiveSection(): void {
  // Memorizar opciones del observer para evitar recreación
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

  // Marcar las anclas que referencian esta sección
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
