/**
 * Scroll utilities for managing scroll behavior and restoration
 */

export const resetScroll = () => {
  window.scrollTo(0, 0)
}

export const disableScrollRestoration = () => {
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  } catch (e) {
    // Silent fail
  }
}

export const enableScrollRestoration = () => {
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto'
    }
  } catch (e) {
    // Silent fail
  }
}

export const holdScrollTop = () => {
  window.scrollTo(0, 0)
  const start = performance.now()
  const id = setInterval(() => {
    window.scrollTo(0, 0)
    if (performance.now() - start > 160) {
      clearInterval(id)
    }
  }, 20)
}

export const removeHashFromUrl = () => {
  try {
    const initialHash = window.location.hash
    if (initialHash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  } catch (e) {
    // Silent fail
  }
}
