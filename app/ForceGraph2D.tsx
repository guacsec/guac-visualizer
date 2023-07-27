"use client";

import { useCallback, useRef, useState } from "react";
import ForceGraph, {
  LinkObject,
  ForceGraphMethods,
  GraphData,
  NodeObject,
} from "react-force-graph-2d";
import { CanvasCustomRenderFn, NodeAccessor } from "@/components/graph/types";
import { cloneDeep } from "lodash";
import Image from "next/image";

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
  const [tooltipContent, setTooltipContent] = useState([]);
  const [tooltipPlainText, setTooltipPlainText] = useState("");
  const [copyTooltipStyle, setCopyTooltipStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });

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

  const buildContent = (
    obj: any,
    parentKey = "",
    level = 0
  ): [JSX.Element[], string[]] => {
    let content: JSX.Element[] = [];
    let plainTextContent: string[] = [];
    let filteredKeys = [
      "__typename",
      "x",
      "y",
      "vx",
      "vy",
      "__indexColor",
      "index",
      "expanded",
    ];

    for (const [key, value] of Object.entries(obj)) {
      if (filteredKeys.includes(key)) continue;
      let newKey = parentKey ? `${parentKey}_${key}` : key;
      if (typeof value !== "object" || value === null) {
        let specialFormat =
          newKey === "package_namespaces_0_names_0_name" ? "red-bold-text" : "";
        content.push(
          <li key={newKey} style={{ textIndent: `${level}em` }}>
            <span>{`${newKey}: `}</span>
            <span className={specialFormat}>{String(value)}</span>
          </li>
        );
        plainTextContent.push(
          `${"  ".repeat(level)}${newKey}: ${String(value)}`
        );
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const [jsx, text] = buildContent(
            item,
            `${newKey}_${index}`,
            level + 1
          );
          content.push(...jsx);
          plainTextContent.push(...text);
        });
      } else {
        const [jsx, text] = buildContent(value, newKey, level + 1);
        content.push(...jsx);
        plainTextContent.push(...text);
      }
    }

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
    <>
      <div
        className="absolute font-mono p-2 rounded text-sm shadow-lg border-2 border-black overflow-auto flex items-center justify-center bg-white text-gray-900 list-none"
        style={{
          ...tooltipStyle,
          width: "400px",
          height: "300px",
          zIndex: 10000,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTooltipStyle((prev) => ({ ...prev, display: "none" }));
          }}
          className="absolute right-1 top-1 flex items-center justify-center bg-red-400 p-2 text-white w-8 h-8"
        >
          X
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(e);
          }}
          className="absolute right-10 top-1 flex items-center justify-center bg-green-400 p-2 text-white w-8 h-8"
        >
          <Image
            className="dark:white-filter transition-all duration-500"
            src="images/icons/copy-clipboard.svg"
            alt="copy to clipboard"
            width={27}
            height={27}
          />
        </button>
        <div className="pt-3">{tooltipContent}</div>
      </div>
      <div
        className="absolute p-8 m-auto rounded text-sm shadow-lg border-2 border-green-400 flex items-center justify-center bg-green-200 text-green-800"
        style={{
          ...copyTooltipStyle,
          width: "150px",
          height: "30px",
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
          console.log(`Right clicked on node with id: ${node.id}`);
          console.log(node);

          let [content, plainText] = buildContent(cloneDeep(node));
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
