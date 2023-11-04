import React from "react";

const VulnResults: React.FC<{ results: any }> = ({ results }) => {
  return (
    <div className="mt-4">
      {results.map((node: any) => {
        return (
          <div key={node.id} className="border p-4 rounded mb-4">
            <h3 className="mt-2">
              <span className="font-semibold">Name: </span>{" "}
              {node.package.namespaces[0].names[0].name}
            </h3>
            <h3 className="mt-2">
              <span className="font-semibold">Version:</span>{" "}
              {node.package.namespaces[0].names[0].versions[0].version}
            </h3>
            <h3 className="mt-2">
              <span className="font-semibold">Type: </span>
              {node.package.type}
            </h3>
            <h3 className="mt-2">
              <span className="font-semibold">Vulnerability ID: </span>
              {node.vulnerability.vulnerabilityIDs[0].vulnerabilityID}
            </h3>
            <p className="mt-2">
              Last scanned on{" "}
              {new Date(node.metadata.timeScanned).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default VulnResults;
