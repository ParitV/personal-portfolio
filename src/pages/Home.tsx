import { Link } from 'react-router-dom'

const quietLinks = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function Home() {
  return (
    <section className="py-16">
      <h1 className="text-5xl">Parit Vorasaran</h1>
      <p className="mt-3 text-lg text-wood-dark">
        Cyber Security Analyst &amp; Application Security Engineer, Software
        Engineer
      </p>
      <p className="mt-4 max-w-xl text-lg text-wood">
        I break, defend, and build software — turning security insight into
        better engineering.
      </p>
      <div className="mt-8 flex items-center gap-4 text-sm">
        {quietLinks.map((link, index) => (
          <span key={link.to} className="flex items-center gap-4">
            {index > 0 && <span className="text-stone">·</span>}
            <Link
              to={link.to}
              className="text-wood underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </div>
    </section>
  )
}

export default Home
