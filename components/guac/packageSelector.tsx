import PackageTypeSelect from "@/components/guac/packageTypeSelect";
import PackageNamespaceSelect from "@/components/guac/packageNamespaceSelect";
import PackageNameSelect from "@/components/guac/packageNameSelect";
import PackageVersionSelect from "@/components/guac/packageVersionSelect";
import { useState } from "react";
import { GraphData } from "react-force-graph-2d";

export const INITIAL_PACKAGE_NAMESPACES = [
  { label: "loading...", value: "loading" },
];

export default function PackageSelector({
  packageTypes,
  setGraphData,
}: {
  packageTypes: { label: string; value: string }[];
  setGraphData: (data: GraphData) => void;
}) {
  const [packageType, setPackageType] = useState("");
  const [packageNamespace, setPackageNamespace] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageVersion, setPackageVersion] = useState("");
  const [packageNamespaces, setPackageNamespaces] = useState(
    INITIAL_PACKAGE_NAMESPACES
  );
  const [packageNames, setPackageNames] = useState(INITIAL_PACKAGE_NAMESPACES);
  const [packageVersions, setPackageVersions] = useState(
    INITIAL_PACKAGE_NAMESPACES
  );

  const resetNamespace = () => {
    setPackageNames(INITIAL_PACKAGE_NAMESPACES);
    setPackageName("");
    resetName();
  };

  const resetName = () => {
    setPackageVersions(INITIAL_PACKAGE_NAMESPACES);
    setPackageVersion("");
  };

  const resetType = () => {
    setPackageNamespaces(INITIAL_PACKAGE_NAMESPACES);
    setPackageNamespace("");
    resetNamespace();
  };

  return (
    <div
      id="ptDiv"
      className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"
    >
      <div className="left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
        <PackageTypeSelect
          label="Package Type"
          options={packageTypes}
          value={packageType}
          setPackageTypeFunc={setPackageType}
          setPackageNamespacesFunc={setPackageNamespaces}
          resetTypeFunc={resetType}
        />
      </div>
      <div className="left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
        <PackageNamespaceSelect
          label="Package Namespace"
          options={packageNamespaces}
          value={packageNamespace}
          packageType={packageType}
          setPackageNamespaceFunc={setPackageNamespace}
          setPackageNamesFunc={setPackageNames}
          resetNamespaceFunc={resetName}
        />
      </div>
      <div className="left-0 flex w-full items-end justify-center bg-gradient-to-t lg:static lg:h-auto lg:w-auto lg:bg-none">
        <PackageNameSelect
          label="Package Name"
          options={packageNames}
          value={packageName}
          packageType={packageType}
          packageNamespace={packageNamespace}
          setPackageNameFunc={setPackageName}
          setPackageVersionsFunc={setPackageVersions}
          resetNameFunc={resetName}
        />
      </div>
      <div className="left-0 flex w-full items-end justify-center bg-gradient-to-t lg:static lg:h-auto lg:w-auto lg:bg-none">
        <PackageVersionSelect
          label="Package Version"
          options={packageVersions}
          value={packageVersion}
          packageType={packageType}
          packageNamespace={packageNamespace}
          packageName={packageName}
          setPackageVersionFunc={setPackageVersion}
          setGraphDataFunc={setGraphData}
        />
      </div>
    </div>
  );
}
