import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';

export default function Actions(props) {
  let commits = props.commitsObject != null ? props.commitsObject.history.totalCount : 0

  return (
    <ButtonToolbar aria-label="Toolbar with button groups">
      {props.homepageUrl ? <Button variant="default" size="sm" className="mr-2 btn-outline-light" href={props.homepageUrl}> &#127962; </Button> 
      : null}
      <Button variant="default" size="sm" className="mr-2 btn-outline-light" href={props.github}> Github</Button>
      <Button variant="primary" size="sm" className="mr-2 btn-outline-light" disabled>&#11088; {props.stars}</Button>
      <Button variant="success" size="sm" className="mr-2 btn-outline-light" disabled>&#8682; {commits}</Button>
    </ButtonToolbar>
  )
}
