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
 * Artifact represents the artifact and contains a digest field
 *
 * Both field are mandatory and canonicalized to be lowercase.
 *
 * If having a `checksum` Go object, `algorithm` can be
 * `strings.ToLower(string(checksum.Algorithm))` and `digest` can be
 * `checksum.Value`.
 */
export type Artifact = {
  __typename?: 'Artifact';
  algorithm: Scalars['String'];
  digest: Scalars['String'];
  id: Scalars['ID'];
};

/**
 * ArtifactInputSpec is the same as Artifact, but used as mutation input.
 *
 * Both arguments will be canonicalized to lowercase.
 */
export type ArtifactInputSpec = {
  algorithm: Scalars['String'];
  digest: Scalars['String'];
};

/**
 * ArtifactSpec allows filtering the list of artifacts to return.
 *
 * Both arguments will be canonicalized to lowercase.
 */
export type ArtifactSpec = {
  algorithm?: InputMaybe<Scalars['String']>;
  digest?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

/**
 * Builder represents the builder such as (FRSCA or github actions).
 *
 * Currently builders are identified by the `uri` field, which is mandatory.
 */
export type Builder = {
  __typename?: 'Builder';
  id: Scalars['ID'];
  uri: Scalars['String'];
};

/** BuilderInputSpec is the same as Builder, but used for mutation ingestion. */
export type BuilderInputSpec = {
  uri: Scalars['String'];
};

/** BuilderSpec allows filtering the list of builders to return. */
export type BuilderSpec = {
  id?: InputMaybe<Scalars['ID']>;
  uri?: InputMaybe<Scalars['String']>;
};

/**
 * CVE represents common vulnerabilities and exposures. It contains the year along
 * with the CVE ID.
 *
 * The year is mandatory.
 *
 * This node is a singleton: backends guarantee that there is exactly one node
 * with the same `year` value.
 */
export type Cve = {
  __typename?: 'CVE';
  cveIds: Array<CveId>;
  id: Scalars['ID'];
  year: Scalars['Int'];
};

/**
 * CVEId is the actual ID that is given to a specific vulnerability
 *
 * The `id` field is mandatory and canonicalized to be lowercase.
 *
 * This node can be referred to by other parts of GUAC.
 */
export type CveId = {
  __typename?: 'CVEId';
  cveId: Scalars['String'];
  id: Scalars['ID'];
};

/** CVEInputSpec is the same as CVESpec, but used for mutation ingestion. */
export type CveInputSpec = {
  cveId: Scalars['String'];
  year: Scalars['Int'];
};

/** CVESpec allows filtering the list of cves to return. */
export type CveSpec = {
  cveId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  year?: InputMaybe<Scalars['Int']>;
};

/**
 * CertifyBad is an attestation represents when a package, source or artifact is considered bad
 *
 * subject - union type that can be either a package, source or artifact object type
 * justification (property) - string value representing why the subject is considered bad
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 *
 * Note: Attestation must occur at the PackageName or the PackageVersion or at the SourceName.
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
 * CertifyBadInputSpec is the same as CertifyBad but for mutation input.
 *
 * All fields are required.
 */
export type CertifyBadInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * CertifyBadSpec allows filtering the list of CertifyBad to return.
 * Note: Package, Source or artifact must be specified but not at the same time
 * For package - a PackageName or PackageVersion must be specified (name or name, version, qualifiers and subpath)
 * For source - a SourceName must be specified (name, tag or commit)
 */
export type CertifyBadSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

/**
 * CertifyGood is an attestation represents when a package, source or artifact is considered good
 *
 * subject - union type that can be either a package, source or artifact object type
 * justification (property) - string value representing why the subject is considered good
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 *
 * Note: Attestation must occur at the PackageName or the PackageVersion or at the SourceName.
 */
export type CertifyGood = {
  __typename?: 'CertifyGood';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  subject: PackageSourceOrArtifact;
};

/**
 * CertifyGoodInputSpec is the same as CertifyGood but for mutation input.
 *
 * All fields are required.
 */
export type CertifyGoodInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * CertifyGoodSpec allows filtering the list of CertifyGood to return.
 * Note: Package, Source or artifact must be specified but not at the same time
 * For package - a PackageName or PackageVersion must be specified (name or name, version, qualifiers and subpath)
 * For source - a SourceName must be specified (name, tag or commit)
 */
export type CertifyGoodSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

/**
 * CertifyScorecard is an attestation which represents the scorecard of a
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

/** CertifyScorecardSpec allows filtering the list of CertifyScorecard to return. */
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
 * CertifyVEXStatement is an attestation that represents when a package or artifact has a VEX about a specific vulnerability (CVE, GHSA or OSV)
 *
 * subject - union type that represents a package or artifact
 * vulnerability (object) - union type that consists of cve, ghsa or osv
 * justification (property) - justification for VEX
 * knownSince (property) - timestamp of the VEX (exact time in RFC 3339 format)
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type CertifyVexStatement = {
  __typename?: 'CertifyVEXStatement';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
  subject: PackageOrArtifact;
  vulnerability: OsvCveOrGhsa;
};

/**
 * CertifyVEXStatementSpec allows filtering the list of CertifyVEXStatement to return.
 * Only package or artifact and CVE, GHSA or OSV can be specified at once.
 */
export type CertifyVexStatementSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  knownSince?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrArtifactSpec>;
  vulnerability?: InputMaybe<OsvCveOrGhsaSpec>;
};

/** CertifyVuln is an attestation that represents when a package has a vulnerability */
export type CertifyVuln = {
  __typename?: 'CertifyVuln';
  id: Scalars['ID'];
  /** metadata (property) - contains all the vulnerability metadata  */
  metadata: VulnerabilityMetaData;
  /** package (subject) - the package object type that represents the package */
  package: Package;
  /** vulnerability (object) - union type that consists of osv, cve or ghsa */
  vulnerability: OsvCveOrGhsa;
};

/**
 * CertifyVulnSpec allows filtering the list of CertifyVuln to return.
 *
 * Specifying just the package allows to query for all vulnerabilities associated with the package.
 * Only OSV, CVE or GHSA can be specified at once
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
  vulnerability?: InputMaybe<OsvCveOrGhsaSpec>;
};

/** CveOrGhsa is a union of CVE and GHSA. */
export type CveOrGhsa = Cve | Ghsa;

/**
 * CveOrGhsaInput allows using CveOrGhsa union as
 * input type to be used in mutations.
 * Exactly one of the value must be set to non-nil.
 */
export type CveOrGhsaInput = {
  cve?: InputMaybe<CveInputSpec>;
  ghsa?: InputMaybe<GhsaInputSpec>;
};

/**
 * CveOrGhsaSpec allows using CveOrGhsa union as
 * input type to be used in read queries.
 * Exactly one of the value must be set to non-nil.
 */
export type CveOrGhsaSpec = {
  cve?: InputMaybe<CveSpec>;
  ghsa?: InputMaybe<GhsaSpec>;
};

/**
 * GHSA represents GitHub security advisories.
 *
 * We create a separate node to allow retrieving all GHSAs.
 */
export type Ghsa = {
  __typename?: 'GHSA';
  ghsaIds: Array<GhsaId>;
  id: Scalars['ID'];
};

/**
 * GHSAId is the actual ID that is given to a specific vulnerability on GitHub
 *
 * The `id` field is mandatory and canonicalized to be lowercase.
 *
 * This node can be referred to by other parts of GUAC.
 */
export type GhsaId = {
  __typename?: 'GHSAId';
  ghsaId: Scalars['String'];
  id: Scalars['ID'];
};

/** GHSAInputSpec is the same as GHSASpec, but used for mutation ingestion. */
export type GhsaInputSpec = {
  ghsaId: Scalars['String'];
};

/**
 * GHSASpec allows filtering the list of GHSA to return.
 *
 * The argument will be canonicalized to lowercase.
 */
export type GhsaSpec = {
  ghsaId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

/**
 * HasSBOM is an attestation represents that a package object or source object has an SBOM associated with a uri
 *
 * subject - union type that can be either a package or source object type
 * uri (property) - identifier string for the SBOM
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 *
 * Note: Only package object or source object can be defined. Not both.
 */
export type HasSbom = {
  __typename?: 'HasSBOM';
  collector: Scalars['String'];
  id: Scalars['ID'];
  origin: Scalars['String'];
  subject: PackageOrSource;
  uri: Scalars['String'];
};

/**
 * HasSBOMInputSpec is the same as HasSBOM but for mutation input.
 *
 * All fields are required.
 */
export type HasSbomInputSpec = {
  collector: Scalars['String'];
  origin: Scalars['String'];
  uri: Scalars['String'];
};

/**
 * HashEqualSpec allows filtering the list of HasSBOM to return.
 *
 * Only the package or source can be added, not both. HasSourceAt will be used to create the package to source
 * relationship.
 */
export type HasSbomSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrSourceSpec>;
  uri?: InputMaybe<Scalars['String']>;
};

/** HasSLSA records that a subject node has a SLSA attestation. */
export type HasSlsa = {
  __typename?: 'HasSLSA';
  id: Scalars['ID'];
  /** The SLSA attestation. */
  slsa: Slsa;
  /** The subject of SLSA attestation: package, source, or artifact. */
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

/**
 * HasSourceAt is an attestation represents that a package object has a source object since a timestamp
 *
 * package (subject) - the package object type that represents the package
 * source (object) - the source object type that represents the source
 * knownSince (property) - timestamp when this was last checked (exact time)
 * justification (property) - string value representing why the package has a source specified
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type HasSourceAt = {
  __typename?: 'HasSourceAt';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
  package: Package;
  source: Source;
};

/**
 * HasSourceAtInputSpec is the same as HasSourceAt but for mutation input.
 *
 * All fields are required.
 */
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

/**
 * HashEqual is an attestation that represents when two artifact hash are similar based on a justification.
 *
 * artifacts (subject) - the artifacts (represented by algorithm and digest) that are equal
 * justification (property) - string value representing why the artifacts are the equal
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type HashEqual = {
  __typename?: 'HashEqual';
  artifacts: Array<Artifact>;
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * HashEqualInputSpec is the same as HashEqual but for mutation input.
 *
 * All fields are required.
 */
export type HashEqualInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * HashEqualSpec allows filtering the list of HashEqual to return.
 *
 * Specifying just the artifacts allows to query for all equivalent artifacts (if they exist)
 */
export type HashEqualSpec = {
  artifacts?: InputMaybe<Array<InputMaybe<ArtifactSpec>>>;
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
};

/**
 * IsDependency is an attestation that represents when a package is dependent on another package
 *
 * package (subject) - the package object type that represents the package
 * dependentPackage (object) - the package object type that represents the packageName (cannot be to the packageVersion)
 * versionRange (property) - string value for version range that applies to the dependent package
 * justification (property) - string value representing why the artifacts are the equal
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type IsDependency = {
  __typename?: 'IsDependency';
  collector: Scalars['String'];
  dependentPackage: Package;
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  package: Package;
  versionRange: Scalars['String'];
};

/**
 * IsDependencyInputSpec is the same as IsDependency but for mutation input.
 *
 * All fields are required.
 */
export type IsDependencyInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  versionRange: Scalars['String'];
};

