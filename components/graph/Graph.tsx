import { useContext, useEffect, useState, useRef } from "react";
import ForceGraph2D from "@/components/graph/ForceGraph2DWrapper";
import GuacVizThemeContext from "@/store/themeContext";
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

const linkCanvasObject = (link, ctx) => {
  const MAX_ARROW_SIZE = 6;
  const ARROW_OFFSET = 5;
  const LINE_COLOR = "black";
  const ARROW_COLOR = "blue";

  ctx.globalAlpha = 0.4;

  const start = link.source;
  const end = link.target;
  if (typeof start !== "object" || typeof end !== "object") return;

  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const lineEndX = end.x - ARROW_OFFSET * Math.cos(angle);
  const lineEndY = end.y - ARROW_OFFSET * Math.sin(angle);

  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(lineEndX, lineEndY);
  ctx.strokeStyle = LINE_COLOR;
  ctx.stroke();

  const arrowAngle1 = angle + Math.PI / 7;
  const arrowAngle2 = angle - Math.PI / 7;
  const arrowX1 = lineEndX - MAX_ARROW_SIZE * Math.cos(arrowAngle1);
  const arrowY1 = lineEndY - MAX_ARROW_SIZE * Math.sin(arrowAngle1);
  const arrowX2 = lineEndX - MAX_ARROW_SIZE * Math.cos(arrowAngle2);
  const arrowY2 = lineEndY - MAX_ARROW_SIZE * Math.sin(arrowAngle2);

  ctx.beginPath();
  ctx.moveTo(arrowX1, arrowY1);
  ctx.lineTo(lineEndX, lineEndY);
  ctx.lineTo(arrowX2, arrowY2);
  ctx.fillStyle = ARROW_COLOR;
  ctx.fill();
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

  const [isGraphLoaded, setIsGraphLoaded] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (isGraphLoaded && ctxRef.current && ctxRef.current.canvas.__zoom) {
      ctxRef.current.canvas.__zoom.x = 500;
    }
  }, [isGraphLoaded]);

  const nodeCanvasObject = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D
  ) => {
    ctxRef.current = ctx;

    const shapeSize = 10;
    const nodeType = nodeTypeFromNodeObject(node);
    const applyRedFillAndOutline =
      (options.highlightArtifact && nodeType === "Artifact") ||
      (options.highlightVuln && nodeType === "CertifyVuln") ||
      (options.highlightSbom && nodeType === "IsDependency") ||
      (options.highlightBuilder && nodeType === "PackageType");

    switch (nodeType) {
      case "PackageType":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "teal";
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fillRect(node.x - 6, node.y - 4, 12, 8);
        break;
      case "PackageName":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "SteelBlue";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        break;

      case "PackageNamespace":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkOrchid";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
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
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkGoldenRod";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        break;
      case "VulnEqual":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkMagenta";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.lineTo(node.x, node.y);
        ctx.closePath();
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
      case "PackageVersion":
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "DarkTurquoise";
        var side = 10;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fillRect(node.x - side / 2, node.y - side / 2, side, side);
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
        ctx.strokeStyle = "red";
        ctx.fillStyle = applyRedFillAndOutline ? "red" : "yellow";
        ctx.beginPath();
        ctx.arc(node.x, node.y, shapeSize / 2, 0, 2 * Math.PI);
        ctx.stroke();
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
        setIsGraphLoaded(true);
        onNodeClick(node);
      }}
      bgdColor={bgColor}
      graphData={graphData}
      nodeLabel={nodeLabelFromNodeObject}
      linkDirectionalArrowLength={1}
      linkDirectionalArrowRelPos={20}
      linkDirectionalParticles={0}
      width={containerOptions.width}
      height={containerOptions.height}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
      }}
      nodeCanvasObject={nodeCanvasObject}
      linkCanvasObject={linkCanvasObject}
      d3AlphaDecay={0.00028}
      d3VelocityDecay={0.5}
    />
  );
}
