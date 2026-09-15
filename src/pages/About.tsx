import { profile } from '../data/profile'

function About() {
  return (
    <section>
      <div className="flex items-start justify-between gap-6">
        <h1>About Me</h1>
        <a
          href="/resume.pdf"
          download
          className="shrink-0 border border-wood-dark px-5 py-2.5 text-sm text-ink hover:bg-stone/40"
        >
          Download Resume
        </a>
      </div>

      <p>{profile.summary}</p>

      <h2>Skills</h2>
      <div className="space-y-6">
        {profile.skills.map((group) => (
          <div key={group.category}>
            <p className="text-sm font-medium uppercase tracking-wide text-wood">
              {group.category}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Experience</h2>
      <ul>
        {profile.experience.map((entry) => (
          <li
            key={`${entry.role}-${entry.company}-${entry.dates}`}
            className="border-b border-stone py-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-medium text-ink">
                {entry.role} — {entry.company}
              </p>
              <span className="text-sm text-wood">
                {entry.dates}
                {entry.location ? ` · ${entry.location}` : ''}
              </span>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Education</h2>
      <ul>
        {profile.education.map((entry) => (
          <li
            key={`${entry.degree}-${entry.institution}`}
            className="border-b border-stone py-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-medium text-ink">
                {entry.degree} — {entry.institution}
              </p>
              <span className="text-sm text-wood">
                {entry.dates}
                {entry.location ? ` · ${entry.location}` : ''}
              </span>
            </div>
            {entry.bullets && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default About
