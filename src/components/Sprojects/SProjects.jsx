import React from "react";
import { useQuery, gql } from '@apollo/client';
import Project from '../Project/Project';
import { Container, Row, Col, Alert} from 'react-bootstrap';


const TOPICS = gql`
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
          }
        }
      }
    }
  }
`;

export default function Sprojects (props){
    const { loading, error, data } = useQuery(TOPICS);
    if (loading) return <p className="md-3">Loading Github repositories...</p>
    if (error) {
        debugger;
        console.log(error.message);
        return <p>{error.message}</p>
    }
    
    return(
        <>
        <Container fluid='true'>
            <Row>
                <Alert variant='info' dismissible='true'>
                <h4>Add your project!</h4>
                    <p>
                    If you want your project to be visible on this site, 
                    add 'substrate' Github topic to your repository and any other of the following topics: 
                    'blockchain' 'bla' 'blo'
                    </p>
                </Alert>
            </Row>
            <Row>
                    {
                        data.search.edges.map( (edge) => (
                            <Project
                            name = {edge.node.name}
                            github = {edge.node.url}
                            description = {edge.node.description}
                            homepageUrl = {edge.node.homepageUrl} />
                        ))
                    }
            </Row>
        </Container>

        </>
    )
}