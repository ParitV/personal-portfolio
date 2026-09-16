import Seo from '../components/Seo'
import { profile } from '../data/profile'

function About() {
  return (
    <div>
      <Seo
        title="About"
        description="Background, skills, experience, and education for Parit Vorasaran, Cyber Security Analyst & Application Security Engineer."
      />

      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-xs tracking-widest text-wood uppercase">
            01 / About
          </p>
          <h1 className="mt-4 text-5xl">About Me</h1>
          <p className="mt-3 text-lg text-wood-dark">
            Cyber Security Analyst &amp; Application Security Engineer
          </p>
          <div className="my-6 h-px w-10 bg-stone" />
          <p className="max-w-md text-wood">{profile.summary}</p>
          <a
            href="/resume.pdf"
            download
            className="mt-6 inline-block border border-wood-dark px-5 py-2.5 text-ink hover:bg-stone/40"
          >
            Download Resume ⭳
          </a>
          <p className="mt-10 -rotate-2 font-script text-3xl text-wood-dark">
            Better systems for a more open web.
          </p>
        </div>

        <div className="flex gap-6">
          <div className="aspect-[1057/1488] flex-1 overflow-hidden border border-stone">
            <img
              src="/reference/aboutme_img.jpeg"
              alt="Textured photograph of rock formations meeting an architectural wall, themed around curiosity, analysis, and impact"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden w-36 flex-col justify-between border-l border-stone pl-6 sm:flex">
            <div>
              <p className="font-mono text-xs tracking-widest text-wood uppercase">
                Based in
              </p>
              <p className="mt-1 text-sm text-wood">Melbourne, AU</p>
            </div>
            <ul className="space-y-1 text-sm text-wood">
              <li>Security</li>
              <li>Engineering</li>
              <li>Open Source</li>
              <li>Continuous Learning</li>
            </ul>
            <p className="font-serif text-sm text-wood-dark italic">
              &ldquo;Safer systems create more opportunities for people.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-stone pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-wood uppercase">
              02 / Experience
            </p>
            <h2 className="mt-2 text-3xl">Work Experience</h2>
          </div>
          <p className="font-mono text-xs tracking-widest text-wood uppercase">
            Build / Protect / Improve
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <ol className="relative space-y-10 border-l border-stone pl-6">
            {profile.experience.map((entry) => (
              <li key={`${entry.role}-${entry.company}-${entry.dates}`} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-wood-dark" />
                <p className="font-mono text-xs text-wood">{entry.dates}</p>
                <p className="mt-1 text-lg text-ink">{entry.role}</p>
                <p className="text-wood">
                  {entry.company}
                  {entry.location ? ` · ${entry.location}` : ''}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-wood">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="aspect-[1003/1568] hidden overflow-hidden border border-stone md:block">
            <img
              src="/reference/aboutme_img2.jpeg"
              alt="Layered mountain ridgelines fading into mist, themed around problem solving through a different lens"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-stone pt-12">
        <p className="font-mono text-xs tracking-widest text-wood uppercase">
          03 / Skills
        </p>
        <h2 className="mt-2 text-3xl">Technical Skills</h2>

        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {profile.skills.map((group) => (
            <div key={group.category} className="border-t border-stone pt-4">
              <p className="font-mono text-xs tracking-widest text-wood uppercase">
                {group.category}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-wood">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-stone pt-12">
        <p className="font-mono text-xs tracking-widest text-wood uppercase">
          04 / Education
        </p>
        <h2 className="mt-2 text-3xl">Education</h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {profile.education.map((entry) => (
            <div key={`${entry.degree}-${entry.institution}`} className="border-t border-stone pt-4">
              <p className="font-mono text-xs text-wood">{entry.dates}</p>
              <p className="mt-1 text-lg text-ink">{entry.degree}</p>
              <p className="text-wood">
                {entry.institution}
                {entry.location ? ` · ${entry.location}` : ''}
              </p>
              {entry.bullets && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-wood">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
