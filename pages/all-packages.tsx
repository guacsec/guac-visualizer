import React, { useState, useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import ForceGraph3D from '../app/ForceGraph3DWrapper';
import { Node, Edge, ParseNode } from '../app/ggraph';
import { useRouter } from 'next/router';
import { GetPkgDocument, PkgQ1Document, PkgQ2Document, PkgQ3Document, PkgQ9Document, IsVulnerability, ArtifactM1Document, ArtifactQ1Document, GetNeighborsDocument, GetNeighborsQuery } from '@/gql/__generated__/graphql';
import { ForceGraphMethods, GraphData } from 'react-force-graph-3d';
import client from '@/apollo/client';


const AllPackages = () => {
    const router = useRouter();
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const { data, error, loading } = useQuery(PkgQ3Document);
    const [ neighborData, setNeighborData ] = useState<GetNeighborsQuery>();
    const fgRef = useRef<ForceGraphMethods>();

    const isGraphDataEmpty = (graphData: GraphData) => {
        return graphData.nodes.length == 0 && graphData.links.length == 0;
    }

    const dataFetcher = (id: string) => {
        const q = client.query({
            query: GetNeighborsDocument,
            variables: {
                nodeId: id
            }});

        return q.then(res => {
            setNeighborData(res.data)
        })
    }
    useEffect(() => {
        const newGraphData: GraphData = {
            nodes: [],
            links: [],
        };
        if (data && !error && isGraphDataEmpty(graphData)) {
            data.packages.forEach((pkg: any) => {
                const parsedGraphData = ParseNode(pkg);
                if (parsedGraphData) {
                    newGraphData.nodes.push(...parsedGraphData.nodes);
                    newGraphData.links.push(...parsedGraphData.edges);
                }
            });

            setGraphData(newGraphData);
        } else if (neighborData && !error) {
            neighborData.neighbors.forEach((pkg: any) => {
                const parsedGraphData = ParseNode(pkg);
                if (parsedGraphData) {
                    newGraphData.nodes.push(...parsedGraphData.nodes);
                    newGraphData.links.push(...parsedGraphData.edges);
                }
            });
            setNeighborData(null);
            setGraphData(newGraphData);
        }
        console.log(graphData)
    }, [data, error, graphData, neighborData]);

    if (error) return <div>failed to load</div>;
    if (loading) return <div>loading...</div>;

    return (
        <div>
            <ForceGraph3D
                graphData={graphData}
                nodeLabel="label"
                linkDirectionalParticles={1}
                nodeAutoColorBy={'type'}
                linkDirectionalArrowLength={2}
                linkDirectionalArrowRelPos={1} 
                dataFetcher={dataFetcher}/>
        </div>
    );
};

export default AllPackages;