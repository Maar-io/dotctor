import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import GetGithub from '../GetGithub/GetGithub';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            authToken: null,
            userName: null,
            apolloClient: null,
        }
        console.log("construct Login")

      }        

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: result => {
                console.log("signInSuccessWithAuthResult")

                const httpLink = createHttpLink({
                    uri: 'https://api.github.com/graphql',
                });

                const authLink = setContext((_, { headers }) => {
                    // get the authentication token from local storage if it exists
                    const token = result.credential.accessToken;
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

                this.setState({
                    authToken: result.credential.accessToken,
                    userName: result.user.displayName,
                    apolloClient: client,
                });

            }
        }
    }

    componentDidMount(props) {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
            console.log(firebase.auth().currentUser)
            //console.log("token", firebase.auth().currentUser.getIdToken)
        });
        if (!this.state.authToken) {
            firebase.auth().signOut();
        }
    }

    componentWillUnmount() {
        // Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        console.log("render Login")

        return (

            <div>
                <h1>Welcome </h1>
                {this.state.isSignedIn ? (
                    <ApolloProvider client={this.state.apolloClient}>
                        <span>
                            <div>Signed In!</div>
                            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                            <img
                                alt="user"
                                src={firebase.auth().currentUser.photoURL}
                            />
                            <GetGithub query1={this.props.query1} query2={this.props.query2} />
                        </span>
                    </ApolloProvider>
                ) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    )}
            </div>

        )
    }
}
export default Login
