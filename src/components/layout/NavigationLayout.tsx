import { NavDot, InPageNavManager, MobileMenu } from '../navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import { navItems } from '../../data'

export default function NavigationLayout() {
  const { t } = useLanguage()

  return (
    <>
      <InPageNavManager />
      <MobileMenu />
      
      {/* Left nav - hidden on mobile */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-50 hidden md:flex" aria-label="Main navigation">
        <div className="relative h-full flex items-center">
          <div className="absolute top-6 left-0 w-full flex flex-col items-center gap-2">
            <a href="#home" className="hidden md:inline-block text-color-100 text-sm font-light tracking-wider rotate-180 vertical-rl">
              {t('nav.home')}
            </a>
            <a href="#home" className="md:hidden text-color-100 text-sm font-light tracking-wider">
              {t('nav.home')}
            </a>
          </div>
          <div className="mx-auto">
            <div className="nav-icons flex flex-col gap-8 items-center">
              {navItems.map((item) => (
                <NavDot key={item.href} href={item.href} label={item.label} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
