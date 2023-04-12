import { Inter } from '@next/font/google'
import React, { useState, useEffect, useMemo, memo } from "react";
import Graph from 'app/graph'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import client from 'apollo/client'
import { Node, Edge, GraphData, ParseNode, IsSwTreeNode, parsePackage } from 'app/ggraph'
import SBOMViewer from '@/app/sbom';
import { useRouter } from 'next/router';
// import {GraphData, Node, Edge} from "../../app/ggraph";
import { GetNodeDocument, Node as gqlNode, PackageQualifier, PackageVersion, GetPkgTypesDocument, GetPkgNamesDocument, GetPkgNamespacesDocument, GetPkgVersionsDocument,  GetPkgQuery, GetPkgQueryVariables, PkgSpec , GetPkgDocument, AllPkgTreeFragment, Package, PackageQualifier} from '../../gql/__generated__/graphql';

const inter = Inter({ subsets: ['latin'] });

// TODO (mlieberman85): Some of the below still requires type definitions.


function toVersionString (v :PackageVersion) {
  return v.version + JSON.stringify(v.qualifiers.map((l :PackageQualifier)=>l.key +"=" + l.value));

}
let packageTrie = new Map();

export default function Home() {

  const router = useRouter();
  const {path} = router.query;

  // TODO (mlieberman85): Validate if SWR is better in this use case than alternatives like react query
  const [detailsText, setDetailsText] = useState("detailsText");
  const [buttonHit, setButtonHit] = useState(false);
  const [requested, setRequested] = useState("{}");
  const [data, setData] = useState<GetPkgQuery>({ packages: []});
  const [graphData, setGraphData] = useState([]);
  const [inputPath, setInputPath] = useState<string[][]>([]);



  // Package Selectors
  const defaultNull = "<NULL>";

  const [selectPackageType, setSelectPackageType] = useState(defaultNull);
  const [selectPackageNamespace, setSelectPackageNamespace] = useState(defaultNull);
  const [selectPackageName, setSelectPackageName] = useState(defaultNull);
  const [selectPackageVersion, setSelectPackageVersion] = useState(defaultNull);

  useEffect(()=>{
    console.log("path change:", path)
    let paths : string[] = [];

    if (path != undefined) {

      if (typeof(path) === "string") {
        paths = [path];
      } else { // type string[]
        paths = path
      }
    }
  
    let processedPaths = paths.map(p => JSON.parse(p));
    processedPaths = processedPaths.map(l => l.map((x:number)=> x.toString()))
    console.log(processedPaths);  
    // JSON parses as int[] want it to be string[]
    setInputPath(processedPaths);
  }, [path]);


  const other = `{
    "type":"deb",
    "namespace":"ubuntu",
    "name": "dpkg",
    "qualifiers": [{"key":"arch", "value":"amd64"}]
  }`;


  function initGraph () {
    setData({packages: []});
    let spec = {};
    if (selectPackageType != defaultNull){
      spec.type = selectPackageType;

      if (selectPackageNamespace != defaultNull) {
        spec.namespace = selectPackageNamespace;
        if (selectPackageName != defaultNull) {
          spec.name = selectPackageName;
        }
      }
    }
      
    client.query({
      query: GetPkgDocument,
      variables: {
        spec: spec,
      }
    }).then( res => {
      console.log("res data", res.data);
      setData(res.data);
      
      setGraphData([{key: crypto.randomUUID(), data: res.data}]);
    });
  }

  function writeDetailsHandler (x : any) {
    setDetailsText(JSON.stringify(x,null,2));

  }
        
  useEffect(()=>{
    console.log("update input path");

    // assemble a new graph data
    
    let ret : gqlNode;


    async function fetchNodeAndProcess(nodeId :string, nodeSet : Set<string>) :Promise<[Map<string,Node>,Map<string,Edge>]> {
      let nodes = new Map<string, Node>();
      let edges = new Map<string, Edge>();
      await client.query({
        query: GetNodeDocument,
        fetchPolicy: "no-cache" ,
        variables: {
          nodeId: nodeId,
        }
      }).then( res => {
        ret= res.data.node as gqlNode;
      });

      const n: gqlNode = ret;
      const parsedGd = ParseNode(n);
      
      console.log("parsedGD", n.id, n, parsedGd);
      
      let filteredNodes = parsedGd.nodes;
      let filteredEdges = parsedGd.edges;
      // only include nodes and edges that are part of path set
      if (!IsSwTreeNode(n)) {
        filteredNodes = parsedGd.nodes.filter((nn)=> nodeSet.has(nn.data.id));
        filteredEdges = parsedGd.edges.filter((e)=> nodeSet.has(e.data.source) && nodeSet.has(e.data.target));
      }
      
      // add into a set to deduplicate
      filteredNodes.map(nn=> nodes.set(nn.data.id,nn));
      filteredEdges.map(e=> edges.set(e.data.id,e));
      return [nodes, edges];
    }

    const promises = inputPath.map((path) => path.map((nid)=>fetchNodeAndProcess(nid, new Set(path))));
    const flattenPromises = promises.flat();

    Promise.all(flattenPromises).then((values)=>{
      let nodes = new Map<string, Node>();
      let edges = new Map<string, Edge>();
      
      values.forEach(([nmap,emap]) => {
        nmap.forEach((v,k)=>nodes.set(k,v));
        emap.forEach((v,k)=>edges.set(k,v));
      })  
      
      const gd : GraphData = {
        nodes: [...nodes.values()],
        edges: [...edges.values()],
      }
    
      console.log("settin graph data", nodes, edges, gd);
      setGraphData([{
        key: crypto.randomUUID(), 
        gd: gd,
      }]);
    })
  }, [inputPath])
  

  //const { data, error } = useSWR(TEST_QUERY, fetcher)
  //if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <div>
        <h1>GUAC Visualizer</h1>
        <p>Input Route: {JSON.stringify(inputPath)}</p>
        <br />
        <textarea name="details-text" rows={3} cols={50} value={detailsText} onChange={e => setDetailsText(e.target.value)}/>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#F0F0F0",
          }}
        >
          {/* skip sending in data which will be delegated to the graph object by passing in a way to retrieve the data instead */}
          {
            graphData.map((d)=> {
              console.log("redner", d.gd);
            return <Graph key={d.key} layout="cola" writeDetails={writeDetailsHandler} graphData={d.gd} />
          })
          } 
        </div>
      </div>
      
    </>
  )
}