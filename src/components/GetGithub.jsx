// @flow
import React from "react";
import { Container, Row, Alert } from 'react-bootstrap';

import { useQuery, gql } from '@apollo/client';
import ProjectCards from './ProjectCards';


const SUBSTRATE = gql`
{
    search(query: "is:public topic:substrate topic:blockchain", type: REPOSITORY, first: 100) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
            url
            homepageUrl
            description
            openGraphImageUrl
          }
        }
      }
    }
  }
`;
const POLKADOT = gql`
{
    search(query: "is:public topic:polkadot topic:blockchain", type: REPOSITORY, first: 100) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
            url
            homepageUrl
            description
            openGraphImageUrl
          }
        }
      }
    }
  }
`;


export default function GetGithub() {
  console.log("render GetGithub ");
  let result = [];
  const { loading: loading1, error: error1, data: data1 } = useQuery(SUBSTRATE);
  const { loading: loading2, error: error2, data: data2 } = useQuery(POLKADOT);

  if (loading1 || loading2) {
    console.log("loading...");
    return <p className="md-3">Loading Github repositories...</p>
  }
  if (error1 || error2) {
    debugger;
    console.log(error1);
    console.log(error1.message);
    console.log(error2);
    console.log(error2.message);
    return <p>{error1.message}</p>
  }
  if (data1 && data2) {
    console.log("data received GetGithub")
    let arr1 = data1.search.edges;
    let arr2 = data2.search.edges;
    console.log("query1 fetched =", arr1.length)
    console.log("query2 fetched =", arr2.length)

    var merged = arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0))
    let nodeNames = [];
    for (const obj in merged) {
      if (!nodeNames.includes(merged[obj].node.name)) {
        nodeNames.push(merged[obj].node.name);
        result.push(merged[obj].node);
      }
    }
    console.log("Total combined results =", result.length)
  }

  return (
    <React.Fragment>
      <Alert variant='info' dismissible='true'>
        <h4>Add your project!</h4>
        <p>
          If you want your project to be visible on this site, add 'substrate' or 'polkadot'
          Github topic to your repository and any other of the following topics: 'blockchain' 'wallet' 'tools'
                        </p>
      </Alert>
      <Container fluid='true'>
        <Row>
          {result ? result.map((node) => (
            <ProjectCards key={node.url}
              name={node.name}
              github={node.url}
              description={node.description}
              ghImage={node.openGraphImageUrl}
              homepageUrl={node.homepageUrl} />
          ))
            : null}
        </Row>
      </Container>
    </React.Fragment>
  );
}