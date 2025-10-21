// Elementos de navegación centralizados usados en toda la app
export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#contact', label: 'Contacto' }
]
