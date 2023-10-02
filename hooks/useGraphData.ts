'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GraphDataWithMetadata } from '@/components/graph/types';
import { NodeFragment } from '@/gql/types/nodeFragment';
import { fetchNeighbors, GetNodeById, parseAndFilterGraph } from '@/utils/graph_queries';
import { ParseNode } from '@/utils/ggraph';

export function useGraphData() {
  const searchParams = useSearchParams();
  const [graphData, setGraphData] = useState<GraphDataWithMetadata>({ nodes: [], links: [] });
  const [initialGraphData, setInitialGraphData] = useState<GraphDataWithMetadata | null>(null);
  const [renderedInitialGraph, setRenderedInitialGraph] = useState(false);

  const fetchAndParseNodes = (nodeIds: string[]) =>
  Promise.all(nodeIds.map((nodeId) => GetNodeById(nodeId))).then((nodes) =>
    nodes.map((node) => ParseNode(node.node as NodeFragment))
  );

const generateGraphDataFromNodes = (parsedNodes: any[]) => {
  let graphData: GraphDataWithMetadata = { nodes: [], links: [] };
  parsedNodes.forEach((parsedNode) =>
    parseAndFilterGraph(graphData, parsedNode)
  );
  return graphData;
};

  const fetchAndSetGraphData = async (id: string | number) => {
    try {
      const res = await fetchNeighbors(id.toString());
      const newGraphData: GraphDataWithMetadata = { nodes: [], links: [] };
      res.forEach((n) => {
        let node = n as NodeFragment;
        parseAndFilterGraph(newGraphData, ParseNode(node));
      });
      setGraphData(newGraphData);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGraphData = async (nodeIds: string[]) => {
    try {
      const parsedNodes = await fetchAndParseNodes(nodeIds);
      const newGraphData = await generateGraphDataFromNodes(parsedNodes);
      setGraphData(newGraphData);
      setRenderedInitialGraph(true);
    } catch (error) {
      console.error(error);
    }
  };

  const setGraphDataWithInitial = (data: GraphDataWithMetadata) => {
    setGraphData(data);
    if (!initialGraphData) {
      setInitialGraphData(data);
    }
  };

  const fetchData = async () => {
    try {
      const myQuery = searchParams.get('path');

      if (myQuery && !renderedInitialGraph) {
        const nodeIds = myQuery.split(",");
        const parsedNodes = await fetchAndParseNodes(nodeIds);
        const graphData = await generateGraphDataFromNodes(parsedNodes);

        setGraphData(graphData);
        setInitialGraphData(graphData);
        setRenderedInitialGraph(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [renderedInitialGraph, searchParams]);

  return {
    graphData,
    setGraphData,
    initialGraphData,
    renderedInitialGraph,
    fetchAndSetGraphData,
    loadGraphData,
    setGraphDataWithInitial,
  };
}