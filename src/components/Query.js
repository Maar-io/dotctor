import React from 'react'
import { gql } from '@apollo/client';
import GetGithub from './GetGithub'

const SINCE_DAYS_AGO = 90 // count new commits since this many days ago

export default function Query(props) {
    let util = ''
    if (props.utility !== ''){
        util = 'topic:' + props.utility
    }

    var fromDate = new Date(new Date().setDate(new Date().getDate() - SINCE_DAYS_AGO)) // get 
    var date = fromDate.getFullYear() + '-'
        + ('0' + (fromDate.getMonth())).slice(-2) + '-'
        + ( '0' + fromDate.getDate()).slice(-2)
        + "T00:00:00Z"

    const QUERY = gql`
    {
        search(query: "is:public topic:${props.network} ${util}", type: REPOSITORY, first: 100) {
        repositoryCount
        pageInfo {
            endCursor
            startCursor
            hasNextPage
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
                object(expression: "master") {
                  ... on Commit {
                    history(since: "${date}") {
                      totalCount

                    }
                  }
                }
              }
            }
          }
        }
    }
    `;

    console.log("query", props.network, props.utility)
    return (
        <div>
            <GetGithub daysAgo={SINCE_DAYS_AGO} query={QUERY} large={props.large} sort={props.sort}/>
        </div>
    )
}
