import React, { useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
/* import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
 */
import GetGithub from './GetGithub'
import { useAuth } from "./AuthContext"

export default function ApolloPrep(prep) {

    console.log("render ApolloPrep")
    //const [apolloClient, setApolloClient] = useState({})
    //const [token, setToken] = useState(0)
    //const { getAuthToken } = useAuth()
    const { getApolloClient } = useAuth()

/*     const setupApollo = () => {
        console.log("setupApollo")

        const httpLink = createHttpLink({
            uri: 'https://api.github.com/graphql',
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            token = getAuthToken()
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                }
            }
        });

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: authLink.concat(httpLink)
        });
        setApolloClient(client)
    }
 */
    useEffect(() => {
        console.log("ApolloPrep useEffect")
    }, [])

    console.log("Apollo client =", getApolloClient())

    return (
    <ApolloProvider client={getApolloClient()}>
        <GetGithub />
    </ApolloProvider>
    )
}


