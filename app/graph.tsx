'use client'; // Client side rendering required since we are using clientside specific hooks

import CytoscapeComponent from 'react-cytoscapejs'
import Spread from 'cytoscape-spread';
import COSEBilkent from 'cytoscape-cose-bilkent'
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';


import { graphStyleSheet , hiddenGraphStyleSheet } from './style';
import { useState, useEffect, useMemo, memo} from 'react';
import cytoscape, { EdgeCollection, EventObject } from 'cytoscape';
import Cytoscape from 'cytoscape';
import { randomUUID } from 'crypto';
import { Node as gqlNode, GetNeighborsDocument, IsDependency, Edge as GqlEdge, Package} from '../gql/__generated__/graphql';
import { Node, Edge, GraphData, ParseNode, parsePackage} from "./ggraph";
import { gql, useQuery, useLazyQuery, ApolloQueryResult} from '@apollo/client';
import client from 'apollo/client'
import { MultiSelect } from "react-multi-select-component";
import { PaginatedList } from "react-paginated-list";

// Cytoscape.use(Spread);
// Cytoscape.use(COSEBilkent);
Cytoscape.use(dagre);


Cytoscape.use(cola);
/*
const MemoedGraph = memo(CytoscapeComponent, (prev, next)=> {
  console.log(prev.elements,next.elements);
  console.log(next);
  const check = JSON.stringify(prev.elements) == JSON.stringify(next.elements);
  if (check) { next.cy(refCy); }
  console.log("memo check",check);
  return false;
});
*/



type GraphProps = {
  graphData?: GraphData;
  layout?: string;
  startNode?: string;
  writeDetails?: (x: any) => void;
};

export type GraphRep = {
  nodes : Map<string, Node>;
  edges: Map<string, Edge>;
}

export function processDataForCytoscape (data : gqlNode[]) : [string | undefined, any] {
  if (data == undefined) {
    return ["", undefined];
  }
  let nodes: Node[] = [];
  let edges: Edge[] = [];

  let startNode : string = undefined;
  data.forEach((p :gqlNode, index) => {

    const gd  = ParseNode(p);
    //let [gd, target] = parsePackage(p);
    //startNode = target.data.id;
    if (gd!= undefined) {
      nodes = [...nodes, ...gd.nodes];
      edges = [...edges, ...gd.edges];
    }
    // Create nodes for package and dependentPackage

  });

  const pVers = nodes.filter((v)=> v.data.type == "PackageName");
  console.log(pVers);
  if (pVers.length >0) {
    startNode = pVers[0].data.id;
  }


  return [startNode, { nodes, edges }];
};


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

const defaultStyleSheet = graphStyleSheet;

