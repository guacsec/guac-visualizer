import PackageTypeSelect from "@/components/guac/packageTypeSelect";
import PackageNamespaceSelect from "@/components/guac/packageNamespaceSelect";
import PackageNameSelect, {
  VersionQueryVersion,
} from "@/components/guac/packageNameSelect";
import PackageVersionSelect from "@/components/guac/packageVersionSelect";
import { useState } from "react";
import { GraphData } from "react-force-graph-2d";
import { PackageSelectorOption } from "@/components/guac/packageGenericSelector";

export const INITIAL_PACKAGE_NAMESPACES: PackageSelectorOption<string>[] = [
  { label: "loading...", value: "loading" },
];

export default function PackageSelector({
  packageTypes,
  setGraphData,
}: {
  packageTypes: PackageSelectorOption<string>[];
  setGraphData: (data: GraphData) => void;
}) {
  const [packageType, setPackageType] = useState("");
  const [packageNamespace, setPackageNamespace] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageNamespaces, setPackageNamespaces] = useState(
    INITIAL_PACKAGE_NAMESPACES
  );
  const [packageNames, setPackageNames] = useState(INITIAL_PACKAGE_NAMESPACES);
  const [packageVersions, setPackageVersions] =
    useState<PackageSelectorOption<VersionQueryVersion>[]>(null);

  const resetNamespace = () => {
    setPackageNames(INITIAL_PACKAGE_NAMESPACES);
    setPackageName("");
    resetName();
  };

  const resetName = () => {
    setPackageVersions(null);
  };

  const resetType = () => {
    setPackageNamespaces(INITIAL_PACKAGE_NAMESPACES);
    setPackageNamespace("");
    resetNamespace();
  };

  return (
    <div
      id="ptDiv"
      className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm space-y-2 lg:flex"
    >
      <div className="left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
        <PackageTypeSelect
          label="Package Type"
          options={packageTypes}
          setPackageTypeFunc={setPackageType}
          setPackageNamespacesFunc={setPackageNamespaces}
          resetTypeFunc={resetType}
        />
      </div>
      <div className="left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
        <PackageNamespaceSelect
          label="Package Namespace"
          options={packageNamespaces}
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
          packageType={packageType}
          packageNamespace={packageNamespace}
          packageName={packageName}
          setGraphDataFunc={setGraphData}
        />
      </div>
    </div>
  );
}
