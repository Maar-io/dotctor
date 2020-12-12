import React from 'react'
import { gql } from '@apollo/client';
import GetGithub from './GetGithub'


export default function Query(props) {

    const QUERY = gql`
    {
        search(query: "is:public topic:${props.network} topic:${props.utility}", type: REPOSITORY, first: 100) {
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


    return (
        <div>
            <GetGithub query={QUERY} />
        </div>
    )
}
