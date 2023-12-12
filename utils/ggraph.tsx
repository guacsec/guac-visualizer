import { NodeFragment } from "@/gql/types/nodeFragment";
import {
  IsDependency,
  Source,
  Package,
  PackageNamespace,
  PackageName,
  PackageVersion,
  PkgEqual,
  CertifyGood,
  Node as gqlNode,
  SourceNamespace,
  SourceName,
  Artifact,
  IsOccurrence,
  Builder,
  CertifyVexStatement,
  HashEqual,
  CertifyBad,
  CertifyScorecard,
  CertifyVuln,
  HasSourceAt,
  HasSbom,
  HasSlsa,
  Vulnerability,
  VulnerabilityMetadata,
  VulnEqual,
  License,
  CertifyLegal,
} from "@/gql/__generated__/graphql";

export type Node = {
  data: {
    id: string;
    label: string;
    type: string;
    expanded?: string;
    data?: Object;
  };
};

export type Edge = {
  data: {
    source: string;
    target: string;
    label: string;
    id?: string;
  };
};

export type GuacGraphData = {
  nodes: Node[];
  edges: Edge[];
};

export function ParseNode(
  n: gqlNode | NodeFragment
): GuacGraphData | undefined {
  let gd: GuacGraphData;
  let target: Node | undefined;

  const typeName = n.__typename;
  switch (typeName) {
    // SW trees
    case "Package":
      [gd, target] = parsePackage(n);
      break;
    case "Source":
      [gd, target] = parseSource(n);
      break;
    case "Artifact":
      [gd, target] = parseArtifact(n);
      break;
    case "Builder":
      [gd, target] = parseBuilder(n);
      break;

    // Evidence trees
    case "IsDependency":
      [gd, target] = parseIsDependency(n as IsDependency);
      break;
    case "PkgEqual":
      [gd, target] = parsePkgEqual(n as PkgEqual);
      break;
    case "IsOccurrence":
      [gd, target] = parseIsOccurrence(n as IsOccurrence);
      break;
    case "CertifyVEXStatement":
      [gd, target] = parseCertifyVexStatement(n as CertifyVexStatement);
      break;
    case "HashEqual":
      [gd, target] = parseHashEqual(n as HashEqual);
      break;
    case "CertifyBad":
      [gd, target] = parseCertifyBad(n as CertifyBad);
      break;
    case "CertifyGood":
      [gd, target] = parseCertifyGood(n as CertifyGood);
      break;
    case "CertifyLegal":
      [gd, target] = parseCertifyLegal(n as CertifyLegal);
      break;
    case "License":
      [gd, target] = parseLicense(n as License);
      break;
    case "VulnEqual":
      [gd, target] = parseVulnEqual(n as VulnEqual);
      break;
    case "CertifyScorecard":
      [gd, target] = parseCertifyScorecard(n as CertifyScorecard);
      break;
    case "CertifyVuln":
      [gd, target] = parseCertifyVuln(n as CertifyVuln);
      break;
    case "HasSourceAt":
      [gd, target] = parseHasSourceAt(n as HasSourceAt);
      break;
    case "HasSBOM":
      [gd, target] = parseHasSbom(n as HasSbom);
      break;
    case "HasSLSA":
      [gd, target] = parseHasSlsa(n as HasSlsa);
      break;
    case "Vulnerability": // Add this case
      [gd, target] = parseVulnerability(n); // You'll need to implement this function
      break;

    default:
      // not handled
      console.log("unhandled node type:", typeName);
      return undefined;
  }

  gd.edges.forEach((e) => {
    e.data.id = e.data.source + "->" + e.data.target;
  });

  return gd;
}

