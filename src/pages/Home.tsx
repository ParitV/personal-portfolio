import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const roles = [
  {
    num: '01',
    title: 'Cyber Security Analyst',
    description:
      'Monitor, investigate and respond to security threats. Turn data into actionable insights for safer systems.',
    tags: ['Threat Detection', 'Incident Response', 'Risk Analysis'],
    icon: '/reference/homepage_icon.jpeg',
  },
  {
    num: '02',
    title: 'Application Security Engineer',
    description:
      'Find and fix vulnerabilities in modern applications. Build security into the development lifecycle.',
    tags: ['SAST/DAST', 'Secure SDLC', 'Automation'],
    icon: '/reference/homepage_icon2.jpeg',
  },
  {
    num: '03',
    title: 'Software Engineer (DevSecOps)',
    description:
      'Build and deploy secure, scalable applications. Bridge development and security through automation.',
    tags: ['CI/CD', 'Cloud', 'Infrastructure as Code'],
    icon: '/reference/homepage_icon3.jpeg',
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
            Application Security / DevSecOps / Engineering
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl">Parit Vorasaran</h1>
          <p className="mt-3 text-lg text-wood-dark">
            Aspiring Cyber Security Analyst |  Application Security &amp; DevSecOps
          </p>
          <div className="my-6 h-px w-10 bg-stone" />
          <p className="font-serif text-3xl leading-tight text-ink md:text-4xl">
            I break, defend, and build software.
          </p>
          <p className="mt-4 max-w-md text-wood">
            3+ years in software engineering and technical support, now backed by a
            Master of Cyber Security. Turning that background into practical
            application security and DevSecOps work, one project at a time.
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

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div key={role.num} className="border border-stone p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-sm text-wood">{role.num}</span>
                <img
                  src={role.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-28 w-28 object-cover"
                />
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
