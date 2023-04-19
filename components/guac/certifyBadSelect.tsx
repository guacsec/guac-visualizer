import client from "@/apollo/client";
import { GetNodeDocument, Node as gqlNode , CertifyBad} from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const CertifyBadSelect = ({ label, options, setGraphDataFunc, ...rest }) => {
  const onSelectCertifyBad = (event: { value: CertifyBad; }) => {
    let nodeId = "";
    const sub = event.value.subject;
    switch (sub.__typename) {
      case "Source":
        nodeId =  sub.namespaces[0].names[0].id;
        break
      case "Package":
        const name = sub.namespaces[0].names[0];
        nodeId = (name.versions != undefined && name.versions.length > 0) ? name.versions[0].id : name.id;
        break
      case "Artifact":
        nodeId = sub.id;
        break
    }
    console.log("NODEID", nodeId);
    client.query({
      query: GetNodeDocument,
      fetchPolicy: "no-cache" ,
      variables: {
        nodeId: nodeId.toString(),
      }
    }).then( res => {
      setGraphDataFunc([res.data.node])
    });
  };

  // change width of Select
  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>{onSelectCertifyBad(e)}} {...rest}/>
    </div>
  );
};

export default CertifyBadSelect;
