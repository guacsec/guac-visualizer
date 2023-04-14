import { Inter } from '@next/font/google'
import { useState, useEffect } from 'react';
import ForceGraph2D from '../app/ForceGraph2DWrapper'
import { useQuery, useLazyQuery, useRef } from '@apollo/client'
import { GetPkgTypesDocument, GetCertifyBadDocument , CertifyBad} from '../gql/__generated__/graphql';
import PackageTypeSelect from '../components/guac/packageTypeSelect';
import PackageNamespaceSelect from '@/components/guac/packageNamespaceSelect';
import PackageNameSelect from '@/components/guac/packageNameSelect';
import PackageVersionSelect from '@/components/guac/packageVersionSelect';
import { processDataForCytoscape } from "app/graph";
import Graph from "app/graph";
import CertifyBadSelect from '@/components/guac/certifyBadSelect';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {  
  let initialPackageNamespaces = [{label: 'loading...', value: 'loading'}]
  let packageTypes = initialPackageNamespaces
  let certifyBadEntries = initialPackageNamespaces
  
  // state management
  const [packageType, setPackageType] = useState("");
  const [packageNamespace, setPackageNamespace] = useState("")
  const [packageName, setPackageName] = useState("")
  const [packageVersion, setPackageVersion] = useState("")
  const [packageNamespaces, setPackageNamespaces] = useState(initialPackageNamespaces)
  const [packageNames, setPackageNames] = useState(initialPackageNamespaces)
  const [packageVersions, setPackageVersions] = useState(initialPackageNamespaces)

  // this is for the visual graph
  const [graphData, setGraphData] = useState([])
  const [cjsGraphData, setCjsGraphData] = useState([])

  const packageTypesQuery = useQuery(GetPkgTypesDocument, { variables: {}}); 
  const packageLoading = packageTypesQuery.loading;
  const packageError = packageTypesQuery.error;

  const certifyBadQuery = useQuery(GetCertifyBadDocument, { variables: {spec: {}}}); 
  const certifyBadLoading = certifyBadQuery.loading;
  const certifyBadError = certifyBadQuery.error;

 useEffect( () => {
    // const [startNode, gd] = processDataForCytoscape(graphData);
    if (graphData != undefined && graphData.length > 0) {
      setCjsGraphData([{key: crypto.randomUUID(), data: graphData}])
    }
  }, [graphData]);

  if(!packageError && !packageLoading){
    let packageData = packageTypesQuery.data?.packages;
    let sortablePackageData = [...packageData ?? []] 
    
    // this isn't following the typical react pattern as doing it that way caused an infinite loop 
    // still looking into why that would be - better would be setPackageTypes(sortable...)
    packageTypes = sortablePackageData.sort((a, b) => a.type.localeCompare(b.type)).map(t => ({label: t.type, value: t.type}))
  }

  if(!certifyBadError && !certifyBadLoading){

    let certifyBadData = certifyBadQuery.data?.CertifyBad;
    let sortableCertifyBadData : CertifyBad[] = [...certifyBadData ?? []] as CertifyBad[]

    const certifyBadToString = (v:CertifyBad) => {
      let label = "";
      const sub = v.subject;
      switch (sub.__typename) {
        case "Package":
          // not complete but not quite important to be complete
          label += "package://" + [sub.type, sub.namespaces[0].namespace, sub.namespaces[0].names[0].name].join('/');
          break;
        case "Source":
          label += "source://" + [sub.type, sub.namespaces[0].namespace, sub.namespaces[0].names[0].name].join('/');
          const name = sub.namespaces[0].names[0];
          // should never be both
          label += name.commit? "@" + name.commit : "";
          label += name.tag? "@" + name.tag : "";
          break;
        case "Artifact":
          label += "artifact://" + sub.algorithm + ":" + sub.digest;
          break;
      }
      return label + "{ JUSTIFICAITON: " + v.justification + "}";
    }
    
    // this isn't following the typical react pattern as doing it that way caused an infinite loop 
    // still looking into why that would be - better would be setPackageTypes(sortable...)
    // certifyBadEntries = sortableCertifyBadData.sort((a, b) => a.type.localeCompare(b.type)).map(t => ({label: t.type, value: t.type}))
    certifyBadEntries = sortableCertifyBadData.map(t=> ({label: certifyBadToString(t), value: t}));
  }

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="ptDiv" className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageTypeSelect 
              label="Package Type" 
              options={packageTypes} 
              setPackageTypeFunc={setPackageType}
              setPackageNamespacesFunc={setPackageNamespaces}/>
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageNamespaceSelect 
              label="Package Namespace" 
              options={packageNamespaces} 
              setPackageNamespaceFunc={setPackageNamespace} 
              setPackageNamesFunc={setPackageNames} />
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageNameSelect 
              label="Package Name" 
              options={packageNames} 
              setPackageNameFunc={setPackageName} 
              setPackageVersionsFunc={setPackageVersions}/>
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <PackageVersionSelect 
              label="Package Version" 
              options={packageVersions}
              setPackageVersionFunc={setPackageVersion}
              setGraphDataFunc={setGraphData}/>
          </div>
      </div>
      <br/>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <CertifyBadSelect 
              label="CertifyBad Entities" 
              options={certifyBadEntries} 
              setGraphDataFunc={setGraphData} />
      </div>
      <div>
      {
      cjsGraphData.map((d)=> {
        const [start, graphData] = processDataForCytoscape(d.data);
        return <Graph key={d.key} layout="dagre" writeDetails={()=>{}} startNode={start} graphData={graphData} /> 
      })
      }
      
        </div>
    </main>
  )
}
