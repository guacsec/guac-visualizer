import client from "@/apollo/client";
import {
  NeighborsDocument,
  NodeDocument,
} from "@/gql/__generated__/graphql";
import { GuacGraphData } from "@/app/ggraph";
import { GraphDataWithMetadata } from "@/components/graph/types";

export async function fetchNeighbors(id: string) {
  const res = await client.query({
    query: NeighborsDocument,
    variables: {
      node: id,
      usingOnly: [],
    },
  });

  return res.data.neighbors;
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

export function parseAndFilterGraph(
  graphData: GraphDataWithMetadata,
  parsedNode: GuacGraphData
) {
  const uniqueNodeIds = new Set(graphData.nodes.map((node) => node.id));
  const uniqueLinkKeys = new Set(
    graphData.links.map((link) => `${link.source}-${link.target}-${link.label}`)
  );
  const linkKey = (link: any) => `${link.source}-${link.target}-${link.label}`;

  const uniqueNodes = parsedNode.nodes.filter(
    (node) => !uniqueNodeIds.has(node.data.id)
  );

  const uniqueEdges = parsedNode.edges.filter(
    (edge) => !uniqueLinkKeys.has(linkKey(edge.data.id))
  );

  uniqueNodes.forEach((n) => {
    graphData.nodes.push(n.data);
  });

  uniqueEdges.forEach((n) => {
    graphData.links.push(n.data);
  });
}
