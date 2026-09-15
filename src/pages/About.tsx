function About() {
  return (
    <section>
      <h1>About Me</h1>
      <p>
        Placeholder bio — replace with a short paragraph about your
        background, what you're passionate about, and what you're currently
        working on.
      </p>

      <h2>Experience</h2>
      <ul className="stacked-list">
        <li>
          <strong>Job Title</strong> — Company Name
          <br />
          <span className="muted">Jan 2023 – Present</span>
          <p>One or two lines describing your role and impact.</p>
        </li>
        <li>
          <strong>Job Title</strong> — Company Name
          <br />
          <span className="muted">Jan 2021 – Dec 2022</span>
          <p>One or two lines describing your role and impact.</p>
        </li>
      </ul>

      <h2>Skills</h2>
      <ul className="tag-list">
        {['TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'].map(
          (skill) => (
            <li key={skill}>{skill}</li>
          ),
        )}
      </ul>
    </section>
  )
}

export default About
