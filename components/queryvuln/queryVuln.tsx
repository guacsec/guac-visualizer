"use client";

import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { CERTIFY_VULN_QUERY } from "./certifyVulnQuery";
import { useRouter } from "next/navigation";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

const QueryCertifyVuln: React.FC = () => {
  const [vulnerabilityID, setVulnerabilityID] = useState("");
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);
  const client = useApolloClient();
  const router = useRouter();

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

  return (
    <div className="ml-10 container mx-auto p-4">
      <h1 className="text-lg">Query vulnerability</h1>
      <div className="flex items-center justify-center mt-2">
        <input
          className="border rounded p-2.5 w-11/12"
          value={vulnerabilityID}
          onChange={(e) => setVulnerabilityID(e.target.value)}
          placeholder="Enter vuln ID here..."
        />
        <button
          className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-300 p-2.5 text-sm font-semibold text-gray shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2"
          onClick={handleVulnSearch}
        >
          <ArrowRightCircleIcon
            className="-mr-0.5 h-5 w-5 text-stone-600"
            aria-hidden="true"
          />
        </button>
      </div>

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
