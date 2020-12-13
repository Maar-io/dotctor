// @flow
import React from "react";
import { Container, Row, Badge, Spinner } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import ProjectCards from './ProjectCards';





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
  if (data) {
    repos = data.search.edges.length;
    console.log("query fetched =", repos)
  }
  return (
    <React.Fragment>
        <p className="ml-4">
        Found <Badge variant="danger">{repos} </Badge>repositories.
        </p>
      <Container fluid='true' className="pl-5">
        <Row>
          {data ? data.search.edges.map((edge) => (
            <ProjectCards key={edge.node.url}
            name={edge.node.name}
            github={edge.node.url}
            description={edge.node.description}
            ghImage={edge.node.openGraphImageUrl}
            stars={edge.node.stargazers.totalCount} 
            homepageUrl={edge.node.homepageUrl} />
          ))
            : null}
        </Row>
      </Container>
    </React.Fragment>
  );
}