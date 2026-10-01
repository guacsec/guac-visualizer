import type { GraphDataWithMetadata } from "@/components/graph/types";
import type { GuacGraphData } from "@/utils/ggraph";

export const linkKey = (link: any) =>
  `${link.source}-${link.target}-${link.label}`;

/*
 Every caller feeds this one parsed node at a time in a loop, and it used to
 rebuild both dedup sets from the whole accumulated graph on each call -- O(n^2)
 over thousands of nodes, which froze the tab on its own, before the fetch size
 was even in play. The sets are cached against the graphData object instead.
 Anything pushing into graphData.nodes or .links outside this function will be
 invisible to that cache; no caller does.

 Lives apart from graph_queries.ts only so the self-check beside it can import
 it with bare `node` -- it deliberately pulls in nothing but types.
*/
const dedupState = new WeakMap<
  GraphDataWithMetadata,
  { nodeIds: Set<any>; linkKeys: Set<string> }
>();

function dedupFor(graphData: GraphDataWithMetadata) {
  let state = dedupState.get(graphData);
  if (!state) {
    state = {
      nodeIds: new Set(graphData.nodes.map((node) => node.id)),
      linkKeys: new Set(graphData.links.map(linkKey)),
    };
    dedupState.set(graphData, state);
  }
  return state;
}

export function parseAndFilterGraph(
  graphData: GraphDataWithMetadata,
  parsedNode: GuacGraphData | undefined
) {
  // ParseNode returns undefined by design for any __typename its switch does not
  // cover -- currently HasMetadata, PointOfContact and VulnerabilityMetadata. Its
  // signature says so, but strictNullChecks is off, so every caller happily passed
  // the undefined straight through to `.nodes` and threw. Guarding here rather
  // than at each call site: every caller funnels through this one function.
  if (!parsedNode) {
    return;
  }

  const { nodeIds, linkKeys } = dedupFor(graphData);

  parsedNode.nodes.forEach((node) => {
    if (nodeIds.has(node.data.id)) {
      return;
    }
    nodeIds.add(node.data.id);
    graphData.nodes.push(node.data);
  });

  parsedNode.edges.forEach((edge) => {
    // was linkKey(edge.data.id): an id string has no source/target/label, so
    // every key came out "undefined-undefined-undefined", matched nothing in
    // the set, and no edge was ever deduped.
    const key = linkKey(edge.data);
    if (linkKeys.has(key)) {
      return;
    }
    linkKeys.add(key);
    graphData.links.push(edge.data);
  });
}
