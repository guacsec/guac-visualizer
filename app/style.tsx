export const graphStyleSheet = [
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
        selector: "node[type='Osv']",
        style: {
          shape: "diamond",
          "background-color": "red",
        }
    },
    {
        selector: "node[type='Ghsa']",
        style: {
          shape: "diamond",
          "background-color": "red",
        }
    },
    {
        selector: "node[type='Cve']",
        style: {
          shape: "diamond",
          "background-color": "red",
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
        //"label": "data(label)",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "haystack"
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
    },
    {
      selector: "node.pathTarget",
      style: {
        width: 100,
        height: 100,
      }
    },
    {
      selector: "node.pathSource",
      style: {
        width: 100,
        height: 100,
      }
    },
    {
      selector: "node.not-path",
      style: {
        display: "none",
      }
    },
    {
      selector: "edge.not-path",
      style: {
        display: "none",
      }
    },
  ];

  export const hiddenGraphStyleSheet = [
    {
      selector: "node",
      style: {
        display: "none",
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
        //"label": "data(label)",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "haystack"
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
        display: "element",
        "line-color": "red",
        width: 5,
        "z-index": 1,
      }
    },
    {
      selector: "node.path",
      style: {
        display: "element",
        width: 50,
        height: 50,
      }
    },
    {
      selector: "node.pathTarget",
      style: {
        display: "element",
        width: 100,
        height: 100,
      }
    },
    {
      selector: "node.pathSource",
      style: {
        display: "element",
        width: 100,
        height: 100,
      }
    },
    {
      selector: "node.not-path",
      style: {
        display: "none",
      }
    },
    {
      selector: "edge.not-path",
      style: {
        display: "none",
      }
    },
  ];