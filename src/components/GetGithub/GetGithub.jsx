import React from "react";
import { useQuery } from '@apollo/client';



export default function GetGithub (props){
    console.log("render GetGithub ")
    const { loading, error, data } = useQuery(props.query);
    if (loading) return <p className="md-3">Loading Github repositories...</p>
    if (error) {
        debugger;
        console.log(error.message);
        return <p>{error.message}</p>
    }
    if (data) {
        console.log("data received GetGithub")
        props.handleGithubData(data);
    }

    return(null);
}