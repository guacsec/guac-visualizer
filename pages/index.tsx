import { Inter } from '@next/font/google'
import React, { useState } from "react";
import Graph from 'app/graph'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import client from 'apollo/client'
import { Node, Edge, ParseNode } from 'app/ggraph'
import SBOMViewer from '@/app/sbom';
import { IsDependency,  GetPkgQuery, GetPkgQueryVariables, PkgSpec , GetPkgDocument, AllPkgTreeFragment, Package} from '../gql/__generated__/graphql';

const inter = Inter({ subsets: ['latin'] });

// TODO (mlieberman85): Some of the below still requires type definitions.

const processDataForCytoscape = (data) => {

  
  console.log("GQL DATA:", data);

  let nodes: Node[] = [];
  let edges: Edge[] = [];

  data.packages.forEach((p :Package, index) => {
    const sourceNodeId = `pkg-${index}`;
    const targetNodeId = `depPkg-${index}`;

    let gd = ParseNode(p);
    if (gd!= undefined) {
      nodes = [...nodes, ...gd.nodes];
      edges = [...edges, ...gd.edges];
    }
    // Create nodes for package and dependentPackage

  });


  return { nodes, edges };
};


export default function Home() {
  // TODO (mlieberman85): Validate if SWR is better in this use case than alternatives like react query
  const [detailsText, setDetailsText] = useState("detailsText");
  const [inputText, setInputText] = useState(`{
    "type":"guac", "namespace":"spdx/k8s.gcr.io",
"name": "kube-proxy-v1.24.1"
  }`);
  const [buttonHit, setButtonHit] = useState(false);
  const [requested, setRequested] = useState("{}");
  const [data, setData] = useState<GetPkgQuery>({ packages: []});

  const other = `{
    "type":"deb",
    "namespace":"ubuntu",
    "name": "dpkg",
    "qualifiers": [{"key":"arch", "value":"amd64"}]
  }`;


  function initGraph (s : string) {
    setData({packages: []});
    client.query({
      query: GetPkgDocument,
      variables: {
        spec: JSON.parse(s),
      }
    }).then( res => {
      console.log("res data", res.data);
      setData(res.data);
    });
  }

  function writeDetailsHandler (x : any) {
    setDetailsText(JSON.stringify(x,null,2));

  }

    
  

  //const { data, error } = useSWR(TEST_QUERY, fetcher)
  //if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <div>
        <h1>GUAC Visualizer</h1>
        <textarea name="text" rows={10} cols={50} value={inputText} onChange={e => setInputText(e.target.value)} />
        <button onClick={e => initGraph(inputText)}>submit</button>
        <textarea name="details-text" rows={10} cols={50} value={JSON.stringify(data)} onChange={() => {}} />

        <textarea name="details-text" rows={10} cols={50} value={detailsText} onChange={e => setDetailsText(e.target.value)}/>
        <div
          style={{
//            border: "1px solid",
            backgroundColor: "#F0F0F0",
            
          }}
        >
          {/* skip sending in data which will be delegated to the graph object by passing in a way to retrieve the data instead */}
          <Graph layout="cola" writeDetails={writeDetailsHandler} graphData={processDataForCytoscape(data)} />
        </div>
      </div>
      
    </>
  )
}