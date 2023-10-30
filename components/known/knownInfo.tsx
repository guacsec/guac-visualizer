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
import {
  GET_OCCURRENCES_BY_VERSION,
  GET_SBOMS,
  GET_SLSAS,
  GET_VULNS,
} from "./knownQueries";
import { useVulnResults } from "@/store/vulnResultsContext";
import VulnResults from "./vulnResults";
import { CertifyVuln } from "@/gql/__generated__/graphql";

const KnownInfo = () => {
  const router = useRouter();
  const { vulnResults, setVulnResults } = useVulnResults();

  const { pkgID, packageName, pkgVersion } = usePackageData();

  const [sboms, setSboms] = useState([]);
  const [vulns, setVulns] = useState([]);
  const [slsas, setSLSAs] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  const [toggleSLSA, setToggleSLSA] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [handleSbomClicked, setHandleSbomClicked] = useState(false);
  const [handleVulnClicked, setHandleVulnClicked] = useState(false);
  const [slsaIndex, setSLSAIndex] = useState(null);
  const [handleOccurrencesClicked, setHandleOccurrencesClicked] =
    useState(false);

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
    let pathWithIDs = "";
    resetState();
    setHandleVulnClicked(true);
    if (pkgVersion !== "") {
      const { data } = await vulnsRefetch({ pkgVersion });
      if (
        data?.CertifyVuln &&
        Array.isArray(data.CertifyVuln) &&
        data.CertifyVuln.length > 0 &&
        data.CertifyVuln.some(
          (vuln: CertifyVuln) => vuln.vulnerability.type !== "novuln"
        )
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
    resetState();
    setHandleSbomClicked(true);
    if (packageName) {
      const { data } = await sbomRefetch({ name: packageName, pkgID });
      setSboms(data?.HasSBOM || []);
      const sbomResultID = data?.HasSBOM[0]?.id;

      if (sbomResultID) {
        router.push(`/?path=${sbomResultID}`);
      }
    } else {
      return;
    }
  };

  // OCCURENCES AND SLSA
  const { refetch: occurrenceRefetch } = useQuery(GET_OCCURRENCES_BY_VERSION, {
    skip: true,
  });

  const {
    loading: slsaLoading,
    error: slsaError,
    refetch: slsaRefetch,
  } = useQuery(GET_SLSAS, {
    skip: true,
  });

  const fetchOccurrences = async () => {
    resetState();
    setHandleOccurrencesClicked(true);
    const { data } = await occurrenceRefetch({ pkgName: packageName });

    if (data?.IsOccurrence) {
      setOccurrences(data.IsOccurrence);
    }
  };

  const fetchSLSAForArtifact = async (
    algorithm: string,
    digest: string,
    index: number
  ) => {
    const { data } = await slsaRefetch({ algorithm, digest });
    const newSLSA = data?.HasSLSA || [];
    setSLSAs((prevSLSAs) => {
      const updatedSLSAs = { ...prevSLSAs };
      updatedSLSAs[index] = newSLSA;
      return updatedSLSAs;
    });
    setSLSAIndex(index);
    router.push(`/?path=${newSLSA[0].id},${occurrences[index]?.id}`);
  };

  const handleToggleSLSA = (index) => {
    setToggleSLSA((prevToggle) => ({
      ...prevToggle,
      [index]: !prevToggle[index],
    }));
  };

  const handleGetSLSA = async (
    algorithm: string,
    digest: string,
    index: number
  ) => {
    if (toggleSLSA[index]) {
      handleToggleSLSA(index);
    } else {
      await fetchSLSAForArtifact(algorithm, digest, index);
      handleToggleSLSA(index);
    }
  };

  // reset state
  function resetState() {
    setSboms([]);
    setVulns([]);
    setSLSAs([]);
    setToggleSLSA([]);
    setVulnResults([]);
    setHandleSbomClicked(false);
    setHandleVulnClicked(false);
    setHandleOccurrencesClicked(false);
  }

  // For VULN loading and error
  const VULNLoadingElement = vulnsLoading ? (
    <div>Loading vulnerabilities...</div>
  ) : null;
  const VULNErrorElement = vulnsError ? (
    <div>Error: {vulnsError.message}</div>
  ) : null;

  // For SBOMs loading and error
  const SBOMLoadingElement = sbomLoading ? <div>Loading SBOMs...</div> : null;
  const SBOMErrorElement = sbomError ? (
    <div>Error: {sbomError.message}</div>
  ) : null;

  // For SLSA loading and error
  const SLSALoadingElement = slsaLoading ? <div>Loading SLSAs...</div> : null;
  const SLSAErrorElement = slsaError ? (
    <div>Error: {slsaError.message}</div>
  ) : null;

  // trigger for resetting
  // useEffect(() => {
  //   resetState();
  // }, [pkgID, packageName, pkgVersion]);

  return (
    <div className="text-black">
      <div className="flex items-center justify-center">
        {VULNLoadingElement}
        {VULNErrorElement}
        {SBOMLoadingElement}
        {SBOMErrorElement}
        {SLSALoadingElement}
        {SLSAErrorElement}
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
            <h2>Didn't find SBOMs</h2>
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
            <h2>Didn't find vulns</h2>
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
        {handleOccurrencesClicked &&
          (occurrences.length === 0 ? (
            <h2>No SLSA attestations found</h2>
          ) : (
            <div>
              <p className="font-semibold text-md m-2">Search by artifact</p>
              <input
                type="text"
                placeholder="🔍 Enter hash here..."
                className="p-2 mb-4 border-b border-gray-400/90 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <hr className="border-b border-gray-400/30 my-5 w-1/2" />
              <ul className="space-y-4">
                {occurrences
                  .filter((occurrence) => {
                    const hash = `${occurrence.artifact.algorithm}:${occurrence.artifact.digest}`;
                    return hash.includes(searchTerm);
                  })
                  .map((occurrence, index) => (
                    <div
                      key={index}
                      className="p-5 border rounded-lg shadow-lg"
                    >
                      <h3 className="text-md font-semibold text-gray-600 break-all">
                        {occurrence.subject.namespaces[0].names[0].name}
                      </h3>
                      <p className="text-sm text-gray-600 break-all">
                        {occurrence.artifact.algorithm}:
                        {occurrence.artifact.digest}
                      </p>
                      <button
                        className="px-4 py-2 mt-3 text-white bg-stone-500 rounded hover:bg-blue-400"
                        onClick={() =>
                          handleGetSLSA(
                            occurrence.artifact.algorithm,
                            occurrence.artifact.digest,
                            index
                          )
                        }
                      >
                        {toggleSLSA[index] ? "Hide SLSA" : "Get SLSA"}
                      </button>
                      {toggleSLSA[index] &&
                        slsaIndex === index &&
                        slsas[index] && (
                          <div className="mt-3">
                            <p className="my-2">
                              <span className="font-semibold">Build Type:</span>{" "}
                              {slsas[index][0]?.slsa?.buildType}
                            </p>
                            <p className="my-2">
                              <span className="font-semibold">Built By:</span>{" "}
                              {slsas[index][0]?.slsa?.builtBy.uri}
                            </p>
                            <p className="my-2">
                              <span className="font-semibold">
                                Download location:
                              </span>{" "}
                              {slsas[index][0]?.slsa?.origin}
                            </p>
                            <p className="my-2">
                              <span className="font-semibold">
                                SLSA Version:
                              </span>{" "}
                              {slsas[index][0]?.slsa?.slsaVersion}
                            </p>
                            <div className="p-3 mt-2 bg-gray-100 rounded">
                              <ul>
                                <p className="font-semibold text-md py-2">
                                  Predicate{" "}
                                </p>
                                {slsas[index][0]?.slsa?.slsaPredicate.map(
                                  (predicate, i) => (
                                    <li
                                      key={i}
                                      className="py-1 px-2 flex flex-col bg-blue-50 rounded text-sm"
                                    >
                                      <span className="font-semibold">
                                        {predicate.key} :
                                      </span>
                                      <span className="">
                                        {predicate.value}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
              </ul>
            </div>
          ))}
      </div>

      {vulnResults && <VulnResults results={vulnResults} />}
    </div>
  );
};

export default KnownInfo;
