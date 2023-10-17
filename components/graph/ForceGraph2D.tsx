"use client";

import { useRef, useState } from "react";
import ForceGraph, {
  LinkObject,
  ForceGraphMethods,
  GraphData,
  NodeObject,
} from "react-force-graph-2d";
import { CanvasCustomRenderFn, NodeAccessor } from "@/components/graph/types";
import { cloneDeep } from "lodash";
import Tooltip from "@/components/tooltip";

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
  d3AlphaDecay: number;
  d3VelocityDecay: number;
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
  d3AlphaDecay,
  d3VelocityDecay,
}) => {
  const [tooltipStyle, setTooltipStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });
  const [tooltipContent, setTooltipContent] = useState([]);
  const [tooltipPlainText, setTooltipPlainText] = useState("");
  const [copyTooltipStyle, setCopyTooltipStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });

  const fgRef = useRef<ForceGraphMethods>();

  if (selectedNode) {
    const sn = graphData.nodes.find((node) => node.id === selectedNode.value);
    if (sn && fgRef.current) {
    }
  }

  const buildTooltipContent = (
    obj: any,
    parentKey = "",
    level = 0,
    cache: Map<any, [JSX.Element[], string[]]> = new Map()
  ): [JSX.Element[], string[]] => {
    if (cache.has(obj)) {
      return cache.get(obj)!;
    }

    let content: JSX.Element[] = [];
    let plainTextContent: string[] = [];
    let filteredKeys = ["__typename", "__indexColor", "index", "expanded"];

    for (const [key, value] of Object.entries(obj)) {
      if (filteredKeys.includes(key)) continue;
      let newKey = parentKey ? `${parentKey}_${key}` : key;
      if (typeof value !== "object" || value === null) {
        let specialFormat =
          newKey === "package_namespaces_0_names_0_name" ? "red-bold-text" : "";
        content.push(
          <li key={newKey} style={{ textIndent: `${level}em` }}>
            <span>{`- ${newKey}: `}</span>
            <span className={specialFormat}>{String(value)}</span>
          </li>
        );
        plainTextContent.push(
          `${"  ".repeat(level)}- ${newKey}: ${String(value)}`
        );
      } else if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
          const [jsx, text] = buildTooltipContent(
            value[index],
            `${newKey}_${index}`,
            level + 1,
            cache
          );
          content.push(...jsx);
          plainTextContent.push(...text);
        }
      } else {
        const [jsx, text] = buildTooltipContent(
          value,
          newKey,
          level + 1,
          cache
        );
        content.push(...jsx);
        plainTextContent.push(...text);
      }
    }

    cache.set(obj, [content, plainTextContent]);
    return [content, plainTextContent];
  };

  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(tooltipPlainText);
    setCopyTooltipStyle({
      display: "block",
      top: event.clientY,
      left: event.clientX,
    });
    setTimeout(
      () => setCopyTooltipStyle({ display: "none", top: 0, left: 0 }),
      1000
    );
  };

  return (
    <div>
      <Tooltip
        style={tooltipStyle}
        content={tooltipContent}
        plainText={tooltipPlainText}
        onClose={() =>
          setTooltipStyle((prev) => ({ ...prev, display: "none" }))
        }
        onCopy={copyToClipboard}
      />
      <div
        className="absolute px-4 py-2 m-auto rounded text-sm shadow-lg border-2 border-green-400 flex items-center justify-center bg-green-200 text-green-800 text-center"
        style={{
          ...copyTooltipStyle,
          width: "150px",
          height: "auto",
          zIndex: 10001,
        }}
      >
        Copied to clipboard!
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
          let [content, plainText] = buildTooltipContent(cloneDeep(node));
          setTooltipStyle({
            display: "block",
            top: event.clientY,
            left: event.clientX,
          });
          setTooltipContent(content);
          setTooltipPlainText(plainText.join("\n"));
        }}
        nodeLabel={nodeLabel}
        linkLabel={linkLabel}
        nodeId="id"
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleWidth={10.5}
        linkSource={linkSource}
        linkTarget={linkTarget}
        linkWidth={3}
        cooldownTicks={100}
        cooldownTime={15000}
        nodeCanvasObjectMode={nodeCanvasObjectMode}
        nodeCanvasObject={nodeCanvasObject}
        onNodeDragEnd={onNodeDragEnd}
        d3AlphaDecay={d3AlphaDecay}
        d3VelocityDecay={d3VelocityDecay}
      />
    </div>
  );
};

export default ForceGraph2D;
