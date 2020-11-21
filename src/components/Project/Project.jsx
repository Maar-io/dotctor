import React from "react";
import { Card, Button, CardDeck } from 'react-bootstrap';

export default function Project (props) {

    return(
        <CardDeck>

            <Card border="primary" variant="top" style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                Github: {props.url}
            </Card.Text>
            {props.homepageUrl? <Button variant="primary" href={props.homepageUrl}>Home</Button> :
                                <Button disabled>  -  </Button>}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>

            <Card border="primary" variant="top" style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                Github: {props.url}
            </Card.Text>
            {props.homepageUrl? <Button variant="primary" href={props.homepageUrl}>Home</Button> :
                                <Button disabled>  -  </Button>}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>

            <Card border="primary" variant="top" style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                Github: {props.url}
            </Card.Text>
            {props.homepageUrl? <Button variant="primary" href={props.homepageUrl}>Home</Button> :
                                <Button disabled>  -  </Button>}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
        </CardDeck>
    )
}