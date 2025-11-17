// datos de proyectos del portfolio con imagenes, descripciones y enlaces
import orangehrmdemo from '../assets/orangehrmdemo.png'
import trimly from '../assets/trimly.png'
import spaceInvaders from '../assets/spaceinvaders.png'

export interface Project {
  id: string;
  name: string;
  description: string;
  explanation?: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  docsUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  { 
    id: 'p1', 
    name: 'TRIMLY', 
    description: 'Sistema full-stack para gestión de salones de belleza desarrollado como proyecto de tesis.', 
    explanation: 'Desarrollé colaborativamente un sistema full-stack para gestión integral de salones estética, con backend en NestJS/TypeScript y frontend en React/TypeScript, implementando arquitectura modular y componentes reutilizables. Diseñé la base de datos en MySQL y luego la mudé a PostgreSQL utilizando TypeORM y Supabase, gestionando módulos de clientes, servicios, turnos, productos, usuarios y reportes con autenticación basada en roles y control de accesos. Construí una API RESTful con validaciones, manejo de errores, y desplegué la aplicación en Vercel. Documenté especificaciones funcionales, historias de usuario y criterios de aceptación siguiendo metodología Agile, asegurando claridad técnica y trazabilidad del proyecto. Tambien se realizaron pruebas manuales sobre el mismo. Todo el proyecto se desarrolló con metodología Agile (Scrum) y Jira para el seguimiento del desarrollo',
    image: trimly, 
    technologies: ['HTML','TailwindCSS', 'TypeScript', 'React', 'Vite', 'Node.JS', 'NestJS', 'TypeORM', 'PostgreSQL','Supabase', 'Vercel'],
    githubUrl: 'https://github.com/pablopenaheredia/Trimly-APP',
    demoUrl: 'https://trimly-frontend-eta.vercel.app/'
  },
  { 
    id: 'p2', 
    name: 'OrangeHRM Demo Test Automation Suite', 
    description: 'Proyecto freelance de automatización de pruebas con plan completo de testing y documentación.', 
    explanation: 'Desarrollé y ejecuté un plan de pruebas completo para una demo de una plataforma de gestión de Recursos Humanos, cubriendo autenticación, administración de usuarios y control de permisos. Implementé más de 40 scripts automatizados E2E utilizando Playwright y TypeScript bajo arquitectura Page Object Model, asegurando reutilización, mantenimiento y escalabilidad del framework. Documenté historias de usuario, casos de prueba, reporte de defectos y generé evidencia de ejecución.',
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
    technologies: ['Python','OpenCV', 'Mediapipe'],
    githubUrl: 'https://github.com/pablopenaheredia/ExpoCarreras2025'
  },
]

export default projects
