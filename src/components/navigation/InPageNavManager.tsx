import { useUrlLock, useScrollToSection, useActiveSection } from '../../hooks'

/**
 * Component that manages in-page navigation behavior
 * - Locks URL to root path
 * - Provides smooth scroll to sections
 * - Tracks active section and updates navigation links
 */
export default function InPageNavManager(): null {
  useUrlLock()
  useScrollToSection()
  useActiveSection()

  return null
}

