"use client";

import React, { useMemo, useState, useEffect, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/client";

import Graph from "@/components/graph/Graph";
import GraphLegend from "@/components/graph/GraphLegend";
import HelpPanel from "@/components/helpPanel";
import { Breadcrumb } from "@/components/breadcrumb";
import { NavigationButtons } from "@/components/navigationButton";
import PackageSelector from "@/components/packages/packageSelector";
import QueryVuln from "@/components/queryvuln/queryVuln";
import NodeInfo from "@/components/nodeInfo/nodeInfo";

import { useGraphData } from "@/hooks/useGraphData";
import { usePackageData } from "@/hooks/usePackageData";
import { useBreadcrumbNavigation } from "@/hooks/useBreadcrumbNavigation";
import { useDimensions } from "@/hooks/useDimensions";
import { useShortcuts, Shortcut } from "@/hooks/useShortcuts";
import { PackageDataProvider } from "@/store/packageDataContext";
import { VulnResultsProvider } from "@/store/vulnResultsContext";

const SEEN_HELP_KEY = "guacviz.seenHelp";

const TOGGLE_CLASS =
  "rounded border border-black/15 dark:border-white/20 px-2.5 py-2 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10";

function HomeContent() {
  const [showLegend, setShowLegend] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  /** null = show everything. A set = only these node types stay bright. */
  const [focusTypes, setFocusTypes] = useState<Set<string> | null>(null);

  const graphRef = React.useRef<any>();

  const {
    graphData,
    notice,
    initialGraphData,
    setGraphData,
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
  const { ref: graphBoxRef, width, height } = useDimensions<HTMLDivElement>();

  const hasGraph = graphData.nodes.length > 0;

  // First visit opens the help panel once. After that it is on demand only.
  useEffect(() => {
    try {
      if (!localStorage.getItem(SEEN_HELP_KEY)) {
        setShowHelp(true);
        localStorage.setItem(SEEN_HELP_KEY, "1");
      }
    } catch {
      // Private mode / blocked storage: just skip the intro.
    }
  }, []);

  const zoomBy = (factor: number) => {
    const fg = graphRef.current;
    if (!fg) return;
    fg.zoom(fg.zoom() * factor, 200);
  };

  const fit = () => graphRef.current?.zoomToFit(400, 60);

  const toggleType = (type: string) =>
    setFocusTypes((prev) => {
      const next = new Set(prev ?? []);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next.size === 0 ? null : next;
    });

  const clearAll = () => {
    setFocusTypes(null);
    setSelectedId(null);
    setShowHelp(false);
  };

  const onNodeClick = (node: any) => {
    setSelectedId(node?.id ?? null);
    handleNodeClick(node);
  };

  const shortcuts: Shortcut[] = useMemo(
    () => [
      { keys: "?", match: ["?"], label: "Open or close this help", run: () => setShowHelp((v) => !v) },
      { keys: "F", match: ["f"], label: "Fit the graph to the view", run: fit },
      { keys: "+", match: ["+", "="], label: "Zoom in", run: () => zoomBy(1.3) },
      { keys: "−", match: ["-"], label: "Zoom out", run: () => zoomBy(1 / 1.3) },
      { keys: "L", match: ["l"], label: "Show or hide the legend", run: () => setShowLegend((v) => !v) },
      { keys: "I", match: ["i"], label: "Show or hide package details", run: () => setShowDetails((v) => !v) },
      { keys: "←", match: ["arrowleft"], label: "Back to the previous node", run: handleBackClick },
      { keys: "→", match: ["arrowright"], label: "Forward again", run: handleForwardClick },
      { keys: "R", match: ["r"], label: "Reset to the starting graph", run: reset },
      { keys: "Esc", match: ["escape"], label: "Clear the filter and close panels", run: clearAll },
    ],
    [handleBackClick, handleForwardClick, reset]
  );

  useShortcuts(shortcuts);

  return (
    <div className="flex h-full flex-col">
      {/* ---- toolbar: everything that starts or steers a query ---- */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3 border-b border-black/10 dark:border-white/10 px-4 py-3">
        {packageLoading ? (
          <span className="text-sm opacity-70">Loading package types…</span>
        ) : packageError ? (
          <span className="text-sm text-red-700 dark:text-red-400">
            Could not reach the GUAC GraphQL server.
          </span>
        ) : (
          <>
            <PackageSelector
              packageTypes={packageTypes}
              setGraphData={setGraphDataWithInitial}
              resetTypeFunc={reset}
            />
            <QueryVuln />
          </>
        )}

        <div className="ml-auto flex items-end gap-x-2">
          {hasGraph && (
            <>
              <NavigationButtons
                backStack={backStack}
                breadcrumb={breadcrumb}
                currentIndex={currentIndex}
                handleBackClick={handleBackClick}
                handleForwardClick={handleForwardClick}
                reset={reset}
                userInteractedWithPath={userInteractedWithPath}
              />
              <button className={TOGGLE_CLASS} onClick={fit} title="Fit graph to view (F)">
                Fit
              </button>
            </>
          )}
          <button
            className={TOGGLE_CLASS}
            onClick={() => setShowLegend((v) => !v)}
            aria-pressed={showLegend}
            title="Show or hide the legend (L)"
          >
            Legend
          </button>
          <button
            className={TOGGLE_CLASS}
            onClick={() => setShowDetails((v) => !v)}
            aria-pressed={showDetails}
            title="Show or hide package details (I)"
          >
            Details
          </button>
          <button
            className={TOGGLE_CLASS}
            onClick={() => setShowHelp(true)}
            title="Help and keyboard shortcuts (?)"
            aria-label="Help and keyboard shortcuts"
          >
            ?
          </button>
        </div>
      </div>

      {breadcrumb.length > 0 && (
        <Breadcrumb
          breadcrumb={breadcrumb.map((item) => item.label)}
          handleNodeClick={handleBreadcrumbClick}
          currentIndex={currentIndex}
        />
      )}

      {/* ---- body: graph fills, rails collapse away ---- */}
      <div className="flex min-h-0 flex-1">
        <div ref={graphBoxRef} className="relative min-w-0 flex-1">
          {width > 0 && (
            <Graph
              graphData={graphData}
              onNodeClick={onNodeClick}
              graphRef={graphRef}
              selectedId={selectedId}
              focusTypes={focusTypes}
              containerOptions={{ width, height }}
            />
          )}
          {notice && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center p-2">
              <p className="rounded bg-amber-100 px-3 py-1.5 text-xs text-amber-900 shadow dark:bg-amber-900 dark:text-amber-100">
                {notice}
              </p>
            </div>
          )}
          {!hasGraph && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-y-2 text-center">
              <p className="text-sm opacity-70">
                Pick a package type above to draw its supply chain.
              </p>
              <p className="text-xs opacity-50">
                Press <kbd className="font-mono">?</kbd> for what the shapes and
                colours mean.
              </p>
            </div>
          )}
        </div>

        {(showLegend || showDetails) && (
          <aside className="w-80 shrink-0 overflow-y-auto border-l border-black/10 dark:border-white/10">
            {showLegend && hasGraph && (
              <div className="border-b border-black/10 dark:border-white/10 p-4">
                <GraphLegend
                  graphData={graphData}
                  focusTypes={focusTypes}
                  onToggleType={toggleType}
                  onClearFocus={() => setFocusTypes(null)}
                />
              </div>
            )}
            {showDetails && <NodeInfo />}
          </aside>
        )}
      </div>

      {showHelp && (
        <HelpPanel shortcuts={shortcuts} onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-sm opacity-70">Loading…</div>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <VulnResultsProvider>
        <PackageDataProvider>
          <Suspense fallback={<LoadingFallback />}>
            <HomeContent />
          </Suspense>
        </PackageDataProvider>
      </VulnResultsProvider>
    </ApolloProvider>
  );
}
