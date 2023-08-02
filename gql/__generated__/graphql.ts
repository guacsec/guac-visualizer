/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Define the Time scalar, to be used across GUAC. It follows RFC3339Nano format.
   *
   * This is implicit via https://gqlgen.com/reference/scalars/#time
   *
   * For GUAC, we assume that all times are stored in UTC format.
   */
  Time: any;
};

/**
 * Artifact represents an artifact identified by a checksum hash.
 *
 * The checksum is split into the digest value and the algorithm used to generate
 * it. Both fields are mandatory and canonicalized to be lowercase.
 *
 * If having a checksum Go object, algorithm can be
 * strings.ToLower(string(checksum.Algorithm)) and digest can be checksum.Value.
 */
export type Artifact = {
  __typename?: 'Artifact';
  algorithm: Scalars['String'];
  digest: Scalars['String'];
  id: Scalars['ID'];
};

/**
 * ArtifactInputSpec specifies an artifact for mutations.
 *
 * The checksum fields are canonicalized to be lowercase.
 */
export type ArtifactInputSpec = {
  algorithm: Scalars['String'];
  digest: Scalars['String'];
};

/**
 * ArtifactSpec allows filtering the list of artifacts to return in a query.
 *
 * The checksum fields are canonicalized to be lowercase.
 */
export type ArtifactSpec = {
  algorithm?: InputMaybe<Scalars['String']>;
  digest?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

/**
 * Builder represents the builder (e.g., FRSCA or GitHub Actions).
 *
 * Currently builders are identified by the uri field.
 */
export type Builder = {
  __typename?: 'Builder';
  id: Scalars['ID'];
  uri: Scalars['String'];
};

/** BuilderInputSpec specifies a builder for mutations. */
export type BuilderInputSpec = {
  uri: Scalars['String'];
};

/** BuilderSpec allows filtering the list of builders to return in a query. */
export type BuilderSpec = {
  id?: InputMaybe<Scalars['ID']>;
  uri?: InputMaybe<Scalars['String']>;
};

/**
 * CVE represents a vulnerability in the Common Vulnerabilities and Exposures
 * schema.
 *
 * The vulnerability identifier contains a year field, so we are extracting that
 * to allow matching for vulnerabilities found in a given year.
 *
 * The vulnerability identifier field is mandatory and canonicalized to be
 * lowercase.
 *
 * This node can be referred to by other parts of GUAC.
 */
export type Cve = {
  __typename?: 'CVE';
  cveId: Scalars['String'];
  id: Scalars['ID'];
  year: Scalars['Int'];
};

/** CVEInputSpec specifies a CVE vulnerability for mutations. */
export type CveInputSpec = {
  cveId: Scalars['String'];
  year: Scalars['Int'];
};

/** CVESpec allows filtering the list of advisories to return in a query. */
export type CveSpec = {
  cveId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  year?: InputMaybe<Scalars['Int']>;
};

/**
 * CertifyBad is an attestation that a package, source, or artifact is considered
 * bad.
 *
 * All evidence trees record a justification for the property they represent as
 * well as the document that contains the attestation (origin) and the collector
 * that collected the document (collector).
 *
 * The certification applies to a subject which is a package, source, or artifact.
 * If the attestation targets a package, it must target a PackageName or a
 * PackageVersion. If the attestation targets a source, it must target a
 * SourceName.
 */
export type CertifyBad = {
  __typename?: 'CertifyBad';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  subject: PackageSourceOrArtifact;
};

/**
 * CertifyBadInputSpec represents the mutation input to ingest a CertifyBad
 * evidence.
 */
export type CertifyBadInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * CertifyBadSpec allows filtering the list of CertifyBad evidence to return in a
 * query.
 *
 * If a package is specified in the subject filter, then it must be specified up
 * to PackageName or PackageVersion. That is, user must specify package name, or
 * name and one of version, qualifiers, or subpath.
 *
 * If a source is specified in the subject filter, then it must specify a name,
 * and optionally a tag and a commit.
 */
export type CertifyBadSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

/**
 * CertifyGood is an attestation that a package, source, or artifact is considered
 * good.
 *
 * All evidence trees record a justification for the property they represent as
 * well as the document that contains the attestation (origin) and the collector
 * that collected the document (collector).
 *
 * The certification applies to a subject which is a package, source, or artifact.
 * If the attestation targets a package, it must target a PackageName or a
 * PackageVersion. If the attestation targets a source, it must target a
 * SourceName.
 */
export type CertifyGood = {
  __typename?: 'CertifyGood';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  subject: PackageSourceOrArtifact;
};

/** CertifyGoodInputSpec represents the mutation input to ingest a CertifyGood evidence. */
export type CertifyGoodInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * CertifyBadSpec allows filtering the list of CertifyBad evidence to return in a
 * query.
 *
 * If a package is specified in the subject filter, then it must be specified up
 * to PackageName or PackageVersion. That is, user must specify package name, or
 * name and one of version, qualifiers, or subpath.
 *
 * If a source is specified in the subject filter, then it must specify a name,
 * and optionally a tag and a commit.
 */
export type CertifyGoodSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

/**
 * CertifyScorecard is an attestation to attach a Scorecard analysis to a
 * particular source repository.
 */
export type CertifyScorecard = {
  __typename?: 'CertifyScorecard';
  id: Scalars['ID'];
  /** The Scorecard attached to the repository (attestation object) */
  scorecard: Scorecard;
  /** The source repository that is being scanned (attestation subject) */
  source: Source;
};

/** CertifyScorecardSpec allows filtering the list of Scorecards to return. */
export type CertifyScorecardSpec = {
  aggregateScore?: InputMaybe<Scalars['Float']>;
  checks?: InputMaybe<Array<ScorecardCheckSpec>>;
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  origin?: InputMaybe<Scalars['String']>;
  scorecardCommit?: InputMaybe<Scalars['String']>;
  scorecardVersion?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<SourceSpec>;
  timeScanned?: InputMaybe<Scalars['Time']>;
};

/**
 * CertifyVEXStatement is an attestation to attach VEX statements to a package or
 * artifact to clarify the impact of a specific vulnerability (CVE, GHSA or OSV).
 */
export type CertifyVexStatement = {
  __typename?: 'CertifyVEXStatement';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Timestamp (exact time in RFC 3339 format) for the VEX statement */
  knownSince: Scalars['Time'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** VEX statement: impact_statement or action_statement depending on status */
  statement: Scalars['String'];
  /** Status of the vulnerabilities with respect to the subject */
  status: VexStatus;
  /** statusNotes may convey information about how status was determined */
  statusNotes: Scalars['String'];
  /** Subject of attestation */
  subject: PackageOrArtifact;
  /** Justification from VEX statement */
  vexJustification: VexJustification;
  /** Attested vulnerability */
  vulnerability: Vulnerability;
};

/**
 * CertifyVEXStatementSpec allows filtering the list of VEX statements to
 * return in a query.
 *
 * Only one subject type (package or artifact) and one vulnerability type (CVE,
 * GHSA or OSV) may be specified.
 *
 * Note that setting noVuln in VulnerabilitySpec is invalid for VEX statements!
 */
export type CertifyVexStatementSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  knownSince?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  statement?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<VexStatus>;
  statusNotes?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrArtifactSpec>;
  vexJustification?: InputMaybe<VexJustification>;
  vulnerability?: InputMaybe<VulnerabilitySpec>;
};

/**
 * CertifyVuln is an attestation to attach vulnerability information to a package.
 *
 * This information is obtained via a scanner. If there is no vulnerability
 * detected (no OSV, CVE, or GHSA), we attach the special NoVuln node.
 */
export type CertifyVuln = {
  __typename?: 'CertifyVuln';
  id: Scalars['ID'];
  /** Metadata attached to the certification */
  metadata: VulnerabilityMetaData;
  /** The package that is attested */
  package: Package;
  /** The vulnerability object. Can be an OSV, CVE, or GHSA or the special NoVuln node. */
  vulnerability: Vulnerability;
};

/**
 * CertifyVulnSpec allows filtering the list of vulnerability certifications to
 * return in a query.
 *
 * Specifying just the package allows to query for all vulnerabilities associated
 * with the package.
 *
 * Only one vulnerability type (OSV, CVE, GHSA, or special NoVuln) may be
 * specified.
 */
export type CertifyVulnSpec = {
  collector?: InputMaybe<Scalars['String']>;
  dbUri?: InputMaybe<Scalars['String']>;
  dbVersion?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  origin?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<PkgSpec>;
  scannerUri?: InputMaybe<Scalars['String']>;
  scannerVersion?: InputMaybe<Scalars['String']>;
  timeScanned?: InputMaybe<Scalars['Time']>;
  vulnerability?: InputMaybe<VulnerabilitySpec>;
};

/** CveOrGhsa is a union of CVE and GHSA. */
export type CveOrGhsa = Cve | Ghsa;

/**
 * CveOrGhsaInput allows using CveOrGhsa union as input type for mutations.
 *
 * Exactly one field must be specified.
 */
export type CveOrGhsaInput = {
  cve?: InputMaybe<CveInputSpec>;
  ghsa?: InputMaybe<GhsaInputSpec>;
};

/**
 * CveOrGhsaSpec allows using CveOrGhsa union as input type for queries.
 *
 * Exactly one field must be specified.
 */
export type CveOrGhsaSpec = {
  cve?: InputMaybe<CveSpec>;
  ghsa?: InputMaybe<GhsaSpec>;
};

/** DependencyType determines the type of the dependency. */
export enum DependencyType {
  /** direct dependency */
  Direct = 'DIRECT',
  /** indirect dependency */
  Indirect = 'INDIRECT',
  /** type not known/not specified */
  Unknown = 'UNKNOWN'
}

/**
 * Edge allows filtering path/neighbors output to only contain a subset of all
 * possible GUAC links.
 *
 * Each member of the enum is formed by merging two Node names with _. Each name
 * is converted from CamelCase to CAPITALS_WITH_UNDERSCORES. Only valid edges
 * (pairs from Node to Node) are included.
 *
 * The only exception to the above rule is for links out of HasSLSA. The names are
 * HAS_SLSA_SUBJECT, HAS_SLSA_BUILT_BY, and HAS_SLSA_MATERIALS. This is because
 * ARTIFACT_HAS_SLSA is only from subject Artifact to HasSLSA.
 */
export enum Edge {
  ArtifactCertifyBad = 'ARTIFACT_CERTIFY_BAD',
  ArtifactCertifyGood = 'ARTIFACT_CERTIFY_GOOD',
  ArtifactCertifyVexStatement = 'ARTIFACT_CERTIFY_VEX_STATEMENT',
  ArtifactHashEqual = 'ARTIFACT_HASH_EQUAL',
  ArtifactHasMetadata = 'ARTIFACT_HAS_METADATA',
  ArtifactHasSbom = 'ARTIFACT_HAS_SBOM',
  ArtifactHasSlsa = 'ARTIFACT_HAS_SLSA',
  ArtifactIsOccurrence = 'ARTIFACT_IS_OCCURRENCE',
  ArtifactPointOfContact = 'ARTIFACT_POINT_OF_CONTACT',
  BuilderHasSlsa = 'BUILDER_HAS_SLSA',
  CertifyBadArtifact = 'CERTIFY_BAD_ARTIFACT',
  CertifyBadPackage = 'CERTIFY_BAD_PACKAGE',
  CertifyBadSource = 'CERTIFY_BAD_SOURCE',
  CertifyGoodArtifact = 'CERTIFY_GOOD_ARTIFACT',
  CertifyGoodPackage = 'CERTIFY_GOOD_PACKAGE',
  CertifyGoodSource = 'CERTIFY_GOOD_SOURCE',
  CertifyScorecardSource = 'CERTIFY_SCORECARD_SOURCE',
  CertifyVexStatementArtifact = 'CERTIFY_VEX_STATEMENT_ARTIFACT',
  CertifyVexStatementCve = 'CERTIFY_VEX_STATEMENT_CVE',
  CertifyVexStatementGhsa = 'CERTIFY_VEX_STATEMENT_GHSA',
  CertifyVexStatementOsv = 'CERTIFY_VEX_STATEMENT_OSV',
  CertifyVexStatementPackage = 'CERTIFY_VEX_STATEMENT_PACKAGE',
  CertifyVulnCve = 'CERTIFY_VULN_CVE',
  CertifyVulnGhsa = 'CERTIFY_VULN_GHSA',
  CertifyVulnNoVuln = 'CERTIFY_VULN_NO_VULN',
  CertifyVulnOsv = 'CERTIFY_VULN_OSV',
  CertifyVulnPackage = 'CERTIFY_VULN_PACKAGE',
  CveCertifyVexStatement = 'CVE_CERTIFY_VEX_STATEMENT',
  CveCertifyVuln = 'CVE_CERTIFY_VULN',
  CveIsVulnerability = 'CVE_IS_VULNERABILITY',
  GhsaCertifyVexStatement = 'GHSA_CERTIFY_VEX_STATEMENT',
  GhsaCertifyVuln = 'GHSA_CERTIFY_VULN',
  GhsaIsVulnerability = 'GHSA_IS_VULNERABILITY',
  HashEqualArtifact = 'HASH_EQUAL_ARTIFACT',
  HasMetadataArtifact = 'HAS_METADATA_ARTIFACT',
  HasMetadataPackage = 'HAS_METADATA_PACKAGE',
  HasMetadataSource = 'HAS_METADATA_SOURCE',
  HasSbomArtifact = 'HAS_SBOM_ARTIFACT',
  HasSbomPackage = 'HAS_SBOM_PACKAGE',
  HasSlsaBuiltBy = 'HAS_SLSA_BUILT_BY',
  HasSlsaMaterials = 'HAS_SLSA_MATERIALS',
  HasSlsaSubject = 'HAS_SLSA_SUBJECT',
  HasSourceAtPackage = 'HAS_SOURCE_AT_PACKAGE',
  HasSourceAtSource = 'HAS_SOURCE_AT_SOURCE',
  IsDependencyPackage = 'IS_DEPENDENCY_PACKAGE',
  IsOccurrenceArtifact = 'IS_OCCURRENCE_ARTIFACT',
  IsOccurrencePackage = 'IS_OCCURRENCE_PACKAGE',
  IsOccurrenceSource = 'IS_OCCURRENCE_SOURCE',
  IsVulnerabilityCve = 'IS_VULNERABILITY_CVE',
  IsVulnerabilityGhsa = 'IS_VULNERABILITY_GHSA',
  IsVulnerabilityOsv = 'IS_VULNERABILITY_OSV',
  NoVulnCertifyVuln = 'NO_VULN_CERTIFY_VULN',
  OsvCertifyVexStatement = 'OSV_CERTIFY_VEX_STATEMENT',
  OsvCertifyVuln = 'OSV_CERTIFY_VULN',
  OsvIsVulnerability = 'OSV_IS_VULNERABILITY',
  PackageCertifyBad = 'PACKAGE_CERTIFY_BAD',
  PackageCertifyGood = 'PACKAGE_CERTIFY_GOOD',
  PackageCertifyVexStatement = 'PACKAGE_CERTIFY_VEX_STATEMENT',
  PackageCertifyVuln = 'PACKAGE_CERTIFY_VULN',
  PackageHasMetadata = 'PACKAGE_HAS_METADATA',
  PackageHasSbom = 'PACKAGE_HAS_SBOM',
  PackageHasSourceAt = 'PACKAGE_HAS_SOURCE_AT',
  PackageIsDependency = 'PACKAGE_IS_DEPENDENCY',
  PackageIsOccurrence = 'PACKAGE_IS_OCCURRENCE',
  PackagePkgEqual = 'PACKAGE_PKG_EQUAL',
  PackagePointOfContact = 'PACKAGE_POINT_OF_CONTACT',
  PkgEqualPackage = 'PKG_EQUAL_PACKAGE',
  PointOfContactArtifact = 'POINT_OF_CONTACT_ARTIFACT',
  PointOfContactPackage = 'POINT_OF_CONTACT_PACKAGE',
  PointOfContactSource = 'POINT_OF_CONTACT_SOURCE',
  SourceCertifyBad = 'SOURCE_CERTIFY_BAD',
  SourceCertifyGood = 'SOURCE_CERTIFY_GOOD',
  SourceCertifyScorecard = 'SOURCE_CERTIFY_SCORECARD',
  SourceHasMetadata = 'SOURCE_HAS_METADATA',
  SourceHasSourceAt = 'SOURCE_HAS_SOURCE_AT',
  SourceIsOccurrence = 'SOURCE_IS_OCCURRENCE',
  SourcePointOfContact = 'SOURCE_POINT_OF_CONTACT'
}

/**
 * GHSA represents GitHub security advisories.
 *
 * The advisory id field is mandatory and canonicalized to be lowercase.
 *
 * This node can be referred to by other parts of GUAC.
 */
export type Ghsa = {
  __typename?: 'GHSA';
  ghsaId: Scalars['String'];
  id: Scalars['ID'];
};

/** GHSAInputSpec specifies a GitHub Security Advisory for mutations. */
export type GhsaInputSpec = {
  ghsaId: Scalars['String'];
};

/** GHSASpec allows filtering the list of advisories to return in a query. */
export type GhsaSpec = {
  ghsaId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

/**
 * HasMetadata is an attestation that a package, source, or artifact has a certain
 * attested property (key) with value (value). For example, a source may have
 * metadata "SourceRepo2FAEnabled=true".
 *
 * The intent of this evidence tree predicate is to allow extensibility of metadata
 * expressible within the GUAC ontology. Metadata that is commonly used will then
 * be promoted to a predicate on its own.
 *
 * Justification indicates how the metadata was determined.
 *
 * The metadata applies to a subject which is a package, source, or artifact.
 * If the attestation targets a package, it must target a PackageName or a
 * PackageVersion. If the attestation targets a source, it must target a
 * SourceName.
 */
export type HasMetadata = {
  __typename?: 'HasMetadata';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  key: Scalars['String'];
  origin: Scalars['String'];
  subject: PackageSourceOrArtifact;
  timestamp: Scalars['Time'];
  value: Scalars['String'];
};

/** HasMetadataInputSpec represents the mutation input to ingest a CertifyGood evidence. */
export type HasMetadataInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  key: Scalars['String'];
  origin: Scalars['String'];
  timestamp: Scalars['Time'];
  value: Scalars['String'];
};

/**
 * HasMetadataSpec allows filtering the list of HasMetadata evidence to return in a
 * query.
 *
 * If a package is specified in the subject filter, then it must be specified up
 * to PackageName or PackageVersion. That is, user must specify package name, or
 * name and one of version, qualifiers, or subpath.
 *
 * If a source is specified in the subject filter, then it must specify a name,
 * and optionally a tag and a commit.
 *
 * since specified indicates filtering timestamps after the specified time
 */
export type HasMetadataSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Time']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
  value?: InputMaybe<Scalars['String']>;
};

