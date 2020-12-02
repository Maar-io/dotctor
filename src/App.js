import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import GetGithub from './components/GetGithub'
import Home from './components/Home'
import { AuthProvider } from "./components/AuthContext"
import Login from './components/Login'
import NBar from './components/NBar'
import PrivateRoute from './components/PrivateRoute'

import styled from 'styled-components'

function App(props) {
  console.log("render APP")
  const [isSignedIn, setSignedIn] = useState(false)
  const [apolloClient, setApolloClient] = useState({})

  function tokenReceived(token) {
    setSignedIn(true);
    const httpLink = createHttpLink({
      uri: 'https://api.github.com/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = null;
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
    setApolloClient(client)
  }

  return (

    <React.Fragment>
      <div>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      </div>
      <Router>
        <NBar/>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/github" component={GetGithub} />
          </Switch>
        </AuthProvider>
      </Router>
    </React.Fragment>

  );


}

export default App;