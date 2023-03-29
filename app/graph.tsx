'use client'; // Client side rendering required since we are using clientside specific hooks

import CytoscapeComponent from 'react-cytoscapejs'
import Spread from 'cytoscape-spread';
import COSEBilkent from 'cytoscape-cose-bilkent'
import cola from 'cytoscape-cola';

import { useState, useEffect } from 'react';
import cytoscape, { EventObject } from 'cytoscape';
import Cytoscape from 'cytoscape';
import { randomUUID } from 'crypto';
import { Node as gqlNode, GetNeighborsDocument, IsDependency,  GetPkgQuery, GetPkgQueryVariables, PkgSpec , GetPkgDocument, AllPkgTreeFragment, Package, PackageNamespace, PackageName, PackageVersion ,CertifyPkg} from '../gql/__generated__/graphql';
import { Node, Edge, GraphData, ParseNode} from "./ggraph";
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import client from 'apollo/client'



Cytoscape.use(Spread);
Cytoscape.use(COSEBilkent);
Cytoscape.use(cola);

type GraphProps = {
  graphData?: GraphData;
  layout?: string;
  writeDetails?: (x: any) => void;
};

class GuacNode {
  nodeId: number;
  nodeType: string;
  data: undefined;

  constructor(nodeData: any) {

    // parse graphql data and determine what the node id and nodeType is and put the entire dict in data for JSON output
    this.nodeId = nodeData.nodeId;
    this.nodeType = "something";
    this.data = nodeData;
  }
}

type GraphRep = {
  nodes : Map<string, Node>;
  edges: Map<string, Edge>;
}

function gDataToRep (d : GraphData) :GraphRep {
  const nTuple = d.nodes.map((v) => [v.data.id, v]);
  const eTuple = d.edges.map((v) => [v.data.id, v]);
  
  return {
          nodes: new Map<string,Node>(nTuple),
          edges: new Map<string,Edge>(eTuple),
        }
    
}

function gRepToData (d : GraphRep) :GraphData {
  const g : GraphData = {
      nodes: Array.from(d.nodes, v=> v[1]),
      edges: Array.from(d.edges, v => v[1]),
  }
  return g;
}

type NodeId = number;

function guacToCy(n:GuacNode):  Node {
  return {
    data : {
      id: n.nodeId.toString(),
      label: n.nodeType,
      type: n.nodeType,
    }
  }
}



const defaultGraphData: GraphData = {
  nodes: [
    { data: { id: "1", label: "Identity 1", type: "id" } },
    { data: { id: "2", label: "Software 1", type: "software" } },
    { data: { id: "3", label: "Identity 2", type: "id" } },
    { data: { id: "4", label: "Software 2", type: "software" } },
    { data: { id: "5", label: "Software 3", type: "software" } },
    { data: { id: "6", label: "Identity 3", type: "id" } },
    { data: { id: "7", label: "Software 5", type: "software" } },
    { data: { id: "8", label: "Software 6", type: "software" } },
    { data: { id: "9", label: "Software 7", type: "software" } },
    { data: { id: "10", label: "Software 8", type: "software" } },
    { data: { id: "11", label: "Software 9", type: "software" } },
    { data: { id: "12", label: "Identity 3", type: "id" } },
    { data: { id: "13", label: "Software 10", type: "software" } }
  ],
  edges: [
    {
      data: { source: "1", target: "2", label: "Node2" }
    },
    {
      data: { source: "3", target: "4", label: "Node4" }
    },
    {
      data: { source: "3", target: "5", label: "Node5" }
    },
    {
      data: { source: "6", target: "5", label: " 6 -> 5" }
    },
    {
      data: { source: "6", target: "7", label: " 6 -> 7" }
    },
    {
      data: { source: "6", target: "8", label: " 6 -> 8" }
    },
    {
      data: { source: "6", target: "9", label: " 6 -> 9" }
    },
    {
      data: { source: "3", target: "13", label: " 3 -> 13" }
    }
  ]
};

