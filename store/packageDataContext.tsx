import { Package } from "@/gql/__generated__/graphql";
import { createContext, useContext, useState, ReactNode } from "react";

type PackageDataContextType = {
  pkgContext: any;
  setPkgContext: (pkg: any) => void;
  pkgID: string;
  setPkgID: (pkg: string) => void;
  packageName: string;
  setPackageName: React.Dispatch<React.SetStateAction<string>>;
  pkgType: string;
  setPkgType: (pkg: string) => void;
  pkgVersion: string;
  setPkgVersion: (pkg: string) => void;
};

const PackageDataContext = createContext<PackageDataContextType | undefined>(
  undefined
);

export const usePackageData = () => {
  const context = useContext(PackageDataContext);
  if (!context) {
    throw new Error("usePackageData must be used within a Provider");
  }
  return context;
};

type PackageDataProviderProps = {
  children: ReactNode;
};

export const PackageDataProvider: React.FC<PackageDataProviderProps> = ({
  children,
}) => {
  const [pkgContext, setPkgContext] = useState<Package>();
  const [pkgID, setPkgID] = useState<string>("");
  const [packageName, setPackageName] = useState<string>("");
  const [pkgType, setPkgType] = useState("");
  const [pkgVersion, setPkgVersion] = useState("");

  return (
    <PackageDataContext.Provider
      value={{
        pkgContext,
        setPkgContext,
        pkgID,
        setPkgID,
        pkgType,
        setPkgType,
        packageName,
        setPackageName,
        pkgVersion,
        setPkgVersion,
      }}
    >
      {children}
    </PackageDataContext.Provider>
  );
};
