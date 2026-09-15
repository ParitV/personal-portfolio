import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

function Layout() {
  return (
    <div className="page">
      <Nav />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
