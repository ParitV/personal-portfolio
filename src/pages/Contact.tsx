import Seo from '../components/Seo'

function Contact() {
  return (
    <section className="mx-auto max-w-3xl">
      <Seo
        title="Contact"
        description="Get in touch with Parit Vorasaran by email or GitHub."
      />
      <h1>Get in Touch</h1>
      <p>
        Interested in working together or just want to say hi? Reach out
        through any of the channels below.
      </p>
      <ul>
        <li className="border-b border-stone py-4">
          <span className="text-sm uppercase tracking-wide text-wood">Email</span>
          <br />
          <a href="mailto:vorasaran.parit@gmail.com" className="text-ink">
            vorasaran.parit@gmail.com
          </a>
        </li>
        <li className="border-b border-stone py-4">
          <span className="text-sm uppercase tracking-wide text-wood">GitHub</span>
          <br />
          <a
            href="https://github.com/ParitV"
            target="_blank"
            rel="noreferrer"
            className="text-ink"
          >
            github.com/ParitV
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Contact
