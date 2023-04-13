import client from "@/apollo/client";
import { GetPkgDocument, Package } from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const PackageVersionSelect = ({ label, options, setPackageVersionFunc, setGraphDataFunc, ...rest }) => {


  const onSelectPackageVersion = (event: {value: any; }) => {
    setPackageVersionFunc(event.value);

    const packageNamespacesQuery = client.query({
      query: GetPkgDocument,
      variables: {
        spec:{
          version: event.value
        }
      }
    });
    let q = packageNamespacesQuery.then(
      res => {
        console.log(res.data.packages)
        //processGraphData(res.data.packages)
      }
    )

    processGraphData(event.value);
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
