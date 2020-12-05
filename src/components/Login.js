import React, { useState } from "react"
import { useAuth } from "./AuthContext"
import { useHistory } from "react-router-dom"
import { auth } from './Firebase'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Alert, Button } from 'react-bootstrap';


export default function Login(props) {
  console.log("render Login")
  const { login, logout } = useAuth()
  const [error] = useState("")
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
        console.log("Login result ", result)
        console.log("Login token ", result.credential.accessToken)
        localStorage.setItem('token', JSON.stringify(result.credential.accessToken))
      }
    }
  }


  /* <h1>Welcome {auth.currentUser.displayName}</h1>
  <img
    alt="user"
    src={auth.currentUser.photoURL}
  /> */
  return (

    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {auth.currentUser ? (
        <div className="container">
        <div className="row">
          <div className="col text-center">
            <Button className="btn btn-secondary lg" disabled={loading} onClick={() => logout()}>{auth.currentUser.displayName},  Log out</Button>
          </div>
        </div>
      </div>

      ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
          />
        )}
    </div>

  )
}
