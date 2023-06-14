import { LinkObject, NodeObject } from "react-force-graph-2d";

export type GraphDataWithMetadata = {
  nodes: NodeWithMetadataObject[];
  links: LinkObject[];
};

export type NodeMetadata = {
  type: string; // TODO: [lillichoung] Consolidate all the node types into a enum
  label: string;
};

export type NodeWithMetadataObject = NodeObject & NodeMetadata;

/* From react-force-graph-2d.d.ts */
type Accessor<In, Out> = Out | string | ((obj: In) => Out);
export type NodeAccessor<T> = Accessor<NodeObject, T>;
export type CanvasCustomRenderFn<T> = (
  obj: T,
  canvasContext: CanvasRenderingContext2D,
  globalScale: number
) => void;
