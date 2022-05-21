import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

function Navbar() {
  const { logout, error, isPending } = useLogout()
  const { user } = useAuthContext()

  // eslint-disable-next-line no-console
  console.log('error, isPending', error, isPending)
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}> myMoney </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button className="btn" type="button" onClick={() => logout()}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
