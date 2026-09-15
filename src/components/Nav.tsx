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
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <NavLink to="/" className="font-serif text-lg text-ink" end>
          Your Name
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
                      ? 'font-medium text-ink'
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