export type HasSbom = {
  __typename?: 'HasSBOM';
  /** Algorithm by which SBOMs digest was computed */
  algorithm: Scalars['String'];
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Digest of SBOM */
  digest: Scalars['String'];
  /** Location from which the SBOM can be downloaded */
  downloadLocation: Scalars['String'];
  id: Scalars['ID'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** SBOM subject */
  subject: PackageOrArtifact;
  /** Identifier for the SBOM document */
  uri: Scalars['String'];
};

/** HasSBOMInputSpec is the same as HasSBOM but for mutation input. */
export type HasSbomInputSpec = {
  algorithm: Scalars['String'];
  collector: Scalars['String'];
  digest: Scalars['String'];
  downloadLocation: Scalars['String'];
  origin: Scalars['String'];
  uri: Scalars['String'];
};

/**
 * HasSBOMSpec allows filtering the list of HasSBOM to return.
 *
 * Only the package or artifact can be added, not both.
 */
export type HasSbomSpec = {
  algorithm?: InputMaybe<Scalars['String']>;
  collector?: InputMaybe<Scalars['String']>;
  digest?: InputMaybe<Scalars['String']>;
  downloadLocation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrArtifactSpec>;
  uri?: InputMaybe<Scalars['String']>;
};

/** HasSLSA records that a subject node has a SLSA attestation. */
export type HasSlsa = {
  __typename?: 'HasSLSA';
  id: Scalars['ID'];
  /** The SLSA attestation */
  slsa: Slsa;
  /** The subject of SLSA attestation */
  subject: Artifact;
};

/** HasSLSASpec allows filtering the list of HasSLSA to return. */
export type HasSlsaSpec = {
  buildType?: InputMaybe<Scalars['String']>;
  builtBy?: InputMaybe<BuilderSpec>;
  builtFrom?: InputMaybe<Array<ArtifactSpec>>;
  collector?: InputMaybe<Scalars['String']>;
  finishedOn?: InputMaybe<Scalars['Time']>;
  id?: InputMaybe<Scalars['ID']>;
  origin?: InputMaybe<Scalars['String']>;
  predicate?: InputMaybe<Array<SlsaPredicateSpec>>;
  slsaVersion?: InputMaybe<Scalars['String']>;
  startedOn?: InputMaybe<Scalars['Time']>;
  subject?: InputMaybe<ArtifactSpec>;
};

/** HasSourceAt records that a package's repository is a given source. */
export type HasSourceAt = {
  __typename?: 'HasSourceAt';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Timestamp since this link between package and source was certified */
  knownSince: Scalars['Time'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The subject of the attestation: can be a PackageName or a PackageVersion */
  package: Package;
  /** Source repository from which the package is built */
  source: Source;
};

/** HasSourceAtInputSpec is the same as HasSourceAt but for mutation input. */
export type HasSourceAtInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
};

/** HasSourceAtSpec allows filtering the list of HasSourceAt to return. */
export type HasSourceAtSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  knownSince?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<PkgSpec>;
  source?: InputMaybe<SourceSpec>;
};

/** HashEqual is an attestation that a set of artifacts are identical. */
export type HashEqual = {
  __typename?: 'HashEqual';
  /** Collection of artifacts that are similar */
  artifacts: Array<Artifact>;
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the claim that the artifacts are similar */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
};

/** HashEqualInputSpec represents the input to certify that packages are similar. */
export type HashEqualInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * HashEqualSpec allows filtering the list of artifact equality statements to
 * return in a query.
 *
 * Specifying just one artifact allows to query for all similar artifacts (if any
 * exists).
 */
export type HashEqualSpec = {
  artifacts?: InputMaybe<Array<InputMaybe<ArtifactSpec>>>;
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
};

/** IsDependency is an attestation to record that a package depends on another. */
export type IsDependency = {
  __typename?: 'IsDependency';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Type of dependency */
  dependencyType: DependencyType;
  /** Package for the dependency; MUST BE PackageName, not PackageVersion */
  dependentPackage: Package;
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Package that has the dependency */
  package: Package;
  /** Version range for the dependency link */
  versionRange: Scalars['String'];
};

/** IsDependencyInputSpec is the input to record a new dependency. */
export type IsDependencyInputSpec = {
  collector: Scalars['String'];
  dependencyType: DependencyType;
  justification: Scalars['String'];
  origin: Scalars['String'];
  versionRange: Scalars['String'];
};

/**
 * IsDependencySpec allows filtering the list of dependencies to return.
 *
 * To obtain the list of dependency packages, caller must fill in the package
 * field.
 *
 * Dependent packages must be defined at PackageName, not PackageVersion.
 */
export type IsDependencySpec = {
  collector?: InputMaybe<Scalars['String']>;
  dependencyType?: InputMaybe<DependencyType>;
  dependentPackage?: InputMaybe<PkgNameSpec>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<PkgSpec>;
  versionRange?: InputMaybe<Scalars['String']>;
};

/**
 * IsOccurrence is an attestation to link an artifact to a package or source.
 *
 * Attestation must occur at the PackageVersion or at the SourceName.
 */
export type IsOccurrence = {
  __typename?: 'IsOccurrence';
  /** The artifact in the relationship */
  artifact: Artifact;
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Package or source from which the artifact originates */
  subject: PackageOrSource;
};

/** IsOccurrenceInputSpec represents the input to record an artifact's origin. */
export type IsOccurrenceInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * IsOccurrenceSpec allows filtering the list of artifact occurences to return in
 * a query.
 */
export type IsOccurrenceSpec = {
  artifact?: InputMaybe<ArtifactSpec>;
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrSourceSpec>;
};

/** IsVulnerability is an attestation to link CVE/GHSA with data in OSV. */
export type IsVulnerability = {
  __typename?: 'IsVulnerability';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The OSV that encapsulates the vulnerability */
  osv: Osv;
  /** The upstream vulnerability information */
  vulnerability: CveOrGhsa;
};

