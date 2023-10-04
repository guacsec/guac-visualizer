import client from "@/apollo/client";
import { PackageNamespacesDocument } from "@/gql/__generated__/graphql";
import React, { Dispatch, SetStateAction } from "react";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/packages/packageGenericSelector";

const PackageTypeSelect = ({
  label,
  options,
  setPackageTypeFunc,
  setPackageNamespacesFunc,
  resetTypeFunc,
  disabled,
  ...rest
}: {
  label: string;
  options: PackageSelectorOption<string>[];
  setPackageTypeFunc: Dispatch<SetStateAction<string>>;
  setPackageNamespacesFunc: Dispatch<
    SetStateAction<PackageSelectorOption<string>[]>
  >;
  resetTypeFunc: () => void;
  disabled?: boolean;
}) => {
  const onSelectPackageType = (value: string) => {
    resetTypeFunc();
    setPackageTypeFunc(value);
    const packageNamespacesQuery = client.query({
      query: PackageNamespacesDocument,
      variables: {
        filter: {
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
      className={disabled ? "cursor-not-allowed opacity-50" : ""}
      {...rest}
    />
  );
};

export default PackageTypeSelect;
