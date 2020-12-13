import React from 'react'
import { gql } from '@apollo/client';
import GetGithub from './GetGithub'


export default function Query(props) {
    let util = ''
    if (props.utility !== ''){
        util = 'topic:' + props.utility
    }
    const QUERY = gql`
    {
        search(query: "is:public topic:${props.network} ${util}", type: REPOSITORY, first: 100) {
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

    console.log("query", props.network, props.utility)
    return (
        <div>
            <GetGithub query={QUERY} />
        </div>
    )
}
