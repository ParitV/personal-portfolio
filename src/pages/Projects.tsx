import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section className="mx-auto max-w-3xl">
      <Seo
        title="Projects"
        description="Security and software engineering projects by Parit Vorasaran, including Eight, an automated SAST/DAST pipeline."
      />
      <h1>Projects</h1>
      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            to={`/projects/${project.slug}`}
            key={project.slug}
            className="group block border border-stone p-6 transition-colors hover:border-wood"
          >
            <div className="aspect-video overflow-hidden border border-stone bg-stone/20">
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <h2 className="mt-4 group-hover:text-wood">{project.title}</h2>
            <p>{project.oneLiner}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Projects
