import React from "react";
import { Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

export default function ProjectCards(props) {
  let commits = props.commitsObject != null ? props.commitsObject.history.totalCount : 0

  return (

    <Card border="info" key={props.name} style={{ width: '18rem', margin: 5 }}>
      <Card.Img variant="top" src={props.ghImage} alt="project image" />
      <Card.Body>
        <Card.Title> {props.name} </Card.Title>
        <Card.Text>  {props.description} </Card.Text>
      </Card.Body>
      
      <Card.Footer>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            {props.homepageUrl ? <Button variant="info" size="sm" href={props.homepageUrl}>Home</Button> :
              <Button variant="info" size="sm" disabled>Home</Button>}
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="Second group">
            {props.github ? <Button variant="dark" size="sm" href={props.github}>Github</Button> :
              <Button size="sm" disabled>Github</Button>}
          </ButtonGroup>
          <Button variant="primary" size="sm" className="mr-2 btn-outline-light" disabled>&#11088; {props.stars}</Button>
          <Button variant="success" size="sm" className="mr-2 btn-outline-light" disabled>&#8682; {commits}</Button>
        </ButtonToolbar>
      </Card.Footer>
    </Card>

  )
}