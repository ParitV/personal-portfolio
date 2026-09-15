import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="py-16">
      <p className="text-sm font-medium text-sage">Hi, I'm</p>
      <h1 className="mt-2 text-5xl">Your Name</h1>
      <p className="mt-4 max-w-md text-lg text-wood">
        A short tagline about what you do — e.g. software engineer building
        thoughtful, reliable products.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/projects" className="bg-ink px-5 py-2.5 text-paper">
          View Projects
        </Link>
        <Link
          to="/contact"
          className="border border-wood-dark px-5 py-2.5 text-ink hover:bg-stone/40"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}

export default Home
