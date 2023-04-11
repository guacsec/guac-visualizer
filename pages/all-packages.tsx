import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ForceGraph3D from '../app/ForceGraph3DWrapper';
import { ParseNode } from '../app/ggraph';
import { useRouter } from 'next/router';
import { PkgQ3Document, GetNeighborsDocument, GetNeighborsQuery } from '@/gql/__generated__/graphql';
import { GraphData } from 'react-force-graph-3d';
import client from '@/apollo/client';
import Select from 'react-select';


const getThemeStyles = (isDark) => ({
    control: (styles) => ({
        ...styles,
        backgroundColor: isDark ? '#333' : 'white',
        color: isDark ? 'white' : 'black',
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: isDark ? '#333' : 'white',
    }),
    singleValue: (styles) => ({
        ...styles,
        color: isDark ? 'white' : 'black',
    }),
    input: (styles) => ({
        ...styles,
        color: isDark ? 'white' : 'black',
    }),
    option: (styles, { isFocused, isSelected }) => {
        const backgroundColor = isSelected
            ? isDark ? '#555' : '#eee'
            : isFocused
                ? isDark ? '#444' : '#f0f0f0'
                : isDark ? '#333' : 'white';
        const color = isDark ? 'white' : 'black';
        return { ...styles, backgroundColor, color };
    },
});


const AllPackages = () => {
    const router = useRouter();
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    // NOTE: PkgQ9Document is the query that returns a handful of packages
    const { data, error, loading } = useQuery(PkgQ3Document);
    const [neighborData, setNeighborData] = useState<GetNeighborsQuery>();
    const [selectedPackage, setSelectedPackage] = useState(null);

    const filterNodesByType = (nodes, type) => {
        return nodes.filter((node) => node.type === type);
    };
    const packageNodes = filterNodesByType(graphData.nodes, 'PackageName');


    const options = packageNodes.map((node) => ({
        value: node.id,
        label: node.label,
    })).sort(function (a, b) {
        return a.label < b.label ? -1 : 1;
    });

    const dataFetcher = (id: string) => {
        const q = client.query({
            query: GetNeighborsDocument,
            variables: {
                nodeId: id,
                edges: [],
            }
        });

        return q.then(res => {
            setNeighborData(res.data)
        })
    }

    const [isInitialDataProcessed, setIsInitialDataProcessed] = useState(false);
    const linkKey = (link: any) => `${link.source}-${link.target}-${link.label}`;

    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mq.matches);
    }, []);
    const themeStyles = getThemeStyles(isDark);


    useEffect(() => {
        let newGraphData: GraphData = {
            nodes: [],
            links: [],
        };
        if (data && !error && !isInitialDataProcessed) {
            data.packages.forEach((pkg: any) => {
                const parsedGraphData = ParseNode(pkg);
                if (parsedGraphData) {
                    newGraphData.nodes.push(...parsedGraphData.nodes);
                    newGraphData.links.push(...parsedGraphData.edges);
                }
            });

            setGraphData(newGraphData);
            setIsInitialDataProcessed(true);
        } else if (neighborData && !error) {
            setNeighborData(null);
            setGraphData((prevGraphData) => {
                const updatedGraphData = { ...prevGraphData };
                const uniqueNodeIds = new Set(updatedGraphData.nodes.map((node) => node.id));
                const uniqueLinkKeys = new Set(updatedGraphData.links.map((link) => `${link.source}-${link.target}-${link.label}`));

                const seenNodeIds = new Set();
                const seenEdgeKeys = new Set();

                neighborData.neighbors.forEach((pkg: any) => {
                    const parsedGraphData = ParseNode(pkg);
                    if (parsedGraphData) {
                        const filteredNodes = parsedGraphData.nodes.filter((node) => {
                            if (seenNodeIds.has(node.id)) {
                                return false;
                            }
                            seenNodeIds.add(node.id);
                            return true;
                        });

                        const filteredEdges = parsedGraphData.edges.filter((edge) => {
                            const edgeKey = linkKey(edge);
                            if (seenEdgeKeys.has(edgeKey)) {
                                return false;
                            }
                            seenEdgeKeys.add(edgeKey);
                            return true;
                        });

                        const uniqueNodes = filteredNodes.filter((node) => !uniqueNodeIds.has(node.id));
                        const uniqueEdges = filteredEdges.filter((edge) => !uniqueLinkKeys.has(linkKey(edge)));

                        updatedGraphData.nodes = [...updatedGraphData.nodes, ...uniqueNodes];
                        updatedGraphData.links = [...updatedGraphData.links, ...uniqueEdges];
                    }
                });

                return updatedGraphData;
            });
        }

        console.log('graphData', graphData);
    }, [data, error, neighborData, isInitialDataProcessed, graphData]);


    if (error) return <div>failed to load</div>;
    if (loading) return <div>loading...</div>;

    return (
        <>
            <Select
                styles={themeStyles}
                value={selectedPackage}
                onChange={(option) => setSelectedPackage(option)}
                options={options}
                placeholder="Select a package"
            />
            <div>
                <ForceGraph3D
                    graphData={graphData}
                    nodeLabel="label"
                    linkDirectionalParticles={1}
                    nodeAutoColorBy={'type'}
                    linkDirectionalArrowLength={2}
                    linkDirectionalArrowRelPos={1}
                    selectedNode={selectedPackage}
                    dataFetcher={dataFetcher} />
            </div>
        </>
    );
};

export default AllPackages;