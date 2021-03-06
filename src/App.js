import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import { AuthProvider } from "./components/AuthContext"
import Login from './components/Login'
import NBar from './components/NBar'
import AddProject from './components/AddProject'
import PrivateRoute from './components/PrivateRoute'
import ApolloPrep from './components/ApolloPrep'

function App(props) {
  console.log("render APP")

  return (

    <React.Fragment>
      {/* <div>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      </div> */}
      <Router>
        <NBar />
        <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/add" component={AddProject} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/github" component={ApolloPrep} />
            </Switch>
        </AuthProvider>
      </Router>
    </React.Fragment>

  );
}

export default App;