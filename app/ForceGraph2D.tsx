"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [tooltipStyle, setTooltipStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });
  const [tooltipContent, setTooltipContent] = useState("");

  const fgRef = useRef<ForceGraphMethods>();

  const handleClick = useCallback(
    (node: NodeObject) => {
      dataFetcher(node.id);
    },
    [fgRef, dataFetcher]
  );

  if (selectedNode) {
    const sn = graphData.nodes.find((node) => node.id === selectedNode.value);
    if (sn && fgRef.current) {
    }
  }

  useEffect(() => {
    const hideTooltip = () => {
      setTooltipStyle((prev) => ({ ...prev, display: "none" }));
    };

    document.addEventListener("click", hideTooltip);
    return () => document.removeEventListener("click", hideTooltip);
  }, []);

  return (
    <>
      <div
        className="absolute font-mono bg-white p-2 rounded text-sm text-black shadow-lg border-2 border-black"
        style={{
          ...tooltipStyle,
          width: "200px",
          height: "200px",
          zIndex: 10000,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTooltipStyle((prev) => ({ ...prev, display: "none" }));
          }}
          className="absolute right-1 top-1 bg-red-400 px-2 py-1 text-white"
        >
          X
        </button>
        <p className="pt-3">{tooltipContent}</p>
      </div>
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
        onNodeRightClick={(node: NodeObject, event: MouseEvent) => {
          event.preventDefault();
          console.log(`Right clicked on node with id: ${node.id}`);
          setTooltipStyle({
            display: "block",
            top: event.clientY,
            left: event.clientX,
          });
          setTooltipContent(`Node ID: ${node.id}`);
        }}
        nodeLabel={nodeLabel}
        linkLabel={linkLabel}
        nodeId="id"
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleWidth={0.5}
        linkSource={linkSource}
        linkTarget={linkTarget}
        linkWidth={1}
        cooldownTicks={100}
        cooldownTime={15000}
        nodeCanvasObjectMode={nodeCanvasObjectMode}
        nodeCanvasObject={nodeCanvasObject}
        onNodeDragEnd={onNodeDragEnd}
      />
    </>
  );
};

export default ForceGraph2D;
