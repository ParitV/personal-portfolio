import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 md:px-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
