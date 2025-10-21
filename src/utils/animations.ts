/**
 * Centralized Framer Motion animation variants
 * Used across the app for consistent animations
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const slideInFromRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 }
}

export const slideInFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
}
