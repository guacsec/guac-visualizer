'use client'; // Client side rendering required since we are using clientside specific hooks

import CytoscapeComponent from 'react-cytoscapejs'
import Spread from 'cytoscape-spread';
import COSEBilkent from 'cytoscape-cose-bilkent'
import cola from 'cytoscape-cola';

import { useState, useEffect } from 'react';
import cytoscape, { EdgeCollection, EventObject } from 'cytoscape';
import Cytoscape from 'cytoscape';
import { randomUUID } from 'crypto';
import { Node as gqlNode, GetNeighborsDocument } from '../gql/__generated__/graphql';
import { Node, Edge, GraphData, ParseNode, parsePackage} from "./ggraph";
import { gql, useQuery, useLazyQuery, ApolloQueryResult} from '@apollo/client';
import client from 'apollo/client'



Cytoscape.use(Spread);
Cytoscape.use(COSEBilkent);
Cytoscape.use(cola);

type GraphProps = {
  graphData?: GraphData;
  layout?: string;
  writeDetails?: (x: any) => void;
};

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

const defaultStyleSheet = [
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
      //"border-opacity": "0.5",
      //"background-color": "#77828C",
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
      "background-color": "magenta",
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
  {
    selector: "edge.path",
    style: {
      "line-color": "red",
      width: 5,
      "z-index": 1,
    }
  },
  {
    selector: "node.path",
    style: {
      width: 50,
      height: 50,
    }
  }
];

