import React from "react";
import { Card } from 'react-bootstrap';
import Actions from './Actions';

export default function ProjectCards(props) {

  return (

    <Card border="info" key={props.name} style={{ width: '18rem', margin: 5 }}>
      <Card.Img variant="top" src={props.ghImage} alt="project" />
      <Card.Body>
        <Card.Title> {props.name} </Card.Title>
        <Card.Text>  {props.description} </Card.Text>
      </Card.Body>

      <Card.Footer>
        <Actions github={props.github} stars={props.stars} commitsObject={props.commitsObject}
          homepageUrl={props.homepageUrl}
        />
      </Card.Footer>
    </Card>

  )
}