let refCy :cytoscape.Core;
export default function Graph(props: GraphProps) {
  
  // STATES
  const [width, setWidth] = useState("80%");
  const [height, setHeight] = useState("800px");
  const [frontierEmpty, setFrontierEmpty] = useState(false);
  const [expandedDepth, setExpandedDepth] = useState(0);
  const [expandOptions, setExpandOptions] = useState("expandDependencies");
  const [dataCount, setDataCount] = useState(0);
  const [expandDepth, setExpandDepth] = useState("3");
  const [loading, setLoading] = useState(false);
  const headless = false;
  const [paths, setPaths] = useState<cytoscape.CollectionReturnValue[]>([]);


  // PATH STUFF
  const [pathStartToggle, setPathStartToggle] = useState(false);
  const [pathStartNode, setPathStartNode] = useState(props.startNode? props.startNode : "");
  const [pathEndToggle, setPathEndToggle] = useState(false);
  const [pathEndNode, setPathEndNode] = useState("");
  const [hideNonPathNodes, setHideNonPathNodes] = useState(false);

  // Explorer stuff
  const toEOpt = (s: string) => {return { label: s, value: s}}
  const explorerOptions = ["Artifact", "Builder", "Cve", "CertifyBad", "CertifyGood", "CertifyScorecard", "CertifyVexStatement", "CertifyVuln", "Ghsa", "HasSbom", "HasSlsa", "HasSourceAt", "HashEqual", "IsDependency", "IsOccurrence", "IsVulnerability", "Osv", "PkgEqual", "PackageVersion", "SourceName","PackageName"].map(toEOpt);
  const [explorerList, setExplorerList] = useState([]);

  // GRAPH STUFF
  const [styleSheet, setStyleSheet] = useState(defaultStyleSheet);
  const [graphData, setGraphData] = useState(props.graphData? gDataToRep(props.graphData): {nodes: new Map(), edges:new Map()});
  //const graphData = props.graphData;
  
  const processedGraphData = useMemo(() => {
    console.log("memo process graphdata");
    return CytoscapeComponent.normalizeElements(gRepToData(graphData));
  }, [graphData]);

  const showGraph = processedGraphData.length <= 3000;

  //console.log("gdata", graphData);
  
  //console.log(props.graphData)
  const layout = {
    name: props?.layout ?? "dagre",
    // name: "dagre",
    fit: true,
    directed: true,
    padding: 50,
    idealEdgeLength: 100,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    layoutstart: () => {setLoading(true); console.log("layout start")},
    ready: ()=>{setLoading(false); console.log("layout ready")},
    stop: ()=>{setLoading(false); console.log("layout stop")},
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
    console.log(node.data());

    if (props.writeDetails != undefined) {
      props.writeDetails(node.data());
    }    
  }

  // function getEdgeFilters() {
  //   const allEdges : GqlEdge[] = Object.values(GqlEdge);

  //   const someEdges : GqlEdge[] = [ 
  //       "ARTIFACT_CERTIFY_BAD",
  //       "ARTIFACT_CERTIFY_GOOD",
  //       "ARTIFACT_CERTIFY_VEX_STATEMENT",
  //       "ARTIFACT_HASH_EQUAL",
  //       "ARTIFACT_HAS_SLSA",
  //       "ARTIFACT_IS_OCCURRENCE",
  //       "BUILDER_HAS_SLSA",
  //       "CVE_CERTIFY_VEX_STATEMENT",
  //       "CVE_CERTIFY_VULN",
  //       "CVE_IS_VULNERABILITY",
  //       "GHSA_CERTIFY_VEX_STATEMENT",
  //       "GHSA_CERTIFY_VULN",
  //       "GHSA_IS_VULNERABILITY",
  //       "NO_VULN_CERTIFY_VULN",
  //       "OSV_CERTIFY_VEX_STATEMENT",
  //       "OSV_CERTIFY_VULN",
  //       "OSV_IS_VULNERABILITY",
  //       "PACKAGE_CERTIFY_BAD",
  //       "PACKAGE_CERTIFY_GOOD",
  //       "PACKAGE_CERTIFY_VEX_STATEMENT",
  //       "PACKAGE_CERTIFY_VULN",
  //       "PACKAGE_HAS_SBOM",
  //       "PACKAGE_HAS_SOURCE_AT",
  //       "PACKAGE_IS_DEPENDENCY",
  //       "PACKAGE_IS_OCCURRENCE",
  //       "PACKAGE_PKG_EQUAL",
  //       "SOURCE_CERTIFY_BAD",
  //       "SOURCE_CERTIFY_GOOD",
  //       "SOURCE_CERTIFY_SCORECARD",
  //       "SOURCE_HAS_SBOM",
  //       "SOURCE_HAS_SOURCE_AT",
  //       "SOURCE_IS_OCCURRENCE",
  //       "CERTIFY_BAD_ARTIFACT",
  //       "CERTIFY_BAD_PACKAGE",
  //       "CERTIFY_BAD_SOURCE",
  //       "CERTIFY_GOOD_ARTIFACT",
  //       "CERTIFY_GOOD_PACKAGE",
  //       "CERTIFY_GOOD_SOURCE",
  //       "CERTIFY_SCORECARD_SOURCE",
  //       "CERTIFY_VEX_STATEMENT_ARTIFACT",
  //       "CERTIFY_VEX_STATEMENT_CVE",
  //       "CERTIFY_VEX_STATEMENT_GHSA",
  //       "CERTIFY_VEX_STATEMENT_OSV",
  //       "CERTIFY_VEX_STATEMENT_PACKAGE",
  //       "CERTIFY_VULN_CVE",
  //       "CERTIFY_VULN_GHSA",
  //       "CERTIFY_VULN_NO_VULN",
  //       "CERTIFY_VULN_OSV",
  //       "CERTIFY_VULN_PACKAGE",
  //       "HASH_EQUAL_ARTIFACT",
  //       "HAS_SBOM_PACKAGE",
  //       "HAS_SBOM_SOURCE",
  //       "HAS_SLSA_BUILT_BY",
  //       "HAS_SLSA_MATERIALS",
  //       "HAS_SLSA_SUBJECT",
  //       "HAS_SOURCE_AT_PACKAGE",
  //       "HAS_SOURCE_AT_SOURCE",
  //       "IS_DEPENDENCY_PACKAGE",
  //       "IS_OCCURRENCE_ARTIFACT",
  //       "IS_OCCURRENCE_PACKAGE",
  //       "IS_OCCURRENCE_SOURCE",
  //       "IS_VULNERABILITY_CVE",
  //       "IS_VULNERABILITY_GHSA",
  //       "IS_VULNERABILITY_OSV",
  //       "PKG_EQUAL_PACKAGE",
  //   ].map(x => x as GqlEdge);
  // }
  function getFilters(startNode : Node, graphRep : GraphRep) : (n:gqlNode) => boolean {

    switch (expandOptions) {
      case "expandAll":
        return (n) => true;
      case "expandDependencies":
        return getExpandDependenciesFilter(startNode, graphRep);
      case "expandDependents":
        return getExpandDependentsFilter(startNode, graphRep);
    }
    console.log("error: invalid expand options", expandOptions)
  }


  function getExpandDependenciesFilter(startNode : Node, graphRep : GraphRep) : (n:gqlNode) => boolean {    
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

    const nFilter = (n: gqlNode) => {
      const nType = n.__typename;

      
      // need to add special case for name expandsion with IsDepedency

      // TODO: need to revisit logic
      let gd, target;
      switch (nType) {
        // TODO: do HasSLSA, HasSourceAt to be the right way
        case "HasSLSA":
          return n.subject.id == startId;
        case "HasSourceAt":
          return startType != "SourceName" && startType != "SourceType" && startType != "SourceNamespace";
        case "IsDependency":
          // only return true if start node is the subject 
          [gd, target] = parsePackage(n.package);
          return target.data.id == startId;
        case "CertifyVuln":
          return !(startType == "Cve" || startType == "Osv" || startType == "Ghsa" || startType == "NoVuln")
        case "CertifyVEXStatement":
          return !(startType == "Cve" || startType == "Osv" || startType == "Ghsa" || startType == "NoVuln")
  
        case "Package":        
          [gd, target] = parsePackage(n);
          if (target.data.type == "PackageVersion") {
            if (versions == undefined) {
              return startType == "IsDependency";
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

  function getExpandDependentsFilter(startNode : Node, graphRep : GraphRep) : (n:gqlNode) => boolean {
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
      const depNodes = [...graphRep.edges].map(([_,value]) => value).filter((d)=> d.data.source == startId && d.data.label == "pkgVersion");
      console.log(depNodes);
      versions = new Set(depNodes.map((d) => graphRep.nodes.get(d.data.target).data.version));

      if (versions.has("") || versions.size == 0) {
        versions = undefined;
      }
    }

    
    console.log("VERSION_SET",versions);

    const nFilter = (n: gqlNode) => {
      const nType = n.__typename;

      
      // need to add special case for name expandsion with IsDepedency

      // TODO: need to revisit logic
      let gd, target;
      switch (nType) {
        // HasSLSA expands materials since we want to find what's dependent on it.
        case "HasSLSA":
          return startType =="Builder" || n.slsa.builtFrom.filter((a)=> a.id == startId).length > 0;

        case "IsDependency":
          // only return true if start node is the subject
          
          if (versions != undefined && !versions.has(n.versionRange)) { return false; } // if isDepedency doesn't include the version don't get its use
          [gd, target] = parsePackage(n.dependentPackage);

          return target.data.id == startId;
  
        case "Package":        
          [gd, target] = parsePackage(n);
          if (target.data.type == "PackageVersion") {
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
      
      return false;
    };
    return nFilter;
  }
  async function expandNode (ids : string[], graphRep : GraphRep | undefined) : Promise<GraphRep> {

    let addedNodes : Node[][] =[];
    let resetExpand : Set<string> = new Set();
    let addedEdges : Edge[][] =Array(ids.length);
    let ret: GraphRep;

    // let promises = ids.map((id) =>  
    //   client.query({
    //     query: GetNeighborsDocument,
    //     fetchPolicy: "no-cache" ,
    //     variables: { nodeId: id},
    //   })
    // );
    let nMap : Map<string, Node> = new Map(graphRep.nodes);
    let eMap : Map<string, Edge> = new Map(graphRep.edges);

    let promises = ids.map((id,idx) =>  {

      
      return client.query({
        query: GetNeighborsDocument,
        fetchPolicy: "no-cache" ,
        variables: { nodeId: id, edges: []},
      }).then((result)=>{
        
          console.log(id, "neighbors", result.data);
          const neighbors = result.data.neighbors;
          addedNodes[idx] =[];
          addedEdges[idx] = [];

          // have filter here on type of nodes
          const nFilter = getFilters(graphRep.nodes.get(id), graphRep);
          neighbors.forEach((n,i) => {

              if (!nFilter(n as gqlNode)) { return };
              let gd = ParseNode(n as gqlNode);


              if (n.__typename == "IsDependency") {
                const nn : IsDependency = n as IsDependency;
                resetExpand.add(nn.dependentPackage.namespaces[0].names[0].id);
              }
              if (gd == undefined) {
                return;
              }
              gd.nodes.forEach(n=> {if (!nMap.has(n.data.id)) {nMap.set(n.data.id, n)}});
              gd.edges.forEach((n) =>  {if (!eMap.has(n.data.id)) {eMap.set(n.data.id, n)}});
            });
            


        });
    });

    // TODO: can make this just return without await

    return Promise.all(promises).then((values) => {
        // set original node as expanded
        ids.forEach((k)=> {
          const origNode = nMap.get(k);
          if (origNode != undefined) {
            origNode.data.expanded = "true";
            nMap.set(k, origNode);
          }
        });

        resetExpand.forEach((pid)=> {
          const origNode = nMap.get(pid);
          if (origNode != undefined) {
            origNode.data.expanded = "false";
            nMap.set(pid, origNode);
          }
        });


        // move outside so that it can be done in a single call event for frontier
        ret =({
          nodes: nMap,
          edges: eMap,
        });
        console.log("done processing new graph");
        return ret;
    });
    
  }


  let nodeCxttapHandler = (evt: EventObject) => {
    // TODO: This should potentially run additional queries that then update the component state
    //console.log("EVT", evt.target);
    
    const node = evt.cy.getElementById(evt.target.id()).nodes()[0][0];
    //node = "true";
    console.log(node);
    //evt.cy.data(node.data);

    const gr = expandNode([evt.target.id()], graphData);
    gr.then((v) => {console.log("setting graph data");setGraphData(v)});
    return;
  }


  let expandFrontier = () => {
    setLoading(true);
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
         if (frontier.length == 0) {
          console.log("frontier empty")
          setFrontierEmpty(true)
          return graph;
         }
         const ids = frontier.map((n)=>n.data.id);
         console.log("frontier", ids);
         return expandNode(ids, graph);
       });
    }
    
    //expandNode(ids);
    let cacheGraph = graphData;
    let grPromise = wrapPromise(Promise.resolve(graphData), parseInt(expandDepth));
    grPromise.then((g) => { console.log("setGraphData"); setGraphData(g);});
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
    setExplorerList([]);
  }

  function hideNonPath() {
    // 
    setHideNonPathNodes(!hideNonPathNodes);


  }
  const weightFn = (e:EdgeCollection)=>{ 
    // Set weight on software tree edges as lower weight since we favor finding the path that goes through
    // evidence instead of going through the sw tree.
    let badEdgeSet = new Set([
      "pkgVersion", "pkgName", "pkgNs",
      "srcVersion", "srcName", "srcNs",
    ])

    if (expandOptions == "expandDependents") { 
      badEdgeSet = new Set([
        "pkgName", "pkgNs",
        "srcVersion", "srcName", "srcNs",
      ])

    }

    
    if (badEdgeSet.has(e[0].data().label)) {
      return 100000000;
    } else {
      return 1;
    }
  }

  function isValidDependentPath(path : cytoscape.CollectionReturnValue) : boolean {
    const bools = path.map((e,i)=>{
        console.log(e,i);
        if (e.isEdge()) {
          const prevNode = path[i-1].data();
          const nextNode = path[i+1].data();
          const edge = e.data();

          // Don't go down from package name
          if (edge.label == "pkgVersion") {
            if (prevNode.type == "PackageName") {
              return false;
            }
          }

          // Don't go down from package name
          if (edge.label == "IsDependency_subject") {
            if (prevNode.type == "PackageVersion") {
              return false;
            }
          }

        }
        return true;
    })

    return bools.filter((n)=> !n).length==0;
  }

  function headlessPath() {
    const cy = refCy;
    if (cy == undefined) { return; }
    
    cy.elements().removeClass(['path','pathSource', 'pathTarget']);

    let bf = cy.elements().bellmanFord({ root: "#" + pathStartNode, weight: weightFn, directed: false});
    const filterSet = new Set(explorerList.map((v)=> v.value));
    const targetNodes = cy.nodes().filter((n)=> { return filterSet.has(n.data().type); });
    cy.getElementById(pathStartNode).addClass('pathSource');

    console.log("bf", targetNodes);
    let paths : cytoscape.CollectionReturnValue[] = [];
    targetNodes.forEach((n)=> {
      const t = n.id();

      const path = bf.pathTo(n);
      console.log("path",path)
      if (isValidDependentPath(path)) {
        n.addClass('pathTarget');
        path.addClass('path');
        
        //path.select();
        paths = [...paths,path];
      }
    });
    
    console.log(paths);
    setPaths(paths.sort((a,b)=> a.length - b.length));

  }

  function collectionToPathString (p : cytoscape.CollectionReturnValue) {
    
    const lab = (data) => {
      return data.type == "PackageName" ? "(" + data.label + ")":"";
    }
    let pathName = "";

    const pfirstLabel = lab(p.first().data())
    const pLastLabel = lab(p.last().data())
    if (p.first().isNode() && p.last().isNode()) {
      pathName = p.first().data().type + pfirstLabel + " to " + p.last().data().type + pLastLabel + ":";
    }
    return pathName + p.filter(e => e.isEdge()).map(e => e.id()).join(",");
  }

  function getPathString (p : cytoscape.CollectionReturnValue) {
    return "path=" + "[" + p.filter(e => e.isNode()).map(e => e.id()).join(",") + "]";
  }
  function getVisualizeLink (p : cytoscape.CollectionReturnValue) {
    return "visualize?" + getPathString(p);
  }

  function pathToOutput (p : cytoscape.CollectionReturnValue) {
    return <><p><a href={getVisualizeLink(p)} target="_blank" rel="noreferrer">[Click to visualize]   </a>{collectionToPathString(p)}</p></>
  }

  function getMultiPath(paths : cytoscape.CollectionReturnValue[]) {
    return "visualize?" + paths.map(getPathString).join('&');
  }
  
  console.log(graphData);
  return (
    <>
    <h1>Node count: {graphData.nodes.size}, Edge count: {graphData.edges.size}</h1>
    <h2>{frontierEmpty && "Frontier is empty"}</h2>
    {
    <div>
      <h4>Graph is too big to show on Web UI, you may still perform operations on it but it will not show</h4>
      <p>For example, the path controls will still work, with the exception that finding the path will require clicking
        the below button, which will show paths directly here.
      </p>
      <p>These path strings can then be opened in the graph viewer</p>
      <button onClick={headlessPath}>find paths</button>
      <p>explore paths (limited to 20):</p>
      {(paths.length <= 20 && paths.length >0) && <><p><a href={getMultiPath(paths)} target="_blank" rel="noreferrer">[Click to visualize]   </a>all paths in page</p></>}
      <PaginatedList
        list={paths}
        itemsPerPage={20}
        renderList={(list) => (
          <>
            <p><a href={getMultiPath(list)} target="_blank" rel="noreferrer">[Click to visualize]   </a>all paths in page</p>
            {list.map((p, id) => {
              return (
                <div key={id}>
                  {pathToOutput(p)}
                </div>
              );
            })}
          </>
        )}
      />
    </div>}
    <h2>{loading? "Loading" : ""}</h2>
    
    <div key="controls" style={{
      float: "left",
    }}>
    <div id="expander">
      <h3>node expander</h3>
      <select value={expandOptions}  onChange={e => setExpandOptions(e.target.value)}>
        <option value="expandDependencies">Expand Dependencies</option>
        <option value="expandDependents">Expand Dependents</option>
        <option value="expandAll">Expand all</option>
      </select>

      <input type="text" pattern="[0-9]*" maxLength={3} onChange={e => setExpandDepth(e.target.value)} value={expandDepth}/>
      <button onClick={expandFrontier}> Expand </button>
      <br />
    </div>
    <div id="path">
      <h3>node pather</h3>
        <button onClick={() => { setPathStartToggle (!pathStartToggle); setPathEndToggle(false); }} >Set start node</button>
        <p> {pathStartToggle? "click node to set" : (pathStartNode!="" ?  pathStartNode:"NONE")} </p>

        <button onClick={() => { setPathEndToggle (!pathEndToggle); setPathStartToggle(false); }} >Set target node</button>
        <p> {pathEndToggle? "click node to set" : (pathEndNode!="" ?  pathEndNode:"NONE")} </p>
    </div>
    <div id="explorer">
      <h3>node explorer</h3>
        <button onClick={() => { setPathStartToggle (!pathStartToggle); setPathEndToggle(false); }} >Set start node</button>
        <p> {pathStartToggle? "click node to set" : (pathStartNode!="" ?  pathStartNode:"NONE")} </p>
        
        <pre>{JSON.stringify(explorerList)}</pre>
        <MultiSelect
          options={explorerOptions}
          value={explorerList}
          onChange={(setExplorerList)}
          labelledBy="Select"
        />
    </div>
    <div> 
      <h3>path shared controls</h3>
      <button onClick={clearPath}>CLEAR ALL</button>
      <button onClick={hideNonPath}>Hide non-path nodes</button>

      
    </div>
    <button onClick={() =>{
      const pathElements = refCy.elements(".path");
      
      if (pathElements == undefined || pathElements.length == 0) {
        setLoading(true);
        refCy.layout(layout).run();
      } else {
        setLoading(true);
        pathElements.layout(layout).run();
      }
      }}>layout run</button>
  {/* end controls block */}
  </div> 
  { (showGraph) &&
    <CytoscapeComponent
      elements={processedGraphData}
      style={{ width: width, height: height , float: "right"}}
      zoomingEnabled={true}
      maxZoom={3}
      minZoom={0.1}
      autounselectify={false}
      boxSelectionEnabled={true}
      layout={layout}
      stylesheet={styleSheet}
      //hideEdgesOnViewport={true}
      //textureOnViewport={true}
      headless={false}
      cy={cy => {
        refCy = cy;
        cy.removeListener('tap');
        cy.removeListener('cxttap');
        cy.on("tap", "node", evt => nodeTapHandler(evt));
        cy.on("cxttap", "node", evt => nodeCxttapHandler(evt));
        cy.removeListener('layoutstart');
        cy.on("layoutstart", ()=> console.log('layoutstart'));
        if (pathStartNode != "" ) {

          // based on what's set, depends what type of paths we're calculating
          if (pathEndNode != "") {
            // this is pather
            console.log('running path');
            var aStar = cy.elements().aStar({ root: "#" + pathStartNode, goal: "#" + pathEndNode, weight: weightFn});
            aStar.path.select();
            cy.elements().not( aStar.path ).removeClass('path');
            aStar.path.addClass('path');
            console.log(aStar);
            cy.getElementById(pathStartNode).addClass('pathSource');
            cy.getElementById(pathEndNode).addClass('pathTarget');
            

          } else if (explorerList.length > 0) {
            // this is explorer
            // TODO: Figure out what are best weights for bellmanford (since it allows -ve weights)
            // Going to avoid negative edges for now since i think it can cause infinite loops? (something something proof from class lol)
            cy.elements().removeClass(['path','pathSource', 'pathTarget']);

            let bf = cy.elements().bellmanFord({ root: "#" + pathStartNode, weight: weightFn, directed: false});
            const filterSet = new Set(explorerList.map((v)=> v.value));
            const targetNodes = cy.nodes().filter((n)=> { return filterSet.has(n.data().type); });
            cy.getElementById(pathStartNode).addClass('pathSource');
            console.log("bf");
            targetNodes.forEach((n)=> {
              const t = n.id();


              if (bf.distanceTo(n) < 100000000) {
                const path = bf.pathTo(n);
                console.log(path);
                n.addClass('pathTarget');
                path.addClass('path');
                path.select();
              }
            });

            
          } else {
            // this is nothing
          }
        } else {
          //cy.elements().removeClass('path');
          cy.elements().removeClass(['path','pathSource', 'pathTarget']);
        }

        if (hideNonPathNodes) {
          const pathNodes = cy.elements().filter(".path");
          cy.elements().not(pathNodes).addClass("not-path");
          pathNodes.layout(layout).run();
          
        } else {
          cy.elements().filter(".not-path").removeClass("not-path");
        }
        
        //cy.batch(() => {cy.layout(layout).run()});
      }}
      
    />
  }
  { (!showGraph) &&
    <CytoscapeComponent
      elements={processedGraphData}
      headless={true}
      cy={cy => {
        refCy = cy;
        }}
    />
  }
  
    {(showGraph) && <div className="checkList">
    <div className="title">Highlight nodes</div>
    <div className="list-container">
      {checkList.map((item, index) => (
         <div key={index}>
          <input value={item} onChange={(e)=> setHighlightNodes(item, e.target.checked)} type="checkbox" />
           <span>{item}</span>
        </div>
      ))}
    </div>
    </div>}
    </>
  )
}