// parse* returns a set of GraphData that consists of the nodes and edges to create a subgraph
// it also returns the node which is the main node to link to of the subgraph
export function parsePackage(n: Package): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  // for each check if its the leaf, and if its the leaf that's where the edge goes
  let target: Node | undefined = undefined;

  const typ: Package = n;
  nodes = [
    ...nodes,
    { data: { id: typ.id, label: typ.type, type: "PackageType" } },
  ];
  if (typ.namespaces.length == 0) {
    target = nodes.at(-1);
  }

  typ.namespaces.forEach((ns: PackageNamespace) => {
    nodes = [
      ...nodes,
      { data: { id: ns.id, label: ns.namespace, type: "PackageNamespace" } },
    ];

    const edgesAfter = [
      ...edges,
      { data: { source: typ.id, target: ns.id, label: "pkgNs" } },
    ];

    edges = edgesAfter;
    if (ns.names.length == 0) {
      target = nodes.at(-1);
    }

    ns.names.forEach((name: PackageName) => {
      nodes = [
        ...nodes,
        {
          data: { id: name.id, label: `pkg:${name.name}`, type: "PackageName" },
        },
      ];

      edges = [
        ...edges,
        { data: { source: ns.id, target: name.id, label: "pkgName" } },
      ];
      if (name.versions.length == 0) {
        target = nodes.at(-1);
      }
      if (name.versions.length !== 0) {
        name.versions.forEach((version: PackageVersion) => {
          nodes = [
            ...nodes,
            {
              data: {
                ...version,
                id: version.id,
                label: version.version,
                type: "PackageVersion",
              },
            },
          ];
          edges = [
            ...edges,
            {
              data: {
                source: name.id,
                target: version.id,
                label: "pkgVersion",
              },
            },
          ];
          target = nodes.at(-1);
        });
      }
    });
  });
  return [{ nodes: nodes, edges: edges }, target];
}

export function parseSource(n: Source): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  // for each check if its the leaf, and if its the leaf that's where the edge goes
  let target: Node | undefined = undefined;

  const typ: Source = n;
  nodes = [
    ...nodes,
    { data: { id: typ.id, label: typ.type, type: "SourceType" } },
  ];
  if (typ.namespaces.length == 0) {
    target = nodes.at(-1);
  }

  typ.namespaces.forEach((ns: SourceNamespace) => {
    nodes = [
      ...nodes,
      { data: { id: ns.id, label: ns.namespace, type: "SourceNamespace" } },
    ];
    edges = [
      ...edges,
      { data: { source: typ.id, target: ns.id, label: "srcNs" } },
    ];
    if (ns.names.length == 0) {
      target = nodes.at(-1);
    }

    ns.names.forEach((name: SourceName) => {
      nodes = [
        ...nodes,
        {
          data: { ...name, id: name.id, label: name.name, type: "SourceName" },
        },
      ];
      edges = [
        ...edges,
        { data: { source: ns.id, target: name.id, label: "srcName" } },
      ];
      target = nodes.at(-1);
    });
  });

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseArtifact(n: Artifact): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: (n.algorithm + ":" + n.digest).slice(0, 10),
        type: "Artifact",
      },
    },
  ];
  target = nodes.at(-1);

  return [{ nodes: nodes, edges: [] }, target];
}

export function parseBuilder(n: Builder): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    { data: { ...n, id: n.id, label: n.uri, type: "Builder" } },
  ];
  target = nodes.at(-1);

  return [{ nodes: nodes, edges: [] }, target];
}

