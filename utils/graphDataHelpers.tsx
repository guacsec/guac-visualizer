import { GetNodeById, parseAndFilterGraph } from "@/app/graph_queries";
import { GraphDataWithMetadata } from "@/components/graph/types";

export const fetchAndParseNodes = (nodeIds: string[]) =>
  Promise.all(nodeIds.map((nodeId) => GetNodeById(nodeId)));

export const generateGraphDataFromNodes = (parsedNodes: any[]) => {
  let graphData: GraphDataWithMetadata = { nodes: [], links: [] };
  parsedNodes.forEach((parsedNode) =>
    parseAndFilterGraph(graphData, parsedNode)
  );
  return graphData;
};