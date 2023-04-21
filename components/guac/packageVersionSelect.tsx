import client from "@/apollo/client";
import { ParseAndFilterGraph } from "@/app/graph_queries";
import { Artifact, GetNeighborsDocument, GetPkgDocument, Package, PackageQualifier, PackageVersion } from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";
import { Node, Edge, ParseNode } from '../../app/ggraph';

const PackageVersionSelect = ({ label, options, setPackageVersionFunc, setGraphDataFunc,packageType, packageNamespace, packageName, ...rest }) => {
  const onSelectPackageVersion = (event: {value: any; }) => {
    setPackageVersionFunc(event);
    
    let spec ={
      version: event.value.version,
      type: packageType.value,
      name: packageName.value,
      namespace: packageNamespace.value
    };

    if (event.value.qualifiers.length > 0) {
      spec.qualifiers = event.value.qualifiers
    } else {
      spec.matchOnlyEmptyQualifiers = true
    }
    
    const packageNamespacesQuery = client.query({
      query: GetPkgDocument,
      variables: {
        spec: spec,
      }
    });
    let q = packageNamespacesQuery.then(
      res => {
        const graphData = {nodes:[], links:[]}
        const parsedNode = ParseNode(res.data.packages[0]) // is this a problem?

        ParseAndFilterGraph(graphData, parsedNode);
      
        const q = client.query({
          query: GetNeighborsDocument,
          variables: {
            nodeId: res.data.packages[0].id,
            edges: []
          }
        })
        .then(r => processGraphData(r.data.neighbors, graphData))
        
      }
    )
  }

  function toVersionString (v :PackageVersion) {
    return v.version + JSON.stringify(v.qualifiers.map((l :PackageQualifier)=>l.key +"=" + l.value));
  }

  const processGraphData = (packages: any[], graphData) => {  
    
    const linkKey = (link: any) => `${link.source}-${link.target}-${link.label}`;

    packages.forEach(e => {
      const parsedGraphData = ParseNode(e)
      ParseAndFilterGraph(graphData, parsedGraphData)
    });

    setGraphDataFunc(graphData)
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>onSelectPackageVersion(e)} {...rest} />
    </div>
  );
};

export default PackageVersionSelect;