/**
 * IsDependencySpec allows filtering the list of IsDependency to return.
 *
 * Note: the package object must be defined to return its dependent packages.
 * Dependent Packages must represent the packageName (cannot be the packageVersion)
 */
export type IsDependencySpec = {
  collector?: InputMaybe<Scalars['String']>;
  dependentPackage?: InputMaybe<PkgNameSpec>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<PkgSpec>;
  versionRange?: InputMaybe<Scalars['String']>;
};

/**
 * IsOccurrence is an attestation represents when either a package or source is represented by an artifact
 *
 * Note: Package or Source must be specified but not both at the same time.
 * Attestation must occur at the PackageVersion or at the SourceName.
 */
export type IsOccurrence = {
  __typename?: 'IsOccurrence';
  /** artifact (object) - artifact that represent the the package or source */
  artifact: Artifact;
  /** collector (property) - the GUAC collector that collected the document that generated this attestation */
  collector: Scalars['String'];
  id: Scalars['ID'];
  /** justification (property) - string value representing why the package or source is represented by the specified artifact */
  justification: Scalars['String'];
  /** origin (property) - where this attestation was generated from (based on which document) */
  origin: Scalars['String'];
  /** subject - union type that can be either a package or source object type */
  subject: PackageOrSource;
};

/**
 * IsOccurrenceInputSpec is the same as IsOccurrence but for mutation input.
 *
 * All fields are required.
 */
export type IsOccurrenceInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * IsOccurrenceSpec allows filtering the list of IsOccurrence to return.
 * Note: Package or Source must be specified but not both at the same time
 * For package - PackageVersion must be specified (version, qualifiers and subpath)
 * or it defaults to empty string for version, subpath and empty list for qualifiers
 * For source - a SourceName must be specified (name, tag or commit)
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
 * IsVulnerability is an attestation that represents when an OSV ID represents a CVE or GHSA
 *
 * osv (subject) - the osv object type that represents OSV and its ID
 * vulnerability (object) - union type that consists of cve or ghsa
 * justification (property) - the reason why the osv ID represents the cve or ghsa
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type IsVulnerability = {
  __typename?: 'IsVulnerability';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  osv: Osv;
  vulnerability: CveOrGhsa;
};

/**
 * IsVulnerabilityInputSpec is the same as IsVulnerability but for mutation input.
 *
 * All fields are required.
 */
export type IsVulnerabilityInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * IsVulnerabilitySpec allows filtering the list of IsVulnerability to return.
 * Only CVE or GHSA can be specified at once.
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
  /** Certifies the Scorecard scanning of a source repository */
  certifyScorecard: CertifyScorecard;
  /** Ingest a new artifact. Returns the ingested artifact */
  ingestArtifact: Artifact;
  /** Ingest a new builder. Returns the ingested builder */
  ingestBuilder: Builder;
  /** Ingest a new CVE. Returns the ingested object */
  ingestCVE: Cve;
  /** Adds a certification that a package, source or artifact is considered bad */
  ingestCertifyBad: CertifyBad;
  /** Adds a certification that a package, source or artifact is considered good */
  ingestCertifyGood: CertifyGood;
  /** Adds dependency between two packages */
  ingestDependency: IsDependency;
  /** Ingest a new GHSA. Returns the ingested object */
  ingestGHSA: Ghsa;
  /** Certifies that a package or a source has SBOM at the URI */
  ingestHasSBOM: HasSbom;
  /** Adds a certification that a package (either at the version level or package name level) is associated with the source */
  ingestHasSourceAt: HasSourceAt;
  /** certify that two artifacts are the same (hashes are equal) */
  ingestHashEqual: HashEqual;
  /** certify that a OSV is associated with either a CVE or GHSA */
  ingestIsVulnerability: IsVulnerability;
  /**
   * Ingests a set of packages, sources, and artifacts.
   *
   * This is a helper mutation for ingesting SLSA nodes. It should be more
   * efficient to call this method to ingest a set materials instead of ingesting
   * them one by one.
   */
  ingestMaterials: Array<Artifact>;
  /** Ingest a new OSV. Returns the ingested object */
  ingestOSV: Osv;
  /** Adds an artifact as an occurrence for either a package or a source */
  ingestOccurrence: IsOccurrence;
  /** Ingest a new package. Returns the ingested package trie */
  ingestPackage: Package;
  /** Adds a certification that two packages are similar */
  ingestPkgEqual: PkgEqual;
  /**
   * Ingests a SLSA attestation.
   *
   * Note that materials and builder are extracted as separate arguments. This is
   * because this ingestion method assumes that the subject and the materials are
   * already ingested and only creates the SLSA node.
   */
  ingestSLSA: HasSlsa;
  /** Ingest a new source. Returns the ingested source trie */
  ingestSource: Source;
  /** certify that an either a package or artifact has an associated VEX for a CVE, GHSA or OSV */
  ingestVEXStatement: CertifyVexStatement;
  /** certify that a package is vulnerable to a vulnerability (OSV, CVE or GHSA) */
  ingestVulnerability: CertifyVuln;
};


export type MutationCertifyScorecardArgs = {
  scorecard: ScorecardInputSpec;
  source: SourceInputSpec;
};


export type MutationIngestArtifactArgs = {
  artifact?: InputMaybe<ArtifactInputSpec>;
};


export type MutationIngestBuilderArgs = {
  builder?: InputMaybe<BuilderInputSpec>;
};


export type MutationIngestCveArgs = {
  cve?: InputMaybe<CveInputSpec>;
};


