import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <article className="border-b border-stone pb-8" key={project.slug}>
            <h2>
              <Link to={`/projects/${project.slug}`} className="hover:text-wood">
                {project.title}
              </Link>
            </h2>
            <p>{project.oneLiner}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
