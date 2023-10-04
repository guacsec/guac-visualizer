"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { CERTIFY_VULN_QUERY } from "./certifyVulnQuery";
import { useRouter } from "next/navigation";
import { useGraphData } from "@/hooks/useGraphData";

const QueryCertifyVuln: React.FC = () => {
  const [vulnerabilityID, setVulnerabilityID] = useState("");
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);
  const client = useApolloClient();
  const router = useRouter();

  const { setGraphData } = useGraphData();

  // triggers a GraphQL query based on the user input, updates the results state, and navigates to a URL with its corresponding id
  const handleVulnSearch = async () => {
    setSearched(true);
    const { data } = await client.query({
      query: CERTIFY_VULN_QUERY,
      variables: {
        filter: { vulnerability: { vulnerabilityID } },
      },
    });
    setResults(data.CertifyVuln);
    if (data.CertifyVuln && data.CertifyVuln.length > 0) {
      const firstResultId = data.CertifyVuln[0].id;
      router.push(`/?path=${firstResultId}`);
    }
  };

  // updates the URL and graph data based on the first result's ID whenever the results state changes.
  // note: this is temporary until a more stable URL parameter feature is built out
  useEffect(() => {
    if (results && results.length > 0) {
      const firstResultId = results[0].id;
      const currentPath = window.location.pathname;
      const newPath = `/?path=${firstResultId}`;
      const newUrl =
        currentPath !== "/"
          ? currentPath.replace(/\?path=.*/, newPath)
          : newPath;

      window.history.pushState(null, "", newUrl);

      setGraphData(firstResultId);
    }
  }, [results]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="py-3 text-lg font-semibold">Query vulnerability</h1>
      <input
        className="border rounded p-2 mb-4"
        value={vulnerabilityID}
        onChange={(e) => setVulnerabilityID(e.target.value)}
        placeholder="Enter vuln ID here..."
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleVulnSearch}
      >
        Search
      </button>

      {results ? (
        <div className="mt-4">
          {results.map((node) => {
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
      ) : (
        searched && (
          <p className="mt-4 text-lg text-gray-500">No results found.</p>
        )
      )}
    </div>
  );
};

export default QueryCertifyVuln;
