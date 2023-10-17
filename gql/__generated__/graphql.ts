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
  knownSince: Scalars['Time'];
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
  knownSince: Scalars['Time'];
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
 *
 * If KnownSince is specified, the returned value will be after or equal to the specified time.
 * Any nodes time that is before KnownSince is excluded.
 */
export type CertifyBadSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  knownSince?: InputMaybe<Scalars['Time']>;
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
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
  subject: PackageSourceOrArtifact;
};

/** CertifyGoodInputSpec represents the mutation input to ingest a CertifyGood evidence. */
export type CertifyGoodInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
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
 *
 * If KnownSince is specified, the returned value will be after or equal to the specified time.
 * Any nodes time that is before KnownSince is excluded.
 */
export type CertifyGoodSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  knownSince?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

/**
 * CertifyLegal is an attestation to attach legal information to a package or source.
 *
 * The certification information is either copied from an attestation found in an
 * SBOM or created by a collector/scanner.
 *
 * Discovered license is also known as Concluded. More information:
 * https://docs.clearlydefined.io/curation-guidelines#the-difference-between-declared-and-discovered-licenses
 *
 * Attribution is also known as Copyright Text. It is what could be displayed to
 * comply with notice
 * requirements. https://www.nexb.com/oss-attribution-best-practices/
 *
 * License expressions follow this format:
 * https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions/
 */
export type CertifyLegal = {
  __typename?: 'CertifyLegal';
  /** Attribution text of the subject */
  attribution: Scalars['String'];
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** The license expression as delcared */
  declaredLicense: Scalars['String'];
  /** A list of license objects found in the declared license expression */
  declaredLicenses: Array<License>;
  /** The license expression as discovered by scan */
  discoveredLicense: Scalars['String'];
  /** A list of license objects found in the discovered license expression */
  discoveredLicenses: Array<License>;
  id: Scalars['ID'];
  /** Extra justification for the certification */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The package version or source that is attested */
  subject: PackageOrSource;
  /** Time of scan (in RFC 3339 format) */
  timeScanned: Scalars['Time'];
};

/**
 * CertifyLegalInputSpec represents the input for certifying legal information in
 * mutations.
 */
export type CertifyLegalInputSpec = {
  attribution: Scalars['String'];
  collector: Scalars['String'];
  declaredLicense: Scalars['String'];
  discoveredLicense: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  timeScanned: Scalars['Time'];
};

/**
 * CertifyLegalSpec allows filtering the list of legal certifications to
 * return in a query.
 *
 * Specifying just the package allows to query for all certifications associated
 * with the package.
 */
export type CertifyLegalSpec = {
  attribution?: InputMaybe<Scalars['String']>;
  collector?: InputMaybe<Scalars['String']>;
  declaredLicense?: InputMaybe<Scalars['String']>;
  declaredLicenses?: InputMaybe<Array<LicenseSpec>>;
  discoveredLicense?: InputMaybe<Scalars['String']>;
  discoveredLicenses?: InputMaybe<Array<LicenseSpec>>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrSourceSpec>;
  timeScanned?: InputMaybe<Scalars['Time']>;
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
 * artifact to clarify the impact of a specific vulnerability.
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
 * Only one subject type (package or artifact) and one vulnerability may be specified.
 *
 * Note that setting noVuln vulnerability type is invalid for VEX statements!
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
 * detected, we attach the a vulnerability with "NoVuln" type and an empty string
 * for the vulnerability ID.
 */
export type CertifyVuln = {
  __typename?: 'CertifyVuln';
  id: Scalars['ID'];
  /** Metadata attached to the certification */
  metadata: ScanMetadata;
  /** The package that is attested */
  package: Package;
  /** The vulnerability can be an be a specific vulnerability or NoVuln type. */
  vulnerability: Vulnerability;
};

/**
 * CertifyVulnSpec allows filtering the list of vulnerability certifications to
 * return in a query.
 *
 * Specifying just the package allows to query for all vulnerabilities associated
 * with the package.
 *
 * Only one vulnerability (or NoVuln vulnerability type) may be
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

/** The Comparator is used by the vulnerability score filter on ranges */
export enum Comparator {
  Equal = 'EQUAL',
  Greater = 'GREATER',
  GreaterEqual = 'GREATER_EQUAL',
  Less = 'LESS',
  LessEqual = 'LESS_EQUAL'
}

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
  CertifyLegalLicense = 'CERTIFY_LEGAL_LICENSE',
  CertifyLegalPackage = 'CERTIFY_LEGAL_PACKAGE',
  CertifyLegalSource = 'CERTIFY_LEGAL_SOURCE',
  CertifyScorecardSource = 'CERTIFY_SCORECARD_SOURCE',
  CertifyVexStatementArtifact = 'CERTIFY_VEX_STATEMENT_ARTIFACT',
  CertifyVexStatementPackage = 'CERTIFY_VEX_STATEMENT_PACKAGE',
  CertifyVexStatementVulnerability = 'CERTIFY_VEX_STATEMENT_VULNERABILITY',
  CertifyVulnPackage = 'CERTIFY_VULN_PACKAGE',
  CertifyVulnVulnerability = 'CERTIFY_VULN_VULNERABILITY',
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
  LicenseCertifyLegal = 'LICENSE_CERTIFY_LEGAL',
  PackageCertifyBad = 'PACKAGE_CERTIFY_BAD',
  PackageCertifyGood = 'PACKAGE_CERTIFY_GOOD',
  PackageCertifyLegal = 'PACKAGE_CERTIFY_LEGAL',
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
  SourceCertifyLegal = 'SOURCE_CERTIFY_LEGAL',
  SourceCertifyScorecard = 'SOURCE_CERTIFY_SCORECARD',
  SourceHasMetadata = 'SOURCE_HAS_METADATA',
  SourceHasSourceAt = 'SOURCE_HAS_SOURCE_AT',
  SourceIsOccurrence = 'SOURCE_IS_OCCURRENCE',
  SourcePointOfContact = 'SOURCE_POINT_OF_CONTACT',
  VulnerabilityCertifyVexStatement = 'VULNERABILITY_CERTIFY_VEX_STATEMENT',
  VulnerabilityCertifyVuln = 'VULNERABILITY_CERTIFY_VULN',
  VulnerabilityVulnEqual = 'VULNERABILITY_VULN_EQUAL',
  VulnerabilityVulnMetadata = 'VULNERABILITY_VULN_METADATA',
  VulnEqualVulnerability = 'VULN_EQUAL_VULNERABILITY',
  VulnMetadataVulnerability = 'VULN_METADATA_VULNERABILITY'
}

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
  /** Timestamp for SBOM creation */
  knownSince: Scalars['Time'];
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
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
  uri: Scalars['String'];
};

/**
 * HasSBOMSpec allows filtering the list of HasSBOM to return.
 *
 * Only the package or artifact can be added, not both.
 *
 * If KnownSince is specified, the returned value will be after or equal to the specified time.
 * Any nodes time that is before KnownSince is excluded.
 */
