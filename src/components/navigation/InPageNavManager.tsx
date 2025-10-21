import { useUrlLock, useScrollToSection, useActiveSection } from '../../hooks'

/**
 * Componente que gestiona el comportamiento de navegación dentro de la página
 * - Bloquea la URL al path raíz
 * - Proporciona scroll suave hacia las secciones
 * - Rastrea la sección activa y actualiza los enlaces de navegación
 */
export default function InPageNavManager(): null {
  useUrlLock()
  useScrollToSection()
  useActiveSection()

  return null
}

