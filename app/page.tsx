"use client";

import React, { useState } from "react";
import Graph from "@/components/graph/Graph";
// import { HighlightToggles } from "@/components/highlightToggles";
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
import { PackageDataProvider } from "@/store/packageDataContext";
import NodeInfo from "@/components/nodeInfo/nodeInfo";
import { VulnResultsProvider } from "@/store/vulnResultsContext";

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
    <div className="flex flex-col lg:flex-row items-center justify-between m-auto">
      <ApolloProvider client={client}>
        <VulnResultsProvider>
          <PackageDataProvider>
            <main className="h-full w-screen md:w-auto flex flex-col p-10">
              {packageLoading ? (
                <div>Loading package types...</div>
              ) : packageError ? (
                <div>Error loading package types!</div>
              ) : (
                <div className="flex flex-col md:flex-row justify-center py-5">
                  <PackageSelector
                    packageTypes={packageTypes}
                    setGraphData={setGraphDataWithInitial}
                    resetTypeFunc={reset}
                  />
                  <div>
                    <QueryVuln />
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row">
                {/* TODO: Fix highlighter, until then keep it commented */}
                {/* <div className="flex flex-col text-sm p-4 row-span-1 lg:col-span-1">
                <p className="pb-5 pt-3 opacity-70">
                  <span className="font-bold uppercase">Tip:</span> Use click
                  and scroll to adjust graph. <br />
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

                </div>
              </div>  */}

                <div className="p-8 lg:p-0">
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
                  {graphData.nodes.length !== 0 &&
                    graphData.links.length !== 0 && (
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
                  <Breadcrumb
                    breadcrumb={breadcrumb.map((item) => item.label)}
                    handleNodeClick={handleBreadcrumbClick}
                    currentIndex={currentIndex}
                  />
                </div>
                <NodeInfo />
              </div>
            </main>
          </PackageDataProvider>
        </VulnResultsProvider>
      </ApolloProvider>
    </div>
  );
}