/** IsVulnerabilityInputSpec represents the input to link CVE/GHSA with OSV data. */
export type IsVulnerabilityInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * IsVulnerabilitySpec allows filtering the list of vulnerability links to return
 * in a query.
 */
export type IsVulnerabilitySpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  osv?: InputMaybe<OsvSpec>;
  vulnerability?: InputMaybe<CveOrGhsaSpec>;
};

/** MatchFlags is used to input the PkgMatchType enum. */
export type MatchFlags = {
  pkg: PkgMatchType;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Ingests a new artifact and returns it. */
  ingestArtifact: Artifact;
  /** Bulk ingests new artifacts and returns a list of them. */
  ingestArtifacts: Array<Artifact>;
  /** Ingests a new builder and returns it. */
  ingestBuilder: Builder;
  /** Bulk ingests new builders and returns a list of them. */
  ingestBuilders: Array<Builder>;
  /** Ingests new CVE and returns it. */
  ingestCVE: Cve;
  /** Bulk ingests new CVEs and returns a list of them. */
  ingestCVEs: Array<Cve>;
  /** Adds a certification that a package, source or artifact is considered bad. */
  ingestCertifyBad: CertifyBad;
  /** Adds bulk certifications that a package, source or artifact is considered bad. */
  ingestCertifyBads: Array<CertifyBad>;
  /** Adds a certification that a package, source or artifact is considered good. */
  ingestCertifyGood: CertifyGood;
  /** Adds bulk certifications that a package, source or artifact is considered good. */
  ingestCertifyGoods: Array<CertifyGood>;
  /** Bulk adds a dependency between two packages */
  ingestDependencies: Array<IsDependency>;
  /** Adds a dependency between two packages */
  ingestDependency: IsDependency;
  /** Ingests a new GitHub Security Advisory and returns it. */
  ingestGHSA: Ghsa;
  /** Bulk ingests new GHSAs and returns a list of them. */
  ingestGHSAs: Array<Ghsa>;
  /** Adds metadata about a package, source or artifact. */
  ingestHasMetadata: HasMetadata;
  /** Certifies that a package or artifact has an SBOM. */
  ingestHasSBOM: HasSbom;
  /** Bulk ingest that package or artifact has an SBOM. */
  ingestHasSBOMs: Array<HasSbom>;
  /** Adds a certification that a package (PackageName or PackageVersion) is built from the source. */
  ingestHasSourceAt: HasSourceAt;
  /** Adds a certification that two artifacts are equal. */
  ingestHashEqual: HashEqual;
  /** Bulk ingest certifications that two artifacts are equal. */
  ingestHashEquals: Array<HashEqual>;
  /** Ingest a mapping between an OSV entry and a CVE/GHSA vulnerability. */
  ingestIsVulnerability: IsVulnerability;
  /** Ingests a new OSV vulnerability and returns it. */
  ingestOSV: Osv;
  /** Bulk ingests new OSVs and returns a list of them. */
  ingestOSVs: Array<Osv>;
  /** Ingest that an artifact is produced from a package or source. */
  ingestOccurrence: IsOccurrence;
  /** Bulk ingest that an artifact is produced from a package or source. */
  ingestOccurrences: Array<IsOccurrence>;
  /** Ingests a new package and returns the corresponding package trie path. */
  ingestPackage: Package;
  /** Bulk ingests packages and returns the list of corresponding package trie path. */
  ingestPackages: Array<Package>;
  /** Adds a certification that two packages are similar. */
  ingestPkgEqual: PkgEqual;
  /** Adds a PointOfContact attestation to a package, source or artifact. */
  ingestPointOfContact: PointOfContact;
  /** Ingests a SLSA attestation */
  ingestSLSA: HasSlsa;
  /** Bulk Ingest SLSA attestations */
  ingestSLSAs: Array<HasSlsa>;
  /** Adds a certification that a source repository has a Scorecard. */
  ingestScorecard: CertifyScorecard;
  /** Adds bulk certifications that a source repository has a Scorecard. */
  ingestScorecards: Array<CertifyScorecard>;
  /** Ingests a new source and returns the corresponding source trie path. */
  ingestSource: Source;
  /** Bulk ingests sources and returns the list of corresponding source trie path. */
  ingestSources: Array<Source>;
  /** Adds a VEX certification for a package. */
  ingestVEXStatement: CertifyVexStatement;
  /** Adds a certification that a package has been scanned for vulnerabilities. */
  ingestVulnerability: CertifyVuln;
};


export type MutationIngestArtifactArgs = {
  artifact?: InputMaybe<ArtifactInputSpec>;
};


export type MutationIngestArtifactsArgs = {
  artifacts: Array<ArtifactInputSpec>;
};


export type MutationIngestBuilderArgs = {
  builder?: InputMaybe<BuilderInputSpec>;
};


export type MutationIngestBuildersArgs = {
  builders: Array<BuilderInputSpec>;
};


export type MutationIngestCveArgs = {
  cve?: InputMaybe<CveInputSpec>;
};


export type MutationIngestCvEsArgs = {
  cves: Array<CveInputSpec>;
};


