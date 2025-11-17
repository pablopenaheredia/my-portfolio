// utilidades de debounce y throttle para optimizacion de eventos
export function debounce(func, delay) {
  let timeoutId
  
  return function debounced(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function throttle(func, limit) {
  let inThrottle
  
  return function throttled(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
