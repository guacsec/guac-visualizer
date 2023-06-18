import { useState, useEffect, useRef } from "react";
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
import React from "react";
import Graph from "@/components/graph/Graph";
import { GraphData } from "react-force-graph-2d";
import PackageSelector, {
  INITIAL_PACKAGE_NAMESPACES,
} from "@/components/guac/packageSelector";

export default function Home() {
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const packageSelectorRef = useRef();

  const [highlightArtifact, setHighlightArtifact] = useState(false);
  const [highlightVuln, setHighlightVuln] = useState(false);
  const [highlightSbom, setHighlightSbom] = useState(false);
  const [highlightBuilder, setHighlightBuilder] = useState(false);

  const [firstNode, setFirstNode] = useState(null);
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [reset, setReset] = useState(false);

  const [packageGraphData, setPackageGraphData] = useState<GraphData>(null);

  const [initialGraphData, setInitialGraphData] = useState(null);

  const setGraphDataWithInitial = (data: GraphData) => {
    setGraphData(data);
    if (!initialGraphData) {
      setInitialGraphData(data);
    }
  };

  const resetGraph = () => {
    console.log("clicked");
    if (initialGraphData) {
      setGraphData(initialGraphData);
      setBackStack([]);
      setForwardStack([]);
      setCurrentNode(null);
      setBreadcrumb([]);
      setReset((reset) => !reset);
    }
  };

  const [graphData, setGraphData] = useState<GraphData>({
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

  // handler for node click events
  // if a current node exists, add it to the back stack
  // clear the forward stack when a new node is clicked
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

  // handler for the 'Back' button click event
  // updates the back and forward stacks, sets the previous node as the current node,
  // and fetches and sets data for the new current node
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

  // handler for the 'Forward' button click event
  // updates the back and forward stacks, sets the next node as the current node,
  // and fetches and sets data for the new current node
  const handleForwardClick = () => {
    if (forwardStack.length === 0) return;

    const newNode = forwardStack[0];
    const newForwardStack = forwardStack.slice(1);

    setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
    setCurrentNode(newNode);
    setForwardStack(newForwardStack);

    let nodeName = newNode.name || "Unnamed Node";
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

        <div className="mt-8 grid grid-cols-none grid-rows-4 lg:grid-rows-none lg:grid-cols-4 h-full w-full gap-8 lg:gap-4">
          <div className="flex flex-col font-mono text-sm p-4 row-span-1 lg:col-span-1">
            <div className="my-5 text-lg">Highlight Nodes</div>
            <p className="py-2">Tip: Use click and scroll to adjust graph</p>
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
            <div className="py-10 my-5 flex space-x-3">
              <button
                type="button"
                className="rounded bg-slate-700 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                title="Go back to previous visualization"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                type="button"
                className="rounded bg-slate-700 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                title="Go forward to next visualization"
                onClick={handleForwardClick}
              >
                Forward
              </button>
              <button
                type="button"
                className="rounded bg-slate-700 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                title="Reset visualization"
                onClick={resetGraph}
              >
                Reset
              </button>
            </div>
            <div className="py-2">Path: {breadcrumb.join(" > ")}</div>
          </div>
          <div
            className="lg:col-span-3 row-span-3 h-full w-full"
            ref={containerRef}
          >
            <Graph
              graphData={graphData}
              onNodeClick={handleNodeClick}
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
