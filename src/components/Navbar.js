import React from 'react'
import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

/* navbar component */
const Navbar = () => {
  const { logout } =  useLogout()
  const { user } = useAuthContext();

  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Your Workouts</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>Hey {user?.username}!</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar