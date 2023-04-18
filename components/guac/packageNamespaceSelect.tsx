import client from "@/apollo/client";
import { GetPkgNamesDocument } from "@/gql/__generated__/graphql";
import Select from "react-select";

const PackageNamespaceSelect = ({ label, options, setPackageNamespaceFunc, setPackageNamesFunc,packageType, resetNamespaceFunc, ...rest }) => {

  const onSelectPackageNamespace = (event: {value: any; }) => {
    resetNamespaceFunc();
    setPackageNamespaceFunc(event.value);

    const packageNameQuery = client.query({
      query: GetPkgNamesDocument,
      variables:{
        spec:{
          namespace: event.value,
          type: packageType
        }
      }
    });
    let q = packageNameQuery.then(
      res => {
        const sortablePackageNames = [...res.data.packages[0].namespaces[0].names ?? []];
        setPackageNamesFunc(sortablePackageNames.sort((a, b) => a.name.localeCompare(b.name)).map(t => ({label: t.name, value: t.name})));
      }
    )
  };
  
  return (
        <div>
            {label && <label>{label}</label>}
            <Select options={options} onChange={(e)=>onSelectPackageNamespace(e)} {...rest} />
        </div>
  );
};

export default PackageNamespaceSelect;
