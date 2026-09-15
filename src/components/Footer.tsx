function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>© {year} Your Name. Built with React + Vite.</p>
      <ul className="footer-links">
        <li>
          <a href="https://github.com/your-username" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="mailto:you@example.com">Email</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
