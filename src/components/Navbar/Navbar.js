import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useLogout } from '../../hooks/useLogout'

function Navbar() {
  const { logout, error, isPending } = useLogout()
  // eslint-disable-next-line no-console
  console.log('error, isPending', error, isPending)
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}> myMoney </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" type="button" onClick={() => logout()}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
