// seccion de proyectos con grid de tarjetas
import { memo } from 'react'
import projects from '../../data/projects'
import ProjectCard from './ProjectCard'

function ProjectsSection() {
  return (
    <section id="projects" className="projects-section section-padding">
      <div className="projects-list site-container">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectsSection)
