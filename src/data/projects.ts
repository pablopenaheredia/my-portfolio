import orangehrmdemo from '../assets/orangehrmdemo.png'
import trimly from '../assets/trimly.png'
import spaceInvaders from '../assets/spaceinvaders.png'

export interface Project {
  id: string;
  name: string;
  description: string;
  explanation?: string; // Explicación detallada opcional
  image: string;
  technologies: string[];
  githubUrl: string;
  docsUrl?: string; // URL de documentación opcional
}

const projects: Project[] = [
  { 
    id: 'p1', 
    name: 'TRIMLY', 
    description: 'Sistema full-stack para gestión de salones de belleza desarrollado como proyecto de tesis.', 
    explanation: 'Sistema full-stack con backend en NestJS/TypeScript y frontend en React/TypeScript. Base de datos MySQL con TypeORM implementando 5 módulos: clientes, servicios, turnos, productos, usuarios y reportes con autenticación por roles. API RESTful con validaciones mediante class-validator y manejo de errores. Incluye documentación con especificaciones funcionales e historias de usuario.',
    image: trimly, 
    technologies: ['React','TypeScript', 'NodeJS', 'NestJS', 'MySQL', 'Vite'],
    githubUrl: 'https://github.com/pablopenaheredia/Trimly-APP'
  },
  { 
    id: 'p2', 
    name: 'OrangeHRM Demo Test Automation Suite', 
    description: 'Proyecto freelance de automatización de pruebas con plan completo de testing y documentación.', 
    explanation: 'Plan de pruebas completo con historias de usuario, casos de uso y reporte de defectos. Validación de flujos end-to-end: autenticación, gestión de usuarios y permisos. Automatización con Playwright y TypeScript usando Page Object Model y fixtures para reutilización y aislamiento de tests. Arquitectura escalable que facilita incorporar nuevas funcionalidades.',
    image: orangehrmdemo, 
    technologies: ['Playwright','TypeScript', 'NodeJS'],
    githubUrl: 'https://github.com/pablopenaheredia/OrangeHRM-Demo',
    docsUrl: 'https://www.notion.so/Soy-Pablo-Pena-Heredia-c4945a01c2d64e7abd9990c6b93a291e?p=19f16a0f8f8c80098ee7f01f7606dcaa&pm=c'
  },
  { 
    id: 'p3', 
    name: 'Space Invaders controlado por Gestos', 
    description: 'Versión interactiva del clásico juego controlado mediante gestos por webcam.', 
    explanation: 'Versión del clásico Space Invaders controlado mediante gestos capturados por webcam. Reconocimiento en tiempo real para mover la nave lateralmente y disparar al cerrar el puño.',
    image: spaceInvaders, 
    technologies: ['Python','OpenCV'],
    githubUrl: 'https://github.com/pablopenaheredia/ExpoCarreras2025'
  },
]

export default projects
