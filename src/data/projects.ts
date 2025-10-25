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
    explanation: 'Sistema full-stack desarrollado como proyecto de tesis para gestionar salones de estética. El backend usa NestJS con TypeScript y el frontend React, ambos con una arquitectura modular. La base de datos MySQL maneja 5 módulos: clientes, servicios, turnos, productos, usuarios y reportes, con roles de administrador y empleado. La API REST incluye validaciones con class-validator y manejo de errores. Todo está documentado con especificaciones funcionales, historias de usuario y gestión de sprints.',
    image: trimly, 
    technologies: ['React','TypeScript', 'NodeJS', 'NestJS', 'MySQL', 'Vite'],
    githubUrl: 'https://github.com/pablopenaheredia/trimly-app'
  },
  { 
    id: 'p2', 
    name: 'OrangeHRM Demo Test Automation Suite', 
    description: 'Proyecto freelance de automatización de pruebas con plan completo de testing y documentación.', 
    explanation: 'Se desarrolló el plan de pruebas, historias de usuario, los respectivos casos de prueba basado en criterios de aceptacion y la ejecución de los mismos, incluyendo los bugs encontrados. Validé los flujos principales sobre login, gestion de usuarios y administración de roles, encontrando varios defectos que afectaban la experiencia. Desarrollado en Playwright con TypeScript, usando Page Object Model para que el código sea reutilizable y cada test funcione independiente.',
    image: orangehrmdemo, 
    technologies: ['Playwright','TypeScript', 'NodeJS'],
    githubUrl: 'https://github.com/pablopenaheredia/OrangeHRM-Demo',
    docsUrl: 'https://www.notion.so/Soy-Pablo-Pena-Heredia-c4945a01c2d64e7abd9990c6b93a291e?p=19f16a0f8f8c80098ee7f01f7606dcaa&pm=c'
  },
  { 
    id: 'p3', 
    name: 'Space Invaders controlado por Gestos', 
    description: 'Versión interactiva del clásico juego controlado con gestos de mano mediante visión por computadora.', 
    explanation: 'Versión del clásico Space Invaders pero controlado con gestos de mano usando la cámara. El juego permite disparar al cerrar la mano y mover la nave con gestos laterales en tiempo real.',
    image: spaceInvaders, 
    technologies: ['Python','OpenCV'],
    githubUrl: 'https://github.com/pablopenaheredia/ExpoCarreras2025'
  },
]

export default projects
