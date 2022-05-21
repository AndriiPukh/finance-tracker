import React from 'react'
import styles from './Home.module.css'
// components
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import TransactionList from '../../components/TransactionList/TransactionList'
// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

function Home() {
  const { user } = useAuthContext()
  const { error, documents } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}

export default Home
