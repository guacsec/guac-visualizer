import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetPkgTypesDocument } from "../gql/__generated__/graphql";
import PackageTypeSelect from "../components/guac/packageTypeSelect";
import PackageNamespaceSelect from "@/components/guac/packageNamespaceSelect";
import PackageNameSelect from "@/components/guac/packageNameSelect";
import PackageVersionSelect from "@/components/guac/packageVersionSelect";
import {
  DataFetcher,
  ParseAndFilterGraph,
  GetNodeById,
} from "@/app/graph_queries";
import { ParseNode } from "@/app/ggraph";
import { Toggle } from "@/components/guac/toggleSwitch";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";
import React from "react";
import Graph from "@/components/graph/Graph";
import { GraphData } from "react-force-graph-2d";

export default function Home() {
  let initialPackageNamespaces = [{ label: "loading...", value: "loading" }];
  let packageTypes = initialPackageNamespaces;

  // state management
  const [packageType, setPackageType] = useState("");
  const [packageNamespace, setPackageNamespace] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageVersion, setPackageVersion] = useState("");
  const [packageNamespaces, setPackageNamespaces] = useState(
    initialPackageNamespaces
  );
  const [packageNames, setPackageNames] = useState(initialPackageNamespaces);
  const [packageVersions, setPackageVersions] = useState(
    initialPackageNamespaces
  );
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [highlightArtifact, setHighlightArtifact] = useState(false);
  const [highlightVuln, setHighlightVuln] = useState(false);
  const [highlightSbom, setHighlightSbom] = useState(false);
  const [highlightBuilder, setHighlightBuilder] = useState(false);

  // this is for the visual graph
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const packageTypesQuery = useQuery(GetPkgTypesDocument, { variables: {} });
  const packageLoading = packageTypesQuery.loading;
  const packageError = packageTypesQuery.error;

  const router = useRouter();

  useEffect(() => {
    console.log(graphData.nodes);
  }, [graphData]);

  const handleArtifactClick = () => {
    setHighlightArtifact(!highlightArtifact);
  };

  const handleVulnClick = () => {
    setHighlightVuln(!highlightVuln);
  };

  const handleSbomClick = () => {
    setHighlightSbom(!highlightSbom);
  };

  const handleBuilderClick = () => {
    setHighlightBuilder(!highlightBuilder);
  };
  // ...

  const resetType = () => {
    setPackageNamespaces(initialPackageNamespaces);
    setPackageNamespace("");
    resetNamespace();
  };

  const resetNamespace = () => {
    setPackageNames(initialPackageNamespaces);
    setPackageName("");
    resetName();
  };

  const resetName = () => {
    setPackageVersions(initialPackageNamespaces);
    setPackageVersion("");
  };

  const localDataFetcher = (id: string) => {
    DataFetcher(id).then((res) => {
      const graphData: GraphData = { nodes: [], links: [] };
      res.forEach((n) => {
        ParseAndFilterGraph(graphData, ParseNode(n));
      });
      setGraphData(graphData);
    });
  };

  if (!packageError && !packageLoading) {
    // check if any params passed in to visualize, otherwise just go get the package types
    let packageData = packageTypesQuery.data?.packages;
    let sortablePackageData = [...(packageData ?? [])];
    packageTypes = sortablePackageData
      .sort((a, b) => a.type.localeCompare(b.type))
      .map((t) => ({ label: t.type, value: t.type }));

    if (router.query.path != null && !renderedInitialGraph) {
      const nodeIds = router.query.path.split(",");

      const graphData: GraphData = { nodes: [], links: [] };
      nodeIds.forEach((nodeId) => {
        GetNodeById(nodeId).then((res) => {
          ParseAndFilterGraph(graphData, ParseNode(res.node));
          setGraphData(graphData);
        });
      });
      setRenderedInitialGraph(true);
    }
  }

  return (
    <NoSSR>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div
          id="ptDiv"
          className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"
        >
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageTypeSelect
              label="Package Type"
              options={packageTypes}
              value={packageType}
              setPackageTypeFunc={setPackageType}
              setPackageNamespacesFunc={setPackageNamespaces}
              resetTypeFunc={resetType}
            />
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageNamespaceSelect
              label="Package Namespace"
              options={packageNamespaces}
              value={packageNamespace}
              packageType={packageType}
              setPackageNamespaceFunc={setPackageNamespace}
              setPackageNamesFunc={setPackageNames}
              resetNamespaceFunc={resetName}
            />
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageNameSelect
              label="Package Name"
              options={packageNames}
              value={packageName}
              packageType={packageType}
              packageNamespace={packageNamespace}
              setPackageNameFunc={setPackageName}
              setPackageVersionsFunc={setPackageVersions}
              resetNameFunc={resetName}
            />
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageVersionSelect
              label="Package Version"
              options={packageVersions}
              value={packageVersion}
              packageType={packageType}
              packageNamespace={packageNamespace}
              packageName={packageName}
              setPackageVersionFunc={setPackageVersion}
              setGraphDataFunc={setGraphData}
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="w-full items-left justify-left font-mono text-sm p-24 lg:col-span-1">
            <h2 className="my-5">Highlight Nodes</h2>
            <div className="flex flex-col">
              <Toggle
                label="Artifacts"
                toggled={highlightArtifact}
                onClick={() => handleArtifactClick()}
              />
              <Toggle
                label="Vulnerabilities"
                toggled={highlightVuln}
                onClick={() => handleVulnClick()}
              />
              <Toggle
                label="SBOM"
                toggled={highlightSbom}
                onClick={() => handleSbomClick()}
              />
              <Toggle
                label="Builder"
                toggled={highlightBuilder}
                onClick={() => handleBuilderClick()}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <Graph
              graphData={graphData}
              localDataFetcher={localDataFetcher}
              options={{
                highlightArtifact,
                highlightVuln,
                highlightSbom,
                highlightBuilder,
              }}
            />
          </div>
        </div>
      </main>
    </NoSSR>
  );
}