export type HasSbomSpec = {
  algorithm?: InputMaybe<Scalars['String']>;
  collector?: InputMaybe<Scalars['String']>;
  digest?: InputMaybe<Scalars['String']>;
  downloadLocation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  knownSince?: InputMaybe<Scalars['Time']>;
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

/** IsDependency is an attestation to record that a package depends on another.  */
export type IsDependency = {
  __typename?: 'IsDependency';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Package for the dependency; MUST be PackageName or PackageVersion  */
  dependencyPackage: Package;
  /** Type of dependency */
  dependencyType: DependencyType;
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Package that has the dependency */
  package: Package;
  /** Version range for the dependency link, required if depedentPackage points to PackageName */
  versionRange: Scalars['String'];
};

/** IsDependencyInputSpec is the input to record a new dependency. */
export type IsDependencyInputSpec = {
  collector: Scalars['String'];
  dependencyType: DependencyType;
  justification: Scalars['String'];
  origin: Scalars['String'];
  /** versionRange should be specified for depedentPackages that point to PackageName */
  versionRange: Scalars['String'];
};

/**
 * IsDependencySpec allows filtering the list of dependencies to return.
 *
 * To obtain the list of dependency packages, caller must fill in the package
 * field.
 *
 * Dependency packages must be defined at PackageName, not PackageVersion.
 */
export type IsDependencySpec = {
  collector?: InputMaybe<Scalars['String']>;
  dependencyPackage?: InputMaybe<PkgSpec>;
  dependencyType?: InputMaybe<DependencyType>;
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

/**
 * License represents a particular license. If the license is found on the SPDX
 * license list (https://spdx.org/licenses/) then the fields should be:
 *
 * Name: SPDX license identifier
 * Inline: empty
 * ListVersion: SPDX license list version
 *
 * example:
 *
 * Name: AGPL-3.0-or-later
 * Inline: ""
 * ListVersion: 3.21 2023-06-18
 *
 * If the license is not on the SPDX license list, then a new guid should be
 * created and the license text placed inline:
 *
 * Name: LicenseRef-<guid>
 * Inline: Full license text
 * ListVersion: empty
 *
 * example:
 *
 * Name: LicenseRef-1a2b3c
 * Inline: Permission to use, copy, modify, and/or distribute ...
 * ListVersion: ""
 */
export type License = {
  __typename?: 'License';
  id: Scalars['ID'];
  inline?: Maybe<Scalars['String']>;
  listVersion?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/**
 * LicenseInputSpec specifies an license for mutations. One of inline or
 * listVersion should be empty or missing.
 */
export type LicenseInputSpec = {
  inline?: InputMaybe<Scalars['String']>;
  listVersion?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** LicenseSpec allows filtering the list of licenses to return in a query. */
export type LicenseSpec = {
  id?: InputMaybe<Scalars['ID']>;
  inline?: InputMaybe<Scalars['String']>;
  listVersion?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** MatchFlags is used to input the PkgMatchType enum. */
export type MatchFlags = {
  pkg: PkgMatchType;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Ingests a new artifact and returns it. The returned ID can be empty string. */
  ingestArtifact: Scalars['ID'];
  /** Bulk ingests new artifacts and returns a list of them. The returned array of IDs can be a an array of empty string. */
  ingestArtifacts: Array<Scalars['ID']>;
  /** Ingests a new builder and returns it. The returned ID can be empty string. */
  ingestBuilder: Scalars['ID'];
  /** Bulk ingests new builders and returns a list of them. The returned array of IDs can be a an array of empty string. */
  ingestBuilders: Array<Scalars['ID']>;
  /** Adds bulk metadata about a package, source or artifact. The returned array of IDs can be a an array of empty string. */
  ingestBulkHasMetadata: Array<Scalars['ID']>;
  /** Bulk add certifications that vulnerability has a specific score. The returned array of IDs can be a an array of empty string. */
  ingestBulkVulnerabilityMetadata: Array<Scalars['ID']>;
  /** Adds a certification that a package, source or artifact is considered bad. The returned ID can be empty string. */
  ingestCertifyBad: Scalars['ID'];
  /** Adds bulk certifications that a package, source or artifact is considered bad. The returned array of IDs can be a an array of empty string. */
  ingestCertifyBads: Array<Scalars['ID']>;
  /** Adds a certification that a package, source or artifact is considered good. The returned ID can be empty string. */
  ingestCertifyGood: Scalars['ID'];
  /** Adds bulk certifications that a package, source or artifact is considered good. The returned array of IDs can be a an array of empty string. */
  ingestCertifyGoods: Array<Scalars['ID']>;
  /** Adds a legal certification to a package or source. */
  ingestCertifyLegal: Scalars['ID'];
  /** Bulk add legal certifications to packages or sources, not both at same time. */
  ingestCertifyLegals: Array<Scalars['ID']>;
  /** Adds a certification that a package has been scanned for vulnerabilities. The returned ID can be empty string. */
  ingestCertifyVuln: Scalars['ID'];
  /** Bulk add certifications that a package has been scanned for vulnerabilities. The returned array of IDs can be a an array of empty string. */
  ingestCertifyVulns: Array<Scalars['ID']>;
  /** Bulk adds a dependency between two packages. The returned array of IDs can be a an array of empty string. */
  ingestDependencies: Array<Scalars['ID']>;
  /** Adds a dependency between two packages. The returned ID can be empty string. */
  ingestDependency: Scalars['ID'];
  /** Adds metadata about a package, source or artifact. The returned ID can be empty string. */
  ingestHasMetadata: Scalars['ID'];
  /** Certifies that a package or artifact has an SBOM. The returned ID can be empty string. */
  ingestHasSBOM: Scalars['ID'];
  /** Bulk ingest that package or artifact has an SBOM. The returned array of IDs can be a an array of empty string. */
  ingestHasSBOMs: Array<Scalars['ID']>;
  /** Adds a certification that a package (PackageName or PackageVersion) is built from the source. The returned ID can be empty string. */
  ingestHasSourceAt: Scalars['ID'];
  /** Bulk ingestion of certifications that a package (PackageName or PackageVersion) is built from the source. The returned array of IDs can be a an array of empty string. */
  ingestHasSourceAts: Array<Scalars['ID']>;
  /** Adds a certification that two artifacts are equal. The returned ID can be empty string. */
  ingestHashEqual: Scalars['ID'];
  /** Bulk ingest certifications that two artifacts are equal. The returned array of IDs can be a an array of empty string. */
  ingestHashEquals: Array<Scalars['ID']>;
  /** Ingests a new license and returns it. */
  ingestLicense: Scalars['ID'];
  /** Bulk ingests new licenses and returns a list of them. */
  ingestLicenses: Array<Scalars['ID']>;
  /** Ingest that an artifact is produced from a package or source. The returned ID can be empty string. */
  ingestOccurrence: Scalars['ID'];
  /** Bulk ingest that an artifact is produced from a package or source. The returned array of IDs can be a an array of empty string. */
  ingestOccurrences: Array<Scalars['ID']>;
  /** Ingests a new package and returns the corresponding package trie path. The returned ID can be empty string. */
  ingestPackage: Scalars['ID'];
  /** Bulk ingests packages and returns the list of corresponding package trie path. The returned array of IDs can be a an array of empty string. */
  ingestPackages: Array<Scalars['ID']>;
  /** Adds a certification that two packages are similar. The returned ID can be empty string. */
  ingestPkgEqual: Scalars['ID'];
  /** Bulk ingest mapping between packages. The returned array of IDs can be a an array of empty string. */
  ingestPkgEquals: Array<Scalars['ID']>;
  /** Adds a PointOfContact attestation to a package, source or artifact. The returned ID can be empty string. */
  ingestPointOfContact: Scalars['ID'];
  /** Adds bulk PointOfContact attestations to a package, source or artifact. The returned array of IDs can be a an array of empty string. */
  ingestPointOfContacts: Array<Scalars['ID']>;
  /** Ingests a SLSA attestation. The returned ID can be empty string. */
  ingestSLSA: Scalars['ID'];
  /** Bulk Ingest SLSA attestations. The returned array of IDs can be a an array of empty string. */
  ingestSLSAs: Array<Scalars['ID']>;
  /** Adds a certification that a source repository has a Scorecard. The returned ID can be empty string. */
  ingestScorecard: Scalars['ID'];
  /** Adds bulk certifications that a source repository has a Scorecard. The returned array of IDs can be a an array of empty string. */
  ingestScorecards: Array<Scalars['ID']>;
  /** Ingests a new source and returns the corresponding source trie path. The returned ID can be empty string. */
  ingestSource: Scalars['ID'];
  /** Bulk ingests sources and returns the list of corresponding source trie path. The returned array of IDs can be a an array of empty string. */
  ingestSources: Array<Scalars['ID']>;
  /** Adds a VEX certification for a package. The returned ID can be empty string. */
  ingestVEXStatement: Scalars['ID'];
  /** Bulk add VEX certifications for a package and vulnerability. The returned array of IDs can be a an array of empty string. */
  ingestVEXStatements: Array<Scalars['ID']>;
  /** Ingest a mapping between vulnerabilities. The returned ID can be empty string. */
  ingestVulnEqual: Scalars['ID'];
  /** Bulk ingest mapping between vulnerabilities. The returned array of IDs can be a an array of empty string. */
  ingestVulnEquals: Array<Scalars['ID']>;
  /** Bulk ingests vulnerabilities and returns the list of corresponding vulnerability trie path. The returned array of IDs can be a an array of empty string. */
  ingestVulnerabilities: Array<Scalars['ID']>;
  /** Ingests a new vulnerability and returns the corresponding vulnerability trie path. The returned ID can be empty string. */
  ingestVulnerability: Scalars['ID'];
  /** Adds metadata about a vulnerability. The returned ID can be empty string. */
  ingestVulnerabilityMetadata: Scalars['ID'];
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


export type MutationIngestBulkHasMetadataArgs = {
  hasMetadataList: Array<HasMetadataInputSpec>;
  pkgMatchType: MatchFlags;
  subjects: PackageSourceOrArtifactInputs;
};


export type MutationIngestBulkVulnerabilityMetadataArgs = {
  vulnerabilities: Array<VulnerabilityInputSpec>;
  vulnerabilityMetadataList: Array<VulnerabilityMetadataInputSpec>;
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


export type MutationIngestCertifyLegalArgs = {
  certifyLegal: CertifyLegalInputSpec;
  declaredLicenses: Array<LicenseInputSpec>;
  discoveredLicenses: Array<LicenseInputSpec>;
  subject: PackageOrSourceInput;
};


export type MutationIngestCertifyLegalsArgs = {
  certifyLegals: Array<CertifyLegalInputSpec>;
  declaredLicensesList: Array<Array<LicenseInputSpec>>;
  discoveredLicensesList: Array<Array<LicenseInputSpec>>;
  subjects: PackageOrSourceInputs;
};


export type MutationIngestCertifyVulnArgs = {
  certifyVuln: ScanMetadataInput;
  pkg: PkgInputSpec;
  vulnerability: VulnerabilityInputSpec;
};


export type MutationIngestCertifyVulnsArgs = {
  certifyVulns: Array<ScanMetadataInput>;
  pkgs: Array<PkgInputSpec>;
  vulnerabilities: Array<VulnerabilityInputSpec>;
};


export type MutationIngestDependenciesArgs = {
  depPkgMatchType: MatchFlags;
  depPkgs: Array<PkgInputSpec>;
  dependencies: Array<IsDependencyInputSpec>;
  pkgs: Array<PkgInputSpec>;
};


export type MutationIngestDependencyArgs = {
  depPkg: PkgInputSpec;
  depPkgMatchType: MatchFlags;
  dependency: IsDependencyInputSpec;
  pkg: PkgInputSpec;
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


export type MutationIngestHasSourceAtsArgs = {
  hasSourceAts: Array<HasSourceAtInputSpec>;
  pkgMatchType: MatchFlags;
  pkgs: Array<PkgInputSpec>;
  sources: Array<SourceInputSpec>;
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


export type MutationIngestLicenseArgs = {
  license?: InputMaybe<LicenseInputSpec>;
};


export type MutationIngestLicensesArgs = {
  licenses: Array<LicenseInputSpec>;
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


export type MutationIngestPkgEqualsArgs = {
  otherPackages: Array<PkgInputSpec>;
  pkgEquals: Array<PkgEqualInputSpec>;
  pkgs: Array<PkgInputSpec>;
};


export type MutationIngestPointOfContactArgs = {
  pkgMatchType: MatchFlags;
  pointOfContact: PointOfContactInputSpec;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestPointOfContactsArgs = {
  pkgMatchType: MatchFlags;
  pointOfContacts: Array<PointOfContactInputSpec>;
  subjects: PackageSourceOrArtifactInputs;
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
  vulnerability: VulnerabilityInputSpec;
};


export type MutationIngestVexStatementsArgs = {
  subjects: PackageOrArtifactInputs;
  vexStatements: Array<VexStatementInputSpec>;
  vulnerabilities: Array<VulnerabilityInputSpec>;
};


export type MutationIngestVulnEqualArgs = {
  otherVulnerability: VulnerabilityInputSpec;
  vulnEqual: VulnEqualInputSpec;
  vulnerability: VulnerabilityInputSpec;
};


export type MutationIngestVulnEqualsArgs = {
  otherVulnerabilities: Array<VulnerabilityInputSpec>;
  vulnEquals: Array<VulnEqualInputSpec>;
  vulnerabilities: Array<VulnerabilityInputSpec>;
};


export type MutationIngestVulnerabilitiesArgs = {
  vulns: Array<VulnerabilityInputSpec>;
};


export type MutationIngestVulnerabilityArgs = {
  vuln: VulnerabilityInputSpec;
};


export type MutationIngestVulnerabilityMetadataArgs = {
  vulnerability: VulnerabilityInputSpec;
  vulnerabilityMetadata: VulnerabilityMetadataInputSpec;
};

/**
 * Node is a union type of all the possible nodes.
 *
 * It encapsulates the software tree nodes along with the evidence nodes. In a
 * path query, all connecting evidence nodes along with their intermediate subject
 * nodes need to be returned in order to create a complete graph.
 */
export type Node = Artifact | Builder | CertifyBad | CertifyGood | CertifyLegal | CertifyScorecard | CertifyVexStatement | CertifyVuln | HasMetadata | HasSbom | HasSlsa | HasSourceAt | HashEqual | IsDependency | IsOccurrence | License | Package | PkgEqual | PointOfContact | Source | VulnEqual | Vulnerability | VulnerabilityMetadata;

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
  /** Returns all legal certifications matching the input filter. */
  CertifyLegal: Array<CertifyLegal>;
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
  /** Returns all package equality statements matching a filter. */
  PkgEqual: Array<PkgEqual>;
  /** Returns all PointOfContact attestations matching a filter. */
  PointOfContact: Array<PointOfContact>;
  /** Returns all artifacts matching a filter. */
  artifacts: Array<Artifact>;
  /** Returns all builders matching a filter. */
  builders: Array<Builder>;
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
  /** Returns all licenses matching a filter. */
  licenses: Array<License>;
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
  /** Returns all equal vulnerability mappings that match a filter. */
  vulnEqual: Array<VulnEqual>;
  /** Returns all vulnerabilities matching a filter. */
  vulnerabilities: Array<Vulnerability>;
  /** Returns all vulnerabilityMetadata attestations matching a filter. */
  vulnerabilityMetadata: Array<VulnerabilityMetadata>;
};


export type QueryCertifyBadArgs = {
  certifyBadSpec: CertifyBadSpec;
};


export type QueryCertifyGoodArgs = {
  certifyGoodSpec: CertifyGoodSpec;
};


export type QueryCertifyLegalArgs = {
  certifyLegalSpec: CertifyLegalSpec;
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


export type QueryFindSoftwareArgs = {
  searchText: Scalars['String'];
};


export type QueryLicensesArgs = {
  licenseSpec: LicenseSpec;
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


export type QueryVulnEqualArgs = {
  vulnEqualSpec: VulnEqualSpec;
};


export type QueryVulnerabilitiesArgs = {
  vulnSpec: VulnerabilitySpec;
};


export type QueryVulnerabilityMetadataArgs = {
  vulnerabilityMetadataSpec: VulnerabilityMetadataSpec;
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
 * ScanMetadata is the metadata attached to vulnerability certification.
 *
 * It contains metadata about the scanner process that created the certification.
 */
export type ScanMetadata = {
  __typename?: 'ScanMetadata';
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
 * ScanMetadataInput represents the input for certifying vulnerability
 * scans in mutations.
 */
export type ScanMetadataInput = {
  collector: Scalars['String'];
  dbUri: Scalars['String'];
  dbVersion: Scalars['String'];
  origin: Scalars['String'];
  scannerUri: Scalars['String'];
  scannerVersion: Scalars['String'];
  timeScanned: Scalars['Time'];
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

/**
 * VulnEqual is an attestation to link two vulnerabilities together as being equal"
 *
 * Note that setting noVuln vulnerability type is invalid for VulnEqual!
 */
export type VulnEqual = {
  __typename?: 'VulnEqual';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Collection of vulnerabilities that are similar */
  vulnerabilities: Array<Vulnerability>;
};

/** VulnEqualInputSpec represents the input to link vulnerabilities to each other. */
export type VulnEqualInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * VulnEqualSpec allows filtering the list of vulnerability links to return
 * in a query.
 */
export type VulnEqualSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  vulnerabilities?: InputMaybe<Array<InputMaybe<VulnerabilitySpec>>>;
};

/**
 * Vulnerability represents the root of the vulnerability trie/tree.
 *
 * We map vulnerability information to a trie, as a derivative of the pURL specification:
 * each path in the trie represents a type and a vulnerability ID. This allows for generic
 * representation of the various vulnerabilities and does not limit to just cve, ghsa or osv.
 * This would be in the general format: vuln://<general-type>/<vuln-id>
 *
 * Examples:
 *
 * CVE, using path separator: vuln://cve/cve-2023-20753
 * OSV, representing its knowledge of a GHSA: vuln://osv/ghsa-205hk
 * Random vendor: vuln://snyk/sn-whatever
 * NoVuln: vuln://novuln/
 *
 *
 * This node represents the type part of the trie path. It is used to represent
 * the specific type of the vulnerability: cve, ghsa, osv or some other vendor specific
 *
 * Since this node is at the root of the vulnerability trie, it is named Vulnerability, not
 * VulnerabilityType.
 *
 * NoVuln is a special vulnerability node to attest that no vulnerability has been
 * found during a vulnerability scan. It will have the type "novuln" and contain an empty string
 * for vulnerabilityID
 *
 * The resolvers will enforce that both the type and vulnerability IDs are lower case.
 */
export type Vulnerability = {
  __typename?: 'Vulnerability';
  id: Scalars['ID'];
  type: Scalars['String'];
  vulnerabilityIDs: Array<VulnerabilityId>;
};

/**
 * VulnerabilityID is a specific vulnerability ID associated with the type of the vulnerability.
 *
 * This will be enforced to be all lowercase.
 *
 * The namespace field is mandatory.
 */
export type VulnerabilityId = {
  __typename?: 'VulnerabilityID';
  id: Scalars['ID'];
  vulnerabilityID: Scalars['String'];
};

/**
 * VulnInputSpec specifies a vulnerability for mutations.
 *
 * This is different than VulnSpec because we want to encode mandatory fields:
 * type and vulnerabilityID.
 */
export type VulnerabilityInputSpec = {
  type: Scalars['String'];
  vulnerabilityID: Scalars['String'];
};

/**
 * VulnerabilityMetadata is an attestation that a vulnerability has a related score
 * associated with it.
 *
 * The intent of this evidence tree predicate is to allow extensibility of vulnerability
 * score (one-to-one mapping) with a specific vulnerability ID.
 *
 * A vulnerability ID can have a one-to-many relationship with the VulnerabilityMetadata
 * node as a vulnerability ID can have multiple scores (in various frameworks).
 *
 * Examples:
 *
 * scoreType: EPSSv1
 * scoreValue: 0.960760000
 *
 * scoreType: CVSSv2
 * scoreValue: 5.0
 *
 * scoreType: CVSSv3
 * scoreValue: 7.5
 *
 * The timestamp is used to determine when the score was evaluated for the specific vulnerability.
 */
export type VulnerabilityMetadata = {
  __typename?: 'VulnerabilityMetadata';
  collector: Scalars['String'];
  id: Scalars['ID'];
  origin: Scalars['String'];
  scoreType: VulnerabilityScoreType;
  scoreValue: Scalars['Float'];
  timestamp: Scalars['Time'];
  vulnerability: Vulnerability;
};

/** VulnerabilityMetadataInputSpec represents the mutation input to ingest a vulnerability metadata. */
export type VulnerabilityMetadataInputSpec = {
  collector: Scalars['String'];
  origin: Scalars['String'];
  scoreType: VulnerabilityScoreType;
  scoreValue: Scalars['Float'];
  timestamp: Scalars['Time'];
};

/**
 * VulnerabilityMetadataSpec allows filtering the list of VulnerabilityMetadata evidence
 * to return in a query.
 *
 * Comparator field is an enum that be set to filter the score and return a
 * range that matches. If the comparator is not specified, it will default to equal operation.
 *
 * Timestamp specified indicates filtering timestamps after the specified time
 */
export type VulnerabilityMetadataSpec = {
  collector?: InputMaybe<Scalars['String']>;
  comparator?: InputMaybe<Comparator>;
  id?: InputMaybe<Scalars['ID']>;
  origin?: InputMaybe<Scalars['String']>;
  scoreType?: InputMaybe<VulnerabilityScoreType>;
  scoreValue?: InputMaybe<Scalars['Float']>;
  timestamp?: InputMaybe<Scalars['Time']>;
  vulnerability?: InputMaybe<VulnerabilitySpec>;
};

/** Records the type of the score being captured by the score node */
export enum VulnerabilityScoreType {
  CvsSv2 = 'CVSSv2',
  CvsSv3 = 'CVSSv3',
  CvsSv4 = 'CVSSv4',
  CvsSv31 = 'CVSSv31',
  EpsSv1 = 'EPSSv1',
  EpsSv2 = 'EPSSv2',
  Owasp = 'OWASP',
  Ssvc = 'SSVC'
}

/**
 * VulnerabilitySpec allows filtering the list of vulnerabilities to return in a query.
 *
 * Use null to match on all values at that level.
 * For example, to get all vulnerabilities in GUAC backend, use a VulnSpec
 * where every field is null.
 *
 * Setting the noVuln boolean true will ignore the other inputs for type and vulnerabilityID.
 * Setting noVuln to true means retrieving only nodes where the type of the vulnerability is "novuln"
 * and the it has an empty string for vulnerabilityID. Setting it to false filters out all results that are "novuln".
 * Setting one of the other fields and omitting the noVuln means retrieving vulnerabilities for the corresponding
 * type and vulnerabilityID. Omission of noVuln field will return all vulnerabilities and novuln.
 */
export type VulnerabilitySpec = {
  id?: InputMaybe<Scalars['ID']>;
  noVuln?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
  vulnerabilityID?: InputMaybe<Scalars['String']>;
};

export type IngestArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
}>;


export type IngestArtifactMutation = { __typename?: 'Mutation', ingestArtifact: string };

export type IngestArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
}>;


export type IngestArtifactsMutation = { __typename?: 'Mutation', ingestArtifacts: Array<string> };

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


export type IngestBuilderMutation = { __typename?: 'Mutation', ingestBuilder: string };

export type IngestBuildersMutationVariables = Exact<{
  builders: Array<BuilderInputSpec> | BuilderInputSpec;
}>;


export type IngestBuildersMutation = { __typename?: 'Mutation', ingestBuilders: Array<string> };

export type CertifyBadPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyBad: CertifyBadInputSpec;
}>;


export type CertifyBadPkgMutation = { __typename?: 'Mutation', ingestCertifyBad: string };

export type CertifyBadSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  certifyBad: CertifyBadInputSpec;
}>;


export type CertifyBadSrcMutation = { __typename?: 'Mutation', ingestCertifyBad: string };

export type CertifyBadArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  certifyBad: CertifyBadInputSpec;
}>;


export type CertifyBadArtifactMutation = { __typename?: 'Mutation', ingestCertifyBad: string };

export type CertifyBadPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type CertifyBadPkgsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<string> };

export type CertifyBadSrcsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type CertifyBadSrcsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<string> };

export type CertifyBadArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type CertifyBadArtifactsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<string> };

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


export type CertifyGoodPkgMutation = { __typename?: 'Mutation', ingestCertifyGood: string };

export type CertifyGoodSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  certifyGood: CertifyGoodInputSpec;
}>;


export type CertifyGoodSrcMutation = { __typename?: 'Mutation', ingestCertifyGood: string };

export type CertifyGoodArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  certifyGood: CertifyGoodInputSpec;
}>;


export type CertifyGoodArtifactMutation = { __typename?: 'Mutation', ingestCertifyGood: string };

export type CertifyGoodPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type CertifyGoodPkgsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<string> };

export type CertifyGoodSrcsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type CertifyGoodSrcsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<string> };

export type CertifyGoodArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type CertifyGoodArtifactsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<string> };

export type CertifyLegalPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  declaredLicenses: Array<LicenseInputSpec> | LicenseInputSpec;
  discoveredLicenses: Array<LicenseInputSpec> | LicenseInputSpec;
  legal: CertifyLegalInputSpec;
}>;


