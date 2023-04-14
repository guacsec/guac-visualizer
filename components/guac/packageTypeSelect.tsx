import client from "@/apollo/client";
import { GetPkgNamespacesDocument } from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const PackageTypeSelect = ({ label, options, setPackageTypeFunc, setPackageNamespacesFunc, ...rest }) => {
  const onSelectPackageType = (event: { value: any; }) => {
    setPackageTypeFunc(event.value);

    const packageNamespacesQuery = client.query({
      query: GetPkgNamespacesDocument,
      variables: {
        spec:{
          type: event.value
        }
      }
    });
    let q = packageNamespacesQuery.then(
      res => {
        const sortablePackageNamespaces = [...res.data.packages[0].namespaces ?? []];
        setPackageNamespacesFunc(sortablePackageNamespaces.sort((a, b) => a.namespace.localeCompare(b.namespace)).map(t => ({label: t.namespace, value: t.namespace})));
      }
    )
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>{onSelectPackageType(e)}} {...rest}/>
    </div>
  );
};

export default PackageTypeSelect;
