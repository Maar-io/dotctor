import React from "react";
import { Alert } from 'react-bootstrap';
import { Jumbotron } from './Jumbotron';
import Login from './Login'

export default function Home(props) {
    return (
        <>
            <Jumbotron />
            {
                props.isSignedIn ?
                    null :
                    <Login isSignedIn={props.isSignedIn} />
            }
        </>
    )
}
