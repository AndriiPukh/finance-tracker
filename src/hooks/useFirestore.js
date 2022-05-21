import { useReducer, useEffect, useState } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        ...state,
        isPending: true,
        success: false,
        error: null,
        document: null,
      }
    case 'ADDED_DOCUMENT':
      return {
        ...state,
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        isPending: false,
        success: false,
        document: null,
      }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // collection ref
  const ref = projectFirestore.collection(collection)

  // add a document
  const addDocument = async (doc) => {
    dispatch({
      type: 'IS_PENDING',
    })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({
        ...doc,
        createdAt,
      })
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      })
    } catch (err) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: err.message,
      })
    }
  }

  // delete a document
  // const deleteDocument = (id) => {}

  useEffect(() => () => setIsCancelled(true), [])

  return {
    addDocument,
    // deleteDocument,
    response,
  }
}
