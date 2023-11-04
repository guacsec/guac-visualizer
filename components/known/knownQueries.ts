import gql from "graphql-tag";

// VULN QUERY
export const GET_VULNS = gql`
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
export const GET_SBOMS = gql`
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
export const GET_OCCURRENCES_BY_VERSION = gql`
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

export const GET_SLSAS = gql`
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
