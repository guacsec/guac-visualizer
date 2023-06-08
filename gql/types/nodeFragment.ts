import {
  AllArtifactTreeFragment,
  AllBuilderTreeFragment,
  AllCertifyBadTreeFragment,
  AllCertifyGoodTreeFragment,
  AllCertifyScorecardTreeFragment,
  AllCertifyVexStatementTreeFragment,
  AllCertifyVulnTreeFragment,
  AllCveTreeFragment,
  AllGhsaTreeFragment,
  AllHashEqualTreeFragment,
  AllHasSbomTreeFragment,
  AllHasSlsaTreeFragment,
  AllHasSourceAtTreeFragment,
  AllIsDependencyTreeFragment,
  AllIsOccurrencesTreeFragment,
  AllIsVulnerabilityTreeFragment,
  AllOsvTreeFragment,
  AllPkgEqualTreeFragment,
  AllPkgTreeFragment,
  AllSrcTreeFragment,
} from "@/gql/__generated__/graphql";

export type NodeFragment =
  | AllArtifactTreeFragment
  | AllBuilderTreeFragment
  | AllCveTreeFragment
  | AllCertifyBadTreeFragment
  | AllCertifyGoodTreeFragment
  | AllCertifyScorecardTreeFragment
  | AllCertifyVexStatementTreeFragment
  | AllCertifyVulnTreeFragment
  | AllGhsaTreeFragment
  | AllHasSbomTreeFragment
  | AllHasSlsaTreeFragment
  | AllHasSourceAtTreeFragment
  | AllHashEqualTreeFragment
  | AllIsDependencyTreeFragment
  | AllIsOccurrencesTreeFragment
  | AllIsVulnerabilityTreeFragment
  | AllOsvTreeFragment
  | AllPkgTreeFragment
  | AllPkgEqualTreeFragment
  | AllSrcTreeFragment;
