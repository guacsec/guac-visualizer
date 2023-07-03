import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GetPkgTypesDocument } from "@/gql/__generated__/graphql";
import {
  DataFetcher,
  ParseAndFilterGraph,
  GetNodeById,
} from "@/app/graph_queries";
import { ParseNode } from "@/app/ggraph";
import { Toggle } from "@/components/guac/toggleSwitch";
import { useRouter } from "next/router";
import Graph from "@/components/graph/Graph";
import { GraphData } from "react-force-graph-2d";
import PackageSelector, {
  INITIAL_PACKAGE_NAMESPACES,
} from "@/components/guac/packageSelector";
import { GraphDataWithMetadata } from "@/components/graph/types";
import { Breadcrumb } from "@/utils/breadcrumbs";

export default function Home() {
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const [highlightState, setHighlightState] = useState({
    highlightArtifact: false,
    highlightVuln: false,
    highlightSbom: false,
    highlightBuilder: false,
  });

  const [firstNode, setFirstNode] = useState(null);
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [, setReset] = useState(false);
  const [, setPackageGraphData] = useState<GraphData>(null);

  const [initialGraphData, setInitialGraphData] = useState(null);

  const handleHighlightToggle = (highlightKey: keyof typeof highlightState) => {
    setHighlightState((prevState) => ({
      ...prevState,
      [highlightKey]: !prevState[highlightKey],
    }));
  };

  const {
    highlightArtifact: artifact,
    highlightVuln: vuln,
    highlightSbom: sbom,
    highlightBuilder: builder,
  } = highlightState;

  const setGraphDataWithInitial = (data: GraphData) => {
    setGraphData(data);
    if (!initialGraphData) {
      setInitialGraphData(data);
    }
  };

  const resetGraph = () => {
    if (initialGraphData) {
      setGraphData(initialGraphData);
      setBackStack([]);
      setForwardStack([]);
      setCurrentNode(null);
      setBreadcrumb([]);
      setReset((reset) => !reset);
    }
  };

  const [graphData, setGraphData] = useState<GraphDataWithMetadata>({
    nodes: [],
    links: [],
  });

  // Track the width and height of the canvas container to determine size of canvas
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

  const packageTypesQuery = useQuery(GetPkgTypesDocument, { variables: {} });
  const packageLoading = packageTypesQuery.loading;
  const packageError = packageTypesQuery.error;
  const router = useRouter();

  // Define fetchNodeData function
  const fetchNodeData = (nodeIds: string[]) => {
    const graphData: GraphData = { nodes: [], links: [] };
    nodeIds.forEach((nodeId: string) => {
      GetNodeById(nodeId).then((res) => {
        ParseAndFilterGraph(graphData, ParseNode(res.node));
        setGraphDataWithInitial(graphData);
      });
    });
    setRenderedInitialGraph(true);
  };

  // Use fetchNodeData function where necessary
  if (router.query.path != null && !renderedInitialGraph) {
    const nodeIds = router.query.path.split(",");
    fetchNodeData(nodeIds);
  }

  // helper function to fetch data related to the node and update the graph
  const fetchAndSetGraphData = (nodeId: string) => {
    // Fetch data for the given nodeId
    DataFetcher(nodeId).then((res) => {
      const graphData: GraphData = { nodes: [], links: [] };
      // Parse and filter the graph data
      res.forEach((n) => {
        ParseAndFilterGraph(graphData, ParseNode(n));
      });
      setGraphDataWithInitial(graphData);
    });
  };

  let packageTypes = INITIAL_PACKAGE_NAMESPACES;

  let packageData = packageTypesQuery.data?.packages;
  let sortablePackageData = [...(packageData ?? [])];
  packageTypes = sortablePackageData
    .sort((a, b) => a.type.localeCompare(b.type))
    .map((t) => ({ label: t.type, value: t.type }));

  if (router.query.path != null && !renderedInitialGraph) {
    const nodeIds = router.query.path.split(",");

    const graphData: GraphData = { nodes: [], links: [] };
    nodeIds.forEach((nodeId: string) => {
      GetNodeById(nodeId).then((res) => {
        ParseAndFilterGraph(graphData, ParseNode(res.node));

        // Here is where you set the initial state
        setPackageGraphData(graphData);

        setGraphDataWithInitial(graphData);
      });
    });
    setRenderedInitialGraph(true);
  }

  const handleNodeClick = (node) => {
    if (currentNode) {
      setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
      setForwardStack([]);
    }
    if (!firstNode) {
      setFirstNode(node);
    }
    setCurrentNode(node);

    let nodeName = node.label || "Unnamed Node";
    const count = breadcrumb.filter(
      (name) => name.split("[")[0] === nodeName
    ).length;

    if (count > 0) {
      nodeName = `${nodeName}[${count + 1}]`;
    }

    setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, nodeName]);

    // Fetch and set the graph data for the clicked node
    fetchAndSetGraphData(node.id);
  };

  const handleBackClick = () => {
    if (backStack.length === 0) return;

    const newNode = backStack[backStack.length - 1];
    const newBackStack = backStack.slice(0, backStack.length - 1);

    setForwardStack((prevForwardStack) => [currentNode, ...prevForwardStack]);
    setCurrentNode(newNode);
    setBackStack(newBackStack);

    setBreadcrumb((prevBreadcrumb) =>
      prevBreadcrumb.slice(0, prevBreadcrumb.length - 1)
    );

    // Fetch and set the graph data for the new current node
    fetchAndSetGraphData(newNode.id);
  };

  const handleForwardClick = () => {
    if (forwardStack.length === 0) return;

    const newNode = forwardStack[0];
    const newForwardStack = forwardStack.slice(1);

    setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
    setCurrentNode(newNode);
    setForwardStack(newForwardStack);

    let nodeName = newNode.label || "Unnamed Node";
    const count = breadcrumb.filter(
      (name) => name.split("[")[0] === nodeName
    ).length;

    if (count > 0) {
      nodeName = `${nodeName}[${count + 1}]`;
    }

    setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, nodeName]);

    // Fetch and set the graph data for the new current node
    fetchAndSetGraphData(newNode.id);
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
      nodeIds.forEach((nodeId: string) => {
        GetNodeById(nodeId).then((res) => {
          ParseAndFilterGraph(graphData, ParseNode(res.node));
          setGraphDataWithInitial(graphData);
        });
      });
      setRenderedInitialGraph(true);
    }
  }

  return (
    <>
      <main className="h-full flex flex-col items-center p-12">
        <PackageSelector
          packageTypes={packageTypes}
          setGraphData={setGraphDataWithInitial}
          resetTypeFunc={resetGraph}
        />
        <div className="flex flex-wrap py-5 px-4">
          <Breadcrumb
            breadcrumb={breadcrumb}
            handleNodeClick={handleNodeClick}
          />
        </div>
        <div className="mt-8 grid grid-cols-none grid-rows-4 lg:grid-rows-none lg:grid-cols-4 h-full w-full gap-8 lg:gap-4">
          <div className="flex flex-col font-mono text-sm p-4 row-span-1 lg:col-span-1">
            <div className="my-5 text-lg">Highlight Nodes</div>
            <p className="mb-5 py-3">
              Tip: Use click and scroll to adjust graph
            </p>
            <div className="flex flex-col justify-center gap-y-2 w-full">
              <Toggle
                label="Artifacts"
                toggled={artifact}
                onClick={() => handleHighlightToggle("highlightArtifact")}
              />
              <Toggle
                label="Vulnerabilities"
                toggled={vuln}
                onClick={() => handleHighlightToggle("highlightVuln")}
              />
              <Toggle
                label="SBOM"
                toggled={sbom}
                onClick={() => handleHighlightToggle("highlightSbom")}
              />
              <Toggle
                label="Builder"
                toggled={builder}
                onClick={() => handleHighlightToggle("highlightBuilder")}
              />
            </div>
            <div className="py-10 my-5 flex space-x-3">
              <button
                type="button"
                className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
                  backStack.length === 0
                    ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
                    : "bg-slate-700 text-white"
                }`}
                title="Go back to previous visualization"
                onClick={handleBackClick}
                disabled={backStack.length === 0}
              >
                Back
              </button>
              <button
                type="button"
                className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
                  forwardStack.length === 0
                    ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
                    : "bg-slate-700 text-white"
                }`}
                title="Go forward to next visualization"
                onClick={handleForwardClick}
                disabled={forwardStack.length === 0}
              >
                Forward
              </button>
              <button
                type="button"
                className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
                  breadcrumb.length === 0
                    ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
                    : "bg-slate-700 text-white"
                }`}
                title="Reset visualization"
                onClick={resetGraph}
                disabled={breadcrumb.length === 0}
              >
                Reset
              </button>
            </div>
          </div>
          <div
            className="lg:col-span-3 row-span-3 h-full w-full"
            ref={containerRef}
          >
            <Graph
              graphData={graphData}
              onNodeClick={handleNodeClick}
              options={highlightState}
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
