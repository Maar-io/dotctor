import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/auth'

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

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
    state = {
        isSignedIn: false,
        authToken: null,
        userName: null,
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: result => {
                this.setState({
                    authToken: result.credential.accessToken,
                    userName: result.user.displayName
                });
            }
        }
    }

    componentDidMount(props) {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
            console.log(firebase.auth().currentUser)
            console.log("token", firebase.auth().currentUser.getIdToken)
        });
        if (!this.state.authToken) {
            firebase.auth().signOut();
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome </h1>
                {this.state.isSignedIn ? (
                    <span>
                        <div>Signed In!</div>
                        <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                        <img
                            alt="profile picture"
                            src={firebase.auth().currentUser.photoURL}
                        />
                    </span>
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