export type MutationIngestCertifyBadArgs = {
  certifyBad: CertifyBadInputSpec;
  pkgMatchType: MatchFlags;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestCertifyBadsArgs = {
  certifyBads: Array<CertifyBadInputSpec>;
  pkgMatchType: MatchFlags;
  subjects: PackageSourceOrArtifactInputs;
};


export type MutationIngestCertifyGoodArgs = {
  certifyGood: CertifyGoodInputSpec;
  pkgMatchType: MatchFlags;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestCertifyGoodsArgs = {
  certifyGoods: Array<CertifyGoodInputSpec>;
  pkgMatchType: MatchFlags;
  subjects: PackageSourceOrArtifactInputs;
};


export type MutationIngestDependenciesArgs = {
  depPkgs: Array<PkgInputSpec>;
  dependencies: Array<IsDependencyInputSpec>;
  pkgs: Array<PkgInputSpec>;
};


export type MutationIngestDependencyArgs = {
  depPkg: PkgInputSpec;
  dependency: IsDependencyInputSpec;
  pkg: PkgInputSpec;
};


export type MutationIngestGhsaArgs = {
  ghsa?: InputMaybe<GhsaInputSpec>;
};


export type MutationIngestGhsAsArgs = {
  ghsas: Array<GhsaInputSpec>;
};


export type MutationIngestHasMetadataArgs = {
  hasMetadata: HasMetadataInputSpec;
  pkgMatchType: MatchFlags;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestHasSbomArgs = {
  hasSBOM: HasSbomInputSpec;
  subject: PackageOrArtifactInput;
};


export type MutationIngestHasSboMsArgs = {
  hasSBOMs: Array<HasSbomInputSpec>;
  subjects: PackageOrArtifactInputs;
};


export type MutationIngestHasSourceAtArgs = {
  hasSourceAt: HasSourceAtInputSpec;
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  source: SourceInputSpec;
};


export type MutationIngestHashEqualArgs = {
  artifact: ArtifactInputSpec;
  hashEqual: HashEqualInputSpec;
  otherArtifact: ArtifactInputSpec;
};


export type MutationIngestHashEqualsArgs = {
  artifacts: Array<ArtifactInputSpec>;
  hashEquals: Array<HashEqualInputSpec>;
  otherArtifacts: Array<ArtifactInputSpec>;
};


export type MutationIngestIsVulnerabilityArgs = {
  isVulnerability: IsVulnerabilityInputSpec;
  osv: OsvInputSpec;
  vulnerability: CveOrGhsaInput;
};


export type MutationIngestOsvArgs = {
  osv?: InputMaybe<OsvInputSpec>;
};


export type MutationIngestOsVsArgs = {
  osvs: Array<OsvInputSpec>;
};


export type MutationIngestOccurrenceArgs = {
  artifact: ArtifactInputSpec;
  occurrence: IsOccurrenceInputSpec;
  subject: PackageOrSourceInput;
};


export type MutationIngestOccurrencesArgs = {
  artifacts: Array<ArtifactInputSpec>;
  occurrences: Array<IsOccurrenceInputSpec>;
  subjects: PackageOrSourceInputs;
};


export type MutationIngestPackageArgs = {
  pkg: PkgInputSpec;
};


export type MutationIngestPackagesArgs = {
  pkgs: Array<PkgInputSpec>;
};


export type MutationIngestPkgEqualArgs = {
  otherPackage: PkgInputSpec;
  pkg: PkgInputSpec;
  pkgEqual: PkgEqualInputSpec;
};


export type MutationIngestPointOfContactArgs = {
  pkgMatchType: MatchFlags;
  pointOfContact: PointOfContactInputSpec;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestSlsaArgs = {
  builtBy: BuilderInputSpec;
  builtFrom: Array<ArtifactInputSpec>;
  slsa: SlsaInputSpec;
  subject: ArtifactInputSpec;
};


export type MutationIngestSlsAsArgs = {
  builtByList: Array<BuilderInputSpec>;
  builtFromList: Array<Array<ArtifactInputSpec>>;
  slsaList: Array<SlsaInputSpec>;
  subjects: Array<ArtifactInputSpec>;
};


export type MutationIngestScorecardArgs = {
  scorecard: ScorecardInputSpec;
  source: SourceInputSpec;
};


export type MutationIngestScorecardsArgs = {
  scorecards: Array<ScorecardInputSpec>;
  sources: Array<SourceInputSpec>;
};


export type MutationIngestSourceArgs = {
  source: SourceInputSpec;
};


export type MutationIngestSourcesArgs = {
  sources: Array<SourceInputSpec>;
};


export type MutationIngestVexStatementArgs = {
  subject: PackageOrArtifactInput;
  vexStatement: VexStatementInputSpec;
  vulnerability: VulnerabilityInput;
};


export type MutationIngestVulnerabilityArgs = {
  certifyVuln: VulnerabilityMetaDataInput;
  pkg: PkgInputSpec;
  vulnerability: VulnerabilityInput;
};

/**
 * NoVuln is a special vulnerability node to attest that no vulnerability has been
 * found during a vulnerability scan.
 *
 * Backends guarantee that this is a singleton node.
 */
export type NoVuln = {
  __typename?: 'NoVuln';
  id: Scalars['ID'];
};

/**
 * Node is a union type of all the possible nodes.
 *
 * It encapsulates the software tree nodes along with the evidence nodes. In a
 * path query, all connecting evidence nodes along with their intermediate subject
 * nodes need to be returned in order to create a complete graph.
 */
export type Node = Artifact | Builder | Cve | CertifyBad | CertifyGood | CertifyScorecard | CertifyVexStatement | CertifyVuln | Ghsa | HasMetadata | HasSbom | HasSlsa | HasSourceAt | HashEqual | IsDependency | IsOccurrence | IsVulnerability | NoVuln | Osv | Package | PkgEqual | PointOfContact | Source;

/**
 * OSV represents an Open Source Vulnerability.
 *
 * The osvId field is mandatory and canonicalized to be lowercase.
 *
 * This maps to a vulnerability ID specific to the environment (e.g., GHSA ID or
 * CVE ID).
 *
 * This node can be referred to by other parts of GUAC.
 */
export type Osv = {
  __typename?: 'OSV';
  id: Scalars['ID'];
  osvId: Scalars['String'];
};

/** OSVInputSpec specifies a OSV vulnerability for mutations. */
export type OsvInputSpec = {
  osvId: Scalars['String'];
};

/** OSVSpec allows filtering the list of advisories to return in a query. */
export type OsvSpec = {
  id?: InputMaybe<Scalars['ID']>;
  osvId?: InputMaybe<Scalars['String']>;
};

/**
 * Package represents the root of the package trie/tree.
 *
 * We map package information to a trie, closely matching the pURL specification
 * (https://github.com/package-url/purl-spec/blob/0dd92f26f8bb11956ffdf5e8acfcee71e8560407/README.rst),
 * but deviating from it where GUAC heuristics allow for better representation of
 * package information. Each path in the trie fully represents a package; we split
 * the trie based on the pURL components.
 *
 * This node matches a pkg:<type> partial pURL. The type field matches the
 * pURL types but we might also use "guac" for the cases where the pURL
 * representation is not complete or when we have custom rules.
 *
 * Since this node is at the root of the package trie, it is named Package, not
 * PackageType.
 */
export type Package = {
  __typename?: 'Package';
  id: Scalars['ID'];
  namespaces: Array<PackageNamespace>;
  type: Scalars['String'];
};

/**
 * PackageName is a name for packages.
 *
 * In the pURL representation, each PackageName matches the
 * pkg:<type>/<namespace>/<name> pURL.
 *
 * Names are always mandatory.
 *
 * This is the first node in the trie that can be referred to by other parts of
 * GUAC.
 */
export type PackageName = {
  __typename?: 'PackageName';
  id: Scalars['ID'];
  name: Scalars['String'];
  versions: Array<PackageVersion>;
};

/**
 * PackageNamespace is a namespace for packages.
 *
 * In the pURL representation, each PackageNamespace matches the
 * pkg:<type>/<namespace>/ partial pURL.
 *
 * Namespaces are optional and type specific. Because they are optional, we use
 * empty string to denote missing namespaces.
 */
export type PackageNamespace = {
  __typename?: 'PackageNamespace';
  id: Scalars['ID'];
  names: Array<PackageName>;
  namespace: Scalars['String'];
};

/** PackageOrArtifact is a union of Package and Artifact. */
export type PackageOrArtifact = Artifact | Package;

/**
 * PackageOrArtifactInput allows using PackageOrArtifact union as
 * input type to be used in mutations.
 *
 * Exactly one of the value must be set to non-nil.
 */
export type PackageOrArtifactInput = {
  artifact?: InputMaybe<ArtifactInputSpec>;
  package?: InputMaybe<PkgInputSpec>;
};

/**
 * PackageOrArtifactInputs allows using packages and artifacts as input for batch mutations.
 * Exactly one list must be specified.
 */
export type PackageOrArtifactInputs = {
  artifacts?: InputMaybe<Array<ArtifactInputSpec>>;
  packages?: InputMaybe<Array<PkgInputSpec>>;
};

/**
 * PackageOrArtifactSpec allows using PackageOrArtifact union as
 * input type to be used in read queries.
 *
 * Exactly one of the value must be set to non-nil.
 */
export type PackageOrArtifactSpec = {
  artifact?: InputMaybe<ArtifactSpec>;
  package?: InputMaybe<PkgSpec>;
};

/** PackageOrSource is a union of Package and Source. */
export type PackageOrSource = Package | Source;

/**
 * PackageOrSourceInput allows using PackageOrSource union as input for mutations.
 *
 * Exactly one field must be specified.
 */
export type PackageOrSourceInput = {
  package?: InputMaybe<PkgInputSpec>;
  source?: InputMaybe<SourceInputSpec>;
};

/**
 * PackageOrSourceInputs allows using packages and sources as input for batch mutations.
 * Exactly one list must be specified.
 */
export type PackageOrSourceInputs = {
  packages?: InputMaybe<Array<PkgInputSpec>>;
  sources?: InputMaybe<Array<SourceInputSpec>>;
};

/**
 * PackageOrSourceSpec allows using PackageOrSource union as input for queries.
 *
 * Exactly one field must be specified.
 */
export type PackageOrSourceSpec = {
  package?: InputMaybe<PkgSpec>;
  source?: InputMaybe<SourceSpec>;
};

/**
 * PackageQualifier is a qualifier for a package, a key-value pair.
 *
 * In the pURL representation, it is a part of the <qualifiers> part of the
 * pkg:<type>/<namespace>/<name>@<version>?<qualifiers> pURL.
 *
 * Qualifiers are optional, each Package type defines own rules for handling them,
 * and multiple qualifiers could be attached to the same package.
 *
 * This node cannot be directly referred by other parts of GUAC.
 */
export type PackageQualifier = {
  __typename?: 'PackageQualifier';
  key: Scalars['String'];
  value: Scalars['String'];
};

/** PackageQualifierInputSpec allows specifying package qualifiers in mutations. */
export type PackageQualifierInputSpec = {
  key: Scalars['String'];
  value: Scalars['String'];
};

/**
 * PackageQualifierSpec allows filtering package qualifiers in a query.
 *
 * Keys are mandatory, but values could also be null if we want to match all
 * values for a specific key.
 *
 * NOTE: Before the schema becomes stable, we might change the nulability
 * requirements of these fields.
 */
export type PackageQualifierSpec = {
  key: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

/** PackageSourceOrArtifact is a union of Package, Source, and Artifact. */
export type PackageSourceOrArtifact = Artifact | Package | Source;

/**
 * PackageSourceOrArtifactInput allows using PackageSourceOrArtifact union as
 * input type to be used in mutations.
 *
 * Exactly one of the value must be set to non-nil.
 */
export type PackageSourceOrArtifactInput = {
  artifact?: InputMaybe<ArtifactInputSpec>;
  package?: InputMaybe<PkgInputSpec>;
  source?: InputMaybe<SourceInputSpec>;
};

/**
 * PackageSourceOrArtifactInputs allows using PackageSourceOrArtifact union as
 * input type to be used in bulk mutations.
 *
 * Exactly one list must be specified.
 */
export type PackageSourceOrArtifactInputs = {
  artifacts?: InputMaybe<Array<ArtifactInputSpec>>;
  packages?: InputMaybe<Array<PkgInputSpec>>;
  sources?: InputMaybe<Array<SourceInputSpec>>;
};

/**
 * PackageSourceOrArtifactSpec allows using PackageSourceOrArtifact union as
 * input type to be used in read queries.
 *
 * Exactly one of the value must be set to non-nil.
 */
export type PackageSourceOrArtifactSpec = {
  artifact?: InputMaybe<ArtifactSpec>;
  package?: InputMaybe<PkgSpec>;
  source?: InputMaybe<SourceSpec>;
};

/**
 * PackageVersion is a package version.
 *
 * In the pURL representation, each PackageName matches the
 * pkg:<type>/<namespace>/<name>@<version> pURL.
 *
 * Versions are optional and each Package type defines own rules for handling
 * them. For this level of GUAC, these are just opaque strings.
 *
 * NOTE: The handling of versions might change before this schema becomes stable.
 *
 * This node can be referred to by other parts of GUAC.
 *
 * Subpath and qualifiers are optional. Lack of qualifiers is represented by an
 * empty list and lack of subpath by empty string (to be consistent with
 * optionality of namespace and version). Two nodes that have different qualifiers
 * and/or subpath but the same version mean two different packages in the trie
 * (they are different). Two nodes that have same version but qualifiers of one
 * are a subset of the qualifier of the other also mean two different packages in
 * the trie.
 */
export type PackageVersion = {
  __typename?: 'PackageVersion';
  id: Scalars['ID'];
  qualifiers: Array<PackageQualifier>;
  subpath: Scalars['String'];
  version: Scalars['String'];
};

/** PkgEqual is an attestation that a set of packages are similar. */
export type PkgEqual = {
  __typename?: 'PkgEqual';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the claim that the packages are similar */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Collection of packages that are similar */
  packages: Array<Package>;
};

/** PkgEqualInputSpec represents the input to certify that packages are similar. */
export type PkgEqualInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * PkgEqualSpec allows filtering the list of package equality statements to return
 * in a query.
 *
 * Specifying just one package allows to query for all similar packages (if any
 * exists).
 */
export type PkgEqualSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  packages?: InputMaybe<Array<InputMaybe<PkgSpec>>>;
};

/**
 * PkgInputSpec specifies a package for mutations.
 *
 * This is different than PkgSpec because we want to encode mandatory fields:
 * type and name. All optional fields are given empty default values.
 */
export type PkgInputSpec = {
  name: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  qualifiers?: InputMaybe<Array<PackageQualifierInputSpec>>;
  subpath?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  version?: InputMaybe<Scalars['String']>;
};

/**
 * PkgMatchType is an enum to determine if the attestation should be done at the
 * specific version or package name.
 */
export enum PkgMatchType {
  AllVersions = 'ALL_VERSIONS',
  SpecificVersion = 'SPECIFIC_VERSION'
}

/**
 * PkgNameSpec is used to query for dependent packages.
 *
 * This is different from PkgSpec as the IsDependency attestation should only be
 * allowed to be made to the packageName node and not the packageVersion node.
 * Versions will be handled by the version_range in the IsDependency attestation
 * node.
 */
export type PkgNameSpec = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/**
 * PkgSpec allows filtering the list of sources to return in a query.
 *
 * Each field matches a qualifier from pURL. Use null to match on all values at
 * that level. For example, to get all packages in GUAC backend, use a PkgSpec
 * where every field is null.
 *
 * Empty string at a field means matching with the empty string. If passing in
 * qualifiers, all of the values in the list must match. Since we want to return
 * nodes with any number of qualifiers if no qualifiers are passed in the input,
 * we must also return the same set of nodes it the qualifiers list is empty. To
 * match on nodes that don't contain any qualifier, set matchOnlyEmptyQualifiers
 * to true. If this field is true, then the qualifiers argument is ignored.
 */
export type PkgSpec = {
  id?: InputMaybe<Scalars['ID']>;
  matchOnlyEmptyQualifiers?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  qualifiers?: InputMaybe<Array<PackageQualifierSpec>>;
  subpath?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['String']>;
};

/**
 * PointOfContact is an attestation of how to get in touch with the person(s) responsible
 * for a package, source, or artifact.
 *
 * All evidence trees record a justification for the property they represent as
 * well as the document that contains the attestation (origin) and the collector
 * that collected the document (collector).
 *
 * The attestation applies to a subject which is a package, source, or artifact.
 * If the attestation targets a package, it must target a PackageName or a
 * PackageVersion. If the attestation targets a source, it must target a
 * SourceName.
 *
 * email is the email address (singular) of the point of contact.
 *
 * info is additional contact information other than email address. This is free
 * form.
 *
 * NOTE: the identifiers for point of contact should be part of software trees.
 * This will benefit from identifier look up and traversal as well as organization
 * hierarchy. However, until the use case arises, PointOfContact will be a flat
 * reference to the contact details.
 */
export type PointOfContact = {
  __typename?: 'PointOfContact';
  collector: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  info: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  since: Scalars['Time'];
  subject: PackageSourceOrArtifact;
};

/** PointOfContactInputSpec represents the mutation input to ingest a PointOfContact evidence. */
export type PointOfContactInputSpec = {
  collector: Scalars['String'];
  email: Scalars['String'];
  info: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  since: Scalars['Time'];
};

/**
 * PointOfContactSpec allows filtering the list of PointOfContact evidence to return in a
 * query.
 *
 * If a package is specified in the subject filter, then it must be specified up
 * to PackageName or PackageVersion. That is, user must specify package name, or
 * name and one of version, qualifiers, or subpath.
 *
 * If a source is specified in the subject filter, then it must specify a name,
 * and optionally a tag and a commit.
 *
 * since filters attestations with a value of since later or equal to the provided filter.
 */
export type PointOfContactSpec = {
  collector?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  info?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Time']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns all CertifyBad attestations matching a filter. */
  CertifyBad: Array<CertifyBad>;
  /** Returns all CertifyGood attestations matching a filter. */
  CertifyGood: Array<CertifyGood>;
  /** Returns all VEX certifications matching the input filter. */
  CertifyVEXStatement: Array<CertifyVexStatement>;
  /** Returns all vulnerability certifications matching the input filter. */
  CertifyVuln: Array<CertifyVuln>;
  /** Returns all HasMetdata attestations matching a filter. */
  HasMetadata: Array<HasMetadata>;
  /** Returns all SBOM certifications. */
  HasSBOM: Array<HasSbom>;
  /** Returns all SLSA attestations matching the filter. */
  HasSLSA: Array<HasSlsa>;
  /** Returns all source mappings that match the filter. */
  HasSourceAt: Array<HasSourceAt>;
  /** Returns all artifact equality statements matching a filter. */
  HashEqual: Array<HashEqual>;
  /** Returns all package dependencies that match the filter. */
  IsDependency: Array<IsDependency>;
  /** Returns all artifacts-source/package mappings that match a filter. */
  IsOccurrence: Array<IsOccurrence>;
  /** Returns all OSV-CVE/GHSA vulnerability mappings that match a filter. */
  IsVulnerability: Array<IsVulnerability>;
  /** Returns all package equality statements matching a filter. */
  PkgEqual: Array<PkgEqual>;
  /** Returns all PointOfContact attestations matching a filter. */
  PointOfContact: Array<PointOfContact>;
  /** Returns all artifacts matching a filter. */
  artifacts: Array<Artifact>;
  /** Returns all builders matching a filter. */
  builders: Array<Builder>;
  /** Returns all CVEs matching a filter. */
  cve: Array<Cve>;
  /**
   * findSoftware takes in a searchText string and looks for software
   * that may be relevant for the input text. This can be seen as fuzzy search
   * function for Packages, Sources and Artifacts. findSoftware returns a list
   * of Packages, Sources and Artifacts that it determines to be relevant to
   * the input searchText.
   *
   * Due to the nature of full text search being implemented differently on
   * different db platforms, the behavior of findSoftware is not guaranteed
   * to be the same. In addition, their statistical nature may result in
   * results being different per call and not reproducible.
   *
   * All that is asked in the implementation of this API is that it follows
   * the spirit of helping to retrieve the right nodes with best effort.
   *
   * Warning: This is an EXPERIMENTAL feature. This is subject to change.
   * Warning: This is an OPTIONAL feature. Backends are not required to
   * implement this API.
   */
  findSoftware: Array<PackageSourceOrArtifact>;
  /** Returns all GitHub Security Advisories matching a filter. */
  ghsa: Array<Ghsa>;
  /**
   * neighbors returns all the direct neighbors of a node.
   *
   * Similarly, the input is only specified by its ID.
   *
   * Specifying any Edge value in `usingOnly` will make the neighbors list only
   * contain the corresponding GUAC evidence trees (GUAC verbs).
   */
  neighbors: Array<Node>;
  /**
   * node returns a single node, regardless of type.
   *
   * The input is only specified by its ID.
   */
  node: Node;
  /**
   * nodes returns an array of nodes, regardless of type.
   *
   * The input is an array of IDs to retrieve.
   */
  nodes: Array<Node>;
  /** Returns all OSV vulnerabilities matching a filter. */
  osv: Array<Osv>;
  /** Returns all packages matching a filter. */
  packages: Array<Package>;
  /**
   * path query returns a path between subject and target, of a maximum length.
   *
   * Since we want to uniquely identify endpoints, nodes must be specified by
   * valid IDs only (instead of using filters/input spec structs).
   *
   * Specifying any Edge value in `usingOnly` will make the path only contain the
   * corresponding GUAC evidence trees (GUAC verbs).
   */
  path: Array<Node>;
  /** Returns all Scorecard certifications matching the filter. */
  scorecards: Array<CertifyScorecard>;
  /** Returns all sources matching a filter. */
  sources: Array<Source>;
};


export type QueryCertifyBadArgs = {
  certifyBadSpec: CertifyBadSpec;
};


export type QueryCertifyGoodArgs = {
  certifyGoodSpec: CertifyGoodSpec;
};


export type QueryCertifyVexStatementArgs = {
  certifyVEXStatementSpec: CertifyVexStatementSpec;
};


export type QueryCertifyVulnArgs = {
  certifyVulnSpec: CertifyVulnSpec;
};


export type QueryHasMetadataArgs = {
  hasMetadataSpec: HasMetadataSpec;
};


export type QueryHasSbomArgs = {
  hasSBOMSpec: HasSbomSpec;
};


export type QueryHasSlsaArgs = {
  hasSLSASpec: HasSlsaSpec;
};


export type QueryHasSourceAtArgs = {
  hasSourceAtSpec: HasSourceAtSpec;
};


export type QueryHashEqualArgs = {
  hashEqualSpec: HashEqualSpec;
};


export type QueryIsDependencyArgs = {
  isDependencySpec: IsDependencySpec;
};


export type QueryIsOccurrenceArgs = {
  isOccurrenceSpec: IsOccurrenceSpec;
};


export type QueryIsVulnerabilityArgs = {
  isVulnerabilitySpec: IsVulnerabilitySpec;
};


export type QueryPkgEqualArgs = {
  pkgEqualSpec: PkgEqualSpec;
};


export type QueryPointOfContactArgs = {
  pointOfContactSpec: PointOfContactSpec;
};


export type QueryArtifactsArgs = {
  artifactSpec: ArtifactSpec;
};


export type QueryBuildersArgs = {
  builderSpec: BuilderSpec;
};


export type QueryCveArgs = {
  cveSpec: CveSpec;
};


export type QueryFindSoftwareArgs = {
  searchText: Scalars['String'];
};


export type QueryGhsaArgs = {
  ghsaSpec: GhsaSpec;
};


export type QueryNeighborsArgs = {
  node: Scalars['ID'];
  usingOnly: Array<Edge>;
};


export type QueryNodeArgs = {
  node: Scalars['ID'];
};


export type QueryNodesArgs = {
  nodes: Array<Scalars['ID']>;
};


export type QueryOsvArgs = {
  osvSpec: OsvSpec;
};


export type QueryPackagesArgs = {
  pkgSpec: PkgSpec;
};


export type QueryPathArgs = {
  maxPathLength: Scalars['Int'];
  subject: Scalars['ID'];
  target: Scalars['ID'];
  usingOnly: Array<Edge>;
};


export type QueryScorecardsArgs = {
  scorecardSpec: CertifyScorecardSpec;
};


export type QuerySourcesArgs = {
  sourceSpec: SourceSpec;
};

/**
 * SLSA contains all of the fields present in a SLSA attestation.
 *
 * The materials and builders are objects of the HasSLSA predicate, everything
 * else are properties extracted from the attestation.
 *
 * We also include fields to specify under what conditions the check was performed
 * (time of scan, version of scanners, etc.) as well as how this information got
 * included into GUAC (origin document and the collector for that document).
 */
export type Slsa = {
  __typename?: 'SLSA';
  /** Type of the builder */
  buildType: Scalars['String'];
  /** Builder performing the build */
  builtBy: Builder;
  /** Materials of the build resulting in subject */
  builtFrom: Array<Artifact>;
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Timestamp (RFC3339Nano format) of build end time */
  finishedOn?: Maybe<Scalars['Time']>;
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Individual predicates found in the attestation */
  slsaPredicate: Array<SlsaPredicate>;
  /** Version of the SLSA predicate */
  slsaVersion: Scalars['String'];
  /** Timestamp (RFC3339Nano format) of build start time */
  startedOn?: Maybe<Scalars['Time']>;
};

/** SLSAInputSpec is the same as SLSA but for mutation input. */
export type SlsaInputSpec = {
  buildType: Scalars['String'];
  collector: Scalars['String'];
  finishedOn?: InputMaybe<Scalars['Time']>;
  origin: Scalars['String'];
  slsaPredicate: Array<SlsaPredicateInputSpec>;
  slsaVersion: Scalars['String'];
  startedOn?: InputMaybe<Scalars['Time']>;
};

/**
 * SLSAPredicate are the values from the SLSA predicate in key-value pair form.
 *
 * For example, given the following predicate
 *
 * ```
 * "predicate": {
 *   "buildDefinition": {
 *     "externalParameters": {
 *       "repository": "https://github.com/octocat/hello-world",
 *       ...
 *     },
 *     ...
 *   },
 *   ...
 * }
 * ```
 *
 * we have
 *
 * ```
 * key   = "buildDefinition.externalParameters.repository"
 * value = "https://github.com/octocat/hello-world"
 * ```
 *
 * This node cannot be directly referred by other parts of GUAC.
 */
export type SlsaPredicate = {
  __typename?: 'SLSAPredicate';
  key: Scalars['String'];
  value: Scalars['String'];
};

/** SLSAPredicateInputSpec allows ingesting SLSAPredicateSpec. */
export type SlsaPredicateInputSpec = {
  key: Scalars['String'];
  value: Scalars['String'];
};

/** SLSAPredicateSpec is the same as SLSAPredicate, but usable as query input. */
export type SlsaPredicateSpec = {
  key: Scalars['String'];
  value: Scalars['String'];
};

/**
 * Scorecard contains all of the fields present in a Scorecard attestation.
 *
 * We also include fields to specify under what conditions the check was performed
 * (time of scan, version of scanners, etc.) as well as how this information got
 * included into GUAC (origin document and the collector for that document).
 */
export type Scorecard = {
  __typename?: 'Scorecard';
  /** Overall Scorecard score for the source */
  aggregateScore: Scalars['Float'];
  /** Individual Scorecard check scores (Branch-Protection, Code-Review, ...) */
  checks: Array<ScorecardCheck>;
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Commit of the Scorecards repository at the time of scanning the source */
  scorecardCommit: Scalars['String'];
  /** Version of the Scorecard scanner used to analyze the source */
  scorecardVersion: Scalars['String'];
  /** Exact timestamp when the source was last scanned (in RFC 3339 format) */
  timeScanned: Scalars['Time'];
};

/**
 * ScorecardCheck are the individual checks from scorecard and their values as a
 * key-value pair.
 *
 * For example:  Branch-Protection, Code-Review...etc
 *
 * Based off scorecard's:
 * type jsonCheckResultV2 struct {
 *   Details []string                 `json:"details"`
 *   Score   int                      `json:"score"`
 *   Reason  string                   `json:"reason"`
 *   Name    string                   `json:"name"`
 *   Doc     jsonCheckDocumentationV2 `json:"documentation"`
 * }
 * This node cannot be directly referred by other parts of GUAC.
 */
export type ScorecardCheck = {
  __typename?: 'ScorecardCheck';
  check: Scalars['String'];
  score: Scalars['Int'];
};

/** ScorecardCheckInputSpec represents the mutation input for a Scorecard check. */
export type ScorecardCheckInputSpec = {
  check: Scalars['String'];
  score: Scalars['Int'];
};

/** ScorecardCheckSpec is the same as ScorecardCheck, but usable as query input. */
export type ScorecardCheckSpec = {
  check: Scalars['String'];
  score: Scalars['Int'];
};

/** ScorecardInputSpec represents the mutation input to ingest a Scorecard. */
export type ScorecardInputSpec = {
  aggregateScore: Scalars['Float'];
  checks: Array<ScorecardCheckInputSpec>;
  collector: Scalars['String'];
  origin: Scalars['String'];
  scorecardCommit: Scalars['String'];
  scorecardVersion: Scalars['String'];
  timeScanned: Scalars['Time'];
};

/**
 * Source represents the root of the source trie/tree.
 *
 * We map source information to a trie, as a derivative of the pURL specification:
 * each path in the trie represents a type, namespace, name and an optional
 * qualifier that stands for tag/commit information.
 *
 * This node represents the type part of the trie path. It is used to represent
 * the version control system that is being used.
 *
 * Since this node is at the root of the source trie, it is named Source, not
 * SourceType.
 */
export type Source = {
  __typename?: 'Source';
  id: Scalars['ID'];
  namespaces: Array<SourceNamespace>;
  type: Scalars['String'];
};

/**
 * SourceInputSpec specifies a source for mutations.
 *
 * This is different than SourceSpec because we want to encode that all fields
 * except tag and commit are mandatory fields. All optional fields are given empty
 * default values.
 *
 * It is an error to set both tag and commit fields to values different than the
 * default.
 */
export type SourceInputSpec = {
  commit?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  namespace: Scalars['String'];
  tag?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

/**
 * SourceName represents the url of the repository.
 *
 * The name field is mandatory. The tag and commit fields are optional, but it is
 * an error to specify both.
 *
 * This is the only source trie node that can be referenced by other parts of GUAC.
 */
export type SourceName = {
  __typename?: 'SourceName';
  commit?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tag?: Maybe<Scalars['String']>;
};

/**
 * SourceNamespace is a namespace for sources.
 *
 * This is the location of the repository (such as github/gitlab/bitbucket).
 *
 * The namespace field is mandatory.
 */
export type SourceNamespace = {
  __typename?: 'SourceNamespace';
  id: Scalars['ID'];
  names: Array<SourceName>;
  namespace: Scalars['String'];
};

/**
 * SourceSpec allows filtering the list of sources to return in a query.
 *
 * Empty string at a field means matching with the empty string. Missing field
 * means retrieving all possible matches.
 *
 * It is an error to specify both tag and commit fields, except it both are set as
 * empty string (in which case the returned sources are only those for which there
 * is no tag/commit information).
 */
export type SourceSpec = {
  commit?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Records the justification included in the VEX statement. */
export enum VexJustification {
  ComponentNotPresent = 'COMPONENT_NOT_PRESENT',
  InlineMitigationsAlreadyExist = 'INLINE_MITIGATIONS_ALREADY_EXIST',
  NotProvided = 'NOT_PROVIDED',
  VulnerableCodeCannotBeControlledByAdversary = 'VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY',
  VulnerableCodeNotInExecutePath = 'VULNERABLE_CODE_NOT_IN_EXECUTE_PATH',
  VulnerableCodeNotPresent = 'VULNERABLE_CODE_NOT_PRESENT'
}

/** VexStatementInputSpec represents the input to ingest VEX statements. */
export type VexStatementInputSpec = {
  collector: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
  statement: Scalars['String'];
  status: VexStatus;
  statusNotes: Scalars['String'];
  vexJustification: VexJustification;
};

/** Records the status of a VEX statement subject. */
export enum VexStatus {
  Affected = 'AFFECTED',
  Fixed = 'FIXED',
  NotAffected = 'NOT_AFFECTED',
  UnderInvestigation = 'UNDER_INVESTIGATION'
}

/** Vulnerability is a union of OSV, CVE, GHSA or the NoVuln node. */
export type Vulnerability = Cve | Ghsa | NoVuln | Osv;

/**
 * VulnerabilityInput allows using Vulnerability union as
 * input type to be used in mutations.
 *
 * Either noVuln must be set to true or one of osv, cve, or ghsa must be
 * set to non-nil. If noVuln is set then this is an ingestion of a known lack of
 * vulnerabilities, so the special NoVuln node will be used by the backend.
 * Otherwise, the specific vulnerability type will be linked to this attestation.
 */
export type VulnerabilityInput = {
  cve?: InputMaybe<CveInputSpec>;
  ghsa?: InputMaybe<GhsaInputSpec>;
  noVuln?: InputMaybe<Scalars['Boolean']>;
  osv?: InputMaybe<OsvInputSpec>;
};

/**
 * VulnerabilityMetaData is the metadata attached to vulnerability certification.
 *
 * It contains metadata about the scanner process that created the certification.
 */
export type VulnerabilityMetaData = {
  __typename?: 'VulnerabilityMetaData';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** URI of the vulnerability database used by the scanner */
  dbUri: Scalars['String'];
  /** Version of the vulnerability database used by the scanner */
  dbVersion: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** URI of the scanner */
  scannerUri: Scalars['String'];
  /** Version of the scanner */
  scannerVersion: Scalars['String'];
  /** Time of scan (in RFC 3339 format) */
  timeScanned: Scalars['Time'];
};

/**
 * VulnerabilityMetaDataInput represents the input for certifying vulnerability
 * scans in mutations.
 */
export type VulnerabilityMetaDataInput = {
  collector: Scalars['String'];
  dbUri: Scalars['String'];
  dbVersion: Scalars['String'];
  origin: Scalars['String'];
  scannerUri: Scalars['String'];
  scannerVersion: Scalars['String'];
  timeScanned: Scalars['Time'];
};

/**
 * VulnerabilitySpec allows using Vulnerability union as input type to be used in
 * read queries.
 *
 * Either noVuln must be set or exactly one of osv, cve or ghsa
 * must be set to non-nil. Setting noVuln to true means retrieving only nodes where
 * there is no vulnerability attached. Setting it to false means retrieving only nodes
 * with identified vulnerabilities. Setting one of the other fields means retrieving
 * certifications for the corresponding vulnerability types.
 */
export type VulnerabilitySpec = {
  cve?: InputMaybe<CveSpec>;
  ghsa?: InputMaybe<GhsaSpec>;
  noVuln?: InputMaybe<Scalars['Boolean']>;
  osv?: InputMaybe<OsvSpec>;
};

export type IngestArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
}>;


export type IngestArtifactMutation = { __typename?: 'Mutation', ingestArtifact: (
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) };

export type IngestArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
}>;


export type IngestArtifactsMutation = { __typename?: 'Mutation', ingestArtifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactsQueryVariables = Exact<{
  filter: ArtifactSpec;
}>;


export type ArtifactsQuery = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type IngestBuilderMutationVariables = Exact<{
  builder: BuilderInputSpec;
}>;


export type IngestBuilderMutation = { __typename?: 'Mutation', ingestBuilder: { __typename?: 'Builder', uri: string } };

export type IngestBuildersMutationVariables = Exact<{
  builders: Array<BuilderInputSpec> | BuilderInputSpec;
}>;


export type IngestBuildersMutation = { __typename?: 'Mutation', ingestBuilders: Array<{ __typename?: 'Builder', uri: string }> };

export type CertifyBadPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyBad: CertifyBadInputSpec;
}>;


export type CertifyBadPkgMutation = { __typename?: 'Mutation', ingestCertifyBad: (
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) };

export type CertifyBadSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  certifyBad: CertifyBadInputSpec;
}>;


export type CertifyBadSrcMutation = { __typename?: 'Mutation', ingestCertifyBad: (
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) };

export type CertifyBadArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  certifyBad: CertifyBadInputSpec;
}>;


export type CertifyBadArtifactMutation = { __typename?: 'Mutation', ingestCertifyBad: (
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) };

export type CertifyBadPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type CertifyBadPkgsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  )> };

