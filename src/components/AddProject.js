import React, { Component } from 'react'
import { Alert, Image } from 'react-bootstrap';
import example from './addProject.png' // relative path to image 

export default class AddProject extends Component {
    render() {
        return (
            <>
            <div>
                <Alert variant='info' size="large">
                    <h4>Add your project!</h4>
                    <p>
                        If you want your project to be visible on this site, add to your repository
          any combination of Github topics you see in the search form.
                </p>
                </Alert>
                <div className="container">
        <div className="row">
          <div className="col text-center">
          <Image src={example} rounded />
          </div>
        </div>
      </div>
            </div>
            </>
        )
    }
}
