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

type NodeId = number;

class GuacGraphHelper {
  frontier: GuacNode[];
  nodeMap: Map<number,GuacNode>;
  expandedMap: Map<number,boolean>;

  constructor(message: string) {
    this.frontier = [];
    this.nodeMap = new Map<NodeId, GuacNode>;
    this.expandedMap = new Map<NodeId, boolean>;
  }
  // populateData will take a node and figure out the other nodes and edges to create and
  // - update the frontier by removing itself and adding the new nodes
  // - adding the new nodes to the nodeMap
  // - adding the new nodes and edges to cytoscape graph
  private populateData (node:GuacNode) {

  }

  public expandNode(id: NodeId) {
    const n = this.getNodeEdges(id);
    // check if n is null and populate if it is not.
    this.populateData(n);
  }

  public getNodeEdges(id: NodeId) : GuacNode {
    // check if it is in expnaded map, if its not been expanded, query for node (with its edge properties), else return null
    return new GuacNode({});
  }

  public expandFrontier() {
    const currentFrontier = Object.assign([], this.frontier);
    currentFrontier.forEach((n)=>
      this.expandNode(n)
    );
  }
}


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

  const [graphDesiredState, setGraphDesiredState] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
  const [neighborsDesired, setNeighborsDesired] = useState([]);
  const [gotNeighbors, setGotNeighbors] = useState(new Set<number>());



  //const [graphData, setGraphData] = useState(props?.graphData ?? defaultGraphData);
  const graphData = props.graphData;
  


  
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
    if (graphData != undefined && dataCount != graphData.nodes.length) {
      refCy.layout(layout).run();
      setDataCount(graphData.nodes.length);
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
    }
  ];

  let nodeTapHandler = (evt: EventObject) => {
    var node = evt.target;    
    if (props.writeDetails != undefined) {
      props.writeDetails(node.data());
    }    
  }


  let nodeCxttapHandler = (evt: EventObject) => {
    var node = evt.target;
    // TODO: This should potentially run additional queries that then update the component state
    console.log("EVT", evt.target.id());

    client.query({
      query: GetNeighborsDocument,
      fetchPolicy: "no-cache" ,
      variables: { nodeId: evt.target.id()},
    },
    ).then(result => {
      console.log(evt.target.id(), "neighbors", result.data);
      const neighbors = result.data.neighbors;
      neighbors.forEach((n) => {
          let gd = ParseNode(n as gqlNode);

          if (gd == undefined) {
            return;
          }
          gd.nodes.forEach((nn) =>{
            if (!refCy.hasElementWithId(nn.data.id)) {
              refCy.add(nn);
            }
          });

          gd.edges.forEach((e) =>{
            //e.data.id = e.data.source + "->" + e.data.target;
            if (!refCy.hasElementWithId(e.data.id)) {
              refCy.add(e);
            }
          });
          refCy.layout(layout).run();

      });
      
      
    });

  }


  let addNode = () => {
    console.log("add innode");
    console.log(graphData);
    console.log(refCy);
    console.log(refCy.json());
    //refCy.add({ data: { id: "abc",label: "FJIOEJIOWFJEIOWJFOEIWFJEIOWJFEWOFIJEIOF 10", type: "fewafawefawef" } });
    //graphData.nodes.push({ data: { id: "abc",label: "FJIOEJIOWFJEIOWJFOEIWFJEIOWJFEWOFIJEIOF 10", type: "fewafawefawef" } });
    //setGraphData(graphData);
    
  }

  return (
    <>
    <button onClick={addNode}> add node </button>
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(graphData)}
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
      }}
    />
    </>
  )
}

