/**
 * Self-check for graph dedup. Plain node, no framework:
 *
 *   node utils/graphDedup.check.mjs
 *
 * Fails if:
 *   1. a node or edge already in the graph gets pushed a second time,
 *   2. edge dedup keys off the wrong thing (the old bug: linkKey(edge.data.id)
 *      built "undefined-undefined-undefined" for every edge, so duplicate edges
 *      piled up unnoticed),
 *   3. a distinct edge between the same pair is wrongly swallowed,
 *   4. dedup goes quadratic again -- the sets used to be rebuilt from the whole
 *      accumulated graph on every call, which is what froze the tab on dense
 *      nodes long before anything drew.
 */
import assert from "node:assert/strict";
import { parseAndFilterGraph } from "./graphDedup.ts";

const parsed = (nodes, edges) => ({
  nodes: nodes.map((id) => ({ data: { id, label: id, type: "Package" } })),
  edges: edges.map(([source, target, label]) => ({
    data: { source, target, label },
  })),
});

// 1 + 2: the same subgraph twice lands once
const g = { nodes: [], links: [] };
parseAndFilterGraph(g, parsed(["a", "b"], [["a", "b", "depends on"]]));
parseAndFilterGraph(g, parsed(["a", "b"], [["a", "b", "depends on"]]));
assert.deepEqual(
  g.nodes.map((n) => n.id),
  ["a", "b"],
  "duplicate nodes were pushed twice"
);
assert.equal(g.links.length, 1, "duplicate edge was pushed twice");

// 3: same pair, different label is a different edge
parseAndFilterGraph(g, parsed(["a", "b"], [["a", "b", "IsDependency_subject"]]));
assert.equal(g.links.length, 2, "a distinct edge label was swallowed");

// undefined parsed node (ParseNode's documented gap) is a no-op, not a throw
parseAndFilterGraph(g, undefined);
assert.equal(g.nodes.length, 2);

// 4: 4x the input must not cost ~16x the time. Timing is noisy, so the bar is
// loose -- the quadratic version was ~2 orders of magnitude over at this size.
const build = (count) => {
  const graph = { nodes: [], links: [] };
  const started = process.hrtime.bigint();
  for (let i = 0; i < count; i++) {
    parseAndFilterGraph(
      graph,
      parsed([`p${i}`, `q${i}`], [[`p${i}`, `q${i}`, "depends on"]])
    );
  }
  assert.equal(graph.nodes.length, count * 2);
  assert.equal(graph.links.length, count);
  return Number(process.hrtime.bigint() - started) / 1e6;
};

build(500); // warm up, so JIT noise does not land on the measured runs
const small = Math.max(build(2000), 0.5);
const large = build(8000);
assert.ok(
  large < small * 8,
  `dedup looks superlinear: 2000 nodes took ${small.toFixed(1)}ms, 8000 took ${large.toFixed(1)}ms`
);

console.log(
  `graphDedup ok (2000: ${small.toFixed(1)}ms, 8000: ${large.toFixed(1)}ms)`
);
