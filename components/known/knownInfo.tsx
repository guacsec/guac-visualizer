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
  const { pkgID, packageName, pkgType } = usePackageData();

  const [sboms, setSboms] = useState([]);

  const {
    loading: occLoading,

    error: occError,

    data: occData,
  } = useQuery(GET_OCCURRENCES_BY_TYPE, {
    variables: { pkgType },
  });

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

  // Logic for SBOMs
  if (sbomLoading) return <p>Loading SBOMs...</p>;

  if (sbomError) return <p>Error in SBOMs: {sbomError.message}</p>;

  return (
    <div className="">
      {pkgID && (
        <button className="bg-red-100 m-2" onClick={fetchSBOMs}>
          Get SBOM Location
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
    </div>
  );
};

export default KnownInfo;
