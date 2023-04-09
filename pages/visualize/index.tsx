import { Inter } from '@next/font/google'
import React, { useState, useEffect, useMemo, memo } from "react";
import Graph from 'app/graph'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import client from 'apollo/client'
import { Node, Edge, ParseNode, parsePackage } from 'app/ggraph'
import SBOMViewer from '@/app/sbom';
import { useRouter } from 'next/router';
import { GetNodeDocument, Node as gqlNode, PackageQualifier, PackageVersion, GetPkgTypesDocument, GetPkgNamesDocument, GetPkgNamespacesDocument, GetPkgVersionsDocument,  GetPkgQuery, GetPkgQueryVariables, PkgSpec , GetPkgDocument, AllPkgTreeFragment, Package, PackageQualifier} from '../../gql/__generated__/graphql';

const inter = Inter({ subsets: ['latin'] });

// TODO (mlieberman85): Some of the below still requires type definitions.

function processDataForCytoscape (data : any) : [string | undefined, any] {

  
  //console.log("GQL DATA:", data);

  let nodes: Node[] = [];
  let edges: Edge[] = [];

  let startNode : string = undefined;
  data.packages.forEach((p :Package, index) => {

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
  
    const processedPaths = paths.map(p => JSON.parse(p));
    console.log(processedPaths);  
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

  function getPkgData(trieDepth : string) : Map<any,any> {
      if (trieDepth == "type") {
        return packageTrie
      }

      
      const nsMap = packageTrie.has(selectPackageType)? packageTrie.get(selectPackageType) : new Map();
      if (trieDepth == "namespace") {
        return nsMap;
      }

      const nameMap = nsMap.has(selectPackageNamespace)? nsMap.get(selectPackageNamespace) : new Map();
      if (trieDepth == "name"){
        return nameMap;
      }

      if (nameMap.has(selectPackageName)) {
        return nameMap.get(selectPackageName);
      } else {
        return new Map();
      }
  }
        
  useEffect(()=>{
    console.log("update input path");
    
    let ret : gqlNode;
    async function fetchNode(nodeId :string) : Promise<gqlNode> {
      await client.query({
        query: GetNodeDocument,
        variables: {
          nodeId: "1",
        }
      }).then( res => {
        ret= res.data.node as gqlNode;
      });

      return ret;
    }
    
    // assemble a new graph data

    inputPath.forEach((path)=> {
      const nodeSet : Set<string> = new Set(path);

      // make a call to query the nodes and filter by set
      const promises = path.map((nid) =>{
          return  fetchNode(nid);
      });
      
      Promise.all(promises).then((values)=>{
        // add this to the graph data 
        console.log(values);

      });

    });


    // set graph data
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
            const [start, graphData] = processDataForCytoscape(d.data);
            return <Graph key={d.key} layout="dagre" writeDetails={writeDetailsHandler} startNode={start} graphData={graphData} />
          })
          } 
        </div>
      </div>
      
    </>
  )
}