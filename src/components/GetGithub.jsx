// @flow
import React from "react";
import { Container, Row, Alert } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import ProjectCards from './ProjectCards';





export default function GetGithub(props) {
  console.log("render GetGithub ");
  let repos = 0;
  const { loading, error, data } = useQuery(props.query);

  if (loading) {
    console.log("loading...");
    return <p className="md-3">Loading Github repositories...</p>
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

    // var merged = arr.concat(arr2.filter((item) => arr.indexOf(item) < 0))
    // let nodeNames = [];
    // for (const obj in merged) {
    //   if (!nodeNames.includes(merged[obj].node.name)) {
    //     nodeNames.push(merged[obj].node.name);
    //     result.push(merged[obj].node);
    //   }
    // }
    // console.log("Total combined results =", result.length)
  }
  
  return (
    <React.Fragment>
      <Alert variant='info'>
        <h4>Add your project!</h4>
        <p>
          If you want your project to be visible on this site, add any combination of the above
          Github topics to your repository. Fetched {repos} repositories.
        </p>
      </Alert>
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