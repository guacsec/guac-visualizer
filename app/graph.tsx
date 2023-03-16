'use client'; // Client side rendering required since we are using clientside specific hooks

import CytoscapeComponent from 'react-cytoscapejs'
import Spread from 'cytoscape-spread';
import COSEBilkent from 'cytoscape-cose-bilkent'
import { useState } from 'react';
import { EventObject } from 'cytoscape';
import Cytoscape from 'cytoscape';

Cytoscape.use(Spread);
Cytoscape.use(COSEBilkent);

export type Node = {
  data: {
    id: string;
    label: string;
    type: string;
  };
}

export type Edge = {
  data: {
    source: string;
    target: string;
    label: string;
  };
}

type GraphData = {
  nodes: Node[];
  edges: Edge[];
}

type GraphProps = {
  graphData?: GraphData;
  layout?: string;
};

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

export default function Graph(props: GraphProps) {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("800px");
  console.log(props.graphData)

  const [graphData, setGraphData] = useState(props?.graphData ?? defaultGraphData);

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
        width: 50,
        height: 50,
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

  let ref;

  return (
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
        ref = cy;
        console.log("EVT", cy);
        cy.on("tap", "node", evt => nodeTapHandler(evt));
      }}
    />
  )
}

const nodeTapHandler = (evt: EventObject) => {
  var node = evt.target;
  // TODO: This should potentially run additional queries that then update the component state
  console.log("EVT", evt);
  console.log("TARGET", node.data());
  console.log("TARGET TYPE", typeof node[0]);
}