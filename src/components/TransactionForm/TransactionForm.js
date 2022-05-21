import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      name,
      amount,
      uid,
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])
  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span>Transaction name:</span>
          <input
            id="name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor="amount">
          <span>Amount ($):</span>
          <input
            id="amount"
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button type="submit">Add transaction</button>
      </form>
    </>
  )
}

export default TransactionForm
