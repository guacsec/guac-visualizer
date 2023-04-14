import client from "@/apollo/client";
import { GetPkgDocument, Package } from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const PackageVersionSelect = ({ label, options, setPackageVersionFunc, setGraphDataFunc, ...rest }) => {


  const onSelectPackageVersion = (event: {value: any; }) => {
    setPackageVersionFunc(event.value);

    
    let spec ={
      version: event.value.version,
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
        console.log(res.data.packages)
        setGraphDataFunc(res.data);
        //processGraphData(res.data.packages)
      }
    )

   // processGraphData(event.value);
  }

  const processGraphData = (packages: Package[]) => {
    console.log(packages);

    // const graphData = {nodes:[], links:[]}
    // packages.forEach(p => 
    //   graphData.nodes.push{
    //     id: p.
    //   })

    // const graphData = {
    //   nodes: [...Array(300).keys()].map(i => ({ id: i})), 
    //   links: [...Array(300).keys()]
    //   .filter(id => id)
    //   .map(id => ({
    //     source: id,
    //     target: Math.round(Math.random() * (id-1))
    //   }))
    // };
    // setGraphDataFunc(graphData)
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>onSelectPackageVersion(e)} {...rest} />
    </div>
  );
};

export default PackageVersionSelect;
