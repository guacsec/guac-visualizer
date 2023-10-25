import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import gql from "graphql-tag";
import { usePackageData } from "@/store/packageDataContext";
import {
  ArrowPathIcon,
  ExclamationCircleIcon,
  FolderOpenIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { useGraphData } from "@/hooks/useGraphData";
import { useRouter } from "next/navigation";
import { HasSlsa } from "@/gql/__generated__/graphql";

// TODO: Everything is in one file right now, before making PR, branch these out to their respective folders
// TODO: Use queries from generated code, the queries here are just for quick and dirty testing
// TODO: Get vulns for a package
/*

.
.
.
*/

// VULN QUERY
const GET_VULNS = gql`
  fragment allCertifyVulnTree on CertifyVuln {
    id
    package {
      id
      type
      namespaces {
        id
        namespace
        names {
          id
          name
          versions {
            id
            version
            qualifiers {
              key
              value
            }
            subpath
          }
        }
      }
    }
    vulnerability {
      id
      type
      vulnerabilityIDs {
        id
        vulnerabilityID
      }
    }
    metadata {
      dbUri
      dbVersion
      scannerUri
      scannerVersion
      timeScanned
      origin
      collector
    }
  }

  query CertifyVuln($pkgVersion: String!) {
    CertifyVuln(certifyVulnSpec: { package: { version: $pkgVersion } }) {
      ...allCertifyVulnTree
    }
  }
`;

// SBOM QUERY
const GET_SBOMS = gql`
  query HasSBOM($name: String!, $pkgID: ID!) {
    HasSBOM(
      hasSBOMSpec: { subject: { package: { name: $name, id: $pkgID } } }
    ) {
      ...allHasSBOMTree
    }
  }

  fragment allHasSBOMTree on HasSBOM {
    id
    subject {
      __typename
      ... on Package {
        id
        type
        namespaces {
          id
          namespace
          names {
            id
            name
            versions {
              id
              version
              qualifiers {
                key
                value
              }
              subpath
            }
          }
        }
      }

      ... on Artifact {
        id
        algorithm
        digest
      }
    }
    uri
    algorithm
    digest
    downloadLocation
    origin
    collector
  }
`;

// OCCURENCES + SLSA
const GET_OCCURRENCES_BY_VERSION = gql`
  fragment allIsOccurrencesTree on IsOccurrence {
    id
    subject {
      __typename
      ... on Package {
        id
        type
        namespaces {
          id
          namespace
          names {
            id
            name
            versions {
              id
              version
              qualifiers {
                key
                value
              }
              subpath
            }
          }
        }
      }
      ... on Source {
        id
        type
        namespaces {
          id
          namespace
          names {
            id
            name
            tag
            commit
          }
        }
      }
    }
    artifact {
      id
      algorithm
      digest
    }
    justification
    origin
    collector
  }

  query IsOccurrenceByVersion($pkgName: String!) {
    IsOccurrence(
      isOccurrenceSpec: { subject: { package: { name: $pkgName } } }
    ) {
      ...allIsOccurrencesTree
    }
  }
`;

const GET_SLSAS = gql`
  fragment allHasSLSATree on HasSLSA {
    id
    subject {
      id
      algorithm
      digest
    }
    slsa {
      builtFrom {
        id
        algorithm
        digest
      }
      builtBy {
        id
        uri
      }
      buildType
      slsaPredicate {
        key
        value
      }
      slsaVersion
      startedOn
      finishedOn
      origin
      collector
    }
  }

  query HasSLSA($algorithm: String!, $digest: String!) {
    HasSLSA(
      hasSLSASpec: { subject: { algorithm: $algorithm, digest: $digest } }
    ) {
      ...allHasSLSATree
    }
  }
`;

const KnownInfo = () => {
  const router = useRouter();
  const { pkgID, packageName, pkgVersion } = usePackageData();

  const [sboms, setSboms] = useState([]);
  const [vulns, setVulns] = useState([]);
  const [slsas, setSLSAs] = useState([]);

  const [handleSbomClicked, setHandleSbomClicked] = useState(false);
  const [handleVulnClicked, setHandleVulnClicked] = useState(false);
  const [handleSLSAClicked, setHandleSLSAClicked] = useState(false);

  const { resetGraph } = useGraphData();

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
    setHandleVulnClicked(true);
    if (pkgVersion !== "") {
      const { data } = await vulnsRefetch({ pkgVersion });
      if (
        data?.CertifyVuln &&
        Array.isArray(data.CertifyVuln) &&
        data.CertifyVuln.length > 0
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

  // SBOM
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
      }
      setSLSAs(allSLSAs);

      const idString = allSLSAIds.join(",");
      router.push(`/?path=${idString}`);
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

  const resetState = () => {
    setSboms([]);
    setVulns([]);
    setSLSAs([]);
    setHandleSbomClicked(false);
    setHandleVulnClicked(false);
    setHandleSLSAClicked(false);
    resetGraph(pkgID);
  };
  // reset
  useEffect(() => {
    resetState();
  }, [pkgID, packageName, pkgVersion]);

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
          <ArrowPathIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
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
                      {slsa.subject?.algorithm}
                      {slsa.subject?.digest}
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
    </div>
  );
};

export default KnownInfo;
