import { createContext, useMemo, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })
  const context = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state]
  )
  // eslint-disable-next-line react/react-in-jsx-scope
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
