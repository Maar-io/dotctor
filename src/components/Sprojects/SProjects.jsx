import React from "react";
import { useQuery, gql } from '@apollo/client';

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
        <text>

            {data.search.edges.map((edge) => (
                edge.node.name + '\n'
            ))}
        </text>
        </>
    )
}