export type CertifyBadSrcsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type CertifyBadSrcsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  )> };

export type CertifyBadArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type CertifyBadArtifactsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  )> };

export type CertifyBadsQueryVariables = Exact<{
  filter: CertifyBadSpec;
}>;


export type CertifyBadsQuery = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  )> };

export type CertifyGoodPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyGood: CertifyGoodInputSpec;
}>;


export type CertifyGoodPkgMutation = { __typename?: 'Mutation', ingestCertifyGood: (
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) };

export type CertifyGoodSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  certifyGood: CertifyGoodInputSpec;
}>;


export type CertifyGoodSrcMutation = { __typename?: 'Mutation', ingestCertifyGood: (
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) };

export type CertifyGoodArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  certifyGood: CertifyGoodInputSpec;
}>;


export type CertifyGoodArtifactMutation = { __typename?: 'Mutation', ingestCertifyGood: (
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) };

export type CertifyGoodPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type CertifyGoodPkgsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  )> };

export type CertifyGoodSrcsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type CertifyGoodSrcsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  )> };

export type CertifyGoodArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type CertifyGoodArtifactsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  )> };

export type CertifyScorecardMutationVariables = Exact<{
  source: SourceInputSpec;
  scorecard: ScorecardInputSpec;
}>;


export type CertifyScorecardMutation = { __typename?: 'Mutation', ingestScorecard: (
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  ) };

