import orangehrmDemo from '../assets/orangehrmdemo.png'

const projects = [
  { id: 'p1', name: 'Suite de Automatización', description: 'Suite E2E basada en Playwright para la aplicación web', image: '/placeholder.svg', technologies: ['Playwright','TypeScript'] },
  { id: 'p2', name: 'Plataforma API', description: 'API REST con NestJS y TypeORM', image: orangehrmDemo, technologies: ['NestJS','MySQL'] },
  { id: 'p3', name: 'Sistema de Diseño', description: 'Tokens y componentes de diseño reutilizables', image: '/placeholder.svg', technologies: ['React','CSS'] },
  { id: 'p4', name: 'Panel Interno', description: 'Panel de analíticas para operaciones', image: '/placeholder.svg', technologies: ['React','Node.js'] },
  { id: 'p5', name: 'POC Móvil', description: 'Prototipo de experiencia móvil', image: '/placeholder.svg', technologies: ['React Native','TypeScript'] },
  // Placeholder extra project del CV — reemplazar con detalles reales
  { id: 'p6', name: 'Pipeline CI/CD', description: 'CI/CD automatizado y monitorización de despliegues', image: '/placeholder.svg', technologies: ['GitHub Actions','Docker'] }
]

export default projects
