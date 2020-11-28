import React from "react";
import { Alert } from 'react-bootstrap';
import { Jumbotron } from '../Jumbotron';

export const Home = () => {



    return (
        <>
            <Jumbotron />
            <Alert variant='info' dismissible='true'>
                <h4>Add your project!</h4>
                <p>
                    If you want your project to be visible on this site, add 'substrate' or 'polkadot'
                    Github topic to your repository and any other of the following topics: 'blockchain' 'wallet' 'tools'
                </p>
            </Alert>

        </>

    )
}
