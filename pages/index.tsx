import { Inter } from '@next/font/google'
import React, { useState, memo } from "react";
import Graph from 'app/graph'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import client from 'apollo/client'
import { Node, Edge, ParseNode, parsePackage } from 'app/ggraph'
import SBOMViewer from '@/app/sbom';
import { PackageQualifier, PackageVersion, GetPkgTypesDocument, GetPkgNamesDocument, GetPkgNamespacesDocument, GetPkgVersionsDocument,  GetPkgQuery, GetPkgQueryVariables, PkgSpec , GetPkgDocument, AllPkgTreeFragment, Package, PackageQualifier} from '../gql/__generated__/graphql';

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
  // TODO (mlieberman85): Validate if SWR is better in this use case than alternatives like react query
  const [detailsText, setDetailsText] = useState("detailsText");
  const [buttonHit, setButtonHit] = useState(false);
  const [requested, setRequested] = useState("{}");
  const [data, setData] = useState<GetPkgQuery>({ packages: []});
  const [graphData, setGraphData] = useState([]);


  // Package Selectors
  const defaultNull = "<NULL>";

  const [selectPackageType, setSelectPackageType] = useState(defaultNull);
  const [selectPackageNamespace, setSelectPackageNamespace] = useState(defaultNull);
  const [selectPackageName, setSelectPackageName] = useState(defaultNull);
  const [selectPackageVersion, setSelectPackageVersion] = useState(defaultNull);

  let query = GetPkgTypesDocument;
  let queryVariables = {};
  if (selectPackageType != defaultNull) {
    query = GetPkgNamespacesDocument;
    queryVariables.type = selectPackageType;
  }
  if (selectPackageNamespace != defaultNull) {
    query = GetPkgNamesDocument;
    queryVariables.namespace = selectPackageNamespace;
  }
  if (selectPackageName != defaultNull) {
    query = GetPkgVersionsDocument;
    queryVariables.name = selectPackageName;
  }
  
  const queryReturn = useQuery(query, { variables: {spec: queryVariables}});
  const pkgLoading = queryReturn.loading;
  const pkgError  = queryReturn.error;
  const pkgData = queryReturn.data;
  //console.log("ALL PACKAGES", allPackages);
  
  //console.log("ALL data", allPackages.data.packages);
  

  if (!pkgError && !pkgLoading) {
  
    pkgData.packages.forEach((t)=> {
      
      const tMap = packageTrie.has(t.type)? packageTrie.get(t.type) : new Map();
      packageTrie.set(t.type, tMap);

      (t.namespaces != undefined) && t.namespaces.forEach((ns) => {
        const nsMap = tMap.has(ns.namspace)? tMap.get(ns.namespace) : new Map();
        tMap.set(ns.namespace, nsMap);

        (ns.names != undefined) && ns.names.forEach((n) => {
          const nMap = nsMap.has(n.name)? nsMap.get(n.name) : new Map();
          nsMap.set(n.name, nMap);

          (n.versions != undefined) && n.versions.forEach((version)=> {
            nMap.set(toVersionString(version), version)
          });
        })
      });
    })

    //console.log("PKGTRIE:", packageTrie);
  }


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

        // spec: JSON.parse(s),
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
    
  

  //const { data, error } = useSWR(TEST_QUERY, fetcher)
  //if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <div>
        <h1>GUAC Visualizer</h1>
        <select value={selectPackageType} onChange={(e)=> {setSelectPackageType(e.target.value); setSelectPackageNamespace(defaultNull); setSelectPackageName(defaultNull); setSelectPackageVersion(defaultNull);}}>
          <option key={defaultNull} value={defaultNull}></option>
          {[...getPkgData("type")].map(([k,v]) => <option key={k}>{k}</option>)}
        </select>
        
        
        {selectPackageType!=defaultNull && 
          <select value={selectPackageNamespace} onChange={(e)=> {setSelectPackageNamespace(e.target.value); setSelectPackageName(defaultNull); setSelectPackageVersion(defaultNull);}}>
            <option key={defaultNull} value={defaultNull}></option>
            {([...getPkgData("namespace")]).map(([k,v]) => <option key={k}>{k}</option>)}
          </select>
        }
        {selectPackageNamespace!=defaultNull && 
          <select value={selectPackageName} onChange={(e)=> {setSelectPackageName(e.target.value); setSelectPackageVersion(defaultNull);}}>
            <option key={defaultNull} value={defaultNull}></option>
            {([...getPkgData("name")]).map(([k,v]) => <option key={k}>{k}</option>)}
          </select>
        }
        {selectPackageName!=defaultNull && 
          <select value={selectPackageVersion} onChange={(e)=> setSelectPackageVersion(e.target.value)}>
            <option key={defaultNull} value={defaultNull}></option>
            {([...getPkgData("version")]).map(([k,v]) => <option key={k}>{toVersionString(v)}</option>)}
          </select>
        }
        {selectPackageVersion != defaultNull && <button onClick={e => initGraph()}>submit</button>}
        <br />
        
        <textarea name="details-text" rows={3} cols={50} value={JSON.stringify(data)} onChange={() => {}} />

        <textarea name="details-text" rows={3} cols={50} value={detailsText} onChange={e => setDetailsText(e.target.value)}/>
        <div
          style={{
//            border: "1px solid",
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