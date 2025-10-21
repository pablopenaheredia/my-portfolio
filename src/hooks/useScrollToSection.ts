import { useEffect } from 'react'

/**
 * Hook to handle smooth scroll to sections with overshoot animation
 * Intercepts clicks on hash links and provides custom smooth scroll behavior
 */
export function useScrollToSection(): void {
  useEffect(() => {
    // Custom smooth-scroll for hash links with overshoot + settle animation
    function onClick(e: any) {
      const el = e.target.closest && e.target.closest('a[href]')
      if (!el) return
      let href = el.getAttribute('href')
      if (!href) return

      // Ignore external links (different origin)
      try {
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) return
      } catch (err) {
        /* ignore malformed URLs */
      }

      // Prevent native navigation for hashes and internal paths
      if (href.startsWith('#') || href.startsWith('/')) {
        e.preventDefault()
      } else {
        // Relative links - treat as path
        if (!href.startsWith('http')) {
          e.preventDefault()
        }
      }

      // Normalize to an id
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

      // Check if there's a section divider before the section
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

      // Overshoot amount
      const overshoot = Math.max(48, Math.min(120, Math.abs(targetY - startY) * 0.08))
      const direction = targetY >= startY ? 1 : -1

      // Ease function (cubic in/out)
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

      // Animate to y position
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
      // Run overshoot then settle
      animateTo(firstY, 380).then(() => animateTo(targetY, 320))
    }

    // Attach click listener after load
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
