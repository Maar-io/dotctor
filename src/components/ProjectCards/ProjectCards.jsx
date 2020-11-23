import React from "react";
import { Card, Button } from 'react-bootstrap';

export default function ProjectCards (props) {

    
    return(
        
        <Card border="success" style={{ width: '18rem', margin: 5 }}>
            <Card.Body>
            <Card.Title> {props.name} </Card.Title>
            <Card.Text>  {props.description} </Card.Text>
            <Card.Text>
            {props.homepageUrl? <Button variant="info" href={props.homepageUrl}>Home</Button> :
                                <Button disabled>Home</Button>}
            {props.github? <Button variant="success" href={props.github}>Github</Button> :
                            <Button disabled>Github</Button>}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>

    )
}