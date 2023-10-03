import { gql } from "@apollo/client";

export const CERTIFY_VULN_QUERY = gql`
  query CertifyVuln($filter: CertifyVulnSpec!) {
    CertifyVuln(certifyVulnSpec: $filter) {
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
  }
`;
