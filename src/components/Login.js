import React, { useState } from "react"
import { useAuth } from "./AuthContext"
import { useHistory } from "react-router-dom"
import { auth } from './Firebase'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Alert } from 'react-bootstrap';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


export default function Login(props) {
  console.log("render Login")
  const { login, logout, setToken, saveApolloClient, getAuthToken} = useAuth()
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
        console.log("Login result ", result)
        console.log("Login token ", result.credential.accessToken)
        setToken(result.credential.accessToken)
        setupApollo(result.credential.accessToken)
      }
    }
  }

  const setupApollo = (token) => {
    console.log("setupApollo")

    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
    });
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        console.log("setupApollo token ", token)

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    });
    saveApolloClient(client)
  }

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
