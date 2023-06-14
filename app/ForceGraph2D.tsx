"use client";

import { useCallback, useRef } from "react";
import ForceGraph, {
  LinkObject,
  ForceGraphMethods,
  GraphData,
  NodeObject,
} from "react-force-graph-2d";
import { CanvasCustomRenderFn, NodeAccessor } from "@/components/graph/types";

type ForceGraph2DWrapperProps = {
  graphData: GraphData;
  nodeAutoColorBy?: string;
  linkDirectionalArrowLength: number;
  linkDirectionalArrowRelPos: number;
  onNodeClick?: (node: NodeObject, event: MouseEvent) => void;
  nodeLabel: NodeAccessor<string>;
  linkLabel?: string | ((link: LinkObject) => string);
  linkDirectionalParticles: number;
  linkSource?: string;
  linkTarget?: string;
  selectedNode?: any;
  dataFetcher?: (id: string | number) => void;
  nodeCanvasObject: CanvasCustomRenderFn<NodeObject>;
  nodeCanvasObjectMode?: string | ((obj: NodeObject) => any);
  onNodeDragEnd?: (
    node: NodeObject,
    translate: { x: number; y: number }
  ) => void;
  bgdColor?: string;
};

type ResponsiveProps = {
  width?: number;
  height?: number;
};

const ForceGraph2D: React.FC<ForceGraph2DWrapperProps & ResponsiveProps> = ({
  graphData,
  nodeAutoColorBy,
  linkDirectionalArrowLength,
  linkDirectionalArrowRelPos,
  onNodeClick,
  nodeLabel,
  linkLabel,
  linkDirectionalParticles,
  linkSource,
  linkTarget,
  selectedNode,
  nodeCanvasObject,
  nodeCanvasObjectMode,
  onNodeDragEnd,
  dataFetcher,
  width,
  height,
  bgdColor,
}) => {
  const fgRef = useRef<ForceGraphMethods>();

  const handleClick = useCallback(
    (node: NodeObject) => {
      dataFetcher(node.id);
      const distance = 200;
      // const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      /*if (fgRef.current) {
                fgRef.current.cameraPosition(
                    {
                        x: node.x * distRatio,
                        y: node.y * distRatio,
                        z: node.z * distRatio
                    },
                    node,
                    1000
                );
            }*/
    },
    [fgRef, dataFetcher]
  );

  if (selectedNode) {
    const sn = graphData.nodes.find((node) => node.id === selectedNode.value);
    if (sn && fgRef.current) {
      const distance = 200;
      // const distRatio = 1 + distance / Math.hypot(sn.x, sn.y, sn.z);

      // fgRef.current.cameraPosition(
      //     {
      //         x: sn.x * distRatio,
      //         //y: sn.y * distRatio,
      //         z: sn.z * distRatio,
      //     },
      //     sn,
      //     1000
      // );
    }
  }

  return (
    <ForceGraph
      backgroundColor={bgdColor}
      width={width}
      height={height}
      ref={fgRef}
      graphData={graphData}
      nodeAutoColorBy={nodeAutoColorBy}
      linkDirectionalArrowLength={linkDirectionalArrowLength}
      linkDirectionalArrowRelPos={linkDirectionalArrowRelPos}
      onNodeClick={onNodeClick ?? handleClick}
      nodeLabel={nodeLabel}
      linkLabel={linkLabel}
      nodeId="id"
      linkDirectionalParticles={linkDirectionalParticles}
      linkDirectionalParticleWidth={0.5}
      linkSource={linkSource}
      linkTarget={linkTarget}
      linkWidth={1}
      //numDimensions={3}
      cooldownTicks={100}
      cooldownTime={15000}
      nodeCanvasObjectMode={nodeCanvasObjectMode}
      nodeCanvasObject={nodeCanvasObject}
      onNodeDragEnd={onNodeDragEnd}
      //nodeThreeObject={nodeThreeObject}
    />
  );
};

export default ForceGraph2D;
