import React from 'react'
import GetGithub from './GetGithub'
import { gql } from '@apollo/client';

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
            stargazers {
              totalCount
            }
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
            stargazers {
              totalCount
            }
            description
            openGraphImageUrl
          }
        }
      }
    }
  }
`;

export default function Search(props) {
    return (
        <div>
            <GetGithub query={SUBSTRATE}/>
        </div>
    )
}
