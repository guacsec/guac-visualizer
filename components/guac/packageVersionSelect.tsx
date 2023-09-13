import client from "@/apollo/client";
import { parseAndFilterGraph } from "@/app/graph_queries";
import {
  AllPkgTreeFragment,
  NeighborsDocument,
  PackagesDocument,
} from "@/gql/__generated__/graphql";
import React from "react";
import { ParseNode } from "@/app/ggraph";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/guac/packageGenericSelector";
import { VersionQueryVersion } from "@/components/guac/packageNameSelect";
import { GraphDataWithMetadata } from "@/components/graph/types";

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
  setGraphDataFunc: (data: GraphDataWithMetadata) => void;
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
      query: PackagesDocument,
      variables: {
        filter: spec,
      },
      fetchPolicy: "no-cache",
    });

    packageNamespacesQuery.then((res) => {
      const pkg = res.data.packages[0] as AllPkgTreeFragment;

      const graphData: GraphDataWithMetadata = { nodes: [], links: [] };
      const parsedNode = ParseNode(pkg); // is this a problem?
      parseAndFilterGraph(graphData, parsedNode);

      client
        .query({
          query: NeighborsDocument,
          variables: {
            node: pkg.id,
            usingOnly: [],
          },
        })
        .then((r) => processGraphData(r.data.neighbors, graphData));
    });
  };

  const processGraphData = (
    packages: any[],
    graphData: GraphDataWithMetadata
  ) => {
    let currentGraphData = graphData;
    packages.forEach((e) => {
      const parsedGraphData = ParseNode(e);
      parseAndFilterGraph(currentGraphData, parsedGraphData);
    });
    console.log("set graph data from selector", graphData);
    setGraphDataFunc(currentGraphData);
  };

  if (!options) {
    options = [];
  }

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
