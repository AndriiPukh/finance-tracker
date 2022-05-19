import React, { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }
  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">
        <span>email:</span>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label htmlFor="password">
        <span>password:</span>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label htmlFor="displayName">
        <span>password:</span>
        <input
          id="displayName"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && (
        <button type="submit" className="btn">
          Signup
        </button>
      )}
      {isPending && (
        <button type="button" className="btn" disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
