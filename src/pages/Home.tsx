import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

function CirclesGraphic() {
  return (
    <svg viewBox="0 0 120 120" className="h-16 w-16 text-wood-dark" aria-hidden="true">
      <circle cx="45" cy="70" r="30" fill="currentColor" opacity="0.15" />
      <circle cx="70" cy="55" r="26" fill="currentColor" opacity="0.25" />
      <circle cx="60" cy="80" r="18" fill="currentColor" opacity="0.35" />
      <circle cx="95" cy="30" r="3" fill="currentColor" />
      <line x1="95" y1="30" x2="95" y2="68" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

const pixelPattern = [
  [0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
]

function PixelGraphic() {
  return (
    <div className="grid h-16 w-16 grid-cols-7 gap-0.5" aria-hidden="true">
      {pixelPattern.flatMap((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            className={cell ? 'bg-wood-dark/40' : 'bg-transparent'}
          />
        )),
      )}
    </div>
  )
}

function TrianglesGraphic() {
  return (
    <svg viewBox="0 0 120 90" className="h-16 w-16" aria-hidden="true">
      <polygon points="10,80 45,20 80,80" fill="currentColor" className="text-stone" />
      <polygon
        points="50,80 85,15 120,80"
        fill="currentColor"
        className="text-wood-dark"
        opacity="0.6"
      />
      <circle cx="85" cy="15" r="3" fill="currentColor" className="text-ink" />
    </svg>
  )
}

const roles = [
  {
    num: '01',
    title: 'Cyber Security Analyst',
    description:
      'Monitor, investigate and respond to security threats. Turn data into actionable insights for safer systems.',
    tags: ['Threat Detection', 'Incident Response', 'Risk Analysis'],
    Graphic: CirclesGraphic,
  },
  {
    num: '02',
    title: 'Application Security Engineer',
    description:
      'Find and fix vulnerabilities in modern applications. Build security into the development lifecycle.',
    tags: ['SAST/DAST', 'Secure SDLC', 'Automation'],
    Graphic: PixelGraphic,
  },
  {
    num: '03',
    title: 'Software Engineer (DevSecOps)',
    description:
      'Build and deploy secure, scalable applications. Bridge development and security through automation.',
    tags: ['CI/CD', 'Cloud', 'Infrastructure as Code'],
    Graphic: TrianglesGraphic,
  },
]

const values = [
  { num: '01', label: 'Security', text: 'Find. Understand. Reduce risk.' },
  { num: '02', label: 'Engineering', text: 'Build. Automate. Solve.' },
  { num: '03', label: 'People', text: 'Translate complexity into clarity.' },
  { num: '04', label: 'Impact', text: 'Safer systems for a more open world.' },
]

function Home() {
  return (
    <div>
      <Seo
        title="Home"
        description="Cyber Security Analyst & Application Security Engineer, Software Engineer. Portfolio of security and full-stack engineering projects."
      />

      <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-xs tracking-widest text-wood uppercase">
            Cybersecurity / Engineering / Impact
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl">Parit Vorasaran</h1>
          <p className="mt-3 text-lg text-wood-dark">
            Cyber Security Analyst &amp; Application Security Engineer
          </p>
          <div className="my-6 h-px w-10 bg-stone" />
          <p className="font-serif text-3xl leading-tight text-ink md:text-4xl">
            I break, defend, and build software.
          </p>
          <p className="mt-4 max-w-md text-wood">
            Turning security insight into better engineering through curiosity,
            analysis and practical solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/projects" className="bg-ink px-5 py-2.5 text-paper">
              View My Work →
            </Link>
            <a
              href="/resume.pdf"
              download
              className="border border-wood-dark px-5 py-2.5 text-ink hover:bg-stone/40"
            >
              Download CV ⭳
            </a>
          </div>
        </div>

        <div className="aspect-square overflow-hidden border border-stone">
          <img
            src="/reference/homepage_img.jpeg"
            alt="Abstract illustration blending mountain topography with a circular diagram, themed around people, systems, and safer software"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-24 border-t border-stone pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-xs tracking-widest text-wood uppercase">
            Roles I&apos;m Interested In
          </p>
          <a
            href="/resume.pdf"
            download
            className="font-mono text-xs tracking-wide text-wood transition-colors hover:text-ink"
          >
            VIEW MY RESUME →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          {roles.map((role) => (
            <div key={role.num} className="border-t border-stone pt-6">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-sm text-wood">{role.num}</span>
                <role.Graphic />
              </div>
              <h2 className="mt-4 text-xl">{role.title}</h2>
              <p className="mt-2 text-wood">{role.description}</p>
              <p className="mt-4 font-mono text-xs text-wood">
                {role.tags.join(' · ')}
              </p>
              <Link
                to="/about"
                className="mt-4 inline-block text-sm text-ink underline-offset-4 hover:underline"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid grid-cols-2 gap-8 border-t border-stone pt-10 sm:grid-cols-4">
        {values.map((v) => (
          <div key={v.num} className="text-center">
            <span className="text-wood">—</span>
            <p className="mt-2 font-mono text-xs text-wood">{v.num}</p>
            <p className="mt-1 font-mono text-xs tracking-widest text-ink uppercase">
              {v.label}
            </p>
            <p className="mt-1 text-sm text-wood">{v.text}</p>
            <span className="mt-2 inline-block h-1 w-1 rounded-full bg-sage" />
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home
