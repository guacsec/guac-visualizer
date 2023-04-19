'use client';

import { useCallback, useRef, useState } from 'react';
import { ForceGraphMethods, GraphData, NodeObject } from 'react-force-graph-2d';
import * as FG2D from 'react-force-graph-2d';

type ForceGraph2DWrapperProps = {
    graphData: GraphData;
    nodeAutoColorBy: string;
    linkDirectionalArrowLength: number;
    linkDirectionalArrowRelPos: number;
    onNodeClick?: (node: any) => void;
    nodeLabel: string | ((node: NodeObject) => string);
    linkDirectionalParticles: number;
    linkSource?: string;
    linkTarget?: string;
    selectedNode?: any;
    dataFetcher?: (node) => Promise<void>;
};

const ForceGraph2D: React.FC<ForceGraph2DWrapperProps> = ({
    graphData,
    nodeAutoColorBy,
    linkDirectionalArrowLength,
    linkDirectionalArrowRelPos,
    onNodeClick,
    nodeLabel,
    linkDirectionalParticles,
    linkSource,
    linkTarget,
    selectedNode,
    dataFetcher
}) => {
    const fgRef = useRef<ForceGraphMethods>();
    const handleClick = useCallback(
        (node) => {
            dataFetcher(node.id);
            const distance = 200;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
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
            const distRatio = 1 + distance / Math.hypot(sn.x, sn.y, sn.z);

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
        <FG2D.default
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
            //numDimensions={3}
            cooldownTicks={100}
            cooldownTime={15000}
        //nodeThreeObject={nodeThreeObject}
        />
    );
};

export default ForceGraph2D;