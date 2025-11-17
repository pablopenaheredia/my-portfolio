// contexto para manejo de idiomas (español/ingles) con traducciones
import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  es: {
    // Hero
    'hero.title': 'Analista QA',
    'hero.subtitle': '& Desarrollador Fullstack',
    'hero.description': 'Mi enfoque está en la calidad del software y la mejora continua, aplicando buenas practicas y buena comunicación en cada etapa del desarrollo del proyecto.',
    'hero.downloadCV': 'Descargar CV',
    'hero.name': 'PABLO PENA HEREDIA',
    
    // Navigation
    'nav.home': 'INICIO',
    'nav.about': 'SOBRE MÍ',
    'nav.experience': 'EXPERIENCIA',
    'nav.projects': 'PROYECTOS',
    'nav.skills': 'HABILIDADES',
    'nav.contact': 'CONTACTO',
    
    // Sections
    'section.about': 'SOBRE MÍ',
    'section.experience': 'EXPERIENCIA',
    'section.projects': 'PROYECTOS',
    'section.skills': 'HABILIDADES',
    'section.contact': 'CONTACTO',
    
    // Projects
    'project.trimly.name': 'TRIMLY',
    'project.trimly.description': 'Sistema full-stack para gestión de salones de belleza desarrollado como proyecto de tesis.',
    'project.trimly.explanation': 'Desarrollé colaborativamente un sistema full-stack para gestión integral de salones estética, con backend en NestJS/TypeScript y frontend en React/TypeScript, implementando arquitectura modular y componentes reutilizables. Diseñé la base de datos en MySQL y TypeORM y luego la mudé a PostgreSQL y Supabase, gestionando módulos de clientes, servicios, turnos, productos, usuarios y reportes con autenticación basada en roles y control de accesos. Construí una API RESTful con validaciones, manejo de errores, y desplegué la aplicación en Vercel. Documenté especificaciones funcionales, historias de usuario y criterios de aceptación siguiendo metodología Agile, asegurando claridad técnica y trazabilidad del proyecto. Tambien se realizaron pruebas manuales sobre el mismo. Todo el proyecto se desarrolló con metodología Agile (Scrum) y Jira para el seguimiento del desarrollo.',
    
    'project.orangehrm.name': 'OrangeHRM Demo Test Automation Suite',
    'project.orangehrm.description': 'Proyecto freelance de automatización de pruebas con plan completo de testing y documentación.',
    'project.orangehrm.explanation': 'Desarrollé y ejecuté un plan de pruebas completo para una demo de una plataforma de gestión de Recursos Humanos, cubriendo autenticación, administración de usuarios y control de permisos. Implementé más de 40 scripts automatizados E2E utilizando Playwright y TypeScript bajo arquitectura Page Object Model, asegurando reutilización, mantenimiento y escalabilidad del framework. Documenté historias de usuario, casos de prueba, reporte de defectos y generé evidencia de ejecución.',
    
    'project.spaceinvaders.name': 'Space Invaders controlado por Gestos',
    'project.spaceinvaders.description': 'Versión interactiva del clásico juego controlado mediante gestos por webcam.',
    'project.spaceinvaders.explanation': 'Versión del clásico Space Invaders controlado mediante gestos capturados por webcam. Reconocimiento en tiempo real para mover la nave lateralmente y disparar al cerrar el puño.',
    
    'project.button.github': 'GitHub',
    'project.button.docs': 'Documentación',
    'project.button.demo': 'Ver Demo',
    
    // Contact
    'contact.title': '¿Quieres...',
    'contact.card1.title': 'ofrecerme una oportunidad laboral?',
    'contact.card1.description': 'Estoy abierto a oportunidades laborales o colaboraciones. Con experiencia en aseguramiento de calidad y desarrollo de software, me interesan roles que me permitan trabajar en proyectos desafiantes y significativos. Si tienes un proyecto o una posición en mente contáctame!.',
    'contact.card2.title': 'conectar?',
    'contact.card2.description': 'El networking es clave en la industria IT, y siempre busco conocer gente nueva y ampliar mi círculo profesional. Si compartes intereses similares o estas interesado en conversar sobre algo, no dudes en conectar conmigo!.',
    'contact.card3.title': 'que testee tu software o construir algo juntos?',
    'contact.card3.description': 'Me apasiona tanto el testing como el desarrollo de software aplicando buenas prácticas. Ya sea desarrollar un proyecto o testear uno existente, estoy listo para nuevos desafíos. Si tienes una idea o proyecto en mente, hablemos y veamos cómo podemos colaborar.',
    
    'contact.links.email': 'Correo',
    'contact.links.github': 'GitHub',
    'contact.links.linkedin': 'LinkedIn',
    
    // About
    'about.intro': 'Soy Pablo Pena Heredia, egresado como Tecnico Superior en Desarrollo de Software. Me apasiona asegurar la calidad del software desde el inicio del ciclo de vida del desarrollo. Tengo experiencia en testing manual y automatizado, así como en desarrollo web. Me gusta aprender y compartir conocimientos.',
    'about.paragraph1': 'Durante mi recorrido, trabajé como QA Manual Trainee, diseñando planes de prueba, ejecutando casos y gestionando defectos en Jira X-Ray. Además, desarrollé un proyecto personal de automatización con Playwright y TypeScript. También participé en equipos de trabajo donde aplicamos estrategias de testing reales en entornos de prueba de aplicaciones web de Startups.',
    'about.paragraph2': 'En mi tésis, desarrollé un sistema fullstack orientado a salones de estética con React, TypeScript, NestJS y MySQL, aplicando buenas prácticas de desarrollo y metodologías ágiles.',
    'about.paragraph3': 'Hoy mi objetivo es seguir creciendo en el campo de la calidad de software y el desarrollo del mismo, aportando soluciones escalables. Me motiva aprender nuevas tecnologías y compartir lo que aprendo, colaborar con equipos y construyendo productos que ofrezcan experiencias confiables.',
    
    // Experience
    'experience.xacademy.automation.year': '2025',
    'experience.xacademy.automation.title': 'XAcademy - QA Automation',
    'experience.xacademy.automation.position': 'QA Automation (Course)',
    'experience.xacademy.automation.company': 'XAcademy',
    'experience.xacademy.automation.description': '• Formación en testing automatizado usando Cypress y JavaScript.\n• Desarrollo y ejecución de scripts de prueba sobre una aplicación web de prueba (Ticketazo).\n• Documentación de plan de pruebas y codificación de pruebas E2E para funcionalidades críticas.',
    
    'experience.xacademy.manual.year': '2025',
    'experience.xacademy.manual.title': 'XAcademy - QA Manual',
    'experience.xacademy.manual.position': 'QA Manual (Course)',
    'experience.xacademy.manual.company': 'XAcademy',
    'experience.xacademy.manual.description': '• Formación en testing manual.\n• Lideré, junto a otros 2 testers, un grupo de 20 personas para realizar pruebas funcionales de la aplicación de una startup (Quien x Mi / QxM).\n• Diseñé el plan de pruebas, creación y ejecución de casos de prueba y comunicación directa con el CEO y el equipo de QA del cliente.',
    
    'experience.upex.year': '2023 – 2024',
    'experience.upex.title': 'UPEX - QA Manual Trainee',
    'experience.upex.position': 'QA Manual Trainee',
    'experience.upex.company': 'UPEX',
    'experience.upex.description': '• Desarrollé y diseñé test plans para garantizar la cobertura de requisitos y escenarios de uso.\n• Realicé pruebas manuales según casos de prueba establecidos, registrando resultados y observaciones.\n• Participé en bug triage y seguimiento de defectos usando Jira + Xray.\n• Re-ejecuté casos modificados para verificar correcciones y mantener la integridad del producto.',
    
    // Clipboard
    'clipboard.success': 'Email copiado en el portapapeles',
    'clipboard.error': 'No se pudo copiar el email',
  },
  en: {
    // Hero
    'hero.title': 'QA Analyst',
    'hero.subtitle': '& Fullstack Developer',
    'hero.description': 'My focus is on software quality and continuous improvement, applying best practices and effective communication at every stage of project development.',
    'hero.downloadCV': 'Download CV',
    'hero.name': 'PABLO PENA HEREDIA',
    
    // Navigation
    'nav.home': 'HOME',
    'nav.about': 'ABOUT',
    'nav.experience': 'EXPERIENCE',
    'nav.projects': 'PROJECTS',
    'nav.skills': 'SKILLS',
    'nav.contact': 'CONTACT',
    
    // Sections
    'section.about': 'ABOUT',
    'section.experience': 'EXPERIENCE',
    'section.projects': 'PROJECTS',
    'section.skills': 'SKILLS',
    'section.contact': 'CONTACT',
    
    // Projects
    'project.trimly.name': 'TRIMLY',
    'project.trimly.description': 'Full-stack beauty salon management system developed as thesis project.',
    'project.trimly.explanation': 'Full-stack system developed for comprehensive beauty salon management, using a NestJS/TypeScript backend and a React/TypeScript frontend. Implemented a modular architecture and reusable components. Designed the database in MySQL and later migrated it to PostgreSQL using TypeORM and Supabase, managing modules for clients, services, appointments, products, users, and reports with role-based authentication and access control. Built a RESTful API with validations and error handling, and deployed the application on Vercel. Documented functional specifications, user stories, and acceptance criteria following the Agile methodology, ensuring technical clarity and project traceability. Manual tests were also performed on the system. The entire project was developed using the Agile methodology (Scrum) and Jira for development tracking.',
    
    'project.orangehrm.name': 'OrangeHRM Demo Test Automation Suite',
    'project.orangehrm.description': 'Freelance test automation project with complete testing plan and documentation.',
    'project.orangehrm.explanation': 'Developed and executed a comprehensive testing plan for a Human Resources management platform demo, covering authentication, user administration, and permission control. Implemented over 40 automated E2E scripts using Playwright and TypeScript under the Page Object Model (POM) architecture, ensuring framework reusability, maintainability, and scalability. Documented user stories, test cases, defect reports, and generated execution evidence.',
    
    'project.spaceinvaders.name': 'Gesture-Controlled Space Invaders',
    'project.spaceinvaders.description': 'Interactive version of the classic game controlled by webcam gestures.',
    'project.spaceinvaders.explanation': 'Classic Space Invaders version controlled by gestures captured via webcam. Real-time recognition to move the ship laterally and shoot by closing the fist.',
    
    'project.button.github': 'GitHub',
    'project.button.docs': 'Documentation',
    'project.button.demo': 'View Demo',
    
    // Contact
    'contact.title': 'Want to...',
    'contact.card1.title': 'Offer a job opportunity?',
    'contact.card1.description': 'I am open to job opportunities or collaborations. With experience in quality assurance and software development, I am interested in roles that allow me to work on challenging and meaningful projects. If you have a project or position in mind, contact me!',
    'contact.card2.title': 'Connect?',
    'contact.card2.description': 'Networking is key in the IT industry, and I am always looking to meet new people and expand my professional circle. If you share similar interests or are interested in talking about something, feel free to contact me.',
    'contact.card3.title': 'Need software testing or build something together?',
    'contact.card3.description': 'I am passionate about both testing and software development applying best practices. Whether developing a project or testing an existing one, I am ready for new challenges. If you have an idea or project in mind, let\'s talk and see how we can collaborate.',
    
    'contact.links.email': 'Email',
    'contact.links.github': 'GitHub',
    'contact.links.linkedin': 'LinkedIn',
    
    // About
    'about.intro': 'I am Pablo Pena Heredia, graduate with an Associate Degree in Software Development. I am passionate about ensuring software quality from the beginning of the development lifecycle. I have experience in manual and automated testing, as well as web development. I enjoy learning and sharing knowledge.',
    'about.paragraph1': 'Throughout my journey, I worked as a QA Manual Trainee, designing test plans, executing test cases, and managing defects in Jira X-Ray. Additionally, I developed a personal automation project with Playwright and TypeScript. I also participated in work teams where we applied real testing strategies in Startup web application testing environments.',
    'about.paragraph2': 'In my thesis, I developed a fullstack system oriented to beauty salons with React, TypeScript, NestJS and MySQL, applying development best practices and agile methodologies.',
    'about.paragraph3': 'Today my goal is to continue growing in the field of software quality and development, providing scalable solutions. I am motivated to learn new technologies and share what I learn, collaborate with teams and build products that offer reliable experiences.',
    
    // Experience
    'experience.xacademy.automation.year': '2025',
    'experience.xacademy.automation.title': 'XAcademy - QA Automation',
    'experience.xacademy.automation.position': 'QA Automation (Course)',
    'experience.xacademy.automation.company': 'XAcademy',
    'experience.xacademy.automation.description': '• Training in automated testing using Cypress and JavaScript.\n• Development and execution of test scripts on a test web application (Ticketazo).\n• Test plan documentation and E2E test coding for critical functionalities.',
    
    'experience.xacademy.manual.year': '2025',
    'experience.xacademy.manual.title': 'XAcademy - QA Manual',
    'experience.xacademy.manual.position': 'QA Manual (Course)',
    'experience.xacademy.manual.company': 'XAcademy',
    'experience.xacademy.manual.description': '• Training in manual testing.\n• Led, along with 2 other testers, a group of 20 people to perform functional testing of a startup application (Quien x Mi / QxM).\n• Designed the test plan, created and executed test cases, and maintained direct communication with the CEO and the client\'s QA team.',
    
    'experience.upex.year': '2023 – 2024',
    'experience.upex.title': 'UPEX - QA Manual Trainee',
    'experience.upex.position': 'QA Manual Trainee',
    'experience.upex.company': 'UPEX',
    'experience.upex.description': '• Developed and designed test plans to ensure requirements coverage and use case scenarios.\n• Performed manual testing according to established test cases, recording results and observations.\n• Participated in bug triage and defect tracking using Jira + Xray.\n• Re-executed modified cases to verify corrections and maintain product integrity.',
    
    // Clipboard
    'clipboard.success': 'Email copied to clipboard',
    'clipboard.error': 'Could not copy email',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
