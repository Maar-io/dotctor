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
    if (loading) return <p>Loading Github repositories...</p>
    if (error) return <p>Error while loading Github repositories...</p>
    
    
    return(
        <>
        <p>Substrate Projects</p>
        <p>

            {data.search.node.map((node) => (
                node.name
            ))}
        </p>
        </>
    )
}