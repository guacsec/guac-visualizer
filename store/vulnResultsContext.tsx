import React, { ReactNode, createContext, useContext, useState } from "react";

type VulnResultsContextType = {
  vulnResults: string[] | null;
  setVulnResults: React.Dispatch<React.SetStateAction<any>>;
};

const VulnResultsContext = createContext<VulnResultsContextType | undefined>(
  undefined
);

type VulnResultsProviderProps = {
  children: ReactNode;
};

export const VulnResultsProvider: React.FC<VulnResultsProviderProps> = ({
  children,
}) => {
  const [vulnResults, setVulnResults] = useState(null);

  return (
    <VulnResultsContext.Provider value={{ vulnResults, setVulnResults }}>
      {children}
    </VulnResultsContext.Provider>
  );
};

export const useVulnResults = () => {
  const context = useContext(VulnResultsContext);
  if (context === undefined) {
    throw new Error("useResults must be used within a VulnResultsProvider");
  }
  return context;
};
