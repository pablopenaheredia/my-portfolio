import { useEffect } from 'react'

// Small component that wires smooth in-page scrolling for hash links
// and updates nav icon active state via the 'active' class on .nav-icon elements.
export default function InPageNavManager(){
  useEffect(()=>{
    // Normalize URL on load: remove any path or hash so the app stays at root.
    // We use replaceState so there's no navigation entry created.
    try{
      const loc = window.location
      const isRoot = loc.pathname === '/' && !loc.hash
      if(!isRoot){
        history.replaceState(null, '', '/')
      }
    }catch(err){ /* ignore */ }

    // Prevent manual navigation via back/forward to endpoints: keep user at root
    const onPop = (ev) => {
      try{
        if(window.location.pathname !== '/' || window.location.hash){
          history.replaceState(null, '', '/')
        }
      }catch(err){/* ignore */}
    }
    window.addEventListener('popstate', onPop)

    // custom smooth-scroll for hash links with a distinctive overshoot + settle animation
    // delay attachment until initial load to avoid conflicts with scroll restoration
    function attach(){
      document.addEventListener('click', onClick)
    }

    function onClick(e){
      const el = e.target.closest && e.target.closest('a[href]')
      if(!el) return
      let href = el.getAttribute('href')
      if(!href) return

      // ignore external links (different origin)
      try{
        const url = new URL(href, window.location.href)
        if(url.origin !== window.location.origin) return
      }catch(err){ /* ignore malformed URLs */ }

      // Prevent native navigation for hashes and internal paths so we can handle smooth scroll
      if(href.startsWith('#') || href.startsWith('/')){
        e.preventDefault()
      } else {
        // relative links like 'about' or './about' - treat as path
        if(!href.startsWith('http')){
          e.preventDefault()
        }
      }

      // Normalize to an id: for hashes it's the fragment; for paths take the last segment
      let id = null
      if(href.startsWith('#')){
        if(href === '#') return
        id = href.slice(1)
      } else {
        // strip query/hash
        const clean = href.split(/[?#]/)[0]
        // remove leading/trailing slashes
        const seg = clean.replace(/^\/+|\/+$/g, '')
        if(!seg) return
        id = seg.split('/').pop()
      }

      if(!id) return
      const target = document.getElementById(id)
      if(!target) return

      // If there's a section divider immediately before the section, scroll to the divider
      // so the divider is visible when navigating from the menu.
      let scrollTarget = target
      let isDivider = false
      try{
        const prev = target.previousElementSibling
        if(prev && prev.classList && prev.classList.contains('section-divider-wrapper')){
          scrollTarget = prev
          isDivider = true
        }
      }catch(err){ /* ignore DOM issues */ }

  const startY = window.scrollY || window.pageYOffset
  const rect = scrollTarget.getBoundingClientRect()
  // offset: if we're targeting a divider show it a bit lower so the divider is fully visible;
  // otherwise keep the larger offset used previously to leave space for any fixed headers.
  const offset = isDivider ? 40 : 80
  const targetY = startY + rect.top - offset

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
          // no-op: disable violet pulse animation on target elements
          // previous behaviour added the 'nav-target-animate' class which created a violet shadow
          // we intentionally leave this empty to avoid that visual effect
          return
        }

      const firstY = targetY + direction * overshoot
  // run first phase then settle, and pulse the target; do NOT modify the URL or push state
  animateTo(firstY, 380).then(()=> animateTo(targetY, 320))
  pulseTarget(target)
    }

  if(document.readyState === 'complete') attach()
  else window.addEventListener('load', attach, { once: true })

    // IntersectionObserver to toggle active class on nav icons
  const sections = Array.from(document.querySelectorAll('main section[id]'))
  const navLinks = () => Array.from(document.querySelectorAll('a[href], .nav-icons a[href]'))

    if(sections.length){
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(!entry.target.id) return
          const id = entry.target.id
          // mark anchors that reference this section via hashes or via paths (/about)
          const matches = Array.from(document.querySelectorAll(`a[href="#${id}"], a[href$="/${id}"], a[href$="${id}"]`))
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
        window.removeEventListener('load', attach)
        window.removeEventListener('popstate', onPop)
      }
    }
    return ()=> {
      window.removeEventListener('load', attach)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return null
}
