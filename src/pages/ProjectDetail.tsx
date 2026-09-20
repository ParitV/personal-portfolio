import { Link, useParams } from 'react-router-dom'
import EightDemo from '../components/EightDemo'
import Seo from '../components/Seo'
import { projects } from '../data/projects'

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 20c.2-2.2 1.7-3.8 3.9-4.4" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  )
}

const impactIcons = [ShieldIcon, ClockIcon, UsersIcon, ChartIcon]

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
    </div>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  )
}

const techStackItems = [
  { name: 'GitHub Actions', category: 'CI/CD', icon: <GearIcon /> },
  { name: 'CodeQL', category: 'SAST', icon: <ShieldIcon /> },
  { name: 'Semgrep', category: 'SAST', icon: <DotsIcon /> },
  { name: 'OWASP ZAP', category: 'DAST', icon: <BoltIcon /> },
  {
    name: 'JavaScript',
    category: 'Application',
    badge: { bg: 'bg-[#F0DB4F]', text: 'text-ink', label: 'JS' },
  },
  {
    name: 'Markdown',
    category: 'Documentation',
    badge: { bg: 'bg-ink', text: 'text-paper', label: 'M' },
  },
]

function ProjectHeaderGraphic() {
  return (
    <div className="relative aspect-square">
      <div className="absolute top-0 right-0 text-right font-mono text-xs tracking-widest text-wood uppercase">
        <p>Automate</p>
        <p>Detect</p>
        <p>Prevent</p>
        <div className="mt-2 ml-auto h-px w-6 bg-stone" />
      </div>
      <div className="absolute bottom-0 left-0 font-mono text-xs tracking-widest text-wood uppercase">
        <p>Safer</p>
        <p>Software</p>
        <p>Faster</p>
      </div>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <rect x="40" y="30" width="90" height="120" fill="currentColor" className="text-stone" opacity="0.5" />
        <rect x="70" y="50" width="90" height="120" fill="currentColor" className="text-wood" opacity="0.4" />
        <rect x="55" y="80" width="90" height="90" fill="currentColor" className="text-wood-dark" opacity="0.5" />
        <circle cx="165" cy="35" r="6" fill="currentColor" className="text-ink" />
        <line x1="165" y1="41" x2="165" y2="90" stroke="currentColor" className="text-ink" strokeWidth="1" />
      </svg>
    </div>
  )
}

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="mx-auto max-w-3xl">
        <Seo title="Project not found" description="This project could not be found." />
        <h1>Project not found</h1>
        <p className="text-wood">We couldn't find a project with that URL.</p>
        <Link to="/projects" className="text-ink underline">
          Back to projects
        </Link>
      </section>
    )
  }

  return (
    <article>
      <Seo title={project.title} description={project.oneLiner} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-xs tracking-widest text-wood uppercase">
            Projects / {project.title}
          </p>
          <h1 className="mt-4 text-6xl">{project.title}</h1>
          <p className="mt-4 max-w-md text-lg text-wood">{project.oneLiner}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech} className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-ink px-5 py-2.5 text-paper"
            >
              View on GitHub ↗
            </a>
            <a
              href="#live-demo"
              className="border border-wood-dark px-5 py-2.5 text-ink hover:bg-stone/40"
            >
              Live Demo ↓
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone pt-6">
            <div>
              <p className="text-sm text-wood">Role</p>
              <p className="mt-1 text-ink">{project.role}</p>
            </div>
            <div>
              <p className="text-sm text-wood">Date</p>
              <p className="mt-1 text-ink">{project.date}</p>
            </div>
            <div>
              <p className="text-sm text-wood">Type</p>
              <p className="mt-1 text-ink">{project.type}</p>
            </div>
          </div>
        </div>

        <ProjectHeaderGraphic />
      </div>

      <section className="mt-20 grid grid-cols-1 gap-10 border-t border-stone pt-12 md:grid-cols-3">
        <div>
          <p className="font-mono text-xs text-wood">01</p>
          <div className="mt-1 h-px w-6 bg-stone" />
          <h2 className="mt-4 text-2xl">Problem</h2>
          <p className="mt-3 text-wood">{project.problem}</p>
        </div>

        <div>
          <p className="font-mono text-xs text-wood">02</p>
          <div className="mt-1 h-px w-6 bg-stone" />
          <h2 className="mt-4 text-2xl">What I Built</h2>
          <p className="mt-3 text-wood">{project.whatIBuilt}</p>
        </div>

        <div>
          <p className="font-mono text-xs text-wood">03</p>
          <div className="mt-1 h-px w-6 bg-stone" />
          <h2 className="mt-4 text-2xl">Impact</h2>
          <ul className="mt-4 space-y-3">
            {project.impact.map((item, i) => {
              const Icon = impactIcons[i % impactIcons.length]
              return (
                <li key={item} className="flex items-start gap-3 text-wood">
                  <span className="mt-0.5 shrink-0 text-wood-dark">
                    <Icon />
                  </span>
                  <span>{item}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {project.architectureNote && (
        <section className="mt-20 border-t border-stone pt-12">
          <h2 className="text-3xl">Architecture</h2>
          <div className="mt-2 h-px w-6 bg-stone" />
          {project.architectureImage && (
            <img
              src={project.architectureImage}
              alt={`${project.title} architecture diagram`}
              className="mt-8 w-full border border-stone"
            />
          )}
          <p className="mt-6 max-w-2xl text-wood">{project.architectureNote}</p>
        </section>
      )}

      {project.keyFinding && (
        <section className="mt-20 border-t border-stone pt-12">
          <p className="font-mono text-xs tracking-widest text-wood uppercase">The Finding</p>
          <h2 className="mt-4 max-w-2xl text-3xl">{project.keyFinding.summary}</h2>
          <div className="mt-4 h-px w-6 bg-stone" />
          <ol className="mt-8 space-y-6">
            {project.keyFinding.points.map((point, i) => (
              <li key={i} className="flex gap-4 text-wood">
                <span className="shrink-0 font-mono text-sm text-wood-dark">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.detectionCards && (
        <section className="mt-20 border-t border-stone pt-12">
          <h2 className="text-3xl">Detections</h2>
          <div className="mt-2 h-px w-6 bg-stone" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.detectionCards.map((card) => (
              <div key={card.mitreId} className="border border-stone p-6">
                <p className="font-mono text-xs tracking-widest text-wood uppercase">
                  {card.mitreId}
                </p>
                <h3 className="mt-2 text-xl">{card.title}</h3>
                <p className="mt-3 text-wood">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.skillsDemonstrated && (
        <section className="mt-20 border-t border-stone pt-12">
          <h2 className="text-3xl">Skills Demonstrated</h2>
          <div className="mt-2 h-px w-6 bg-stone" />
          <ul className="mt-8 flex flex-wrap gap-3">
            {project.skillsDemonstrated.map((skill) => (
              <li key={skill} className="rounded-full bg-sage/10 px-4 py-2 text-sm text-sage">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.slug === 'eight' && (
        <section id="live-demo" className="mt-20 border-t border-stone pt-12 scroll-mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2 className="text-3xl">Live Demo</h2>
              <div className="mt-2 h-px w-6 bg-stone" />
            </div>
            <p className="text-sm text-wood">
              Try it out – see what each catches that the other can't.
            </p>
          </div>

          <div className="mt-8">
            <EightDemo />
          </div>

          <p className="mt-6 text-center text-sm text-wood">
            Simulated for demo purposes — view the full workflow on{' '}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline-offset-4 hover:underline"
            >
              GitHub ↗
            </a>
          </p>
        </section>
      )}

      {project.slug === 'eight' ? (
        <section className="mt-20 border-t border-stone pt-12">
          <h2 className="text-3xl">Tech Stack</h2>
          <div className="mt-2 h-px w-6 bg-stone" />

          <div className="mt-8 flex flex-wrap items-start gap-10">
            <div className="flex flex-wrap gap-x-10 gap-y-8">
              {techStackItems.map((item) => (
                <div key={item.name} className="w-20 text-center">
                  {item.badge ? (
                    <span
                      className={`mx-auto flex h-14 w-14 items-center justify-center font-mono text-sm font-bold ${item.badge.bg} ${item.badge.text}`}
                    >
                      {item.badge.label}
                    </span>
                  ) : (
                    <span className="mx-auto flex h-14 w-14 items-center justify-center border border-stone text-wood-dark">
                      {item.icon}
                    </span>
                  )}
                  <p className="mt-3 text-sm text-ink">{item.name}</p>
                  <p className="font-mono text-xs text-wood">{item.category}</p>
                </div>
              ))}
            </div>

            <div className="border-l border-stone pl-8 font-mono text-xs tracking-widest text-wood uppercase">
              <p>Open Source</p>
              <p>Security</p>
              <p>Collaboration</p>
              <div className="mt-2 h-px w-6 bg-stone" />
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-20 border-t border-stone pt-12">
          <h2 className="text-3xl">Tech Stack</h2>
          <div className="mt-2 h-px w-6 bg-stone" />
          <ul className="mt-8 flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <li key={tech} className="border border-stone px-4 py-2 text-sm text-wood-dark">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export default ProjectDetail
