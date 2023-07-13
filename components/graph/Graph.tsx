import ForceGraph2D from "@/app/ForceGraph2DWrapper";
import GuacVizThemeContext from "@/store/themeContext";
import { useContext } from "react";
import {
  GraphDataWithMetadata,
  NodeMetadata,
  NodeWithMetadataObject,
} from "@/components/graph/types";
import { GraphData, LinkObject, NodeObject } from "react-force-graph-2d";

const getMetadataFromGraphData = (graphData: {
  nodes: NodeWithMetadataObject[];
  links: LinkObject[];
}): {
  metadata: { [id: string | number]: NodeMetadata };
  graphData: GraphData;
} => {
  const metadataObj: { [id: string | number]: NodeMetadata } = {};

  graphData.nodes.forEach((node: NodeWithMetadataObject) => {
    metadataObj[node.id] = {
      type: node.type,
      label: node.label,
    };
  });

  return { metadata: metadataObj, graphData: graphData };
};

export default function Graph({
  graphData,
  options,
  containerOptions,
  onNodeClick,
}: {
  graphData: GraphDataWithMetadata;
  options: {
    highlightArtifact: boolean;
    highlightVuln: boolean;
    highlightSbom: boolean;
    highlightBuilder: boolean;
  };
  containerOptions: {
    width: number;
    height: number;
  };
  onNodeClick: (node: any) => void;
}) {
  const { isDarkTheme } = useContext(GuacVizThemeContext);
  const bgColor = isDarkTheme ? "#909090" : "#e7e5e4";

  const { metadata } = getMetadataFromGraphData(graphData);

  const nodeLabelFromNodeObject = (node: NodeObject) => {
    return metadata[node.id]?.label;
  };

  const nodeTypeFromNodeObject = (node: NodeObject) => {
    return metadata[node.id]?.type;
  };

  const nodeCanvasObject = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D
  ) => {
    if (ctx.canvas && ctx.canvas.__zoom) {
      ctx.canvas.__zoom.x = 500;
    }
    const shapeSize = 10; // set a constant size for each shape
    const nodeType = nodeTypeFromNodeObject(node);
    const applyRedFillAndOutline =
      (options.highlightArtifact && nodeType === "Artifact") ||
      (options.highlightVuln && nodeType === "CertifyVuln") ||
      (options.highlightSbom && nodeType === "IsDependency") ||
      (options.highlightBuilder && nodeType === "PackageType");

    switch (nodeType) {
      case "PackageType":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "light blue";
        ctx.fillRect(node.x - 6, node.y - 4, 12, 8);
        break;
      case "IsDependency":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "pink";
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - shapeSize / 2);
        ctx.lineTo(node.x - shapeSize / 2, node.y + shapeSize / 2);
        ctx.lineTo(node.x + shapeSize / 2, node.y + shapeSize / 2);
        ctx.fill();
        break;
      case "CertifyVuln":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "orange";
        const sideLength =
          shapeSize / Math.sqrt(3.5 - 1.5 * Math.cos(Math.PI / 4));
        ctx.beginPath();
        ctx.moveTo(node.x + sideLength, node.y);
        ctx.lineTo(node.x + sideLength / 2, node.y - sideLength / 2);
        ctx.lineTo(node.x - sideLength / 2, node.y - sideLength / 2);
        ctx.lineTo(node.x - sideLength, node.y);
        ctx.lineTo(node.x - sideLength / 2, node.y + sideLength / 2);
        ctx.lineTo(node.x + sideLength / 2, node.y + sideLength / 2);
        ctx.closePath();
        ctx.fill();
        break;
      case "PackageVersion":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "orange";
        var side = 10;
        ctx.fillRect(node.x - side / 2, node.y - side / 2, side, side);
        break;
      case "NoVuln":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "green";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        break;
      case "Artifact":
        ctx.strokeStyle = "red";
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "yellow";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        break;
      default:
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "blue";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        break;
    }
    // label the node with text, a little bit under the shape
    ctx.fillText(nodeLabelFromNodeObject(node), node.x, node.y + 12);
  };

  return (
    <ForceGraph2D
      onNodeClick={(node) => onNodeClick(node)}
      bgdColor={bgColor}
      graphData={graphData}
      nodeLabel={nodeLabelFromNodeObject}
      linkDirectionalArrowLength={3}
      linkDirectionalArrowRelPos={3}
      linkDirectionalParticles={0}
      width={containerOptions.width}
      height={containerOptions.height}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
      }}
      nodeCanvasObject={nodeCanvasObject}
    />
  );
}
