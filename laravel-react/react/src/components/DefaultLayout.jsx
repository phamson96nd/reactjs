import {Outlet, Navigate, Link} from 'react-router-dom'
import {useStateContext} from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to='/login' />
  }

  const handleLogout = (event) => {
    event.preventDefault()
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/users'>Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href="#" onClick={handleLogout} className="btn-logout">Logout</a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

      </div>
    </div>
  )
}