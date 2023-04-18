import client from "@/apollo/client";
import { GetPkgDocument, Package } from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const PackageVersionSelect = ({ label, options, setPackageVersionFunc, setGraphDataFunc,packageType, packageNamespace, packageName, ...rest }) => {


  const onSelectPackageVersion = (event: {value: any; }) => {
    setPackageVersionFunc(event.value);

    
    let spec ={
      version: event.value.version,
      type: packageType,
      name: packageName,
      namespace: packageNamespace
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
        setGraphDataFunc(res.data.packages);
      }
    )
  }

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>onSelectPackageVersion(e)} {...rest} />
    </div>
  );
};

export default PackageVersionSelect;
