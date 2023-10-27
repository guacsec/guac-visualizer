import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { usePackageData } from "@/store/packageDataContext";
import {
  ExclamationCircleIcon,
  FolderOpenIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { HasSlsa } from "@/gql/__generated__/graphql";
import {
  GET_OCCURRENCES_BY_VERSION,
  GET_SBOMS,
  GET_SLSAS,
  GET_VULNS,
} from "./knownQueries";
import { useVulnResults } from "@/store/vulnResultsContext";
import VulnResults from "./vulnResults";

const KnownInfo = () => {
  const router = useRouter();

  const { vulnResults, setVulnResults } = useVulnResults();

  const { pkgID, packageName, pkgVersion } = usePackageData();

  const [sboms, setSboms] = useState([]);
  const [vulns, setVulns] = useState([]);
  const [slsas, setSLSAs] = useState([]);

  const [handleSbomClicked, setHandleSbomClicked] = useState(false);
  const [handleVulnClicked, setHandleVulnClicked] = useState(false);
  const [handleSLSAClicked, setHandleSLSAClicked] = useState(false);

  // VULN
  const {
    loading: vulnsLoading,
    error: vulnsError,
    refetch: vulnsRefetch,
  } = useQuery(GET_VULNS, {
    variables: { pkgVersion },

    skip: true,
  });

  const fetchVulns = async () => {
    console.log("fetchVulns called");
    console.log("pkg version here", pkgVersion);
    let pathWithIDs = "";
    setHandleVulnClicked(true);
    if (pkgVersion !== "") {
      const { data } = await vulnsRefetch({ pkgVersion });
      console.log(
        "All vulnerability types:",
        data?.CertifyVuln.map((v) => v?.vulnerability?.type)
      );
      if (
        data?.CertifyVuln &&
        Array.isArray(data.CertifyVuln) &&
        data.CertifyVuln.length > 0 &&
        data.CertifyVuln.some((vuln) => vuln.vulnerability.type !== "novuln")
      ) {
        setVulns(data.CertifyVuln);
        for (let vuln of data.CertifyVuln) {
          pathWithIDs += `${vuln.id},`;
        }
        router.push(`/?path=${pathWithIDs?.slice(0, pathWithIDs.length - 1)}`);
      } else {
        console.error("Unexpected data structure:", data);
        setVulns([]);
      }
    }
  };

  // do not capture "novuln" vals
  const filteredVulns = vulns.filter(
    (vuln) => vuln?.vulnerability?.type !== "novuln"
  );

  // SBOMs
  const {
    loading: sbomLoading,
    error: sbomError,
    refetch: sbomRefetch,
  } = useQuery(GET_SBOMS, {
    variables: { name: packageName, pkgID },

    skip: true,
  });

  const fetchSBOMs = async () => {
    setHandleSbomClicked(true);
    if (packageName) {
      const { data } = await sbomRefetch({ name: packageName, pkgID });
      setSboms(data?.HasSBOM || []);

      console.log(data?.HasSBOM);
      const sbomResultID = data?.HasSBOM[0]?.id;

      if (sbomResultID) {
        router.push(`/?path=${sbomResultID}`);
      }
      console.log("Fetched all SBOMs");
    } else {
      return;
    }
  };

  const {
    loading: occurrenceLoading,
    error: occurrenceError,
    refetch: occurrenceRefetch,
  } = useQuery(GET_OCCURRENCES_BY_VERSION, {
    skip: true,
  });

  let allSLSAIds: string[] = [];

  const fetchOccurrences = async () => {
    const { data } = await occurrenceRefetch({ pkgName: packageName });
    console.log("occurences data", data);
    setHandleSLSAClicked(true);
    if (data?.IsOccurrence) {
      const allSLSAs = [];
      for (const item of data.IsOccurrence) {
        const algorithm = item.artifact?.algorithm;
        const digest = item.artifact?.digest;
        if (algorithm && digest) {
          const fetchedSLSAs = await fetchSLSAs(algorithm, digest);
          allSLSAs.push(...fetchedSLSAs);
        }
        setSLSAs(allSLSAs);

        const idString = allSLSAIds.join(",");
        router.push(`/?path=${idString}`);
      }
    }
  };

  const {
    loading: slsaLoading,
    error: slsaError,
    refetch: slsaRefetch,
  } = useQuery(GET_SLSAS, {
    skip: true,
  });

  const fetchSLSAs = async (algorithm: string, digest: string) => {
    const { data } = await slsaRefetch({ algorithm, digest });
    const slsaResults = data?.HasSLSA || [];
    slsaResults.forEach((slsa: HasSlsa) => {
      if (slsa?.id) {
        allSLSAIds.push(slsa.id);
      }
    });
    return slsaResults;
  };

  // reset state
  const resetState = () => {
    setSboms([]);
    setVulns([]);
    setSLSAs([]);
    setVulnResults([]);
    setHandleSbomClicked(false);
    setHandleVulnClicked(false);
    setHandleSLSAClicked(false);
  };

  // trigger for resetting
  // useEffect(() => {
  //   resetState();
  // }, [pkgID, packageName, pkgVersion]);

  return (
    <div className="text-black">
      <div className="flex items-center justify-center">
        <button
          disabled={!pkgID}
          type="button"
          className={`inline-flex items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2 my-5 ${
            !pkgID ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={fetchVulns}
        >
          Vulnerabilities
          <ExclamationCircleIcon
            className="-mr-0.5 h-5 w-5"
            aria-hidden="true"
          />
        </button>
        <button
          disabled={!packageName || !pkgID}
          type="button"
          className={`inline-flex items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2 my-5 ${
            !packageName || !pkgID ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={fetchSBOMs}
        >
          SBOM
          <FolderOpenIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
        <button
          disabled={!packageName}
          type="button"
          className={`inline-flex items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2 my-5 ${
            !packageName || !pkgID ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={fetchOccurrences}
        >
          SLSA
          <Square3Stack3DIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
        <button
          disabled={!pkgID}
          type="button"
          className={`inline-flex items-center gap-x-1.5 rounded-md bg-gray-300 px-2.5 py-1.5 text-sm font-semibold text-gray shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2 my-5 ${
            !pkgID ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={resetState}
        >
          <TrashIcon
            className="-mr-0.5 h-5 w-5 text-stone-600"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="m-10">
        {handleSbomClicked &&
          (sboms.length === 0 ? (
            <h2>This package doesn't have an SBOM associated with it</h2>
          ) : (
            <ul>
              {sboms.map((sbom) => (
                <li key={sbom.id}>
                  {sbom.__typename === "HasSBOM" && (
                    <div>
                      <h1 className="font-semibold">
                        Package {sbom.subject?.namespaces[0]?.names[0]?.name}{" "}
                        has an SBOM located in this location:{" "}
                      </h1>
                      <p className="bg-gray-200 p-2">{sbom.downloadLocation}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ))}
      </div>

      <div className="m-10">
        {handleVulnClicked &&
          (filteredVulns.length === 0 ? (
            <h2>
              This package doesn't have any vulnerabilities associated with it
            </h2>
          ) : (
            <ul>
              {filteredVulns.map((vuln, index) => (
                <li key={index}>
                  <div>
                    <h1 className="font-semibold">
                      Name:{" "}
                      {vuln?.package?.namespaces?.[0]?.names?.[0]?.name ||
                        "N/A"}
                    </h1>
                    <p>
                      Version:{" "}
                      {vuln?.package?.namespaces?.[0]?.names?.[0]?.versions?.[0]
                        ?.version || "N/A"}
                    </p>
                    <p>Type: {vuln?.vulnerability?.type || "N/A"}</p>
                    <p>
                      Vulnerability ID:{" "}
                      {vuln?.vulnerability?.vulnerabilityIDs?.[0]
                        ?.vulnerabilityID || "N/A"}
                    </p>
                    <p>Last scanned: {vuln?.metadata?.timeScanned || "N/A"}</p>
                  </div>
                  <br />
                </li>
              ))}
            </ul>
          ))}
      </div>
      <div className="m-10">
        {handleSLSAClicked &&
          (slsas.length === 0 ? (
            <h2>No SLSA attestations found</h2>
          ) : (
            <ul>
              {slsas.map((slsa, index) => (
                <li className="border border-b-slate-600 py-2" key={index}>
                  <div>
                    <p className="break-all">
                      <span className="font-bold text-md mr-2">Hash:</span>{" "}
                      {slsa.subject?.algorithm}:{slsa.subject?.digest}
                    </p>
                    <div className="flex flex-col space-y-1">
                      <p>
                        <span className="font-bold text-md mr-2">
                          Build Type:{" "}
                        </span>
                        {slsa.slsa?.buildType}
                      </p>
                      <p>
                        <span className="font-bold text-md mr-2">
                          Visualizer URL:{" "}
                        </span>
                        {`http:localhost:3000/?path=${slsa?.id},${slsa.slsa.builtFrom[0].id}`}
                      </p>
                      <p>
                        <span className="font-bold text-md mr-2">
                          Built By:{" "}
                        </span>
                        {slsa.slsa?.builtBy?.uri}
                      </p>
                      <p>
                        <span className="font-bold text-md mr-2">Origin: </span>
                        {slsa.slsa?.origin}
                      </p>
                      <p>
                        <span className="font-bold text-md mr-2">
                          SLSA Version:
                        </span>{" "}
                        {slsa.slsa?.slsaVersion}
                      </p>
                    </div>
                  </div>
                  <br />
                  <hr />
                </li>
              ))}
            </ul>
          ))}
      </div>
      {vulnResults && <VulnResults results={vulnResults} />}
    </div>
  );
};

export default KnownInfo;
