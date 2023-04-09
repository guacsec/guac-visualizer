'use client';

import { useCallback, useRef } from 'react';
import { ForceGraphMethods, GraphData, NodeObject } from 'react-force-graph-3d';
import * as FG3D from 'react-force-graph-3d';
import { GetNeighborsQuery } from '@/gql/__generated__/graphql';

type ForceGraph3DWrapperProps = {
    graphData: GraphData;
    nodeAutoColorBy: string;
    linkDirectionalArrowLength: number;
    linkDirectionalArrowRelPos: number;
    onNodeClick?: (node: any) => void;
    nodeLabel: string | ((node: NodeObject) => string);
    linkDirectionalParticles: number;
    linkSource?: string;
    linkTarget?: string;
    dataFetcher?: (node) => Promise<void>; 
};

const ForceGraph3D: React.FC<ForceGraph3DWrapperProps> = ({
    graphData,
    nodeAutoColorBy,
    linkDirectionalArrowLength,
    linkDirectionalArrowRelPos,
    onNodeClick,
    nodeLabel,
    linkDirectionalParticles,
    linkSource,
    linkTarget,
    dataFetcher
}) => {
    const fgRef = useRef<ForceGraphMethods>();
    const handleClick = useCallback(
        (node) => {
            dataFetcher(node.id);
            const distance = 40;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            if (fgRef.current) {
                fgRef.current.cameraPosition(
                    {
                        x: node.x * distRatio,
                        y: node.y * distRatio,
                        z: node.z * distRatio
                    },
                    node,
                    1000
                );
            }
        },
        [fgRef, dataFetcher]
    );

    return (
        <FG3D.default
            ref={fgRef}
            graphData={graphData}
            nodeAutoColorBy={nodeAutoColorBy}
            linkDirectionalArrowLength={linkDirectionalArrowLength}
            linkDirectionalArrowRelPos={linkDirectionalArrowRelPos}
            onNodeClick={onNodeClick ?? handleClick}
            nodeLabel={nodeLabel}
            nodeId="id"
            linkDirectionalParticles={linkDirectionalParticles}
            linkDirectionalParticleWidth={0.5}
            linkSource={linkSource}
            linkTarget={linkTarget}
            linkWidth={1}
            linkLabel="label"
        />
    );
};

export default ForceGraph3D;