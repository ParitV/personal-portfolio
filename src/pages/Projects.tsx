const projects = [
  {
    title: 'Project One',
    description:
      'Short description of the project, what problem it solves, and the tech used.',
    tags: ['React', 'TypeScript'],
    repo: 'https://github.com/your-username/project-one',
    demo: '',
  },
  {
    title: 'Project Two',
    description:
      'Short description of the project, what problem it solves, and the tech used.',
    tags: ['Node.js', 'PostgreSQL'],
    repo: 'https://github.com/your-username/project-two',
    demo: '',
  },
  {
    title: 'Project Three',
    description:
      'Short description of the project, what problem it solves, and the tech used.',
    tags: ['Python', 'Data'],
    repo: 'https://github.com/your-username/project-three',
    demo: '',
  },
]

function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <ul className="tag-list">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="cta-row">
              <a href={project.repo} target="_blank" rel="noreferrer">
                Code
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
