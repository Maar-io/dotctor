import React, { useEffect, useState } from 'react'
import Search from './Search'
//import { useAuth } from "./AuthContext"
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


export default function ApolloPrep() {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || 0)
    const [client, setClient] = useState({})

    console.log("render ApolloPrep, token=", token)

    useEffect(() => {
        setupApollo()
    }, [token])


    const setupApollo = () => {
        console.log("setupApollo")

        const httpLink = createHttpLink({
            uri: 'https://api.github.com/graphql',
        });
        const authLink = setContext((_, { headers }) => {
            console.log("setupApollo token ", token)

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
        setClient(client)
    }


    if (Object.keys(client).length !== 0) {
        console.log("Apollo client =", client)
        return (
            <ApolloProvider client={client}>
                <Search />
            </ApolloProvider>
        )
    }
    else {
        console.log("Missing ApolloClient")
        return <div>Error: Missing ApolloClient</div>
    }
}


