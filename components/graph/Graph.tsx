"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "@/components/graph/ForceGraph2DWrapper";
import {
  GraphDataWithMetadata,
  NodeMetadata,
  NodeWithMetadataObject,
} from "@/components/graph/types";
import {
  radiusForStyle,
  styleForType,
} from "@/components/graph/nodeStyles";
import { LinkObject, NodeObject } from "react-force-graph-2d";

/**
 * Canvas background. Unchanged from the pre-redesign renderer -- it is also used
 * as the fill of hollow "evidence" nodes and as the halo behind labels, so those
 * read as cut out of the canvas rather than painted on top of it.
 */
const BG_COLOR = "#e7e5e4";
const LABEL_COLOR = "#1c1917";
const DIM_COLOR = "rgba(120,113,108,0.25)";

/**
 * Zoom at which each role starts showing labels.
 *
 * The old renderer drew every label at every zoom in unscaled canvas units, so a
 * zoomed-out graph was a solid mat of overlapping text and a zoomed-in one had
 * labels the size of buildings. Labels now hold a constant *screen* size
 * (FONT_PX / globalScale) and appear by role: entities are the things you
 * navigate between, so they stay named at the default fit; evidence nodes are
 * the connective tissue and only earn a label once you lean in. Focused and
 * selected nodes are always labelled, however far out you are.
 */
const LABEL_ZOOM_THRESHOLD: Record<string, number> = {
  entity: 0.5,
  evidence: 1.4,
};
/** Ceiling for the automatic fit. Node radii are world units, so an unbounded
 *  zoomToFit on a handful of nodes renders them as dinner plates. */
const MAX_AUTOFIT_ZOOM = 2.2;
const FONT_PX = 11;
const MAX_LABEL_CHARS = 28;

const truncate = (s: string) =>
  s && s.length > MAX_LABEL_CHARS ? `${s.slice(0, MAX_LABEL_CHARS - 1)}…` : s;

/** force-graph replaces link endpoints with node objects once the sim has run. */
const endpointId = (
  end: string | number | NodeObject | undefined
): string | number | undefined =>
  typeof end === "object" && end !== null
    ? (end as NodeObject).id
    : (end as string | number | undefined);