export type CertifyScorecardsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  scorecards: Array<ScorecardInputSpec> | ScorecardInputSpec;
}>;


export type CertifyScorecardsMutation = { __typename?: 'Mutation', ingestScorecards: Array<(
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  )> };

export type VexPackageAndCveMutationVariables = Exact<{
  pkg: PkgInputSpec;
  cve: CveInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type VexPackageAndCveMutation = { __typename?: 'Mutation', ingestVEXStatement: (
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) };

export type VexPackageAndGhsaMutationVariables = Exact<{
  pkg: PkgInputSpec;
  ghsa: GhsaInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type VexPackageAndGhsaMutation = { __typename?: 'Mutation', ingestVEXStatement: (
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) };

export type VexPackageAndOsvMutationVariables = Exact<{
  pkg: PkgInputSpec;
  osv: OsvInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type VexPackageAndOsvMutation = { __typename?: 'Mutation', ingestVEXStatement: (
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) };

export type VexArtifactAndCveMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  cve: CveInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type VexArtifactAndCveMutation = { __typename?: 'Mutation', ingestVEXStatement: (
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) };

export type VexArtifactAndGhsaMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  ghsa: GhsaInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type VexArtifactAndGhsaMutation = { __typename?: 'Mutation', ingestVEXStatement: (
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) };

export type VexArtifactAndOsvMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  osv: OsvInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type VexArtifactAndOsvMutation = { __typename?: 'Mutation', ingestVEXStatement: (
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) };

export type CertifyOsvMutationVariables = Exact<{
  pkg: PkgInputSpec;
  osv: OsvInputSpec;
  certifyVuln: VulnerabilityMetaDataInput;
}>;


export type CertifyOsvMutation = { __typename?: 'Mutation', ingestVulnerability: (
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) };

export type CertifyCveMutationVariables = Exact<{
  pkg: PkgInputSpec;
  cve: CveInputSpec;
  certifyVuln: VulnerabilityMetaDataInput;
}>;


export type CertifyCveMutation = { __typename?: 'Mutation', ingestVulnerability: (
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) };

export type CertifyGhsaMutationVariables = Exact<{
  pkg: PkgInputSpec;
  ghsa: GhsaInputSpec;
  certifyVuln: VulnerabilityMetaDataInput;
}>;


export type CertifyGhsaMutation = { __typename?: 'Mutation', ingestVulnerability: (
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) };

export type CertifyNoKnownVulnMutationVariables = Exact<{
  pkg: PkgInputSpec;
  certifyVuln: VulnerabilityMetaDataInput;
}>;


export type CertifyNoKnownVulnMutation = { __typename?: 'Mutation', ingestVulnerability: (
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) };

export type PointOfContactPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  pointOfContact: PointOfContactInputSpec;
}>;


export type PointOfContactPkgMutation = { __typename?: 'Mutation', ingestPointOfContact: (
    { __typename?: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) };

export type PointOfContactSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  pointOfContact: PointOfContactInputSpec;
}>;


export type PointOfContactSrcMutation = { __typename?: 'Mutation', ingestPointOfContact: (
    { __typename?: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) };

export type PointOfContactArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  pointOfContact: PointOfContactInputSpec;
}>;


export type PointOfContactArtifactMutation = { __typename?: 'Mutation', ingestPointOfContact: (
    { __typename?: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) };

export type IngestCveMutationVariables = Exact<{
  cve: CveInputSpec;
}>;


export type IngestCveMutation = { __typename?: 'Mutation', ingestCVE: (
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) };

export type IngestCvEsMutationVariables = Exact<{
  cves: Array<CveInputSpec> | CveInputSpec;
}>;


export type IngestCvEsMutation = { __typename?: 'Mutation', ingestCVEs: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type CvEsQueryVariables = Exact<{
  filter: CveSpec;
}>;


export type CvEsQuery = { __typename?: 'Query', cve: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type IngestGhsaMutationVariables = Exact<{
  ghsa: GhsaInputSpec;
}>;


export type IngestGhsaMutation = { __typename?: 'Mutation', ingestGHSA: (
    { __typename?: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) };

export type IngestGhsAsMutationVariables = Exact<{
  ghsas: Array<GhsaInputSpec> | GhsaInputSpec;
}>;


export type IngestGhsAsMutation = { __typename?: 'Mutation', ingestGHSAs: Array<(
    { __typename?: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  )> };

export type GhsAsQueryVariables = Exact<{
  filter: GhsaSpec;
}>;


export type GhsAsQuery = { __typename?: 'Query', ghsa: Array<(
    { __typename?: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  )> };

export type HasSbomPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  hasSBOM: HasSbomInputSpec;
}>;


export type HasSbomPkgMutation = { __typename?: 'Mutation', ingestHasSBOM: (
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) };

export type HasSbomArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  hasSBOM: HasSbomInputSpec;
}>;


export type HasSbomArtifactMutation = { __typename?: 'Mutation', ingestHasSBOM: (
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) };

export type HasSbomPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  hasSBOMs: Array<HasSbomInputSpec> | HasSbomInputSpec;
}>;


export type HasSbomPkgsMutation = { __typename?: 'Mutation', ingestHasSBOMs: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type HasSbomArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  hasSBOMs: Array<HasSbomInputSpec> | HasSbomInputSpec;
}>;


export type HasSbomArtifactsMutation = { __typename?: 'Mutation', ingestHasSBOMs: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type SlsaForArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  materials: Array<ArtifactInputSpec> | ArtifactInputSpec;
  builder: BuilderInputSpec;
  slsa: SlsaInputSpec;
}>;


export type SlsaForArtifactMutation = { __typename?: 'Mutation', ingestSLSA: (
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  ) };

export type SlsaForArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  materialsList: Array<Array<ArtifactInputSpec> | ArtifactInputSpec> | Array<ArtifactInputSpec> | ArtifactInputSpec;
  builders: Array<BuilderInputSpec> | BuilderInputSpec;
  slsaList: Array<SlsaInputSpec> | SlsaInputSpec;
}>;


export type SlsaForArtifactsMutation = { __typename?: 'Mutation', ingestSLSAs: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

export type HasSourceAtMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  source: SourceInputSpec;
  hasSourceAt: HasSourceAtInputSpec;
}>;


export type HasSourceAtMutation = { __typename?: 'Mutation', ingestHasSourceAt: (
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
  ) };

export type HashEqualMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  otherArtifact: ArtifactInputSpec;
  hashEqual: HashEqualInputSpec;
}>;


export type HashEqualMutation = { __typename?: 'Mutation', ingestHashEqual: (
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  ) };

export type HashEqualsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  otherArtifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  hashEquals: Array<HashEqualInputSpec> | HashEqualInputSpec;
}>;


export type HashEqualsMutation = { __typename?: 'Mutation', ingestHashEquals: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type IsDependencyMutationVariables = Exact<{
  pkg: PkgInputSpec;
  depPkg: PkgInputSpec;
  dependency: IsDependencyInputSpec;
}>;


export type IsDependencyMutation = { __typename?: 'Mutation', ingestDependency: (
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  ) };

export type IsDependenciesMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  depPkgs: Array<PkgInputSpec> | PkgInputSpec;
  dependencies: Array<IsDependencyInputSpec> | IsDependencyInputSpec;
}>;


export type IsDependenciesMutation = { __typename?: 'Mutation', ingestDependencies: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type IsOccurrencePkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  artifact: ArtifactInputSpec;
  occurrence: IsOccurrenceInputSpec;
}>;


export type IsOccurrencePkgMutation = { __typename?: 'Mutation', ingestOccurrence: (
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  ) };

export type IsOccurrenceSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  artifact: ArtifactInputSpec;
  occurrence: IsOccurrenceInputSpec;
}>;


export type IsOccurrenceSrcMutation = { __typename?: 'Mutation', ingestOccurrence: (
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  ) };

export type IsOccurrencesPkgMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  occurrences: Array<IsOccurrenceInputSpec> | IsOccurrenceInputSpec;
}>;


