import React from "react";
import { ListGroup, Image } from 'react-bootstrap';
import Actions from './Actions';

export default function ProjectList(props) {

  return (
    <ListGroup style={{ width: '18rem', margin: 5 }}>
      <ListGroup.Item><span>
        <Image src={props.ghImage} style={{ width: '50px', height: '50px' }} />
      </span>
          {'  '}{props.name}
        </ListGroup.Item>
        <ListGroup.Item>
          <Actions github={props.github} stars={props.stars} commitsObject={props.commitsObject}
            homepageUrl={props.homepageUrl}
          />
        </ListGroup.Item>
    </ListGroup>
  );

}