export type CertifyLegalPkgMutation = { __typename?: 'Mutation', ingestCertifyLegal: string };

export type CertifyLegalPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  declaredLicensesList: Array<Array<LicenseInputSpec> | LicenseInputSpec> | Array<LicenseInputSpec> | LicenseInputSpec;
  discoveredLicensesList: Array<Array<LicenseInputSpec> | LicenseInputSpec> | Array<LicenseInputSpec> | LicenseInputSpec;
  legals: Array<CertifyLegalInputSpec> | CertifyLegalInputSpec;
}>;


export type CertifyLegalPkgsMutation = { __typename?: 'Mutation', ingestCertifyLegals: Array<string> };

export type CertifyLegalSrcMutationVariables = Exact<{
  src: SourceInputSpec;
  declaredLicenses: Array<LicenseInputSpec> | LicenseInputSpec;
  discoveredLicenses: Array<LicenseInputSpec> | LicenseInputSpec;
  legal: CertifyLegalInputSpec;
}>;


export type CertifyLegalSrcMutation = { __typename?: 'Mutation', ingestCertifyLegal: string };

export type CertifyLegalSrcsMutationVariables = Exact<{
  srcs: Array<SourceInputSpec> | SourceInputSpec;
  declaredLicensesList: Array<Array<LicenseInputSpec> | LicenseInputSpec> | Array<LicenseInputSpec> | LicenseInputSpec;
  discoveredLicensesList: Array<Array<LicenseInputSpec> | LicenseInputSpec> | Array<LicenseInputSpec> | LicenseInputSpec;
  legals: Array<CertifyLegalInputSpec> | CertifyLegalInputSpec;
}>;


