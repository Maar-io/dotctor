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
  const [token, saveToken] = useState(0)
  const [apolloClient, setClient] = useState(0)

  function login() {
    //return auth.GithubAuthProvider.PROVIDER_ID
    return firebase.auth.GithubAuthProvider.PROVIDER_ID
  }

  function logout() {
    setCurrentUser({})
    return auth.signOut()
  }

  function getAuthToken() {
    console.log("Authcontext get token ")
    return currentUser? token : 0
  }
  
  function setToken(userToken) {
    console.log("Authcontext saving token ", userToken)
    saveToken(userToken)
  }

  function getApolloClient() {
    console.log("Authcontext get apolloClient ", apolloClient)
    return(apolloClient)
  }

  function saveApolloClient(newClient) {
    console.log("Authcontext saveApolloClient ", newClient)
    setClient(newClient)
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
    logout,
    getAuthToken,
    setToken,
    saveApolloClient,
    getApolloClient
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
