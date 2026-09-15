function Contact() {
  return (
    <section>
      <h1>Get in Touch</h1>
      <p>
        Interested in working together or just want to say hi? Reach out
        through any of the channels below.
      </p>
      <ul>
        <li className="border-b border-stone py-4">
          <span className="text-sm uppercase tracking-wide text-wood">Email</span>
          <br />
          <a href="mailto:you@example.com" className="text-ink">
            you@example.com
          </a>
        </li>
        <li className="border-b border-stone py-4">
          <span className="text-sm uppercase tracking-wide text-wood">GitHub</span>
          <br />
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noreferrer"
            className="text-ink"
          >
            github.com/your-username
          </a>
        </li>
        <li className="border-b border-stone py-4">
          <span className="text-sm uppercase tracking-wide text-wood">LinkedIn</span>
          <br />
          <a
            href="https://www.linkedin.com/in/your-username"
            target="_blank"
            rel="noreferrer"
            className="text-ink"
          >
            linkedin.com/in/your-username
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Contact
