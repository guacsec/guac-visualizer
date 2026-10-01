import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { CERTIFY_VULN_QUERY } from "./certifyVulnQuery";
import { useRouter } from "next/navigation";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useVulnResults } from "@/store/vulnResultsContext";

const QueryCertifyVuln: React.FC = () => {
  const [vulnerabilityID, setVulnerabilityID] = useState("");
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);
  const client = useApolloClient();
  const router = useRouter();
  const { setVulnResults } = useVulnResults();

  // triggers a GraphQL query based on the user input, updates the results state, and navigates to a URL with its corresponding id
  const handleVulnSearch = async () => {
    if (!vulnerabilityID) return;
    setSearched(true);
    const { data } = await client.query({
      query: CERTIFY_VULN_QUERY,
      variables: {
        filter: { vulnerability: { vulnerabilityID } },
      },
    });

    if (data.CertifyVuln && data.CertifyVuln.length > 0) {
      setResults(data.CertifyVuln);
      setVulnResults(data.CertifyVuln);

      const firstResultId = data.CertifyVuln[0].id;
      router.push(`/?path=${firstResultId}`);
    } else {
      setResults([]);
      setVulnResults([]);
    }
    setVulnerabilityID("");
  };

  return (
    <div className="relative flex flex-col space-y-1">
      <label className="text-xs uppercase tracking-wide opacity-70">
        Query vulnerability
      </label>
      <div className="flex items-center gap-x-2">
      <input
        className="h-[34px] rounded border px-2 text-sm dark:text-black"
        value={vulnerabilityID}
        onChange={(e) => setVulnerabilityID(e.target.value)}
        placeholder="Enter vuln ID here..."
      />
      <button
        className="h-[34px] rounded bg-blue-500 px-3 text-sm font-bold text-white hover:bg-blue-700"
        onClick={handleVulnSearch}
      >
        Search
      </button>
      </div>
      {results ? (
        <div className="absolute top-full left-0 z-[10003] mt-1 max-h-80 w-96 overflow-y-auto rounded border bg-stone-100 p-2 shadow-lg dark:bg-stone-800">
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
          <p className="absolute top-full left-0 z-[10003] mt-1 rounded border bg-stone-100 px-3 py-2 text-sm text-gray-500 shadow-lg dark:bg-stone-800">
            No results found.
          </p>
        )
      )}
    </div>
  );
};

export default QueryCertifyVuln;
