import { useEffect } from 'react'

/**
 * Hook para manejar el desplazamiento suave a secciones con animación de sobrepaso
 * Intercepta clics en enlaces con hash y proporciona un comportamiento de scroll suave personalizado
 */
export function useScrollToSection(): void {
  useEffect(() => {
  // Implementación de scroll suave personalizado para enlaces con hash con sobrepaso y asentamiento
    function onClick(e: any) {
      const el = e.target.closest && e.target.closest('a[href]')
      if (!el) return
      let href = el.getAttribute('href')
      if (!href) return

      // Ignorar enlaces externos (origen diferente)
      try {
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) return
      } catch (err) {
        /* ignorar URLs malformadas */
      }

      // Prevenir la navegación nativa para hashes y rutas internas
      if (href.startsWith('#') || href.startsWith('/')) {
        e.preventDefault()
      } else {
        // Enlaces relativos - tratarlos como rutas
        if (!href.startsWith('http')) {
          e.preventDefault()
        }
      }

  // Normalizar a un id objetivo
      let id = null
      if (href.startsWith('#')) {
        if (href === '#') return
        id = href.slice(1)
      } else {
        const clean = href.split(/[?#]/)[0]
        const seg = clean.replace(/^\/+|\/+$/g, '')
        if (!seg) return
        id = seg.split('/').pop()
      }

      if (!id) return
      const target = document.getElementById(id)
      if (!target) return

  // Comprobar si hay un divisor de sección antes de la sección
      let scrollTarget = target
      let isDivider = false
      try {
        const prev = target.previousElementSibling
        if (prev && prev.classList && prev.classList.contains('section-divider-wrapper')) {
          scrollTarget = prev
          isDivider = true
        }
      } catch (err) {
        /* ignore */
      }

      const startY = window.scrollY || window.pageYOffset
      const rect = scrollTarget.getBoundingClientRect()
      const offset = isDivider ? 40 : 80
      const targetY = startY + rect.top - offset

  // Cantidad de sobrepaso
      const overshoot = Math.max(48, Math.min(120, Math.abs(targetY - startY) * 0.08))
      const direction = targetY >= startY ? 1 : -1

  // Función de easing (cúbica in/out)
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  // Animar hacia la posición y
      function animateTo(y, duration) {
        return new Promise((resolve) => {
          const from = window.scrollY || window.pageYOffset
          const delta = y - from
          let start

          function step(ts) {
            if (!start) start = ts
            const elapsed = ts - start
            const t = Math.min(1, elapsed / duration)
            const v = ease(t)
            window.scrollTo(0, Math.round(from + delta * v))
            if (elapsed < duration) requestAnimationFrame(step)
            else resolve()
          }

          requestAnimationFrame(step)
        })
      }

      const firstY = targetY + direction * overshoot
      // Ejecutar sobrepaso y luego asentamiento
      animateTo(firstY, 380).then(() => animateTo(targetY, 320))
    }

    // Adjuntar listener de click después de la carga
    function attach() {
      document.addEventListener('click', onClick)
    }

    if (document.readyState === 'complete') attach()
    else window.addEventListener('load', attach, { once: true })

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', attach)
    }
  }, [])
}
