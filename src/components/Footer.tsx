function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-stone">
      <div className="mx-auto max-w-3xl px-6 py-8 text-center text-sm">
        <p className="text-wood">© {year} Parit Vorasaran. Built with React + Vite.</p>
        <ul className="mt-2 flex justify-center gap-6">
          <li>
            <a
              href="https://github.com/ParitV"
              target="_blank"
              rel="noreferrer"
              className="text-wood transition-colors hover:text-ink"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="mailto:vorasaran.parit@gmail.com"
              className="text-wood transition-colors hover:text-ink"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