export type CertifyLegalSrcsMutation = { __typename?: 'Mutation', ingestCertifyLegals: Array<string> };

export type CertifyLegalsQueryVariables = Exact<{
  filter: CertifyLegalSpec;
}>;


export type CertifyLegalsQuery = { __typename?: 'Query', CertifyLegal: Array<(
    { __typename?: 'CertifyLegal' }
    & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
  )> };

export type CertifyScorecardMutationVariables = Exact<{
  source: SourceInputSpec;
  scorecard: ScorecardInputSpec;
}>;


export type CertifyScorecardMutation = { __typename?: 'Mutation', ingestScorecard: string };

export type CertifyScorecardsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  scorecards: Array<ScorecardInputSpec> | ScorecardInputSpec;
}>;


export type CertifyScorecardsMutation = { __typename?: 'Mutation', ingestScorecards: Array<string> };

export type CertifyVexPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  vulnerability: VulnerabilityInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type CertifyVexPkgMutation = { __typename?: 'Mutation', ingestVEXStatement: string };

export type CertifyVexArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  vulnerability: VulnerabilityInputSpec;
  vexStatement: VexStatementInputSpec;
}>;


export type CertifyVexArtifactMutation = { __typename?: 'Mutation', ingestVEXStatement: string };

export type CertifyVexPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  vulnerabilities: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
  vexStatements: Array<VexStatementInputSpec> | VexStatementInputSpec;
}>;


