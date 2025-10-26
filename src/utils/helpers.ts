/**
 * debounce utility
 * @param {Function} func - function to debounce
 * @param {number} delay - delay in ms
 * @returns {Function} debounced function
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
 * throttle utility
 * @param {Function} func - function to limit
 * @param {number} limit - interval in ms between executions
 * @returns {Function} throttled function
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
