import { Inter } from '@next/font/google'
import React, { useState } from "react";
import Graph from 'app/graph'
import { gql, useQuery } from '@apollo/client'
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import client from 'apollo/client'
import { Node, Edge } from 'app/graph'
import SBOMViewer from '@/app/sbom';


const inter = Inter({ subsets: ['latin'] })

// TODO (mlieberman85): Some of the below still requires type definitions.

// TODO (mlieberman85): Change this query to use the generated code
const TEST_QUERY = gql`
fragment allIsDependencyTree on IsDependency {
  justification
  package {
    type
    namespaces {
      namespace
      names {
        name
        versions {
          version
          qualifiers {
            key
            value
          }
          subpath
        }
      }
    }
  }
dependentPackage {
      type
    namespaces {
      namespace
      names {
        name
        versions {
          version
          qualifiers {
            key
            value
          }
          subpath
        }
      }
    }
  }
versionRange
origin
collector
}

query Q1 {
  IsDependency(isDependencySpec: {}) {
    ...allIsDependencyTree
  }
}`;

const fetcher = async (query) => {
  const { data } = await client.query({
    query: query,
    variables: {},
  });

  const cy = processDataForCytoscape(data)
  console.log(cy)

  return cy;
}

const processDataForCytoscape = (data) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  data.IsDependency.forEach((dependency, index) => {
    const sourceNodeId = `pkg-${index}`;
    const targetNodeId = `depPkg-${index}`;

    // Create nodes for package and dependentPackage
    nodes.push(
      {
        data: { id: sourceNodeId, label: dependency.package.namespaces[0].names[0].name },
      },
      {
        data: { id: targetNodeId, label: dependency.dependentPackage.namespaces[0].names[0].name },
      }
    );

    // Create edge between package and dependentPackage
    edges.push({
      data: {
        id: `edge-${index}`,
        source: sourceNodeId,
        target: targetNodeId,
        label: dependency.justification,
      },
    });
  });

  console.log(nodes)
  console.log(edges)

  return { nodes, edges };
};

export default function Home() {
  // TODO (mlieberman85): Validate if SWR is better in this use case than alternatives like react query
  const { data, error } = useSWR(TEST_QUERY, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <div>
        <h1>GUAC Visualizer</h1>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#000000"
          }}
        >
          <Graph layout="cose-bilkent" graphData={data}/>
        </div>
      </div>
      <SBOMViewer onSelect={null}/>
    </>
  )
}

