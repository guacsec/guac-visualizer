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
} from "@/gql/__generated__/graphql";

export type NodeFragment =
  | AllArtifactTreeFragment
  | AllBuilderTreeFragment
  | AllCertifyBadFragment
  | AllCertifyGoodFragment
  | AllCertifyScorecardFragment
  | AllCertifyVexStatementFragment

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