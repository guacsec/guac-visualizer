import client from "@/apollo/client";
import { INITIAL_PACKAGE_NAMESPACES } from "@/components/packages/packageSelector";
import { PackageTypesDocument } from "@/gql/__generated__/graphql";
import { useEffect, useState } from "react";


export function usePackageData() {
  const [packageTypes, setPackageTypes] = useState(INITIAL_PACKAGE_NAMESPACES);
  const [packageLoading, setPackageLoading] = useState(true);
  const [packageError, setPackageError] = useState(null);

  useEffect(() => {
    setPackageLoading(true);
    client.query({
      query: PackageTypesDocument,
      variables: { filter: {} },
    })
    .then((res) => {
      let packageData = res.data.packages;
      let sortablePackageData = [...(packageData ?? [])];
      const types = sortablePackageData
        .sort((a, b) => a.type.localeCompare(b.type))
        .map((t) => ({ label: t.type, value: t.type }));
      setPackageTypes(types);
      setPackageLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching package types:", error);
      setPackageError(error);
      setPackageLoading(false);
    });
  }, []);

  return {
    packageTypes,
    packageLoading,
    packageError,
  };
}