export default function Graph({
  graphData,
  containerOptions,
  onNodeClick,
  graphRef,
  selectedId,
  /** Type names to keep bright; everything else dims. Null = no filter. */
  focusTypes = null,
}: {
  graphData: GraphDataWithMetadata;
  containerOptions: { width: number; height: number };
  onNodeClick: (node: any) => void;
  graphRef?: React.MutableRefObject<any>;
  selectedId?: string | number | null;
  focusTypes?: Set<string> | null;
}) {
  const [hoverId, setHoverId] = useState<string | number | null>(null);
  /**
   * Fit once per dataset, not on every settle -- re-fitting after the user has
   * zoomed somewhere deliberately is the more annoying failure of the two.
   */
  const fittedFor = useRef<string | null>(null);
  const localRef = useRef<any>();
  const fg = graphRef ?? localRef;

  const metadata = useMemo(() => {
    const byId: { [id: string | number]: NodeMetadata } = {};
    graphData.nodes.forEach((node: NodeWithMetadataObject) => {
      byId[node.id] = { type: node.type, label: node.label };
    });
    return byId;
  }, [graphData]);

  /**
   * Neighbours of the hovered node, so hovering isolates one hop of the graph.
   * Recomputed only when the data changes -- the hover itself is a cheap lookup.
   */
  const neighbours = useMemo(() => {
    const map = new Map<string | number, Set<string | number>>();
    const touch = (id: string | number) => {
      if (!map.has(id)) map.set(id, new Set());
      return map.get(id)!;
    };
    graphData.links.forEach((link: LinkObject) => {
      const a = endpointId(link.source);
      const b = endpointId(link.target);
      if (a === undefined || b === undefined) return;
      touch(a).add(b);
      touch(b).add(a);
    });
    return map;
  }, [graphData]);

  type NodeId = string | number | undefined;

  const isTypeFocused = (id: NodeId) =>
    id === undefined || !focusTypes || focusTypes.has(metadata[id]?.type);

  /** Bright if nothing is hovered, or if this node is the hovered one or its neighbour. */
  const isHoverFocused = (id: NodeId) =>
    hoverId === null || hoverId === id || !!neighbours.get(hoverId)?.has(id);

  const isBright = (id: NodeId) => isTypeFocused(id) && isHoverFocused(id);

  const dataKey = graphData.nodes.map((n) => n.id).join(",");
  useEffect(() => {
    if (graphData.nodes.length === 0 || fittedFor.current === dataKey) return;

    // <ForceGraph2D/> is a dynamic ssr:false import, so on the first paint the ref
    // is still empty -- poll for it rather than giving up and never laying out.
    let settle: ReturnType<typeof setTimeout>;
    const poll = setInterval(() => {
      const g = fg.current;
      if (!g) return;
      clearInterval(poll);
      fittedFor.current = dataKey;

      // Spread the layout out. d3's defaults (charge -30, link distance 30) pack
      // GUAC graphs into a ball where every label lands on its neighbour -- the
      // single biggest source of the "cluttered" read.
      g.d3Force("charge")?.strength(-140);
      g.d3Force("link")?.distance(55);
      g.d3ReheatSimulation?.();

      settle = setTimeout(() => {
        g.zoomToFit(400, 60);
        // zoomToFit animates, and is unbounded: on a handful of nodes it happily
        // zooms to 20x, where world-unit radii render as dinner plates.
        setTimeout(() => {
          if (g.zoom() > MAX_AUTOFIT_ZOOM) g.zoom(MAX_AUTOFIT_ZOOM, 200);
        }, 450);
      }, 700);
    }, 150);

    const giveUp = setTimeout(() => clearInterval(poll), 5000);
    return () => {
      clearInterval(poll);
      clearTimeout(giveUp);
      clearTimeout(settle);
    };
  }, [dataKey, fg, graphData.nodes.length]);

  const nodeTooltip = (node: NodeObject) => {
    const meta = metadata[node.id];
    if (!meta) return "";
    // Type first: a new reader needs to know *what* a blob is before *which* it is.
    return `${styleForType(meta.type).label} — ${meta.label}`;
  };

  const nodeCanvasObject = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => {
    const meta = metadata[node.id];
    const style = styleForType(meta?.type);
    const r = radiusForStyle(style);
    const bright = isBright(node.id);
    const isSelected = selectedId != null && node.id === selectedId;
    const isHovered = hoverId === node.id;

    ctx.save();

    if (style.role === "evidence") {
      // Hollow diamond: a claim *about* things, not a thing. Reads as a connector.
      ctx.beginPath();
      ctx.moveTo(node.x, node.y - r);
      ctx.lineTo(node.x + r, node.y);
      ctx.lineTo(node.x, node.y + r);
      ctx.lineTo(node.x - r, node.y);
      ctx.closePath();
      ctx.fillStyle = BG_COLOR;
      ctx.fill();
      ctx.lineWidth = 1.75 / globalScale;
      ctx.strokeStyle = bright ? style.color : DIM_COLOR;
      ctx.stroke();
    } else {
      // Filled circle, sized by tier: bigger = more specific.
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = bright ? style.color : DIM_COLOR;
      ctx.fill();
    }

    if (isSelected || isHovered) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, r + 3.5, 0, 2 * Math.PI);
      ctx.lineWidth = (isSelected ? 2 : 1.25) / globalScale;
      ctx.strokeStyle = LABEL_COLOR;
      ctx.stroke();
    }

    const focused = isSelected || isHovered;
    if (bright && (focused || globalScale >= LABEL_ZOOM_THRESHOLD[style.role])) {
      const fontSize = FONT_PX / globalScale;
      ctx.font = `${focused ? 600 : 400} ${fontSize}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const text = truncate(meta?.label ?? "");
      const y = node.y + r + 3 / globalScale;
      // Halo first, so text stays readable over links and other nodes.
      ctx.lineWidth = 3 / globalScale;
      ctx.strokeStyle = BG_COLOR;
      ctx.strokeText(text, node.x, y);
      ctx.fillStyle = LABEL_COLOR;
      ctx.fillText(text, node.x, y);
    }

    ctx.restore();
  };

  /** Keeps click/hover targets honest when a node is drawn small. */
  const nodePointerAreaPaint = (
    node: NodeObject,
    color: string,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, radiusForStyle(styleForType(metadata[node.id]?.type)) + 3, 0, 2 * Math.PI);
    ctx.fill();
  };

  const linkColor = (link: LinkObject) => {
    const a = endpointId(link.source);
    const b = endpointId(link.target);
    return isBright(a) && isBright(b)
      ? "rgba(68,64,60,0.45)"
      : "rgba(120,113,108,0.12)";
  };

  return (
    <ForceGraph2D
      graphRef={fg}
      onNodeClick={(node) => onNodeClick(node)}
      onNodeHover={(node) => setHoverId(node ? node.id : null)}
      bgdColor={BG_COLOR}
      graphData={graphData}
      nodeLabel={nodeTooltip}
      linkColor={linkColor}
      linkWidth={1}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkDirectionalParticles={0}
      width={containerOptions.width}
      height={containerOptions.height}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
      }}
      nodeCanvasObject={nodeCanvasObject}
      nodePointerAreaPaint={nodePointerAreaPaint}
      d3AlphaDecay={0.0228}
      d3VelocityDecay={0.4}
    />
  );
}
