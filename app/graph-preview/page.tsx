"use client";

/**
 * Dev harness for the graph's visual language. Seeing the graph otherwise needs a
 * live GUAC backend, so this mounts the real <Graph/> against hand-written data
 * covering all five families and every node type.
 *
 * DO NOT add `if (process.env.NODE_ENV === "production") return null;` here. Next
 * statically evaluates that and eliminates the entire client chunk: the page
 * server-renders (the legend appears) but the ssr:false dynamic ForceGraph2D never
 * mounts, so the canvas is silently blank and the route's page.js 404s.
 */

import { useState } from "react";
import Graph from "@/components/graph/Graph";
import GraphLegend from "@/components/graph/GraphLegend";
import { GraphDataWithMetadata } from "@/components/graph/types";

const node = (id: string, type: string, label: string) => ({ id, type, label });
const link = (source: string, target: string) => ({ source, target, label: "" });

/** Every one of the 27 types utils/ggraph.tsx can emit. */
const FULL: GraphDataWithMetadata = {
  nodes: [
    node("pkgType", "PackageType", "golang"),
    node("pkgNs", "PackageNamespace", "github.com/guacsec"),
    node("pkgName", "PackageName", "guac"),
    node("pkgVersion", "PackageVersion", "v0.8.1"),
    node("isDependency", "IsDependency", "depends on"),
    node("hasSbom", "HasSbom", "sbom"),
    node("pkgEqual", "PkgEqual", "same package"),

    node("srcType", "SourceType", "git"),
    node("srcNs", "SourceNamespace", "github.com/guacsec"),
    node("srcName", "SourceName", "guac"),
    node("hasSourceAt", "HasSourceAt", "source at"),
    node("scorecard", "CertifyScorecard", "scorecard 7.4"),

    node("artifact", "Artifact", "sha256:9f2ab1c4"),
    node("builder", "Builder", "github-actions"),
    node("isOccurrence", "IsOccurrence", "occurrence"),
    node("hasSlsa", "HasSlsa", "slsa L3"),
    node("hashEqual", "HashEqual", "same hash"),

    node("vuln", "Vulnerability", "osv"),
    node("vulnId", "VulnerabilityID", "CVE-2024-24786"),
    node("certifyVuln", "CertifyVuln", "scanned"),
    node("vulnEqual", "VulnEqual", "same vuln"),
    node("vulnMetadata", "VulnerabilityMetadata", "cvss 9.8"),
    node("vex", "CertifyVexStatement", "not affected"),
    node("certifyBad", "CertifyBad", "bad"),

    node("license", "License", "Apache-2.0"),
    node("certifyGood", "CertifyGood", "good"),
    node("certifyLegal", "CertifyLegal", "legal"),
  ],
  links: [
    link("pkgType", "pkgNs"),
    link("pkgNs", "pkgName"),
    link("pkgName", "pkgVersion"),
    link("pkgVersion", "isDependency"),
    link("isDependency", "pkgName"),
    link("pkgVersion", "hasSbom"),
    link("pkgVersion", "pkgEqual"),

    link("srcType", "srcNs"),
    link("srcNs", "srcName"),
    link("pkgName", "hasSourceAt"),
    link("hasSourceAt", "srcName"),
    link("srcName", "scorecard"),

    link("pkgVersion", "isOccurrence"),
    link("isOccurrence", "artifact"),
    link("artifact", "hasSlsa"),
    link("hasSlsa", "builder"),
    link("artifact", "hashEqual"),

    link("pkgVersion", "certifyVuln"),
    link("certifyVuln", "vulnId"),
    link("vuln", "vulnId"),
    link("vulnId", "vulnEqual"),
    link("vulnId", "vulnMetadata"),
    link("pkgVersion", "vex"),
    link("vex", "vulnId"),
    link("pkgVersion", "certifyBad"),

    link("pkgVersion", "certifyGood"),
    link("pkgVersion", "certifyLegal"),
    link("certifyLegal", "license"),
  ],
};

/** The label-scaling and zoom-cap bugs only show up on a graph this small. */
const SMALL: GraphDataWithMetadata = {
  nodes: [
    node("pkgName", "PackageName", "guac"),
    node("pkgVersion", "PackageVersion", "v0.8.1"),
    node("isOccurrence", "IsOccurrence", "occurrence"),
    node("artifact", "Artifact", "sha256:9f2ab1c4"),
  ],
  links: [
    link("pkgName", "pkgVersion"),
    link("pkgVersion", "isOccurrence"),
    link("isOccurrence", "artifact"),
  ],
};

export default function GraphPreviewPage() {
  const [small, setSmall] = useState(false);
  const [focusTypes, setFocusTypes] = useState<Set<string> | null>(null);
  const graphData = small ? SMALL : FULL;

  const toggleType = (type: string) =>
    setFocusTypes((prev) => {
      const next = new Set(prev ?? []);
      next.has(type) ? next.delete(type) : next.add(type);
      return next.size === 0 ? null : next;
    });

  return (
    <main className="flex h-full flex-col gap-y-4 p-6">
      <div>
        <h1 className="text-xl">Graph preview</h1>
        <p className="text-sm opacity-70">
          Dev harness -- no GUAC backend required.
        </p>
      </div>

      <label className="flex shrink-0 items-center gap-x-2 text-sm">
        <input
          type="checkbox"
          checked={small}
          onChange={(event) => setSmall(event.target.checked)}
        />
        Small graph ({SMALL.nodes.length} nodes)
      </label>

      <div className="flex flex-col items-start gap-x-6 lg:flex-row">
        <Graph
          key={small ? "small" : "full"}
          graphData={graphData}
          onNodeClick={(node) => console.log("node click", node)}
          focusTypes={focusTypes}
          containerOptions={{ width: 900, height: 620 }}
        />
        <div className="w-72 shrink-0">
          <GraphLegend
            graphData={graphData}
            focusTypes={focusTypes}
            onToggleType={toggleType}
            onClearFocus={() => setFocusTypes(null)}
          />
        </div>
      </div>
    </main>
  );
}
