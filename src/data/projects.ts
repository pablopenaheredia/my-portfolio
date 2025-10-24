import orangehrmDemo from '../assets/orangehrmdemo.png'
import trimly from '../assets/trimly.png'
import spaceInvaders from '../assets/spaceinvaders.png'

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
}

const projects: Project[] = [
  { id: 'p1', name: 'OrangeHRM Demo Test Automation Suite', description: 'Suite E2E basada en Playwright para la demo de la aplicación web, realizando pruebas automatizadas de las funcionalidades principales.', image: orangehrmDemo, technologies: ['Playwright','TypeScript', 'NodeJS'] },
  { id: 'p2', name: 'TRIMLY', description: 'Aplicacion Fullstack orientada a salones de estética.', image: trimly, technologies: ['React','TypeScript', 'NodeJS', 'NestJS', 'MySQL'] },
  { id: 'p3', name: 'Space Invaders controlado por Gestos', description: 'Desarrollo del clásico juego clásico utilizando IA para reconocimiento de gestos para el control de la nave.', image: spaceInvaders, technologies: ['Python','OpenCV'] },
]

export default projects