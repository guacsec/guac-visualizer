import { Inter } from '@next/font/google'
import { useState, useEffect } from 'react';
import ForceGraph2D from '../app/ForceGraph2DWrapper'
import { useQuery, useLazyQuery, useRef } from '@apollo/client'
import { GetPkgTypesDocument } from '../gql/__generated__/graphql';
import PackageTypeSelect from '../components/guac/packageTypeSelect';
import PackageNamespaceSelect from '@/components/guac/packageNamespaceSelect';
import PackageNameSelect from '@/components/guac/packageNameSelect';
import PackageVersionSelect from '@/components/guac/packageVersionSelect';
import { processDataForCytoscape } from "app/graph";
import Graph from "app/graph";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {  
  let initialPackageNamespaces = [{label: 'loading...', value: 'loading'}]
  let packageTypes = initialPackageNamespaces
  
  // state management
  const [packageType, setPackageType] = useState("");
  const [packageNamespace, setPackageNamespace] = useState("")
  const [packageName, setPackageName] = useState("")
  const [packageVersion, setPackageVersion] = useState("")
  const [packageNamespaces, setPackageNamespaces] = useState(initialPackageNamespaces)
  const [packageNames, setPackageNames] = useState(initialPackageNamespaces)
  const [packageVersions, setPackageVersions] = useState(initialPackageNamespaces)

  // this is for the visual graph
  const [graphData, setGraphData] = useState({})
  const [cjsGraphData, setCjsGraphData] = useState([])

  const packageTypesQuery = useQuery(GetPkgTypesDocument, { variables: {}}); 
  const packageLoading = packageTypesQuery.loading;
  const packageError = packageTypesQuery.error;

 useEffect( () => {
  // const [startNode, gd] = processDataForCytoscape(graphData);
  if (graphData.packages != undefined) {
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
