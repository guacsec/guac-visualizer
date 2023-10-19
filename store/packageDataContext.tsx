import { createContext, useContext, useState, ReactNode } from "react";

type PackageDataContextType = {
  pkgID: string;
  setPkgID: (pkg: string) => void;
  packageName: string;
  setPackageName: React.Dispatch<React.SetStateAction<string>>;
  pkgType: string;
  setPkgType: (pkg: string) => void;
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
  const [pkgID, setPkgID] = useState<string>("");
  const [packageName, setPackageName] = useState<string>("");
  const [pkgType, setPkgType] = useState("");

  return (
    <PackageDataContext.Provider
      value={{
        pkgID,
        setPkgID,
        pkgType,
        setPkgType,
        packageName,
        setPackageName,
      }}
    >
      {children}
    </PackageDataContext.Provider>
  );
};
