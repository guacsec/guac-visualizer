import client from "@/apollo/client";
import {
  NodeDocument,
  Node as gqlNode,
  CertifyBad,
} from "@/gql/__generated__/graphql";
import React from "react";
import Select from "react-select";

const CertifyBadSelect = ({
  label,
  options,
  setGraphDataFunc,
  ...rest
}: {
  label: string;
  options: CertifyBad[];
  setGraphDataFunc: (data: gqlNode[]) => void;
}) => {
  const onSelectCertifyBad = (event: { value: CertifyBad }) => {
    let nodeId = "";
    const sub = event.value.subject;
    switch (sub.__typename) {
      case "Source":
        nodeId = sub.namespaces[0].names[0].id;
        break;
      case "Package":
        const name = sub.namespaces[0].names[0];
        nodeId =
          name.versions != undefined && name.versions.length > 0
            ? name.versions[0].id
            : name.id;
        break;
      case "Artifact":
        nodeId = sub.id;
        break;
    }
    client
      .query({
        query: NodeDocument,
        fetchPolicy: "no-cache",
        variables: {
          node: nodeId.toString(),
        },
      })
      .then((res) => {
        const node = res.data.node as gqlNode;
        setGraphDataFunc([node]);
      });
  };

  // change width of Select
  return (
    <div>
      {label && <label>{label}</label>}
      <Select
        options={options}
        onChange={(e) => {
          onSelectCertifyBad({ value: e });
        }}
        {...rest}
      />
    </div>
  );
};

export default CertifyBadSelect;
