import React, { useState } from "react"
import { useAuth } from "./AuthContext"
import { useHistory } from "react-router-dom"
import { auth } from './Firebase'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Alert } from 'react-bootstrap';


export default function Login() {
  console.log("render Login")
  const { login, logout } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      login(),
    ],
    callbacks: {
      signInSuccessWithAuthResult: result => {
        console.log("signInSuccessWithAuthResult")
        history.push("/")
        setLoading(false)
        console.log("token ", result.credential.accessToken)
      }
    }
  }
  debugger;
  return (

    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {auth.currentUser ? (
          <span>
            <h1>Welcome {auth.currentUser.displayName}</h1>
            <img
              alt="user"
              src={auth.currentUser.photoURL}
            />
            <button disabled={loading} onClick={() => logout()}>Log out!</button>
          </span>
      ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
          />
        )}
    </div>

  )
}