export type CertifyVexPkgsMutation = { __typename?: 'Mutation', ingestVEXStatements: Array<string> };

export type CertifyVexArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  vulnerabilities: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
  vexStatements: Array<VexStatementInputSpec> | VexStatementInputSpec;
}>;


export type CertifyVexArtifactsMutation = { __typename?: 'Mutation', ingestVEXStatements: Array<string> };

export type CertifyVulnPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  vulnerability: VulnerabilityInputSpec;
  certifyVuln: ScanMetadataInput;
}>;


export type CertifyVulnPkgMutation = { __typename?: 'Mutation', ingestCertifyVuln: string };

export type CertifyVulnPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  vulnerabilities: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
  certifyVulns: Array<ScanMetadataInput> | ScanMetadataInput;
}>;


export type CertifyVulnPkgsMutation = { __typename?: 'Mutation', ingestCertifyVulns: Array<string> };

export type PointOfContactPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  pointOfContact: PointOfContactInputSpec;
}>;


export type PointOfContactPkgMutation = { __typename?: 'Mutation', ingestPointOfContact: string };

export type PointOfContactSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  pointOfContact: PointOfContactInputSpec;
}>;


export type PointOfContactSrcMutation = { __typename?: 'Mutation', ingestPointOfContact: string };

export type PointOfContactArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  pointOfContact: PointOfContactInputSpec;
}>;


export type PointOfContactArtifactMutation = { __typename?: 'Mutation', ingestPointOfContact: string };

export type PointOfContactPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  pointOfContacts: Array<PointOfContactInputSpec> | PointOfContactInputSpec;
}>;


export type PointOfContactPkgsMutation = { __typename?: 'Mutation', ingestPointOfContacts: Array<string> };

export type PointOfContactSrcsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  pointOfContacts: Array<PointOfContactInputSpec> | PointOfContactInputSpec;
}>;


export type PointOfContactSrcsMutation = { __typename?: 'Mutation', ingestPointOfContacts: Array<string> };

export type PointOfContactArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  pointOfContacts: Array<PointOfContactInputSpec> | PointOfContactInputSpec;
}>;


export type PointOfContactArtifactsMutation = { __typename?: 'Mutation', ingestPointOfContacts: Array<string> };

export type HasSbomPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  hasSBOM: HasSbomInputSpec;
}>;


export type HasSbomPkgMutation = { __typename?: 'Mutation', ingestHasSBOM: string };

export type HasSbomArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  hasSBOM: HasSbomInputSpec;
}>;


export type HasSbomArtifactMutation = { __typename?: 'Mutation', ingestHasSBOM: string };

export type HasSbomPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  hasSBOMs: Array<HasSbomInputSpec> | HasSbomInputSpec;
}>;


export type HasSbomPkgsMutation = { __typename?: 'Mutation', ingestHasSBOMs: Array<string> };

export type HasSbomArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  hasSBOMs: Array<HasSbomInputSpec> | HasSbomInputSpec;
}>;


export type HasSbomArtifactsMutation = { __typename?: 'Mutation', ingestHasSBOMs: Array<string> };

export type SlsaForArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  materials: Array<ArtifactInputSpec> | ArtifactInputSpec;
  builder: BuilderInputSpec;
  slsa: SlsaInputSpec;
}>;


export type SlsaForArtifactMutation = { __typename?: 'Mutation', ingestSLSA: string };

export type SlsaForArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  materialsList: Array<Array<ArtifactInputSpec> | ArtifactInputSpec> | Array<ArtifactInputSpec> | ArtifactInputSpec;
  builders: Array<BuilderInputSpec> | BuilderInputSpec;
  slsaList: Array<SlsaInputSpec> | SlsaInputSpec;
}>;


export type SlsaForArtifactsMutation = { __typename?: 'Mutation', ingestSLSAs: Array<string> };

export type IngestHasSourceAtMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  source: SourceInputSpec;
  hasSourceAt: HasSourceAtInputSpec;
}>;


export type IngestHasSourceAtMutation = { __typename?: 'Mutation', ingestHasSourceAt: string };

export type IngestHasSourceAtsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  sources: Array<SourceInputSpec> | SourceInputSpec;
  hasSourceAts: Array<HasSourceAtInputSpec> | HasSourceAtInputSpec;
}>;


export type IngestHasSourceAtsMutation = { __typename?: 'Mutation', ingestHasSourceAts: Array<string> };

export type IngestHashEqualMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  otherArtifact: ArtifactInputSpec;
  hashEqual: HashEqualInputSpec;
}>;


export type IngestHashEqualMutation = { __typename?: 'Mutation', ingestHashEqual: string };

export type IngestHashEqualsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  otherArtifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  hashEquals: Array<HashEqualInputSpec> | HashEqualInputSpec;
}>;


export type IngestHashEqualsMutation = { __typename?: 'Mutation', ingestHashEquals: Array<string> };

export type IsDependencyMutationVariables = Exact<{
  pkg: PkgInputSpec;
  depPkg: PkgInputSpec;
  depPkgMatchType: MatchFlags;
  dependency: IsDependencyInputSpec;
}>;


export type IsDependencyMutation = { __typename?: 'Mutation', ingestDependency: string };

export type IsDependenciesMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  depPkgs: Array<PkgInputSpec> | PkgInputSpec;
  depPkgMatchType: MatchFlags;
  dependencies: Array<IsDependencyInputSpec> | IsDependencyInputSpec;
}>;


export type IsDependenciesMutation = { __typename?: 'Mutation', ingestDependencies: Array<string> };

export type IsOccurrencePkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  artifact: ArtifactInputSpec;
  occurrence: IsOccurrenceInputSpec;
}>;


export type IsOccurrencePkgMutation = { __typename?: 'Mutation', ingestOccurrence: string };

export type IsOccurrenceSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  artifact: ArtifactInputSpec;
  occurrence: IsOccurrenceInputSpec;
}>;


export type IsOccurrenceSrcMutation = { __typename?: 'Mutation', ingestOccurrence: string };

export type IsOccurrencesPkgMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  occurrences: Array<IsOccurrenceInputSpec> | IsOccurrenceInputSpec;
}>;


export type IsOccurrencesPkgMutation = { __typename?: 'Mutation', ingestOccurrences: Array<string> };

export type IsOccurrencesSrcMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  occurrences: Array<IsOccurrenceInputSpec> | IsOccurrenceInputSpec;
}>;


export type IsOccurrencesSrcMutation = { __typename?: 'Mutation', ingestOccurrences: Array<string> };

export type IngestLicenseMutationVariables = Exact<{
  license: LicenseInputSpec;
}>;


export type IngestLicenseMutation = { __typename?: 'Mutation', ingestLicense: string };

export type IngestLicensesMutationVariables = Exact<{
  licenses: Array<LicenseInputSpec> | LicenseInputSpec;
}>;


export type IngestLicensesMutation = { __typename?: 'Mutation', ingestLicenses: Array<string> };

export type LicensesQueryVariables = Exact<{
  filter: LicenseSpec;
}>;


export type LicensesQuery = { __typename?: 'Query', licenses: Array<(
    { __typename?: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
  )> };

export type HasMetadataPkgMutationVariables = Exact<{
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  hasMetadata: HasMetadataInputSpec;
}>;


export type HasMetadataPkgMutation = { __typename?: 'Mutation', ingestHasMetadata: string };

export type HasMetadataSrcMutationVariables = Exact<{
  source: SourceInputSpec;
  hasMetadata: HasMetadataInputSpec;
}>;


export type HasMetadataSrcMutation = { __typename?: 'Mutation', ingestHasMetadata: string };

export type HasMetadataArtifactMutationVariables = Exact<{
  artifact: ArtifactInputSpec;
  hasMetadata: HasMetadataInputSpec;
}>;


export type HasMetadataArtifactMutation = { __typename?: 'Mutation', ingestHasMetadata: string };

export type HasMetadataPkgsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  pkgMatchType: MatchFlags;
  hasMetadataList: Array<HasMetadataInputSpec> | HasMetadataInputSpec;
}>;


