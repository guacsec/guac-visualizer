import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  GetNeighborsQuery,
  GetPkgTypesDocument,
} from "@/gql/__generated__/graphql";
import { fetchNeighbors, parseAndFilterGraph } from "@/app/graph_queries";
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
import { Breadcrumb } from "@/components/breadcrumbs/breadcrumbs";
import {
  fetchAndParseNodes,
  generateGraphDataFromNodes,
} from "@/utils/graphDataHelpers";

export default function Home() {
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [highlightArtifact, setHighlightArtifact] = useState(false);
  const [highlightVuln, setHighlightVuln] = useState(false);
  const [highlightSbom, setHighlightSbom] = useState(false);
  const [highlightBuilder, setHighlightBuilder] = useState(false);

  const [firstNode, setFirstNode] = useState(null);
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  const [initialGraphData, setInitialGraphData] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const router = useRouter();

  const handleBreadcrumbClick = (nodeIndex: number) => {
    const node = backStack[nodeIndex];

    setBackStack((prevBackStack) => prevBackStack.slice(0, nodeIndex));
    setForwardStack((prevForwardStack) => [
      currentNode,
      ...prevForwardStack,
      ...backStack.slice(nodeIndex + 1),
    ]);
    setCurrentNode(node);

    // Truncate the breadcrumb array to the clicked node
    setBreadcrumb((prevBreadcrumb) => prevBreadcrumb.slice(0, nodeIndex + 1));

    fetchAndSetGraphData(node.id);
  };

  const setGraphDataWithInitial = (data: GraphDataWithMetadata) => {
    setGraphData(data);
    if (!initialGraphData) {
      setInitialGraphData(data);
    }
  };

  const reset = () => {
    if (initialGraphData) {
      setGraphData(initialGraphData);
      setBackStack([]);
      setForwardStack([]);
      setCurrentNode(null);
      setFirstNode(null);
      setBreadcrumb([]);
    }
  };

  const [graphData, setGraphData] = useState<GraphDataWithMetadata>({
    nodes: [],
    links: [],
  });

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

  useEffect(() => {
    if (packageError || packageLoading) {
      return;
    }
    if (router.query.path != null && !renderedInitialGraph) {
      const path = router.query.path as string;
      const nodeIds = path.split(",");

      fetchAndParseNodes(nodeIds)
        .then((nodes) =>
          nodes.map((node) => ParseNode(node.node as NodeFragment))
        )
        .then(generateGraphDataFromNodes)
        .then((graphData) => {
          setTimeout(() => {
            setGraphData(graphData);
            setRenderedInitialGraph(true);
          }, 0);
        })
        .catch((error) => {
          // handle error here, maybe set some state variable to show an error message
          console.error(error);
        });
    }
  }, [packageError, packageLoading, router.query.path, renderedInitialGraph]);

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

  const fetchAndSetGraphData = (id: string | number) => {
    fetchNeighbors(id.toString()).then(
      (res: GetNeighborsQuery["neighbors"]) => {
        const graphData: GraphDataWithMetadata = { nodes: [], links: [] };
        res.forEach((n) => {
          let node = n as NodeFragment;
          parseAndFilterGraph(graphData, ParseNode(node));
        });
        setGraphData(graphData);
      }
    );
  };

  let packageTypes = INITIAL_PACKAGE_NAMESPACES;

  const handleNodeClick = (node) => {
    if (!firstNode) {
      setFirstNode(node);
    }

    if (currentNode) {
      setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
      setForwardStack([]);
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

    fetchAndSetGraphData(node.id);
  };

  const handleBackClick = () => {
    if (backStack.length === 0) return;

    const newNode = backStack[backStack.length - 1];
    const newBackStack = backStack.slice(0, backStack.length - 1);

    setForwardStack((prevForwardStack) => [currentNode, ...prevForwardStack]);
    setCurrentNode(newNode);
    setBackStack(newBackStack);

    setBreadcrumb((prevBreadcrumb) => {
      const newBreadcrumb = [...prevBreadcrumb];
      newBreadcrumb.pop();
      return newBreadcrumb;
    });

    fetchAndSetGraphData(newNode.id);
  };

  const handleForwardClick = () => {
    if (forwardStack.length === 0) return;

    const newNode = forwardStack[0];
    const newForwardStack = forwardStack.slice(1);

    setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
    setCurrentNode(newNode);
    setForwardStack(newForwardStack);

    // Update breadcrumb
    setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, newNode.label]);

    fetchAndSetGraphData(newNode.id);
  };

  if (!packageError && !packageLoading) {
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
          setGraphData={setGraphDataWithInitial}
          resetTypeFunc={reset}
        />
        <Breadcrumb
          breadcrumb={breadcrumb}
          handleNodeClick={handleBreadcrumbClick}
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
                onClick={reset}
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
