// @flow
import React from "react";
import { Container, Row, Spinner, Button } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import ProjectCards from './ProjectCards';
import ProjectList from './ProjectList';





export default function GetGithub(props) {
  console.log("render GetGithub ");
  let repos = 0;
  const { loading, error, data } = useQuery(props.query);

  if (loading) {
    console.log("loading...");
    // return <p className="md-3">Loading Github repositories...</p>
    return (<Spinner animation="grow" variant="info" />)
  }
  if (error) {
    debugger;
    console.log(error);
    console.log(error.message);
    return <p>{error.message}</p>
  }
  
    function compare(a, b) {
      if (a.node.object === null || b.node.object === null) return 0
      const repoA = a.node.object.history.totalCount;
      const repoB = b.node.object.history.totalCount;
      if (repoA > repoB) return -1
      if (repoA < repoB) return 1
      return 0
    }

  let nodes = null
  if (data !== null) {
    repos = data.search.edges.length;
    console.log("repos fetched = ", repos)
    nodes = data.search.edges
    if(props.sort){
      nodes = nodes.slice().sort(compare)
    }
  }

  return (
    <React.Fragment>
      <Button variant="success" size="sm" className="mr-2 btn-outline-light" disabled>&#8682; commits in last {props.daysAgo} days</Button>
        Found {repos} repositories
      <Container fluid='true' className="pl-5">
        {props.mini === true ?
          <Row>
            {data !== null ? nodes.map((edge) => (
              <ProjectList key={edge.node.url}
                name={edge.node.name}
                github={edge.node.url}
                stars={edge.node.stargazers.totalCount}
                ghImage={edge.node.openGraphImageUrl}
                homepageUrl={edge.node.homepageUrl}
                commitsObject={edge.node.object} />
            ))
              : null}
          </Row> :
          <Row>
            {data !== null ? nodes.map((edge) => (
              <ProjectCards key={edge.node.url}
                name={edge.node.name}
                github={edge.node.url}
                description={edge.node.description}
                ghImage={edge.node.openGraphImageUrl}
                stars={edge.node.stargazers.totalCount}
                homepageUrl={edge.node.homepageUrl}
                commitsObject={edge.node.object} />
            ))
              : null}
          </Row>
        }
      </Container>
    </React.Fragment>
  );
}