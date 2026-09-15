import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero-section">
      <p className="eyebrow">Hi, I'm</p>
      <h1>Your Name</h1>
      <p className="tagline">
        A short tagline about what you do — e.g. software engineer building
        thoughtful, reliable products.
      </p>
      <div className="cta-row">
        <Link to="/projects" className="button primary">
          View Projects
        </Link>
        <Link to="/contact" className="button">
          Get in Touch
        </Link>
      </div>
    </section>
  )
}

export default Home
