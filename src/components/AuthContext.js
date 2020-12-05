import React, { useContext, useState, useEffect } from "react"
import { auth } from "./Firebase"
import firebase from 'firebase/app'

import 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(true)

  function login() {
    //return auth.GithubAuthProvider.PROVIDER_ID
    return firebase.auth.GithubAuthProvider.PROVIDER_ID
  }

  function logout() {
    setCurrentUser({})
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("user", user)
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [currentUser])

  const value = {
    currentUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
