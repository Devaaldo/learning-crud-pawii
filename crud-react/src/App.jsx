import { Outlet, NavLink } from 'react-router'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand">Travelopedia</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Beranda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default App
