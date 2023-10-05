import ForceGraph2D from "@/components/graph/ForceGraph2DWrapper";
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
  const bgColor = "#e7e5e4";

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
    const shapeSize = 10;
    const nodeType = nodeTypeFromNodeObject(node);
    const applyRedFillAndOutline =
      (options.highlightArtifact && nodeType === "Artifact") ||
      (options.highlightVuln && nodeType === "VulnerabilityID") ||
      (options.highlightSbom && nodeType === "IsDependency") ||
      (options.highlightBuilder && nodeType === "PackageType");

    switch (nodeType) {
      case "PackageType":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "teal";
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fillRect(node.x - 6, node.y - 4, 12, 8);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        break;
      case "PackageName":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "#7D0541";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "PackageVersion":
        var side = 10;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fillRect(node.x - side / 2, node.y - side / 2, side, side);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "PackageNamespace":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkOrchid";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "IsOccurrence":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "NavajoWhite";
        ctx.beginPath();
        ctx.fillRect(node.x - side / 2, node.y - side / 2, side, side);
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "HasSlsa":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "PaleTurquoise";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "Builder":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "RebeccaPurple";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "Vulnerability":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "Brown";
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - 6);
        ctx.lineTo(node.x - 6, node.y + 6);
        ctx.lineTo(node.x + 6, node.y + 6);
        ctx.closePath();
        ctx.fill();
        break;
      case "VulnerabilityID":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "darkorange";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        break;
      case "VulnEqual":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkMagenta";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.lineTo(node.x, node.y);
        ctx.closePath();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "CertifyLegal":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkOliveGreen";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "License":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkOliveGreen";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "IsDependency":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "hotpink";
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - shapeSize / 2);
        ctx.lineTo(node.x - shapeSize / 2, node.y + shapeSize / 2);
        ctx.lineTo(node.x + shapeSize / 2, node.y + shapeSize / 2);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "CertifyVuln":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "tomato";
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
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "NoVuln":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "green";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "Artifact":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "yellow";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "HasSourceAt":
        ctx.fillStyle = "#C4AEAD";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "SourceType":
        ctx.fillStyle = "#997070";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "SourceName":
        ctx.strokeStyle = "red";
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "SandyBrown";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "SourceNamespace":
        ctx.fillStyle = "#C48189";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      case "CertifyScorecard":
        ctx.fillStyle = "#7E354D";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
      default:
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "blue";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        break;
    }
    ctx.fillText(nodeLabelFromNodeObject(node), node.x, node.y + 13);
  };

  return (
    <ForceGraph2D
      onNodeClick={(node) => {
        onNodeClick(node);
      }}
      bgdColor={bgColor}
      graphData={graphData}
      nodeLabel={nodeLabelFromNodeObject}
      linkDirectionalArrowLength={9}
      linkDirectionalArrowRelPos={3}
      linkDirectionalParticles={0}
      width={containerOptions.width}
      height={containerOptions.height}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
      }}
      nodeCanvasObject={nodeCanvasObject}
      d3AlphaDecay={0.000288}
      d3VelocityDecay={0.5}
    />
  );
}
