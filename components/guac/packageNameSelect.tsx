import client from "@/apollo/client";
import { GetPkgVersionsDocument } from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const PackageNameSelect = ({ label, options, setPackageNameFunc, setPackageVersionsFunc, ...rest }) => {

  const onSelectPackageName = (event: {value: any; }) => {
    setPackageNameFunc(event.value);

    const packageVersionQuery = client.query({
      query: GetPkgVersionsDocument,
      variables:{
        spec:{
          name: event.value
        }
      }
    });
    let q = packageVersionQuery.then(
      res => {
        const sortablePackageVersions = [...res.data.packages[0].namespaces[0].names[0].versions ?? []];
        setPackageVersionsFunc(sortablePackageVersions.sort((a, b) => a.version.localeCompare(b.version)).map(t => ({label: t.version, value: t.version})));
      }
    )
  }

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>onSelectPackageName(e)} {...rest} />
    </div>
  );
};

export default PackageNameSelect;
