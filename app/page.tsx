"use client";

import React, { useState, useEffect, useCallback } from "react";
import Graph from "@/components/graph/Graph";
import { HighlightToggles } from "@/components/highlightToggles";
import { useGraphData } from "@/hooks/useGraphData";
import { useContainerSize } from "@/hooks/useContainerSize";
import { usePackageData } from "@/hooks/usePackageData";
import PackageSelector from "@/components/packages/packageSelector";
import { Breadcrumb } from "@/components/breadcrumb";
import { NavigationButtons } from "@/components/navigationButton";

export default function Home() {
  const [highlights, setHighlights] = useState({
    artifact: false,
    vuln: false,
    sbom: false,
    builder: false,
  });

  const {
    graphData,
    setGraphData,
    initialGraphData,
    fetchAndSetGraphData,
    setGraphDataWithInitial,
  } = useGraphData();

  const { packageTypes, packageLoading, packageError } = usePackageData();
  const [currentNodeId, setCurrentNodeId] = useState(null);

  const [breadcrumb, setBreadcrumb] = useState<{ label: string; id: string }[]>(
    []
  );
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstNode, setFirstNode] = useState(null);
  const [userInteractedWithPath, setUserInteractedWithPath] = useState(false);

  const { containerRef, size } = useContainerSize();

  useEffect(() => {
    if (currentNodeId !== null) {
      fetchAndSetGraphData(currentNodeId);
    }
  }, [currentNodeId]);

  const handleBreadcrumbClick = (nodeIndex: number) => {
    const newBackStack = breadcrumb.slice(0, nodeIndex);
    const newForwardStack = breadcrumb.slice(nodeIndex + 1);

    setBackStack(newBackStack);
    setForwardStack(newForwardStack);
    setCurrentNode(breadcrumb[nodeIndex]);
    setCurrentIndex(nodeIndex);

    fetchAndSetGraphData(breadcrumb[nodeIndex].id);
  };

  const handleNodeClick = useCallback(
    (node) => {
      setUserInteractedWithPath(true);

      if (currentNode) {
        setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
      }
      setForwardStack([]);

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
    if (currentIndex === 0 || backStack.length === 0) return;

    const newForwardStack = [currentNode, ...forwardStack];
    const newBackStack = [...backStack];
    const lastNode = newBackStack.pop();

    setCurrentNode(lastNode);
    setCurrentIndex(currentIndex - 1);
    setForwardStack(newForwardStack);
    setBackStack(newBackStack);

    fetchAndSetGraphData(lastNode.id);
  };

  const handleForwardClick = () => {
    if (currentIndex >= breadcrumb.length - 1 || forwardStack.length === 0)
      return;

    const newForwardStack = [...forwardStack];
    const nextNode = newForwardStack.shift();
    const newBackStack = [...backStack, currentNode];

    setCurrentNode(nextNode);
    setCurrentIndex(currentIndex + 1);
    setBackStack(newBackStack);
    setForwardStack(newForwardStack);

    fetchAndSetGraphData(nextNode.id);
  };

  const reset = () => {
    if (initialGraphData) {
      setGraphData(initialGraphData);
      setBackStack([]);
      setForwardStack([]);
      setCurrentNode(null);
      setFirstNode(null);
      setBreadcrumb([]);
      setUserInteractedWithPath(false);
    }
  };

  // todo (shaf): fix re-render issue with graphData
  console.log(graphData);

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
          </div>

          <div
            className="lg:col-span-3 row-span-3 h-full w-full"
            ref={containerRef}
          >
            <Breadcrumb
              breadcrumb={breadcrumb.map((item) => item.label)}
              handleNodeClick={handleBreadcrumbClick}
              currentIndex={currentIndex}
            />
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
                width: size.width,
                height: size.height,
              }}
            />
          </div>
          <NavigationButtons
            backStack={backStack}
            breadcrumb={breadcrumb}
            currentIndex={currentIndex}
            handleBackClick={handleBackClick}
            handleForwardClick={handleForwardClick}
            reset={reset}
            userInteractedWithPath={userInteractedWithPath}
          />
        </div>
      </main>
    </>
  );
}