export type IsOccurrencesPkgMutation = { __typename?: 'Mutation', ingestOccurrences: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsOccurrencesSrcMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  occurrences: Array<IsOccurrenceInputSpec> | IsOccurrenceInputSpec;
}>;


export type IsOccurrencesSrcMutation = { __typename?: 'Mutation', ingestOccurrences: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsVulnerabilityCveMutationVariables = Exact<{
  osv: OsvInputSpec;
  cve: CveInputSpec;
  isVulnerability: IsVulnerabilityInputSpec;
}>;


export type IsVulnerabilityCveMutation = { __typename?: 'Mutation', ingestIsVulnerability: (
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityFragment': AllIsVulnerabilityFragment } }
  ) };

export type IsVulnerabilityGhsaMutationVariables = Exact<{
  osv: OsvInputSpec;
  ghsa: GhsaInputSpec;
  isVulnerability: IsVulnerabilityInputSpec;
}>;


export type IsVulnerabilityGhsaMutation = { __typename?: 'Mutation', ingestIsVulnerability: (
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityFragment': AllIsVulnerabilityFragment } }
  ) };

export type HasMetadataPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  hasMetadata: HasMetadataInputSpec;
}>;


export type HasMetadataPkgMutation = { __typename?: 'Mutation', ingestHasMetadata: (
    { __typename?: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) };

export type HasMetadataSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  hasMetadata: HasMetadataInputSpec;
}>;


export type HasMetadataSrcMutation = { __typename?: 'Mutation', ingestHasMetadata: (
    { __typename?: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) };

export type HasMetadataArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  hasMetadata: HasMetadataInputSpec;
}>;


export type HasMetadataArtifactMutation = { __typename?: 'Mutation', ingestHasMetadata: (
    { __typename?: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) };

export type IngestOsvMutationVariables = Exact<{
  osv: OsvInputSpec;
}>;


export type IngestOsvMutation = { __typename?: 'Mutation', ingestOSV: (
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) };

export type IngestOsVsMutationVariables = Exact<{
  osvs: Array<OsvInputSpec> | OsvInputSpec;
}>;


export type IngestOsVsMutation = { __typename?: 'Mutation', ingestOSVs: Array<(
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  )> };

export type OsVsQueryVariables = Exact<{
  filter: OsvSpec;
}>;


export type OsVsQuery = { __typename?: 'Query', osv: Array<(
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  )> };

export type IngestPackageMutationVariables = Exact<{
  pkg: PkgInputSpec;
}>;


export type IngestPackageMutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type IngestPackagesMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
}>;


export type IngestPackagesMutation = { __typename?: 'Mutation', ingestPackages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PackagesQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackagesQuery = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PackageTypesQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageTypesQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', type: string }> };

export type PackageNamespacesQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageNamespacesQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string }> }> };

export type PackageNamesQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageNamesQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string }> }> }> };

export type PackageVersionsQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageVersionsQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }> };

export type PathQueryVariables = Exact<{
  subject: Scalars['ID'];
  target: Scalars['ID'];
  maxPathLength: Scalars['Int'];
  usingOnly: Array<Edge> | Edge;
}>;


