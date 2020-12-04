import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import GetGithub from './GetGithub'
import { useAuth } from "./AuthContext"

export default function ApolloPrep(prep) {

    console.log("render ApolloPrep")
    const { getApolloClient } = useAuth()

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


