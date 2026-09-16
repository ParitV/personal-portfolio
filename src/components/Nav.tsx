import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function Nav() {
  return (
    <header className="border-b border-stone">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6 sm:justify-between md:px-10">
        <NavLink to="/" className="hidden font-serif text-lg text-ink sm:block" end>
          Parit Vorasaran
        </NavLink>
        <nav>
          <ul className="flex gap-8 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-ink underline decoration-1 underline-offset-4'
                      : 'text-wood transition-colors hover:text-ink'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Nav
