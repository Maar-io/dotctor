import React from "react";
import { useQuery, gql } from '@apollo/client';
import Project from '../Project/Project';

const TOPICS = gql`
{
    search(query: "is:public topic:substrate topic:blockchain", type: REPOSITORY, first: 50) {
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
          }
        }
      }
    }
  }
`;

export default function Sprojects (props){
    const { loading, error, data } = useQuery(TOPICS);
    if (loading) return <p className="navbar-text navbar-right">Loading Github repositories...</p>
    if (error) {
        debugger;
        console.log(error.message);
        return <p>{error.message}</p>
    }
    
    return(
        <>
        <p>Substrate Projects</p>

        {
            data.search.edges.map( (edge) => (
                <Project
                name = {edge.node.name}
                url = {edge.node.url}
                homepageUrl = {edge.node.homepageUrl} />
            ))
        }
        
        </>
    )
}