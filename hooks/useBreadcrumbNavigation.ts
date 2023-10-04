import { GraphDataWithMetadata } from "@/components/graph/types";
import { useState, useCallback, useEffect } from "react";

/*
 custom hook for managing breadcrumb navigation within a graph visualization.
 This hook tracks the user's path through the graph, allowing them to navigate
 backward and forward, and interact with nodes in the navigation trail.
*/

export const useBreadcrumbNavigation = (
  fetchAndSetGraphData: (id: string) => void,
  initialGraphData: GraphDataWithMetadata,
  setGraphData: (data: GraphDataWithMetadata) => void
) => {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInteractedWithPath, setUserInteractedWithPath] = useState(false);
  const [firstNode, setFirstNode] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  const handleBreadcrumbClick = (nodeIndex: number) => {
    const newBackStack = breadcrumb.slice(0, nodeIndex);
    const newForwardStack = breadcrumb.slice(nodeIndex + 1);

    setBackStack(newBackStack);
    setForwardStack(newForwardStack);
    setCurrentNode(breadcrumb[nodeIndex]);
    setCurrentIndex(nodeIndex);

    fetchAndSetGraphData(breadcrumb[nodeIndex].id);
  };

  // triggered when a node is clicked in the graph visualization.
  // updates the breadcrumb trail, sets the current node, and fetches data for the clicked node.
  const handleNodeClick = useCallback(
    (node) => {
      setUserInteractedWithPath(true);

      console.log(node);

      if (currentNode) {
        setBackStack((prevBackStack) => [...prevBackStack, currentNode]);
      }
      setForwardStack([]);

      setCurrentNode(node);

      let nodeName = node.label || "Unnamed Node";
      const count = breadcrumb.filter(
        (item) => item.label.split("[")[0] === nodeName
      ).length;

      if (count > 0) {
        nodeName = `${nodeName}[${count + 1}]`;
      }

      setBreadcrumb((prevBreadcrumb) => {
        const newBreadcrumb = [
          ...prevBreadcrumb.slice(0, currentIndex + 1),
          { label: nodeName, id: node.id },
        ];
        setCurrentIndex(newBreadcrumb.length - 1);
        return newBreadcrumb;
      });

      fetchAndSetGraphData(node.id);
    },
    [currentNode, breadcrumb, firstNode]
  );

  const handleBackClick = () => {
    if (currentIndex === 0 || backStack.length === 0) return;

    const newForwardStack = [currentNode, ...forwardStack];
    const newBackStack = [...backStack];
    const lastNode = newBackStack.pop();

    setCurrentNode(lastNode);
    setCurrentIndex(currentIndex - 1);
    setForwardStack(newForwardStack);
    setBackStack(newBackStack);

    fetchAndSetGraphData(lastNode.id);
  };

  const handleForwardClick = () => {
    if (currentIndex >= breadcrumb.length - 1 || forwardStack.length === 0)
      return;

    const newForwardStack = [...forwardStack];
    const nextNode = newForwardStack.shift();
    const newBackStack = [...backStack, currentNode];

    setCurrentNode(nextNode);
    setCurrentIndex(currentIndex + 1);
    setBackStack(newBackStack);
    setForwardStack(newForwardStack);

    fetchAndSetGraphData(nextNode.id);
  };

  const reset = () => {
    if (initialGraphData) {
      setGraphData(initialGraphData);
      setBackStack([]);
      setForwardStack([]);
      setCurrentNode(null);
      setFirstNode(null);
      setBreadcrumb([]);
      setUserInteractedWithPath(false);
    }
  };

  useEffect(() => {
    if (currentNodeId !== null) {
      fetchAndSetGraphData(currentNodeId);
    }
  }, [currentNodeId]);

  return {
    breadcrumb,
    backStack,
    forwardStack,
    currentNode,
    currentIndex,
    userInteractedWithPath,
    handleBreadcrumbClick,
    handleNodeClick,
    handleBackClick,
    handleForwardClick,
    reset,
  };
};
