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
      <ul>
        <li className="border-b border-stone py-4">
          <strong>Job Title</strong> — Company Name
          <br />
          <span className="text-sm text-wood">Jan 2023 – Present</span>
          <p className="mt-2">One or two lines describing your role and impact.</p>
        </li>
        <li className="border-b border-stone py-4">
          <strong>Job Title</strong> — Company Name
          <br />
          <span className="text-sm text-wood">Jan 2021 – Dec 2022</span>
          <p className="mt-2">One or two lines describing your role and impact.</p>
        </li>
      </ul>

      <h2>Skills</h2>
      <ul className="flex flex-wrap gap-2">
        {['TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'].map(
          (skill) => (
            <li
              key={skill}
              className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage"
            >
              {skill}
            </li>
          ),
        )}
      </ul>
    </section>
  )
}

export default About
