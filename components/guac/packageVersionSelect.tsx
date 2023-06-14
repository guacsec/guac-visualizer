import client from "@/apollo/client";
import { ParseAndFilterGraph } from "@/app/graph_queries";
import {
  AllPkgTreeFragment,
  GetNeighborsDocument,
  GetPkgDocument,
} from "@/gql/__generated__/graphql";
import React from "react";
import { ParseNode } from "@/app/ggraph";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/guac/packageGenericSelector";
import { VersionQueryVersion } from "@/components/guac/packageNameSelect";
import { GraphData } from "react-force-graph-2d";

type PackageNamespaceQuerySpec = {
  type: string;
  name: string;
  namespace: string;
  version: string;
  qualifiers: PackageNamespaceQueryQualifier[];
  matchOnlyEmptyQualifiers: boolean;
};

type PackageNamespaceQueryQualifier = {
  __typename?: "PackageQualifier";
  key: string;
  value: string;
};

const PackageVersionSelect = ({
  label,
  options,
  setGraphDataFunc,
  packageType,
  packageNamespace,
  packageName,
  ...rest
}: {
  label: string;
  options: PackageSelectorOption<VersionQueryVersion>[];
  setGraphDataFunc: (data: GraphData) => void;
  packageType: string;
  packageNamespace: string;
  packageName: string;
}) => {
  const onSelectPackageVersion = (option: VersionQueryVersion) => {
    let specVersion;
    let specQualifiers: {
      __typename?: "PackageQualifier";
      key: string;
      value: string;
    }[];
    let specMatchOnlyEmptyQualifiers = false;

    if (option.version != "") {
      specVersion = option.version;
    }

    if (option.qualifiers.length > 0) {
      specQualifiers = option.qualifiers;
    } else {
      specMatchOnlyEmptyQualifiers = true;
    }

    let spec: PackageNamespaceQuerySpec = {
      type: packageType,
      name: packageName,
      namespace: packageNamespace,
      version: specVersion,
      qualifiers: specQualifiers,
      matchOnlyEmptyQualifiers: specMatchOnlyEmptyQualifiers,
    };

    const packageNamespacesQuery = client.query({
      query: GetPkgDocument,
      variables: {
        spec: spec,
      },
      fetchPolicy: "no-cache",
    });

    packageNamespacesQuery.then((res) => {
      const pkg = res.data.packages[0] as AllPkgTreeFragment;

      const graphData: GraphData = { nodes: [], links: [] };
      const parsedNode = ParseNode(pkg); // is this a problem?
      ParseAndFilterGraph(graphData, parsedNode);

      client
        .query({
          query: GetNeighborsDocument,
          variables: {
            nodeId: pkg.id,
            edges: [],
          },
        })
        .then((r) => processGraphData(r.data.neighbors, graphData));
    });
  };

  const processGraphData = (packages: any[], graphData: GraphData) => {
    packages.forEach((e) => {
      const parsedGraphData = ParseNode(e);
      ParseAndFilterGraph(graphData, parsedGraphData);
    });

    setGraphDataFunc(graphData);
  };

  return (
    <PackageGenericSelector
      label={label}
      options={options}
      onSelect={onSelectPackageVersion}
      {...rest}
    />
  );
};

export default PackageVersionSelect;
