import React from "react";
import { useQuery, gql } from '@apollo/client';



export default function Sprojects (props){
    const { loading, error, data } = useQuery(props.query);
    if (loading) return <p className="md-3">Loading Github repositories...</p>
    if (error) {
        debugger;
        console.log(error.message);
        return <p>{error.message}</p>
    }
    if (data) {
        //debugger;
        props.handleGithubData(data);
    }

    return(null);
    /*
    
    */
}