import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client";
import client from "@/apollo/client";
import {
  NeighborsDocument,
  NeighborsQuery,
  PackageTypesDocument,
  PackageTypesQuery,
} from "@/gql/__generated__/graphql";
import { fetchNeighbors, parseAndFilterGraph } from "@/app/graph_queries";
import { ParseNode } from "@/app/ggraph";
import { useRouter } from "next/router";
import React from "react";
import Graph from "@/components/graph/Graph";
import { GraphDataWithMetadata } from "@/components/graph/types";
import PackageSelector, {
  INITIAL_PACKAGE_NAMESPACES,
} from "@/components/guac/packageSelector";
import { NodeFragment } from "@/gql/types/nodeFragment";
import { Breadcrumb } from "@/components/breadcrumbs";
import {
  fetchAndParseNodes,
  generateGraphDataFromNodes,
} from "@/utils/graphDataHelpers";
import { HighlightToggles } from "@/utils/highlightToggles";
import { NavigationButtons } from "@/components/navigationButtons";

export default function Home() {
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const [highlights, setHighlights] = useState({
    artifact: false,
    vuln: false,
    sbom: false,
    builder: false,
  });

  const [firstNode, setFirstNode] = useState(null);
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  const [packageTypes, setPackageTypes] = useState(INITIAL_PACKAGE_NAMESPACES);
  const [packageLoading, setPackageLoading] = useState(true);
  const [packageError, setPackageError] = useState(null);

  const [initialGraphData, setInitialGraphData] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState<{ label: string; id: string }[]>(
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const handleBreadcrumbClick = (nodeIndex: number) => {
    setCurrentIndex(nodeIndex);
    const node = breadcrumb[nodeIndex];
    fetchAndSetGraphData(node.id);
  };

  const setGraphDataWithInitial = (data: GraphDataWithMetadata) => {
    setGraphData(data);
    if (!initialGraphData) {
      setInitialGraphData(data);
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

  useEffect(() => {
    setPackageLoading(true);
    client
      .query({
        query: PackageTypesDocument,
        variables: { filter: {} },
      })
      .then((res) => {
        let packageData = res.data.packages;
        let sortablePackageData = [...(packageData ?? [])];
        const types = sortablePackageData
          .sort((a, b) => a.type.localeCompare(b.type))
          .map((t) => ({ label: t.type, value: t.type }));
        setPackageTypes(types);
        setPackageLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching package types:", error);
        setPackageError(error);
        setPackageLoading(false);
      });
  }, []);

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
          console.error(error);
        });
    }
  }, [packageError, packageLoading, router.query.path, renderedInitialGraph]);

  const fetchAndSetGraphData = (id: string | number) => {
    fetchNeighbors(id.toString()).then((res: NeighborsQuery["neighbors"]) => {
      const graphData: GraphDataWithMetadata = { nodes: [], links: [] };
      res.forEach((n) => {
        let node = n as NodeFragment;
        parseAndFilterGraph(graphData, ParseNode(node));
      });
      setGraphData(graphData);
    });
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

  const handleNodeClick = useCallback(
    (node) => {
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
        (item) => item.label.split("[")[0] === nodeName
      ).length;

      if (count > 0) {
        nodeName = `${nodeName}[${count + 1}]`;
      }

      setBreadcrumb((prevBreadcrumb) => {
        const newBreadcrumb = [
          ...prevBreadcrumb.slice(0, currentIndex + 1),
          { label: nodeName, id: node.id },
        ];
        setCurrentIndex(newBreadcrumb.length - 1);
        return newBreadcrumb;
      });

      fetchAndSetGraphData(node.id);
    },
    [currentNode, breadcrumb, firstNode]
  );

  const handleBackClick = () => {
    if (currentIndex <= 0) return;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    const node = breadcrumb[newIndex];

    fetchAndSetGraphData(node.id);
  };

  const handleForwardClick = () => {
    if (currentIndex >= breadcrumb.length - 1) return;

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    const node = breadcrumb[newIndex];

    fetchAndSetGraphData(node.id);
  };

  return (
    <>
      <main className="h-full flex flex-col items-center p-12">
        {packageLoading ? (
          <div>Loading package types...</div>
        ) : packageError ? (
          <div>Error loading package types!</div>
        ) : (
          <PackageSelector
            packageTypes={packageTypes}
            setGraphData={setGraphDataWithInitial}
            resetTypeFunc={reset}
          />
        )}
        <Breadcrumb
          breadcrumb={breadcrumb.map((item) => item.label)}
          handleNodeClick={handleBreadcrumbClick}
        />
        <div className="mt-8 grid grid-cols-none grid-rows-4 lg:grid-rows-none lg:grid-cols-4 h-full w-full gap-8 lg:gap-4">
          <div className="flex flex-col font-mono text-sm p-4 row-span-1 lg:col-span-1">
            <div className="my-5 text-lg">Highlight Nodes</div>
            <p className="pb-5 pt-3 opacity-70">
              <span className="font-bold uppercase">Tip:</span> Use click and
              scroll to adjust graph. <br />
              Right clicking a node displays more information.
            </p>
            <div className="flex flex-col justify-center gap-y-2 w-full">
              <HighlightToggles
                highlights={highlights}
                setHighlights={setHighlights}
              />
            </div>
            <div className="py-10 my-5 flex space-x-3">
              <NavigationButtons
                backStack={backStack}
                breadcrumb={breadcrumb}
                currentIndex={currentIndex}
                handleBackClick={handleBackClick}
                handleForwardClick={handleForwardClick}
                reset={reset}
              />
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
                highlightArtifact: highlights.artifact,
                highlightVuln: highlights.vuln,
                highlightSbom: highlights.sbom,
                highlightBuilder: highlights.builder,
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