export type MutationIngestCertifyBadArgs = {
  certifyBad: CertifyBadInputSpec;
  pkgMatchType?: InputMaybe<MatchFlags>;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestCertifyGoodArgs = {
  certifyGood: CertifyGoodInputSpec;
  pkgMatchType?: InputMaybe<MatchFlags>;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestDependencyArgs = {
  depPkg: PkgInputSpec;
  dependency: IsDependencyInputSpec;
  pkg: PkgInputSpec;
};


export type MutationIngestGhsaArgs = {
  ghsa?: InputMaybe<GhsaInputSpec>;
};


export type MutationIngestHasSbomArgs = {
  hasSBOM: HasSbomInputSpec;
  subject: PackageOrSourceInput;
};


export type MutationIngestHasSourceAtArgs = {
  hasSourceAt: HasSourceAtInputSpec;
  pkg: PkgInputSpec;
  pkgMatchType: MatchFlags;
  source: SourceInputSpec;
};


export type MutationIngestHashEqualArgs = {
  artifact: ArtifactInputSpec;
  equalArtifact: ArtifactInputSpec;
  hashEqual: HashEqualInputSpec;
};


export type MutationIngestIsVulnerabilityArgs = {
  isVulnerability: IsVulnerabilityInputSpec;
  osv: OsvInputSpec;
  vulnerability: CveOrGhsaInput;
};


export type MutationIngestMaterialsArgs = {
  materials: Array<ArtifactInputSpec>;
};


export type MutationIngestOsvArgs = {
  osv?: InputMaybe<OsvInputSpec>;
};


export type MutationIngestOccurrenceArgs = {
  artifact: ArtifactInputSpec;
  occurrence: IsOccurrenceInputSpec;
  subject: PackageOrSourceInput;
};


export type MutationIngestPackageArgs = {
  pkg: PkgInputSpec;
};


export type MutationIngestPkgEqualArgs = {
  depPkg: PkgInputSpec;
  pkg: PkgInputSpec;
  pkgEqual: PkgEqualInputSpec;
};


export type MutationIngestSlsaArgs = {
  builtBy: BuilderInputSpec;
  builtFrom: Array<ArtifactInputSpec>;
  slsa: SlsaInputSpec;
  subject: ArtifactInputSpec;
};


export type MutationIngestSourceArgs = {
  source: SourceInputSpec;
};


export type MutationIngestVexStatementArgs = {
  subject: PackageOrArtifactInput;
  vexStatement: VexStatementInputSpec;
  vulnerability: OsvCveOrGhsaInput;
};


export type MutationIngestVulnerabilityArgs = {
  certifyVuln: VulnerabilityMetaDataInput;
  pkg: PkgInputSpec;
  vulnerability: OsvCveOrGhsaInput;
};

/**
 * Node is a union type of all the possible nodes.
 *
 * It encapsulates the software tree nodes along with the evidence nodes. In a
 * path query, all connecting evidence nodes along with their intermediate subject
 * nodes need to be returned in order to create a complete graph.
 */
export type Node = Artifact | Builder | Cve | CertifyBad | CertifyGood | CertifyScorecard | CertifyVexStatement | CertifyVuln | Ghsa | HasSbom | HasSlsa | HasSourceAt | HashEqual | IsDependency | IsOccurrence | IsVulnerability | Osv | Package | PkgEqual | Source;

/**
 * OSV represents an Open Source Vulnerability.
 *
 * We create a separate node to allow retrieving all OSVs.
 */
export type Osv = {
  __typename?: 'OSV';
  id: Scalars['ID'];
  osvIds: Array<OsvId>;
};

/**
 * OSVId is the actual ID that is given to a specific vulnerability.
 *
 * The `osvId` field is mandatory and canonicalized to be lowercase.
 *
 * This maps to a vulnerability ID specific to the environment (e.g., GHSA ID or
 * CVE ID).
 *
 * This node can be referred to by other parts of GUAC.
 */
export type OsvId = {
  __typename?: 'OSVId';
  id: Scalars['ID'];
  osvId: Scalars['String'];
};

/** OSVInputSpec is the same as OSVSpec, but used for mutation ingestion. */
export type OsvInputSpec = {
  osvId: Scalars['String'];
};

/** OSVSpec allows filtering the list of OSV to return. */
export type OsvSpec = {
  id?: InputMaybe<Scalars['ID']>;
  osvId?: InputMaybe<Scalars['String']>;
};

/** OsvCveGhsaObject is a union of OSV, CVE and GHSA. Any of these objects can be specified for vulnerability */
export type OsvCveOrGhsa = Cve | Ghsa | Osv;

/**
 * OsvCveOrGhsaInput allows using OsvCveOrGhsa union as
 * input type to be used in mutations.
 * Exactly one of the value must be set to non-nil.
 */
export type OsvCveOrGhsaInput = {
  cve?: InputMaybe<CveInputSpec>;
  ghsa?: InputMaybe<GhsaInputSpec>;
  osv?: InputMaybe<OsvInputSpec>;
};

/**
 * OsvCveOrGhsaSpec allows using OsvCveOrGhsa union as
 * input type to be used in read queries.
 * Exactly one of the value must be set to non-nil.
 */
export type OsvCveOrGhsaSpec = {
  cve?: InputMaybe<CveSpec>;
  ghsa?: InputMaybe<GhsaSpec>;
  osv?: InputMaybe<OsvSpec>;
};

/**
 * Package represents a package.
 *
 * In the pURL representation, each Package matches a `pkg:<type>` partial pURL.
 * The `type` field matches the pURL types but we might also use `"guac"` for the
 * cases where the pURL representation is not complete or when we have custom
 * rules.
 *
 * This node is a singleton: backends guarantee that there is exactly one node
 * with the same `type` value.
 *
 * Also note that this is named `Package`, not `PackageType`. This is only to make
 * queries more readable.
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
 * `pkg:<type>/<namespace>/<name>` pURL.
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
 * `pkg:<type>/<namespace>/` partial pURL.
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

/** PackageOrArtifact is a union of Package and Artifact. Any of these objects can be specified */
export type PackageOrArtifact = Artifact | Package;

/**
 * PackageOrArtifactInput allows using PackageOrArtifact union as
 * input type to be used in mutations.
 * Exactly one of the value must be set to non-nil.
 */
export type PackageOrArtifactInput = {
  artifact?: InputMaybe<ArtifactInputSpec>;
  package?: InputMaybe<PkgInputSpec>;
};

/**
 * PackageOrArtifactSpec allows using PackageOrArtifact union as
 * input type to be used in read queries.
 * Exactly one of the value must be set to non-nil.
 */
export type PackageOrArtifactSpec = {
  artifact?: InputMaybe<ArtifactSpec>;
  package?: InputMaybe<PkgSpec>;
};

/** PackageOrSource is a union of Package and Source. Any of these objects can be specified */
export type PackageOrSource = Package | Source;

/**
 * PackageOrSourceInput allows using PackageOrSource union as
 * input type to be used in mutations.
 * Exactly one of the value must be set to non-nil.
 */
export type PackageOrSourceInput = {
  package?: InputMaybe<PkgInputSpec>;
  source?: InputMaybe<SourceInputSpec>;
};

/**
 * PackageOrSourceSpec allows using PackageOrSource union as
 * input type to be used in read queries.
 * Exactly one of the value must be set to non-nil.
 */
export type PackageOrSourceSpec = {
  package?: InputMaybe<PkgSpec>;
  source?: InputMaybe<SourceSpec>;
};

/**
 * PackageQualifier is a qualifier for a package, a key-value pair.
 *
 * In the pURL representation, it is a part of the `<qualifiers>` part of the
 * `pkg:<type>/<namespace>/<name>@<version>?<qualifiers>` pURL.
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

/**
 * PackageQualifierInputSpec is the same as PackageQualifier, but usable as
 * mutation input.
 *
 * GraphQL does not allow input types to contain composite types and does not allow
 * composite types to contain input types. So, although in this case these two
 * types are semantically the same, we have to duplicate the definition.
 *
 * Both fields are mandatory.
 */
export type PackageQualifierInputSpec = {
  key: Scalars['String'];
  value: Scalars['String'];
};

/**
 * PackageQualifierSpec is the same as PackageQualifier, but usable as query
 * input.
 *
 * GraphQL does not allow input types to contain composite types and does not allow
 * composite types to contain input types. So, although in this case these two
 * types are semantically the same, we have to duplicate the definition.
 *
 * Keys are mandatory, but values could also be `null` if we want to match all
 * values for a specific key.
 *
 * TODO(mihaimaruseac): Formalize empty vs null when the schema is fully done
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
 * `pkg:<type>/<namespace>/<name>@<version>` pURL.
 *
 * Versions are optional and each Package type defines own rules for handling them.
 * For this level of GUAC, these are just opaque strings.
 *
 * This node can be referred to by other parts of GUAC.
 *
 * Subpath and qualifiers are optional. Lack of qualifiers is represented by an
 * empty list and lack of subpath by empty string (to be consistent with
 * optionality of namespace and version). Two nodes that have different qualifiers
 * and/or subpath but the same version mean two different packages in the trie
 * (they are different). Two nodes that have same version but qualifiers of one are
 * a subset of the qualifier of the other also mean two different packages in the
 * trie.
 */
export type PackageVersion = {
  __typename?: 'PackageVersion';
  id: Scalars['ID'];
  qualifiers: Array<PackageQualifier>;
  subpath: Scalars['String'];
  version: Scalars['String'];
};

/**
 * PkgEqual is an attestation that represents when a package objects are similar
 *
 * packages (subject) - list of package objects
 * justification (property) - string value representing why the packages are similar
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type PkgEqual = {
  __typename?: 'PkgEqual';
  collector: Scalars['String'];
  id: Scalars['ID'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  packages: Array<Package>;
};

/**
 * PkgEqualInputSpec is the same as PkgEqual but for mutation input.
 *
 * All fields are required.
 */
export type PkgEqualInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * PkgEqualSpec allows filtering the list of PkgEqual to return.
 *
 * Specifying just the package allows to query for all similar packages (if they exist)
 */
export type PkgEqualSpec = {
  collector?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  packages?: InputMaybe<Array<InputMaybe<PkgSpec>>>;
};

/**
 * PkgInputSpec specifies a package for a mutation.
 *
 * This is different than PkgSpec because we want to encode mandatory fields:
 * `type` and `name`. All optional fields are given empty default values.
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
 * specific version or package name
 */
export enum PkgMatchType {
  AllVersions = 'ALL_VERSIONS',
  SpecificVersion = 'SPECIFIC_VERSION'
}

/**
 * PkgNameSpec is used for IsDependency to input dependent packages. This is different from PkgSpec
 * as the IsDependency attestation should only be allowed to be made to the packageName node and not the
 * packageVersion node. Versions will be handled by the version_range in the IsDependency attestation node.
 */
export type PkgNameSpec = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/**
 * PkgSpec allows filtering the list of packages to return.
 *
 * Each field matches a qualifier from pURL. Use `null` to match on all values at
 * that level. For example, to get all packages in GUAC backend, use a PkgSpec
 * where every field is `null`.
 *
 * Empty string at a field means matching with the empty string. If passing in
 * qualifiers, all of the values in the list must match. Since we want to return
 * nodes with any number of qualifiers if no qualifiers are passed in the input, we
 * must also return the same set of nodes it the qualifiers list is empty. To match
 * on nodes that don't contain any qualifier, set `matchOnlyEmptyQualifiers` to
 * true. If this field is true, then the qualifiers argument is ignored.
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

export type Query = {
  __typename?: 'Query';
  /** Returns all CertifyBad */
  CertifyBad: Array<CertifyBad>;
  /** Returns all CertifyGood */
  CertifyGood: Array<CertifyGood>;
  /** Returns all CertifyVEXStatement */
  CertifyVEXStatement: Array<CertifyVexStatement>;
  /** Returns all CertifyVuln */
  CertifyVuln: Array<CertifyVuln>;
  /** Returns all HasSBOM */
  HasSBOM: Array<HasSbom>;
  /** Returns all SLSA attestations matching the filter */
  HasSLSA: Array<HasSlsa>;
  /** Returns all HasSourceAt */
  HasSourceAt: Array<HasSourceAt>;
  /** Returns all HashEqual */
  HashEqual: Array<HashEqual>;
  /** Returns all IsDependency */
  IsDependency: Array<IsDependency>;
  /** Returns all IsOccurrence */
  IsOccurrence: Array<IsOccurrence>;
  /** Returns all IsVulnerability */
  IsVulnerability: Array<IsVulnerability>;
  /** Returns all PkgEqual */
  PkgEqual: Array<PkgEqual>;
  /** Returns all artifacts */
  artifacts: Array<Artifact>;
  /** Returns all builders */
  builders: Array<Builder>;
  /** Returns all CVEs */
  cve: Array<Cve>;
  /** Returns all GHSA nodes */
  ghsa: Array<Ghsa>;
  /**
   * neighbors returns all the direct neighbors of a node
   *
   * Similarly, the input is only specified by its ID.
   */
  neighbors: Array<Node>;
  /** Returns all OSV */
  osv: Array<Osv>;
  /** Returns all packages */
  packages: Array<Package>;
  /**
   * path query returns a path between subject and target, of a maximum length
   *
   * Since we want to uniquely identify endpoints, nodes must be specified by
   * valid IDs only (instead of using filters/input spec structs).
   */
  path: Array<Node>;
  /** Returns all Scorecard certifications matching the filter */
  scorecards: Array<CertifyScorecard>;
  /** Returns all sources */
  sources: Array<Source>;
};


export type QueryCertifyBadArgs = {
  certifyBadSpec?: InputMaybe<CertifyBadSpec>;
};


export type QueryCertifyGoodArgs = {
  certifyGoodSpec?: InputMaybe<CertifyGoodSpec>;
};


export type QueryCertifyVexStatementArgs = {
  certifyVEXStatementSpec?: InputMaybe<CertifyVexStatementSpec>;
};


export type QueryCertifyVulnArgs = {
  certifyVulnSpec?: InputMaybe<CertifyVulnSpec>;
};


export type QueryHasSbomArgs = {
  hasSBOMSpec?: InputMaybe<HasSbomSpec>;
};


export type QueryHasSlsaArgs = {
  hasSLSASpec?: InputMaybe<HasSlsaSpec>;
};


export type QueryHasSourceAtArgs = {
  hasSourceAtSpec?: InputMaybe<HasSourceAtSpec>;
};


export type QueryHashEqualArgs = {
  hashEqualSpec?: InputMaybe<HashEqualSpec>;
};


export type QueryIsDependencyArgs = {
  isDependencySpec?: InputMaybe<IsDependencySpec>;
};


export type QueryIsOccurrenceArgs = {
  isOccurrenceSpec?: InputMaybe<IsOccurrenceSpec>;
};


export type QueryIsVulnerabilityArgs = {
  isVulnerabilitySpec?: InputMaybe<IsVulnerabilitySpec>;
};


export type QueryPkgEqualArgs = {
  pkgEqualSpec?: InputMaybe<PkgEqualSpec>;
};


export type QueryArtifactsArgs = {
  artifactSpec?: InputMaybe<ArtifactSpec>;
};


export type QueryBuildersArgs = {
  builderSpec?: InputMaybe<BuilderSpec>;
};


export type QueryCveArgs = {
  cveSpec?: InputMaybe<CveSpec>;
};


export type QueryGhsaArgs = {
  ghsaSpec?: InputMaybe<GhsaSpec>;
};


export type QueryNeighborsArgs = {
  node: Scalars['ID'];
};


export type QueryOsvArgs = {
  osvSpec?: InputMaybe<OsvSpec>;
};


export type QueryPackagesArgs = {
  pkgSpec?: InputMaybe<PkgSpec>;
};


export type QueryPathArgs = {
  maxPathLength: Scalars['Int'];
  subject: Scalars['ID'];
  target: Scalars['ID'];
};


export type QueryScorecardsArgs = {
  scorecardSpec?: InputMaybe<CertifyScorecardSpec>;
};


export type QuerySourcesArgs = {
  sourceSpec?: InputMaybe<SourceSpec>;
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
  /** Sources of the build resulting in subject (materials) */
  builtFrom: Array<Artifact>;
  /** GUAC collector for the document */
  collector: Scalars['String'];
  /** Timestamp (RFC3339Nano format) of build end time */
  finishedOn: Scalars['Time'];
  /** Document from which this attestation is generated from */
  origin: Scalars['String'];
  /** Individual predicates found in the attestation */
  slsaPredicate: Array<SlsaPredicate>;
  /** Version of the SLSA predicate */
  slsaVersion: Scalars['String'];
  /** Timestamp (RFC3339Nano format) of build start time */
  startedOn: Scalars['Time'];
};

/**
 * SLSAInputSpec is the same as SLSA but for mutation input.
 *
 * All fields are required.
 */
export type SlsaInputSpec = {
  buildType: Scalars['String'];
  collector: Scalars['String'];
  finishedOn: Scalars['Time'];
  origin: Scalars['String'];
  slsaPredicate: Array<SlsaPredicateInputSpec>;
  slsaVersion: Scalars['String'];
  startedOn: Scalars['Time'];
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
 *
 * TODO(mihaimaruseac): Can we define these directly?
 */
export type SlsaPredicate = {
  __typename?: 'SLSAPredicate';
  key: Scalars['String'];
  value: Scalars['String'];
};

/**
 * SLSAPredicateInputSpec is the same as SLSAPredicateSpec, but for mutation
 * input.
 */
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

/** ScorecardCheckInputSpec is the same as ScorecardCheck, but for mutation input. */
export type ScorecardCheckInputSpec = {
  check: Scalars['String'];
  score: Scalars['Int'];
};

/** ScorecardCheckSpec is the same as ScorecardCheck, but usable as query input. */
export type ScorecardCheckSpec = {
  check: Scalars['String'];
  score: Scalars['Int'];
};

/**
 * ScorecardInputSpec is the same as Scorecard but for mutation input.
 *
 * All fields are required.
 */
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
 * Source represents a source.
 *
 * This can be the version control system that is being used.
 *
 * This node is a singleton: backends guarantee that there is exactly one node
 * with the same `type` value.
 *
 * Also note that this is named `Source`, not `SourceType`. This is only to make
 * queries more readable.
 */
export type Source = {
  __typename?: 'Source';
  id: Scalars['ID'];
  namespaces: Array<SourceNamespace>;
  type: Scalars['String'];
};

/**
 * SourceInputSpec specifies a source for a mutation.
 *
 * This is different than SourceSpec because we want to encode that all fields
 * except tag and commit are mandatory fields. All optional fields are given
 * empty default values.
 *
 * It is an error to set both `tag` and `commit` fields to values different than
 * the default.
 */
export type SourceInputSpec = {
  commit?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  namespace: Scalars['String'];
  tag?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

/**
 * SourceName is a url of the repository and its tag or commit.
 *
 * The `name` field is mandatory. The `tag` and `commit` fields are optional, but
 * it is an error to specify both.
 *
 * This is the only source trie node that can be referenced by other parts of
 * GUAC.
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
 * The `namespace` field is mandatory.
 */
export type SourceNamespace = {
  __typename?: 'SourceNamespace';
  id: Scalars['ID'];
  names: Array<SourceName>;
  namespace: Scalars['String'];
};

/**
 * SourceSpec allows filtering the list of sources to return.
 *
 * Empty string at a field means matching with the empty string. Missing field
 * means retrieving all possible matches.
 *
 * It is an error to specify both `tag` and `commit` fields, except it both are
 * set as empty string (in which case the returned sources are only those for
 * which there is no tag/commit information).
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
 * VexStatementInputSpec is the same as CertifyVEXStatement but for mutation input.
 *
 * All fields are required.
 */
export type VexStatementInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
};

export type VulnerabilityMetaData = {
  __typename?: 'VulnerabilityMetaData';
  /** collector (property) - the GUAC collector that collected the document that generated this attestation */
  collector: Scalars['String'];
  /** dbUri (property) - scanner vulnerability database uri */
  dbUri: Scalars['String'];
  /** dbVersion (property) - scanner vulnerability database version */
  dbVersion: Scalars['String'];
  /** origin (property) - where this attestation was generated from (based on which document) */
  origin: Scalars['String'];
  /** scannerUri (property) - vulnerability scanner's uri */
  scannerUri: Scalars['String'];
  /** scannerVersion (property) - vulnerability scanner version */
  scannerVersion: Scalars['String'];
  /** timeScanned (property) - timestamp of when the package was last scanned */
  timeScanned: Scalars['Time'];
};

/**
 * VulnerabilityInputSpec is the same as VulnerabilityMetaData but for mutation input.
 *
 * All fields are required.
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

export type AllArtifactTreeFragment = { __typename?: 'Artifact', id: string, algorithm: string, digest: string } & { ' $fragmentName'?: 'AllArtifactTreeFragment' };

export type ArtifactQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type ArtifactQ1Query = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type ArtifactQ2Query = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type ArtifactQ3Query = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type ArtifactQ4Query = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type ArtifactQ5Query = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type ArtifactM1MutationVariables = Exact<{ [key: string]: never; }>;


export type ArtifactM1Mutation = { __typename?: 'Mutation', ingestArtifact: (
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) };

export type ArtifactM2MutationVariables = Exact<{ [key: string]: never; }>;


export type ArtifactM2Mutation = { __typename?: 'Mutation', ingestArtifact: (
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) };

export type AllBuilderTreeFragment = { __typename?: 'Builder', id: string, uri: string } & { ' $fragmentName'?: 'AllBuilderTreeFragment' };

export type BuilderQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type BuilderQ1Query = { __typename?: 'Query', builders: Array<{ __typename?: 'Builder', id: string, uri: string }> };

export type BuilderQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type BuilderQ2Query = { __typename?: 'Query', builders: Array<{ __typename?: 'Builder', id: string, uri: string }> };

export type BuilderM1MutationVariables = Exact<{ [key: string]: never; }>;


export type BuilderM1Mutation = { __typename?: 'Mutation', ingestBuilder: { __typename?: 'Builder', id: string, uri: string } };

export type AllCertifyBadTreeFragment = { __typename?: 'CertifyBad', id: string, justification: string, origin: string, collector: string, subject: { __typename: 'Artifact', id: string, algorithm: string, digest: string } | { __typename: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllCertifyBadTreeFragment' };

export type CertifactBadQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactBadQ1Query = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  )> };

export type CertifactBadQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactBadQ2Query = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  )> };

export type CertifactBadQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactBadQ3Query = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  )> };

export type CertifactBadQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactBadQ4Query = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  )> };

export type CertifactBadQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactBadQ5Query = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  )> };

export type CertifactBadQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactBadQ6Query = { __typename?: 'Query', CertifyBad: Array<(
    { __typename?: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  )> };

export type AllCertifyGoodTreeFragment = { __typename?: 'CertifyGood', id: string, justification: string, origin: string, collector: string, subject: { __typename: 'Artifact', id: string, algorithm: string, digest: string } | { __typename: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllCertifyGoodTreeFragment' };

export type CertifactGoodQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactGoodQ1Query = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  )> };

export type CertifactGoodQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactGoodQ2Query = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  )> };

export type CertifactGoodQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactGoodQ3Query = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  )> };

export type CertifactGoodQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactGoodQ4Query = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  )> };

export type CertifactGoodQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactGoodQ5Query = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  )> };

export type CertifactGoodQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifactGoodQ6Query = { __typename?: 'Query', CertifyGood: Array<(
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  )> };

export type CertifyGoodM1MutationVariables = Exact<{ [key: string]: never; }>;


export type CertifyGoodM1Mutation = { __typename?: 'Mutation', ingestCertifyGood: (
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  ) };

export type CertifyGoodM2MutationVariables = Exact<{ [key: string]: never; }>;


export type CertifyGoodM2Mutation = { __typename?: 'Mutation', ingestCertifyGood: (
    { __typename?: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  ) };

export type AllCertifyScorecardTreeFragment = { __typename?: 'CertifyScorecard', id: string, source: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ), scorecard: { __typename?: 'Scorecard', timeScanned: any, aggregateScore: number, scorecardVersion: string, scorecardCommit: string, origin: string, collector: string, checks: Array<{ __typename?: 'ScorecardCheck', check: string, score: number }> } } & { ' $fragmentName'?: 'AllCertifyScorecardTreeFragment' };

export type ScorecardQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type ScorecardQ1Query = { __typename?: 'Query', scorecards: Array<(
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardTreeFragment': AllCertifyScorecardTreeFragment } }
  )> };

export type ScorecardQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type ScorecardQ2Query = { __typename?: 'Query', scorecards: Array<(
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardTreeFragment': AllCertifyScorecardTreeFragment } }
  )> };

export type ScorecardQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type ScorecardQ3Query = { __typename?: 'Query', scorecards: Array<(
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardTreeFragment': AllCertifyScorecardTreeFragment } }
  )> };

export type ScorecardQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type ScorecardQ4Query = { __typename?: 'Query', scorecards: Array<(
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardTreeFragment': AllCertifyScorecardTreeFragment } }
  )> };

export type ScorecardMutationVariables = Exact<{
  source: SourceInputSpec;
  scorecard: ScorecardInputSpec;
}>;


export type ScorecardMutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ), certifyScorecard: (
    { __typename?: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardTreeFragment': AllCertifyScorecardTreeFragment } }
  ) };

export type AllCertifyVexStatementTreeFragment = { __typename?: 'CertifyVEXStatement', id: string, justification: string, knownSince: any, origin: string, collector: string, subject: { __typename: 'Artifact', id: string, algorithm: string, digest: string } | { __typename: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, vulnerability: { __typename: 'CVE', id: string, year: number, cveIds: Array<{ __typename?: 'CVEId', id: string, cveId: string }> } | { __typename: 'GHSA', id: string, ghsaIds: Array<{ __typename?: 'GHSAId', id: string, ghsaId: string }> } | { __typename: 'OSV', id: string, osvIds: Array<{ __typename?: 'OSVId', id: string, osvId: string }> } } & { ' $fragmentName'?: 'AllCertifyVexStatementTreeFragment' };

export type CertifyVexStatementQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ1Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ2Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ3Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ4Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ5Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ6Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ7QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ7Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ8QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ8Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ9QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ9Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type CertifyVexStatementQ10QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVexStatementQ10Query = { __typename?: 'Query', CertifyVEXStatement: Array<(
    { __typename?: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  )> };

export type AllCertifyVulnTreeFragment = { __typename?: 'CertifyVuln', id: string, package: { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, vulnerability: { __typename: 'CVE', id: string, year: number, cveIds: Array<{ __typename?: 'CVEId', id: string, cveId: string }> } | { __typename: 'GHSA', id: string, ghsaIds: Array<{ __typename?: 'GHSAId', id: string, ghsaId: string }> } | { __typename: 'OSV', id: string, osvIds: Array<{ __typename?: 'OSVId', id: string, osvId: string }> }, metadata: { __typename?: 'VulnerabilityMetaData', dbUri: string, dbVersion: string, scannerUri: string, scannerVersion: string, timeScanned: any, origin: string, collector: string } } & { ' $fragmentName'?: 'AllCertifyVulnTreeFragment' };

export type CertifyVulnQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ1Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type CertifyVulnQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ2Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type CertifyVulnQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ3Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type CertifyVulnQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ4Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type CertifyVulnQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ5Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type CertifyVulnQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ6Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type CertifyVulnQ7QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyVulnQ7Query = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type AllCveTreeFragment = { __typename?: 'CVE', id: string, year: number, cveIds: Array<{ __typename?: 'CVEId', id: string, cveId: string }> } & { ' $fragmentName'?: 'AllCveTreeFragment' };

export type AllGhsaTreeFragment = { __typename?: 'GHSA', id: string, ghsaIds: Array<{ __typename?: 'GHSAId', id: string, ghsaId: string }> } & { ' $fragmentName'?: 'AllGhsaTreeFragment' };

export type AllOsvTreeFragment = { __typename?: 'OSV', id: string, osvIds: Array<{ __typename?: 'OSVId', id: string, osvId: string }> } & { ' $fragmentName'?: 'AllOsvTreeFragment' };

export type Cveq1QueryVariables = Exact<{ [key: string]: never; }>;


export type Cveq1Query = { __typename?: 'Query', cve: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type Cveq2QueryVariables = Exact<{ [key: string]: never; }>;


export type Cveq2Query = { __typename?: 'Query', cve: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type Cveq3QueryVariables = Exact<{ [key: string]: never; }>;


export type Cveq3Query = { __typename?: 'Query', cve: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type Cveq4QueryVariables = Exact<{ [key: string]: never; }>;


export type Cveq4Query = { __typename?: 'Query', cve: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type Cvem1MutationVariables = Exact<{ [key: string]: never; }>;


export type Cvem1Mutation = { __typename?: 'Mutation', ingestCVE: (
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) };

export type Cvem2MutationVariables = Exact<{ [key: string]: never; }>;


export type Cvem2Mutation = { __typename?: 'Mutation', ingestCVE: (
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) };

export type Ghsaq1QueryVariables = Exact<{ [key: string]: never; }>;


export type Ghsaq1Query = { __typename?: 'Query', ghsa: Array<(
    { __typename?: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  )> };

export type Ghsaq2QueryVariables = Exact<{ [key: string]: never; }>;


export type Ghsaq2Query = { __typename?: 'Query', ghsa: Array<(
    { __typename?: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  )> };

export type Ghsam1MutationVariables = Exact<{ [key: string]: never; }>;


export type Ghsam1Mutation = { __typename?: 'Mutation', ingestGHSA: (
    { __typename?: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) };

export type Osvq1QueryVariables = Exact<{ [key: string]: never; }>;


export type Osvq1Query = { __typename?: 'Query', osv: Array<(
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  )> };

export type Osvq2QueryVariables = Exact<{ [key: string]: never; }>;


export type Osvq2Query = { __typename?: 'Query', osv: Array<(
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  )> };

export type Osvq3QueryVariables = Exact<{ [key: string]: never; }>;


export type Osvq3Query = { __typename?: 'Query', osv: Array<(
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  )> };

export type Osvm1MutationVariables = Exact<{ [key: string]: never; }>;


export type Osvm1Mutation = { __typename?: 'Mutation', ingestOSV: (
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) };

export type Osvm2MutationVariables = Exact<{ [key: string]: never; }>;


export type Osvm2Mutation = { __typename?: 'Mutation', ingestOSV: (
    { __typename?: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) };

export type AllHasSbomTreeFragment = { __typename?: 'HasSBOM', id: string, uri: string, origin: string, collector: string, subject: { __typename: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllHasSbomTreeFragment' };

export type HasSbomq1QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSbomq1Query = { __typename?: 'Query', HasSBOM: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type HasSbomq2QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSbomq2Query = { __typename?: 'Query', HasSBOM: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type HasSbomq3QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSbomq3Query = { __typename?: 'Query', HasSBOM: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type HasSbomq4QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSbomq4Query = { __typename?: 'Query', HasSBOM: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type HasSbomq5QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSbomq5Query = { __typename?: 'Query', HasSBOM: Array<(
    { __typename?: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  )> };

export type AllHasSlsaTreeFragment = { __typename?: 'HasSLSA', id: string, subject: { __typename?: 'Artifact', id: string, algorithm: string, digest: string }, slsa: { __typename?: 'SLSA', buildType: string, slsaVersion: string, startedOn: any, finishedOn: any, origin: string, collector: string, builtFrom: Array<{ __typename?: 'Artifact', id: string, algorithm: string, digest: string }>, builtBy: { __typename?: 'Builder', id: string, uri: string }, slsaPredicate: Array<{ __typename?: 'SLSAPredicate', key: string, value: string }> } } & { ' $fragmentName'?: 'AllHasSlsaTreeFragment' };

export type Slsaq1QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq1Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type Slsaq2QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq2Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type Slsaq3QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq3Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type Slsaq4QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq4Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type Slsaq5QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq5Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type Slsaq6QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq6Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  )> };

export type Slsam1MutationVariables = Exact<{ [key: string]: never; }>;


export type Slsam1Mutation = { __typename?: 'Mutation', ingestSLSA: (
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  ) };

export type AllHasSourceAtTreeFragment = { __typename?: 'HasSourceAt', id: string, justification: string, knownSince: any, origin: string, collector: string, package: { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, source: { __typename?: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllHasSourceAtTreeFragment' };

export type HasSourceAtQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSourceAtQ1Query = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type HasSourceAtQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSourceAtQ2Query = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type HasSourceAtQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSourceAtQ3Query = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type HasSourceAtQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSourceAtQ4Query = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type HasSourceAtQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSourceAtQ5Query = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type HasSourceAtQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type HasSourceAtQ6Query = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type AllHashEqualTreeFragment = { __typename?: 'HashEqual', id: string, justification: string, origin: string, collector: string, artifacts: Array<{ __typename?: 'Artifact', id: string, algorithm: string, digest: string }> } & { ' $fragmentName'?: 'AllHashEqualTreeFragment' };

export type HashEqualQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type HashEqualQ1Query = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type HashEqualQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type HashEqualQ2Query = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type HashEqualQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type HashEqualQ3Query = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type HashEqualQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type HashEqualQ4Query = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type HashEqualQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type HashEqualQ5Query = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type HashEqualQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type HashEqualQ6Query = { __typename?: 'Query', HashEqual: Array<(
    { __typename?: 'HashEqual' }
    & { ' $fragmentRefs'?: { 'AllHashEqualTreeFragment': AllHashEqualTreeFragment } }
  )> };

export type AllIsDependencyTreeFragment = { __typename?: 'IsDependency', id: string, justification: string, versionRange: string, origin: string, collector: string, package: { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, dependentPackage: { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } } & { ' $fragmentName'?: 'AllIsDependencyTreeFragment' };

export type IsDepedencyQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type IsDepedencyQ1Query = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type IsDepedencyQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type IsDepedencyQ2Query = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type IsDepedencyQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type IsDepedencyQ3Query = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type IsDepedencyQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type IsDepedencyQ4Query = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type IsDepedencyQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type IsDepedencyQ5Query = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type IsDepedencyQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type IsDepedencyQ6Query = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type AllIsOccurrencesTreeFragment = { __typename?: 'IsOccurrence', id: string, justification: string, origin: string, collector: string, subject: { __typename: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> }, artifact: { __typename?: 'Artifact', id: string, algorithm: string, digest: string } } & { ' $fragmentName'?: 'AllIsOccurrencesTreeFragment' };

export type IsOccurrenceQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type IsOccurrenceQ1Query = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsOccurrenceQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type IsOccurrenceQ2Query = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsOccurrenceQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type IsOccurrenceQ3Query = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsOccurrenceQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type IsOccurrenceQ4Query = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsOccurrenceQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type IsOccurrenceQ5Query = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type IsOccurrenceQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type IsOccurrenceQ6Query = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type AllIsVulnerabilityTreeFragment = { __typename?: 'IsVulnerability', id: string, justification: string, origin: string, collector: string, osv: { __typename?: 'OSV', id: string, osvIds: Array<{ __typename?: 'OSVId', id: string, osvId: string }> }, vulnerability: { __typename: 'CVE', id: string, year: number, cveIds: Array<{ __typename?: 'CVEId', id: string, cveId: string }> } | { __typename: 'GHSA', id: string, ghsaIds: Array<{ __typename?: 'GHSAId', id: string, ghsaId: string }> } } & { ' $fragmentName'?: 'AllIsVulnerabilityTreeFragment' };

export type IsVulnerabilityQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type IsVulnerabilityQ1Query = { __typename?: 'Query', IsVulnerability: Array<(
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  )> };

export type IsVulnerabilityQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type IsVulnerabilityQ2Query = { __typename?: 'Query', IsVulnerability: Array<(
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  )> };

export type IsVulnerabilityQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type IsVulnerabilityQ3Query = { __typename?: 'Query', IsVulnerability: Array<(
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  )> };

export type IsVulnerabilityQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type IsVulnerabilityQ4Query = { __typename?: 'Query', IsVulnerability: Array<(
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  )> };

export type IsVulnerabilityQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type IsVulnerabilityQ5Query = { __typename?: 'Query', IsVulnerability: Array<(
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  )> };

export type IsVulnerabilityQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type IsVulnerabilityQ6Query = { __typename?: 'Query', IsVulnerability: Array<(
    { __typename?: 'IsVulnerability' }
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  )> };

export type AllPkgTreeFragment = { __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } & { ' $fragmentName'?: 'AllPkgTreeFragment' };

export type PkgQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ1Query = { __typename?: 'Query', packages: Array<{ __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string }> }> }> };

export type PkgQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ2Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ3Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ4Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ5Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ6Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ7QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ7Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ8QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ8Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQ9QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQ9Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQaQueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQaQuery = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQbQueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQbQuery = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQcQueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQcQuery = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgQdQueryVariables = Exact<{ [key: string]: never; }>;


export type PkgQdQuery = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type PkgM1MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM1Mutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type PkgM2MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM2Mutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type PkgM3MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM3Mutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type PkgM4MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM4Mutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type PkgM5MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM5Mutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type PkgM6MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM6Mutation = { __typename?: 'Mutation', ingestPackage: (
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) };

export type PkgM7MutationVariables = Exact<{ [key: string]: never; }>;


export type PkgM7Mutation = { __typename?: 'Mutation', ingestPackage: { __typename?: 'Package', namespaces: Array<{ __typename?: 'PackageNamespace', names: Array<{ __typename?: 'PackageName', versions: Array<{ __typename?: 'PackageVersion', qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } };

export type AllPkgEqualTreeFragment = { __typename?: 'PkgEqual', id: string, justification: string, origin: string, collector: string, packages: Array<{ __typename?: 'Package', id: string, type: string, namespaces: Array<{ __typename?: 'PackageNamespace', id: string, namespace: string, names: Array<{ __typename?: 'PackageName', id: string, name: string, versions: Array<{ __typename?: 'PackageVersion', id: string, version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }> } & { ' $fragmentName'?: 'AllPkgEqualTreeFragment' };

export type PkgEqualQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgEqualQ1Query = { __typename?: 'Query', PkgEqual: Array<(
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualTreeFragment': AllPkgEqualTreeFragment } }
  )> };

export type PkgEqualQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgEqualQ2Query = { __typename?: 'Query', PkgEqual: Array<(
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualTreeFragment': AllPkgEqualTreeFragment } }
  )> };

export type PkgEqualQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgEqualQ3Query = { __typename?: 'Query', PkgEqual: Array<(
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualTreeFragment': AllPkgEqualTreeFragment } }
  )> };

export type PkgEqualQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgEqualQ4Query = { __typename?: 'Query', PkgEqual: Array<(
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualTreeFragment': AllPkgEqualTreeFragment } }
  )> };

export type PkgEqualQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type PkgEqualQ5Query = { __typename?: 'Query', PkgEqual: Array<(
    { __typename?: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualTreeFragment': AllPkgEqualTreeFragment } }
  )> };

export type AllSrcTreeFragment = { __typename?: 'Source', id: string, type: string, namespaces: Array<{ __typename?: 'SourceNamespace', id: string, namespace: string, names: Array<{ __typename?: 'SourceName', id: string, name: string, tag?: string | null, commit?: string | null }> }> } & { ' $fragmentName'?: 'AllSrcTreeFragment' };

export type SrcQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ1Query = { __typename?: 'Query', sources: Array<{ __typename?: 'Source', namespaces: Array<{ __typename?: 'SourceNamespace', names: Array<{ __typename?: 'SourceName', name: string }> }> }> };

export type SrcQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ2Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ3Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ4Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ5Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ6QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ6Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ7QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ7Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ8QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ8Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcQ9QueryVariables = Exact<{ [key: string]: never; }>;


export type SrcQ9Query = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type SrcM1MutationVariables = Exact<{ [key: string]: never; }>;


export type SrcM1Mutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ) };

export type SrcM2MutationVariables = Exact<{ [key: string]: never; }>;


export type SrcM2Mutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ) };

export type SrcM3MutationVariables = Exact<{ [key: string]: never; }>;


export type SrcM3Mutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ) };

export type SrcM4MutationVariables = Exact<{ [key: string]: never; }>;


export type SrcM4Mutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ) };

export type SrcM5MutationVariables = Exact<{ [key: string]: never; }>;


export type SrcM5Mutation = { __typename?: 'Mutation', ingestSource: { __typename?: 'Source', namespaces: Array<{ __typename?: 'SourceNamespace', names: Array<{ __typename?: 'SourceName', name: string }> }> } };

export type SrcM6MutationVariables = Exact<{ [key: string]: never; }>;


export type SrcM6Mutation = { __typename?: 'Mutation', ingestSource: (
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ) };

export type GetPkgQueryVariables = Exact<{
  spec?: InputMaybe<PkgSpec>;
}>;


export type GetPkgQuery = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export type GetSrcQueryVariables = Exact<{
  spec?: InputMaybe<SourceSpec>;
}>;


export type GetSrcQuery = { __typename?: 'Query', sources: Array<(
    { __typename?: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type GetArtifactQueryVariables = Exact<{
  spec?: InputMaybe<ArtifactSpec>;
}>;


export type GetArtifactQuery = { __typename?: 'Query', artifacts: Array<(
    { __typename?: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  )> };

export type GetCveQueryVariables = Exact<{
  spec?: InputMaybe<CveSpec>;
}>;


export type GetCveQuery = { __typename?: 'Query', cve: Array<(
    { __typename?: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  )> };

export type GetIsDepedencyQueryVariables = Exact<{
  spec?: InputMaybe<IsDependencySpec>;
}>;


export type GetIsDepedencyQuery = { __typename?: 'Query', IsDependency: Array<(
    { __typename?: 'IsDependency' }
    & { ' $fragmentRefs'?: { 'AllIsDependencyTreeFragment': AllIsDependencyTreeFragment } }
  )> };

export type GetIsOccurrenceQueryVariables = Exact<{
  spec?: InputMaybe<IsOccurrenceSpec>;
}>;


export type GetIsOccurrenceQuery = { __typename?: 'Query', IsOccurrence: Array<(
    { __typename?: 'IsOccurrence' }
    & { ' $fragmentRefs'?: { 'AllIsOccurrencesTreeFragment': AllIsOccurrencesTreeFragment } }
  )> };

export type GetHasSourceAtQueryVariables = Exact<{
  spec?: InputMaybe<HasSourceAtSpec>;
}>;


export type GetHasSourceAtQuery = { __typename?: 'Query', HasSourceAt: Array<(
    { __typename?: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
  )> };

export type GetCertifyVulnQueryVariables = Exact<{
  spec?: InputMaybe<CertifyVulnSpec>;
}>;


export type GetCertifyVulnQuery = { __typename?: 'Query', CertifyVuln: Array<(
    { __typename?: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  )> };

export type GetNeighborsQueryVariables = Exact<{
  nodeId: Scalars['ID'];
}>;


export type GetNeighborsQuery = { __typename?: 'Query', neighbors: Array<(
    { __typename: 'Artifact' }
    & { ' $fragmentRefs'?: { 'AllArtifactTreeFragment': AllArtifactTreeFragment } }
  ) | (
    { __typename: 'Builder' }
    & { ' $fragmentRefs'?: { 'AllBuilderTreeFragment': AllBuilderTreeFragment } }
  ) | (
    { __typename: 'CVE' }
    & { ' $fragmentRefs'?: { 'AllCveTreeFragment': AllCveTreeFragment } }
  ) | (
    { __typename: 'CertifyBad' }
    & { ' $fragmentRefs'?: { 'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment;'AllCertifyBadTreeFragment': AllCertifyBadTreeFragment } }
  ) | (
    { __typename: 'CertifyGood' }
    & { ' $fragmentRefs'?: { 'AllCertifyGoodTreeFragment': AllCertifyGoodTreeFragment } }
  ) | (
    { __typename: 'CertifyScorecard' }
    & { ' $fragmentRefs'?: { 'AllCertifyScorecardTreeFragment': AllCertifyScorecardTreeFragment } }
  ) | (
    { __typename: 'CertifyVEXStatement' }
    & { ' $fragmentRefs'?: { 'AllCertifyVexStatementTreeFragment': AllCertifyVexStatementTreeFragment } }
  ) | (
    { __typename: 'CertifyVuln' }
    & { ' $fragmentRefs'?: { 'AllCertifyVulnTreeFragment': AllCertifyVulnTreeFragment } }
  ) | (
    { __typename: 'GHSA' }
    & { ' $fragmentRefs'?: { 'AllGhsaTreeFragment': AllGhsaTreeFragment } }
  ) | (
    { __typename: 'HasSBOM' }
    & { ' $fragmentRefs'?: { 'AllHasSbomTreeFragment': AllHasSbomTreeFragment } }
  ) | (
    { __typename: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllHasSlsaTreeFragment': AllHasSlsaTreeFragment } }
  ) | (
    { __typename: 'HasSourceAt' }
    & { ' $fragmentRefs'?: { 'AllHasSourceAtTreeFragment': AllHasSourceAtTreeFragment } }
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
    & { ' $fragmentRefs'?: { 'AllIsVulnerabilityTreeFragment': AllIsVulnerabilityTreeFragment } }
  ) | (
    { __typename: 'OSV' }
    & { ' $fragmentRefs'?: { 'AllOsvTreeFragment': AllOsvTreeFragment } }
  ) | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'PkgEqual' }
    & { ' $fragmentRefs'?: { 'AllPkgEqualTreeFragment': AllPkgEqualTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  )> };

export type ReachQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type ReachQ1Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export const AllArtifactTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllArtifactTreeFragment, unknown>;
export const AllBuilderTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]} as unknown as DocumentNode<AllBuilderTreeFragment, unknown>;
export const AllCertifyBadTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllCertifyBadTreeFragment, unknown>;
export const AllCertifyGoodTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllCertifyGoodTreeFragment, unknown>;
export const AllSrcTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllSrcTreeFragment, unknown>;
export const AllCertifyScorecardTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllCertifyScorecardTreeFragment, unknown>;
export const AllCertifyVexStatementTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllCertifyVexStatementTreeFragment, unknown>;
export const AllCertifyVulnTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<AllCertifyVulnTreeFragment, unknown>;
export const AllCveTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<AllCveTreeFragment, unknown>;
export const AllGhsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]} as unknown as DocumentNode<AllGhsaTreeFragment, unknown>;
export const AllOsvTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<AllOsvTreeFragment, unknown>;
export const AllHasSbomTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHasSbomTreeFragment, unknown>;
export const AllHasSlsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<AllHasSlsaTreeFragment, unknown>;
export const AllHasSourceAtTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHasSourceAtTreeFragment, unknown>;
export const AllHashEqualTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHashEqualTreeFragment, unknown>;
export const AllIsDependencyTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllIsDependencyTreeFragment, unknown>;
export const AllIsOccurrencesTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllIsOccurrencesTreeFragment, unknown>;
export const AllIsVulnerabilityTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllIsVulnerabilityTreeFragment, unknown>;
export const AllPkgTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgTreeFragment, unknown>;
export const AllPkgEqualTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllPkgEqualTreeFragment, unknown>;
export const ArtifactQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ1Query, ArtifactQ1QueryVariables>;
export const ArtifactQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ2Query, ArtifactQ2QueryVariables>;
export const ArtifactQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ3Query, ArtifactQ3QueryVariables>;
export const ArtifactQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha512","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ4Query, ArtifactQ4QueryVariables>;
export const ArtifactQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"7A8F47318E4676DACB0142AFA0B83029CD7BEFD9","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ5Query, ArtifactQ5QueryVariables>;
export const ArtifactM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArtifactM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"2b00042f7481c7b056c4b410d28f33cf","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactM1Mutation, ArtifactM1MutationVariables>;
export const ArtifactM2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArtifactM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"0ABCDEF0FEDCBA01234567890ABCDEF0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactM2Mutation, ArtifactM2MutationVariables>;
export const BuilderQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuilderQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builderSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<BuilderQ1Query, BuilderQ1QueryVariables>;
export const BuilderQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuilderQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builderSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uri"},"value":{"kind":"StringValue","value":"https://github.com/Attestations/GitHubHostedActions@v1","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<BuilderQ2Query, BuilderQ2QueryVariables>;
export const BuilderM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BuilderM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builder"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uri"},"value":{"kind":"StringValue","value":"https://github.com/Attestations/GitHubHostedActions@v2","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<BuilderM1Mutation, BuilderM1MutationVariables>;
export const CertifactBadQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ1Query, CertifactBadQ1QueryVariables>;
export const CertifactBadQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ2Query, CertifactBadQ2QueryVariables>;
export const CertifactBadQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ3Query, CertifactBadQ3QueryVariables>;
export const CertifactBadQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ4Query, CertifactBadQ4QueryVariables>;
export const CertifactBadQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ5Query, CertifactBadQ5QueryVariables>;
export const CertifactBadQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ6Query, CertifactBadQ6QueryVariables>;
export const CertifactGoodQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactGoodQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactGoodQ1Query, CertifactGoodQ1QueryVariables>;
export const CertifactGoodQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactGoodQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactGoodQ2Query, CertifactGoodQ2QueryVariables>;
export const CertifactGoodQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactGoodQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactGoodQ3Query, CertifactGoodQ3QueryVariables>;
export const CertifactGoodQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactGoodQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactGoodQ4Query, CertifactGoodQ4QueryVariables>;
export const CertifactGoodQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactGoodQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"2b00042f7481c7b056c4b410d28f33cf","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactGoodQ5Query, CertifactGoodQ5QueryVariables>;
export const CertifactGoodQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactGoodQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyGoodSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactGoodQ6Query, CertifactGoodQ6QueryVariables>;
export const CertifyGoodM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"2b00042f7481c7b056c4b410d28f33cf","block":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"justification"},"value":{"kind":"StringValue","value":"why","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"collector"},"value":{"kind":"StringValue","value":"there","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodM1Mutation, CertifyGoodM1MutationVariables>;
export const CertifyGoodM2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CertifyGoodM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCertifyGood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"0ABCDEF0FEDCBA01234567890ABCDEF0","block":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"certifyGood"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"justification"},"value":{"kind":"StringValue","value":"why2","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"collector"},"value":{"kind":"StringValue","value":"there","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyGoodM2Mutation, CertifyGoodM2MutationVariables>;
export const ScorecardQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ1Query, ScorecardQ1QueryVariables>;
export const ScorecardQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ2Query, ScorecardQ2QueryVariables>;
export const ScorecardQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ3Query, ScorecardQ3QueryVariables>;
export const ScorecardQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"aggregateScore"},"value":{"kind":"FloatValue","value":"2.9"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ4Query, ScorecardQ4QueryVariables>;
export const ScorecardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Scorecard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certifyScorecard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardMutation, ScorecardMutationVariables>;
export const CertifyVexStatementQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>;
export const CertifyVexStatementQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>;
export const CertifyVexStatementQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>;
export const CertifyVexStatementQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>;
export const CertifyVexStatementQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>;
export const CertifyVexStatementQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>;
export const CertifyVexStatementQ7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2018-43610","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>;
export const CertifyVexStatementQ8Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ8"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-hj5f-4gvw-4rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>;
export const CertifyVexStatementQ9Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ9"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"cve-2019-14750","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ9Query, CertifyVexStatementQ9QueryVariables>;
export const CertifyVexStatementQ10Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ10"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"cve-2018-15710","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ10Query, CertifyVexStatementQ10QueryVariables>;
export const CertifyVulnQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>;
export const CertifyVulnQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>;
export const CertifyVulnQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>;
export const CertifyVulnQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"django","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>;
export const CertifyVulnQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>;
export const CertifyVulnQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>;
export const CertifyVulnQ7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>;
export const Cveq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CVEQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cveSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<Cveq1Query, Cveq1QueryVariables>;
export const Cveq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CVEQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cveSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"IntValue","value":"2014"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<Cveq2Query, Cveq2QueryVariables>;
export const Cveq3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CVEQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cveSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2014-8139","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<Cveq3Query, Cveq3QueryVariables>;
export const Cveq4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CVEQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cveSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"IntValue","value":"2014"}},{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2014-8140","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<Cveq4Query, Cveq4QueryVariables>;
export const Cvem1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CVEM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCVE"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"IntValue","value":"2023"}},{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2023-12345","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<Cvem1Mutation, Cvem1MutationVariables>;
export const Cvem2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CVEM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestCVE"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"IntValue","value":"2032"}},{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"cve-2032-12345","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<Cvem2Mutation, Cvem2MutationVariables>;
export const Ghsaq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GHSAQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ghsaSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allGHSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]} as unknown as DocumentNode<Ghsaq1Query, Ghsaq1QueryVariables>;
export const Ghsaq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GHSAQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ghsaSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allGHSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]} as unknown as DocumentNode<Ghsaq2Query, Ghsaq2QueryVariables>;
export const Ghsam1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GHSAM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestGHSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-abcd-efgh-1234","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allGHSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]} as unknown as DocumentNode<Ghsam1Mutation, Ghsam1MutationVariables>;
export const Osvq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OSVQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osvSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<Osvq1Query, Osvq1QueryVariables>;
export const Osvq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OSVQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osvSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"CVE-2014-8139","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<Osvq2Query, Osvq2QueryVariables>;
export const Osvq3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OSVQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osvSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"ghsa-h45f-rjvw-2rv2","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<Osvq3Query, Osvq3QueryVariables>;
export const Osvm1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OSVM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOSV"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"GHSA-abcd-efgh-1234","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<Osvm1Mutation, Osvm1MutationVariables>;
export const Osvm2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OSVM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestOSV"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"CVE-2023-12345","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allOSVTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<Osvm2Mutation, Osvm2MutationVariables>;
export const HasSbomq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq1Query, HasSbomq1QueryVariables>;
export const HasSbomq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq2Query, HasSbomq2QueryVariables>;
export const HasSbomq3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq3Query, HasSbomq3QueryVariables>;
export const HasSbomq4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq4Query, HasSbomq4QueryVariables>;
export const HasSbomq5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq5Query, HasSbomq5QueryVariables>;
export const Slsaq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq1Query, Slsaq1QueryVariables>;
export const Slsaq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"Demo ingestion","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq2Query, Slsaq2QueryVariables>;
export const Slsaq3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha1","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq3Query, Slsaq3QueryVariables>;
export const Slsaq4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"builtFrom"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq4Query, Slsaq4QueryVariables>;
export const Slsaq5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"47","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq5Query, Slsaq5QueryVariables>;
export const Slsaq6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"buildDefinition.externalParameters.ref","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"refs/heads/main","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq6Query, Slsaq6QueryVariables>;
export const Slsam1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SLSAM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"2b00042f7481c7b056c4b410d28f33cf","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"builtFrom"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"0ABCDEF0FEDCBA01234567890ABCDEF0","block":false}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"builtBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uri"},"value":{"kind":"StringValue","value":"https://github.com/Attestations/GitHubHostedActions@v2","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"slsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"buildType"},"value":{"kind":"StringValue","value":"type","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"slsaVersion"},"value":{"kind":"StringValue","value":"v1","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"here","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"collector"},"value":{"kind":"StringValue","value":"there","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"startedOn"},"value":{"kind":"StringValue","value":"2023-03-28T11:01:23-07:00","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"finishedOn"},"value":{"kind":"StringValue","value":"2023-03-28T11:01:35-07:00","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"slsaPredicate"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"key1","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"value1","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsam1Mutation, Slsam1MutationVariables>;
export const HasSourceAtQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQ1Query, HasSourceAtQ1QueryVariables>;
export const HasSourceAtQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQ2Query, HasSourceAtQ2QueryVariables>;
export const HasSourceAtQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"3.0.3","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQ3Query, HasSourceAtQ3QueryVariables>;
export const HasSourceAtQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"https://github.com/django/django","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQ4Query, HasSourceAtQ4QueryVariables>;
export const HasSourceAtQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"kubetest","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQ5Query, HasSourceAtQ5QueryVariables>;
export const HasSourceAtQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSourceAtQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"https://github.com/vapor-ware/kubetest","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSourceAtQ6Query, HasSourceAtQ6QueryVariables>;
export const HashEqualQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualQ1Query, HashEqualQ1QueryVariables>;
export const HashEqualQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualQ2Query, HashEqualQ2QueryVariables>;
export const HashEqualQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha1","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"7a8f47318e4676dacb0142afa0b83029cd7befd9","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualQ3Query, HashEqualQ3QueryVariables>;
export const HashEqualQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"89bb0da1891646e58eb3e6ed24f3a6fc3c8eb5a0d44824cba581dfa34a0450cf","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualQ4Query, HashEqualQ4QueryVariables>;
export const HashEqualQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualQ5Query, HashEqualQ5QueryVariables>;
export const HashEqualQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HashEqualQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HashEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifacts"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha512","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"374ab8f711235830769aa5f0b31ce9b72c5670074b34cb302cdafe3b606233ee92ee01e298e5701f15cc7087714cd9abd7ddb838a6e1206b3642de16d9fc9dd7","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HashEqualQ6Query, HashEqualQ6QueryVariables>;
export const IsDepedencyQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsDepedencyQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDepedencyQ1Query, IsDepedencyQ1QueryVariables>;
export const IsDepedencyQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsDepedencyQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDepedencyQ2Query, IsDepedencyQ2QueryVariables>;
export const IsDepedencyQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsDepedencyQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"debian","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDepedencyQ3Query, IsDepedencyQ3QueryVariables>;
export const IsDepedencyQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsDepedencyQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"dpkg","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDepedencyQ4Query, IsDepedencyQ4QueryVariables>;
export const IsDepedencyQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsDepedencyQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"3.0.3","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDepedencyQ5Query, IsDepedencyQ5QueryVariables>;
export const IsDepedencyQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsDepedencyQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"dependentPackage"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsDepedencyQ6Query, IsDepedencyQ6QueryVariables>;
export const IsOccurrenceQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsOccurrenceQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceQ1Query, IsOccurrenceQ1QueryVariables>;
export const IsOccurrenceQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsOccurrenceQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceQ2Query, IsOccurrenceQ2QueryVariables>;
export const IsOccurrenceQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsOccurrenceQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceQ3Query, IsOccurrenceQ3QueryVariables>;
export const IsOccurrenceQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsOccurrenceQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"3.0.3","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceQ4Query, IsOccurrenceQ4QueryVariables>;
export const IsOccurrenceQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsOccurrenceQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceQ5Query, IsOccurrenceQ5QueryVariables>;
export const IsOccurrenceQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsOccurrenceQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsOccurrenceQ6Query, IsOccurrenceQ6QueryVariables>;
export const IsVulnerabilityQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>;
export const IsVulnerabilityQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>;
export const IsVulnerabilityQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>;
export const IsVulnerabilityQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>;
export const IsVulnerabilityQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>;
export const IsVulnerabilityQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>;
export const PkgQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ1Query, PkgQ1QueryVariables>;
export const PkgQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ2Query, PkgQ2QueryVariables>;
export const PkgQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ3Query, PkgQ3QueryVariables>;
export const PkgQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"debian","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ4Query, PkgQ4QueryVariables>;
export const PkgQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"debian","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ5Query, PkgQ5QueryVariables>;
export const PkgQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"ubuntu","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"dpkg","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ6Query, PkgQ6QueryVariables>;
export const PkgQ7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"dpkg","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ7Query, PkgQ7QueryVariables>;
export const PkgQ8Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ8"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"3.0.3","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ8Query, PkgQ8QueryVariables>;
export const PkgQ9Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQ9"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQ9Query, PkgQ9QueryVariables>;
export const PkgQaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQaQuery, PkgQaQueryVariables>;
export const PkgQbDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQB"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"distro","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"stretch","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQbQuery, PkgQbQueryVariables>;
export const PkgQcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQC"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"subpath","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQcQuery, PkgQcQueryVariables>;
export const PkgQdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgQD"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"matchOnlyEmptyQualifiers"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgQdQuery, PkgQdQueryVariables>;
export const PkgM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM1Mutation, PkgM1MutationVariables>;
export const PkgM2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"distro","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"stretch","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM2Mutation, PkgM2MutationVariables>;
export const PkgM3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"2.12.0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM3Mutation, PkgM3MutationVariables>;
export const PkgM4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"2.12.0","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"distro","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"stretch","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM4Mutation, PkgM4MutationVariables>;
export const PkgM5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"2.12.0","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"distro","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"stretch","block":false}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM5Mutation, PkgM5MutationVariables>;
export const PkgM6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"2.12.0","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"foo","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"distro","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"stretch","block":false}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM6Mutation, PkgM6MutationVariables>;
export const PkgM7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PkgM7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkg"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"2.12.0","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"foo","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"distro","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"stretch","block":false}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PkgM7Mutation, PkgM7MutationVariables>;
export const PkgEqualQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEqualQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualQ1Query, PkgEqualQ1QueryVariables>;
export const PkgEqualQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEqualQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"Demo ingestion","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualQ2Query, PkgEqualQ2QueryVariables>;
export const PkgEqualQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEqualQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"conan","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"openssl.org","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"3.0.3","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualQ3Query, PkgEqualQ3QueryVariables>;
export const PkgEqualQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEqualQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"django","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"1.11.1","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"subpath","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualQ4Query, PkgEqualQ4QueryVariables>;
export const PkgEqualQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PkgEqualQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PkgEqual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgEqualSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"debian","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgEqualTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<PkgEqualQ5Query, PkgEqualQ5QueryVariables>;
export const SrcQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ1Query, SrcQ1QueryVariables>;
export const SrcQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ2Query, SrcQ2QueryVariables>;
export const SrcQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"commit"},"value":{"kind":"StringValue","value":"","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ3Query, SrcQ3QueryVariables>;
export const SrcQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ4Query, SrcQ4QueryVariables>;
export const SrcQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"v0.0.1","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ5Query, SrcQ5QueryVariables>;
export const SrcQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"commit"},"value":{"kind":"StringValue","value":"fcba958b73e27cad8b5c8655d46439984d27853b","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ6Query, SrcQ6QueryVariables>;
export const SrcQ7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"svn","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ7Query, SrcQ7QueryVariables>;
export const SrcQ8Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ8"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"gitlab","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ8Query, SrcQ8QueryVariables>;
export const SrcQ9Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SrcQ9"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"asd","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"commit"},"value":{"kind":"StringValue","value":"sad","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcQ9Query, SrcQ9QueryVariables>;
export const SrcM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SrcM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"git","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"github","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcM1Mutation, SrcM1MutationVariables>;
export const SrcM2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SrcM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"git","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"github","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"commit"},"value":{"kind":"StringValue","value":"4fd637ad9d674c88c50d56a5d47cd77f6032e609","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcM2Mutation, SrcM2MutationVariables>;
export const SrcM3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SrcM3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"git","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"github","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"v2.12.0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcM3Mutation, SrcM3MutationVariables>;
export const SrcM4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SrcM4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"git","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"github","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"commit"},"value":{"kind":"StringValue","value":"4fd637ad9d674c88c50d56a5d47cd77f6032e609","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"2.12.0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcM4Mutation, SrcM4MutationVariables>;
export const SrcM5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SrcM5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"git","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"github","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"v2.12.0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SrcM5Mutation, SrcM5MutationVariables>;
export const SrcM6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SrcM6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"git","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"github","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"commit"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"StringValue","value":"v2.12.0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<SrcM6Mutation, SrcM6MutationVariables>;
export const GetPkgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPkg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PkgSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPkgQuery, GetPkgQueryVariables>;
export const GetSrcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSrc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<GetSrcQuery, GetSrcQueryVariables>;
export const GetArtifactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArtifact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<GetArtifactQuery, GetArtifactQueryVariables>;
export const GetCveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CVESpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cveSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<GetCveQuery, GetCveQueryVariables>;
export const GetIsDepedencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIsDepedency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependencySpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsDependency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isDependencySpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<GetIsDepedencyQuery, GetIsDepedencyQueryVariables>;
export const GetIsOccurrenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIsOccurrence"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrenceSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsOccurrence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isOccurrenceSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<GetIsOccurrenceQuery, GetIsOccurrenceQueryVariables>;
export const GetHasSourceAtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHasSourceAt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAtSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSourceAt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSourceAtSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<GetHasSourceAtQuery, GetHasSourceAtQueryVariables>;
export const GetCertifyVulnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCertifyVuln"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVulnSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>;
export const GetNeighborsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNeighbors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neighbors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allBuilderTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allOSVTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCveTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allGHSATree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsOccurrencesTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsDependencyTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHashEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyGoodTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgEqualTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSourceAtTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSLSATree"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allBuilderTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Builder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyGoodTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyGood"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PkgEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<GetNeighborsQuery, GetNeighborsQueryVariables>;
export const ReachQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReachQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"ubuntu","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"dpkg","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReachQ1Query, ReachQ1QueryVariables>;