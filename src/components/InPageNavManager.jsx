import { useEffect } from 'react'

// Small component that wires smooth in-page scrolling for hash links
// and updates nav icon active state via the 'active' class on .nav-icon elements.
export default function InPageNavManager(){
  useEffect(()=>{
    // custom smooth-scroll for hash links with a distinctive overshoot + settle animation
    function onClick(e){
      const el = e.target.closest('a[href^="#"]')
      if(!el) return
      const href = el.getAttribute('href')
      if(!href || href === '#') return
      const id = href.slice(1)
      const target = document.getElementById(id)
      if(!target) return
      e.preventDefault()

      const startY = window.scrollY || window.pageYOffset
      const rect = target.getBoundingClientRect()
      const targetY = startY + rect.top

      // overshoot amount (pixels)
      const overshoot = Math.max(48, Math.min(120, Math.abs(targetY - startY) * 0.08))
      const direction = targetY >= startY ? 1 : -1

      // ease function (cubic in/out)
      const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      // animate to targetY + overshoot, then settle back to targetY
      function animateTo(y, duration){
        return new Promise(resolve => {
          const from = window.scrollY || window.pageYOffset
          const delta = y - from
          let start
          function step(ts){
            if(!start) start = ts
            const elapsed = ts - start
            const t = Math.min(1, elapsed / duration)
            const v = ease(t)
            window.scrollTo(0, Math.round(from + delta * v))
            if(elapsed < duration) requestAnimationFrame(step)
            else resolve()
          }
          requestAnimationFrame(step)
        })
      }

      // highlight animation on the target
      function pulseTarget(el){
        el.classList.add('nav-target-animate')
        window.setTimeout(()=> el.classList.remove('nav-target-animate'), 700)
      }

      const firstY = targetY + direction * overshoot
  // run first phase then settle, and pulse the target; do NOT modify the URL hash
  animateTo(firstY, 380).then(()=> animateTo(targetY, 320))
  pulseTarget(target)
    }

    document.addEventListener('click', onClick)

    // IntersectionObserver to toggle active class on nav icons
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    const navLinks = () => Array.from(document.querySelectorAll('.nav-icon[href^="#"], .nav-icons a[href^="#"]'))

    if(sections.length){
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(!entry.target.id) return
          const id = entry.target.id
          const matches = document.querySelectorAll(`a[href="#${id}"]`)
          matches.forEach(a=>{
            if(entry.isIntersecting){
              a.classList.add('active')
            } else {
              a.classList.remove('active')
            }
          })
        })
      },{ root: null, rootMargin: '-20% 0% -60% 0%', threshold: 0.1 })

      sections.forEach(s=>observer.observe(s))

      return ()=>{
        observer.disconnect()
        document.removeEventListener('click', onClick)
      }
    }

    return ()=> document.removeEventListener('click', onClick)
  }, [])

  return null
}
