"use client";

import React, { useState, useEffect, useCallback } from "react";
import Graph from "@/components/graph/Graph";
import { HighlightToggles } from "@/components/highlightToggles";
import { useGraphData } from "@/hooks/useGraphData";
import { useContainerSize } from "@/hooks/useContainerSize";
import { usePackageData } from "@/hooks/usePackageData";
import PackageSelector from "@/components/packages/packageSelector";
import { NodeFragment } from "@/gql/types/nodeFragment";

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

  const { containerRef, size } = useContainerSize();

  const handleNodeClick = useCallback((node: NodeFragment) => {
    setCurrentNodeId(node.id);
  }, []);

  useEffect(() => {
    if (currentNodeId !== null) {
      fetchAndSetGraphData(currentNodeId);
    }
  }, [currentNodeId]);

  const reset = () => {
    if (initialGraphData) {
      setGraphData(initialGraphData);
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
        </div>
      </main>
    </>
  );
}