export function parseVulnerability(
  n: Vulnerability
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  if (n.type !== "novuln") {
    nodes = [
      ...nodes,
      { data: { id: n.id, label: n.type, type: "Vulnerability" } },
    ];

    n.vulnerabilityIDs.forEach((vulnID) => {
      nodes = [
        ...nodes,
        {
          data: {
            id: vulnID.id,
            label: vulnID.vulnerabilityID,
            type: "VulnerabilityID",
          },
        },
      ];
      edges = [
        ...edges,
        { data: { source: n.id, target: vulnID.id, label: "has_vuln_id" } },
      ];
    });

    target = nodes.at(-1);
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseCertifyVuln(
  n: CertifyVuln
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  // if there's a valid vulnID and vulnerability type is not "NoVuln", i.e., there's no vulnerabilites to match nodes with, don't show CertifyVuln node
  if (
    n.vulnerability.vulnerabilityIDs[0].vulnerabilityID &&
    n.vulnerability.type !== "NoVuln"
  ) {
    nodes.push({
      data: {
        ...n,
        id: n.id,
        label: "CertifyVuln",
        type: "CertifyVuln",
        expanded: "true",
      },
    });

    n.vulnerability.vulnerabilityIDs.forEach((vulnID) => {
      nodes.push({
        data: {
          id: vulnID.id,
          label: vulnID.vulnerabilityID,
          type: "VulnerabilityID",
        },
      });
      edges.push({
        data: { source: n.id, target: vulnID.id, label: "has_vuln_id" },
      });
    });

    target = nodes.at(-1);

    let [gd, t] = parsePackage(n.package);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges.push({
        data: { source: n.id, target: t.data.id, label: "subject" },
      });
    }

    if (n.vulnerability.type === "Vulnerability") {
      [gd, t] = parseVulnerability(n.vulnerability);
      nodes = [...nodes, ...gd.nodes];
      edges = [...edges, ...gd.edges];
      if (t != undefined) {
        edges.push({
          data: { source: n.id, target: t.data.id, label: "vulnerability" },
        });
      }
    }
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseCertifyVexStatement(
  n: CertifyVexStatement
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "CertifyVexStatement",
        type: "CertifyVexStatement",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;

  if (n.subject.__typename == "Artifact") {
    [gd, t] = parseArtifact(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "subject" } },
      ];
    }
  } else if (n.subject.__typename == "Package") {
    [gd, t] = parsePackage(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "subject" } },
      ];
    }
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseHashEqual(
  n: HashEqual
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  // for each check if its the leaf, and if its the leaf that's where the edge goes
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "HashEqual",
        type: "HashEqual",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  n.artifacts.forEach((m) => {
    let [gd, t] = parseArtifact(m);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "artEqual" } },
      ];
    }
  });

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseCertifyBad(
  n: CertifyBad
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "CertifyBad",
        type: "CertifyBad",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;

  if (n.subject.__typename == "Artifact") {
    [gd, t] = parseArtifact(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "is_bad" } },
      ];
    }
  } else if (n.subject.__typename == "Source") {
    [gd, t] = parseSource(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "is_bad" } },
      ];
    }
  } else if (n.subject.__typename == "Package") {
    [gd, t] = parsePackage(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "is_bad" } },
      ];
    }
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseCertifyGood(
  n: CertifyGood
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "CertifyGood",
        type: "CertifyGood",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;

  if (n.subject.__typename == "Artifact") {
    [gd, t] = parseArtifact(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "is_good" } },
      ];
    }
  } else if (n.subject.__typename == "Source") {
    [gd, t] = parseSource(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "is_good" } },
      ];
    }
  } else if (n.subject.__typename == "Package") {
    [gd, t] = parsePackage(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "is_good" } },
      ];
    }
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseCertifyScorecard(
  n: CertifyScorecard
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "CertifyScorecard",
        type: "CertifyScorecard",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let [gd, t] = parseSource(n.source);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];
  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "has_scorecard" } },
    ];
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseHasSourceAt(
  n: HasSourceAt
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "HasSourceAt",
        type: "HasSourceAt",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let [gd, t] = parsePackage(n.package);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];
  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "subject" } },
    ];
  }

  [gd, t] = parseSource(n.source);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];
  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "has_source" } },
    ];
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseHasSbom(n: HasSbom): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "HasSbom",
        type: "HasSbom",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;

  if (n.subject.__typename == "Source") {
    [gd, t] = parseSource(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        {
          data: { source: n.id, target: t.data.id, label: "vulnerability" },
        },
      ];
    }
  } else if (n.subject.__typename == "Package") {
    [gd, t] = parsePackage(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        {
          data: { source: n.id, target: t.data.id, label: "vulnerability" },
        },
      ];
    }
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseHasSlsa(n: HasSlsa): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "HasSlsa",
        type: "HasSlsa",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;

  [gd, t] = parseArtifact(n.subject);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];
  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "subject" } },
    ];
  }

  // TODO This should not be the case, change graphql and change this
  if (!n.slsa) {
    return [gd, t];
  }

  [gd, t] = parseBuilder(n.slsa.builtBy);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];
  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "built_by" } },
    ];
  }

  n.slsa.builtFrom.forEach((m) => {
    [gd, t] = parseArtifact(m);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];
    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "build_from" } },
      ];
    }
  });

  return [{ nodes: nodes, edges: edges }, target];
}

