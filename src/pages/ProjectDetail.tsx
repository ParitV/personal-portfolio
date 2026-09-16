import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const demoFrameRef = useRef<HTMLIFrameElement>(null)
  const [demoHeight, setDemoHeight] = useState(640)

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <p className="text-wood">We couldn't find a project with that URL.</p>
        <Link to="/projects" className="text-ink underline">
          Back to projects
        </Link>
      </section>
    )
  }

  const links = [
    { label: 'Live Demo', href: project.demoUrl },
    { label: 'Code', href: project.repoUrl },
    { label: 'Docs', href: project.docUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href))

  const handleDemoLoad = () => {
    const body = demoFrameRef.current?.contentDocument?.body
    if (!body) return

    const updateHeight = () => setDemoHeight(body.scrollHeight)
    updateHeight()
    new ResizeObserver(updateHeight).observe(body)
  }

  const linkButtons = (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="border border-wood-dark px-5 py-2.5 text-ink hover:bg-stone/40"
        >
          {link.label}
        </a>
      ))}
    </div>
  )

  return (
    <article>
      <header>
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage"
            >
              {tech}
            </li>
          ))}
        </ul>
        <h1 className="mt-4">{project.title}</h1>
        <p className="text-lg text-wood">{project.oneLiner}</p>
        <div className="mt-6">{linkButtons}</div>
      </header>

      <div className="mt-10 space-y-10">
        <section className="border-t border-stone pt-8">
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section className="border-t border-stone pt-8">
          <h2>What I Built</h2>
          <p>{project.whatIBuilt}</p>
        </section>

        {project.demoEmbedUrl && (
          <section className="border-t border-stone pt-8">
            <h2>Live Demo</h2>
            <iframe
              ref={demoFrameRef}
              src={project.demoEmbedUrl}
              title={`${project.title} pipeline live demo`}
              onLoad={handleDemoLoad}
              style={{ height: demoHeight }}
              className="w-full rounded"
            />
          </section>
        )}

        {project.architectureImage && (
          <section className="border-t border-stone pt-8">
            <h2>Architecture</h2>
            <img
              src={project.architectureImage}
              alt={`${project.title} architecture diagram`}
              className="w-full border border-stone"
            />
          </section>
        )}

        <section className="border-t border-stone pt-8">
          <h2>My Role</h2>
          <p>{project.myRole}</p>
        </section>

        <section className="border-t border-stone pt-8">
          <h2>Key Decisions</h2>
          <ul className="list-disc space-y-2 pl-5">
            {project.keyDecisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10 border-t border-stone pt-8">{linkButtons}</div>
    </article>
  )
}

export default ProjectDetail
