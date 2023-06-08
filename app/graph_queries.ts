import client from "@/apollo/client";
import {
  GetNeighborsDocument,
  GetNodeDocument,
} from "@/gql/__generated__/graphql";
import { GraphData } from "react-force-graph-2d";
import { GuacGraphData } from "@/app/ggraph";

//const certifyBadQuery = useQuery(GetCertifyBadDocument, { variables: {spec: {}}});

export async function fetchNeighbors(id: string) {
  const res = await client.query({
    query: GetNeighborsDocument,
    variables: {
      nodeId: id,
      edges: [],
    },
  });

  return res.data.neighbors;
}

export async function GetNodeById(id: string) {
  const res = await client.query({
    query: GetNodeDocument,
    variables: {
      nodeId: id,
      edges: [],
    },
  });
  return res.data;
}

export function ParseAndFilterGraph(
  graphData: GraphData,
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