// parse* returns a set of GraphData that consists of the nodes and edges to create a subgraph
// it also returns the node which is the main node to link to of the subgraph
export function parseIsDependency(
  n: IsDependency
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  // for each check if its the leaf, and if its the leaf that's where the edge goes
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "depends on",
        type: "IsDependency",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let [gd, t] = parsePackage(n.package);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];

  if (t != undefined) {
    edges = [
      ...edges,
      {
        data: {
          source: t.data.id,
          target: n.id,
          label: "IsDependency_subject",
        },
      },
    ];
  }

  [gd, t] = parsePackage(n.dependencyPackage);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];

  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "depends_on" } },
    ];
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parsePkgEqual(n: PkgEqual): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  // for each check if its the leaf, and if its the leaf that's where the edge goes
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "PkgEqual",
        type: "PkgEqual",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  n.packages.forEach((m) => {
    let [gd, t] = parsePackage(m);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "pkgEqual" } },
      ];
    }
  });

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseIsOccurrence(
  n: IsOccurrence
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  // for each check if its the leaf, and if its the leaf that's where the edge goes
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "Occur",
        type: "IsOccurrence",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;
  if (n.subject.__typename == "Package") {
    [gd, t] = parsePackage(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "subject" } },
      ];
    }
  } else if (n.subject.__typename == "Source") {
    [gd, t] = parseSource(n.subject);
    nodes = [...nodes, ...gd.nodes];
    edges = [...edges, ...gd.edges];

    if (t != undefined) {
      edges = [
        ...edges,
        { data: { source: n.id, target: t.data.id, label: "subject" } },
      ];
    }
  }

  [gd, t] = parseArtifact(n.artifact);
  nodes = [...nodes, ...gd.nodes];
  edges = [...edges, ...gd.edges];

  if (t != undefined) {
    edges = [
      ...edges,
      { data: { source: n.id, target: t.data.id, label: "is_occurrence" } },
    ];
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseLicense(n: License): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        id: n.id,
        label: `License-${n.id}`,
        type: "License",
      },
    },
  ];

  target = nodes.at(-1);
  return [{ nodes: nodes, edges: edges }, target];
}

export function parseVulnEqual(
  n: VulnEqual
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target: Node | undefined = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        ...n,
        id: n.id,
        label: "VulnEq",
        type: "VulnEqual",
        expanded: "true",
      },
    },
  ];
  target = nodes.at(-1);

  let gd: GuacGraphData;
  let t: Node | undefined;

  if (n.vulnerabilities) {
    n.vulnerabilities.forEach((vulnerability) => {
      [gd, t] = parseVulnerability(vulnerability);
      nodes = [...nodes, ...gd.nodes];
      edges = [...edges, ...gd.edges];

      if (t != undefined) {
        edges = [
          ...edges,
          { data: { source: n.id, target: t.data.id, label: "is_vuln_equal" } },
        ];
      }
    });
  }

  return [{ nodes: nodes, edges: edges }, target];
}

export function parseVulnerabilityMetadata(
  n: VulnerabilityMetadata
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        id: n.id,
        label: n.origin,
        type: "VulnerabilityMetadata",
      },
    },
  ];

  target = nodes.at(-1);
  return [{ nodes: nodes, edges: edges }, target];
}

export function parseCertifyLegal(
  n: CertifyLegal
): [GuacGraphData, Node | undefined] {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let target = undefined;

  nodes = [
    ...nodes,
    {
      data: {
        id: n.id,
        label: `CertifyLegal-${n.id} ${n.origin}`,
        type: "CertifyLegal",
      },
    },
  ];

  target = nodes.at(-1);
  return [{ nodes: nodes, edges: edges }, target];
}
