// Elementos de navegación centralizados usados en toda la app
export interface NavItem {
  href: string;
  key: string; // translation key suffix, e.g. 'about'
  label?: string; // optional fallback display label
}

export const navItems: NavItem[] = [
  { href: '#about', key: 'about', label: 'Sobre mí' },
  { href: '#experience', key: 'experience', label: 'Experiencia' },
  { href: '#projects', key: 'projects', label: 'Proyectos' },
  { href: '#skills', key: 'skills', label: 'Habilidades' },
  { href: '#contact', key: 'contact', label: 'Contacto' }
]
