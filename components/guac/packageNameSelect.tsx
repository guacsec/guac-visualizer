import client from "@/apollo/client";
import {
  GetPkgVersionsDocument,
  PackageVersion,
  PackageQualifier,
} from "@/gql/__generated__/graphql";
import React, { useEffect } from "react";
import Select from "react-select";

const PackageNameSelect = ({
  label,
  options,
  setPackageNameFunc,
  setPackageVersionsFunc,
  packageType,
  packageNamespace,
  resetNameFunc,
  ...rest
}) => {
  function toVersionString(v: PackageVersion): string {
    return (
      v.version +
      JSON.stringify(
        v.qualifiers.map((l: PackageQualifier) => l.key + "=" + l.value)
      )
    );
  }

  const onSelectPackageName = (event: { value: any }) => {
    resetNameFunc();
    setPackageNameFunc(event);

    const packageVersionQuery = client.query({
      query: GetPkgVersionsDocument,
      variables: {
        spec: {
          name: event.value,
          type: packageType.value,
          namespace: packageNamespace.value,
        },
      },
    });
    let q = packageVersionQuery.then((res) => {
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
    <div className="flex flex-col w-full lg:w-52 space-y-2">
      {label && <div className="w-fit">{label}</div>}
      <Select
        options={options}
        onChange={(e) => onSelectPackageName(e)}
        {...rest}
      />
    </div>
  );
};

export default PackageNameSelect;