let refCy :cytoscape.Core;
export default function Graph(props: GraphProps) {
  

  const [width, setWidth] = useState("80%");
  const [height, setHeight] = useState("800px");
  const [expandOptions, setExpandOptions] = useState("expandDepMetadata");
  const [dataCount, setDataCount] = useState(0);
  const [expandDepth, setExpandDepth] = useState("3");

  // PATH STUFF
  const [pathStartToggle, setPathStartToggle] = useState(false);
  const [pathStartNode, setPathStartNode] = useState("");
  const [pathEndToggle, setPathEndToggle] = useState(false);
  const [pathEndNode, setPathEndNode] = useState("");

  // GRAPH STUFF
  const [styleSheet, setStyleSheet] = useState(defaultStyleSheet);
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

  

  let nodeTapHandler = (evt: EventObject) => {
    var node = evt.target;    
    if (pathStartToggle) {
        setPathStartNode(evt.target.id());
        setPathStartToggle(false);
    }
    if (pathEndToggle) {
      setPathEndNode(evt.target.id());
      setPathEndToggle(false);
  }
    //expandNode2([evt.target.id()]);
    if (props.writeDetails != undefined) {
      props.writeDetails(node.data());
    }    
  }

  function getFilters(startNode : Node, graphRep : GraphRep) : (n:gqlNode) => boolean {

    if (expandOptions=="expandAll") {
      return (n) => true;
    }
    
    let startType = startNode.data.type;
    let startId = startNode.data.id;
    const alwaysFalse = (_:gqlNode) => {return false};
    // do not expand top level nodes
    if (startType == "PackageType" || startType == "PackageNamespace") {
      return alwaysFalse;
    }
    if (startType == "SourceType" || startType == "SourceNamespace") {
      return alwaysFalse;
    }

    let versions : Set<string>;
    if (startType == "PackageName") {
      const depNodes = [...graphRep.edges].map(([_,value]) => value).filter((d)=> d.data.target == startId && d.data.label == "depends_on");
      versions = new Set(depNodes.map((d) => graphRep.nodes.get(d.data.source).data.versionRange));
    }
    console.log("versions",versions);

    const nFilter = (n: gqlNode) => {
      const nType = n.__typename;

      
      // need to add special case for name expandsion with IsDepedency

      // TODO: need to revisit logic
      let gd, target;
      switch (nType) {
        case "IsDependency":
          // only return true if start node is the subject 
          [gd, target] = parsePackage(n.package);
          return target.data.id == startId;
        case "Package":
          console.log("the node", n);
        
          [gd, target] = parsePackage(n);
          if (target.data.type == "PackageVersion") {
            console.log("target",target);
            if (versions == undefined) {
              return false;
            }
            if (versions.has(target.data.version)) {
              return true;
            } else {
              return false;
            }
          }

      }
      
      return true;
    };
    return nFilter;
  }
  async function expandNode (ids : string[], graphRep : GraphRep | undefined) : Promise<GraphRep> {

    let addedNodes : Node[][] =[];
    let addedEdges : Edge[][] =[];
    let ret: GraphRep;

    let promises = ids.map((id) =>  
      client.query({
        query: GetNeighborsDocument,
        fetchPolicy: "no-cache" ,
        variables: { nodeId: id},
      })
    );

    await Promise.all(promises).then((values) => {
        console.log(values);
        values.forEach((result,idx) => {
          const id = ids[idx];
          console.log(id, "neighbors", result.data);
          const neighbors = result.data.neighbors;
          addedNodes[idx] =[];
          addedEdges[idx] = [];

          // have filter here on type of nodes
          const nFilter = getFilters(graphRep.nodes.get(id), graphRep);
          neighbors.forEach((n,i) => {

              if (!nFilter(n as gqlNode)) { return };
              let gd = ParseNode(n as gqlNode);

              if (gd == undefined) {
                return;
              }
              
              const excludeNodes = new Set<string>();
              gd.nodes.forEach((nn) =>{
               
                  addedNodes[idx] = [...addedNodes[idx], nn];
               
              });

              gd.edges.forEach((e) =>{
                // console.log(excludeNodes);
                // console.log(e.data);
                // if (!excludeNodes.has(e.data.source) && !excludeNodes.has(e.data.target)) {
                  addedEdges[idx] = [...addedEdges[idx], e];
                // }
              });
            });
        });

        let addNodes : Node[] = [];
        let addEdges : Edge[] = [];
        addedNodes.forEach((n) => addNodes = [...addNodes, ...n]);
        addedEdges.forEach((n) => addEdges = [...addEdges, ...n]);
        let nMap : Map<string, Node> = new Map(graphRep.nodes);
        let eMap : Map<string, Edge> = new Map(graphRep.edges);
  
        addNodes.forEach((n) =>  {if (!nMap.has(n.data.id)) {nMap.set(n.data.id, n)}});
        addEdges.forEach((n) =>  {if (!eMap.has(n.data.id)) {eMap.set(n.data.id, n)}});
        // set original node as expanded
        ids.forEach((k)=> {
        const origNode = nMap.get(k);
        if (origNode != undefined) {
          origNode.data.expanded = "true";
          nMap.set(k, origNode);
        }
        });

        // move outside so that it can be done in a single call event for frontier
        ret =({
          nodes: nMap,
          edges: eMap,
        });
    });
    return ret;
  }


  let nodeCxttapHandler = (evt: EventObject) => {
    // TODO: This should potentially run additional queries that then update the component state
    //console.log("EVT", evt.target);
    
    const node = evt.cy.getElementById(evt.target.id()).nodes()[0][0];
    //node = "true";
    console.log(node);
    //evt.cy.data(node.data);

    const gr = expandNode([evt.target.id()], graphData);
    gr.then((v) => setGraphData(v));
    return;
  }


  let expandFrontier = () => {
    console.log("expand frontier");
    if (refCy === undefined){
      return;
    }
    
    async function wrapPromise (p : Promise<GraphRep>, depth : number)  : Promise<GraphRep> {
      if (depth === 0) {
        return p;
      }

      return wrapPromise(p, depth-1)
       .then((graph) => {
         const frontier = [...graph.nodes].map(([_,v])=> v).filter((v)=> v.data.expanded != "true")
         const ids = frontier.map((n)=>n.data.id);
         console.log("frontier", ids);
         return expandNode(ids, graph);
       });
    }
    
    //expandNode(ids);
    let cacheGraph = graphData;
    let grPromise = wrapPromise(Promise.resolve(graphData), parseInt(expandDepth));
    grPromise.then((g) => setGraphData(g));
    /*
    for (let i=0; i<parseInt(expandDepth); i++) {
      //const frontier = refCy.nodes().filter('[expanded!="true"]');
      const frontier = [...cacheGraph.nodes].map(([_,v])=> v).filter((v)=> v.data.expanded != "true")
      const ids = frontier.map((n)=>n.data.id);
      console.log("frontier", ids);
      const gr = expandNode(ids, cacheGraph);
      gr.then((v) => cacheGraph = v);
    }
    */
    
    /*
    frontier.forEach((n) => {
       expandNode(n.id());
    });
    */
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

  const checkList = ["Artifact", "Builder", "Cve", "CertifyBad", "CertifyGood", "CertifyScorecard", "CertifyVexStatement", "CertifyVuln", "Ghsa", "HasSbom", "HasSlsa", "HasSourceAt", "HashEqual", "IsDependency", "IsOccurrence", "IsVulnerability", "Osv", "PkgEqual", "Source"];
  
  function setHighlightNodes (nodeType: string, checked: boolean) {
    let gNodes = [...graphData.nodes].filter(([idx, v]) => v.data.type == nodeType).map(([idx,v]) => idx);
    console.log(nodeType);
    console.log(gNodes);

    //console.log(refCy.style().selector("node[type='software']"));
    
    let newStyle = {
      "border-width": checked? "20px" : "0px",
      //"overlay-color": checked? "yellow" : "white",
    }
    if (refCy != undefined) {
      setStyleSheet(refCy.style().selector("node[type='" + nodeType + "']").style(newStyle).json());
    }
  }
  function clearPath() {
    setPathStartNode("");
    setPathEndNode("");
    setPathStartToggle(false);
    setPathEndToggle(false);
  }

  console.log(graphData);
  return (
    <>
    <select value={expandOptions}  onChange={e => setExpandOptions(e.target.value)}>
      <option value="expandDepMetadata">Expand Dep metadata</option>
      <option value="expandAll">Expand all</option>
    </select>

    <input type="text" pattern="[0-9]*" maxLength={3} onChange={e => setExpandDepth(e.target.value)} value={expandDepth}/>
    <button onClick={expandFrontier}> Expand </button>
    <br />

    <div id="path">
        <button onClick={() => { setPathStartToggle (!pathStartToggle); setPathEndToggle(false); }} >Set start node</button>
        <p> {pathStartToggle? "click node to set" : (pathStartNode!="" ?  pathStartNode:"NONE")} </p>

        <button onClick={() => { setPathEndToggle (!pathEndToggle); setPathStartToggle(false); }} >Set target node</button>
        <p> {pathEndToggle? "click node to set" : (pathEndNode!="" ?  pathEndNode:"NONE")} </p>
        <button onClick={clearPath}>CLEAR</button>
    </div>
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(gRepToData(graphData))}
      style={{ width: width, height: height , float: "left"}}
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
        if (pathStartNode != "" && pathEndNode != "") {
          console.log('running astar');
          var aStar = cy.elements().aStar({ root: "#" + pathStartNode, goal: "#" + pathEndNode, weight: (e:EdgeCollection)=>{ 
            // Set weight on software tree edges as lower weight since we favor finding the path that goes through
            // evidence instead of going through the sw tree.
            let badEdgeSet = new Set([
              "pkgVersion", "pkgName", "pkgNs",
              "srcVersion", "srcName", "srcNs",
            ])
            if (badEdgeSet.has(e[0].data().label)) {
              return 100;
            } else {
              return 1;
            }
          } 
          });
          aStar.path.select();
          cy.elements().not( aStar.path ).removeClass('path');
          aStar.path.addClass('path');
        } else {
          cy.elements().removeClass('path');
        }
        cy.batch(() => {cy.layout(layout).run()});
      }}
    />
    <div className="checkList">
    <div className="title">Highlight nodes</div>
    <div className="list-container">
      {checkList.map((item, index) => (
         <div key={index}>
          <input value={item} onChange={(e)=> setHighlightNodes(item, e.target.checked)} type="checkbox" />
           <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
    </>
  )
}

