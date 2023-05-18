import ForceGraph2D from "@/app/ForceGraph2DWrapper";
import { GraphData } from "react-force-graph-2d";

export default function Graph({
  graphData,
  localDataFetcher,
  options,
}: {
  graphData: GraphData;
  localDataFetcher: (id: string) => void;
  options: {
    highlightArtifact: boolean;
    highlightVuln: boolean;
    highlightSbom: boolean;
    highlightBuilder: boolean;
  };
}) {
  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel={"label"}
      linkDirectionalArrowLength={3}
      linkDirectionalArrowRelPos={3}
      linkDirectionalParticles={0}
      dataFetcher={localDataFetcher}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
      }}
      nodeCanvasObject={(node, ctx) => {
        const shapeSize = 10; // set a constant size for each shape

        const applyRedFillAndOutline =
          (options.highlightArtifact && node.type === "Artifact") ||
          (options.highlightVuln && node.type === "CertifyVuln") ||
          (options.highlightSbom && node.type === "IsDependency") ||
          (options.highlightBuilder && node.type === "PackageType");

        switch (node.type) {
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
            console.log("Testing if artifact is getting populated");
            break;
          default:
            ctx.fillStyle = applyRedFillAndOutline ? "red" : "blue";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            ctx.fill();
            break;
        }
        // label the node with text, a little bit under the shape
        ctx.fillText(node.label, node.x, node.y + 12);
      }}
    />
  );
}
