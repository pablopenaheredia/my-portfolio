import orangehrmDemo from '../assets/orangehrmdemo.png'

export interface Project {
  id: string;
  name: string;
  description: string;
  explanation?: string; // Explicación detallada opcional
  image: string;
  technologies: string[];
}

const projects: Project[] = [
  { 
    id: 'p1', 
    name: 'OrangeHRM Demo Test Automation Suite', 
    description: 'Suite E2E basada en Playwright para la demo de la aplicación web, realizando pruebas automatizadas de las funcionalidades principales.', 
    explanation: 'Proyecto de automatización end-to-end que valida flujos críticos como login, gestión de empleados y reportes. Implementa patrones Page Object Model (POM) y reporting integrado con CI/CD.',
    image: '/placeholder.svg', 
    technologies: ['Playwright','TypeScript', 'NodeJS'] 
  },
  { 
    id: 'p2', 
    name: 'TRIMLY', 
    description: 'Aplicacion Fullstack orientada a salones de estética.', 
    explanation: 'Sistema completo de gestión para salones de belleza con módulos de reservas, clientes, servicios y facturación. Arquitectura REST API con autenticación JWT y base de datos relacional optimizada.',
    image: orangehrmDemo, 
    technologies: ['React','TypeScript', 'NodeJS', 'NestJS', 'MySQL'] 
  },
  { 
    id: 'p3', 
    name: 'Space Invaders controlado por Gestos', 
    description: 'Desarrollo del clásico juego clásico utilizando IA para reconocimiento de gestos para el control de la nave.', 
    explanation: 'Videojuego interactivo que utiliza visión por computadora para detectar gestos de mano en tiempo real mediante OpenCV. Los movimientos físicos del jugador controlan la nave espacial sin necesidad de teclado o mouse.',
    image: '/placeholder.svg', 
    technologies: ['Python','OpenCV'] 
  },
]

export default projects
