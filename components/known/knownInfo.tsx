import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { usePackageData } from "@/store/packageDataContext";
import client from "@/apollo/client";
import {
  ExclamationCircleIcon,
  FolderOpenIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";

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
    setHandleVulnClicked(true);
    if (pkgVersion !== "") {
      const { data } = await vulnsRefetch({ pkgVersion });
      if (
        data?.CertifyVuln &&
        Array.isArray(data.CertifyVuln) &&
        data.CertifyVuln.length > 0
      ) {
        setVulns(data.CertifyVuln);
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
    setHandleSbomClicked(true); // Set to true when button is clicked
    if (packageName) {
      const { data } = await sbomRefetch({ name: packageName, pkgID });
      setSboms(data?.HasSBOM || []);
      console.log("Fetched all SBOMs");
    } else {
      return;
    }
  };

  const {
    loading: slsaLoading,
    error: slsaError,
    refetch: slsaRefetch,
  } = useQuery(GET_SLSAS, {
    skip: true,
  });

  const fetchSLSAs = async (algorithm, digest) => {
    setHandleSLSAClicked(true);
    const { data } = await slsaRefetch({ algorithm, digest });
    setSLSAs(data?.HasSLSA || []);
    console.log("Fetched all SLSAs");
  };

  const {
    loading: occurrenceLoading,
    error: occurrenceError,
    refetch: occurrenceRefetch,
  } = useQuery(GET_OCCURRENCES_BY_VERSION, {
    skip: true,
  });

  const fetchOccurrences = async () => {
    const { data } = await occurrenceRefetch({ pkgName: packageName });
    setHandleSLSAClicked(true);
    if (data?.IsOccurrence) {
      console.log(data);
      data.IsOccurrence.forEach((item) => {
        const algorithm = item.artifact?.algorithm;
        const digest = item.artifact?.digest;
        if (algorithm && digest) {
          fetchSLSAs(algorithm, digest);
        }
      });
    }
  };

  useEffect(() => {
    console.log("Package changed");
    setSboms([]);
    setVulns([]);
    setSLSAs([]);
    setHandleSbomClicked(false);
    setHandleVulnClicked(false);
    setHandleSLSAClicked(false);
  }, [pkgID, packageName, pkgVersion]);

  return (
    <div className="">
      <button
        disabled={!pkgVersion}
        type="button"
        className={`inline-flex items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2 my-5 ${
          !pkgVersion ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={fetchVulns}
      >
        Vulnerabilities
        <ExclamationCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
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
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mx-2 my-5"
        onClick={fetchOccurrences}
      >
        SLSA
        <Square3Stack3DIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>

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
                <li key={index}>
                  <div>
                    <p className="break-all">
                      Hash: {slsa.subject?.algorithm}
                      {slsa.subject?.digest}
                    </p>
                    {/* NODE ID: */}
                    {/* <p>{slsa.id}</p> */}
                    <br />
                    <p>Build Type: {slsa.slsa?.buildType}</p>
                    <p>Built By: {slsa.slsa?.builtBy?.uri}</p>
                    <p>Origin: {slsa.slsa?.origin}</p>
                    <p>SLSA Version: {slsa.slsa?.slsaVersion}</p>
                  </div>
                  <br />
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
};

export default KnownInfo;