export type HasMetadataPkgsMutation = { __typename?: 'Mutation', ingestBulkHasMetadata: Array<string> };

export type HasMetadataSrcsMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
  hasMetadataList: Array<HasMetadataInputSpec> | HasMetadataInputSpec;
}>;


export type HasMetadataSrcsMutation = { __typename?: 'Mutation', ingestBulkHasMetadata: Array<string> };

export type HasMetadataArtifactsMutationVariables = Exact<{
  artifacts: Array<ArtifactInputSpec> | ArtifactInputSpec;
  hasMetadataList: Array<HasMetadataInputSpec> | HasMetadataInputSpec;
}>;


export type HasMetadataArtifactsMutation = { __typename?: 'Mutation', ingestBulkHasMetadata: Array<string> };

export type IngestPackageMutationVariables = Exact<{
  pkg: PkgInputSpec;
}>;


export type IngestPackageMutation = { __typename?: 'Mutation', ingestPackage: string };

export type IngestPackagesMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
}>;


export type IngestPackagesMutation = { __typename?: 'Mutation', ingestPackages: Array<string> };

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


export type PackageTypesQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', id: string, type: string }> };

export type PackageNamespacesQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageNamespacesQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string }> }> };

export type PackageNamesQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageNamesQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string }> }> }> };

export type PackageVersionsQueryVariables = Exact<{
  filter: PkgSpec;
}>;


