import { NavLink } from 'react-router'

function Dashboard() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <NavLink to="travel_place" className="btn btn-primary">
        Kelola Tempat Wisata
      </NavLink>
    </div>
  )
}

export default Dashboard
