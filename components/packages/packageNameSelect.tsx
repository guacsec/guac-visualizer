import client from "@/apollo/client";
import {
  PackageVersionsDocument,
  PackageQualifier,
} from "@/gql/__generated__/graphql";
import React, { Dispatch, SetStateAction } from "react";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/packages/packageGenericSelector";

export type VersionQueryVersion = {
  __typename?: "PackageVersion";
  version: string;
  qualifiers: {
    __typename?: "PackageQualifier";
    key: string;
    value: string;
  }[];
};

const PackageNameSelect = ({
  label,
  options,
  setPackageNameFunc,
  setPackageVersionsFunc,
  packageType,
  packageNamespace,
  resetNameFunc,
  ...rest
}: {
  label: string;
  options: PackageSelectorOption<string>[];
  setPackageNameFunc: Dispatch<SetStateAction<string>>;
  setPackageVersionsFunc: Dispatch<
    SetStateAction<PackageSelectorOption<VersionQueryVersion>[]>
  >;
  packageType: string;
  packageNamespace: string;
  resetNameFunc: () => void;
  disabled?: boolean;
}) => {
  function toVersionString(v: VersionQueryVersion): string {
    return (
      v.version +
      JSON.stringify(
        v.qualifiers.map((l: PackageQualifier) => l.key + "=" + l.value)
      )
    );
  }

  const onSelectPackageName = (value: string) => {
    resetNameFunc();
    setPackageNameFunc(value);

    const packageVersionQuery = client.query({
      query: PackageVersionsDocument,
      variables: {
        filter: {
          name: value,
          type: packageType,
          namespace: packageNamespace,
        },
      },
    });

    packageVersionQuery.then((res) => {
      const sortablePackageVersions = [
        ...(res.data.packages[0].namespaces[0].names[0].versions ?? []),
      ].map((v) => {
        return { label: toVersionString(v), value: v };
      });
      setPackageVersionsFunc(
        sortablePackageVersions
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((t) => ({ label: t.label, value: t.value }))
      );
    });
  };

  return (
    <PackageGenericSelector
      label={label}
      options={options}
      onSelect={onSelectPackageName}
      {...rest}
    />
  );
};

export default PackageNameSelect;