export type PackageVersionsQuery = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }> };

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
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyLegal' }
    & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
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
    { __typename: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) | (
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
    { __typename: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
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
  ) | (
    { __typename: 'VulnEqual' }
    & { ' $fragmentRefs'?: { 'AllVulnEqualFragment': AllVulnEqualFragment } }
  ) | (
    { __typename: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  ) | (
    { __typename: 'VulnerabilityMetadata' }
    & { ' $fragmentRefs'?: { 'AllVulnMetadataTreeFragment': AllVulnMetadataTreeFragment } }
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
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyLegal' }
    & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
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
    { __typename: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) | (
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
    { __typename: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
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
  ) | (
    { __typename: 'VulnEqual' }
    & { ' $fragmentRefs'?: { 'AllVulnEqualFragment': AllVulnEqualFragment } }
  ) | (
    { __typename: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  ) | (
    { __typename: 'VulnerabilityMetadata' }
    & { ' $fragmentRefs'?: { 'AllVulnMetadataTreeFragment': AllVulnMetadataTreeFragment } }
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
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyLegal' }
    & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
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
    { __typename: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) | (
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
    { __typename: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
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
  ) | (
    { __typename: 'VulnEqual' }
    & { ' $fragmentRefs'?: { 'AllVulnEqualFragment': AllVulnEqualFragment } }
  ) | (
    { __typename: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  ) | (
    { __typename: 'VulnerabilityMetadata' }
    & { ' $fragmentRefs'?: { 'AllVulnMetadataTreeFragment': AllVulnMetadataTreeFragment } }
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
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  ) | (
    { __typename: 'CertifyLegal' }
    & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
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
    { __typename: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  ) | (
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
    { __typename: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
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
  ) | (
    { __typename: 'VulnEqual' }
    & { ' $fragmentRefs'?: { 'AllVulnEqualFragment': AllVulnEqualFragment } }
  ) | (
    { __typename: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  ) | (
    { __typename: 'VulnerabilityMetadata' }
    & { ' $fragmentRefs'?: { 'AllVulnMetadataTreeFragment': AllVulnMetadataTreeFragment } }
  )> };

export type IngestPkgEqualMutationVariables = Exact<{
  pkg: PkgInputSpec;
  otherPackage: PkgInputSpec;
  pkgEqual: PkgEqualInputSpec;
}>;


export type IngestPkgEqualMutation = { __typename?: 'Mutation', ingestPkgEqual: string };

export type IngestPkgEqualsMutationVariables = Exact<{
  pkgs: Array<PkgInputSpec> | PkgInputSpec;
  otherPackages: Array<PkgInputSpec> | PkgInputSpec;
  pkgEquals: Array<PkgEqualInputSpec> | PkgEqualInputSpec;
}>;


export type IngestPkgEqualsMutation = { __typename?: 'Mutation', ingestPkgEquals: Array<string> };

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


export type IngestSourceMutation = { __typename?: 'Mutation', ingestSource: string };

export type IngestSourcesMutationVariables = Exact<{
  sources: Array<SourceInputSpec> | SourceInputSpec;
}>;


export type IngestSourcesMutation = { __typename?: 'Mutation', ingestSources: Array<string> };

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

export type AllLicenseTreeFragment = { __typename?: 'License', id: string, name: string, inline?: string | null, listVersion?: string | null } & { ' $fragmentName'?: 'AllLicenseTreeFragment' };

export type AllVulnerabilityTreeFragment = { __typename?: 'Vulnerability', id: string, type: string, vulnerabilityIDs: Array<{ __typename?: 'VulnerabilityID', id: string, vulnerabilityID: string }> } & { ' $fragmentName'?: 'AllVulnerabilityTreeFragment' };

export type AllVulnMetadataTreeFragment = { __typename?: 'VulnerabilityMetadata', id: string, scoreType: VulnerabilityScoreType, scoreValue: number, timestamp: any, origin: string, collector: string, vulnerability: { __typename?: 'Vulnerability', id: string, type: string, vulnerabilityIDs: Array<{ __typename?: 'VulnerabilityID', id: string, vulnerabilityID: string }> } } & { ' $fragmentName'?: 'AllVulnMetadataTreeFragment' };

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
  ), dependencyPackage: (
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

export type AllCertifyLegalTreeFragment = { __typename?: 'CertifyLegal', id: string, declaredLicense: string, discoveredLicense: string, attribution: string, justification: string, timeScanned: any, origin: string, collector: string, subject: (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ), declaredLicenses: Array<(
    { __typename?: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
  )>, discoveredLicenses: Array<(
    { __typename?: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
  )> } & { ' $fragmentName'?: 'AllCertifyLegalTreeFragment' };

export type AllCertifyBadFragment = { __typename?: 'CertifyBad', id: string, justification: string, knownSince: any, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllCertifyBadFragment' };

export type AllCertifyGoodFragment = { __typename?: 'CertifyGood', id: string, justification: string, knownSince: any, origin: string, collector: string, subject: (
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

export type AllHasSbomTreeFragment = { __typename?: 'HasSBOM', id: string, uri: string, algorithm: string, digest: string, downloadLocation: string, origin: string, collector: string, knownSince: any, subject: (
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
    { __typename?: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  ), metadata: { __typename?: 'ScanMetadata', dbUri: string, dbVersion: string, scannerUri: string, scannerVersion: string, timeScanned: any, origin: string, collector: string } } & { ' $fragmentName'?: 'AllCertifyVulnFragment' };

export type AllPkgEqualFragment = { __typename?: 'PkgEqual', id: string, justification: string, origin: string, collector: string, packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> } & { ' $fragmentName'?: 'AllPkgEqualFragment' };

export type AllVulnEqualFragment = { __typename?: 'VulnEqual', id: string, justification: string, origin: string, collector: string, vulnerabilities: Array<(
    { __typename?: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  )> } & { ' $fragmentName'?: 'AllVulnEqualFragment' };

export type AllCertifyVexStatementFragment = { __typename?: 'CertifyVEXStatement', id: string, status: VexStatus, vexJustification: VexJustification, statement: string, statusNotes: string, knownSince: any, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), vulnerability: (
    { __typename?: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  ) } & { ' $fragmentName'?: 'AllCertifyVexStatementFragment' };

export type AllHasMetadataFragment = { __typename?: 'HasMetadata', id: string, key: string, value: string, timestamp: any, justification: string, origin: string, collector: string, subject: (
    { __typename: 'Artifact' }
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

export type IngestVulnEqualMutationVariables = Exact<{
  vulnerability: VulnerabilityInputSpec;
  otherVulnerability: VulnerabilityInputSpec;
  vulnEqual: VulnEqualInputSpec;
}>;


export type IngestVulnEqualMutation = { __typename?: 'Mutation', ingestVulnEqual: string };

export type IngestVulnEqualsMutationVariables = Exact<{
  vulnerabilities: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
  otherVulnerabilities: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
  vulnEquals: Array<VulnEqualInputSpec> | VulnEqualInputSpec;
}>;


export type IngestVulnEqualsMutation = { __typename?: 'Mutation', ingestVulnEquals: Array<string> };

export type VulnHasMetadataMutationVariables = Exact<{
  vulnerability: VulnerabilityInputSpec;
  vulnMetadata: VulnerabilityMetadataInputSpec;
}>;


export type VulnHasMetadataMutation = { __typename?: 'Mutation', ingestVulnerabilityMetadata: string };

export type BulkVulnHasMetadataMutationVariables = Exact<{
  vulnerabilities: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
  vulnerabilityMetadataList: Array<VulnerabilityMetadataInputSpec> | VulnerabilityMetadataInputSpec;
}>;


export type BulkVulnHasMetadataMutation = { __typename?: 'Mutation', ingestBulkVulnerabilityMetadata: Array<string> };

export type IngestVulnerabilityMutationVariables = Exact<{
  vuln: VulnerabilityInputSpec;
}>;


export type IngestVulnerabilityMutation = { __typename?: 'Mutation', ingestVulnerability: string };

export type IngestVulnerabilitiesMutationVariables = Exact<{
  vulns: Array<VulnerabilityInputSpec> | VulnerabilityInputSpec;
}>;


export type IngestVulnerabilitiesMutation = { __typename?: 'Mutation', ingestVulnerabilities: Array<string> };

export type VulnerabilitiesQueryVariables = Exact<{
  filter: VulnerabilitySpec;
}>;


export type VulnerabilitiesQuery = { __typename?: 'Query', vulnerabilities: Array<(
    { __typename?: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  )> };

export const AllBuilderTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<AllBuilderTreeFragment, unknown>;
export const AllVulnMetadataTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllVulnMetadataTreeFragment, unknown>;
export const AllSourceTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllSourceTreeFragment, unknown>;
export const AllCertifyScorecardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllCertifyScorecardFragment, unknown>;
export const AllPkgTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgTreeFragment, unknown>;
export const AllArtifactTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllArtifactTreeFragment, unknown>;
export const AllIsOccurrencesTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllIsOccurrencesTreeFragment, unknown>;
export const AllIsDependencyTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllIsDependencyTreeFragment, unknown>;
export const AllSlsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllSlsaTreeFragment, unknown>;
export const AllLicenseTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<AllLicenseTreeFragment, unknown>;
export const AllCertifyLegalTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<AllCertifyLegalTreeFragment, unknown>;
export const AllCertifyBadFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllCertifyBadFragment, unknown>;
export const AllCertifyGoodFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllCertifyGoodFragment, unknown>;
export const AllHashEqualTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllHashEqualTreeFragment, unknown>;
export const AllHasSbomTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllHasSbomTreeFragment, unknown>;
export const AllHasSourceAtFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllHasSourceAtFragment, unknown>;
export const AllVulnerabilityTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllVulnerabilityTreeFragment, unknown>;
export const AllCertifyVulnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllCertifyVulnFragment, unknown>;
export const AllPkgEqualFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgEqualFragment, unknown>;
export const AllVulnEqualFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllVulnEqualFragment, unknown>;
export const AllCertifyVexStatementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllCertifyVexStatementFragment, unknown>;
export const AllHasMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllHasMetadataFragment, unknown>;
export const AllPointOfContactFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllPointOfContactFragment, unknown>;
export const IngestArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}]}}]} as unknown as DocumentNode<IngestArtifactMutation, IngestArtifactMutationVariables>;
export const IngestArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}]}}]} as unknown as DocumentNode<IngestArtifactsMutation, IngestArtifactsMutationVariables>;
export const ArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Artifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactsQuery, ArtifactsQueryVariables>;
export const IngestBuilderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBuilder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builder"}}}]}]}}]} as unknown as DocumentNode<IngestBuilderMutation, IngestBuilderMutationVariables>;
export const IngestBuildersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBuilders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builders"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builders"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builders"}}}]}]}}]} as unknown as DocumentNode<IngestBuildersMutation, IngestBuildersMutationVariables>;
export const CertifyBadPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}]}]}}]} as unknown as DocumentNode<CertifyBadPkgMutation, CertifyBadPkgMutationVariables>;
export const CertifyBadSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}]}]}}]} as unknown as DocumentNode<CertifyBadSrcMutation, CertifyBadSrcMutationVariables>;
export const CertifyBadArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}]}]}}]} as unknown as DocumentNode<CertifyBadArtifactMutation, CertifyBadArtifactMutationVariables>;
export const CertifyBadPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}]}]}}]} as unknown as DocumentNode<CertifyBadPkgsMutation, CertifyBadPkgsMutationVariables>;
export const CertifyBadSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}]}]}}]} as unknown as DocumentNode<CertifyBadSrcsMutation, CertifyBadSrcsMutationVariables>;
export const CertifyBadArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyBadArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}]}]}}]} as unknown as DocumentNode<CertifyBadArtifactsMutation, CertifyBadArtifactsMutationVariables>;
export const CertifyBadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyBads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadsQuery, CertifyBadsQueryVariables>;
export const CertifyGoodPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}]}]}}]} as unknown as DocumentNode<CertifyGoodPkgMutation, CertifyGoodPkgMutationVariables>;
export const CertifyGoodSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}]}]}}]} as unknown as DocumentNode<CertifyGoodSrcMutation, CertifyGoodSrcMutationVariables>;
export const CertifyGoodArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}]}]}}]} as unknown as DocumentNode<CertifyGoodArtifactMutation, CertifyGoodArtifactMutationVariables>;
export const CertifyGoodPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}]}]}}]} as unknown as DocumentNode<CertifyGoodPkgsMutation, CertifyGoodPkgsMutationVariables>;
export const CertifyGoodSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}]}]}}]} as unknown as DocumentNode<CertifyGoodSrcsMutation, CertifyGoodSrcsMutationVariables>;
export const CertifyGoodArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}]}]}}]} as unknown as DocumentNode<CertifyGoodArtifactsMutation, CertifyGoodArtifactsMutationVariables>;
export const CertifyLegalPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyLegalPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legal"}}}]}]}}]} as unknown as DocumentNode<CertifyLegalPkgMutation, CertifyLegalPkgMutationVariables>;
export const CertifyLegalPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyLegalPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legals"}}}]}]}}]} as unknown as DocumentNode<CertifyLegalPkgsMutation, CertifyLegalPkgsMutationVariables>;
export const CertifyLegalSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyLegalSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"src"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"src"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legal"}}}]}]}}]} as unknown as DocumentNode<CertifyLegalSrcMutation, CertifyLegalSrcMutationVariables>;
export const CertifyLegalSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyLegalSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"srcs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"srcs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legals"}}}]}]}}]} as unknown as DocumentNode<CertifyLegalSrcsMutation, CertifyLegalSrcsMutationVariables>;
export const CertifyLegalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyLegals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyLegal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyLegalSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyLegalsQuery, CertifyLegalsQueryVariables>;
export const CertifyScorecardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyScorecard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestScorecard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}}}]}]}}]} as unknown as DocumentNode<CertifyScorecardMutation, CertifyScorecardMutationVariables>;
export const CertifyScorecardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyScorecards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecards"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestScorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecards"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecards"}}}]}]}}]} as unknown as DocumentNode<CertifyScorecardsMutation, CertifyScorecardsMutationVariables>;
export const CertifyVexPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyVexPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}]}]}}]} as unknown as DocumentNode<CertifyVexPkgMutation, CertifyVexPkgMutationVariables>;
export const CertifyVexArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyVexArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}]}]}}]} as unknown as DocumentNode<CertifyVexArtifactMutation, CertifyVexArtifactMutationVariables>;
export const CertifyVexPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyVexPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}}}]}]}}]} as unknown as DocumentNode<CertifyVexPkgsMutation, CertifyVexPkgsMutationVariables>;
export const CertifyVexArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyVexArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}}}]}]}}]} as unknown as DocumentNode<CertifyVexArtifactsMutation, CertifyVexArtifactsMutationVariables>;
export const CertifyVulnPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyVulnPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScanMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}}}]}]}}]} as unknown as DocumentNode<CertifyVulnPkgMutation, CertifyVulnPkgMutationVariables>;
export const CertifyVulnPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyVulnPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVulns"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScanMetadataInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyVulns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVulns"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVulns"}}}]}]}}]} as unknown as DocumentNode<CertifyVulnPkgsMutation, CertifyVulnPkgsMutationVariables>;
export const PointOfContactPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}]}]}}]} as unknown as DocumentNode<PointOfContactPkgMutation, PointOfContactPkgMutationVariables>;
export const PointOfContactSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}]}]}}]} as unknown as DocumentNode<PointOfContactSrcMutation, PointOfContactSrcMutationVariables>;
export const PointOfContactArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}]}]}}]} as unknown as DocumentNode<PointOfContactArtifactMutation, PointOfContactArtifactMutationVariables>;
export const PointOfContactPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}}}]}]}}]} as unknown as DocumentNode<PointOfContactPkgsMutation, PointOfContactPkgsMutationVariables>;
export const PointOfContactSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}}}]}]}}]} as unknown as DocumentNode<PointOfContactSrcsMutation, PointOfContactSrcsMutationVariables>;
export const PointOfContactArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PointOfContactArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}}}]}]}}]} as unknown as DocumentNode<PointOfContactArtifactsMutation, PointOfContactArtifactsMutationVariables>;
export const HasSbomPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}}}]}]}}]} as unknown as DocumentNode<HasSbomPkgMutation, HasSbomPkgMutationVariables>;
export const HasSbomArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}}}]}]}}]} as unknown as DocumentNode<HasSbomArtifactMutation, HasSbomArtifactMutationVariables>;
export const HasSbomPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}}}]}]}}]} as unknown as DocumentNode<HasSbomPkgsMutation, HasSbomPkgsMutationVariables>;
export const HasSbomArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasSBOMArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}}}]}]}}]} as unknown as DocumentNode<HasSbomArtifactsMutation, HasSbomArtifactsMutationVariables>;
export const SlsaForArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SLSAForArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materials"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLSAInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materials"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builder"}}},{"kind":"Argument","name":{"kind":"Name","value":"slsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slsa"}}}]}]}}]} as unknown as DocumentNode<SlsaForArtifactMutation, SlsaForArtifactMutationVariables>;
export const SlsaForArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SLSAForArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materialsList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builders"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slsaList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLSAInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSAs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtFromList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materialsList"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtByList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builders"}}},{"kind":"Argument","name":{"kind":"Name","value":"slsaList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slsaList"}}}]}]}}]} as unknown as DocumentNode<SlsaForArtifactsMutation, SlsaForArtifactsMutationVariables>;
export const IngestHasSourceAtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSourceAt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAt"}}}]}]}}]} as unknown as DocumentNode<IngestHasSourceAtMutation, IngestHasSourceAtMutationVariables>;
export const IngestHasSourceAtsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSourceAts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSourceAts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAts"}}}]}]}}]} as unknown as DocumentNode<IngestHasSourceAtsMutation, IngestHasSourceAtsMutationVariables>;
export const IngestHashEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHashEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherArtifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashEqual"}}}]}]}}]} as unknown as DocumentNode<IngestHashEqualMutation, IngestHashEqualMutationVariables>;
export const IngestHashEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHashEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHashEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherArtifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashEquals"}}}]}]}}]} as unknown as DocumentNode<IngestHashEqualsMutation, IngestHashEqualsMutationVariables>;
export const IsDependencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsDependency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dependency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencyInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"dependency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dependency"}}}]}]}}]} as unknown as DocumentNode<IsDependencyMutation, IsDependencyMutationVariables>;
export const IsDependenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsDependencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dependencies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencyInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestDependencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"dependencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dependencies"}}}]}]}}]} as unknown as DocumentNode<IsDependenciesMutation, IsDependenciesMutationVariables>;
export const IsOccurrencePkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrencePkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}}}]}]}}]} as unknown as DocumentNode<IsOccurrencePkgMutation, IsOccurrencePkgMutationVariables>;
export const IsOccurrenceSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrenceSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}}}]}]}}]} as unknown as DocumentNode<IsOccurrenceSrcMutation, IsOccurrenceSrcMutationVariables>;
export const IsOccurrencesPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrencesPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}}}]}]}}]} as unknown as DocumentNode<IsOccurrencesPkgMutation, IsOccurrencesPkgMutationVariables>;
export const IsOccurrencesSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsOccurrencesSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}}}]}]}}]} as unknown as DocumentNode<IsOccurrencesSrcMutation, IsOccurrencesSrcMutationVariables>;
export const IngestLicenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestLicense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"license"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestLicense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"license"},"value":{"kind":"Variable","name":{"kind":"Name","value":"license"}}}]}]}}]} as unknown as DocumentNode<IngestLicenseMutation, IngestLicenseMutationVariables>;
export const IngestLicensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestLicenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"licenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestLicenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"licenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"licenses"}}}]}]}}]} as unknown as DocumentNode<IngestLicensesMutation, IngestLicensesMutationVariables>;
export const LicensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Licenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"licenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"licenseSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<LicensesQuery, LicensesQueryVariables>;
export const HasMetadataPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}]}]}}]} as unknown as DocumentNode<HasMetadataPkgMutation, HasMetadataPkgMutationVariables>;
export const HasMetadataSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}]}]}}]} as unknown as DocumentNode<HasMetadataSrcMutation, HasMetadataSrcMutationVariables>;
export const HasMetadataArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}]}]}}]} as unknown as DocumentNode<HasMetadataArtifactMutation, HasMetadataArtifactMutationVariables>;
export const HasMetadataPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}}}]}]}}]} as unknown as DocumentNode<HasMetadataPkgsMutation, HasMetadataPkgsMutationVariables>;
export const HasMetadataSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}}}]}]}}]} as unknown as DocumentNode<HasMetadataSrcsMutation, HasMetadataSrcsMutationVariables>;
export const HasMetadataArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HasMetadataArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}}}]}]}}]} as unknown as DocumentNode<HasMetadataArtifactsMutation, HasMetadataArtifactsMutationVariables>;
export const IngestPackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}]}}]} as unknown as DocumentNode<IngestPackageMutation, IngestPackageMutationVariables>;
export const IngestPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}]}}]} as unknown as DocumentNode<IngestPackagesMutation, IngestPackagesMutationVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const PackageTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PackageTypesQuery, PackageTypesQueryVariables>;
export const PackageNamespacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageNamespaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}}]}}]}}]}}]} as unknown as DocumentNode<PackageNamespacesQuery, PackageNamespacesQueryVariables>;
export const PackageNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageNames"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackageNamesQuery, PackageNamesQueryVariables>;
export const PackageVersionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageVersions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackageVersionsQuery, PackageVersionsQueryVariables>;
export const PathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Path"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPathLength"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPathLength"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPathLength"}}},{"kind":"Argument","name":{"kind":"Name","value":"usingOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PathQuery, PathQueryVariables>;
export const NeighborsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Neighbors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"node"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neighbors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"node"}}},{"kind":"Argument","name":{"kind":"Name","value":"usingOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NeighborsQuery, NeighborsQueryVariables>;
export const NodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Node"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"node"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"node"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NodeQuery, NodeQueryVariables>;
export const NodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Nodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nodes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NodesQuery, NodesQueryVariables>;
export const IngestPkgEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPkgEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherPackage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgEqual"}}}]}]}}]} as unknown as DocumentNode<IngestPkgEqualMutation, IngestPkgEqualMutationVariables>;
export const IngestPkgEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPkgEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherPackages"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPkgEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherPackages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherPackages"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgEquals"}}}]}]}}]} as unknown as DocumentNode<IngestPkgEqualsMutation, IngestPkgEqualsMutationVariables>;
export const FindSoftwareDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSoftware"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSoftware"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<FindSoftwareQuery, FindSoftwareQueryVariables>;
export const IngestSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}]}}]} as unknown as DocumentNode<IngestSourceMutation, IngestSourceMutationVariables>;
export const IngestSourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}]}}]} as unknown as DocumentNode<IngestSourcesMutation, IngestSourcesMutationVariables>;
export const SourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SourcesQuery, SourcesQueryVariables>;
export const IngestVulnEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherVulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnEqual"}}}]}]}}]} as unknown as DocumentNode<IngestVulnEqualMutation, IngestVulnEqualMutationVariables>;
export const IngestVulnEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherVulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnEquals"}}}]}]}}]} as unknown as DocumentNode<IngestVulnEqualsMutation, IngestVulnEqualsMutationVariables>;
export const VulnHasMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VulnHasMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerabilityMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilityMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnMetadata"}}}]}]}}]} as unknown as DocumentNode<VulnHasMetadataMutation, VulnHasMetadataMutationVariables>;
export const BulkVulnHasMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkVulnHasMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilityMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkVulnerabilityMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilityMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilityMetadataList"}}}]}]}}]} as unknown as DocumentNode<BulkVulnHasMetadataMutation, BulkVulnHasMetadataMutationVariables>;
export const IngestVulnerabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnerability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vuln"}}}]}]}}]} as unknown as DocumentNode<IngestVulnerabilityMutation, IngestVulnerabilityMutationVariables>;
export const IngestVulnerabilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnerabilities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulns"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerabilities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulns"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulns"}}}]}]}}]} as unknown as DocumentNode<IngestVulnerabilitiesMutation, IngestVulnerabilitiesMutationVariables>;
export const VulnerabilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Vulnerabilities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilitySpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<VulnerabilitiesQuery, VulnerabilitiesQueryVariables>;