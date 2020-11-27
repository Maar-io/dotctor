import React from "react";
import { useQuery } from '@apollo/client';
import { resultKeyNameFromField } from "@apollo/client/utilities";
import ProjectCards from '../ProjectCards/ProjectCards';



export default function GetGithub (props){
    console.log("render GetGithub ");
    let result = [];
    const { loading: loading1, error: error1, data: data1 } = useQuery(props.query1);
    const { loading: loading2, error: error2, data: data2 } = useQuery(props.query2);

    if (loading1 || loading2) return <p className="md-3">Loading Github repositories...</p>
    if (error1 || error2) {
        debugger;
        console.log(error1.message);
        console.log(error2.message);
        return <p>{error1.message}</p>
    }
    if (data1 && data2) {
        console.log("data received GetGithub")
        let arr1 = data1.search.edges;
        let arr2 = data2.search.edges;
        console.log("query1 fetched =", arr1.length)
        console.log("query2 fetched =", arr2.length)

        var merged = arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0))
        let nodeNames = [];
        for (const obj in merged){
            if ( !nodeNames.includes(merged[obj].node.name) ){
                nodeNames.push(merged[obj].node.name);
                result.push(merged[obj].node);
            }
        }
        console.log("Total combined results =", result.length)
    }

    function handleGithubData(ghData) {
        console.log("handleGithubData", ghData.length)
        let projectCards = ghData?
          <>                {
            ghData.map( (node) => (
                <ProjectCards key = {node.url}
                name = {node.name}
                github = {node.url}
                description = {node.description}
                ghImage = {node.openGraphImageUrl}
                homepageUrl = {node.homepageUrl} />
            ))}
          </>
          : null;
          return {projectCards}
      }

    return(
            <>
            {result? result.map( (node) => (
                <ProjectCards key = {node.url}
                name = {node.name}
                github = {node.url}
                description = {node.description}
                ghImage = {node.openGraphImageUrl}
                homepageUrl = {node.homepageUrl} />
            ))
            : null}
          </>
    );
}