let refCy :cytoscape.Core;
export default function Graph(props: GraphProps) {
  

  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("800px");
  const [dataCount, setDataCount] = useState(0);
  const [expandDepth, setExpandDepth] = useState("3");

  const [graphDesiredState, setGraphDesiredState] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
  const [neighborsDesired, setNeighborsDesired] = useState([]);
  const [gotNeighbors, setGotNeighbors] = useState(new Set<number>());



  const [graphData, setGraphData] = useState({nodes: new Map(), edges:new Map()});
  //const graphData = props.graphData;
  
  useEffect( () => {
    if (props.graphData && props.graphData.nodes.length > 0 && graphData.nodes.size ==0) {
      setGraphData(gDataToRep(props.graphData));
    }
  }, [props.graphData, graphData]);
  

  //console.log("gdata", graphData);
  
  //console.log(props.graphData)
  const layout = {
    name: props?.layout ?? "breadthfirst",
    fit: true,
    directed: true,
    padding: 50,
    idealEdgeLength: 100,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  }
  //refCy.layout(layout).run()
  
  useEffect(() => {
    // some bad heuristic to run data once new data is found
    if (graphData != undefined && dataCount != graphData.nodes.keys.length) {
  
      //refCy.layout(layout).run();
      setDataCount(graphData.nodes.keys.length);
    }
  });

  const styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#4a56a6",
        width: 30,
        height: 30,
        label: "data(label)",
        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "white",
        fontSize: 20
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        width: 30,
        height: 30,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 8
      }
    },
    {
      selector: "node[type='software']",
      style: {
        shape: "rectangle"
      }
    },
    {
      selector: "node[type='IsDependency']",
      style: {
        shape: "rectangle",
        "background-color": "yellow",
      }
    },
    {
      selector: "node[type='IsOccurrence']",
      style: {
        shape: "square",
        "background-color": "pink",
      }
    },
    {
      selector: "node[type='Source']",
      style: {
        "background-color": "green",
      }
    },
    {
      selector: "node[type='Artifact']",
      style: {
        "background-color": "red",
      }
    },
    {
      selector: "node[type='CertifyPkg']",
      style: {
        shape: "triangle",
        "background-color": "white",
      }
    },
    {
      selector: "node[type='PackageVersion']",
      style: {
        shape: "hexagon",
        "background-color": "orange",
      }
    },
    {
      selector: "node[type='PackageName']",
      style: {
        shape: "hexagon",
        "background-color": "purple",
      }
    },
    {
      selector: "node[type='id']",
      style: {
        shape: "triangle",
        "background-color": "#EB3434"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        'font-size': 5,
        'text-rotation': 'autorotate',
        'text-margin-y': '-10px',
        'text-background-color': '#fff',
        'text-background-opacity': 0.7,
        'text-background-padding': '1px',
        'text-background-shape': 'roundrectangle',
        'text-border-color': '#000',
        'text-border-opacity': 0.1,
        'text-border-width': '0.5px',
        "label": "data(label)",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    },
    {
      selector: "node[expanded!='true']",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        width: 30,
        height: 30,
      }
    },
  ];

  let nodeTapHandler = (evt: EventObject) => {
    var node = evt.target;    
    if (props.writeDetails != undefined) {
      props.writeDetails(node.data());
    }    
  }

  async function expandNode (id : string) {

    let addedNodes : Node[][] =[];
    let addedEdges : Edge[][] =[];

    await client.query({
      query: GetNeighborsDocument,
      fetchPolicy: "no-cache" ,
      variables: { nodeId: id},
    },
    ).then(result => {
      console.log(id, "neighbors", result.data);
      const neighbors = result.data.neighbors;
      neighbors.forEach((n,i) => {
          let gd = ParseNode(n as gqlNode);
          

          if (gd == undefined) {
            return;
          }

          addedNodes[i] =[];
          addedEdges[i] = [];
          gd.nodes.forEach((nn) =>{
              addedNodes[i] = [...addedNodes[i], nn];
          });

          gd.edges.forEach((e) =>{
            addedEdges[i] = [...addedEdges[i], e];
          });
      });
      
      
    }).finally( () =>{
      let addNodes : Node[] = [];
      let addEdges : Edge[] = [];
      addedNodes.forEach((n) => addNodes = [...addNodes, ...n]);
      addedEdges.forEach((n) => addEdges = [...addEdges, ...n]);
      let nMap : Map<string, Node> = new Map(graphData.nodes);
      let eMap : Map<string, Edge> = new Map(graphData.edges);

      addNodes.forEach((n) => nMap.set(n.data.id, n));
      addEdges.forEach((n) => eMap.set(n.data.id, n));
      // set original node as expanded
      const origNode = nMap.get(id);
      if (origNode != undefined) {
        origNode.data.expanded = "true";
        nMap.set(id, origNode);
      }
      // move outside so that it can be done in a single call event for frontier
      setGraphData({
        nodes: nMap,
        edges: eMap,
      });
    }
    );
  }

  let nodeCxttapHandler = (evt: EventObject) => {
    // TODO: This should potentially run additional queries that then update the component state
    //console.log("EVT", evt.target);
    
    const node = evt.cy.getElementById(evt.target.id()).nodes()[0][0];
    //node = "true";
    console.log(node);
    //evt.cy.data(node.data);

    expandNode(evt.target.id());
    return;
  }


  let expandFrontier = () => {
    console.log("expand frontier");
    if (refCy === undefined){
      return;
    }
    const frontier = refCy.nodes().filter('[expanded!="true"]');
    console.log("frontier", frontier);
    
    frontier.forEach((n) => {
       expandNode(n.id());
    });
    
    //console.log(graphData);
    //console.log(refCy);
    //console.log(refCy.json());
    //refCy.add({ data: { id: "abc",label: "FJIOEJIOWFJEIOWJFOEIWFJEIOWJFEWOFIJEIOF 10", type: "fewafawefawef" } });
    //graphData.nodes.push({ data: { id: "abc",label: "FJIOEJIOWFJEIOWJFOEIWFJEIOWJFEWOFIJEIOF 10", type: "fewafawefawef" } });
    //setGraphData(graphData);
    
  }

  function gdataPreprocess (d : GraphData) :GraphData {
    return {
        nodes: Array.from(d.nodes),
        edges: Array.from(d.edges),
    }
  }

  console.log(graphData);
  return (
    <>
    <input type="text" pattern="[0-9]*" onChange={e => setExpandDepth(e.target.value)} value={expandDepth}/>
    <button onClick={expandFrontier}> Expand </button>
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(gRepToData(graphData))}
      style={{ width: width, height: height }}
      zoomingEnabled={true}
      maxZoom={3}
      minZoom={0.1}
      autounselectify={false}
      boxSelectionEnabled={true}
      layout={layout}
      stylesheet={styleSheet}
      cy={cy => {
        refCy = cy;
        cy.removeListener('tap');
        cy.removeListener('cxttap');
        cy.on("tap", "node", evt => nodeTapHandler(evt));
        cy.on("cxttap", "node", evt => nodeCxttapHandler(evt));
        cy.batch(() => {cy.layout(layout).run()});
      }}
    />
    </>
  )
}

