import gql from "graphql-tag";
import client from "@/apollo/client";
import { NodeDocument, NodesDocument } from "@/gql/__generated__/graphql";

/*
 A dense node can have a lot of neighbors -- the node:latest SBOM in the demo
 data has 92k -- and the generated Neighbors query pulls a full tree for every
 one of them: 90MB of JSON for a single click, which hangs the tab long before
 anything draws. So expansion runs as two cheap steps instead: ask for neighbor
 ids only (5MB worst case), then fetch full trees for a bounded slice of them
 (205KB at the cap below).

 ponytail: a fixed cap, because neighborsList -- the server-side paginated
 variant -- answers "not implemented: NeighborsList" on the keyvalue backend.
 Swap this for real pagination when that lands, and the cap can go.
*/
export const NEIGHBOR_CAP = 1500;

// Node is a union, so reaching `id` needs an inline fragment per member.
const NeighborIdsDocument = gql`
  query NeighborIds($node: ID!, $usingOnly: [Edge!]!) {
    neighbors(node: $node, usingOnly: $usingOnly) {
      __typename
      ... on Package { id }
      ... on Source { id }
      ... on Artifact { id }
      ... on Builder { id }
      ... on Vulnerability { id }
      ... on IsOccurrence { id }
      ... on IsDependency { id }
      ... on VulnEqual { id }
      ... on CertifyVEXStatement { id }
      ... on HashEqual { id }
      ... on CertifyBad { id }
      ... on CertifyGood { id }
      ... on PkgEqual { id }
      ... on CertifyScorecard { id }
      ... on CertifyVuln { id }
      ... on HasSourceAt { id }
      ... on HasSBOM { id }
      ... on HasSLSA { id }
      ... on HasMetadata { id }
      ... on PointOfContact { id }
      ... on VulnerabilityMetadata { id }
      ... on License { id }
      ... on CertifyLegal { id }
    }
  }
`;

export type NeighborResult = {
  nodes: any[];
  /** distinct neighbors the node actually has */
  total: number;
  /** how many of them `nodes` covers */
  shown: number;
};

export async function fetchNeighbors(id: string): Promise<NeighborResult> {
  // no-cache on both hops: normalising six-figure entity counts into the
  // Apollo cache is itself slow, and the graph is rebuilt from scratch on
  // every click, so nothing reads those entries back.
  const idsRes = await client.query({
    query: NeighborIdsDocument,
    variables: { node: id, usingOnly: [] },
    fetchPolicy: "no-cache",
  });

  const distinct = new Set<string>();
  const wanted: string[] = [];
  for (const neighbor of idsRes.data?.neighbors ?? []) {
    const neighborId = neighbor?.id;
    if (!neighborId || distinct.has(neighborId)) {
      continue;
    }
    distinct.add(neighborId);
    if (wanted.length < NEIGHBOR_CAP) {
      wanted.push(neighborId);
    }
  }

  if (wanted.length === 0) {
    return { nodes: [], total: 0, shown: 0 };
  }

  const res = await client.query({
    query: NodesDocument,
    variables: { nodes: wanted },
    fetchPolicy: "no-cache",
  });

  if (distinct.size > wanted.length) {
    console.warn(
      `node ${id}: showing ${wanted.length} of ${distinct.size} neighbors`
    );
  }

  return {
    nodes: res.data?.nodes ?? [],
    total: distinct.size,
    shown: wanted.length,
  };
}

export async function GetNodeById(id: string) {
  const res = await client.query({
    query: NodeDocument,
    variables: {
      node: id
    },
  });
  return res.data;
}

// re-exported so existing importers keep their one-stop import
export { parseAndFilterGraph } from "@/utils/graphDedup";
