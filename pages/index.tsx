import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetPkgTypesDocument } from "../gql/__generated__/graphql";
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
import PackageSelector, {
  INITIAL_PACKAGE_NAMESPACES,
} from "@/components/guac/packageSelector";

export default function Home() {
  // state management
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [highlightArtifact, setHighlightArtifact] = useState(false);
  const [highlightVuln, setHighlightVuln] = useState(false);
  const [highlightSbom, setHighlightSbom] = useState(false);
  const [highlightBuilder, setHighlightBuilder] = useState(false);

  // this is for the visual graph
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

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

  const localDataFetcher = (id: string) => {
    DataFetcher(id).then((res) => {
      const graphData: GraphData = { nodes: [], links: [] };
      res.forEach((n) => {
        ParseAndFilterGraph(graphData, ParseNode(n));
      });
      setGraphData(graphData);
    });
  };

  let packageTypes = INITIAL_PACKAGE_NAMESPACES;

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
        <PackageSelector
          packageTypes={packageTypes}
          setGraphData={setGraphData}
        />
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
