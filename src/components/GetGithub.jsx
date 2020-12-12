// @flow
import React from "react";
import { Container, Row, Alert } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import ProjectCards from './ProjectCards';





export default function GetGithub(props) {
  console.log("render GetGithub ");
  let result = [];
  const { loading: loading, error: error, data: data } = useQuery(props.query);

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
    let arr = data.search.edges;
    console.log("query fetched =", arr.length)
    console.log(data)

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
  // stars={node.stargazers.totalCount} 

  return (
    <React.Fragment>
      <Alert variant='info'>
        <h4>Add your project!</h4>
        <p>
          If you want your project to be visible on this site, add 'substrate' or 'polkadot'
          Github topic to your repository and any other of the following topics: 'blockchain' 'wallet' 'tools'
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
            homepageUrl={edge.node.homepageUrl} />
          ))
            : null}
        </Row>
      </Container>
    </React.Fragment>
  );
}