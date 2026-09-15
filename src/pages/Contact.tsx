function Contact() {
  return (
    <section>
      <h1>Get in Touch</h1>
      <p>
        Interested in working together or just want to say hi? Reach out
        through any of the channels below.
      </p>
      <ul className="stacked-list">
        <li>
          <strong>Email</strong>
          <br />
          <a href="mailto:you@example.com">you@example.com</a>
        </li>
        <li>
          <strong>GitHub</strong>
          <br />
          <a href="https://github.com/your-username" target="_blank" rel="noreferrer">
            github.com/your-username
          </a>
        </li>
        <li>
          <strong>LinkedIn</strong>
          <br />
          <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noreferrer">
            linkedin.com/in/your-username
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Contact
