/**
 * Utilidad debounce
 * @param {Function} func - Función a debounciar
 * @param {number} delay - Retardo en ms
 * @returns {Function} Función debounced
 */
export function debounce(func, delay) {
  let timeoutId
  
  return function debounced(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * Utilidad throttle
 * @param {Function} func - Función a limitar
 * @param {number} limit - Intervalo en ms entre ejecuciones
 * @returns {Function} Función throttled
 */
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
