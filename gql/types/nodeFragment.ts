import {
  AllArtifactTreeFragment,
  AllBuilderTreeFragment,
  AllCertifyBadFragment,
  AllCertifyGoodFragment,
  AllCertifyScorecardFragment,
  AllCertifyVexStatementFragment,
  AllHashEqualTreeFragment,
  AllHasSbomTreeFragment,
  AllSlsaTreeFragment,
  AllHasSourceAtFragment,
  AllIsDependencyTreeFragment,
  AllIsOccurrencesTreeFragment,
  AllCertifyVulnFragment,
  AllPkgEqualFragment,
  AllPkgTreeFragment,
  AllSourceTreeFragment,
  VulnerabilityId,
} from "@/gql/__generated__/graphql";

export type NodeFragment =
  | AllArtifactTreeFragment
  | AllBuilderTreeFragment
  | AllCertifyBadFragment
  | AllCertifyGoodFragment
  | AllCertifyScorecardFragment
  | AllCertifyVexStatementFragment
  | VulnerabilityId
  | AllHasSbomTreeFragment
  | AllSlsaTreeFragment
  | AllHasSourceAtFragment
  | AllHashEqualTreeFragment
  | AllIsDependencyTreeFragment
  | AllIsOccurrencesTreeFragment
  | AllCertifyVulnFragment
  | AllPkgTreeFragment
  | AllPkgEqualFragment
  | AllSourceTreeFragment;
