import client from "@/apollo/client";
import { parseAndFilterGraph } from "@/utils/graph_queries";
import {
  AllPkgTreeFragment,
  NeighborsDocument,
  PackagesDocument,
} from "@/gql/__generated__/graphql";
import React from "react";
import { ParseNode } from "@/utils/ggraph";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/packages/packageGenericSelector";
import { VersionQueryVersion } from "@/components/packages/packageNameSelect";
import { GraphDataWithMetadata } from "@/components/graph/types";
import { usePackageData } from "@/store/packageDataContext";

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
  disabled?: boolean;
}) => {
  const { setPkgID, setPackageName, setPkgType } = usePackageData();
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
      const pkgID = pkg.namespaces[0].names[0].versions[0].id;
      const pkgType = pkg.type;

      console.log("PACKAGE HERE", pkg);

      setPkgID(pkgID);
      setPackageName(pkg.namespaces[0].names[0].name);
      setPkgType(pkgType);

      const graphData: GraphDataWithMetadata = { nodes: [], links: [] };
      const parsedNode = ParseNode(pkg);

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
