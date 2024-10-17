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
 * ArtifactConnection returns the paginated results for artifact.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the ArtifactEdge which contains the current cursor
 * and the artifact node itself
 */
export type ArtifactConnection = {
  __typename?: 'ArtifactConnection';
  edges: Array<ArtifactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * ArtifactEdge contains the cursor for the resulting node and
 * the artifact node itself.
 */
export type ArtifactEdge = {
  __typename?: 'ArtifactEdge';
  cursor: Scalars['ID'];
  node: Artifact;
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

/**
 * BuilderConnection returns the paginated results for builder.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the BuilderEdge which contains the current cursor
 * and the Builder node itself
 */
export type BuilderConnection = {
  __typename?: 'BuilderConnection';
  edges: Array<BuilderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * BuilderEdge contains the cursor for the resulting node and
 * the Builder node itself.
 */
export type BuilderEdge = {
  __typename?: 'BuilderEdge';
  cursor: Scalars['ID'];
  node: Builder;
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
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** The justification for the subject being certified bad */
  justification: Scalars['String'];
  /** Timestamp when the certification was created (in RFC 3339 format) */
  knownSince: Scalars['Time'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The package, source or artifact that is attested */
  subject: PackageSourceOrArtifact;
};

/**
 * CertifyBadConnection returns the paginated results for CertifyBad.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the CertifyBadEdge which contains the current cursor
 * and the CertifyBad node itself
 */
export type CertifyBadConnection = {
  __typename?: 'CertifyBadConnection';
  edges: Array<CertifyBadEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * CertifyBadEdge contains the cursor for the resulting node and
 * the CertifyBad node itself.
 */
export type CertifyBadEdge = {
  __typename?: 'CertifyBadEdge';
  cursor: Scalars['ID'];
  node: CertifyBad;
};

/**
 * CertifyBadInputSpec represents the mutation input to ingest a CertifyBad
 * evidence.
 */
export type CertifyBadInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** The justification for the subject being certified good */
  justification: Scalars['String'];
  /** Timestamp when the certification was created (in RFC 3339 format) */
  knownSince: Scalars['Time'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The package, source or artifact that is attested */
  subject: PackageSourceOrArtifact;
};

/**
 * CertifyGoodConnection returns the paginated results for CertifyGood.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the CertifyGoodEdge which contains the current cursor
 * and the CertifyGood node itself
 */
export type CertifyGoodConnection = {
  __typename?: 'CertifyGoodConnection';
  edges: Array<CertifyGoodEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * CertifyGoodEdge contains the cursor for the resulting node and
 * the CertifyGood node itself.
 */
export type CertifyGoodEdge = {
  __typename?: 'CertifyGoodEdge';
  cursor: Scalars['ID'];
  node: CertifyGood;
};

/** CertifyGoodInputSpec represents the mutation input to ingest a CertifyGood evidence. */
export type CertifyGoodInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
  /** The license expression as declared */
  declaredLicense: Scalars['String'];
  /** A list of license objects found in the declared license expression */
  declaredLicenses: Array<License>;
  /** The license expression as discovered by scan */
  discoveredLicense: Scalars['String'];
  /** A list of license objects found in the discovered license expression */
  discoveredLicenses: Array<License>;
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
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
 * CertifyLegalConnection returns the paginated results for CertifyLegal.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the CertifyLegalEdge which contains the current cursor
 * and the CertifyLegal node itself
 */
export type CertifyLegalConnection = {
  __typename?: 'CertifyLegalConnection';
  edges: Array<CertifyLegalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * CertifyLegalEdge contains the cursor for the resulting node and
 * the CertifyLegal node itself.
 */
export type CertifyLegalEdge = {
  __typename?: 'CertifyLegalEdge';
  cursor: Scalars['ID'];
  node: CertifyLegal;
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
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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

/**
 * CertifyScorecardConnection returns the paginated results for CertifyScorecard.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the CertifyScorecardEdge which contains the current cursor
 * and the CertifyScorecard node itself
 */
export type CertifyScorecardConnection = {
  __typename?: 'CertifyScorecardConnection';
  edges: Array<CertifyScorecardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * CertifyScorecardEdge contains the cursor for the resulting node and
 * the CertifyScorecard node itself.
 */
export type CertifyScorecardEdge = {
  __typename?: 'CertifyScorecardEdge';
  cursor: Scalars['ID'];
  node: CertifyScorecard;
};

/** CertifyScorecardSpec allows filtering the list of Scorecards to return. */
export type CertifyScorecardSpec = {
  aggregateScore?: InputMaybe<Scalars['Float']>;
  checks?: InputMaybe<Array<ScorecardCheckSpec>>;
  collector?: InputMaybe<Scalars['String']>;
  documentRef?: InputMaybe<Scalars['String']>;
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
 * CertifyVulnConnection returns the paginated results for CertifyVuln.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the CertifyVulnEdge which contains the current cursor
 * and the CertifyVuln node itself
 */
export type CertifyVulnConnection = {
  __typename?: 'CertifyVulnConnection';
  edges: Array<CertifyVulnEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * CertifyVulnEdge contains the cursor for the resulting node and
 * the CertifyVuln node itself.
 */
export type CertifyVulnEdge = {
  __typename?: 'CertifyVulnEdge';
  cursor: Scalars['ID'];
  node: CertifyVuln;
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
  documentRef?: InputMaybe<Scalars['String']>;
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
 * (pairs from Node to Node) are included. Edges are defined in both directions,
 * which means nodes can be traversed from either direction.
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
  HasSbomIncludedDependencies = 'HAS_SBOM_INCLUDED_DEPENDENCIES',
  HasSbomIncludedOccurrences = 'HAS_SBOM_INCLUDED_OCCURRENCES',
  HasSbomIncludedSoftware = 'HAS_SBOM_INCLUDED_SOFTWARE',
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
  PackageNamespacePackageName = 'PACKAGE_NAMESPACE_PACKAGE_NAME',
  PackageNamespacePackageType = 'PACKAGE_NAMESPACE_PACKAGE_TYPE',
  PackageNamePackageNamespace = 'PACKAGE_NAME_PACKAGE_NAMESPACE',
  PackageNamePackageVersion = 'PACKAGE_NAME_PACKAGE_VERSION',
  PackagePkgEqual = 'PACKAGE_PKG_EQUAL',
  PackagePointOfContact = 'PACKAGE_POINT_OF_CONTACT',
  PackageTypePackageNamespace = 'PACKAGE_TYPE_PACKAGE_NAMESPACE',
  PackageVersionPackageName = 'PACKAGE_VERSION_PACKAGE_NAME',
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
  SourceNamespaceSourceName = 'SOURCE_NAMESPACE_SOURCE_NAME',
  SourceNamespaceSourceType = 'SOURCE_NAMESPACE_SOURCE_TYPE',
  SourceNameSourceNamespace = 'SOURCE_NAME_SOURCE_NAMESPACE',
  SourcePointOfContact = 'SOURCE_POINT_OF_CONTACT',
  SourceTypeSourceNamespace = 'SOURCE_TYPE_SOURCE_NAMESPACE',
  VulnerabilityCertifyVexStatement = 'VULNERABILITY_CERTIFY_VEX_STATEMENT',
  VulnerabilityCertifyVuln = 'VULNERABILITY_CERTIFY_VULN',
  VulnerabilityIdVulnerabilityType = 'VULNERABILITY_ID_VULNERABILITY_TYPE',
  VulnerabilityTypeVulnerabilityId = 'VULNERABILITY_TYPE_VULNERABILITY_ID',
  VulnerabilityVulnEqual = 'VULNERABILITY_VULN_EQUAL',
  VulnerabilityVulnMetadata = 'VULNERABILITY_VULN_METADATA',
  VulnEqualVulnerability = 'VULN_EQUAL_VULNERABILITY',
  VulnMetadataVulnerability = 'VULN_METADATA_VULNERABILITY'
}

export enum FilterOperation {
  Contains = 'CONTAINS',
  Startswith = 'STARTSWITH'
}

/**
 * FindSoftwareConnection returns the paginated results for FindSoftware.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the SoftwareEdge which contains the current cursor
 * and the PackageSourceOrArtifact node itself
 */
export type FindSoftwareConnection = {
  __typename?: 'FindSoftwareConnection';
  edges: Array<SoftwareEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
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
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** The justification for the metadata */
  justification: Scalars['String'];
  /** Key in the key value pair */
  key: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The package, source or artifact that is attested */
  subject: PackageSourceOrArtifact;
  /** Timestamp when the certification was created (in RFC 3339 format) */
  timestamp: Scalars['Time'];
  /** Value in the key value pair */
  value: Scalars['String'];
};

/**
 * HasMetadataConnection returns the paginated results for HasMetadata.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the HasMetadataEdge which contains the current cursor
 * and the HasMetadata node itself
 */
export type HasMetadataConnection = {
  __typename?: 'HasMetadataConnection';
  edges: Array<HasMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * HasMetadataEdge contains the cursor for the resulting node and
 * the HasMetadata node itself.
 */
export type HasMetadataEdge = {
  __typename?: 'HasMetadataEdge';
  cursor: Scalars['ID'];
  node: HasMetadata;
};

/** HasMetadataInputSpec represents the mutation input to ingest a CertifyGood evidence. */
export type HasMetadataInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  /** Location from which the SBOM can be downloaded */
  downloadLocation: Scalars['String'];
  id: Scalars['ID'];
  /** Included dependencies */
  includedDependencies: Array<IsDependency>;
  /** Included occurrences */
  includedOccurrences: Array<IsOccurrence>;
  /** Included packages and artifacts */
  includedSoftware: Array<PackageOrArtifact>;
  /** Timestamp for SBOM creation */
  knownSince: Scalars['Time'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** SBOM subject */
  subject: PackageOrArtifact;
  /** Identifier for the SBOM document */
  uri: Scalars['String'];
};

/**
 * HasSBOMConnection returns the paginated results for HasSBOM.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the HasSBOMEdge which contains the current cursor
 * and the HasSBOM node itself
 */
export type HasSbomConnection = {
  __typename?: 'HasSBOMConnection';
  edges: Array<HasSbomEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * HasSBOMEdge contains the cursor for the resulting node and
 * the HasSBOMEdge node itself.
 */
export type HasSbomEdge = {
  __typename?: 'HasSBOMEdge';
  cursor: Scalars['ID'];
  node: HasSbom;
};

export type HasSbomIncludesInputSpec = {
  artifacts: Array<Scalars['ID']>;
  dependencies: Array<Scalars['ID']>;
  occurrences: Array<Scalars['ID']>;
  packages: Array<Scalars['ID']>;
};

/** HasSBOMInputSpec is similar to HasSBOM but for mutation input. */
export type HasSbomInputSpec = {
  algorithm: Scalars['String'];
  collector: Scalars['String'];
  digest: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
  downloadLocation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  includedDependencies?: InputMaybe<Array<IsDependencySpec>>;
  includedOccurrences?: InputMaybe<Array<IsOccurrenceSpec>>;
  includedSoftware?: InputMaybe<Array<PackageOrArtifactSpec>>;
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

/**
 * HasSLSAConnection returns the paginated results for HasSLSA.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the HasSLSAEdge which contains the current cursor
 * and the HasSLSA node itself
 */
export type HasSlsaConnection = {
  __typename?: 'HasSLSAConnection';
  edges: Array<HasSlsaEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * HasSLSAEdge contains the cursor for the resulting node and
 * the HasSLSA node itself.
 */
export type HasSlsaEdge = {
  __typename?: 'HasSLSAEdge';
  cursor: Scalars['ID'];
  node: HasSlsa;
};

/** HasSLSASpec allows filtering the list of HasSLSA to return. */
export type HasSlsaSpec = {
  buildType?: InputMaybe<Scalars['String']>;
  builtBy?: InputMaybe<BuilderSpec>;
  builtFrom?: InputMaybe<Array<ArtifactSpec>>;
  collector?: InputMaybe<Scalars['String']>;
  documentRef?: InputMaybe<Scalars['String']>;
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
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

/**
 * HasSourceAtConnection returns the paginated results for HasSourceAt.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the HasSourceAtEdge which contains the current cursor
 * and the HasSourceAt node itself
 */
export type HasSourceAtConnection = {
  __typename?: 'HasSourceAtConnection';
  edges: Array<HasSourceAtEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * HasSourceAtEdge contains the cursor for the resulting node and
 * the HasSourceAt node itself.
 */
export type HasSourceAtEdge = {
  __typename?: 'HasSourceAtEdge';
  cursor: Scalars['ID'];
  node: HasSourceAt;
};

/** HasSourceAtInputSpec is the same as HasSourceAt but for mutation input. */
export type HasSourceAtInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
};

/** HasSourceAtSpec allows filtering the list of HasSourceAt to return. */
export type HasSourceAtSpec = {
  collector?: InputMaybe<Scalars['String']>;
  documentRef?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  knownSince?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<PkgSpec>;
  source?: InputMaybe<SourceSpec>;
};

/** HashEqual is an attestation that two artifacts are identical. */
export type HashEqual = {
  __typename?: 'HashEqual';
  /** Two artifacts that are similar */
  artifacts: Array<Artifact>;
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the claim that the artifacts are similar */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
};

/**
 * HashEqualConnection returns the paginated results for HashEqual.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the HashEqualEdge which contains the current cursor
 * and the HashEqual node itself
 */
export type HashEqualConnection = {
  __typename?: 'HashEqualConnection';
  edges: Array<HashEqualEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * HashEqualEdge contains the cursor for the resulting node and
 * the HashEqual node itself.
 */
export type HashEqualEdge = {
  __typename?: 'HashEqualEdge';
  cursor: Scalars['ID'];
  node: HashEqual;
};

/** HashEqualInputSpec represents the input to certify that packages are similar. */
export type HashEqualInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
};

/**
 * IDorArtifactInput allows for specifying either the artifact ID or the ArtifactInputSpec.
 *
 * Either the ID or the ArtifactInputSpec must be specified. Both cannot be nil.
 *
 * If the ID is specified, the ArtifactInputSpec is not used.
 */
export type IDorArtifactInput = {
  artifactID?: InputMaybe<Scalars['ID']>;
  artifactInput?: InputMaybe<ArtifactInputSpec>;
};

/**
 * IDorBuilderInput allows for specifying either the builder ID or the BuilderInputSpec.
 *
 * Either the ID or the BuilderInputSpec must be specified. Both cannot be nil.
 *
 * If the ID is specified, the BuilderInputSpec is not used.
 */
export type IDorBuilderInput = {
  builderID?: InputMaybe<Scalars['ID']>;
  builderInput?: InputMaybe<BuilderInputSpec>;
};

/**
 * IDorLicenseInput allows for specifying either the license ID or the LicenseInputSpec.
 *
 * Either the ID or the LicenseInputSpec must be specified. Both cannot be nil.
 *
 * If the ID is specified, the LicenseInputSpec is not used.
 */
export type IDorLicenseInput = {
  licenseID?: InputMaybe<Scalars['ID']>;
  licenseInput?: InputMaybe<LicenseInputSpec>;
};

/**
 * IDorPkgInput allows for specifying either the package IDs or the PkgInputSpec.
 *
 * Either the IDs or the PkgInputSpec must be specified. Both cannot be nil.
 *
 * If the IDs are specified, the PkgInputSpec is not used.
 */
export type IDorPkgInput = {
  packageInput?: InputMaybe<PkgInputSpec>;
  packageNameID?: InputMaybe<Scalars['ID']>;
  packageNamespaceID?: InputMaybe<Scalars['ID']>;
  packageTypeID?: InputMaybe<Scalars['ID']>;
  packageVersionID?: InputMaybe<Scalars['ID']>;
};

/**
 * IDorSourceInput allows for specifying either the source IDs or the SourceInputSpec.
 *
 * Either the IDs or the SourceInputSpec must be specified. Both cannot be nil.
 *
 * If the IDs are specified, the SourceInputSpec is not used.
 */
export type IDorSourceInput = {
  sourceInput?: InputMaybe<SourceInputSpec>;
  sourceNameID?: InputMaybe<Scalars['ID']>;
  sourceNamespaceID?: InputMaybe<Scalars['ID']>;
  sourceTypeID?: InputMaybe<Scalars['ID']>;
};

/**
 * IDorVulnerabilityInput allows for specifying either the vulnerability IDs or the VulnerabilityInputSpec.
 *
 * Either the IDs or the VulnerabilityInputSpec must be specified. Both cannot be nil.
 *
 * If the IDs are specified, the VulnerabilityInputSpec is not used.
 */
export type IDorVulnerabilityInput = {
  vulnerabilityInput?: InputMaybe<VulnerabilityInputSpec>;
  vulnerabilityNodeID?: InputMaybe<Scalars['ID']>;
  vulnerabilityTypeID?: InputMaybe<Scalars['ID']>;
};

/** IsDependency is an attestation to record that a package depends on another.  */
export type IsDependency = {
  __typename?: 'IsDependency';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Package for the dependency; MUST be PackageVersion  */
  dependencyPackage: Package;
  /** Type of dependency */
  dependencyType: DependencyType;
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Package that has the dependency */
  package: Package;
};

/**
 * IsDependencyConnection returns the paginated results for IsDependency.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the IsDependencyEdge which contains the current cursor
 * and the IsDependency node itself
 */
export type IsDependencyConnection = {
  __typename?: 'IsDependencyConnection';
  edges: Array<IsDependencyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * IsDependencyEdge contains the cursor for the resulting node and
 * the IsDependency node itself.
 */
export type IsDependencyEdge = {
  __typename?: 'IsDependencyEdge';
  cursor: Scalars['ID'];
  node: IsDependency;
};

/** IsDependencyInputSpec is the input to record a new dependency. */
export type IsDependencyInputSpec = {
  collector: Scalars['String'];
  dependencyType: DependencyType;
  documentRef: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * IsDependencySpec allows filtering the list of dependencies to return.
 *
 * To obtain the list of dependency packages, caller must fill in the package
 * field.
 *
 * Dependency packages must be defined at PackageVersion.
 */
export type IsDependencySpec = {
  collector?: InputMaybe<Scalars['String']>;
  dependencyPackage?: InputMaybe<PkgSpec>;
  dependencyType?: InputMaybe<DependencyType>;
  documentRef?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<PkgSpec>;
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Package or source from which the artifact originates */
  subject: PackageOrSource;
};

/**
 * IsOccurrenceConnection returns the paginated results for IsOccurrence.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the IsOccurrenceEdge which contains the current cursor
 * and the IsOccurrence node itself
 */
export type IsOccurrenceConnection = {
  __typename?: 'IsOccurrenceConnection';
  edges: Array<IsOccurrenceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * IsOccurrenceEdge contains the cursor for the resulting node and
 * the IsOccurrence node itself.
 */
export type IsOccurrenceEdge = {
  __typename?: 'IsOccurrenceEdge';
  cursor: Scalars['ID'];
  node: IsOccurrence;
};

/** IsOccurrenceInputSpec represents the input to record an artifact's origin. */
export type IsOccurrenceInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
 * LicenseConnection returns the paginated results for License.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the LicenseEdge which contains the current cursor
 * and the License node itself
 */
export type LicenseConnection = {
  __typename?: 'LicenseConnection';
  edges: Array<LicenseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * LicenseEdge contains the cursor for the resulting node and
 * the License node itself.
 */
export type LicenseEdge = {
  __typename?: 'LicenseEdge';
  cursor: Scalars['ID'];
  node: License;
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
  /**
   * Delete node with ID and all associated relationships.
   * Deletion is only implemented for HasSBOM, HasSLSA and CertifyVuln
   * for the time being. Other may be added based on usecase but these
   * were chosen to ensure that users do not end up making breaking changes
   * to their database.
   */
  delete: Scalars['Boolean'];
  /** Ingests a new artifact and returns it. */
  ingestArtifact: Scalars['ID'];
  /** Bulk ingests new artifacts and returns a list of them. The returned array of IDs must be in the same order as the inputs. */
  ingestArtifacts: Array<Scalars['ID']>;
  /** Ingests a new builder and returns it. */
  ingestBuilder: Scalars['ID'];
  /** Bulk ingests new builders and returns a list of them. The returned array of IDs must be in the same order as the inputs. */
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
  /** Bulk adds a dependency between two packages. The returned array of IDs cannot be an empty string as its used by hasSBOM. */
  ingestDependencies: Array<Scalars['ID']>;
  /** Adds a dependency between two packages. The returned ID cannot be empty string as its used by hasSBOM. */
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
  /** Bulk ingests new licenses and returns a list of them. The returned array of IDs must be in the same order as the inputs. */
  ingestLicenses: Array<Scalars['ID']>;
  /** Ingest that an artifact is produced from a package or source. The returned ID cannot be empty string as its used by hasSBOM. */
  ingestOccurrence: Scalars['ID'];
  /** Bulk ingest that an artifact is produced from a package or source. The returned array of IDs cannot be an empty string as its used by hasSBOM */
  ingestOccurrences: Array<Scalars['ID']>;
  /** Ingests a new package and returns a corresponding package hierarchy containing only the IDs. */
  ingestPackage: PackageIDs;
  /** Bulk ingests packages and returns the list of corresponding package hierarchies containing only the IDs. The returned array of IDs must be in the same order as the inputs. */
  ingestPackages: Array<PackageIDs>;
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
  /** Ingests a new source and returns the corresponding source trie path. */
  ingestSource: SourceIDs;
  /** Bulk ingests sources and returns the list of corresponding source trie path. The returned array of IDs must be in the same order as the inputs. */
  ingestSources: Array<SourceIDs>;
  /** Adds a VEX certification for a package. The returned ID can be empty string. */
  ingestVEXStatement: Scalars['ID'];
  /** Bulk add VEX certifications for a package and vulnerability. The returned array of IDs can be a an array of empty string. */
  ingestVEXStatements: Array<Scalars['ID']>;
  /** Ingest a mapping between vulnerabilities. The returned ID can be empty string. */
  ingestVulnEqual: Scalars['ID'];
  /** Bulk ingest mapping between vulnerabilities. The returned array of IDs can be a an array of empty string. */
  ingestVulnEquals: Array<Scalars['ID']>;
  /** Bulk ingests vulnerabilities and returns the list of corresponding vulnerability trie path. The returned array of IDs must be in the same order as the inputs */
  ingestVulnerabilities: Array<VulnerabilityIDs>;
  /** Ingests a new vulnerability and returns the corresponding vulnerability trie path. */
  ingestVulnerability: VulnerabilityIDs;
  /** Adds metadata about a vulnerability. The returned ID can be empty string. */
  ingestVulnerabilityMetadata: Scalars['ID'];
};


export type MutationDeleteArgs = {
  node: Scalars['ID'];
};


export type MutationIngestArtifactArgs = {
  artifact?: InputMaybe<IDorArtifactInput>;
};


export type MutationIngestArtifactsArgs = {
  artifacts: Array<IDorArtifactInput>;
};


export type MutationIngestBuilderArgs = {
  builder?: InputMaybe<IDorBuilderInput>;
};


export type MutationIngestBuildersArgs = {
  builders: Array<IDorBuilderInput>;
};


export type MutationIngestBulkHasMetadataArgs = {
  hasMetadataList: Array<HasMetadataInputSpec>;
  pkgMatchType: MatchFlags;
  subjects: PackageSourceOrArtifactInputs;
};


export type MutationIngestBulkVulnerabilityMetadataArgs = {
  vulnerabilities: Array<IDorVulnerabilityInput>;
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
  declaredLicenses: Array<IDorLicenseInput>;
  discoveredLicenses: Array<IDorLicenseInput>;
  subject: PackageOrSourceInput;
};


export type MutationIngestCertifyLegalsArgs = {
  certifyLegals: Array<CertifyLegalInputSpec>;
  declaredLicensesList: Array<Array<IDorLicenseInput>>;
  discoveredLicensesList: Array<Array<IDorLicenseInput>>;
  subjects: PackageOrSourceInputs;
};


export type MutationIngestCertifyVulnArgs = {
  certifyVuln: ScanMetadataInput;
  pkg: IDorPkgInput;
  vulnerability: IDorVulnerabilityInput;
};


export type MutationIngestCertifyVulnsArgs = {
  certifyVulns: Array<ScanMetadataInput>;
  pkgs: Array<IDorPkgInput>;
  vulnerabilities: Array<IDorVulnerabilityInput>;
};


export type MutationIngestDependenciesArgs = {
  depPkgs: Array<IDorPkgInput>;
  dependencies: Array<IsDependencyInputSpec>;
  pkgs: Array<IDorPkgInput>;
};


export type MutationIngestDependencyArgs = {
  depPkg: IDorPkgInput;
  dependency: IsDependencyInputSpec;
  pkg: IDorPkgInput;
};


export type MutationIngestHasMetadataArgs = {
  hasMetadata: HasMetadataInputSpec;
  pkgMatchType: MatchFlags;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestHasSbomArgs = {
  hasSBOM: HasSbomInputSpec;
  includes: HasSbomIncludesInputSpec;
  subject: PackageOrArtifactInput;
};


export type MutationIngestHasSboMsArgs = {
  hasSBOMs: Array<HasSbomInputSpec>;
  includes: Array<HasSbomIncludesInputSpec>;
  subjects: PackageOrArtifactInputs;
};


export type MutationIngestHasSourceAtArgs = {
  hasSourceAt: HasSourceAtInputSpec;
  pkg: IDorPkgInput;
  pkgMatchType: MatchFlags;
  source: IDorSourceInput;
};


export type MutationIngestHasSourceAtsArgs = {
  hasSourceAts: Array<HasSourceAtInputSpec>;
  pkgMatchType: MatchFlags;
  pkgs: Array<IDorPkgInput>;
  sources: Array<IDorSourceInput>;
};


export type MutationIngestHashEqualArgs = {
  artifact: IDorArtifactInput;
  hashEqual: HashEqualInputSpec;
  otherArtifact: IDorArtifactInput;
};


export type MutationIngestHashEqualsArgs = {
  artifacts: Array<IDorArtifactInput>;
  hashEquals: Array<HashEqualInputSpec>;
  otherArtifacts: Array<IDorArtifactInput>;
};


export type MutationIngestLicenseArgs = {
  license?: InputMaybe<IDorLicenseInput>;
};


export type MutationIngestLicensesArgs = {
  licenses: Array<IDorLicenseInput>;
};


export type MutationIngestOccurrenceArgs = {
  artifact: IDorArtifactInput;
  occurrence: IsOccurrenceInputSpec;
  subject: PackageOrSourceInput;
};


export type MutationIngestOccurrencesArgs = {
  artifacts: Array<IDorArtifactInput>;
  occurrences: Array<IsOccurrenceInputSpec>;
  subjects: PackageOrSourceInputs;
};


export type MutationIngestPackageArgs = {
  pkg: IDorPkgInput;
};


export type MutationIngestPackagesArgs = {
  pkgs: Array<IDorPkgInput>;
};


export type MutationIngestPkgEqualArgs = {
  otherPackage: IDorPkgInput;
  pkg: IDorPkgInput;
  pkgEqual: PkgEqualInputSpec;
};


export type MutationIngestPkgEqualsArgs = {
  otherPackages: Array<IDorPkgInput>;
  pkgEquals: Array<PkgEqualInputSpec>;
  pkgs: Array<IDorPkgInput>;
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
  builtBy: IDorBuilderInput;
  builtFrom: Array<IDorArtifactInput>;
  slsa: SlsaInputSpec;
  subject: IDorArtifactInput;
};


export type MutationIngestSlsAsArgs = {
  builtByList: Array<IDorBuilderInput>;
  builtFromList: Array<Array<IDorArtifactInput>>;
  slsaList: Array<SlsaInputSpec>;
  subjects: Array<IDorArtifactInput>;
};


export type MutationIngestScorecardArgs = {
  scorecard: ScorecardInputSpec;
  source: IDorSourceInput;
};


export type MutationIngestScorecardsArgs = {
  scorecards: Array<ScorecardInputSpec>;
  sources: Array<IDorSourceInput>;
};


export type MutationIngestSourceArgs = {
  source: IDorSourceInput;
};


export type MutationIngestSourcesArgs = {
  sources: Array<IDorSourceInput>;
};


export type MutationIngestVexStatementArgs = {
  subject: PackageOrArtifactInput;
  vexStatement: VexStatementInputSpec;
  vulnerability: IDorVulnerabilityInput;
};


export type MutationIngestVexStatementsArgs = {
  subjects: PackageOrArtifactInputs;
  vexStatements: Array<VexStatementInputSpec>;
  vulnerabilities: Array<IDorVulnerabilityInput>;
};


export type MutationIngestVulnEqualArgs = {
  otherVulnerability: IDorVulnerabilityInput;
  vulnEqual: VulnEqualInputSpec;
  vulnerability: IDorVulnerabilityInput;
};


export type MutationIngestVulnEqualsArgs = {
  otherVulnerabilities: Array<IDorVulnerabilityInput>;
  vulnEquals: Array<VulnEqualInputSpec>;
  vulnerabilities: Array<IDorVulnerabilityInput>;
};


export type MutationIngestVulnerabilitiesArgs = {
  vulns: Array<IDorVulnerabilityInput>;
};


export type MutationIngestVulnerabilityArgs = {
  vuln: IDorVulnerabilityInput;
};


export type MutationIngestVulnerabilityMetadataArgs = {
  vulnerability: IDorVulnerabilityInput;
  vulnerabilityMetadata: VulnerabilityMetadataInputSpec;
};

/**
 * NeighborConnection returns the paginated results for Neighbor.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the NeighborEdge which contains the current cursor
 * and the node itself
 */
export type NeighborConnection = {
  __typename?: 'NeighborConnection';
  edges: Array<NeighborEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * NeighborEdge contains the cursor for the resulting node and
 * the node itself.
 */
export type NeighborEdge = {
  __typename?: 'NeighborEdge';
  cursor: Scalars['ID'];
  node: Node;
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
 * PackageConnection returns the paginated results for Package.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the PackageEdge which contains the current cursor
 * and the Package node itself
 */
export type PackageConnection = {
  __typename?: 'PackageConnection';
  edges: Array<PackageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * PackageEdge contains the cursor for the resulting node and
 * the Package node itself.
 */
export type PackageEdge = {
  __typename?: 'PackageEdge';
  cursor: Scalars['ID'];
  node: Package;
};

/** The IDs of the ingested package */
export type PackageIDs = {
  __typename?: 'PackageIDs';
  packageNameID: Scalars['ID'];
  packageNamespaceID: Scalars['ID'];
  packageTypeID: Scalars['ID'];
  packageVersionID: Scalars['ID'];
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
  artifact?: InputMaybe<IDorArtifactInput>;
  package?: InputMaybe<IDorPkgInput>;
};

/**
 * PackageOrArtifactInputs allows using packages and artifacts as input for batch mutations.
 * Exactly one list must be specified.
 */
export type PackageOrArtifactInputs = {
  artifacts?: InputMaybe<Array<IDorArtifactInput>>;
  packages?: InputMaybe<Array<IDorPkgInput>>;
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
  package?: InputMaybe<IDorPkgInput>;
  source?: InputMaybe<IDorSourceInput>;
};

/**
 * PackageOrSourceInputs allows using packages and sources as input for batch mutations.
 * Exactly one list must be specified.
 */
export type PackageOrSourceInputs = {
  packages?: InputMaybe<Array<IDorPkgInput>>;
  sources?: InputMaybe<Array<IDorSourceInput>>;
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
  artifact?: InputMaybe<IDorArtifactInput>;
  package?: InputMaybe<IDorPkgInput>;
  source?: InputMaybe<IDorSourceInput>;
};

/**
 * PackageSourceOrArtifactInputs allows using PackageSourceOrArtifact union as
 * input type to be used in bulk mutations.
 *
 * Exactly one list must be specified.
 */
export type PackageSourceOrArtifactInputs = {
  artifacts?: InputMaybe<Array<IDorArtifactInput>>;
  packages?: InputMaybe<Array<IDorPkgInput>>;
  sources?: InputMaybe<Array<IDorSourceInput>>;
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
  purl: Scalars['String'];
  qualifiers: Array<PackageQualifier>;
  subpath: Scalars['String'];
  version: Scalars['String'];
};

/**
 * PageInfo serves the client information about the paginated query results.
 *
 * hasNextPage is true when there are results to be returned.
 *
 * hasPreviousPage is true when there is a previous page to return to.
 *
 * startCursor is the ID where the query started from.
 *
 * endCursor is where the query ended.
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['ID']>;
};

/** PkgEqual is an attestation that two packages are similar. */
export type PkgEqual = {
  __typename?: 'PkgEqual';
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the claim that the packages are similar */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Two packages that are similar */
  packages: Array<Package>;
};

/**
 * PkgEqualConnection returns the paginated results for PkgEqual.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the PkgEqualEdge which contains the current cursor
 * and the PkgEqual node itself
 */
export type PkgEqualConnection = {
  __typename?: 'PkgEqualConnection';
  edges: Array<PkgEqualEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * PkgEqualEdge contains the cursor for the resulting node and
 * the PkgEqual node itself.
 */
export type PkgEqualEdge = {
  __typename?: 'PkgEqualEdge';
  cursor: Scalars['ID'];
  node: PkgEqual;
};

/** PkgEqualInputSpec represents the input to certify that packages are similar. */
export type PkgEqualInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
 * The id field can be used to match on a specific node in the trie to match packageTypeID,
 * packageNamespaceID, packageNameID, or packageVersionID.
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
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  /** Email for the POC */
  email: Scalars['String'];
  id: Scalars['ID'];
  /** Generic info for the POC */
  info: Scalars['String'];
  /** The justification for the POC attestation */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Timestamp when the certification for POC was created (in RFC 3339 format) */
  since: Scalars['Time'];
  /** The package, source or artifact that is attested */
  subject: PackageSourceOrArtifact;
};

/**
 * PointOfContactConnection returns the paginated results for PointOfContact.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the PointOfContactEdge which contains the current cursor
 * and the PointOfContact node itself
 */
export type PointOfContactConnection = {
  __typename?: 'PointOfContactConnection';
  edges: Array<PointOfContactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * PointOfContactEdge contains the cursor for the resulting node and
 * the PointOfContact node itself.
 */
export type PointOfContactEdge = {
  __typename?: 'PointOfContactEdge';
  cursor: Scalars['ID'];
  node: PointOfContact;
};

/** PointOfContactInputSpec represents the mutation input to ingest a PointOfContact evidence. */
export type PointOfContactInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
  /** Returns a paginated results via CertifyBadConnection */
  CertifyBadList?: Maybe<CertifyBadConnection>;
  /** Returns all CertifyGood attestations matching a filter. */
  CertifyGood: Array<CertifyGood>;
  /** Returns a paginated results via CertifyGoodConnection */
  CertifyGoodList?: Maybe<CertifyGoodConnection>;
  /** Returns all legal certifications matching the input filter. */
  CertifyLegal: Array<CertifyLegal>;
  /** Returns a paginated results via CertifyLegalConnection */
  CertifyLegalList?: Maybe<CertifyLegalConnection>;
  /** Returns all VEX certifications matching the input filter. */
  CertifyVEXStatement: Array<CertifyVexStatement>;
  /** Returns a paginated results via CertifyVexConnection */
  CertifyVEXStatementList?: Maybe<VexConnection>;
  /** Returns all vulnerability certifications matching the input filter. */
  CertifyVuln: Array<CertifyVuln>;
  /** Returns a paginated results via CertifyVulnConnection */
  CertifyVulnList?: Maybe<CertifyVulnConnection>;
  /** Returns all HasMetdata attestations matching a filter. */
  HasMetadata: Array<HasMetadata>;
  /** Returns a paginated results via HasMetadataConnection */
  HasMetadataList?: Maybe<HasMetadataConnection>;
  /** Returns all SBOM certifications. */
  HasSBOM: Array<HasSbom>;
  /** Returns a paginated results via HasSBOMConnection */
  HasSBOMList?: Maybe<HasSbomConnection>;
  /** Returns all SLSA attestations matching the filter. */
  HasSLSA: Array<HasSlsa>;
  /** Returns a paginated results via HasSLSAConnection */
  HasSLSAList?: Maybe<HasSlsaConnection>;
  /** Returns all source mappings that match the filter. */
  HasSourceAt: Array<HasSourceAt>;
  /** Returns a paginated results via HasSourceAtConnection */
  HasSourceAtList?: Maybe<HasSourceAtConnection>;
  /** Returns all artifact equality statements matching a filter. */
  HashEqual: Array<HashEqual>;
  /** Returns a paginated results via HashEqualConnection */
  HashEqualList?: Maybe<HashEqualConnection>;
  /** Returns all package dependencies that match the filter. */
  IsDependency: Array<IsDependency>;
  /** Returns a paginated results via IsDependencyConnection */
  IsDependencyList?: Maybe<IsDependencyConnection>;
  /** Returns all artifacts-source/package mappings that match a filter. */
  IsOccurrence: Array<IsOccurrence>;
  /** Returns a paginated results via IsOccurrenceConnection */
  IsOccurrenceList?: Maybe<IsOccurrenceConnection>;
  /** Returns all package equality statements matching a filter. */
  PkgEqual: Array<PkgEqual>;
  /** Returns a paginated results via PkgEqualConnection */
  PkgEqualList?: Maybe<PkgEqualConnection>;
  /** Returns all PointOfContact attestations matching a filter. */
  PointOfContact: Array<PointOfContact>;
  /** Returns a paginated results via PointOfContactConnection */
  PointOfContactList?: Maybe<PointOfContactConnection>;
  /** Returns all artifacts matching a filter. */
  artifacts: Array<Artifact>;
  /** Returns a paginated results via ArtifactConnection */
  artifactsList?: Maybe<ArtifactConnection>;
  /** Returns all builders matching a filter. */
  builders: Array<Builder>;
  /** Returns a paginated results via BuilderConnection */
  buildersList?: Maybe<BuilderConnection>;
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
  /** Returns a paginated results via CertifyBadConnection */
  findSoftwareList?: Maybe<FindSoftwareConnection>;
  /** Returns a paginated results via LicenseConnection */
  licenseList?: Maybe<LicenseConnection>;
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
  /** Returns a paginated results via NeighborConnection */
  neighborsList?: Maybe<NeighborConnection>;
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
  /** Returns a paginated results via PackageConnection */
  packagesList?: Maybe<PackageConnection>;
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
  /**
   * queryPackagesListForScan returns a paginated results via PackageConnection
   * for all packages that need to be re-scanned (based on the last scan in hours)
   * or have never been scanned.
   *
   * queryType is used to specify if the last time scanned is checked for either
   * certifyVuln or certifyLegal.
   */
  queryPackagesListForScan?: Maybe<PackageConnection>;
  /** Returns all Scorecard certifications matching the filter. */
  scorecards: Array<CertifyScorecard>;
  /** Returns a paginated results via CertifyScorecardConnection */
  scorecardsList?: Maybe<CertifyScorecardConnection>;
  /** Returns all sources matching a filter. */
  sources: Array<Source>;
  /** Returns a paginated results via SourceConnection */
  sourcesList?: Maybe<SourceConnection>;
  /** Returns all equal vulnerability mappings that match a filter. */
  vulnEqual: Array<VulnEqual>;
  /** Returns a paginated results via VulnEqualConnection */
  vulnEqualList?: Maybe<VulnEqualConnection>;
  /** Returns all vulnerabilities matching a filter. */
  vulnerabilities: Array<Vulnerability>;
  /** Returns a paginated results via VulnerabilityConnection */
  vulnerabilityList?: Maybe<VulnerabilityConnection>;
  /** Returns all vulnerabilityMetadata attestations matching a filter. */
  vulnerabilityMetadata: Array<VulnerabilityMetadata>;
  /** Returns a paginated results via VulnerabilityMetadataConnection */
  vulnerabilityMetadataList?: Maybe<VulnerabilityMetadataConnection>;
};


export type QueryCertifyBadArgs = {
  certifyBadSpec: CertifyBadSpec;
};


export type QueryCertifyBadListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  certifyBadSpec: CertifyBadSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryCertifyGoodArgs = {
  certifyGoodSpec: CertifyGoodSpec;
};


export type QueryCertifyGoodListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  certifyGoodSpec: CertifyGoodSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryCertifyLegalArgs = {
  certifyLegalSpec: CertifyLegalSpec;
};


export type QueryCertifyLegalListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  certifyLegalSpec: CertifyLegalSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryCertifyVexStatementArgs = {
  certifyVEXStatementSpec: CertifyVexStatementSpec;
};


export type QueryCertifyVexStatementListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  certifyVEXStatementSpec: CertifyVexStatementSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryCertifyVulnArgs = {
  certifyVulnSpec: CertifyVulnSpec;
};


export type QueryCertifyVulnListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  certifyVulnSpec: CertifyVulnSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryHasMetadataArgs = {
  hasMetadataSpec: HasMetadataSpec;
};


export type QueryHasMetadataListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  hasMetadataSpec: HasMetadataSpec;
};


export type QueryHasSbomArgs = {
  hasSBOMSpec: HasSbomSpec;
};


export type QueryHasSbomListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  hasSBOMSpec: HasSbomSpec;
};


export type QueryHasSlsaArgs = {
  hasSLSASpec: HasSlsaSpec;
};


export type QueryHasSlsaListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  hasSLSASpec: HasSlsaSpec;
};


export type QueryHasSourceAtArgs = {
  hasSourceAtSpec: HasSourceAtSpec;
};


export type QueryHasSourceAtListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  hasSourceAtSpec: HasSourceAtSpec;
};


export type QueryHashEqualArgs = {
  hashEqualSpec: HashEqualSpec;
};


export type QueryHashEqualListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  hashEqualSpec: HashEqualSpec;
};


export type QueryIsDependencyArgs = {
  isDependencySpec: IsDependencySpec;
};


export type QueryIsDependencyListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  isDependencySpec: IsDependencySpec;
};


export type QueryIsOccurrenceArgs = {
  isOccurrenceSpec: IsOccurrenceSpec;
};


export type QueryIsOccurrenceListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  isOccurrenceSpec: IsOccurrenceSpec;
};


export type QueryPkgEqualArgs = {
  pkgEqualSpec: PkgEqualSpec;
};


export type QueryPkgEqualListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  pkgEqualSpec: PkgEqualSpec;
};


export type QueryPointOfContactArgs = {
  pointOfContactSpec: PointOfContactSpec;
};


export type QueryPointOfContactListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  pointOfContactSpec: PointOfContactSpec;
};


export type QueryArtifactsArgs = {
  artifactSpec: ArtifactSpec;
};


export type QueryArtifactsListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  artifactSpec: ArtifactSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryBuildersArgs = {
  builderSpec: BuilderSpec;
};


export type QueryBuildersListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  builderSpec: BuilderSpec;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryFindSoftwareArgs = {
  searchText: Scalars['String'];
};


export type QueryFindSoftwareListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  searchText: Scalars['String'];
};


export type QueryLicenseListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  licenseSpec: LicenseSpec;
};


export type QueryLicensesArgs = {
  licenseSpec: LicenseSpec;
};


export type QueryNeighborsArgs = {
  node: Scalars['ID'];
  usingOnly: Array<Edge>;
};


export type QueryNeighborsListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
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


export type QueryPackagesListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  pkgSpec: PkgSpec;
};


export type QueryPathArgs = {
  maxPathLength: Scalars['Int'];
  subject: Scalars['ID'];
  target: Scalars['ID'];
  usingOnly: Array<Edge>;
};


export type QueryQueryPackagesListForScanArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  lastScan?: InputMaybe<Scalars['Int']>;
  pkgSpec: PkgSpec;
  queryType: QueryType;
};


export type QueryScorecardsArgs = {
  scorecardSpec: CertifyScorecardSpec;
};


export type QueryScorecardsListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  scorecardSpec: CertifyScorecardSpec;
};


export type QuerySourcesArgs = {
  sourceSpec: SourceSpec;
};


export type QuerySourcesListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  sourceSpec: SourceSpec;
};


export type QueryVulnEqualArgs = {
  vulnEqualSpec: VulnEqualSpec;
};


export type QueryVulnEqualListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  vulnEqualSpec: VulnEqualSpec;
};


export type QueryVulnerabilitiesArgs = {
  vulnSpec: VulnerabilitySpec;
};


export type QueryVulnerabilityListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  vulnSpec: VulnerabilitySpec;
};


export type QueryVulnerabilityMetadataArgs = {
  vulnerabilityMetadataSpec: VulnerabilityMetadataSpec;
};


export type QueryVulnerabilityMetadataListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  vulnerabilityMetadataSpec: VulnerabilityMetadataSpec;
};

/**
 * QueryType is used in conjunction with queryPackagesListForScan to
 * specify if the last time scanned is checked for either certifyVuln
 * or certifyLegal.
 */
export enum QueryType {
  /** indirect dependency */
  License = 'LICENSE',
  /** direct dependency */
  Vulnerability = 'VULNERABILITY'
}

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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
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
  documentRef: Scalars['String'];
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
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
  documentRef: Scalars['String'];
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
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
  documentRef: Scalars['String'];
  origin: Scalars['String'];
  scorecardCommit: Scalars['String'];
  scorecardVersion: Scalars['String'];
  timeScanned: Scalars['Time'];
};

/**
 * SoftwareEdge contains the cursor for the resulting node and
 * the PackageSourceOrArtifact node itself.
 */
export type SoftwareEdge = {
  __typename?: 'SoftwareEdge';
  cursor: Scalars['ID'];
  node: PackageSourceOrArtifact;
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
 * SourceConnection returns the paginated results for Source.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the SourceEdge which contains the current cursor
 * and the Source node itself
 */
export type SourceConnection = {
  __typename?: 'SourceConnection';
  edges: Array<SourceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * SourceEdge contains the cursor for the resulting node and
 * the Source node itself.
 */
export type SourceEdge = {
  __typename?: 'SourceEdge';
  cursor: Scalars['ID'];
  node: Source;
};

/** The IDs of the ingested source */
export type SourceIDs = {
  __typename?: 'SourceIDs';
  sourceNameID: Scalars['ID'];
  sourceNamespaceID: Scalars['ID'];
  sourceTypeID: Scalars['ID'];
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

/**
 * VEXConnection returns the paginated results for CertifyVEXStatement.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the VEXEdge which contains the current cursor
 * and the CertifyVEXStatement node itself
 */
export type VexConnection = {
  __typename?: 'VEXConnection';
  edges: Array<VexEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * VEXEdge contains the cursor for the resulting node and
 * the CertifyVEXStatement node itself.
 */
export type VexEdge = {
  __typename?: 'VEXEdge';
  cursor: Scalars['ID'];
  node: CertifyVexStatement;
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
  documentRef: Scalars['String'];
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
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** Justification for the attested relationship */
  justification: Scalars['String'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Two vulnerabilities that are similar */
  vulnerabilities: Array<Vulnerability>;
};

/**
 * VulnEqualConnection returns the paginated results for VulnEqual.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the VulnEqualEdge which contains the current cursor
 * and the VulnEqual node itself
 */
export type VulnEqualConnection = {
  __typename?: 'VulnEqualConnection';
  edges: Array<VulnEqualEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * VulnEqualEdge contains the cursor for the resulting node and
 * the VulnEqual node itself.
 */
export type VulnEqualEdge = {
  __typename?: 'VulnEqualEdge';
  cursor: Scalars['ID'];
  node: VulnEqual;
};

/** VulnEqualInputSpec represents the input to link vulnerabilities to each other. */
export type VulnEqualInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * VulnEqualSpec allows filtering the list of vulnerability links to return
 * in a query.
 */
export type VulnEqualSpec = {
  collector?: InputMaybe<Scalars['String']>;
  documentRef?: InputMaybe<Scalars['String']>;
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
 * VulnerabilityConnection returns the paginated results for Vulnerability.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the VulnerabilityEdge which contains the current cursor
 * and the Vulnerability node itself
 */
export type VulnerabilityConnection = {
  __typename?: 'VulnerabilityConnection';
  edges: Array<VulnerabilityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * VulnerabilityEdge contains the cursor for the resulting node and
 * the Vulnerability node itself.
 */
export type VulnerabilityEdge = {
  __typename?: 'VulnerabilityEdge';
  cursor: Scalars['ID'];
  node: Vulnerability;
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

/** The IDs of the ingested vulnerability */
export type VulnerabilityIDs = {
  __typename?: 'VulnerabilityIDs';
  vulnerabilityNodeID: Scalars['ID'];
  vulnerabilityTypeID: Scalars['ID'];
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
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Reference location of the document in the persistent blob store (if that is configured) */
  documentRef: Scalars['String'];
  id: Scalars['ID'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** The specific score type for the score value */
  scoreType: VulnerabilityScoreType;
  /** The score value based on the score type */
  scoreValue: Scalars['Float'];
  /** Timestamp when the certification was created (in RFC 3339 format) */
  timestamp: Scalars['Time'];
  /** The subject vulnerability that the metadata applies to */
  vulnerability: Vulnerability;
};

/**
 * VulnerabilityMetadataConnection returns the paginated results for VulnerabilityMetadata.
 *
 * totalCount is the total number of results returned.
 *
 * pageInfo provides information to the client if there is
 * a next page of results and the starting and
 * ending cursor for the current set.
 *
 * edges contains the VulnerabilityMetadataEdge which contains the current cursor
 * and the VulnerabilityMetadata node itself
 */
export type VulnerabilityMetadataConnection = {
  __typename?: 'VulnerabilityMetadataConnection';
  edges: Array<VulnerabilityMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/**
 * VulnerabilityMetadataEdge contains the cursor for the resulting node and
 * the VulnerabilityMetadata node itself.
 */
export type VulnerabilityMetadataEdge = {
  __typename?: 'VulnerabilityMetadataEdge';
  cursor: Scalars['ID'];
  node: VulnerabilityMetadata;
};

/** VulnerabilityMetadataInputSpec represents the mutation input to ingest a vulnerability metadata. */
export type VulnerabilityMetadataInputSpec = {
  collector: Scalars['String'];
  documentRef: Scalars['String'];
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
  documentRef?: InputMaybe<Scalars['String']>;
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
  artifact: IDorArtifactInput;
}>;


export type IngestArtifactMutation = { __typename?: 'Mutation', ingestArtifact: string };

export type IngestArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
}>;


export type IngestArtifactsMutation = { __typename?: 'Mutation', ingestArtifacts: Array<string> };

export type ArtifactsQueryVariables = Exact<{
  filter: ArtifactSpec;
}>;


export type ArtifactsQuery = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactsListQueryVariables = Exact<{
  filter: ArtifactSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type ArtifactsListQuery = { __typename?: 'Query', artifactsList?: { __typename?: 'ArtifactConnection', totalCount: number, edges: Array<{ __typename?: 'ArtifactEdge', cursor: string, node: (
        { __typename?: 'Artifact' }
        & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestBuilderMutationVariables = Exact<{
  builder: IDorBuilderInput;
}>;


export type IngestBuilderMutation = { __typename?: 'Mutation', ingestBuilder: string };

export type IngestBuildersMutationVariables = Exact<{
  builders: Array<IDorBuilderInput> | IDorBuilderInput;
}>;


export type IngestBuildersMutation = { __typename?: 'Mutation', ingestBuilders: Array<string> };

export type BuildersQueryVariables = Exact<{
  filter: BuilderSpec;
}>;


export type BuildersQuery = { __typename?: 'Query', builders: Array<(
    { __typename?: 'Builder' }
    & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment } }
  )> };

export type BuildersListQueryVariables = Exact<{
  filter: BuilderSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type BuildersListQuery = { __typename?: 'Query', buildersList?: { __typename?: 'BuilderConnection', totalCount: number, edges: Array<{ __typename?: 'BuilderEdge', cursor: string, node: (
        { __typename?: 'Builder' }
        & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestCertifyBadPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  pkgMatchType: MatchFlags;
  certifyBad: CertifyBadInputSpec;
}>;


export type IngestCertifyBadPkgMutation = { __typename?: 'Mutation', ingestCertifyBad: string };

export type IngestCertifyBadSrcMutationVariables = Exact<{
  source: IDorSourceInput;
  certifyBad: CertifyBadInputSpec;
}>;


export type IngestCertifyBadSrcMutation = { __typename?: 'Mutation', ingestCertifyBad: string };

export type IngestCertifyBadArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  certifyBad: CertifyBadInputSpec;
}>;


export type IngestCertifyBadArtifactMutation = { __typename?: 'Mutation', ingestCertifyBad: string };

export type IngestCertifyBadPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  pkgMatchType: MatchFlags;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type IngestCertifyBadPkgsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<string> };

export type IngestCertifyBadSrcsMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type IngestCertifyBadSrcsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<string> };

export type IngestCertifyBadArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  certifyBads: Array<CertifyBadInputSpec> | CertifyBadInputSpec;
}>;


export type IngestCertifyBadArtifactsMutation = { __typename?: 'Mutation', ingestCertifyBads: Array<string> };

export type CertifyBadQueryVariables = Exact<{
  filter: CertifyBadSpec;
}>;


export type CertifyBadQuery = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
  )> };

export type CertifyBadListQueryVariables = Exact<{
  filter: CertifyBadSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CertifyBadListQuery = { __typename?: 'Query', CertifyBadList?: { __typename?: 'CertifyBadConnection', totalCount: number, edges: Array<{ __typename?: 'CertifyBadEdge', cursor: string, node: (
        { __typename?: 'CertifyBad' }
        & { ' $fragmentRefs'?: { 'AllCertifyBadFragment': AllCertifyBadFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestCertifyGoodPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  pkgMatchType: MatchFlags;
  certifyGood: CertifyGoodInputSpec;
}>;


export type IngestCertifyGoodPkgMutation = { __typename?: 'Mutation', ingestCertifyGood: string };

export type IngestCertifyGoodSrcMutationVariables = Exact<{
  source: IDorSourceInput;
  certifyGood: CertifyGoodInputSpec;
}>;


export type IngestCertifyGoodSrcMutation = { __typename?: 'Mutation', ingestCertifyGood: string };

export type IngestCertifyGoodArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  certifyGood: CertifyGoodInputSpec;
}>;


export type IngestCertifyGoodArtifactMutation = { __typename?: 'Mutation', ingestCertifyGood: string };

export type IngestCertifyGoodPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  pkgMatchType: MatchFlags;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type IngestCertifyGoodPkgsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<string> };

export type IngestCertifyGoodSrcsMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type IngestCertifyGoodSrcsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<string> };

export type IngestCertifyGoodArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  certifyGoods: Array<CertifyGoodInputSpec> | CertifyGoodInputSpec;
}>;


export type IngestCertifyGoodArtifactsMutation = { __typename?: 'Mutation', ingestCertifyGoods: Array<string> };

export type CertifyGoodQueryVariables = Exact<{
  filter: CertifyGoodSpec;
}>;


export type CertifyGoodQuery = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
  )> };

export type CertifyGoodListQueryVariables = Exact<{
  filter: CertifyGoodSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CertifyGoodListQuery = { __typename?: 'Query', CertifyGoodList?: { __typename?: 'CertifyGoodConnection', totalCount: number, edges: Array<{ __typename?: 'CertifyGoodEdge', cursor: string, node: (
        { __typename?: 'CertifyGood' }
        & { ' $fragmentRefs'?: { 'AllCertifyGoodFragment': AllCertifyGoodFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestCertifyLegalPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  declaredLicenses: Array<IDorLicenseInput> | IDorLicenseInput;
  discoveredLicenses: Array<IDorLicenseInput> | IDorLicenseInput;
  legal: CertifyLegalInputSpec;
}>;


export type IngestCertifyLegalPkgMutation = { __typename?: 'Mutation', ingestCertifyLegal: string };

export type IngestCertifyLegalPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  declaredLicensesList: Array<Array<IDorLicenseInput> | IDorLicenseInput> | Array<IDorLicenseInput> | IDorLicenseInput;
  discoveredLicensesList: Array<Array<IDorLicenseInput> | IDorLicenseInput> | Array<IDorLicenseInput> | IDorLicenseInput;
  legals: Array<CertifyLegalInputSpec> | CertifyLegalInputSpec;
}>;


export type IngestCertifyLegalPkgsMutation = { __typename?: 'Mutation', ingestCertifyLegals: Array<string> };

export type IngestCertifyLegalSrcMutationVariables = Exact<{
  src: IDorSourceInput;
  declaredLicenses: Array<IDorLicenseInput> | IDorLicenseInput;
  discoveredLicenses: Array<IDorLicenseInput> | IDorLicenseInput;
  legal: CertifyLegalInputSpec;
}>;


export type IngestCertifyLegalSrcMutation = { __typename?: 'Mutation', ingestCertifyLegal: string };

export type IngestCertifyLegalSrcsMutationVariables = Exact<{
  srcs: Array<IDorSourceInput> | IDorSourceInput;
  declaredLicensesList: Array<Array<IDorLicenseInput> | IDorLicenseInput> | Array<IDorLicenseInput> | IDorLicenseInput;
  discoveredLicensesList: Array<Array<IDorLicenseInput> | IDorLicenseInput> | Array<IDorLicenseInput> | IDorLicenseInput;
  legals: Array<CertifyLegalInputSpec> | CertifyLegalInputSpec;
}>;


export type IngestCertifyLegalSrcsMutation = { __typename?: 'Mutation', ingestCertifyLegals: Array<string> };

export type CertifyLegalQueryVariables = Exact<{
  filter: CertifyLegalSpec;
}>;


export type CertifyLegalQuery = { __typename?: 'Query', CertifyLegal: Array<(
    { __typename?: 'CertifyLegal' }
    & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
  )> };

export type CertifyLegalListQueryVariables = Exact<{
  filter: CertifyLegalSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CertifyLegalListQuery = { __typename?: 'Query', CertifyLegalList?: { __typename?: 'CertifyLegalConnection', totalCount: number, edges: Array<{ __typename?: 'CertifyLegalEdge', cursor: string, node: (
        { __typename?: 'CertifyLegal' }
        & { ' $fragmentRefs'?: { 'AllCertifyLegalTreeFragment': AllCertifyLegalTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestCertifyScorecardMutationVariables = Exact<{
  source: IDorSourceInput;
  scorecard: ScorecardInputSpec;
}>;


export type IngestCertifyScorecardMutation = { __typename?: 'Mutation', ingestScorecard: string };

export type IngestCertifyScorecardsMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
  scorecards: Array<ScorecardInputSpec> | ScorecardInputSpec;
}>;


export type IngestCertifyScorecardsMutation = { __typename?: 'Mutation', ingestScorecards: Array<string> };

export type ScorecardsQueryVariables = Exact<{
  filter: CertifyScorecardSpec;
}>;


export type ScorecardsQuery = { __typename?: 'Query', scorecards: Array<(
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
  )> };

export type ScorecardsListQueryVariables = Exact<{
  filter: CertifyScorecardSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type ScorecardsListQuery = { __typename?: 'Query', scorecardsList?: { __typename?: 'CertifyScorecardConnection', totalCount: number, edges: Array<{ __typename?: 'CertifyScorecardEdge', cursor: string, node: (
        { __typename?: 'CertifyScorecard' }
        & { ' $fragmentRefs'?: { 'AllCertifyScorecardFragment': AllCertifyScorecardFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestCertifyVexPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  vulnerability: IDorVulnerabilityInput;
  vexStatement: VexStatementInputSpec;
}>;


export type IngestCertifyVexPkgMutation = { __typename?: 'Mutation', ingestVEXStatement: string };

export type IngestCertifyVexArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  vulnerability: IDorVulnerabilityInput;
  vexStatement: VexStatementInputSpec;
}>;


export type IngestCertifyVexArtifactMutation = { __typename?: 'Mutation', ingestVEXStatement: string };

export type IngestCertifyVexPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  vulnerabilities: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
  vexStatements: Array<VexStatementInputSpec> | VexStatementInputSpec;
}>;


export type IngestCertifyVexPkgsMutation = { __typename?: 'Mutation', ingestVEXStatements: Array<string> };

export type IngestCertifyVexArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  vulnerabilities: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
  vexStatements: Array<VexStatementInputSpec> | VexStatementInputSpec;
}>;


export type IngestCertifyVexArtifactsMutation = { __typename?: 'Mutation', ingestVEXStatements: Array<string> };

export type VexStatementsQueryVariables = Exact<{
  filter: CertifyVexStatementSpec;
}>;


export type VexStatementsQuery = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
  )> };

export type VexStatementListQueryVariables = Exact<{
  filter: CertifyVexStatementSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type VexStatementListQuery = { __typename?: 'Query', CertifyVEXStatementList?: { __typename?: 'VEXConnection', totalCount: number, edges: Array<{ __typename?: 'VEXEdge', cursor: string, node: (
        { __typename?: 'CertifyVEXStatement' }
        & { ' $fragmentRefs'?: { 'AllCertifyVexStatementFragment': AllCertifyVexStatementFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestCertifyVulnPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  vulnerability: IDorVulnerabilityInput;
  certifyVuln: ScanMetadataInput;
}>;


export type IngestCertifyVulnPkgMutation = { __typename?: 'Mutation', ingestCertifyVuln: string };

export type IngestCertifyVulnPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  vulnerabilities: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
  certifyVulns: Array<ScanMetadataInput> | ScanMetadataInput;
}>;


export type IngestCertifyVulnPkgsMutation = { __typename?: 'Mutation', ingestCertifyVulns: Array<string> };

export type CertifyVulnQueryVariables = Exact<{
  filter: CertifyVulnSpec;
}>;


export type CertifyVulnQuery = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
  )> };

export type CertifyVulnListQueryVariables = Exact<{
  filter: CertifyVulnSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CertifyVulnListQuery = { __typename?: 'Query', CertifyVulnList?: { __typename?: 'CertifyVulnConnection', totalCount: number, edges: Array<{ __typename?: 'CertifyVulnEdge', cursor: string, node: (
        { __typename?: 'CertifyVuln' }
        & { ' $fragmentRefs'?: { 'AllCertifyVulnFragment': AllCertifyVulnFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestPointOfContactPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  pkgMatchType: MatchFlags;
  pointOfContact: PointOfContactInputSpec;
}>;


export type IngestPointOfContactPkgMutation = { __typename?: 'Mutation', ingestPointOfContact: string };

export type IngestPointOfContactSrcMutationVariables = Exact<{
  source: IDorSourceInput;
  pointOfContact: PointOfContactInputSpec;
}>;


export type IngestPointOfContactSrcMutation = { __typename?: 'Mutation', ingestPointOfContact: string };

export type IngestPointOfContactArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  pointOfContact: PointOfContactInputSpec;
}>;


export type IngestPointOfContactArtifactMutation = { __typename?: 'Mutation', ingestPointOfContact: string };

export type IngestPointOfContactPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  pkgMatchType: MatchFlags;
  pointOfContacts: Array<PointOfContactInputSpec> | PointOfContactInputSpec;
}>;


export type IngestPointOfContactPkgsMutation = { __typename?: 'Mutation', ingestPointOfContacts: Array<string> };

export type IngestPointOfContactSrcsMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
  pointOfContacts: Array<PointOfContactInputSpec> | PointOfContactInputSpec;
}>;


export type IngestPointOfContactSrcsMutation = { __typename?: 'Mutation', ingestPointOfContacts: Array<string> };

export type IngestPointOfContactArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  pointOfContacts: Array<PointOfContactInputSpec> | PointOfContactInputSpec;
}>;


export type IngestPointOfContactArtifactsMutation = { __typename?: 'Mutation', ingestPointOfContacts: Array<string> };

export type PointOfContactsQueryVariables = Exact<{
  filter: PointOfContactSpec;
}>;


export type PointOfContactsQuery = { __typename?: 'Query', PointOfContact: Array<(
    { __typename?: 'PointOfContact' }
    & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
  )> };

export type PointOfContactListQueryVariables = Exact<{
  filter: PointOfContactSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type PointOfContactListQuery = { __typename?: 'Query', PointOfContactList?: { __typename?: 'PointOfContactConnection', totalCount: number, edges: Array<{ __typename?: 'PointOfContactEdge', cursor: string, node: (
        { __typename?: 'PointOfContact' }
        & { ' $fragmentRefs'?: { 'AllPointOfContactFragment': AllPointOfContactFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type DeleteMutationVariables = Exact<{
  nodeID: Scalars['ID'];
}>;


export type DeleteMutation = { __typename?: 'Mutation', delete: boolean };

export type IngestHasSbomPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  hasSBOM: HasSbomInputSpec;
  includes: HasSbomIncludesInputSpec;
}>;


export type IngestHasSbomPkgMutation = { __typename?: 'Mutation', ingestHasSBOM: string };

export type IngestHasSbomArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  hasSBOM: HasSbomInputSpec;
  includes: HasSbomIncludesInputSpec;
}>;


export type IngestHasSbomArtifactMutation = { __typename?: 'Mutation', ingestHasSBOM: string };

export type IngestHasSbomPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  hasSBOMs: Array<HasSbomInputSpec> | HasSbomInputSpec;
  includes: Array<HasSbomIncludesInputSpec> | HasSbomIncludesInputSpec;
}>;


export type IngestHasSbomPkgsMutation = { __typename?: 'Mutation', ingestHasSBOMs: Array<string> };

export type IngestHasSbomArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  hasSBOMs: Array<HasSbomInputSpec> | HasSbomInputSpec;
  includes: Array<HasSbomIncludesInputSpec> | HasSbomIncludesInputSpec;
}>;


export type IngestHasSbomArtifactsMutation = { __typename?: 'Mutation', ingestHasSBOMs: Array<string> };

export type HasSboMsQueryVariables = Exact<{
  filter: HasSbomSpec;
}>;


export type HasSboMsQuery = { __typename?: 'Query', HasSBOM: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type HasSbomListQueryVariables = Exact<{
  filter: HasSbomSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type HasSbomListQuery = { __typename?: 'Query', HasSBOMList?: { __typename?: 'HasSBOMConnection', totalCount: number, edges: Array<{ __typename?: 'HasSBOMEdge', cursor: string, node: (
        { __typename?: 'HasSBOM' }
        & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestSlsaForArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  materials: Array<IDorArtifactInput> | IDorArtifactInput;
  builder: IDorBuilderInput;
  slsa: SlsaInputSpec;
}>;


export type IngestSlsaForArtifactMutation = { __typename?: 'Mutation', ingestSLSA: string };

export type IngestSlsaForArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  materialsList: Array<Array<IDorArtifactInput> | IDorArtifactInput> | Array<IDorArtifactInput> | IDorArtifactInput;
  builders: Array<IDorBuilderInput> | IDorBuilderInput;
  slsaList: Array<SlsaInputSpec> | SlsaInputSpec;
}>;


export type IngestSlsaForArtifactsMutation = { __typename?: 'Mutation', ingestSLSAs: Array<string> };

export type HasSlsaQueryVariables = Exact<{
  filter: HasSlsaSpec;
}>;


export type HasSlsaQuery = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type HasSlsaListQueryVariables = Exact<{
  filter: HasSlsaSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type HasSlsaListQuery = { __typename?: 'Query', HasSLSAList?: { __typename?: 'HasSLSAConnection', totalCount: number, edges: Array<{ __typename?: 'HasSLSAEdge', cursor: string, node: (
        { __typename?: 'HasSLSA' }
        & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestHasSourceAtMutationVariables = Exact<{
  pkg: IDorPkgInput;
  pkgMatchType: MatchFlags;
  source: IDorSourceInput;
  hasSourceAt: HasSourceAtInputSpec;
}>;


export type IngestHasSourceAtMutation = { __typename?: 'Mutation', ingestHasSourceAt: string };

export type IngestHasSourcesAtMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  pkgMatchType: MatchFlags;
  sources: Array<IDorSourceInput> | IDorSourceInput;
  hasSourceAts: Array<HasSourceAtInputSpec> | HasSourceAtInputSpec;
}>;


export type IngestHasSourcesAtMutation = { __typename?: 'Mutation', ingestHasSourceAts: Array<string> };

export type HasSourceAtQueryVariables = Exact<{
  filter: HasSourceAtSpec;
}>;


export type HasSourceAtQuery = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
  )> };

export type HasSourceAtListQueryVariables = Exact<{
  filter: HasSourceAtSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type HasSourceAtListQuery = { __typename?: 'Query', HasSourceAtList?: { __typename?: 'HasSourceAtConnection', totalCount: number, edges: Array<{ __typename?: 'HasSourceAtEdge', cursor: string, node: (
        { __typename?: 'HasSourceAt' }
        & { ' $fragmentRefs'?: { 'AllHasSourceAtFragment': AllHasSourceAtFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestHashEqualMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  otherArtifact: IDorArtifactInput;
  hashEqual: HashEqualInputSpec;
}>;


export type IngestHashEqualMutation = { __typename?: 'Mutation', ingestHashEqual: string };

export type IngestHashEqualsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  otherArtifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  hashEquals: Array<HashEqualInputSpec> | HashEqualInputSpec;
}>;


export type IngestHashEqualsMutation = { __typename?: 'Mutation', ingestHashEquals: Array<string> };

export type HashEqualsQueryVariables = Exact<{
  filter: HashEqualSpec;
}>;


export type HashEqualsQuery = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type HashEqualListQueryVariables = Exact<{
  filter: HashEqualSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type HashEqualListQuery = { __typename?: 'Query', HashEqualList?: { __typename?: 'HashEqualConnection', totalCount: number, edges: Array<{ __typename?: 'HashEqualEdge', cursor: string, node: (
        { __typename?: 'HashEqual' }
        & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestIsDependencyMutationVariables = Exact<{
  pkg: IDorPkgInput;
  depPkg: IDorPkgInput;
  dependency: IsDependencyInputSpec;
}>;


export type IngestIsDependencyMutation = { __typename?: 'Mutation', ingestDependency: string };

export type IngestIsDependenciesMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  depPkgs: Array<IDorPkgInput> | IDorPkgInput;
  dependencies: Array<IsDependencyInputSpec> | IsDependencyInputSpec;
}>;


export type IngestIsDependenciesMutation = { __typename?: 'Mutation', ingestDependencies: Array<string> };

export type DependenciesQueryVariables = Exact<{
  filter: IsDependencySpec;
}>;


export type DependenciesQuery = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type DependencyListQueryVariables = Exact<{
  filter: IsDependencySpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type DependencyListQuery = { __typename?: 'Query', IsDependencyList?: { __typename?: 'IsDependencyConnection', totalCount: number, edges: Array<{ __typename?: 'IsDependencyEdge', cursor: string, node: (
        { __typename?: 'IsDependency' }
        & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestIsOccurrencePkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  artifact: IDorArtifactInput;
  occurrence: IsOccurrenceInputSpec;
}>;


export type IngestIsOccurrencePkgMutation = { __typename?: 'Mutation', ingestOccurrence: string };

export type IngestIsOccurrenceSrcMutationVariables = Exact<{
  source: IDorSourceInput;
  artifact: IDorArtifactInput;
  occurrence: IsOccurrenceInputSpec;
}>;


export type IngestIsOccurrenceSrcMutation = { __typename?: 'Mutation', ingestOccurrence: string };

export type IngestIsOccurrencesPkgMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  occurrences: Array<IsOccurrenceInputSpec> | IsOccurrenceInputSpec;
}>;


export type IngestIsOccurrencesPkgMutation = { __typename?: 'Mutation', ingestOccurrences: Array<string> };

export type IngestIsOccurrencesSrcMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  occurrences: Array<IsOccurrenceInputSpec> | IsOccurrenceInputSpec;
}>;


export type IngestIsOccurrencesSrcMutation = { __typename?: 'Mutation', ingestOccurrences: Array<string> };

export type OccurrencesQueryVariables = Exact<{
  filter: IsOccurrenceSpec;
}>;


export type OccurrencesQuery = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type OccurrenceListQueryVariables = Exact<{
  filter: IsOccurrenceSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type OccurrenceListQuery = { __typename?: 'Query', IsOccurrenceList?: { __typename?: 'IsOccurrenceConnection', totalCount: number, edges: Array<{ __typename?: 'IsOccurrenceEdge', cursor: string, node: (
        { __typename?: 'IsOccurrence' }
        & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestLicenseMutationVariables = Exact<{
  license: IDorLicenseInput;
}>;


export type IngestLicenseMutation = { __typename?: 'Mutation', ingestLicense: string };

export type IngestLicensesMutationVariables = Exact<{
  licenses: Array<IDorLicenseInput> | IDorLicenseInput;
}>;


export type IngestLicensesMutation = { __typename?: 'Mutation', ingestLicenses: Array<string> };

export type LicensesQueryVariables = Exact<{
  filter: LicenseSpec;
}>;


export type LicensesQuery = { __typename?: 'Query', licenses: Array<(
    { __typename?: 'License' }
    & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
  )> };

export type LicenseListQueryVariables = Exact<{
  filter: LicenseSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type LicenseListQuery = { __typename?: 'Query', licenseList?: { __typename?: 'LicenseConnection', totalCount: number, edges: Array<{ __typename?: 'LicenseEdge', cursor: string, node: (
        { __typename?: 'License' }
        & { ' $fragmentRefs'?: { 'AllLicenseTreeFragment': AllLicenseTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestHasMetadataPkgMutationVariables = Exact<{
  pkg: IDorPkgInput;
  pkgMatchType: MatchFlags;
  hasMetadata: HasMetadataInputSpec;
}>;


export type IngestHasMetadataPkgMutation = { __typename?: 'Mutation', ingestHasMetadata: string };

export type IngestHasMetadataSrcMutationVariables = Exact<{
  source: IDorSourceInput;
  hasMetadata: HasMetadataInputSpec;
}>;


export type IngestHasMetadataSrcMutation = { __typename?: 'Mutation', ingestHasMetadata: string };

export type IngestHasMetadataArtifactMutationVariables = Exact<{
  artifact: IDorArtifactInput;
  hasMetadata: HasMetadataInputSpec;
}>;


export type IngestHasMetadataArtifactMutation = { __typename?: 'Mutation', ingestHasMetadata: string };

export type IngestHasMetadataPkgsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  pkgMatchType: MatchFlags;
  hasMetadataList: Array<HasMetadataInputSpec> | HasMetadataInputSpec;
}>;


export type IngestHasMetadataPkgsMutation = { __typename?: 'Mutation', ingestBulkHasMetadata: Array<string> };

export type IngestHasMetadataSrcsMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
  hasMetadataList: Array<HasMetadataInputSpec> | HasMetadataInputSpec;
}>;


export type IngestHasMetadataSrcsMutation = { __typename?: 'Mutation', ingestBulkHasMetadata: Array<string> };

export type IngestHasMetadataArtifactsMutationVariables = Exact<{
  artifacts: Array<IDorArtifactInput> | IDorArtifactInput;
  hasMetadataList: Array<HasMetadataInputSpec> | HasMetadataInputSpec;
}>;


export type IngestHasMetadataArtifactsMutation = { __typename?: 'Mutation', ingestBulkHasMetadata: Array<string> };

export type HasMetadataQueryVariables = Exact<{
  filter: HasMetadataSpec;
}>;


export type HasMetadataQuery = { __typename?: 'Query', HasMetadata: Array<(
    { __typename?: 'HasMetadata' }
    & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
  )> };

export type HasMetadataListQueryVariables = Exact<{
  filter: HasMetadataSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type HasMetadataListQuery = { __typename?: 'Query', HasMetadataList?: { __typename?: 'HasMetadataConnection', totalCount: number, edges: Array<{ __typename?: 'HasMetadataEdge', cursor: string, node: (
        { __typename?: 'HasMetadata' }
        & { ' $fragmentRefs'?: { 'AllHasMetadataFragment': AllHasMetadataFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestPackageMutationVariables = Exact<{
  pkg: IDorPkgInput;
}>;


export type IngestPackageMutation = { __typename?: 'Mutation', ingestPackage: { __typename?: 'PackageIDs', packageTypeID: string, packageNamespaceID: string, packageNameID: string, packageVersionID: string } };

export type IngestPackagesMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
}>;


export type IngestPackagesMutation = { __typename?: 'Mutation', ingestPackages: Array<{ __typename?: 'PackageIDs', packageTypeID: string, packageNamespaceID: string, packageNameID: string, packageVersionID: string }> };

export type PackagesListQueryVariables = Exact<{
  filter: PkgSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type PackagesListQuery = { __typename?: 'Query', packagesList?: { __typename?: 'PackageConnection', totalCount: number, edges: Array<{ __typename?: 'PackageEdge', cursor: string, node: (
        { __typename?: 'Package' }
        & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

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
  pkg: IDorPkgInput;
  otherPackage: IDorPkgInput;
  pkgEqual: PkgEqualInputSpec;
}>;


export type IngestPkgEqualMutation = { __typename?: 'Mutation', ingestPkgEqual: string };

export type IngestPkgEqualsMutationVariables = Exact<{
  pkgs: Array<IDorPkgInput> | IDorPkgInput;
  otherPackages: Array<IDorPkgInput> | IDorPkgInput;
  pkgEquals: Array<PkgEqualInputSpec> | PkgEqualInputSpec;
}>;


export type IngestPkgEqualsMutation = { __typename?: 'Mutation', ingestPkgEquals: Array<string> };

export type PkgEqualsQueryVariables = Exact<{
  filter: PkgEqualSpec;
}>;


export type PkgEqualsQuery = { __typename?: 'Query', PkgEqual: Array<(
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
  )> };

export type PkgEqualListQueryVariables = Exact<{
  filter: PkgEqualSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type PkgEqualListQuery = { __typename?: 'Query', PkgEqualList?: { __typename?: 'PkgEqualConnection', totalCount: number, edges: Array<{ __typename?: 'PkgEqualEdge', cursor: string, node: (
        { __typename?: 'PkgEqual' }
        & { ' $fragmentRefs'?: { 'AllPkgEqualFragment': AllPkgEqualFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

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

export type QueryPackagesListForScanQueryVariables = Exact<{
  filter: PkgSpec;
  queryType: QueryType;
  lastScan?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type QueryPackagesListForScanQuery = { __typename?: 'Query', queryPackagesListForScan?: { __typename?: 'PackageConnection', totalCount: number, edges: Array<{ __typename?: 'PackageEdge', cursor: string, node: (
        { __typename?: 'Package' }
        & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestSourceMutationVariables = Exact<{
  source: IDorSourceInput;
}>;


export type IngestSourceMutation = { __typename?: 'Mutation', ingestSource: { __typename?: 'SourceIDs', sourceTypeID: string, sourceNamespaceID: string, sourceNameID: string } };

export type IngestSourcesMutationVariables = Exact<{
  sources: Array<IDorSourceInput> | IDorSourceInput;
}>;


export type IngestSourcesMutation = { __typename?: 'Mutation', ingestSources: Array<{ __typename?: 'SourceIDs', sourceTypeID: string, sourceNamespaceID: string, sourceNameID: string }> };

export type SourcesListQueryVariables = Exact<{
  filter: SourceSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type SourcesListQuery = { __typename?: 'Query', sourcesList?: { __typename?: 'SourceConnection', totalCount: number, edges: Array<{ __typename?: 'SourceEdge', cursor: string, node: (
        { __typename?: 'Source' }
        & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type SourcesQueryVariables = Exact<{
  filter: SourceSpec;
}>;


export type SourcesQuery = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSourceTreeFragment': AllSourceTreeFragment } }
  )> };

export type AllPkgTreeFragment = { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, purl: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } & { ' $fragmentName'?: 'AllPkgTreeFragment' };

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

export type AllIsDependencyTreeFragment = { __typename?: 'IsDependency', id: string, justification: string, dependencyType: DependencyType, origin: string, collector: string, package: (
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

export type AllHasSbomTreeFragment = { __typename?: 'HasSBOM', id: string, uri: string, algorithm: string, digest: string, downloadLocation: string, origin: string, collector: string, knownSince: any, documentRef: string, subject: (
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ), includedSoftware: Array<(
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )>, includedDependencies: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )>, includedOccurrences: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> } & { ' $fragmentName'?: 'AllHasSbomTreeFragment' };

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

export type AllHasSlsaTreeFragment = { __typename?: 'HasSLSA', id: string, subject: (
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ), slsa: { __typename?: 'SLSA', buildType: string, slsaVersion: string, startedOn?: any | null, finishedOn?: any | null, origin: string, collector: string, documentRef: string, builtFrom: Array<(
      { __typename?: 'Artifact' }
      & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
    )>, builtBy: (
      { __typename?: 'Builder' }
      & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment } }
    ), slsaPredicate: Array<{ __typename?: 'SLSAPredicate', key: string, value: string }> } } & { ' $fragmentName'?: 'AllHasSlsaTreeFragment' };

export type IngestVulnEqualMutationVariables = Exact<{
  vulnerability: IDorVulnerabilityInput;
  otherVulnerability: IDorVulnerabilityInput;
  vulnEqual: VulnEqualInputSpec;
}>;


export type IngestVulnEqualMutation = { __typename?: 'Mutation', ingestVulnEqual: string };

export type IngestVulnEqualsMutationVariables = Exact<{
  vulnerabilities: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
  otherVulnerabilities: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
  vulnEquals: Array<VulnEqualInputSpec> | VulnEqualInputSpec;
}>;


export type IngestVulnEqualsMutation = { __typename?: 'Mutation', ingestVulnEquals: Array<string> };

export type VulnEqualsQueryVariables = Exact<{
  filter: VulnEqualSpec;
}>;


export type VulnEqualsQuery = { __typename?: 'Query', vulnEqual: Array<(
    { __typename?: 'VulnEqual' }
    & { ' $fragmentRefs'?: { 'AllVulnEqualFragment': AllVulnEqualFragment } }
  )> };

export type VulnEqualListQueryVariables = Exact<{
  filter: VulnEqualSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type VulnEqualListQuery = { __typename?: 'Query', vulnEqualList?: { __typename?: 'VulnEqualConnection', totalCount: number, edges: Array<{ __typename?: 'VulnEqualEdge', cursor: string, node: (
        { __typename?: 'VulnEqual' }
        & { ' $fragmentRefs'?: { 'AllVulnEqualFragment': AllVulnEqualFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestVulnHasMetadataMutationVariables = Exact<{
  vulnerability: IDorVulnerabilityInput;
  vulnMetadata: VulnerabilityMetadataInputSpec;
}>;


export type IngestVulnHasMetadataMutation = { __typename?: 'Mutation', ingestVulnerabilityMetadata: string };

export type IngestBulkVulnHasMetadataMutationVariables = Exact<{
  vulnerabilities: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
  vulnerabilityMetadataList: Array<VulnerabilityMetadataInputSpec> | VulnerabilityMetadataInputSpec;
}>;


export type IngestBulkVulnHasMetadataMutation = { __typename?: 'Mutation', ingestBulkVulnerabilityMetadata: Array<string> };

export type VulnerabilityMetadataQueryVariables = Exact<{
  filter: VulnerabilityMetadataSpec;
}>;


export type VulnerabilityMetadataQuery = { __typename?: 'Query', vulnerabilityMetadata: Array<(
    { __typename?: 'VulnerabilityMetadata' }
    & { ' $fragmentRefs'?: { 'AllVulnMetadataTreeFragment': AllVulnMetadataTreeFragment } }
  )> };

export type VulnerabilityMetadataListQueryVariables = Exact<{
  filter: VulnerabilityMetadataSpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type VulnerabilityMetadataListQuery = { __typename?: 'Query', vulnerabilityMetadataList?: { __typename?: 'VulnerabilityMetadataConnection', totalCount: number, edges: Array<{ __typename?: 'VulnerabilityMetadataEdge', cursor: string, node: (
        { __typename?: 'VulnerabilityMetadata' }
        & { ' $fragmentRefs'?: { 'AllVulnMetadataTreeFragment': AllVulnMetadataTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export type IngestVulnerabilityMutationVariables = Exact<{
  vuln: IDorVulnerabilityInput;
}>;


export type IngestVulnerabilityMutation = { __typename?: 'Mutation', ingestVulnerability: { __typename?: 'VulnerabilityIDs', vulnerabilityTypeID: string, vulnerabilityNodeID: string } };

export type IngestVulnerabilitiesMutationVariables = Exact<{
  vulns: Array<IDorVulnerabilityInput> | IDorVulnerabilityInput;
}>;


export type IngestVulnerabilitiesMutation = { __typename?: 'Mutation', ingestVulnerabilities: Array<{ __typename?: 'VulnerabilityIDs', vulnerabilityTypeID: string, vulnerabilityNodeID: string }> };

export type VulnerabilitiesQueryVariables = Exact<{
  filter: VulnerabilitySpec;
}>;


export type VulnerabilitiesQuery = { __typename?: 'Query', vulnerabilities: Array<(
    { __typename?: 'Vulnerability' }
    & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
  )> };

export type VulnerabilityListQueryVariables = Exact<{
  filter: VulnerabilitySpec;
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type VulnerabilityListQuery = { __typename?: 'Query', vulnerabilityList?: { __typename?: 'VulnerabilityConnection', totalCount: number, edges: Array<{ __typename?: 'VulnerabilityEdge', cursor: string, node: (
        { __typename?: 'Vulnerability' }
        & { ' $fragmentRefs'?: { 'AllVulnerabilityTreeFragment': AllVulnerabilityTreeFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } | null };

export const AllVulnMetadataTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllVulnMetadataTreeFragment, unknown>;
export const AllSourceTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllSourceTreeFragment, unknown>;
export const AllCertifyScorecardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllCertifyScorecardFragment, unknown>;
export const AllArtifactTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllArtifactTreeFragment, unknown>;
export const AllSlsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllSlsaTreeFragment, unknown>;
export const AllPkgTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgTreeFragment, unknown>;
export const AllLicenseTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<AllLicenseTreeFragment, unknown>;
export const AllCertifyLegalTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<AllCertifyLegalTreeFragment, unknown>;
export const AllCertifyBadFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllCertifyBadFragment, unknown>;
export const AllCertifyGoodFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllCertifyGoodFragment, unknown>;
export const AllHashEqualTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllHashEqualTreeFragment, unknown>;
export const AllIsDependencyTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllIsDependencyTreeFragment, unknown>;
export const AllIsOccurrencesTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllIsOccurrencesTreeFragment, unknown>;
export const AllHasSbomTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHasSbomTreeFragment, unknown>;
export const AllHasSourceAtFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllHasSourceAtFragment, unknown>;
export const AllVulnerabilityTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllVulnerabilityTreeFragment, unknown>;
export const AllCertifyVulnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllCertifyVulnFragment, unknown>;
export const AllPkgEqualFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgEqualFragment, unknown>;
export const AllVulnEqualFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllVulnEqualFragment, unknown>;
export const AllCertifyVexStatementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<AllCertifyVexStatementFragment, unknown>;
export const AllHasMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllHasMetadataFragment, unknown>;
export const AllPointOfContactFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllPointOfContactFragment, unknown>;
export const AllBuilderTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<AllBuilderTreeFragment, unknown>;
export const AllHasSlsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<AllHasSlsaTreeFragment, unknown>;
export const IngestArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}]}}]} as unknown as DocumentNode<IngestArtifactMutation, IngestArtifactMutationVariables>;
export const IngestArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}]}}]} as unknown as DocumentNode<IngestArtifactsMutation, IngestArtifactsMutationVariables>;
export const ArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Artifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactsQuery, ArtifactsQueryVariables>;
export const ArtifactsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifactsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactsListQuery, ArtifactsListQueryVariables>;
export const IngestBuilderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBuilder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorBuilderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builder"}}}]}]}}]} as unknown as DocumentNode<IngestBuilderMutation, IngestBuilderMutationVariables>;
export const IngestBuildersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBuilders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builders"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorBuilderInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builders"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builders"}}}]}]}}]} as unknown as DocumentNode<IngestBuildersMutation, IngestBuildersMutationVariables>;
export const BuildersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Builders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builderSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<BuildersQuery, BuildersQueryVariables>;
export const BuildersListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuildersList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuilderSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildersList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builderSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<BuildersListQuery, BuildersListQueryVariables>;
export const IngestCertifyBadPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyBadPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyBadPkgMutation, IngestCertifyBadPkgMutationVariables>;
export const IngestCertifyBadSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyBadSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyBadSrcMutation, IngestCertifyBadSrcMutationVariables>;
export const IngestCertifyBadArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyBadArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBad"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyBadArtifactMutation, IngestCertifyBadArtifactMutationVariables>;
export const IngestCertifyBadPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyBadPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyBadPkgsMutation, IngestCertifyBadPkgsMutationVariables>;
export const IngestCertifyBadSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyBadSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyBadSrcsMutation, IngestCertifyBadSrcsMutationVariables>;
export const IngestCertifyBadArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyBadArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyBads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyBads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyBads"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyBadArtifactsMutation, IngestCertifyBadArtifactsMutationVariables>;
export const CertifyBadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyBad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadQuery, CertifyBadQueryVariables>;
export const CertifyBadListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyBadList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBadSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBadList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyBadListQuery, CertifyBadListQueryVariables>;
export const IngestCertifyGoodPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyGoodPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyGoodPkgMutation, IngestCertifyGoodPkgMutationVariables>;
export const IngestCertifyGoodSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyGoodSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyGoodSrcMutation, IngestCertifyGoodSrcMutationVariables>;
export const IngestCertifyGoodArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyGoodArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGood"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyGoodArtifactMutation, IngestCertifyGoodArtifactMutationVariables>;
export const IngestCertifyGoodPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyGoodPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyGoodPkgsMutation, IngestCertifyGoodPkgsMutationVariables>;
export const IngestCertifyGoodSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyGoodSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyGoodSrcsMutation, IngestCertifyGoodSrcsMutationVariables>;
export const IngestCertifyGoodArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyGoodArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGoods"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyGoods"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyGoodArtifactsMutation, IngestCertifyGoodArtifactsMutationVariables>;
export const CertifyGoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyGood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodQuery, CertifyGoodQueryVariables>;
export const CertifyGoodListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyGoodList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGoodSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGoodList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodListQuery, CertifyGoodListQueryVariables>;
export const IngestCertifyLegalPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyLegalPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legal"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyLegalPkgMutation, IngestCertifyLegalPkgMutationVariables>;
export const IngestCertifyLegalPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyLegalPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legals"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyLegalPkgsMutation, IngestCertifyLegalPkgsMutationVariables>;
export const IngestCertifyLegalSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyLegalSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"src"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"src"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicenses"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legal"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyLegalSrcMutation, IngestCertifyLegalSrcMutationVariables>;
export const IngestCertifyLegalSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyLegalSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"srcs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"legals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyLegals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"srcs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"declaredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declaredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"discoveredLicensesList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discoveredLicensesList"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyLegals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"legals"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyLegalSrcsMutation, IngestCertifyLegalSrcsMutationVariables>;
export const CertifyLegalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyLegal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyLegal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyLegalSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyLegalQuery, CertifyLegalQueryVariables>;
export const CertifyLegalListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyLegalList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegalSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyLegalList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyLegalSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyLegalListQuery, CertifyLegalListQueryVariables>;
export const IngestCertifyScorecardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyScorecard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestScorecard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyScorecardMutation, IngestCertifyScorecardMutationVariables>;
export const IngestCertifyScorecardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyScorecards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecards"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestScorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecards"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecards"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyScorecardsMutation, IngestCertifyScorecardsMutationVariables>;
export const ScorecardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Scorecards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecardSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardsQuery, ScorecardsQueryVariables>;
export const ScorecardsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecardSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecardsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardsListQuery, ScorecardsListQueryVariables>;
export const IngestCertifyVexPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyVexPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyVexPkgMutation, IngestCertifyVexPkgMutationVariables>;
export const IngestCertifyVexArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyVexArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatement"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyVexArtifactMutation, IngestCertifyVexArtifactMutationVariables>;
export const IngestCertifyVexPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyVexPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyVexPkgsMutation, IngestCertifyVexPkgsMutationVariables>;
export const IngestCertifyVexArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyVexArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VexStatementInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVEXStatements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vexStatements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vexStatements"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyVexArtifactsMutation, IngestCertifyVexArtifactsMutationVariables>;
export const VexStatementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VEXStatements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatementSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexStatementsQuery, VexStatementsQueryVariables>;
export const VexStatementListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VEXStatementList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatementSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatementList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VexStatementListQuery, VexStatementListQueryVariables>;
export const IngestCertifyVulnPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyVulnPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScanMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVuln"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyVulnPkgMutation, IngestCertifyVulnPkgMutationVariables>;
export const IngestCertifyVulnPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestCertifyVulnPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"certifyVulns"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScanMetadataInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyVulns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"certifyVulns"},"value":{"kind":"Variable","name":{"kind":"Name","value":"certifyVulns"}}}]}]}}]} as unknown as DocumentNode<IngestCertifyVulnPkgsMutation, IngestCertifyVulnPkgsMutationVariables>;
export const CertifyVulnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVuln"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVulnSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQuery, CertifyVulnQueryVariables>;
export const CertifyVulnListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVulnSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVulnList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnListQuery, CertifyVulnListQueryVariables>;
export const IngestPointOfContactPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPointOfContactPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}]}]}}]} as unknown as DocumentNode<IngestPointOfContactPkgMutation, IngestPointOfContactPkgMutationVariables>;
export const IngestPointOfContactSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPointOfContactSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}]}]}}]} as unknown as DocumentNode<IngestPointOfContactSrcMutation, IngestPointOfContactSrcMutationVariables>;
export const IngestPointOfContactArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPointOfContactArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContact"}}}]}]}}]} as unknown as DocumentNode<IngestPointOfContactArtifactMutation, IngestPointOfContactArtifactMutationVariables>;
export const IngestPointOfContactPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPointOfContactPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}}}]}]}}]} as unknown as DocumentNode<IngestPointOfContactPkgsMutation, IngestPointOfContactPkgsMutationVariables>;
export const IngestPointOfContactSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPointOfContactSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}}}]}]}}]} as unknown as DocumentNode<IngestPointOfContactSrcsMutation, IngestPointOfContactSrcsMutationVariables>;
export const IngestPointOfContactArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPointOfContactArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPointOfContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pointOfContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointOfContacts"}}}]}]}}]} as unknown as DocumentNode<IngestPointOfContactArtifactsMutation, IngestPointOfContactArtifactsMutationVariables>;
export const PointOfContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PointOfContacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PointOfContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pointOfContactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PointOfContactsQuery, PointOfContactsQueryVariables>;
export const PointOfContactListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PointOfContactList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContactSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PointOfContactList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pointOfContactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PointOfContactListQuery, PointOfContactListQueryVariables>;
export const DeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodeID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodeID"}}}]}]}}]} as unknown as DocumentNode<DeleteMutation, DeleteMutationVariables>;
export const IngestHasSbomPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSBOMPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMIncludesInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}}},{"kind":"Argument","name":{"kind":"Name","value":"includes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includes"}}}]}]}}]} as unknown as DocumentNode<IngestHasSbomPkgMutation, IngestHasSbomPkgMutationVariables>;
export const IngestHasSbomArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSBOMArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMIncludesInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOM"}}},{"kind":"Argument","name":{"kind":"Name","value":"includes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includes"}}}]}]}}]} as unknown as DocumentNode<IngestHasSbomArtifactMutation, IngestHasSbomArtifactMutationVariables>;
export const IngestHasSbomPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSBOMPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMIncludesInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}}},{"kind":"Argument","name":{"kind":"Name","value":"includes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includes"}}}]}]}}]} as unknown as DocumentNode<IngestHasSbomPkgsMutation, IngestHasSbomPkgsMutationVariables>;
export const IngestHasSbomArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSBOMArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMInputSpec"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMIncludesInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSBOMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSBOMs"}}},{"kind":"Argument","name":{"kind":"Name","value":"includes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includes"}}}]}]}}]} as unknown as DocumentNode<IngestHasSbomArtifactsMutation, IngestHasSbomArtifactsMutationVariables>;
export const HasSboMsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}}]} as unknown as DocumentNode<HasSboMsQuery, HasSboMsQueryVariables>;
export const HasSbomListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOMSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOMList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}}]} as unknown as DocumentNode<HasSbomListQuery, HasSbomListQueryVariables>;
export const IngestSlsaForArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSLSAForArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materials"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorBuilderInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slsa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLSAInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materials"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builder"}}},{"kind":"Argument","name":{"kind":"Name","value":"slsa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slsa"}}}]}]}}]} as unknown as DocumentNode<IngestSlsaForArtifactMutation, IngestSlsaForArtifactMutationVariables>;
export const IngestSlsaForArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSLSAForArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materialsList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"builders"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorBuilderInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slsaList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLSAInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSAs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtFromList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materialsList"}}},{"kind":"Argument","name":{"kind":"Name","value":"builtByList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"builders"}}},{"kind":"Argument","name":{"kind":"Name","value":"slsaList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slsaList"}}}]}]}}]} as unknown as DocumentNode<IngestSlsaForArtifactsMutation, IngestSlsaForArtifactsMutationVariables>;
export const HasSlsaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSLSA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSASpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}}]}}]}}]} as unknown as DocumentNode<HasSlsaQuery, HasSlsaQueryVariables>;
export const HasSlsaListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSLSAList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSASpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSAList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSLSATree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}}]}}]}}]} as unknown as DocumentNode<HasSlsaListQuery, HasSlsaListQueryVariables>;
export const IngestHasSourceAtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSourceAt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAt"}}}]}]}}]} as unknown as DocumentNode<IngestHasSourceAtMutation, IngestHasSourceAtMutationVariables>;
export const IngestHasSourcesAtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasSourcesAt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasSourceAts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSourceAts"}}}]}]}}]} as unknown as DocumentNode<IngestHasSourcesAtMutation, IngestHasSourcesAtMutationVariables>;
export const HasSourceAtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQuery, HasSourceAtQueryVariables>;
export const HasSourceAtListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAtList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtListQuery, HasSourceAtListQueryVariables>;
export const IngestHashEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHashEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherArtifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashEqual"}}}]}]}}]} as unknown as DocumentNode<IngestHashEqualMutation, IngestHashEqualMutationVariables>;
export const IngestHashEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHashEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHashEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherArtifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherArtifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"hashEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashEquals"}}}]}]}}]} as unknown as DocumentNode<IngestHashEqualsMutation, IngestHashEqualsMutationVariables>;
export const HashEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualsQuery, HashEqualsQueryVariables>;
export const HashEqualListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqualSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqualList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualListQuery, HashEqualListQueryVariables>;
export const IngestIsDependencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestIsDependency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dependency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencyInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"dependency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dependency"}}}]}]}}]} as unknown as DocumentNode<IngestIsDependencyMutation, IngestIsDependencyMutationVariables>;
export const IngestIsDependenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestIsDependencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depPkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dependencies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencyInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestDependencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"depPkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depPkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"dependencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dependencies"}}}]}]}}]} as unknown as DocumentNode<IngestIsDependenciesMutation, IngestIsDependenciesMutationVariables>;
export const DependenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dependencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencySpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<DependenciesQuery, DependenciesQueryVariables>;
export const DependencyListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DependencyList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencySpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependencyList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<DependencyListQuery, DependencyListQueryVariables>;
export const IngestIsOccurrencePkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestIsOccurrencePkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}}}]}]}}]} as unknown as DocumentNode<IngestIsOccurrencePkgMutation, IngestIsOccurrencePkgMutationVariables>;
export const IngestIsOccurrenceSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestIsOccurrenceSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrence"}}}]}]}}]} as unknown as DocumentNode<IngestIsOccurrenceSrcMutation, IngestIsOccurrenceSrcMutationVariables>;
export const IngestIsOccurrencesPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestIsOccurrencesPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}}}]}]}}]} as unknown as DocumentNode<IngestIsOccurrencesPkgMutation, IngestIsOccurrencesPkgMutationVariables>;
export const IngestIsOccurrencesSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestIsOccurrencesSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOccurrences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}},{"kind":"Argument","name":{"kind":"Name","value":"occurrences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occurrences"}}}]}]}}]} as unknown as DocumentNode<IngestIsOccurrencesSrcMutation, IngestIsOccurrencesSrcMutationVariables>;
export const OccurrencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Occurrences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<OccurrencesQuery, OccurrencesQueryVariables>;
export const OccurrenceListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OccurrenceList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrenceList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<OccurrenceListQuery, OccurrenceListQueryVariables>;
export const IngestLicenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestLicense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"license"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestLicense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"license"},"value":{"kind":"Variable","name":{"kind":"Name","value":"license"}}}]}]}}]} as unknown as DocumentNode<IngestLicenseMutation, IngestLicenseMutationVariables>;
export const IngestLicensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestLicenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"licenses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorLicenseInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestLicenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"licenses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"licenses"}}}]}]}}]} as unknown as DocumentNode<IngestLicensesMutation, IngestLicensesMutationVariables>;
export const LicensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Licenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"licenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"licenseSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<LicensesQuery, LicensesQueryVariables>;
export const LicenseListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LicenseList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LicenseSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"licenseList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"licenseSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}}]} as unknown as DocumentNode<LicenseListQuery, LicenseListQueryVariables>;
export const IngestHasMetadataPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasMetadataPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}]}]}}]} as unknown as DocumentNode<IngestHasMetadataPkgMutation, IngestHasMetadataPkgMutationVariables>;
export const IngestHasMetadataSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasMetadataSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}]}]}}]} as unknown as DocumentNode<IngestHasMetadataSrcMutation, IngestHasMetadataSrcMutationVariables>;
export const IngestHasMetadataArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasMetadataArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifact"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadata"}}}]}]}}]} as unknown as DocumentNode<IngestHasMetadataArtifactMutation, IngestHasMetadataArtifactMutationVariables>;
export const IngestHasMetadataPkgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasMetadataPkgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchFlags"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgMatchType"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}}}]}]}}]} as unknown as DocumentNode<IngestHasMetadataPkgsMutation, IngestHasMetadataPkgsMutationVariables>;
export const IngestHasMetadataSrcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasMetadataSrcs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}}}]}]}}]} as unknown as DocumentNode<IngestHasMetadataSrcsMutation, IngestHasMetadataSrcsMutationVariables>;
export const IngestHasMetadataArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestHasMetadataArtifacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorArtifactInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkHasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subjects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artifacts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pkgMatchType"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pkg"},"value":{"kind":"EnumValue","value":"ALL_VERSIONS"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMetadataList"}}}]}]}}]} as unknown as DocumentNode<IngestHasMetadataArtifactsMutation, IngestHasMetadataArtifactsMutationVariables>;
export const HasMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasMetadataQuery, HasMetadataQueryVariables>;
export const HasMetadataListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasMetadataList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadataSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasMetadataList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasMetadataSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasMetadataListQuery, HasMetadataListQueryVariables>;
export const IngestPackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packageTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"packageNamespaceID"}},{"kind":"Field","name":{"kind":"Name","value":"packageNameID"}},{"kind":"Field","name":{"kind":"Name","value":"packageVersionID"}}]}}]}}]} as unknown as DocumentNode<IngestPackageMutation, IngestPackageMutationVariables>;
export const IngestPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packageTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"packageNamespaceID"}},{"kind":"Field","name":{"kind":"Name","value":"packageNameID"}},{"kind":"Field","name":{"kind":"Name","value":"packageVersionID"}}]}}]}}]} as unknown as DocumentNode<IngestPackagesMutation, IngestPackagesMutationVariables>;
export const PackagesListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackagesList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packagesList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackagesListQuery, PackagesListQueryVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const PackageTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PackageTypesQuery, PackageTypesQueryVariables>;
export const PackageNamespacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageNamespaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}}]}}]}}]}}]} as unknown as DocumentNode<PackageNamespacesQuery, PackageNamespacesQueryVariables>;
export const PackageNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageNames"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackageNamesQuery, PackageNamesQueryVariables>;
export const PackageVersionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackageVersions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PackageVersionsQuery, PackageVersionsQueryVariables>;
export const PathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Path"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPathLength"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPathLength"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPathLength"}}},{"kind":"Argument","name":{"kind":"Name","value":"usingOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PathQuery, PathQueryVariables>;
export const NeighborsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Neighbors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"node"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neighbors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"node"}}},{"kind":"Argument","name":{"kind":"Name","value":"usingOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usingOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NeighborsQuery, NeighborsQueryVariables>;
export const NodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Node"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"node"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"node"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NodeQuery, NodeQueryVariables>;
export const NodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Nodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nodes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyScorecard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSLSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyBad"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyGood"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasSourceAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPointOfContact"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVuln"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyVEXStatement"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllHasMetadata"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllCertifyLegalTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencyType"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllLicenseTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"License"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"inline"}},{"kind":"Field","name":{"kind":"Name","value":"listVersion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyScorecard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyBad"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyGood"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}},{"kind":"Field","name":{"kind":"Name","value":"downloadLocation"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"documentRef"}},{"kind":"Field","name":{"kind":"Name","value":"includedSoftware"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsDependencyTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"includedOccurrences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasSourceAt"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPointOfContact"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PointOfContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"since"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVuln"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyVEXStatement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vexJustification"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"statusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllHasMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllCertifyLegalTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyLegal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"declaredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicense"}},{"kind":"Field","name":{"kind":"Name","value":"discoveredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllLicenseTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attribution"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<NodesQuery, NodesQueryVariables>;
export const IngestPkgEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPkgEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkg"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherPackage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherPackage"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgEqual"}}}]}]}}]} as unknown as DocumentNode<IngestPkgEqualMutation, IngestPkgEqualMutationVariables>;
export const IngestPkgEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestPkgEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherPackages"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorPkgInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pkgEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPkgEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherPackages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherPackages"}}},{"kind":"Argument","name":{"kind":"Name","value":"pkgEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pkgEquals"}}}]}]}}]} as unknown as DocumentNode<IngestPkgEqualsMutation, IngestPkgEqualsMutationVariables>;
export const PkgEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualsQuery, PkgEqualsQueryVariables>;
export const PkgEqualListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEqualList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqualSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqualList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgEqual"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualListQuery, PkgEqualListQueryVariables>;
export const FindSoftwareDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSoftware"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSoftware"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllArtifactTree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<FindSoftwareQuery, FindSoftwareQueryVariables>;
export const QueryPackagesListForScanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryPackagesListForScan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastScan"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queryPackagesListForScan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"queryType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryType"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastScan"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastScan"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllPkgTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"purl"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryPackagesListForScanQuery, QueryPackagesListForScanQueryVariables>;
export const IngestSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sourceTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"sourceNamespaceID"}},{"kind":"Field","name":{"kind":"Name","value":"sourceNameID"}}]}}]}}]} as unknown as DocumentNode<IngestSourceMutation, IngestSourceMutationVariables>;
export const IngestSourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestSources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sources"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorSourceInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sources"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sources"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sourceTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"sourceNamespaceID"}},{"kind":"Field","name":{"kind":"Name","value":"sourceNameID"}}]}}]}}]} as unknown as DocumentNode<IngestSourcesMutation, IngestSourcesMutationVariables>;
export const SourcesListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SourcesList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sourcesList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SourcesListQuery, SourcesListQueryVariables>;
export const SourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllSourceTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllSourceTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SourcesQuery, SourcesQueryVariables>;
export const IngestVulnEqualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnEqual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnEqual"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqualInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherVulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnEqual"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnEqual"}}}]}]}}]} as unknown as DocumentNode<IngestVulnEqualMutation, IngestVulnEqualMutationVariables>;
export const IngestVulnEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnEquals"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqualInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnEquals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"otherVulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherVulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnEquals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnEquals"}}}]}]}}]} as unknown as DocumentNode<IngestVulnEqualsMutation, IngestVulnEqualsMutationVariables>;
export const VulnEqualsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VulnEquals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqualSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnEqualSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VulnEqualsQuery, VulnEqualsQueryVariables>;
export const VulnEqualListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VulnEqualList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqualSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnEqualList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnEqualSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnEqual"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnEqual"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VulnEqualListQuery, VulnEqualListQueryVariables>;
export const IngestVulnHasMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnHasMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnMetadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadataInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerabilityMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerability"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilityMetadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnMetadata"}}}]}]}}]} as unknown as DocumentNode<IngestVulnHasMetadataMutation, IngestVulnHasMetadataMutationVariables>;
export const IngestBulkVulnHasMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestBulkVulnHasMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilityMetadataList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadataInputSpec"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBulkVulnerabilityMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilityMetadataList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulnerabilityMetadataList"}}}]}]}}]} as unknown as DocumentNode<IngestBulkVulnHasMetadataMutation, IngestBulkVulnHasMetadataMutationVariables>;
export const VulnerabilityMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VulnerabilityMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadataSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilityMetadataSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VulnerabilityMetadataQuery, VulnerabilityMetadataQueryVariables>;
export const VulnerabilityMetadataListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VulnerabilityMetadataList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadataSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityMetadataList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnerabilityMetadataSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnMetadataTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnMetadataTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilityMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreType"}},{"kind":"Field","name":{"kind":"Name","value":"scoreValue"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<VulnerabilityMetadataListQuery, VulnerabilityMetadataListQueryVariables>;
export const IngestVulnerabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnerability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vuln"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vuln"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vuln"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityNodeID"}}]}}]}}]} as unknown as DocumentNode<IngestVulnerabilityMutation, IngestVulnerabilityMutationVariables>;
export const IngestVulnerabilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IngestVulnerabilities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vulns"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDorVulnerabilityInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestVulnerabilities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulns"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vulns"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityNodeID"}}]}}]}}]} as unknown as DocumentNode<IngestVulnerabilitiesMutation, IngestVulnerabilitiesMutationVariables>;
export const VulnerabilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Vulnerabilities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilitySpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<VulnerabilitiesQuery, VulnerabilitiesQueryVariables>;
export const VulnerabilityListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VulnerabilityList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VulnerabilitySpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllVulnerabilityTree"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityIDs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vulnerabilityID"}}]}}]}}]} as unknown as DocumentNode<VulnerabilityListQuery, VulnerabilityListQueryVariables>;