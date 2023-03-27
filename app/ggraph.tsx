import { GetNeighborsDocument, IsDependency,  GetPkgQuery, GetPkgQueryVariables, PkgSpec , GetPkgDocument, AllPkgTreeFragment, Package, PackageNamespace, PackageName, PackageVersion ,CertifyPkg, Node as gqlNode} from '../gql/__generated__/graphql';


export type Node = {
  data: {
    id: string;
    label: string;
    type: string;
    data?: Object;
  };
}

export type Edge = {
  data: {
    source: string;
    target: string;
    label: string;
    id?: string;
  };
}

export type GraphData = {
  nodes: Node[];
  edges: Edge[];
}

export function ParseNode (n : gqlNode) : GraphData | undefined {
  
  let gd : GraphData;
  let target : Node | undefined;

  switch (n.__typename) {
    case "Package":
      [gd, target]  = parsePackage(n as Package);
      break;
    case "CertifyPkg":
      /* TODO::: NEED TO ADD TO GRAPHQL TREE FRAGMENT
      const cpkg : CertifyPkg = n;
      nodes = [...nodes, {data: {
        label: "certifyPkg",
        type: "certifyPkg",
        id: cpkg.id,
        
      }}];
      */
      // expand mutual call back to pkgs
    default:
      // not handled
      console.log("unhandled node type:", n.__typename);
      return undefined;
  }

  gd.edges.forEach(e => {e.data.id = e.data.source + "->" + e.data.target});


  return gd;
}

// parse* returns a set of GraphData that consists of the nodes and edges to create a subgraph
// it also returns the node which is the main node to link to of the subgraph
export function parsePackage(n: Package) : [GraphData, Node | undefined] {
    let nodes : Node[] = [];
    let edges : Edge[] = [];
    // for each check if its the leaf, and if its the leaf that's where the edge goes
    let target : Node | undefined = undefined;
  
  
    const typ : Package = n;
    nodes = [...nodes, {data: {id: typ.id, label: typ.type, type: "package"}}];
    if (typ.namespaces.length == 0) {
      target = nodes.at(-1);
    }
  
    typ.namespaces.forEach((ns : PackageNamespace) =>{
      nodes = [...nodes, {data: {id: ns.id, label: ns.namespace, type: "package"}}];
      edges = [...edges, {data: {source:typ.id, target:ns.id, label:"pkgNs"}}]
      if (ns.names.length == 0) {
        target = nodes.at(-1);
      }
  
      ns.names.forEach((name: PackageName)=>{
        nodes = [...nodes, {data: {id: name.id, label: name.name, type: "package"}}];
        edges = [...edges, {data: { source:ns.id, target:name.id, label:"pkgName"}}]
        if (name.versions.length == 0) {
          target = nodes.at(-1);
        }
  
        name.versions.forEach((version: PackageVersion) => {
          nodes = [...nodes, {data: {...version, id: version.id, label: version.version, type: "package" }}];
          edges = [...edges, {data: { source:name.id, target:version.id, label:"pkgVersion"}}]
          target = nodes.at(-1);
        });
      });
    });

    return [ { nodes: nodes, edges: edges }, target];
  }