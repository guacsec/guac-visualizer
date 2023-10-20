import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { usePackageData } from "@/store/packageDataContext";
import client from "@/apollo/client";

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
const GET_OCCURRENCES_BY_TYPE = gql`
  query IsOccurrenceByType($pkgType: String!) {
    IsOccurrence(
      isOccurrenceSpec: { subject: { package: { type: $pkgType } } }
    ) {
      id
      subject {
        ... on Package {
          id
          type
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
  }
`;

const CHECK_SLSA = gql`
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
  const { pkgID, packageName, pkgType, pkgVersion } = usePackageData();

  const [sboms, setSboms] = useState([]);
  const [vulns, setVulns] = useState([]);

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
  };

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
    const { data } = await sbomRefetch({ name: packageName, pkgID });
    setSboms(data?.HasSBOM || []);
    console.log("Fetched all SBOMs");
  };

  // SLSA
  // const {
  //   loading: occLoading,

  //   error: occError,

  //   data: occData,
  // } = useQuery(GET_OCCURRENCES_BY_TYPE, {
  //   variables: { pkgType },
  // });

  // TODO: Fix performance, linear fetch is too long and slows browser
  // useEffect(() => {
  //   const fetchSLSA = async (algorithm, digest) => {
  //     const { data } = await client.query({
  //       query: CHECK_SLSA,
  //       variables: { algorithm, digest },
  //     });

  //     console.log("SLSA Data for artifact:", data);
  //   };

  //   if (occData && occData.IsOccurrence && occData.IsOccurrence.length > 0) {
  //     occData.IsOccurrence.forEach((occurrence) => {
  //       const { algorithm, digest } = occurrence.artifact;

  //       if (algorithm && digest) {
  //         fetchSLSA(algorithm, digest);
  //       }
  //     });
  //   }

  //   console.log("I ran!");
  // }, [occData, client]);

  return (
    <div className="">
      {pkgID && (
        <button className="bg-red-100 m-2" onClick={fetchSBOMs}>
          Get SBOM Location
        </button>
      )}
      {pkgVersion && (
        <button className="bg-red-100 m-2" onClick={fetchVulns}>
          Get Vulnerabilities
        </button>
      )}

      <div className="m-10">
        {sboms.length === 0 ? (
          <h2>No sboms found</h2>
        ) : (
          <ul>
            {sboms.map((sbom) => (
              <li key={sbom.id}>
                {sbom.__typename === "HasSBOM" && (
                  <div>
                    <h1 className="font-semibold">
                      Package {sbom.subject?.namespaces[0]?.names[0]?.name} has
                      an SBOM located in this location:{" "}
                    </h1>
                    <p className="bg-gray-200 p-2">{sbom.downloadLocation}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="m-10">
        {vulns.length === 0 ? (
          <h2>No vulnerabilities found</h2>
        ) : (
          <ul>
            {vulns.map((vuln, index) => (
              <li key={index}>
                {vuln?.vulnerability?.type === "novuln" ? (
                  <p>No vulns found</p>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default KnownInfo;
