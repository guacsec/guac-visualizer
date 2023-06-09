import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  GetNeighborsQuery,
  GetPkgTypesDocument,
} from "@/gql/__generated__/graphql";
import {
  fetchNeighbors,
  parseAndFilterGraph,
  GetNodeById,
} from "@/app/graph_queries";
import { ParseNode } from "@/app/ggraph";
import { Toggle } from "@/components/guac/toggleSwitch";
import { useRouter } from "next/router";
import React from "react";
import Graph from "@/components/graph/Graph";
import { GraphDataWithMetadata } from "@/components/graph/types";
import PackageSelector, {
  INITIAL_PACKAGE_NAMESPACES,
} from "@/components/guac/packageSelector";
import { NodeFragment } from "@/gql/types/nodeFragment";

export default function Home() {
  // state management
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [highlightArtifact, setHighlightArtifact] = useState(false);
  const [highlightVuln, setHighlightVuln] = useState(false);
  const [highlightSbom, setHighlightSbom] = useState(false);
  const [highlightBuilder, setHighlightBuilder] = useState(false);

  // this is for the visual graph
  const [graphData, setGraphData] = useState<GraphDataWithMetadata>({
    nodes: [],
    links: [],
  });

  // Track the width and height of the canvas container to determine size of
  // canvas

  const containerRef = useRef<HTMLDivElement>();
  const containerCurrentElem = containerRef?.current;
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);

  function updateSize() {
    if (containerRef?.current) {
      setGraphWidth(containerRef.current.offsetWidth);
      setGraphHeight(containerRef.current.offsetHeight);
    }
  }
  useEffect(() => {
    if (containerCurrentElem) {
      updateSize();
    }
  }, [containerCurrentElem]);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    console.log("Graph data has updated:", graphData);
  }, [graphData]);

  const packageTypesQuery = useQuery(GetPkgTypesDocument, { variables: {} });
  const packageLoading = packageTypesQuery.loading;
  const packageError = packageTypesQuery.error;

  useEffect(() => {
    if (packageError || packageLoading) {
      return;
    }
    if (router.query.path != null && !renderedInitialGraph) {
      const nodeIds = router.query.path.split(",");
      let graphData: GraphDataWithMetadata = { nodes: [], links: [] };
      nodeIds.forEach(async (nodeId: string) => {
        const res = await GetNodeById(nodeId);
        const parsedNode = ParseNode(res.node as NodeFragment);
        parseAndFilterGraph(graphData, parsedNode);
      });
      setGraphData(graphData);
      setRenderedInitialGraph(true);
    }
  }, [packageError, packageLoading]);

  const router = useRouter();

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

  const localDataFetcher = (id: string | number) => {
    fetchNeighbors(id.toString()).then(
      (res: GetNeighborsQuery["neighbors"]) => {
        const graphData: GraphDataWithMetadata = { nodes: [], links: [] };
        res.forEach((n) => {
          let node = n as NodeFragment;
          parseAndFilterGraph(graphData, ParseNode(node));
        });
        console.log("local data fetcher set graph data", graphData);
        setGraphData(graphData);
      }
    );
  };

  let packageTypes = INITIAL_PACKAGE_NAMESPACES;

  if (!packageError && !packageLoading) {
    // check if any params passed in to visualize, otherwise just go get the package types
    let packageData = packageTypesQuery.data?.packages;
    let sortablePackageData = [...(packageData ?? [])];
    packageTypes = sortablePackageData
      .sort((a, b) => a.type.localeCompare(b.type))
      .map((t) => ({ label: t.type, value: t.type }));
  }

  return (
    <>
      <main className="h-full flex flex-col items-center p-12">
        <PackageSelector
          packageTypes={packageTypes}
          setGraphData={setGraphData}
        />
        <div className="mt-8 grid grid-cols-none grid-rows-4 lg:grid-rows-none lg:grid-cols-4 h-full w-full gap-8 lg:gap-4">
          <div className="flex flex-col font-mono text-sm p-4 row-span-1 lg:col-span-1">
            <div className="my-5 text-lg">Highlight Nodes</div>
            <div className="flex flex-col justify-center gap-y-2 w-full">
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
          <div
            className="lg:col-span-3 row-span-3 h-full w-full"
            ref={containerRef}
          >
            <Graph
              graphData={graphData}
              localDataFetcher={localDataFetcher}
              options={{
                highlightArtifact,
                highlightVuln,
                highlightSbom,
                highlightBuilder,
              }}
              containerOptions={{
                width: graphWidth - 1,
                height: graphHeight,
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
