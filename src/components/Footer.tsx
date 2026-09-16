function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-stone">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="font-serif text-lg text-ink">Parit Vorasaran</p>
          <p className="mt-1 text-wood">
            Cybersecurity · Application Security · Software Engineering
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-center">
          <div className="flex gap-4">
            <a
              href="https://github.com/ParitV"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-wood transition-colors hover:text-ink"
            >
              <GithubIcon />
            </a>
            <a
              href="mailto:vorasaran.parit@gmail.com"
              aria-label="Email"
              className="text-wood transition-colors hover:text-ink"
            >
              <MailIcon />
            </a>
          </div>
          <p className="text-wood">© {year} Parit Vorasaran. Built with React + Vite.</p>
        </div>

        <div className="flex items-center gap-4 md:border-l md:border-stone md:pl-6">
          <span className="text-wood">—</span>
          <span className="text-xs uppercase tracking-wide text-wood">Keep Building</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