export type PathQuery = { __typename?: 'Query', path: Array<(
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Builder' }
    & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment;'AllBuilderTreeFragment': AllBuilderTreeFragment } }
  ) | (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  ) | (
    { __typename: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) | (
    { __typename: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | { __typename: 'HasMetadata' } | (
    { __typename: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) | (
    { __typename: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  ) | (
    { __typename: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
  ) | (
    { __typename: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  ) | (
    { __typename: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  ) | (
    { __typename: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  ) | (
    { __typename: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityFragment': AllIsVulnerabilityFragment } }
  ) | { __typename: 'NoVuln', id: string } | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
  ) | (
    { __typename: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type NeighborsQueryVariables = Exact<{
  node: Scalars['ID'];
  usingOnly: Array<Edge> | Edge;
}>;


export type NeighborsQuery = { __typename?: 'Query', neighbors: Array<(
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Builder' }
    & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment;'AllBuilderTreeFragment': AllBuilderTreeFragment } }
  ) | (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  ) | (
    { __typename: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) | (
    { __typename: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | { __typename: 'HasMetadata' } | (
    { __typename: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) | (
    { __typename: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  ) | (
    { __typename: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
  ) | (
    { __typename: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  ) | (
    { __typename: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  ) | (
    { __typename: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  ) | (
    { __typename: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityFragment': AllIsVulnerabilityFragment } }
  ) | { __typename: 'NoVuln', id: string } | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
  ) | (
    { __typename: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type NodeQueryVariables = Exact<{
  node: Scalars['ID'];
}>;


export type NodeQuery = { __typename?: 'Query', node: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Builder' }
    & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment;'AllBuilderTreeFragment': AllBuilderTreeFragment } }
  ) | (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  ) | (
    { __typename: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) | (
    { __typename: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | { __typename: 'HasMetadata' } | (
    { __typename: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) | (
    { __typename: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  ) | (
    { __typename: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
  ) | (
    { __typename: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  ) | (
    { __typename: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  ) | (
    { __typename: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  ) | (
    { __typename: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityFragment': AllIsVulnerabilityFragment } }
  ) | { __typename: 'NoVuln', id: string } | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
  ) | (
    { __typename: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) };

export type NodesQueryVariables = Exact<{
  nodes: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type NodesQuery = { __typename?: 'Query', nodes: Array<(
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Builder' }
    & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment;'AllBuilderTreeFragment': AllBuilderTreeFragment } }
  ) | (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  ) | (
    { __typename: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  ) | (
    { __typename: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | { __typename: 'HasMetadata' } | (
    { __typename: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) | (
    { __typename: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  ) | (
    { __typename: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
  ) | (
    { __typename: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  ) | (
    { __typename: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  ) | (
    { __typename: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  ) | (
    { __typename: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityFragment': AllIsVulnerabilityFragment } }
  ) | { __typename: 'NoVuln', id: string } | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
  ) | (
    { __typename: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type PkgEqualMutationVariables = Exact<{
  pkg: PkgInputSpec;
  otherPackage: PkgInputSpec;
  pkgEqual: PkgEqualInputSpec;
}>;


export type PkgEqualMutation = { __typename?: 'Mutation', pkg: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), otherPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), ingestPkgEqual: (
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
  ) };

export type FindSoftwareQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type FindSoftwareQuery = { __typename?: 'Query', findSoftware: Array<(
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type IngestSourceMutationVariables = Exact<{
  source: SourceInputSpec;
}>;


export type IngestSourceMutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) };

export type IngestSourcesMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
}>;


export type IngestSourcesMutation = { __typename?: 'Mutation', ingestSources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type SourcesQueryVariables = Exact<{
  filter: SourceSpec;
}>;


export type SourcesQuery = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type AllPkgTreeFragment = { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } & { ' $fragmentName'?: 'AllPkgTreeFragment' };

export type AllSourceTreeFragment = { __typename?: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> } & { ' $fragmentName'?: 'AllSourceTreeFragment' };

export type AllArtifactTreeFragment = { __typename?: 'Artifact', id: string, algorithm: string, digest: string } & { ' $fragmentName'?: 'AllArtifactTreeFragment' };

export type AllBuilderTreeFragment = { __typename?: 'Builder', id: string, uri: string } & { ' $fragmentName'?: 'AllBuilderTreeFragment' };

export type AllCveTreeFragment = { __typename?: 'CVE', id: string, year: number, cveId: string } & { ' $fragmentName'?: 'AllCveTreeFragment' };

export type AllGhsaTreeFragment = { __typename?: 'GHSA', id: string, ghsaId: string } & { ' $fragmentName'?: 'AllGhsaTreeFragment' };

export type AllOsvTreeFragment = { __typename?: 'OSV', id: string, osvId: string } & { ' $fragmentName'?: 'AllOsvTreeFragment' };

export type AllCertifyScorecardFragment = { __typename?: 'CertifyScorecard', id: string, source: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ), scorecard: { __typename?: 'Scorecard', timeScanned: any, aggregateScore: number, scorecardVersion: string, scorecardCommit: string, origin: string, collector: string, checks: Array<{ __typename?: 'ScorecardCheck', check: string, score: number }> } } & { ' $fragmentName'?: 'AllCertifyScorecardFragment' };

export type AllIsOccurrencesTreeFragment = { __typename?: 'IsOccurrence', id: string, justification: string, origin: string, collector: string, subject: (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ), artifact: (
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllIsOccurrencesTreeFragment' };

export type AllIsDependencyTreeFragment = { __typename?: 'IsDependency', id: string, justification: string, dependencyType: DependencyType, versionRange: string, origin: string, collector: string, package: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), dependentPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllIsDependencyTreeFragment' };

export type AllSlsaTreeFragment = { __typename?: 'HasSLSA', id: string, subject: (
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ), slsa: { __typename?: 'SLSA', buildType: string, slsaVersion: string, startedOn?: any | null, finishedOn?: any | null, origin: string, collector: string, builtFrom: Array<(
      { __typename?: 'Artifact' }
      & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
    )>, builtBy: { __typename?: 'Builder', id: string, uri: string }, slsaPredicate: Array<{ __typename?: 'SLSAPredicate', key: string, value: string }> } } & { ' $fragmentName'?: 'AllSlsaTreeFragment' };

export type AllCertifyBadFragment = { __typename?: 'CertifyBad', id: string, justification: string, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllCertifyBadFragment' };

export type AllCertifyGoodFragment = { __typename?: 'CertifyGood', id: string, justification: string, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllCertifyGoodFragment' };

export type AllHashEqualTreeFragment = { __typename?: 'HashEqual', id: string, justification: string, origin: string, collector: string, artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> } & { ' $fragmentName'?: 'AllHashEqualTreeFragment' };

export type AllHasSbomTreeFragment = { __typename?: 'HasSBOM', id: string, uri: string, algorithm: string, digest: string, downloadLocation: string, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllHasSbomTreeFragment' };

export type AllHasSourceAtFragment = { __typename?: 'HasSourceAt', id: string, justification: string, knownSince: any, origin: string, collector: string, package: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), source: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllHasSourceAtFragment' };

export type AllCertifyVulnFragment = { __typename?: 'CertifyVuln', id: string, package: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), vulnerability: (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | { __typename: 'NoVuln', id: string } | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ), metadata: { __typename?: 'VulnerabilityMetaData', dbUri: string, dbVersion: string, scannerUri: string, scannerVersion: string, timeScanned: any, origin: string, collector: string } } & { ' $fragmentName'?: 'AllCertifyVulnFragment' };

export type AllPkgEqualFragment = { __typename?: 'PkgEqual', id: string, justification: string, origin: string, collector: string, packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> } & { ' $fragmentName'?: 'AllPkgEqualFragment' };

export type AllIsVulnerabilityFragment = { __typename?: 'IsVulnerability', id: string, justification: string, origin: string, collector: string, osv: (
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ), vulnerability: (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllIsVulnerabilityFragment' };

export type AllCertifyVexStatementFragment = { __typename?: 'CertifyVEXStatement', id: string, status: VexStatus, vexJustification: VexJustification, statement: string, statusNotes: string, knownSince: any, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | { __typename: 'NoVuln' } | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllCertifyVexStatementFragment' };

export type AllHasMetadataFragment = { __typename?: 'HasMetadata', id: string, key: string, value: string, timestamp: any, justification: string, origin: string, collector: string, subject: (
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllHasMetadataFragment' };

export type AllPointOfContactFragment = { __typename?: 'PointOfContact', id: string, email: string, info: string, since: any, justification: string, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllPointOfContactFragment' };

export const AllBuilderTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<AllBuilderTreeFragment, unknown>;
export const AllSourceTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllSourceTreeFragment, unknown>;
export const AllCertifyScorecardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllCertifyScorecardFragment, unknown>;
export const AllPkgTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgTreeFragment, unknown>;
export const AllArtifactTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllArtifactTreeFragment, unknown>;
export const AllIsOccurrencesTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllIsOccurrencesTreeFragment, unknown>;
export const AllIsDependencyTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllIsDependencyTreeFragment, unknown>;
export const AllSlsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllSlsaTreeFragment, unknown>;
export const AllCertifyBadFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllCertifyBadFragment, unknown>;
export const AllCertifyGoodFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllCertifyGoodFragment, unknown>;
export const AllHashEqualTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllHashEqualTreeFragment, unknown>;
export const AllHasSbomTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllHasSbomTreeFragment, unknown>;
export const AllHasSourceAtFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllHasSourceAtFragment, unknown>;
export const AllCveTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]} as unknown as DocumentNode<AllCveTreeFragment, unknown>;
export const AllOsvTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]} as unknown as DocumentNode<AllOsvTreeFragment, unknown>;
export const AllGhsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]} as unknown as DocumentNode<AllGhsaTreeFragment, unknown>;
export const AllCertifyVulnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]} as unknown as DocumentNode<AllCertifyVulnFragment, unknown>;
export const AllPkgEqualFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgEqualFragment, unknown>;
export const AllIsVulnerabilityFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]} as unknown as DocumentNode<AllIsVulnerabilityFragment, unknown>;
export const AllCertifyVexStatementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]} as unknown as DocumentNode<AllCertifyVexStatementFragment, unknown>;
export const AllHasMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllHasMetadataFragment, unknown>;
export const AllPointOfContactFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllPointOfContactFragment, unknown>;
export const IngestArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<IngestArtifactMutation, IngestArtifactMutationVariables>;
export const IngestArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<IngestArtifactsMutation, IngestArtifactsMutationVariables>;
export const ArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Artifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactsQuery, ArtifactsQueryVariables>;
export const IngestBuilderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBuilder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<IngestBuilderMutation, IngestBuilderMutationVariables>;
export const IngestBuildersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBuilders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builders"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builders"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builders"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<IngestBuildersMutation, IngestBuildersMutationVariables>;
export const CertifyBadPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadPkgMutation, CertifyBadPkgMutationVariables>;
export const CertifyBadSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadSrcMutation, CertifyBadSrcMutationVariables>;
export const CertifyBadArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadArtifactMutation, CertifyBadArtifactMutationVariables>;
export const CertifyBadPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadPkgsMutation, CertifyBadPkgsMutationVariables>;
export const CertifyBadSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadSrcsMutation, CertifyBadSrcsMutationVariables>;
export const CertifyBadArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadArtifactsMutation, CertifyBadArtifactsMutationVariables>;
export const CertifyBadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyBads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadsQuery, CertifyBadsQueryVariables>;
export const CertifyGoodPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodPkgMutation, CertifyGoodPkgMutationVariables>;
export const CertifyGoodSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodSrcMutation, CertifyGoodSrcMutationVariables>;
export const CertifyGoodArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodArtifactMutation, CertifyGoodArtifactMutationVariables>;
export const CertifyGoodPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodPkgsMutation, CertifyGoodPkgsMutationVariables>;
export const CertifyGoodSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodSrcsMutation, CertifyGoodSrcsMutationVariables>;
export const CertifyGoodArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodArtifactsMutation, CertifyGoodArtifactsMutationVariables>;
export const CertifyScorecardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyScorecard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestScorecard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyScorecardMutation, CertifyScorecardMutationVariables>;
export const CertifyScorecardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyScorecards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecards"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestScorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecards"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecards"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyScorecardsMutation, CertifyScorecardsMutationVariables>;
export const VexPackageAndCveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VexPackageAndCve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cve"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVEInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cve"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexPackageAndCveMutation, VexPackageAndCveMutationVariables>;
export const VexPackageAndGhsaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VEXPackageAndGhsa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSAInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexPackageAndGhsaMutation, VexPackageAndGhsaMutationVariables>;
export const VexPackageAndOsvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VexPackageAndOsv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osv"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osv"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexPackageAndOsvMutation, VexPackageAndOsvMutationVariables>;
export const VexArtifactAndCveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VexArtifactAndCve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cve"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVEInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cve"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexArtifactAndCveMutation, VexArtifactAndCveMutationVariables>;
export const VexArtifactAndGhsaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VexArtifactAndGhsa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSAInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexArtifactAndGhsaMutation, VexArtifactAndGhsaMutationVariables>;
export const VexArtifactAndOsvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VexArtifactAndOsv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osv"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osv"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexArtifactAndOsvMutation, VexArtifactAndOsvMutationVariables>;
export const CertifyOsvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyOSV"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osv"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetaDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osv"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyOsvMutation, CertifyOsvMutationVariables>;
export const CertifyCveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyCVE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cve"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVEInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetaDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cve"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyCveMutation, CertifyCveMutationVariables>;
export const CertifyGhsaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGHSA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSAInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetaDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyGhsaMutation, CertifyGhsaMutationVariables>;
export const CertifyNoKnownVulnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyNoKnownVuln"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetaDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"noVuln"},"value":{"kind":"BooleanValue","value":true}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyNoKnownVulnMutation, CertifyNoKnownVulnMutationVariables>;
export const PointOfContactPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PointOfContactPkgMutation, PointOfContactPkgMutationVariables>;
export const PointOfContactSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PointOfContactSrcMutation, PointOfContactSrcMutationVariables>;
export const PointOfContactArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PointOfContactArtifactMutation, PointOfContactArtifactMutationVariables>;
export const IngestCveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCVE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cve"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVEInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCVE"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cve"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cve"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]} as unknown as DocumentNode<IngestCveMutation, IngestCveMutationVariables>;
export const IngestCvEsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCVEs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cves"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVEInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCVEs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cves"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cves"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]} as unknown as DocumentNode<IngestCvEsMutation, IngestCvEsMutationVariables>;
export const CvEsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CVEs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVESpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cveSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]} as unknown as DocumentNode<CvEsQuery, CvEsQueryVariables>;
export const IngestGhsaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestGHSA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSAInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestGHSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]} as unknown as DocumentNode<IngestGhsaMutation, IngestGhsaMutationVariables>;
export const IngestGhsAsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestGHSAs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ghsas"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSAInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestGHSAs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ghsas"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ghsas"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]} as unknown as DocumentNode<IngestGhsAsMutation, IngestGhsAsMutationVariables>;
export const GhsAsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GHSAs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSASpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ghsaSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]} as unknown as DocumentNode<GhsAsQuery, GhsAsQueryVariables>;
export const HasSbomPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomPkgMutation, HasSbomPkgMutationVariables>;
export const HasSbomArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomArtifactMutation, HasSbomArtifactMutationVariables>;
export const HasSbomPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomPkgsMutation, HasSbomPkgsMutationVariables>;
export const HasSbomArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomArtifactsMutation, HasSbomArtifactsMutationVariables>;
export const SlsaForArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SLSAForArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materials"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLSAInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materials"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builder"}}},{"kind":"Argument","name":{"kind":"Name","value":"slsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slsa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<SlsaForArtifactMutation, SlsaForArtifactMutationVariables>;
export const SlsaForArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SLSAForArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materialsList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builders"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slsaList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLSAInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSAs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtFromList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materialsList"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtByList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builders"}}},{"kind":"Argument","name":{"kind":"Name","value":"slsaList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slsaList"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<SlsaForArtifactsMutation, SlsaForArtifactsMutationVariables>;
export const HasSourceAtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSourceAt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtMutation, HasSourceAtMutationVariables>;
export const HashEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HashEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherArtifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashEqual"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualMutation, HashEqualMutationVariables>;
export const HashEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HashEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHashEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherArtifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashEquals"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualsMutation, HashEqualsMutationVariables>;
export const IsDependencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsDependency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dependency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencyInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"dependency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dependency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDependencyMutation, IsDependencyMutationVariables>;
export const IsDependenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsDependencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dependencies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencyInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestDependencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"dependencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dependencies"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDependenciesMutation, IsDependenciesMutationVariables>;
export const IsOccurrencePkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrencePkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrencePkgMutation, IsOccurrencePkgMutationVariables>;
export const IsOccurrenceSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrenceSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceSrcMutation, IsOccurrenceSrcMutationVariables>;
export const IsOccurrencesPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrencesPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrencesPkgMutation, IsOccurrencesPkgMutationVariables>;
export const IsOccurrencesSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrencesSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrencesSrcMutation, IsOccurrencesSrcMutationVariables>;
export const IsVulnerabilityCveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsVulnerabilityCVE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osv"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cve"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CVEInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerabilityInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestIsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osv"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osv"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cve"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"isVulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVulnerability"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsVulnerability"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityCveMutation, IsVulnerabilityCveMutationVariables>;
export const IsVulnerabilityGhsaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsVulnerabilityGHSA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osv"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GHSAInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerabilityInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestIsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osv"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osv"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ghsa"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"isVulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVulnerability"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsVulnerability"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityGhsaMutation, IsVulnerabilityGhsaMutationVariables>;
export const HasMetadataPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasMetadataPkgMutation, HasMetadataPkgMutationVariables>;
export const HasMetadataSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasMetadataSrcMutation, HasMetadataSrcMutationVariables>;
export const HasMetadataArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasMetadataArtifactMutation, HasMetadataArtifactMutationVariables>;
export const IngestOsvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestOSV"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osv"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOSV"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osv"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osv"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]} as unknown as DocumentNode<IngestOsvMutation, IngestOsvMutationVariables>;
export const IngestOsVsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestOSVs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"osvs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOSVs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osvs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"osvs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]} as unknown as DocumentNode<IngestOsVsMutation, IngestOsVsMutationVariables>;
export const OsVsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OSVs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OSVSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osvSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]} as unknown as DocumentNode<OsVsQuery, OsVsQueryVariables>;
export const IngestPackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<IngestPackageMutation, IngestPackageMutationVariables>;
export const IngestPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<IngestPackagesMutation, IngestPackagesMutationVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const PackageTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PackageTypesQuery, PackageTypesQueryVariables>;
export const PackageNamespacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageNamespaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}}]}}]}}]}}]} as unknown as DocumentNode<PackageNamespacesQuery, PackageNamespacesQueryVariables>;
export const PackageNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageNames"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackageNamesQuery, PackageNamesQueryVariables>;
export const PackageVersionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageVersions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackageVersionsQuery, PackageVersionsQueryVariables>;
export const PathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Path"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPathLength"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPathLength"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPathLength"}}},{"kind":"Argument","name":{"kind":"Name","value":"usingOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsVulnerability"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PathQuery, PathQueryVariables>;
export const NeighborsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Neighbors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"node"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neighbors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"node"}}},{"kind":"Argument","name":{"kind":"Name","value":"usingOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsVulnerability"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NeighborsQuery, NeighborsQueryVariables>;
export const NodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Node"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"node"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"node"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsVulnerability"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NodeQuery, NodeQueryVariables>;
export const NodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Nodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nodes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsVulnerability"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsVulnerability"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllOSVTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NodesQuery, NodesQueryVariables>;
export const PkgEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pkg"},"name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"otherPackage"},"name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingestPkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherPackage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgEqual"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualMutation, PkgEqualMutationVariables>;
export const FindSoftwareDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSoftware"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSoftware"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<FindSoftwareQuery, FindSoftwareQueryVariables>;
export const IngestSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<IngestSourceMutation, IngestSourceMutationVariables>;
export const IngestSourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<IngestSourcesMutation, IngestSourcesMutationVariables>;
export const SourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SourcesQuery, SourcesQueryVariables>;
