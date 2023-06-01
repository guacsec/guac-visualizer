import client from "@/apollo/client";
import { GetPkgNamespacesDocument } from "@/gql/__generated__/graphql";
import React, { Dispatch, SetStateAction } from "react";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/guac/packageGenericSelector";

const PackageTypeSelect = ({
  label,
  options,
  setPackageTypeFunc,
  setPackageNamespacesFunc,
  resetTypeFunc,
  ...rest
}: {
  label: string;
  options: PackageSelectorOption<string>[];
  setPackageTypeFunc: Dispatch<SetStateAction<string>>;
  setPackageNamespacesFunc: Dispatch<
    SetStateAction<PackageSelectorOption<string>[]>
  >;
  resetTypeFunc: () => void;
}) => {
  const onSelectPackageType = (value: string) => {
    resetTypeFunc();
    setPackageTypeFunc(value);
    const packageNamespacesQuery = client.query({
      query: GetPkgNamespacesDocument,
      variables: {
        spec: {
          type: value,
        },
      },
    });
    packageNamespacesQuery.then((res) => {
      const sortablePackageNamespaces = [
        ...(res.data.packages[0].namespaces ?? []),
      ];
      setPackageNamespacesFunc(
        sortablePackageNamespaces
          .sort((a, b) => a.namespace.localeCompare(b.namespace))
          .map((t) => ({ label: t.namespace, value: t.namespace }))
      );
    });
  };

  return (
    <PackageGenericSelector
      label={label}
      options={options}
      onSelect={onSelectPackageType}
      {...rest}
    />
  );
};

export default PackageTypeSelect;
