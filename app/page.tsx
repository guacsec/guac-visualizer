"use client";

import React, { useState } from "react";
import Graph from "@/components/graph/Graph";
import { HighlightToggles } from "@/components/highlightToggles";
import { useGraphData } from "@/hooks/useGraphData";
import { usePackageData } from "@/hooks/usePackageData";
import PackageSelector from "@/components/packages/packageSelector";
import { Breadcrumb } from "@/components/breadcrumb";
import { NavigationButtons } from "@/components/navigationButton";
import { useBreadcrumbNavigation } from "@/hooks/useBreadcrumbNavigation";
import QueryVuln from "@/components/queryvuln/queryVuln";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/client";
import { useDimensions } from "@/hooks/useDimensions";

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

  const {
    breadcrumb,
    backStack,
    currentIndex,
    userInteractedWithPath,
    handleBreadcrumbClick,
    handleNodeClick,
    handleBackClick,
    handleForwardClick,
    reset,
  } = useBreadcrumbNavigation(
    fetchAndSetGraphData,
    initialGraphData,
    setGraphData
  );

  const { packageTypes, packageLoading, packageError } = usePackageData();

  const { containerWidth, containerHeight } = useDimensions();

  return (
    <div>
      <ApolloProvider client={client}>
        <main className="h-full w-screen md:w-auto flex flex-col items-center p-12">
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
          {graphData.nodes.length !== 0 && graphData.links.length !== 0 && (
            <NavigationButtons
              backStack={backStack}
              breadcrumb={breadcrumb}
              currentIndex={currentIndex}
              handleBackClick={handleBackClick}
              handleForwardClick={handleForwardClick}
              reset={reset}
              userInteractedWithPath={userInteractedWithPath}
            />
          )}
          <div className="mt-8 grid grid-cols-none grid-rows-4 lg:grid-rows-none lg:grid-cols-4 h-full gap-8 lg:gap-4">
            <div className="flex flex-col text-sm p-4 row-span-1 lg:col-span-1">
              <p className="pb-5 pt-3 opacity-70">
                <span className="font-bold uppercase">Tip:</span> Use click and
                scroll to adjust graph. <br />
                Right clicking a node displays more information.
              </p>
              <h1 className="my-5 text-lg">Highlight Nodes</h1>
              <div className="flex flex-col justify-start gap-y-2 w-full">
                <div>
                  <HighlightToggles
                    highlights={highlights}
                    setHighlights={setHighlights}
                  />
                </div>
                <div>
                  <QueryVuln />
                </div>
              </div>
            </div>

            <div className="col-span-3 row-span-3 h-full md:w-3/4 lg:w-4/5">
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
                  width: containerWidth,
                  height: containerHeight,
                }}
              />
              <Breadcrumb
                breadcrumb={breadcrumb.map((item) => item.label)}
                handleNodeClick={handleBreadcrumbClick}
                currentIndex={currentIndex}
              />
            </div>
          </div>
        </main>
      </ApolloProvider>
    </div>
  );
}
