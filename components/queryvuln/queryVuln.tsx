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
    </div>
  );
};

export default QueryCertifyVuln;
