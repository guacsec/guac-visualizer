/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  uri: Scalars['String'];
};

/** BuilderInputSpec is the same as Builder, but used for mutation ingestion. */
export type BuilderInputSpec = {
  uri: Scalars['String'];
};

/** BuilderSpec allows filtering the list of builders to return. */
export type BuilderSpec = {
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
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
};

/**
 * CertifyPkg is an attestation that represents when a package objects are similar
 *
 * packages (subject) - list of package objects
 * justification (property) - string value representing why the packages are similar
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type CertifyPkg = {
  __typename?: 'CertifyPkg';
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
  packages: Array<Package>;
};

/**
 * CertifyPkgInputSpec is the same as CertifyPkg but for mutation input.
 *
 * All fields are required.
 */
export type CertifyPkgInputSpec = {
  collector: Scalars['String'];
  justification: Scalars['String'];
  origin: Scalars['String'];
};

/**
 * CertifyPkgSpec allows filtering the list of CertifyPkg to return.
 *
 * Specifying just the package allows to query for all similar packages (if they exist)
 */
export type CertifyPkgSpec = {
  collector?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  packages?: InputMaybe<Array<InputMaybe<PkgSpec>>>;
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
 * CertifyVEXStatement is an attestation that represents when a package or artifact has a VEX about a specific vulnerability (CVE or GHSA)
 *
 * subject - union type that represents a package or artifact
 * vulnerability (object) - union type that consists of cve or ghsa
 * justification (property) - justification for VEX
 * knownSince (property) - timestamp of the VEX (exact time in RFC 3339 format)
 * origin (property) - where this attestation was generated from (based on which document)
 * collector (property) - the GUAC collector that collected the document that generated this attestation
 */
export type CertifyVexStatement = {
  __typename?: 'CertifyVEXStatement';
  collector: Scalars['String'];
  justification: Scalars['String'];
  knownSince: Scalars['Time'];
  origin: Scalars['String'];
  subject: PackageOrArtifact;
  vulnerability: CveOrGhsa;
};

/**
 * CertifyVEXStatementSpec allows filtering the list of CertifyVEXStatement to return.
 * Only package or artifact and CVE or GHSA can be specified at once.
 */
export type CertifyVexStatementSpec = {
  collector?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  knownSince?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrArtifactSpec>;
  vulnerability?: InputMaybe<CveOrGhsaSpec>;
};

/** CertifyVuln is an attestation that represents when a package has a vulnerability */
export type CertifyVuln = {
  __typename?: 'CertifyVuln';
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
  origin?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<PackageOrSourceSpec>;
  uri?: InputMaybe<Scalars['String']>;
};

/** HasSLSA records that a subject node has a SLSA attestation. */
export type HasSlsa = {
  __typename?: 'HasSLSA';
  /** The SLSA attestation. */
  slsa?: Maybe<Slsa>;
  /** The subject of SLSA attestation: package, source, or artifact. */
  subject: PackageSourceOrArtifact;
};

/** HasSLSASpec allows filtering the list of HasSLSA to return. */
export type HasSlsaSpec = {
  buildType?: InputMaybe<Scalars['String']>;
  builtBy?: InputMaybe<BuilderSpec>;
  builtFrom?: InputMaybe<Array<PackageSourceOrArtifactSpec>>;
  collector?: InputMaybe<Scalars['String']>;
  finishedOn?: InputMaybe<Scalars['Time']>;
  origin?: InputMaybe<Scalars['String']>;
  predicate?: InputMaybe<Array<SlsaPredicateSpec>>;
  slsaVersion?: InputMaybe<Scalars['String']>;
  startedOn?: InputMaybe<Scalars['Time']>;
  subject?: InputMaybe<PackageSourceOrArtifactSpec>;
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
  /** Adds a certification that two packages are similar */
  ingestCertifyBad: CertifyBad;
  /** Adds a certification that two packages are similar */
  ingestCertifyPkg: CertifyPkg;
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
  ingestMaterials: Array<PackageSourceOrArtifact>;
  /** Ingest a new OSV. Returns the ingested object */
  ingestOSV: Osv;
  /** Adds an artifact as an occurrence for either a package or a source */
  ingestOccurrence: IsOccurrence;
  /** Ingest a new package. Returns the ingested package trie */
  ingestPackage: Package;
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
  /** certify that an either a package or artifact has an associated VEX for a CVE or GHSA */
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


export type MutationIngestCertifyPkgArgs = {
  certifyPkg: CertifyPkgInputSpec;
  depPkg: PkgInputSpec;
  pkg: PkgInputSpec;
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
  materials: Array<PackageSourceOrArtifactInput>;
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


export type MutationIngestSlsaArgs = {
  builtBy: BuilderInputSpec;
  builtFrom: Array<PackageSourceOrArtifactInput>;
  slsa: SlsaInputSpec;
  subject: PackageSourceOrArtifactInput;
};


export type MutationIngestSourceArgs = {
  source: SourceInputSpec;
};


export type MutationIngestVexStatementArgs = {
  subject: PackageOrArtifactInput;
  vexStatement: VexStatementInputSpec;
  vulnerability: CveOrGhsaInput;
};


export type MutationIngestVulnerabilityArgs = {
  certifyVuln: VulnerabilityMetaDataInput;
  pkg: PkgInputSpec;
  vulnerability: OsvCveOrGhsaInput;
};

/**
 * Nodes is a union type of all the possible nodes. It encapsulates the software tree nodes along with the evidence nodes.
 * In a path query, all connecting evidence nodes along with their intermediate subject nodes need to be returned
 * in order to create a complete graph.
 */
export type Nodes = Artifact | Builder | Cve | CertifyBad | CertifyPkg | CertifyScorecard | CertifyVexStatement | CertifyVuln | Ghsa | HasSbom | HasSlsa | HasSourceAt | HashEqual | IsDependency | IsOccurrence | IsVulnerability | Osv | Package | Source;

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

/**
 * PackageSourceArtifactBuilderOsvCveOrGhsaFilter allows for all the software tree node types to be
 * specified for the subject or the end target in a path query.
 *
 * Exactly one of the value must be set to non-nil.
 */
export type PackageSourceArtifactBuilderOsvCveOrGhsaFilter = {
  artifact?: InputMaybe<ArtifactSpec>;
  builder?: InputMaybe<BuilderSpec>;
  cve?: InputMaybe<CveSpec>;
  ghsa?: InputMaybe<GhsaSpec>;
  osv?: InputMaybe<OsvSpec>;
  package?: InputMaybe<PkgSpec>;
  source?: InputMaybe<SourceSpec>;
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
  /** Returns all CertifyPkg */
  CertifyPkg: Array<CertifyPkg>;
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
  /** Returns all artifacts */
  artifacts: Array<Artifact>;
  /** Returns all builders */
  builders: Array<Builder>;
  /** Returns all CVEs */
  cve: Array<Cve>;
  /** Returns all GHSA nodes */
  ghsa: Array<Ghsa>;
  /** Returns all OSV */
  osv: Array<Osv>;
  /** Returns all packages */
  packages: Array<Package>;
  /** path query is used to determine reachability between the subject and target. It returns the path to the target via a list of nodes */
  path: Array<Nodes>;
  /** Returns all Scorecard certifications matching the filter */
  scorecards: Array<CertifyScorecard>;
  /** Returns all sources */
  sources: Array<Source>;
};


export type QueryCertifyBadArgs = {
  certifyBadSpec?: InputMaybe<CertifyBadSpec>;
};


export type QueryCertifyPkgArgs = {
  certifyPkgSpec?: InputMaybe<CertifyPkgSpec>;
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


export type QueryOsvArgs = {
  osvSpec?: InputMaybe<OsvSpec>;
};


export type QueryPackagesArgs = {
  pkgSpec?: InputMaybe<PkgSpec>;
};


export type QueryPathArgs = {
  maxPathLength: Scalars['Int'];
  subject: PackageSourceArtifactBuilderOsvCveOrGhsaFilter;
  target: PackageSourceArtifactBuilderOsvCveOrGhsaFilter;
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
  builtFrom: Array<PackageSourceOrArtifact>;
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

export type BuilderQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type BuilderQ1Query = { __typename?: 'Query', builders: Array<{ __typename?: 'Builder', uri: string }> };

export type BuilderQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type BuilderQ2Query = { __typename?: 'Query', builders: Array<{ __typename?: 'Builder', uri: string }> };

export type BuilderM1MutationVariables = Exact<{ [key: string]: never; }>;


export type BuilderM1Mutation = { __typename?: 'Mutation', ingestBuilder: { __typename?: 'Builder', uri: string } };

export type AllCertifyBadTreeFragment = { __typename?: 'CertifyBad', justification: string, origin: string, collector: string, subject: { __typename: 'Artifact', algorithm: string, digest: string } | { __typename: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', type: string, namespaces: Array<{ __typename?: 'SourceNamespace', namespace: string, names: Array<{ __typename?: 'SourceName', name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllCertifyBadTreeFragment' };

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

export type AllCertifyPkgTreeFragment = { __typename?: 'CertifyPkg', justification: string, origin: string, collector: string, packages: Array<{ __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }> } & { ' $fragmentName'?: 'AllCertifyPkgTreeFragment' };

export type CertifyPkgQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ1Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ2Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ3Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ4Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ5Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

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

export type AllCertifyVexStatementTreeFragment = { __typename?: 'CertifyVEXStatement', justification: string, knownSince: any, origin: string, collector: string, subject: { __typename: 'Artifact', algorithm: string, digest: string } | { __typename: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, vulnerability: { __typename: 'CVE', year: number, cveIds: Array<{ __typename?: 'CVEId', id: string }> } | { __typename: 'GHSA', ghsaIds: Array<{ __typename?: 'GHSAId', id: string }> } } & { ' $fragmentName'?: 'AllCertifyVexStatementTreeFragment' };

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

export type AllCertifyVulnTreeFragment = { __typename?: 'CertifyVuln', package: { __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, vulnerability: { __typename: 'CVE', id: string, year: number, cveIds: Array<{ __typename?: 'CVEId', id: string, cveId: string }> } | { __typename: 'GHSA', id: string, ghsaIds: Array<{ __typename?: 'GHSAId', id: string, ghsaId: string }> } | { __typename: 'OSV', id: string, osvIds: Array<{ __typename?: 'OSVId', id: string, osvId: string }> }, metadata: { __typename?: 'VulnerabilityMetaData', dbUri: string, dbVersion: string, scannerUri: string, scannerVersion: string, timeScanned: any, origin: string, collector: string } } & { ' $fragmentName'?: 'AllCertifyVulnTreeFragment' };

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

export type AllHasSbomTreeFragment = { __typename?: 'HasSBOM', uri: string, origin: string, collector: string, subject: { __typename: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', type: string, namespaces: Array<{ __typename?: 'SourceNamespace', namespace: string, names: Array<{ __typename?: 'SourceName', name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllHasSbomTreeFragment' };

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

export type AllSlsaTreeFragment = { __typename?: 'HasSLSA', subject: { __typename: 'Artifact', algorithm: string, digest: string } | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ), slsa?: { __typename?: 'SLSA', buildType: string, slsaVersion: string, startedOn: any, finishedOn: any, origin: string, collector: string, builtFrom: Array<{ __typename: 'Artifact', algorithm: string, digest: string } | (
      { __typename: 'Package' }
      & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
    ) | (
      { __typename: 'Source' }
      & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
    )>, builtBy: { __typename?: 'Builder', uri: string }, slsaPredicate: Array<{ __typename?: 'SLSAPredicate', key: string, value: string }> } | null } & { ' $fragmentName'?: 'AllSlsaTreeFragment' };

export type Slsaq1QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq1Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

export type Slsaq2QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq2Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

export type Slsaq3QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq3Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

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

export type AllIsVulnerabilityTreeFragment = { __typename?: 'IsVulnerability', justification: string, origin: string, collector: string, osv: { __typename?: 'OSV', osvIds: Array<{ __typename?: 'OSVId', id: string }> }, vulnerability: { __typename: 'CVE', year: number, cveIds: Array<{ __typename?: 'CVEId', id: string }> } | { __typename: 'GHSA', ghsaIds: Array<{ __typename?: 'GHSAId', id: string }> } } & { ' $fragmentName'?: 'AllIsVulnerabilityTreeFragment' };

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

export type ReachQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type ReachQ1Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };

export const AllArtifactTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<AllArtifactTreeFragment, unknown>;
export const AllCertifyBadTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllCertifyBadTreeFragment, unknown>;
export const AllCertifyPkgTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyPkg"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllCertifyPkgTreeFragment, unknown>;
export const AllSrcTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllSrcTreeFragment, unknown>;
export const AllCertifyScorecardTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllCertifyScorecardTreeFragment, unknown>;
export const AllCertifyVexStatementTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllCertifyVexStatementTreeFragment, unknown>;
export const AllCertifyVulnTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<AllCertifyVulnTreeFragment, unknown>;
export const AllCveTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCveTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}}]} as unknown as DocumentNode<AllCveTreeFragment, unknown>;
export const AllGhsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allGHSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]} as unknown as DocumentNode<AllGhsaTreeFragment, unknown>;
export const AllOsvTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allOSVTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}}]} as unknown as DocumentNode<AllOsvTreeFragment, unknown>;
export const AllHasSbomTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHasSbomTreeFragment, unknown>;
export const AllPkgTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPkgTreeFragment, unknown>;
export const AllSlsaTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]} as unknown as DocumentNode<AllSlsaTreeFragment, unknown>;
export const AllHasSourceAtTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSourceAtTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSourceAt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHasSourceAtTreeFragment, unknown>;
export const AllHashEqualTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHashEqualTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HashEqual"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllHashEqualTreeFragment, unknown>;
export const AllIsDependencyTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsDependencyTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsDependency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependentPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versionRange"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllIsDependencyTreeFragment, unknown>;
export const AllIsOccurrencesTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsOccurrencesTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsOccurrence"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllIsOccurrencesTreeFragment, unknown>;
export const AllIsVulnerabilityTreeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<AllIsVulnerabilityTreeFragment, unknown>;
export const ArtifactQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ1Query, ArtifactQ1QueryVariables>;
export const ArtifactQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ2Query, ArtifactQ2QueryVariables>;
export const ArtifactQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ3Query, ArtifactQ3QueryVariables>;
export const ArtifactQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha512","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ4Query, ArtifactQ4QueryVariables>;
export const ArtifactQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtifactQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifactSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"7A8F47318E4676DACB0142AFA0B83029CD7BEFD9","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactQ5Query, ArtifactQ5QueryVariables>;
export const ArtifactM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArtifactM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"2b00042f7481c7b056c4b410d28f33cf","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactM1Mutation, ArtifactM1MutationVariables>;
export const ArtifactM2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArtifactM2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestArtifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"md5","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"0ABCDEF0FEDCBA01234567890ABCDEF0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allArtifactTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allArtifactTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]} as unknown as DocumentNode<ArtifactM2Mutation, ArtifactM2MutationVariables>;
export const BuilderQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuilderQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builderSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<BuilderQ1Query, BuilderQ1QueryVariables>;
export const BuilderQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuilderQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builderSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uri"},"value":{"kind":"StringValue","value":"https://github.com/Attestations/GitHubHostedActions@v1","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<BuilderQ2Query, BuilderQ2QueryVariables>;
export const BuilderM1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BuilderM1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestBuilder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"builder"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uri"},"value":{"kind":"StringValue","value":"https://github.com/Attestations/GitHubHostedActions@v2","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<BuilderM1Mutation, BuilderM1MutationVariables>;
export const CertifactBadQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ1Query, CertifactBadQ1QueryVariables>;
export const CertifactBadQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ2Query, CertifactBadQ2QueryVariables>;
export const CertifactBadQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ3Query, CertifactBadQ3QueryVariables>;
export const CertifactBadQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ4Query, CertifactBadQ4QueryVariables>;
export const CertifactBadQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ5Query, CertifactBadQ5QueryVariables>;
export const CertifactBadQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifactBadQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyBad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyBadSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyBadTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyBadTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyBad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifactBadQ6Query, CertifactBadQ6QueryVariables>;
export const CertifyPkgQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyPkgQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyPkg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyPkgSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyPkg"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyPkgQ1Query, CertifyPkgQ1QueryVariables>;
export const CertifyPkgQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyPkgQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyPkg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyPkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"Demo ingestion","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyPkg"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyPkgQ2Query, CertifyPkgQ2QueryVariables>;
export const CertifyPkgQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyPkgQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyPkg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyPkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"conan","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"openssl.org","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"3.0.3","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyPkg"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyPkgQ3Query, CertifyPkgQ3QueryVariables>;
export const CertifyPkgQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyPkgQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyPkg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyPkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"pypi","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"django","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"version"},"value":{"kind":"StringValue","value":"1.11.1","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"subpath"},"value":{"kind":"StringValue","value":"subpath","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyPkg"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyPkgQ4Query, CertifyPkgQ4QueryVariables>;
export const CertifyPkgQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyPkgQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyPkg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyPkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"debian","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyPkg"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyPkgQ5Query, CertifyPkgQ5QueryVariables>;
export const ScorecardQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ1Query, ScorecardQ1QueryVariables>;
export const ScorecardQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ2Query, ScorecardQ2QueryVariables>;
export const ScorecardQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/tensorflow/tensorflow","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ3Query, ScorecardQ3QueryVariables>;
export const ScorecardQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScorecardQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scorecards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scorecardSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"aggregateScore"},"value":{"kind":"FloatValue","value":"2.9"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardQ4Query, ScorecardQ4QueryVariables>;
export const ScorecardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Scorecard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceInputSpec"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScorecardInputSpec"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingestSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certifyScorecard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"scorecard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorecard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyScorecardTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyScorecardTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyScorecard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateScore"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"check"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorecardVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scorecardCommit"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<ScorecardMutation, ScorecardMutationVariables>;
export const CertifyVexStatementQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>;
export const CertifyVexStatementQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>;
export const CertifyVexStatementQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>;
export const CertifyVexStatementQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"artifact"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"algorithm"},"value":{"kind":"StringValue","value":"sha256","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"digest"},"value":{"kind":"StringValue","value":"6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>;
export const CertifyVexStatementQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>;
export const CertifyVexStatementQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>;
export const CertifyVexStatementQ7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2018-43610","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>;
export const CertifyVexStatementQ8Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVEXStatementQ8"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVEXStatement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVEXStatementSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-hj5f-4gvw-4rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVEXStatementTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVEXStatementTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVEXStatement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"knownSince"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>;
export const CertifyVulnQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>;
export const CertifyVulnQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>;
export const CertifyVulnQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>;
export const CertifyVulnQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"django","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>;
export const CertifyVulnQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>;
export const CertifyVulnQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>;
export const CertifyVulnQ7Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CertifyVulnQ7"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>;
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
export const HasSbomq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq1Query, HasSbomq1QueryVariables>;
export const HasSbomq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq2Query, HasSbomq2QueryVariables>;
export const HasSbomq3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq3Query, HasSbomq3QueryVariables>;
export const HasSbomq4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq4Query, HasSbomq4QueryVariables>;
export const HasSbomq5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HasSBOMQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSBOM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSBOMSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"openssl","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"source"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"github.com/guacsec/guac","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allHasSBOMTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allHasSBOMTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSBOM"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<HasSbomq5Query, HasSbomq5QueryVariables>;
export const Slsaq1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq1Query, Slsaq1QueryVariables>;
export const Slsaq2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq2Query, Slsaq2QueryVariables>;
export const Slsaq3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SLSAQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"HasSLSA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSLSASpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"package"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"django","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSLSATree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSrcTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"commit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allSLSATree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HasSLSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"builtFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Source"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allSrcTree"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artifact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"algorithm"}},{"kind":"Field","name":{"kind":"Name","value":"digest"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"builtBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildType"}},{"kind":"Field","name":{"kind":"Name","value":"slsaPredicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slsaVersion"}},{"kind":"Field","name":{"kind":"Name","value":"startedOn"}},{"kind":"Field","name":{"kind":"Name","value":"finishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<Slsaq3Query, Slsaq3QueryVariables>;
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
export const IsVulnerabilityQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>;
export const IsVulnerabilityQ2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"origin"},"value":{"kind":"StringValue","value":"testing backend","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>;
export const IsVulnerabilityQ3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>;
export const IsVulnerabilityQ4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osv"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"osvId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>;
export const IsVulnerabilityQ5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cve"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cveId"},"value":{"kind":"StringValue","value":"CVE-2019-13110","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>;
export const IsVulnerabilityQ6Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsVulnerabilityQ6"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IsVulnerability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVulnerabilitySpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vulnerability"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsa"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ghsaId"},"value":{"kind":"StringValue","value":"GHSA-h45f-rjvw-2rv2","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allIsVulnerabilityTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allIsVulnerabilityTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IsVulnerability"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"justification"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]} as unknown as DocumentNode<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>;
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
export const GetCertifyVulnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCertifyVuln"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVulnSpec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CertifyVuln"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"certifyVulnSpec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allCertifyVulnTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allCertifyVulnTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CertifyVuln"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vulnerability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CVE"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"cveIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cveId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OSV"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"osvId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GHSA"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ghsaId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dbUri"}},{"kind":"Field","name":{"kind":"Name","value":"dbVersion"}},{"kind":"Field","name":{"kind":"Name","value":"scannerUri"}},{"kind":"Field","name":{"kind":"Name","value":"scannerVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timeScanned"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"collector"}}]}}]}}]} as unknown as DocumentNode<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>;
export const ReachQ1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReachQ1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkgSpec"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"deb","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"ubuntu","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"dpkg","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"qualifiers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"arch","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"StringValue","value":"amd64","block":false}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"allPkgTree"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"allPkgTree"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"names"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpath"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReachQ1Query, ReachQ1QueryVariables>;
export const AllArtifactTreeFragmentDoc = gql`
    fragment allArtifactTree on Artifact {
  id
  algorithm
  digest
}
    `;
export const AllCertifyBadTreeFragmentDoc = gql`
    fragment allCertifyBadTree on CertifyBad {
  justification
  subject {
    __typename
    ... on Package {
      type
      namespaces {
        namespace
        names {
          name
          versions {
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
      type
      namespaces {
        namespace
        names {
          name
          tag
          commit
        }
      }
    }
    ... on Artifact {
      algorithm
      digest
    }
  }
  origin
  collector
}
    `;
export const AllCertifyPkgTreeFragmentDoc = gql`
    fragment allCertifyPkgTree on CertifyPkg {
  justification
  packages {
    type
    namespaces {
      namespace
      names {
        name
        versions {
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
  origin
  collector
}
    `;
export const AllSrcTreeFragmentDoc = gql`
    fragment allSrcTree on Source {
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
    `;
export const AllCertifyScorecardTreeFragmentDoc = gql`
    fragment allCertifyScorecardTree on CertifyScorecard {
  id
  source {
    ...allSrcTree
  }
  scorecard {
    timeScanned
    aggregateScore
    checks {
      check
      score
    }
    scorecardVersion
    scorecardCommit
    origin
    collector
  }
}
    ${AllSrcTreeFragmentDoc}`;
export const AllCertifyVexStatementTreeFragmentDoc = gql`
    fragment allCertifyVEXStatementTree on CertifyVEXStatement {
  subject {
    __typename
    ... on Package {
      type
      namespaces {
        namespace
        names {
          name
          versions {
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
      algorithm
      digest
    }
  }
  vulnerability {
    __typename
    ... on CVE {
      year
      cveIds {
        id
      }
    }
    ... on GHSA {
      ghsaIds {
        id
      }
    }
  }
  justification
  knownSince
  origin
  collector
}
    `;
export const AllCertifyVulnTreeFragmentDoc = gql`
    fragment allCertifyVulnTree on CertifyVuln {
  package {
    type
    namespaces {
      namespace
      names {
        name
        versions {
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
    __typename
    ... on CVE {
      id
      year
      cveIds {
        id
        cveId
      }
    }
    ... on OSV {
      id
      osvIds {
        id
        osvId
      }
    }
    ... on GHSA {
      id
      ghsaIds {
        id
        ghsaId
      }
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
    `;
export const AllCveTreeFragmentDoc = gql`
    fragment allCveTree on CVE {
  id
  year
  cveIds {
    id
    cveId
  }
}
    `;
export const AllGhsaTreeFragmentDoc = gql`
    fragment allGHSATree on GHSA {
  id
  ghsaIds {
    id
    ghsaId
  }
}
    `;
export const AllOsvTreeFragmentDoc = gql`
    fragment allOSVTree on OSV {
  id
  osvIds {
    id
    osvId
  }
}
    `;
export const AllHasSbomTreeFragmentDoc = gql`
    fragment allHasSBOMTree on HasSBOM {
  uri
  subject {
    __typename
    ... on Package {
      type
      namespaces {
        namespace
        names {
          name
          versions {
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
      type
      namespaces {
        namespace
        names {
          name
          tag
          commit
        }
      }
    }
  }
  origin
  collector
}
    `;
export const AllPkgTreeFragmentDoc = gql`
    fragment allPkgTree on Package {
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
    `;
export const AllSlsaTreeFragmentDoc = gql`
    fragment allSLSATree on HasSLSA {
  subject {
    __typename
    ... on Package {
      ...allPkgTree
    }
    ... on Source {
      ...allSrcTree
    }
    ... on Artifact {
      algorithm
      digest
    }
  }
  slsa {
    builtFrom {
      __typename
      ... on Package {
        ...allPkgTree
      }
      ... on Source {
        ...allSrcTree
      }
      ... on Artifact {
        algorithm
        digest
      }
    }
    builtBy {
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
    ${AllPkgTreeFragmentDoc}
${AllSrcTreeFragmentDoc}`;
export const AllHasSourceAtTreeFragmentDoc = gql`
    fragment allHasSourceAtTree on HasSourceAt {
  id
  justification
  knownSince
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
  source {
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
  origin
  collector
}
    `;
export const AllHashEqualTreeFragmentDoc = gql`
    fragment allHashEqualTree on HashEqual {
  id
  justification
  artifacts {
    id
    algorithm
    digest
  }
  origin
  collector
}
    `;
export const AllIsDependencyTreeFragmentDoc = gql`
    fragment allIsDependencyTree on IsDependency {
  id
  justification
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
  dependentPackage {
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
  versionRange
  origin
  collector
}
    `;
export const AllIsOccurrencesTreeFragmentDoc = gql`
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
    `;
export const AllIsVulnerabilityTreeFragmentDoc = gql`
    fragment allIsVulnerabilityTree on IsVulnerability {
  osv {
    osvIds {
      id
    }
  }
  vulnerability {
    __typename
    ... on CVE {
      year
      cveIds {
        id
      }
    }
    ... on GHSA {
      ghsaIds {
        id
      }
    }
  }
  justification
  origin
  collector
}
    `;
export const ArtifactQ1Document = gql`
    query ArtifactQ1 {
  artifacts(artifactSpec: {}) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;

/**
 * __useArtifactQ1Query__
 *
 * To run a query within a React component, call `useArtifactQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useArtifactQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtifactQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useArtifactQ1Query(baseOptions?: Apollo.QueryHookOptions<ArtifactQ1Query, ArtifactQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtifactQ1Query, ArtifactQ1QueryVariables>(ArtifactQ1Document, options);
      }
export function useArtifactQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtifactQ1Query, ArtifactQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtifactQ1Query, ArtifactQ1QueryVariables>(ArtifactQ1Document, options);
        }
export type ArtifactQ1QueryHookResult = ReturnType<typeof useArtifactQ1Query>;
export type ArtifactQ1LazyQueryHookResult = ReturnType<typeof useArtifactQ1LazyQuery>;
export type ArtifactQ1QueryResult = Apollo.QueryResult<ArtifactQ1Query, ArtifactQ1QueryVariables>;
export const ArtifactQ2Document = gql`
    query ArtifactQ2 {
  artifacts(
    artifactSpec: {algorithm: "sha256", digest: "6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf"}
  ) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;

/**
 * __useArtifactQ2Query__
 *
 * To run a query within a React component, call `useArtifactQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useArtifactQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtifactQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useArtifactQ2Query(baseOptions?: Apollo.QueryHookOptions<ArtifactQ2Query, ArtifactQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtifactQ2Query, ArtifactQ2QueryVariables>(ArtifactQ2Document, options);
      }
export function useArtifactQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtifactQ2Query, ArtifactQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtifactQ2Query, ArtifactQ2QueryVariables>(ArtifactQ2Document, options);
        }
export type ArtifactQ2QueryHookResult = ReturnType<typeof useArtifactQ2Query>;
export type ArtifactQ2LazyQueryHookResult = ReturnType<typeof useArtifactQ2LazyQuery>;
export type ArtifactQ2QueryResult = Apollo.QueryResult<ArtifactQ2Query, ArtifactQ2QueryVariables>;
export const ArtifactQ3Document = gql`
    query ArtifactQ3 {
  artifacts(
    artifactSpec: {digest: "6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf"}
  ) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;

/**
 * __useArtifactQ3Query__
 *
 * To run a query within a React component, call `useArtifactQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useArtifactQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtifactQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useArtifactQ3Query(baseOptions?: Apollo.QueryHookOptions<ArtifactQ3Query, ArtifactQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtifactQ3Query, ArtifactQ3QueryVariables>(ArtifactQ3Document, options);
      }
export function useArtifactQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtifactQ3Query, ArtifactQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtifactQ3Query, ArtifactQ3QueryVariables>(ArtifactQ3Document, options);
        }
export type ArtifactQ3QueryHookResult = ReturnType<typeof useArtifactQ3Query>;
export type ArtifactQ3LazyQueryHookResult = ReturnType<typeof useArtifactQ3LazyQuery>;
export type ArtifactQ3QueryResult = Apollo.QueryResult<ArtifactQ3Query, ArtifactQ3QueryVariables>;
export const ArtifactQ4Document = gql`
    query ArtifactQ4 {
  artifacts(artifactSpec: {algorithm: "sha512"}) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;

/**
 * __useArtifactQ4Query__
 *
 * To run a query within a React component, call `useArtifactQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useArtifactQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtifactQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useArtifactQ4Query(baseOptions?: Apollo.QueryHookOptions<ArtifactQ4Query, ArtifactQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtifactQ4Query, ArtifactQ4QueryVariables>(ArtifactQ4Document, options);
      }
export function useArtifactQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtifactQ4Query, ArtifactQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtifactQ4Query, ArtifactQ4QueryVariables>(ArtifactQ4Document, options);
        }
export type ArtifactQ4QueryHookResult = ReturnType<typeof useArtifactQ4Query>;
export type ArtifactQ4LazyQueryHookResult = ReturnType<typeof useArtifactQ4LazyQuery>;
export type ArtifactQ4QueryResult = Apollo.QueryResult<ArtifactQ4Query, ArtifactQ4QueryVariables>;
export const ArtifactQ5Document = gql`
    query ArtifactQ5 {
  artifacts(artifactSpec: {digest: "7A8F47318E4676DACB0142AFA0B83029CD7BEFD9"}) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;

/**
 * __useArtifactQ5Query__
 *
 * To run a query within a React component, call `useArtifactQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useArtifactQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtifactQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useArtifactQ5Query(baseOptions?: Apollo.QueryHookOptions<ArtifactQ5Query, ArtifactQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtifactQ5Query, ArtifactQ5QueryVariables>(ArtifactQ5Document, options);
      }
export function useArtifactQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtifactQ5Query, ArtifactQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtifactQ5Query, ArtifactQ5QueryVariables>(ArtifactQ5Document, options);
        }
export type ArtifactQ5QueryHookResult = ReturnType<typeof useArtifactQ5Query>;
export type ArtifactQ5LazyQueryHookResult = ReturnType<typeof useArtifactQ5LazyQuery>;
export type ArtifactQ5QueryResult = Apollo.QueryResult<ArtifactQ5Query, ArtifactQ5QueryVariables>;
export const ArtifactM1Document = gql`
    mutation ArtifactM1 {
  ingestArtifact(
    artifact: {algorithm: "md5", digest: "2b00042f7481c7b056c4b410d28f33cf"}
  ) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;
export type ArtifactM1MutationFn = Apollo.MutationFunction<ArtifactM1Mutation, ArtifactM1MutationVariables>;

/**
 * __useArtifactM1Mutation__
 *
 * To run a mutation, you first call `useArtifactM1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtifactM1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artifactM1Mutation, { data, loading, error }] = useArtifactM1Mutation({
 *   variables: {
 *   },
 * });
 */
export function useArtifactM1Mutation(baseOptions?: Apollo.MutationHookOptions<ArtifactM1Mutation, ArtifactM1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtifactM1Mutation, ArtifactM1MutationVariables>(ArtifactM1Document, options);
      }
export type ArtifactM1MutationHookResult = ReturnType<typeof useArtifactM1Mutation>;
export type ArtifactM1MutationResult = Apollo.MutationResult<ArtifactM1Mutation>;
export type ArtifactM1MutationOptions = Apollo.BaseMutationOptions<ArtifactM1Mutation, ArtifactM1MutationVariables>;
export const ArtifactM2Document = gql`
    mutation ArtifactM2 {
  ingestArtifact(
    artifact: {algorithm: "md5", digest: "0ABCDEF0FEDCBA01234567890ABCDEF0"}
  ) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;
export type ArtifactM2MutationFn = Apollo.MutationFunction<ArtifactM2Mutation, ArtifactM2MutationVariables>;

/**
 * __useArtifactM2Mutation__
 *
 * To run a mutation, you first call `useArtifactM2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtifactM2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artifactM2Mutation, { data, loading, error }] = useArtifactM2Mutation({
 *   variables: {
 *   },
 * });
 */
export function useArtifactM2Mutation(baseOptions?: Apollo.MutationHookOptions<ArtifactM2Mutation, ArtifactM2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtifactM2Mutation, ArtifactM2MutationVariables>(ArtifactM2Document, options);
      }
export type ArtifactM2MutationHookResult = ReturnType<typeof useArtifactM2Mutation>;
export type ArtifactM2MutationResult = Apollo.MutationResult<ArtifactM2Mutation>;
export type ArtifactM2MutationOptions = Apollo.BaseMutationOptions<ArtifactM2Mutation, ArtifactM2MutationVariables>;
export const BuilderQ1Document = gql`
    query BuilderQ1 {
  builders(builderSpec: {}) {
    uri
  }
}
    `;

/**
 * __useBuilderQ1Query__
 *
 * To run a query within a React component, call `useBuilderQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useBuilderQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuilderQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useBuilderQ1Query(baseOptions?: Apollo.QueryHookOptions<BuilderQ1Query, BuilderQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuilderQ1Query, BuilderQ1QueryVariables>(BuilderQ1Document, options);
      }
export function useBuilderQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuilderQ1Query, BuilderQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuilderQ1Query, BuilderQ1QueryVariables>(BuilderQ1Document, options);
        }
export type BuilderQ1QueryHookResult = ReturnType<typeof useBuilderQ1Query>;
export type BuilderQ1LazyQueryHookResult = ReturnType<typeof useBuilderQ1LazyQuery>;
export type BuilderQ1QueryResult = Apollo.QueryResult<BuilderQ1Query, BuilderQ1QueryVariables>;
export const BuilderQ2Document = gql`
    query BuilderQ2 {
  builders(
    builderSpec: {uri: "https://github.com/Attestations/GitHubHostedActions@v1"}
  ) {
    uri
  }
}
    `;

/**
 * __useBuilderQ2Query__
 *
 * To run a query within a React component, call `useBuilderQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useBuilderQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuilderQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useBuilderQ2Query(baseOptions?: Apollo.QueryHookOptions<BuilderQ2Query, BuilderQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuilderQ2Query, BuilderQ2QueryVariables>(BuilderQ2Document, options);
      }
export function useBuilderQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuilderQ2Query, BuilderQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuilderQ2Query, BuilderQ2QueryVariables>(BuilderQ2Document, options);
        }
export type BuilderQ2QueryHookResult = ReturnType<typeof useBuilderQ2Query>;
export type BuilderQ2LazyQueryHookResult = ReturnType<typeof useBuilderQ2LazyQuery>;
export type BuilderQ2QueryResult = Apollo.QueryResult<BuilderQ2Query, BuilderQ2QueryVariables>;
export const BuilderM1Document = gql`
    mutation BuilderM1 {
  ingestBuilder(
    builder: {uri: "https://github.com/Attestations/GitHubHostedActions@v2"}
  ) {
    uri
  }
}
    `;
export type BuilderM1MutationFn = Apollo.MutationFunction<BuilderM1Mutation, BuilderM1MutationVariables>;

/**
 * __useBuilderM1Mutation__
 *
 * To run a mutation, you first call `useBuilderM1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuilderM1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [builderM1Mutation, { data, loading, error }] = useBuilderM1Mutation({
 *   variables: {
 *   },
 * });
 */
export function useBuilderM1Mutation(baseOptions?: Apollo.MutationHookOptions<BuilderM1Mutation, BuilderM1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuilderM1Mutation, BuilderM1MutationVariables>(BuilderM1Document, options);
      }
export type BuilderM1MutationHookResult = ReturnType<typeof useBuilderM1Mutation>;
export type BuilderM1MutationResult = Apollo.MutationResult<BuilderM1Mutation>;
export type BuilderM1MutationOptions = Apollo.BaseMutationOptions<BuilderM1Mutation, BuilderM1MutationVariables>;
export const CertifactBadQ1Document = gql`
    query CertifactBadQ1 {
  CertifyBad(certifyBadSpec: {}) {
    ...allCertifyBadTree
  }
}
    ${AllCertifyBadTreeFragmentDoc}`;

/**
 * __useCertifactBadQ1Query__
 *
 * To run a query within a React component, call `useCertifactBadQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifactBadQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifactBadQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifactBadQ1Query(baseOptions?: Apollo.QueryHookOptions<CertifactBadQ1Query, CertifactBadQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifactBadQ1Query, CertifactBadQ1QueryVariables>(CertifactBadQ1Document, options);
      }
export function useCertifactBadQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifactBadQ1Query, CertifactBadQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifactBadQ1Query, CertifactBadQ1QueryVariables>(CertifactBadQ1Document, options);
        }
export type CertifactBadQ1QueryHookResult = ReturnType<typeof useCertifactBadQ1Query>;
export type CertifactBadQ1LazyQueryHookResult = ReturnType<typeof useCertifactBadQ1LazyQuery>;
export type CertifactBadQ1QueryResult = Apollo.QueryResult<CertifactBadQ1Query, CertifactBadQ1QueryVariables>;
export const CertifactBadQ2Document = gql`
    query CertifactBadQ2 {
  CertifyBad(certifyBadSpec: {origin: "testing backend"}) {
    ...allCertifyBadTree
  }
}
    ${AllCertifyBadTreeFragmentDoc}`;

/**
 * __useCertifactBadQ2Query__
 *
 * To run a query within a React component, call `useCertifactBadQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifactBadQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifactBadQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifactBadQ2Query(baseOptions?: Apollo.QueryHookOptions<CertifactBadQ2Query, CertifactBadQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifactBadQ2Query, CertifactBadQ2QueryVariables>(CertifactBadQ2Document, options);
      }
export function useCertifactBadQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifactBadQ2Query, CertifactBadQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifactBadQ2Query, CertifactBadQ2QueryVariables>(CertifactBadQ2Document, options);
        }
export type CertifactBadQ2QueryHookResult = ReturnType<typeof useCertifactBadQ2Query>;
export type CertifactBadQ2LazyQueryHookResult = ReturnType<typeof useCertifactBadQ2LazyQuery>;
export type CertifactBadQ2QueryResult = Apollo.QueryResult<CertifactBadQ2Query, CertifactBadQ2QueryVariables>;
export const CertifactBadQ3Document = gql`
    query CertifactBadQ3 {
  CertifyBad(certifyBadSpec: {subject: {package: {name: "openssl"}}}) {
    ...allCertifyBadTree
  }
}
    ${AllCertifyBadTreeFragmentDoc}`;

/**
 * __useCertifactBadQ3Query__
 *
 * To run a query within a React component, call `useCertifactBadQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifactBadQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifactBadQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifactBadQ3Query(baseOptions?: Apollo.QueryHookOptions<CertifactBadQ3Query, CertifactBadQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifactBadQ3Query, CertifactBadQ3QueryVariables>(CertifactBadQ3Document, options);
      }
export function useCertifactBadQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifactBadQ3Query, CertifactBadQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifactBadQ3Query, CertifactBadQ3QueryVariables>(CertifactBadQ3Document, options);
        }
export type CertifactBadQ3QueryHookResult = ReturnType<typeof useCertifactBadQ3Query>;
export type CertifactBadQ3LazyQueryHookResult = ReturnType<typeof useCertifactBadQ3LazyQuery>;
export type CertifactBadQ3QueryResult = Apollo.QueryResult<CertifactBadQ3Query, CertifactBadQ3QueryVariables>;
export const CertifactBadQ4Document = gql`
    query CertifactBadQ4 {
  CertifyBad(
    certifyBadSpec: {subject: {source: {name: "github.com/guacsec/guac"}}}
  ) {
    ...allCertifyBadTree
  }
}
    ${AllCertifyBadTreeFragmentDoc}`;

/**
 * __useCertifactBadQ4Query__
 *
 * To run a query within a React component, call `useCertifactBadQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifactBadQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifactBadQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifactBadQ4Query(baseOptions?: Apollo.QueryHookOptions<CertifactBadQ4Query, CertifactBadQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifactBadQ4Query, CertifactBadQ4QueryVariables>(CertifactBadQ4Document, options);
      }
export function useCertifactBadQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifactBadQ4Query, CertifactBadQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifactBadQ4Query, CertifactBadQ4QueryVariables>(CertifactBadQ4Document, options);
        }
export type CertifactBadQ4QueryHookResult = ReturnType<typeof useCertifactBadQ4Query>;
export type CertifactBadQ4LazyQueryHookResult = ReturnType<typeof useCertifactBadQ4LazyQuery>;
export type CertifactBadQ4QueryResult = Apollo.QueryResult<CertifactBadQ4Query, CertifactBadQ4QueryVariables>;
export const CertifactBadQ5Document = gql`
    query CertifactBadQ5 {
  CertifyBad(
    certifyBadSpec: {subject: {artifact: {digest: "6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf", algorithm: "sha256"}}}
  ) {
    ...allCertifyBadTree
  }
}
    ${AllCertifyBadTreeFragmentDoc}`;

/**
 * __useCertifactBadQ5Query__
 *
 * To run a query within a React component, call `useCertifactBadQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifactBadQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifactBadQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifactBadQ5Query(baseOptions?: Apollo.QueryHookOptions<CertifactBadQ5Query, CertifactBadQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifactBadQ5Query, CertifactBadQ5QueryVariables>(CertifactBadQ5Document, options);
      }
export function useCertifactBadQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifactBadQ5Query, CertifactBadQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifactBadQ5Query, CertifactBadQ5QueryVariables>(CertifactBadQ5Document, options);
        }
export type CertifactBadQ5QueryHookResult = ReturnType<typeof useCertifactBadQ5Query>;
export type CertifactBadQ5LazyQueryHookResult = ReturnType<typeof useCertifactBadQ5LazyQuery>;
export type CertifactBadQ5QueryResult = Apollo.QueryResult<CertifactBadQ5Query, CertifactBadQ5QueryVariables>;
export const CertifactBadQ6Document = gql`
    query CertifactBadQ6 {
  CertifyBad(
    certifyBadSpec: {subject: {package: {name: "openssl"}, source: {name: "github.com/guacsec/guac"}}}
  ) {
    ...allCertifyBadTree
  }
}
    ${AllCertifyBadTreeFragmentDoc}`;

/**
 * __useCertifactBadQ6Query__
 *
 * To run a query within a React component, call `useCertifactBadQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifactBadQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifactBadQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifactBadQ6Query(baseOptions?: Apollo.QueryHookOptions<CertifactBadQ6Query, CertifactBadQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifactBadQ6Query, CertifactBadQ6QueryVariables>(CertifactBadQ6Document, options);
      }
export function useCertifactBadQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifactBadQ6Query, CertifactBadQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifactBadQ6Query, CertifactBadQ6QueryVariables>(CertifactBadQ6Document, options);
        }
export type CertifactBadQ6QueryHookResult = ReturnType<typeof useCertifactBadQ6Query>;
export type CertifactBadQ6LazyQueryHookResult = ReturnType<typeof useCertifactBadQ6LazyQuery>;
export type CertifactBadQ6QueryResult = Apollo.QueryResult<CertifactBadQ6Query, CertifactBadQ6QueryVariables>;
export const CertifyPkgQ1Document = gql`
    query CertifyPkgQ1 {
  CertifyPkg(certifyPkgSpec: {}) {
    ...allCertifyPkgTree
  }
}
    ${AllCertifyPkgTreeFragmentDoc}`;

/**
 * __useCertifyPkgQ1Query__
 *
 * To run a query within a React component, call `useCertifyPkgQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyPkgQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyPkgQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyPkgQ1Query(baseOptions?: Apollo.QueryHookOptions<CertifyPkgQ1Query, CertifyPkgQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyPkgQ1Query, CertifyPkgQ1QueryVariables>(CertifyPkgQ1Document, options);
      }
export function useCertifyPkgQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyPkgQ1Query, CertifyPkgQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyPkgQ1Query, CertifyPkgQ1QueryVariables>(CertifyPkgQ1Document, options);
        }
export type CertifyPkgQ1QueryHookResult = ReturnType<typeof useCertifyPkgQ1Query>;
export type CertifyPkgQ1LazyQueryHookResult = ReturnType<typeof useCertifyPkgQ1LazyQuery>;
export type CertifyPkgQ1QueryResult = Apollo.QueryResult<CertifyPkgQ1Query, CertifyPkgQ1QueryVariables>;
export const CertifyPkgQ2Document = gql`
    query CertifyPkgQ2 {
  CertifyPkg(certifyPkgSpec: {origin: "Demo ingestion"}) {
    ...allCertifyPkgTree
  }
}
    ${AllCertifyPkgTreeFragmentDoc}`;

/**
 * __useCertifyPkgQ2Query__
 *
 * To run a query within a React component, call `useCertifyPkgQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyPkgQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyPkgQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyPkgQ2Query(baseOptions?: Apollo.QueryHookOptions<CertifyPkgQ2Query, CertifyPkgQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyPkgQ2Query, CertifyPkgQ2QueryVariables>(CertifyPkgQ2Document, options);
      }
export function useCertifyPkgQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyPkgQ2Query, CertifyPkgQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyPkgQ2Query, CertifyPkgQ2QueryVariables>(CertifyPkgQ2Document, options);
        }
export type CertifyPkgQ2QueryHookResult = ReturnType<typeof useCertifyPkgQ2Query>;
export type CertifyPkgQ2LazyQueryHookResult = ReturnType<typeof useCertifyPkgQ2LazyQuery>;
export type CertifyPkgQ2QueryResult = Apollo.QueryResult<CertifyPkgQ2Query, CertifyPkgQ2QueryVariables>;
export const CertifyPkgQ3Document = gql`
    query CertifyPkgQ3 {
  CertifyPkg(
    certifyPkgSpec: {packages: {type: "conan", namespace: "openssl.org", name: "openssl", version: "3.0.3", subpath: ""}}
  ) {
    ...allCertifyPkgTree
  }
}
    ${AllCertifyPkgTreeFragmentDoc}`;

/**
 * __useCertifyPkgQ3Query__
 *
 * To run a query within a React component, call `useCertifyPkgQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyPkgQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyPkgQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyPkgQ3Query(baseOptions?: Apollo.QueryHookOptions<CertifyPkgQ3Query, CertifyPkgQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyPkgQ3Query, CertifyPkgQ3QueryVariables>(CertifyPkgQ3Document, options);
      }
export function useCertifyPkgQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyPkgQ3Query, CertifyPkgQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyPkgQ3Query, CertifyPkgQ3QueryVariables>(CertifyPkgQ3Document, options);
        }
export type CertifyPkgQ3QueryHookResult = ReturnType<typeof useCertifyPkgQ3Query>;
export type CertifyPkgQ3LazyQueryHookResult = ReturnType<typeof useCertifyPkgQ3LazyQuery>;
export type CertifyPkgQ3QueryResult = Apollo.QueryResult<CertifyPkgQ3Query, CertifyPkgQ3QueryVariables>;
export const CertifyPkgQ4Document = gql`
    query CertifyPkgQ4 {
  CertifyPkg(
    certifyPkgSpec: {packages: {type: "pypi", namespace: "", name: "django", version: "1.11.1", subpath: "subpath"}}
  ) {
    ...allCertifyPkgTree
  }
}
    ${AllCertifyPkgTreeFragmentDoc}`;

/**
 * __useCertifyPkgQ4Query__
 *
 * To run a query within a React component, call `useCertifyPkgQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyPkgQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyPkgQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyPkgQ4Query(baseOptions?: Apollo.QueryHookOptions<CertifyPkgQ4Query, CertifyPkgQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyPkgQ4Query, CertifyPkgQ4QueryVariables>(CertifyPkgQ4Document, options);
      }
export function useCertifyPkgQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyPkgQ4Query, CertifyPkgQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyPkgQ4Query, CertifyPkgQ4QueryVariables>(CertifyPkgQ4Document, options);
        }
export type CertifyPkgQ4QueryHookResult = ReturnType<typeof useCertifyPkgQ4Query>;
export type CertifyPkgQ4LazyQueryHookResult = ReturnType<typeof useCertifyPkgQ4LazyQuery>;
export type CertifyPkgQ4QueryResult = Apollo.QueryResult<CertifyPkgQ4Query, CertifyPkgQ4QueryVariables>;
export const CertifyPkgQ5Document = gql`
    query CertifyPkgQ5 {
  CertifyPkg(certifyPkgSpec: {packages: {type: "deb", namespace: "debian"}}) {
    ...allCertifyPkgTree
  }
}
    ${AllCertifyPkgTreeFragmentDoc}`;

/**
 * __useCertifyPkgQ5Query__
 *
 * To run a query within a React component, call `useCertifyPkgQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyPkgQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyPkgQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyPkgQ5Query(baseOptions?: Apollo.QueryHookOptions<CertifyPkgQ5Query, CertifyPkgQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyPkgQ5Query, CertifyPkgQ5QueryVariables>(CertifyPkgQ5Document, options);
      }
export function useCertifyPkgQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyPkgQ5Query, CertifyPkgQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyPkgQ5Query, CertifyPkgQ5QueryVariables>(CertifyPkgQ5Document, options);
        }
export type CertifyPkgQ5QueryHookResult = ReturnType<typeof useCertifyPkgQ5Query>;
export type CertifyPkgQ5LazyQueryHookResult = ReturnType<typeof useCertifyPkgQ5LazyQuery>;
export type CertifyPkgQ5QueryResult = Apollo.QueryResult<CertifyPkgQ5Query, CertifyPkgQ5QueryVariables>;
export const ScorecardQ1Document = gql`
    query ScorecardQ1 {
  scorecards(scorecardSpec: {}) {
    ...allCertifyScorecardTree
  }
}
    ${AllCertifyScorecardTreeFragmentDoc}`;

/**
 * __useScorecardQ1Query__
 *
 * To run a query within a React component, call `useScorecardQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useScorecardQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useScorecardQ1Query(baseOptions?: Apollo.QueryHookOptions<ScorecardQ1Query, ScorecardQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScorecardQ1Query, ScorecardQ1QueryVariables>(ScorecardQ1Document, options);
      }
export function useScorecardQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScorecardQ1Query, ScorecardQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScorecardQ1Query, ScorecardQ1QueryVariables>(ScorecardQ1Document, options);
        }
export type ScorecardQ1QueryHookResult = ReturnType<typeof useScorecardQ1Query>;
export type ScorecardQ1LazyQueryHookResult = ReturnType<typeof useScorecardQ1LazyQuery>;
export type ScorecardQ1QueryResult = Apollo.QueryResult<ScorecardQ1Query, ScorecardQ1QueryVariables>;
export const ScorecardQ2Document = gql`
    query ScorecardQ2 {
  scorecards(scorecardSpec: {origin: "testing backend"}) {
    ...allCertifyScorecardTree
  }
}
    ${AllCertifyScorecardTreeFragmentDoc}`;

/**
 * __useScorecardQ2Query__
 *
 * To run a query within a React component, call `useScorecardQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useScorecardQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useScorecardQ2Query(baseOptions?: Apollo.QueryHookOptions<ScorecardQ2Query, ScorecardQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScorecardQ2Query, ScorecardQ2QueryVariables>(ScorecardQ2Document, options);
      }
export function useScorecardQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScorecardQ2Query, ScorecardQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScorecardQ2Query, ScorecardQ2QueryVariables>(ScorecardQ2Document, options);
        }
export type ScorecardQ2QueryHookResult = ReturnType<typeof useScorecardQ2Query>;
export type ScorecardQ2LazyQueryHookResult = ReturnType<typeof useScorecardQ2LazyQuery>;
export type ScorecardQ2QueryResult = Apollo.QueryResult<ScorecardQ2Query, ScorecardQ2QueryVariables>;
export const ScorecardQ3Document = gql`
    query ScorecardQ3 {
  scorecards(scorecardSpec: {source: {name: "github.com/tensorflow/tensorflow"}}) {
    ...allCertifyScorecardTree
  }
}
    ${AllCertifyScorecardTreeFragmentDoc}`;

/**
 * __useScorecardQ3Query__
 *
 * To run a query within a React component, call `useScorecardQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useScorecardQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useScorecardQ3Query(baseOptions?: Apollo.QueryHookOptions<ScorecardQ3Query, ScorecardQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScorecardQ3Query, ScorecardQ3QueryVariables>(ScorecardQ3Document, options);
      }
export function useScorecardQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScorecardQ3Query, ScorecardQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScorecardQ3Query, ScorecardQ3QueryVariables>(ScorecardQ3Document, options);
        }
export type ScorecardQ3QueryHookResult = ReturnType<typeof useScorecardQ3Query>;
export type ScorecardQ3LazyQueryHookResult = ReturnType<typeof useScorecardQ3LazyQuery>;
export type ScorecardQ3QueryResult = Apollo.QueryResult<ScorecardQ3Query, ScorecardQ3QueryVariables>;
export const ScorecardQ4Document = gql`
    query ScorecardQ4 {
  scorecards(scorecardSpec: {aggregateScore: 2.9}) {
    ...allCertifyScorecardTree
  }
}
    ${AllCertifyScorecardTreeFragmentDoc}`;

/**
 * __useScorecardQ4Query__
 *
 * To run a query within a React component, call `useScorecardQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useScorecardQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useScorecardQ4Query(baseOptions?: Apollo.QueryHookOptions<ScorecardQ4Query, ScorecardQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScorecardQ4Query, ScorecardQ4QueryVariables>(ScorecardQ4Document, options);
      }
export function useScorecardQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScorecardQ4Query, ScorecardQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScorecardQ4Query, ScorecardQ4QueryVariables>(ScorecardQ4Document, options);
        }
export type ScorecardQ4QueryHookResult = ReturnType<typeof useScorecardQ4Query>;
export type ScorecardQ4LazyQueryHookResult = ReturnType<typeof useScorecardQ4LazyQuery>;
export type ScorecardQ4QueryResult = Apollo.QueryResult<ScorecardQ4Query, ScorecardQ4QueryVariables>;
export const ScorecardDocument = gql`
    mutation Scorecard($source: SourceInputSpec!, $scorecard: ScorecardInputSpec!) {
  ingestSource(source: $source) {
    ...allSrcTree
  }
  certifyScorecard(source: $source, scorecard: $scorecard) {
    ...allCertifyScorecardTree
  }
}
    ${AllSrcTreeFragmentDoc}
${AllCertifyScorecardTreeFragmentDoc}`;
export type ScorecardMutationFn = Apollo.MutationFunction<ScorecardMutation, ScorecardMutationVariables>;

/**
 * __useScorecardMutation__
 *
 * To run a mutation, you first call `useScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scorecardMutation, { data, loading, error }] = useScorecardMutation({
 *   variables: {
 *      source: // value for 'source'
 *      scorecard: // value for 'scorecard'
 *   },
 * });
 */
export function useScorecardMutation(baseOptions?: Apollo.MutationHookOptions<ScorecardMutation, ScorecardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ScorecardMutation, ScorecardMutationVariables>(ScorecardDocument, options);
      }
export type ScorecardMutationHookResult = ReturnType<typeof useScorecardMutation>;
export type ScorecardMutationResult = Apollo.MutationResult<ScorecardMutation>;
export type ScorecardMutationOptions = Apollo.BaseMutationOptions<ScorecardMutation, ScorecardMutationVariables>;
export const CertifyVexStatementQ1Document = gql`
    query CertifyVEXStatementQ1 {
  CertifyVEXStatement(certifyVEXStatementSpec: {}) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ1Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ1Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>(CertifyVexStatementQ1Document, options);
      }
export function useCertifyVexStatementQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>(CertifyVexStatementQ1Document, options);
        }
export type CertifyVexStatementQ1QueryHookResult = ReturnType<typeof useCertifyVexStatementQ1Query>;
export type CertifyVexStatementQ1LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ1LazyQuery>;
export type CertifyVexStatementQ1QueryResult = Apollo.QueryResult<CertifyVexStatementQ1Query, CertifyVexStatementQ1QueryVariables>;
export const CertifyVexStatementQ2Document = gql`
    query CertifyVEXStatementQ2 {
  CertifyVEXStatement(certifyVEXStatementSpec: {origin: "testing backend"}) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ2Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ2Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>(CertifyVexStatementQ2Document, options);
      }
export function useCertifyVexStatementQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>(CertifyVexStatementQ2Document, options);
        }
export type CertifyVexStatementQ2QueryHookResult = ReturnType<typeof useCertifyVexStatementQ2Query>;
export type CertifyVexStatementQ2LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ2LazyQuery>;
export type CertifyVexStatementQ2QueryResult = Apollo.QueryResult<CertifyVexStatementQ2Query, CertifyVexStatementQ2QueryVariables>;
export const CertifyVexStatementQ3Document = gql`
    query CertifyVEXStatementQ3 {
  CertifyVEXStatement(
    certifyVEXStatementSpec: {subject: {package: {name: "openssl"}}}
  ) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ3Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ3Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>(CertifyVexStatementQ3Document, options);
      }
export function useCertifyVexStatementQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>(CertifyVexStatementQ3Document, options);
        }
export type CertifyVexStatementQ3QueryHookResult = ReturnType<typeof useCertifyVexStatementQ3Query>;
export type CertifyVexStatementQ3LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ3LazyQuery>;
export type CertifyVexStatementQ3QueryResult = Apollo.QueryResult<CertifyVexStatementQ3Query, CertifyVexStatementQ3QueryVariables>;
export const CertifyVexStatementQ4Document = gql`
    query CertifyVEXStatementQ4 {
  CertifyVEXStatement(
    certifyVEXStatementSpec: {subject: {artifact: {algorithm: "sha256", digest: "6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf"}}}
  ) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ4Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ4Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>(CertifyVexStatementQ4Document, options);
      }
export function useCertifyVexStatementQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>(CertifyVexStatementQ4Document, options);
        }
export type CertifyVexStatementQ4QueryHookResult = ReturnType<typeof useCertifyVexStatementQ4Query>;
export type CertifyVexStatementQ4LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ4LazyQuery>;
export type CertifyVexStatementQ4QueryResult = Apollo.QueryResult<CertifyVexStatementQ4Query, CertifyVexStatementQ4QueryVariables>;
export const CertifyVexStatementQ5Document = gql`
    query CertifyVEXStatementQ5 {
  CertifyVEXStatement(
    certifyVEXStatementSpec: {vulnerability: {cve: {cveId: "CVE-2019-13110"}}}
  ) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ5Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ5Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>(CertifyVexStatementQ5Document, options);
      }
export function useCertifyVexStatementQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>(CertifyVexStatementQ5Document, options);
        }
export type CertifyVexStatementQ5QueryHookResult = ReturnType<typeof useCertifyVexStatementQ5Query>;
export type CertifyVexStatementQ5LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ5LazyQuery>;
export type CertifyVexStatementQ5QueryResult = Apollo.QueryResult<CertifyVexStatementQ5Query, CertifyVexStatementQ5QueryVariables>;
export const CertifyVexStatementQ6Document = gql`
    query CertifyVEXStatementQ6 {
  CertifyVEXStatement(
    certifyVEXStatementSpec: {vulnerability: {ghsa: {ghsaId: "GHSA-h45f-rjvw-2rv2"}}}
  ) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ6Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ6Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>(CertifyVexStatementQ6Document, options);
      }
export function useCertifyVexStatementQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>(CertifyVexStatementQ6Document, options);
        }
export type CertifyVexStatementQ6QueryHookResult = ReturnType<typeof useCertifyVexStatementQ6Query>;
export type CertifyVexStatementQ6LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ6LazyQuery>;
export type CertifyVexStatementQ6QueryResult = Apollo.QueryResult<CertifyVexStatementQ6Query, CertifyVexStatementQ6QueryVariables>;
export const CertifyVexStatementQ7Document = gql`
    query CertifyVEXStatementQ7 {
  CertifyVEXStatement(
    certifyVEXStatementSpec: {vulnerability: {cve: {cveId: "CVE-2018-43610"}}}
  ) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ7Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ7Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ7Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ7Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ7Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>(CertifyVexStatementQ7Document, options);
      }
export function useCertifyVexStatementQ7LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>(CertifyVexStatementQ7Document, options);
        }
export type CertifyVexStatementQ7QueryHookResult = ReturnType<typeof useCertifyVexStatementQ7Query>;
export type CertifyVexStatementQ7LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ7LazyQuery>;
export type CertifyVexStatementQ7QueryResult = Apollo.QueryResult<CertifyVexStatementQ7Query, CertifyVexStatementQ7QueryVariables>;
export const CertifyVexStatementQ8Document = gql`
    query CertifyVEXStatementQ8 {
  CertifyVEXStatement(
    certifyVEXStatementSpec: {vulnerability: {ghsa: {ghsaId: "GHSA-hj5f-4gvw-4rv2"}}}
  ) {
    ...allCertifyVEXStatementTree
  }
}
    ${AllCertifyVexStatementTreeFragmentDoc}`;

/**
 * __useCertifyVexStatementQ8Query__
 *
 * To run a query within a React component, call `useCertifyVexStatementQ8Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVexStatementQ8Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVexStatementQ8Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVexStatementQ8Query(baseOptions?: Apollo.QueryHookOptions<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>(CertifyVexStatementQ8Document, options);
      }
export function useCertifyVexStatementQ8LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>(CertifyVexStatementQ8Document, options);
        }
export type CertifyVexStatementQ8QueryHookResult = ReturnType<typeof useCertifyVexStatementQ8Query>;
export type CertifyVexStatementQ8LazyQueryHookResult = ReturnType<typeof useCertifyVexStatementQ8LazyQuery>;
export type CertifyVexStatementQ8QueryResult = Apollo.QueryResult<CertifyVexStatementQ8Query, CertifyVexStatementQ8QueryVariables>;
export const CertifyVulnQ1Document = gql`
    query CertifyVulnQ1 {
  CertifyVuln(certifyVulnSpec: {}) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ1Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ1Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>(CertifyVulnQ1Document, options);
      }
export function useCertifyVulnQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>(CertifyVulnQ1Document, options);
        }
export type CertifyVulnQ1QueryHookResult = ReturnType<typeof useCertifyVulnQ1Query>;
export type CertifyVulnQ1LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ1LazyQuery>;
export type CertifyVulnQ1QueryResult = Apollo.QueryResult<CertifyVulnQ1Query, CertifyVulnQ1QueryVariables>;
export const CertifyVulnQ2Document = gql`
    query CertifyVulnQ2 {
  CertifyVuln(certifyVulnSpec: {origin: "testing backend"}) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ2Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ2Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>(CertifyVulnQ2Document, options);
      }
export function useCertifyVulnQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>(CertifyVulnQ2Document, options);
        }
export type CertifyVulnQ2QueryHookResult = ReturnType<typeof useCertifyVulnQ2Query>;
export type CertifyVulnQ2LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ2LazyQuery>;
export type CertifyVulnQ2QueryResult = Apollo.QueryResult<CertifyVulnQ2Query, CertifyVulnQ2QueryVariables>;
export const CertifyVulnQ3Document = gql`
    query CertifyVulnQ3 {
  CertifyVuln(certifyVulnSpec: {package: {name: "openssl"}}) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ3Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ3Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>(CertifyVulnQ3Document, options);
      }
export function useCertifyVulnQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>(CertifyVulnQ3Document, options);
        }
export type CertifyVulnQ3QueryHookResult = ReturnType<typeof useCertifyVulnQ3Query>;
export type CertifyVulnQ3LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ3LazyQuery>;
export type CertifyVulnQ3QueryResult = Apollo.QueryResult<CertifyVulnQ3Query, CertifyVulnQ3QueryVariables>;
export const CertifyVulnQ4Document = gql`
    query CertifyVulnQ4 {
  CertifyVuln(certifyVulnSpec: {package: {name: "django"}}) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ4Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ4Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>(CertifyVulnQ4Document, options);
      }
export function useCertifyVulnQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>(CertifyVulnQ4Document, options);
        }
export type CertifyVulnQ4QueryHookResult = ReturnType<typeof useCertifyVulnQ4Query>;
export type CertifyVulnQ4LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ4LazyQuery>;
export type CertifyVulnQ4QueryResult = Apollo.QueryResult<CertifyVulnQ4Query, CertifyVulnQ4QueryVariables>;
export const CertifyVulnQ5Document = gql`
    query CertifyVulnQ5 {
  CertifyVuln(certifyVulnSpec: {vulnerability: {cve: {cveId: "CVE-2019-13110"}}}) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ5Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ5Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>(CertifyVulnQ5Document, options);
      }
export function useCertifyVulnQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>(CertifyVulnQ5Document, options);
        }
export type CertifyVulnQ5QueryHookResult = ReturnType<typeof useCertifyVulnQ5Query>;
export type CertifyVulnQ5LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ5LazyQuery>;
export type CertifyVulnQ5QueryResult = Apollo.QueryResult<CertifyVulnQ5Query, CertifyVulnQ5QueryVariables>;
export const CertifyVulnQ6Document = gql`
    query CertifyVulnQ6 {
  CertifyVuln(
    certifyVulnSpec: {vulnerability: {ghsa: {ghsaId: "GHSA-h45f-rjvw-2rv2"}}}
  ) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ6Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ6Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>(CertifyVulnQ6Document, options);
      }
export function useCertifyVulnQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>(CertifyVulnQ6Document, options);
        }
export type CertifyVulnQ6QueryHookResult = ReturnType<typeof useCertifyVulnQ6Query>;
export type CertifyVulnQ6LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ6LazyQuery>;
export type CertifyVulnQ6QueryResult = Apollo.QueryResult<CertifyVulnQ6Query, CertifyVulnQ6QueryVariables>;
export const CertifyVulnQ7Document = gql`
    query CertifyVulnQ7 {
  CertifyVuln(certifyVulnSpec: {vulnerability: {osv: {osvId: "CVE-2019-13110"}}}) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useCertifyVulnQ7Query__
 *
 * To run a query within a React component, call `useCertifyVulnQ7Query` and pass it any options that fit your needs.
 * When your component renders, `useCertifyVulnQ7Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertifyVulnQ7Query({
 *   variables: {
 *   },
 * });
 */
export function useCertifyVulnQ7Query(baseOptions?: Apollo.QueryHookOptions<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>(CertifyVulnQ7Document, options);
      }
export function useCertifyVulnQ7LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>(CertifyVulnQ7Document, options);
        }
export type CertifyVulnQ7QueryHookResult = ReturnType<typeof useCertifyVulnQ7Query>;
export type CertifyVulnQ7LazyQueryHookResult = ReturnType<typeof useCertifyVulnQ7LazyQuery>;
export type CertifyVulnQ7QueryResult = Apollo.QueryResult<CertifyVulnQ7Query, CertifyVulnQ7QueryVariables>;
export const Cveq1Document = gql`
    query CVEQ1 {
  cve(cveSpec: {}) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;

/**
 * __useCveq1Query__
 *
 * To run a query within a React component, call `useCveq1Query` and pass it any options that fit your needs.
 * When your component renders, `useCveq1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCveq1Query({
 *   variables: {
 *   },
 * });
 */
export function useCveq1Query(baseOptions?: Apollo.QueryHookOptions<Cveq1Query, Cveq1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Cveq1Query, Cveq1QueryVariables>(Cveq1Document, options);
      }
export function useCveq1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Cveq1Query, Cveq1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Cveq1Query, Cveq1QueryVariables>(Cveq1Document, options);
        }
export type Cveq1QueryHookResult = ReturnType<typeof useCveq1Query>;
export type Cveq1LazyQueryHookResult = ReturnType<typeof useCveq1LazyQuery>;
export type Cveq1QueryResult = Apollo.QueryResult<Cveq1Query, Cveq1QueryVariables>;
export const Cveq2Document = gql`
    query CVEQ2 {
  cve(cveSpec: {year: 2014}) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;

/**
 * __useCveq2Query__
 *
 * To run a query within a React component, call `useCveq2Query` and pass it any options that fit your needs.
 * When your component renders, `useCveq2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCveq2Query({
 *   variables: {
 *   },
 * });
 */
export function useCveq2Query(baseOptions?: Apollo.QueryHookOptions<Cveq2Query, Cveq2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Cveq2Query, Cveq2QueryVariables>(Cveq2Document, options);
      }
export function useCveq2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Cveq2Query, Cveq2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Cveq2Query, Cveq2QueryVariables>(Cveq2Document, options);
        }
export type Cveq2QueryHookResult = ReturnType<typeof useCveq2Query>;
export type Cveq2LazyQueryHookResult = ReturnType<typeof useCveq2LazyQuery>;
export type Cveq2QueryResult = Apollo.QueryResult<Cveq2Query, Cveq2QueryVariables>;
export const Cveq3Document = gql`
    query CVEQ3 {
  cve(cveSpec: {cveId: "CVE-2014-8139"}) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;

/**
 * __useCveq3Query__
 *
 * To run a query within a React component, call `useCveq3Query` and pass it any options that fit your needs.
 * When your component renders, `useCveq3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCveq3Query({
 *   variables: {
 *   },
 * });
 */
export function useCveq3Query(baseOptions?: Apollo.QueryHookOptions<Cveq3Query, Cveq3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Cveq3Query, Cveq3QueryVariables>(Cveq3Document, options);
      }
export function useCveq3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Cveq3Query, Cveq3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Cveq3Query, Cveq3QueryVariables>(Cveq3Document, options);
        }
export type Cveq3QueryHookResult = ReturnType<typeof useCveq3Query>;
export type Cveq3LazyQueryHookResult = ReturnType<typeof useCveq3LazyQuery>;
export type Cveq3QueryResult = Apollo.QueryResult<Cveq3Query, Cveq3QueryVariables>;
export const Cveq4Document = gql`
    query CVEQ4 {
  cve(cveSpec: {year: 2014, cveId: "CVE-2014-8140"}) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;

/**
 * __useCveq4Query__
 *
 * To run a query within a React component, call `useCveq4Query` and pass it any options that fit your needs.
 * When your component renders, `useCveq4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCveq4Query({
 *   variables: {
 *   },
 * });
 */
export function useCveq4Query(baseOptions?: Apollo.QueryHookOptions<Cveq4Query, Cveq4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Cveq4Query, Cveq4QueryVariables>(Cveq4Document, options);
      }
export function useCveq4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Cveq4Query, Cveq4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Cveq4Query, Cveq4QueryVariables>(Cveq4Document, options);
        }
export type Cveq4QueryHookResult = ReturnType<typeof useCveq4Query>;
export type Cveq4LazyQueryHookResult = ReturnType<typeof useCveq4LazyQuery>;
export type Cveq4QueryResult = Apollo.QueryResult<Cveq4Query, Cveq4QueryVariables>;
export const Cvem1Document = gql`
    mutation CVEM1 {
  ingestCVE(cve: {year: 2023, cveId: "CVE-2023-12345"}) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;
export type Cvem1MutationFn = Apollo.MutationFunction<Cvem1Mutation, Cvem1MutationVariables>;

/**
 * __useCvem1Mutation__
 *
 * To run a mutation, you first call `useCvem1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCvem1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cvem1Mutation, { data, loading, error }] = useCvem1Mutation({
 *   variables: {
 *   },
 * });
 */
export function useCvem1Mutation(baseOptions?: Apollo.MutationHookOptions<Cvem1Mutation, Cvem1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Cvem1Mutation, Cvem1MutationVariables>(Cvem1Document, options);
      }
export type Cvem1MutationHookResult = ReturnType<typeof useCvem1Mutation>;
export type Cvem1MutationResult = Apollo.MutationResult<Cvem1Mutation>;
export type Cvem1MutationOptions = Apollo.BaseMutationOptions<Cvem1Mutation, Cvem1MutationVariables>;
export const Cvem2Document = gql`
    mutation CVEM2 {
  ingestCVE(cve: {year: 2032, cveId: "cve-2032-12345"}) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;
export type Cvem2MutationFn = Apollo.MutationFunction<Cvem2Mutation, Cvem2MutationVariables>;

/**
 * __useCvem2Mutation__
 *
 * To run a mutation, you first call `useCvem2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCvem2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cvem2Mutation, { data, loading, error }] = useCvem2Mutation({
 *   variables: {
 *   },
 * });
 */
export function useCvem2Mutation(baseOptions?: Apollo.MutationHookOptions<Cvem2Mutation, Cvem2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Cvem2Mutation, Cvem2MutationVariables>(Cvem2Document, options);
      }
export type Cvem2MutationHookResult = ReturnType<typeof useCvem2Mutation>;
export type Cvem2MutationResult = Apollo.MutationResult<Cvem2Mutation>;
export type Cvem2MutationOptions = Apollo.BaseMutationOptions<Cvem2Mutation, Cvem2MutationVariables>;
export const Ghsaq1Document = gql`
    query GHSAQ1 {
  ghsa(ghsaSpec: {}) {
    ...allGHSATree
  }
}
    ${AllGhsaTreeFragmentDoc}`;

/**
 * __useGhsaq1Query__
 *
 * To run a query within a React component, call `useGhsaq1Query` and pass it any options that fit your needs.
 * When your component renders, `useGhsaq1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGhsaq1Query({
 *   variables: {
 *   },
 * });
 */
export function useGhsaq1Query(baseOptions?: Apollo.QueryHookOptions<Ghsaq1Query, Ghsaq1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Ghsaq1Query, Ghsaq1QueryVariables>(Ghsaq1Document, options);
      }
export function useGhsaq1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Ghsaq1Query, Ghsaq1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Ghsaq1Query, Ghsaq1QueryVariables>(Ghsaq1Document, options);
        }
export type Ghsaq1QueryHookResult = ReturnType<typeof useGhsaq1Query>;
export type Ghsaq1LazyQueryHookResult = ReturnType<typeof useGhsaq1LazyQuery>;
export type Ghsaq1QueryResult = Apollo.QueryResult<Ghsaq1Query, Ghsaq1QueryVariables>;
export const Ghsaq2Document = gql`
    query GHSAQ2 {
  ghsa(ghsaSpec: {ghsaId: "GHSA-h45f-rjvw-2rv2"}) {
    ...allGHSATree
  }
}
    ${AllGhsaTreeFragmentDoc}`;

/**
 * __useGhsaq2Query__
 *
 * To run a query within a React component, call `useGhsaq2Query` and pass it any options that fit your needs.
 * When your component renders, `useGhsaq2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGhsaq2Query({
 *   variables: {
 *   },
 * });
 */
export function useGhsaq2Query(baseOptions?: Apollo.QueryHookOptions<Ghsaq2Query, Ghsaq2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Ghsaq2Query, Ghsaq2QueryVariables>(Ghsaq2Document, options);
      }
export function useGhsaq2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Ghsaq2Query, Ghsaq2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Ghsaq2Query, Ghsaq2QueryVariables>(Ghsaq2Document, options);
        }
export type Ghsaq2QueryHookResult = ReturnType<typeof useGhsaq2Query>;
export type Ghsaq2LazyQueryHookResult = ReturnType<typeof useGhsaq2LazyQuery>;
export type Ghsaq2QueryResult = Apollo.QueryResult<Ghsaq2Query, Ghsaq2QueryVariables>;
export const Ghsam1Document = gql`
    mutation GHSAM1 {
  ingestGHSA(ghsa: {ghsaId: "GHSA-abcd-efgh-1234"}) {
    ...allGHSATree
  }
}
    ${AllGhsaTreeFragmentDoc}`;
export type Ghsam1MutationFn = Apollo.MutationFunction<Ghsam1Mutation, Ghsam1MutationVariables>;

/**
 * __useGhsam1Mutation__
 *
 * To run a mutation, you first call `useGhsam1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGhsam1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ghsam1Mutation, { data, loading, error }] = useGhsam1Mutation({
 *   variables: {
 *   },
 * });
 */
export function useGhsam1Mutation(baseOptions?: Apollo.MutationHookOptions<Ghsam1Mutation, Ghsam1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Ghsam1Mutation, Ghsam1MutationVariables>(Ghsam1Document, options);
      }
export type Ghsam1MutationHookResult = ReturnType<typeof useGhsam1Mutation>;
export type Ghsam1MutationResult = Apollo.MutationResult<Ghsam1Mutation>;
export type Ghsam1MutationOptions = Apollo.BaseMutationOptions<Ghsam1Mutation, Ghsam1MutationVariables>;
export const Osvq1Document = gql`
    query OSVQ1 {
  osv(osvSpec: {}) {
    ...allOSVTree
  }
}
    ${AllOsvTreeFragmentDoc}`;

/**
 * __useOsvq1Query__
 *
 * To run a query within a React component, call `useOsvq1Query` and pass it any options that fit your needs.
 * When your component renders, `useOsvq1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOsvq1Query({
 *   variables: {
 *   },
 * });
 */
export function useOsvq1Query(baseOptions?: Apollo.QueryHookOptions<Osvq1Query, Osvq1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Osvq1Query, Osvq1QueryVariables>(Osvq1Document, options);
      }
export function useOsvq1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Osvq1Query, Osvq1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Osvq1Query, Osvq1QueryVariables>(Osvq1Document, options);
        }
export type Osvq1QueryHookResult = ReturnType<typeof useOsvq1Query>;
export type Osvq1LazyQueryHookResult = ReturnType<typeof useOsvq1LazyQuery>;
export type Osvq1QueryResult = Apollo.QueryResult<Osvq1Query, Osvq1QueryVariables>;
export const Osvq2Document = gql`
    query OSVQ2 {
  osv(osvSpec: {osvId: "CVE-2014-8139"}) {
    ...allOSVTree
  }
}
    ${AllOsvTreeFragmentDoc}`;

/**
 * __useOsvq2Query__
 *
 * To run a query within a React component, call `useOsvq2Query` and pass it any options that fit your needs.
 * When your component renders, `useOsvq2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOsvq2Query({
 *   variables: {
 *   },
 * });
 */
export function useOsvq2Query(baseOptions?: Apollo.QueryHookOptions<Osvq2Query, Osvq2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Osvq2Query, Osvq2QueryVariables>(Osvq2Document, options);
      }
export function useOsvq2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Osvq2Query, Osvq2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Osvq2Query, Osvq2QueryVariables>(Osvq2Document, options);
        }
export type Osvq2QueryHookResult = ReturnType<typeof useOsvq2Query>;
export type Osvq2LazyQueryHookResult = ReturnType<typeof useOsvq2LazyQuery>;
export type Osvq2QueryResult = Apollo.QueryResult<Osvq2Query, Osvq2QueryVariables>;
export const Osvq3Document = gql`
    query OSVQ3 {
  osv(osvSpec: {osvId: "ghsa-h45f-rjvw-2rv2"}) {
    ...allOSVTree
  }
}
    ${AllOsvTreeFragmentDoc}`;

/**
 * __useOsvq3Query__
 *
 * To run a query within a React component, call `useOsvq3Query` and pass it any options that fit your needs.
 * When your component renders, `useOsvq3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOsvq3Query({
 *   variables: {
 *   },
 * });
 */
export function useOsvq3Query(baseOptions?: Apollo.QueryHookOptions<Osvq3Query, Osvq3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Osvq3Query, Osvq3QueryVariables>(Osvq3Document, options);
      }
export function useOsvq3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Osvq3Query, Osvq3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Osvq3Query, Osvq3QueryVariables>(Osvq3Document, options);
        }
export type Osvq3QueryHookResult = ReturnType<typeof useOsvq3Query>;
export type Osvq3LazyQueryHookResult = ReturnType<typeof useOsvq3LazyQuery>;
export type Osvq3QueryResult = Apollo.QueryResult<Osvq3Query, Osvq3QueryVariables>;
export const Osvm1Document = gql`
    mutation OSVM1 {
  ingestOSV(osv: {osvId: "GHSA-abcd-efgh-1234"}) {
    ...allOSVTree
  }
}
    ${AllOsvTreeFragmentDoc}`;
export type Osvm1MutationFn = Apollo.MutationFunction<Osvm1Mutation, Osvm1MutationVariables>;

/**
 * __useOsvm1Mutation__
 *
 * To run a mutation, you first call `useOsvm1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOsvm1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [osvm1Mutation, { data, loading, error }] = useOsvm1Mutation({
 *   variables: {
 *   },
 * });
 */
export function useOsvm1Mutation(baseOptions?: Apollo.MutationHookOptions<Osvm1Mutation, Osvm1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Osvm1Mutation, Osvm1MutationVariables>(Osvm1Document, options);
      }
export type Osvm1MutationHookResult = ReturnType<typeof useOsvm1Mutation>;
export type Osvm1MutationResult = Apollo.MutationResult<Osvm1Mutation>;
export type Osvm1MutationOptions = Apollo.BaseMutationOptions<Osvm1Mutation, Osvm1MutationVariables>;
export const Osvm2Document = gql`
    mutation OSVM2 {
  ingestOSV(osv: {osvId: "CVE-2023-12345"}) {
    ...allOSVTree
  }
}
    ${AllOsvTreeFragmentDoc}`;
export type Osvm2MutationFn = Apollo.MutationFunction<Osvm2Mutation, Osvm2MutationVariables>;

/**
 * __useOsvm2Mutation__
 *
 * To run a mutation, you first call `useOsvm2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOsvm2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [osvm2Mutation, { data, loading, error }] = useOsvm2Mutation({
 *   variables: {
 *   },
 * });
 */
export function useOsvm2Mutation(baseOptions?: Apollo.MutationHookOptions<Osvm2Mutation, Osvm2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Osvm2Mutation, Osvm2MutationVariables>(Osvm2Document, options);
      }
export type Osvm2MutationHookResult = ReturnType<typeof useOsvm2Mutation>;
export type Osvm2MutationResult = Apollo.MutationResult<Osvm2Mutation>;
export type Osvm2MutationOptions = Apollo.BaseMutationOptions<Osvm2Mutation, Osvm2MutationVariables>;
export const HasSbomq1Document = gql`
    query HasSBOMQ1 {
  HasSBOM(hasSBOMSpec: {}) {
    ...allHasSBOMTree
  }
}
    ${AllHasSbomTreeFragmentDoc}`;

/**
 * __useHasSbomq1Query__
 *
 * To run a query within a React component, call `useHasSbomq1Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSbomq1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSbomq1Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSbomq1Query(baseOptions?: Apollo.QueryHookOptions<HasSbomq1Query, HasSbomq1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSbomq1Query, HasSbomq1QueryVariables>(HasSbomq1Document, options);
      }
export function useHasSbomq1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSbomq1Query, HasSbomq1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSbomq1Query, HasSbomq1QueryVariables>(HasSbomq1Document, options);
        }
export type HasSbomq1QueryHookResult = ReturnType<typeof useHasSbomq1Query>;
export type HasSbomq1LazyQueryHookResult = ReturnType<typeof useHasSbomq1LazyQuery>;
export type HasSbomq1QueryResult = Apollo.QueryResult<HasSbomq1Query, HasSbomq1QueryVariables>;
export const HasSbomq2Document = gql`
    query HasSBOMQ2 {
  HasSBOM(hasSBOMSpec: {origin: "testing backend"}) {
    ...allHasSBOMTree
  }
}
    ${AllHasSbomTreeFragmentDoc}`;

/**
 * __useHasSbomq2Query__
 *
 * To run a query within a React component, call `useHasSbomq2Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSbomq2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSbomq2Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSbomq2Query(baseOptions?: Apollo.QueryHookOptions<HasSbomq2Query, HasSbomq2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSbomq2Query, HasSbomq2QueryVariables>(HasSbomq2Document, options);
      }
export function useHasSbomq2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSbomq2Query, HasSbomq2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSbomq2Query, HasSbomq2QueryVariables>(HasSbomq2Document, options);
        }
export type HasSbomq2QueryHookResult = ReturnType<typeof useHasSbomq2Query>;
export type HasSbomq2LazyQueryHookResult = ReturnType<typeof useHasSbomq2LazyQuery>;
export type HasSbomq2QueryResult = Apollo.QueryResult<HasSbomq2Query, HasSbomq2QueryVariables>;
export const HasSbomq3Document = gql`
    query HasSBOMQ3 {
  HasSBOM(hasSBOMSpec: {subject: {package: {name: "openssl"}}}) {
    ...allHasSBOMTree
  }
}
    ${AllHasSbomTreeFragmentDoc}`;

/**
 * __useHasSbomq3Query__
 *
 * To run a query within a React component, call `useHasSbomq3Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSbomq3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSbomq3Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSbomq3Query(baseOptions?: Apollo.QueryHookOptions<HasSbomq3Query, HasSbomq3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSbomq3Query, HasSbomq3QueryVariables>(HasSbomq3Document, options);
      }
export function useHasSbomq3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSbomq3Query, HasSbomq3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSbomq3Query, HasSbomq3QueryVariables>(HasSbomq3Document, options);
        }
export type HasSbomq3QueryHookResult = ReturnType<typeof useHasSbomq3Query>;
export type HasSbomq3LazyQueryHookResult = ReturnType<typeof useHasSbomq3LazyQuery>;
export type HasSbomq3QueryResult = Apollo.QueryResult<HasSbomq3Query, HasSbomq3QueryVariables>;
export const HasSbomq4Document = gql`
    query HasSBOMQ4 {
  HasSBOM(hasSBOMSpec: {subject: {source: {name: "github.com/guacsec/guac"}}}) {
    ...allHasSBOMTree
  }
}
    ${AllHasSbomTreeFragmentDoc}`;

/**
 * __useHasSbomq4Query__
 *
 * To run a query within a React component, call `useHasSbomq4Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSbomq4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSbomq4Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSbomq4Query(baseOptions?: Apollo.QueryHookOptions<HasSbomq4Query, HasSbomq4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSbomq4Query, HasSbomq4QueryVariables>(HasSbomq4Document, options);
      }
export function useHasSbomq4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSbomq4Query, HasSbomq4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSbomq4Query, HasSbomq4QueryVariables>(HasSbomq4Document, options);
        }
export type HasSbomq4QueryHookResult = ReturnType<typeof useHasSbomq4Query>;
export type HasSbomq4LazyQueryHookResult = ReturnType<typeof useHasSbomq4LazyQuery>;
export type HasSbomq4QueryResult = Apollo.QueryResult<HasSbomq4Query, HasSbomq4QueryVariables>;
export const HasSbomq5Document = gql`
    query HasSBOMQ5 {
  HasSBOM(
    hasSBOMSpec: {subject: {package: {name: "openssl"}, source: {name: "github.com/guacsec/guac"}}}
  ) {
    ...allHasSBOMTree
  }
}
    ${AllHasSbomTreeFragmentDoc}`;

/**
 * __useHasSbomq5Query__
 *
 * To run a query within a React component, call `useHasSbomq5Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSbomq5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSbomq5Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSbomq5Query(baseOptions?: Apollo.QueryHookOptions<HasSbomq5Query, HasSbomq5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSbomq5Query, HasSbomq5QueryVariables>(HasSbomq5Document, options);
      }
export function useHasSbomq5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSbomq5Query, HasSbomq5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSbomq5Query, HasSbomq5QueryVariables>(HasSbomq5Document, options);
        }
export type HasSbomq5QueryHookResult = ReturnType<typeof useHasSbomq5Query>;
export type HasSbomq5LazyQueryHookResult = ReturnType<typeof useHasSbomq5LazyQuery>;
export type HasSbomq5QueryResult = Apollo.QueryResult<HasSbomq5Query, HasSbomq5QueryVariables>;
export const Slsaq1Document = gql`
    query SLSAQ1 {
  HasSLSA(hasSLSASpec: {}) {
    ...allSLSATree
  }
}
    ${AllSlsaTreeFragmentDoc}`;

/**
 * __useSlsaq1Query__
 *
 * To run a query within a React component, call `useSlsaq1Query` and pass it any options that fit your needs.
 * When your component renders, `useSlsaq1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlsaq1Query({
 *   variables: {
 *   },
 * });
 */
export function useSlsaq1Query(baseOptions?: Apollo.QueryHookOptions<Slsaq1Query, Slsaq1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Slsaq1Query, Slsaq1QueryVariables>(Slsaq1Document, options);
      }
export function useSlsaq1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Slsaq1Query, Slsaq1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Slsaq1Query, Slsaq1QueryVariables>(Slsaq1Document, options);
        }
export type Slsaq1QueryHookResult = ReturnType<typeof useSlsaq1Query>;
export type Slsaq1LazyQueryHookResult = ReturnType<typeof useSlsaq1LazyQuery>;
export type Slsaq1QueryResult = Apollo.QueryResult<Slsaq1Query, Slsaq1QueryVariables>;
export const Slsaq2Document = gql`
    query SLSAQ2 {
  HasSLSA(hasSLSASpec: {origin: "testing backend"}) {
    ...allSLSATree
  }
}
    ${AllSlsaTreeFragmentDoc}`;

/**
 * __useSlsaq2Query__
 *
 * To run a query within a React component, call `useSlsaq2Query` and pass it any options that fit your needs.
 * When your component renders, `useSlsaq2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlsaq2Query({
 *   variables: {
 *   },
 * });
 */
export function useSlsaq2Query(baseOptions?: Apollo.QueryHookOptions<Slsaq2Query, Slsaq2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Slsaq2Query, Slsaq2QueryVariables>(Slsaq2Document, options);
      }
export function useSlsaq2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Slsaq2Query, Slsaq2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Slsaq2Query, Slsaq2QueryVariables>(Slsaq2Document, options);
        }
export type Slsaq2QueryHookResult = ReturnType<typeof useSlsaq2Query>;
export type Slsaq2LazyQueryHookResult = ReturnType<typeof useSlsaq2LazyQuery>;
export type Slsaq2QueryResult = Apollo.QueryResult<Slsaq2Query, Slsaq2QueryVariables>;
export const Slsaq3Document = gql`
    query SLSAQ3 {
  HasSLSA(hasSLSASpec: {subject: {package: {name: "django"}}}) {
    ...allSLSATree
  }
}
    ${AllSlsaTreeFragmentDoc}`;

/**
 * __useSlsaq3Query__
 *
 * To run a query within a React component, call `useSlsaq3Query` and pass it any options that fit your needs.
 * When your component renders, `useSlsaq3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlsaq3Query({
 *   variables: {
 *   },
 * });
 */
export function useSlsaq3Query(baseOptions?: Apollo.QueryHookOptions<Slsaq3Query, Slsaq3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Slsaq3Query, Slsaq3QueryVariables>(Slsaq3Document, options);
      }
export function useSlsaq3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Slsaq3Query, Slsaq3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Slsaq3Query, Slsaq3QueryVariables>(Slsaq3Document, options);
        }
export type Slsaq3QueryHookResult = ReturnType<typeof useSlsaq3Query>;
export type Slsaq3LazyQueryHookResult = ReturnType<typeof useSlsaq3LazyQuery>;
export type Slsaq3QueryResult = Apollo.QueryResult<Slsaq3Query, Slsaq3QueryVariables>;
export const HasSourceAtQ1Document = gql`
    query HasSourceAtQ1 {
  HasSourceAt(hasSourceAtSpec: {}) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useHasSourceAtQ1Query__
 *
 * To run a query within a React component, call `useHasSourceAtQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSourceAtQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSourceAtQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSourceAtQ1Query(baseOptions?: Apollo.QueryHookOptions<HasSourceAtQ1Query, HasSourceAtQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSourceAtQ1Query, HasSourceAtQ1QueryVariables>(HasSourceAtQ1Document, options);
      }
export function useHasSourceAtQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSourceAtQ1Query, HasSourceAtQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSourceAtQ1Query, HasSourceAtQ1QueryVariables>(HasSourceAtQ1Document, options);
        }
export type HasSourceAtQ1QueryHookResult = ReturnType<typeof useHasSourceAtQ1Query>;
export type HasSourceAtQ1LazyQueryHookResult = ReturnType<typeof useHasSourceAtQ1LazyQuery>;
export type HasSourceAtQ1QueryResult = Apollo.QueryResult<HasSourceAtQ1Query, HasSourceAtQ1QueryVariables>;
export const HasSourceAtQ2Document = gql`
    query HasSourceAtQ2 {
  HasSourceAt(hasSourceAtSpec: {origin: "testing backend"}) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useHasSourceAtQ2Query__
 *
 * To run a query within a React component, call `useHasSourceAtQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSourceAtQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSourceAtQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSourceAtQ2Query(baseOptions?: Apollo.QueryHookOptions<HasSourceAtQ2Query, HasSourceAtQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSourceAtQ2Query, HasSourceAtQ2QueryVariables>(HasSourceAtQ2Document, options);
      }
export function useHasSourceAtQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSourceAtQ2Query, HasSourceAtQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSourceAtQ2Query, HasSourceAtQ2QueryVariables>(HasSourceAtQ2Document, options);
        }
export type HasSourceAtQ2QueryHookResult = ReturnType<typeof useHasSourceAtQ2Query>;
export type HasSourceAtQ2LazyQueryHookResult = ReturnType<typeof useHasSourceAtQ2LazyQuery>;
export type HasSourceAtQ2QueryResult = Apollo.QueryResult<HasSourceAtQ2Query, HasSourceAtQ2QueryVariables>;
export const HasSourceAtQ3Document = gql`
    query HasSourceAtQ3 {
  HasSourceAt(hasSourceAtSpec: {package: {name: "openssl", version: "3.0.3"}}) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useHasSourceAtQ3Query__
 *
 * To run a query within a React component, call `useHasSourceAtQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSourceAtQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSourceAtQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSourceAtQ3Query(baseOptions?: Apollo.QueryHookOptions<HasSourceAtQ3Query, HasSourceAtQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSourceAtQ3Query, HasSourceAtQ3QueryVariables>(HasSourceAtQ3Document, options);
      }
export function useHasSourceAtQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSourceAtQ3Query, HasSourceAtQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSourceAtQ3Query, HasSourceAtQ3QueryVariables>(HasSourceAtQ3Document, options);
        }
export type HasSourceAtQ3QueryHookResult = ReturnType<typeof useHasSourceAtQ3Query>;
export type HasSourceAtQ3LazyQueryHookResult = ReturnType<typeof useHasSourceAtQ3LazyQuery>;
export type HasSourceAtQ3QueryResult = Apollo.QueryResult<HasSourceAtQ3Query, HasSourceAtQ3QueryVariables>;
export const HasSourceAtQ4Document = gql`
    query HasSourceAtQ4 {
  HasSourceAt(
    hasSourceAtSpec: {source: {name: "https://github.com/django/django"}}
  ) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useHasSourceAtQ4Query__
 *
 * To run a query within a React component, call `useHasSourceAtQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSourceAtQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSourceAtQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSourceAtQ4Query(baseOptions?: Apollo.QueryHookOptions<HasSourceAtQ4Query, HasSourceAtQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSourceAtQ4Query, HasSourceAtQ4QueryVariables>(HasSourceAtQ4Document, options);
      }
export function useHasSourceAtQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSourceAtQ4Query, HasSourceAtQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSourceAtQ4Query, HasSourceAtQ4QueryVariables>(HasSourceAtQ4Document, options);
        }
export type HasSourceAtQ4QueryHookResult = ReturnType<typeof useHasSourceAtQ4Query>;
export type HasSourceAtQ4LazyQueryHookResult = ReturnType<typeof useHasSourceAtQ4LazyQuery>;
export type HasSourceAtQ4QueryResult = Apollo.QueryResult<HasSourceAtQ4Query, HasSourceAtQ4QueryVariables>;
export const HasSourceAtQ5Document = gql`
    query HasSourceAtQ5 {
  HasSourceAt(hasSourceAtSpec: {package: {name: "kubetest"}}) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useHasSourceAtQ5Query__
 *
 * To run a query within a React component, call `useHasSourceAtQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSourceAtQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSourceAtQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSourceAtQ5Query(baseOptions?: Apollo.QueryHookOptions<HasSourceAtQ5Query, HasSourceAtQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSourceAtQ5Query, HasSourceAtQ5QueryVariables>(HasSourceAtQ5Document, options);
      }
export function useHasSourceAtQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSourceAtQ5Query, HasSourceAtQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSourceAtQ5Query, HasSourceAtQ5QueryVariables>(HasSourceAtQ5Document, options);
        }
export type HasSourceAtQ5QueryHookResult = ReturnType<typeof useHasSourceAtQ5Query>;
export type HasSourceAtQ5LazyQueryHookResult = ReturnType<typeof useHasSourceAtQ5LazyQuery>;
export type HasSourceAtQ5QueryResult = Apollo.QueryResult<HasSourceAtQ5Query, HasSourceAtQ5QueryVariables>;
export const HasSourceAtQ6Document = gql`
    query HasSourceAtQ6 {
  HasSourceAt(
    hasSourceAtSpec: {source: {name: "https://github.com/vapor-ware/kubetest"}}
  ) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useHasSourceAtQ6Query__
 *
 * To run a query within a React component, call `useHasSourceAtQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useHasSourceAtQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasSourceAtQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useHasSourceAtQ6Query(baseOptions?: Apollo.QueryHookOptions<HasSourceAtQ6Query, HasSourceAtQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasSourceAtQ6Query, HasSourceAtQ6QueryVariables>(HasSourceAtQ6Document, options);
      }
export function useHasSourceAtQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasSourceAtQ6Query, HasSourceAtQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasSourceAtQ6Query, HasSourceAtQ6QueryVariables>(HasSourceAtQ6Document, options);
        }
export type HasSourceAtQ6QueryHookResult = ReturnType<typeof useHasSourceAtQ6Query>;
export type HasSourceAtQ6LazyQueryHookResult = ReturnType<typeof useHasSourceAtQ6LazyQuery>;
export type HasSourceAtQ6QueryResult = Apollo.QueryResult<HasSourceAtQ6Query, HasSourceAtQ6QueryVariables>;
export const HashEqualQ1Document = gql`
    query HashEqualQ1 {
  HashEqual(hashEqualSpec: {}) {
    ...allHashEqualTree
  }
}
    ${AllHashEqualTreeFragmentDoc}`;

/**
 * __useHashEqualQ1Query__
 *
 * To run a query within a React component, call `useHashEqualQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useHashEqualQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashEqualQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useHashEqualQ1Query(baseOptions?: Apollo.QueryHookOptions<HashEqualQ1Query, HashEqualQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HashEqualQ1Query, HashEqualQ1QueryVariables>(HashEqualQ1Document, options);
      }
export function useHashEqualQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashEqualQ1Query, HashEqualQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HashEqualQ1Query, HashEqualQ1QueryVariables>(HashEqualQ1Document, options);
        }
export type HashEqualQ1QueryHookResult = ReturnType<typeof useHashEqualQ1Query>;
export type HashEqualQ1LazyQueryHookResult = ReturnType<typeof useHashEqualQ1LazyQuery>;
export type HashEqualQ1QueryResult = Apollo.QueryResult<HashEqualQ1Query, HashEqualQ1QueryVariables>;
export const HashEqualQ2Document = gql`
    query HashEqualQ2 {
  HashEqual(hashEqualSpec: {origin: "testing backend"}) {
    ...allHashEqualTree
  }
}
    ${AllHashEqualTreeFragmentDoc}`;

/**
 * __useHashEqualQ2Query__
 *
 * To run a query within a React component, call `useHashEqualQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useHashEqualQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashEqualQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useHashEqualQ2Query(baseOptions?: Apollo.QueryHookOptions<HashEqualQ2Query, HashEqualQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HashEqualQ2Query, HashEqualQ2QueryVariables>(HashEqualQ2Document, options);
      }
export function useHashEqualQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashEqualQ2Query, HashEqualQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HashEqualQ2Query, HashEqualQ2QueryVariables>(HashEqualQ2Document, options);
        }
export type HashEqualQ2QueryHookResult = ReturnType<typeof useHashEqualQ2Query>;
export type HashEqualQ2LazyQueryHookResult = ReturnType<typeof useHashEqualQ2LazyQuery>;
export type HashEqualQ2QueryResult = Apollo.QueryResult<HashEqualQ2Query, HashEqualQ2QueryVariables>;
export const HashEqualQ3Document = gql`
    query HashEqualQ3 {
  HashEqual(
    hashEqualSpec: {artifacts: [{algorithm: "sha1", digest: "7a8f47318e4676dacb0142afa0b83029cd7befd9"}]}
  ) {
    ...allHashEqualTree
  }
}
    ${AllHashEqualTreeFragmentDoc}`;

/**
 * __useHashEqualQ3Query__
 *
 * To run a query within a React component, call `useHashEqualQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useHashEqualQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashEqualQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useHashEqualQ3Query(baseOptions?: Apollo.QueryHookOptions<HashEqualQ3Query, HashEqualQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HashEqualQ3Query, HashEqualQ3QueryVariables>(HashEqualQ3Document, options);
      }
export function useHashEqualQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashEqualQ3Query, HashEqualQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HashEqualQ3Query, HashEqualQ3QueryVariables>(HashEqualQ3Document, options);
        }
export type HashEqualQ3QueryHookResult = ReturnType<typeof useHashEqualQ3Query>;
export type HashEqualQ3LazyQueryHookResult = ReturnType<typeof useHashEqualQ3LazyQuery>;
export type HashEqualQ3QueryResult = Apollo.QueryResult<HashEqualQ3Query, HashEqualQ3QueryVariables>;
export const HashEqualQ4Document = gql`
    query HashEqualQ4 {
  HashEqual(
    hashEqualSpec: {artifacts: [{algorithm: "sha256", digest: "89bb0da1891646e58eb3e6ed24f3a6fc3c8eb5a0d44824cba581dfa34a0450cf"}]}
  ) {
    ...allHashEqualTree
  }
}
    ${AllHashEqualTreeFragmentDoc}`;

/**
 * __useHashEqualQ4Query__
 *
 * To run a query within a React component, call `useHashEqualQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useHashEqualQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashEqualQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useHashEqualQ4Query(baseOptions?: Apollo.QueryHookOptions<HashEqualQ4Query, HashEqualQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HashEqualQ4Query, HashEqualQ4QueryVariables>(HashEqualQ4Document, options);
      }
export function useHashEqualQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashEqualQ4Query, HashEqualQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HashEqualQ4Query, HashEqualQ4QueryVariables>(HashEqualQ4Document, options);
        }
export type HashEqualQ4QueryHookResult = ReturnType<typeof useHashEqualQ4Query>;
export type HashEqualQ4LazyQueryHookResult = ReturnType<typeof useHashEqualQ4LazyQuery>;
export type HashEqualQ4QueryResult = Apollo.QueryResult<HashEqualQ4Query, HashEqualQ4QueryVariables>;
export const HashEqualQ5Document = gql`
    query HashEqualQ5 {
  HashEqual(
    hashEqualSpec: {artifacts: [{algorithm: "sha256", digest: "6bbb0da1891646e58eb3e6a63af3a6fc3c8eb5a0d44824cba581d2e14a0450cf"}]}
  ) {
    ...allHashEqualTree
  }
}
    ${AllHashEqualTreeFragmentDoc}`;

/**
 * __useHashEqualQ5Query__
 *
 * To run a query within a React component, call `useHashEqualQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useHashEqualQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashEqualQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useHashEqualQ5Query(baseOptions?: Apollo.QueryHookOptions<HashEqualQ5Query, HashEqualQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HashEqualQ5Query, HashEqualQ5QueryVariables>(HashEqualQ5Document, options);
      }
export function useHashEqualQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashEqualQ5Query, HashEqualQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HashEqualQ5Query, HashEqualQ5QueryVariables>(HashEqualQ5Document, options);
        }
export type HashEqualQ5QueryHookResult = ReturnType<typeof useHashEqualQ5Query>;
export type HashEqualQ5LazyQueryHookResult = ReturnType<typeof useHashEqualQ5LazyQuery>;
export type HashEqualQ5QueryResult = Apollo.QueryResult<HashEqualQ5Query, HashEqualQ5QueryVariables>;
export const HashEqualQ6Document = gql`
    query HashEqualQ6 {
  HashEqual(
    hashEqualSpec: {artifacts: [{algorithm: "sha512", digest: "374ab8f711235830769aa5f0b31ce9b72c5670074b34cb302cdafe3b606233ee92ee01e298e5701f15cc7087714cd9abd7ddb838a6e1206b3642de16d9fc9dd7"}]}
  ) {
    ...allHashEqualTree
  }
}
    ${AllHashEqualTreeFragmentDoc}`;

/**
 * __useHashEqualQ6Query__
 *
 * To run a query within a React component, call `useHashEqualQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useHashEqualQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashEqualQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useHashEqualQ6Query(baseOptions?: Apollo.QueryHookOptions<HashEqualQ6Query, HashEqualQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HashEqualQ6Query, HashEqualQ6QueryVariables>(HashEqualQ6Document, options);
      }
export function useHashEqualQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashEqualQ6Query, HashEqualQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HashEqualQ6Query, HashEqualQ6QueryVariables>(HashEqualQ6Document, options);
        }
export type HashEqualQ6QueryHookResult = ReturnType<typeof useHashEqualQ6Query>;
export type HashEqualQ6LazyQueryHookResult = ReturnType<typeof useHashEqualQ6LazyQuery>;
export type HashEqualQ6QueryResult = Apollo.QueryResult<HashEqualQ6Query, HashEqualQ6QueryVariables>;
export const IsDepedencyQ1Document = gql`
    query IsDepedencyQ1 {
  IsDependency(isDependencySpec: {}) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useIsDepedencyQ1Query__
 *
 * To run a query within a React component, call `useIsDepedencyQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useIsDepedencyQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDepedencyQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useIsDepedencyQ1Query(baseOptions?: Apollo.QueryHookOptions<IsDepedencyQ1Query, IsDepedencyQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDepedencyQ1Query, IsDepedencyQ1QueryVariables>(IsDepedencyQ1Document, options);
      }
export function useIsDepedencyQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDepedencyQ1Query, IsDepedencyQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDepedencyQ1Query, IsDepedencyQ1QueryVariables>(IsDepedencyQ1Document, options);
        }
export type IsDepedencyQ1QueryHookResult = ReturnType<typeof useIsDepedencyQ1Query>;
export type IsDepedencyQ1LazyQueryHookResult = ReturnType<typeof useIsDepedencyQ1LazyQuery>;
export type IsDepedencyQ1QueryResult = Apollo.QueryResult<IsDepedencyQ1Query, IsDepedencyQ1QueryVariables>;
export const IsDepedencyQ2Document = gql`
    query IsDepedencyQ2 {
  IsDependency(isDependencySpec: {origin: "testing backend"}) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useIsDepedencyQ2Query__
 *
 * To run a query within a React component, call `useIsDepedencyQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useIsDepedencyQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDepedencyQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useIsDepedencyQ2Query(baseOptions?: Apollo.QueryHookOptions<IsDepedencyQ2Query, IsDepedencyQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDepedencyQ2Query, IsDepedencyQ2QueryVariables>(IsDepedencyQ2Document, options);
      }
export function useIsDepedencyQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDepedencyQ2Query, IsDepedencyQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDepedencyQ2Query, IsDepedencyQ2QueryVariables>(IsDepedencyQ2Document, options);
        }
export type IsDepedencyQ2QueryHookResult = ReturnType<typeof useIsDepedencyQ2Query>;
export type IsDepedencyQ2LazyQueryHookResult = ReturnType<typeof useIsDepedencyQ2LazyQuery>;
export type IsDepedencyQ2QueryResult = Apollo.QueryResult<IsDepedencyQ2Query, IsDepedencyQ2QueryVariables>;
export const IsDepedencyQ3Document = gql`
    query IsDepedencyQ3 {
  IsDependency(isDependencySpec: {package: {name: "debian"}}) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useIsDepedencyQ3Query__
 *
 * To run a query within a React component, call `useIsDepedencyQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useIsDepedencyQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDepedencyQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useIsDepedencyQ3Query(baseOptions?: Apollo.QueryHookOptions<IsDepedencyQ3Query, IsDepedencyQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDepedencyQ3Query, IsDepedencyQ3QueryVariables>(IsDepedencyQ3Document, options);
      }
export function useIsDepedencyQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDepedencyQ3Query, IsDepedencyQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDepedencyQ3Query, IsDepedencyQ3QueryVariables>(IsDepedencyQ3Document, options);
        }
export type IsDepedencyQ3QueryHookResult = ReturnType<typeof useIsDepedencyQ3Query>;
export type IsDepedencyQ3LazyQueryHookResult = ReturnType<typeof useIsDepedencyQ3LazyQuery>;
export type IsDepedencyQ3QueryResult = Apollo.QueryResult<IsDepedencyQ3Query, IsDepedencyQ3QueryVariables>;
export const IsDepedencyQ4Document = gql`
    query IsDepedencyQ4 {
  IsDependency(isDependencySpec: {package: {name: "dpkg"}}) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useIsDepedencyQ4Query__
 *
 * To run a query within a React component, call `useIsDepedencyQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useIsDepedencyQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDepedencyQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useIsDepedencyQ4Query(baseOptions?: Apollo.QueryHookOptions<IsDepedencyQ4Query, IsDepedencyQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDepedencyQ4Query, IsDepedencyQ4QueryVariables>(IsDepedencyQ4Document, options);
      }
export function useIsDepedencyQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDepedencyQ4Query, IsDepedencyQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDepedencyQ4Query, IsDepedencyQ4QueryVariables>(IsDepedencyQ4Document, options);
        }
export type IsDepedencyQ4QueryHookResult = ReturnType<typeof useIsDepedencyQ4Query>;
export type IsDepedencyQ4LazyQueryHookResult = ReturnType<typeof useIsDepedencyQ4LazyQuery>;
export type IsDepedencyQ4QueryResult = Apollo.QueryResult<IsDepedencyQ4Query, IsDepedencyQ4QueryVariables>;
export const IsDepedencyQ5Document = gql`
    query IsDepedencyQ5 {
  IsDependency(isDependencySpec: {package: {name: "openssl", version: "3.0.3"}}) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useIsDepedencyQ5Query__
 *
 * To run a query within a React component, call `useIsDepedencyQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useIsDepedencyQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDepedencyQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useIsDepedencyQ5Query(baseOptions?: Apollo.QueryHookOptions<IsDepedencyQ5Query, IsDepedencyQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDepedencyQ5Query, IsDepedencyQ5QueryVariables>(IsDepedencyQ5Document, options);
      }
export function useIsDepedencyQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDepedencyQ5Query, IsDepedencyQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDepedencyQ5Query, IsDepedencyQ5QueryVariables>(IsDepedencyQ5Document, options);
        }
export type IsDepedencyQ5QueryHookResult = ReturnType<typeof useIsDepedencyQ5Query>;
export type IsDepedencyQ5LazyQueryHookResult = ReturnType<typeof useIsDepedencyQ5LazyQuery>;
export type IsDepedencyQ5QueryResult = Apollo.QueryResult<IsDepedencyQ5Query, IsDepedencyQ5QueryVariables>;
export const IsDepedencyQ6Document = gql`
    query IsDepedencyQ6 {
  IsDependency(isDependencySpec: {dependentPackage: {name: "openssl"}}) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useIsDepedencyQ6Query__
 *
 * To run a query within a React component, call `useIsDepedencyQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useIsDepedencyQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDepedencyQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useIsDepedencyQ6Query(baseOptions?: Apollo.QueryHookOptions<IsDepedencyQ6Query, IsDepedencyQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDepedencyQ6Query, IsDepedencyQ6QueryVariables>(IsDepedencyQ6Document, options);
      }
export function useIsDepedencyQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDepedencyQ6Query, IsDepedencyQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDepedencyQ6Query, IsDepedencyQ6QueryVariables>(IsDepedencyQ6Document, options);
        }
export type IsDepedencyQ6QueryHookResult = ReturnType<typeof useIsDepedencyQ6Query>;
export type IsDepedencyQ6LazyQueryHookResult = ReturnType<typeof useIsDepedencyQ6LazyQuery>;
export type IsDepedencyQ6QueryResult = Apollo.QueryResult<IsDepedencyQ6Query, IsDepedencyQ6QueryVariables>;
export const IsOccurrenceQ1Document = gql`
    query IsOccurrenceQ1 {
  IsOccurrence(isOccurrenceSpec: {}) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useIsOccurrenceQ1Query__
 *
 * To run a query within a React component, call `useIsOccurrenceQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useIsOccurrenceQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOccurrenceQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useIsOccurrenceQ1Query(baseOptions?: Apollo.QueryHookOptions<IsOccurrenceQ1Query, IsOccurrenceQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOccurrenceQ1Query, IsOccurrenceQ1QueryVariables>(IsOccurrenceQ1Document, options);
      }
export function useIsOccurrenceQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOccurrenceQ1Query, IsOccurrenceQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOccurrenceQ1Query, IsOccurrenceQ1QueryVariables>(IsOccurrenceQ1Document, options);
        }
export type IsOccurrenceQ1QueryHookResult = ReturnType<typeof useIsOccurrenceQ1Query>;
export type IsOccurrenceQ1LazyQueryHookResult = ReturnType<typeof useIsOccurrenceQ1LazyQuery>;
export type IsOccurrenceQ1QueryResult = Apollo.QueryResult<IsOccurrenceQ1Query, IsOccurrenceQ1QueryVariables>;
export const IsOccurrenceQ2Document = gql`
    query IsOccurrenceQ2 {
  IsOccurrence(isOccurrenceSpec: {origin: "testing backend"}) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useIsOccurrenceQ2Query__
 *
 * To run a query within a React component, call `useIsOccurrenceQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useIsOccurrenceQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOccurrenceQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useIsOccurrenceQ2Query(baseOptions?: Apollo.QueryHookOptions<IsOccurrenceQ2Query, IsOccurrenceQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOccurrenceQ2Query, IsOccurrenceQ2QueryVariables>(IsOccurrenceQ2Document, options);
      }
export function useIsOccurrenceQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOccurrenceQ2Query, IsOccurrenceQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOccurrenceQ2Query, IsOccurrenceQ2QueryVariables>(IsOccurrenceQ2Document, options);
        }
export type IsOccurrenceQ2QueryHookResult = ReturnType<typeof useIsOccurrenceQ2Query>;
export type IsOccurrenceQ2LazyQueryHookResult = ReturnType<typeof useIsOccurrenceQ2LazyQuery>;
export type IsOccurrenceQ2QueryResult = Apollo.QueryResult<IsOccurrenceQ2Query, IsOccurrenceQ2QueryVariables>;
export const IsOccurrenceQ3Document = gql`
    query IsOccurrenceQ3 {
  IsOccurrence(isOccurrenceSpec: {subject: {package: {name: "openssl"}}}) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useIsOccurrenceQ3Query__
 *
 * To run a query within a React component, call `useIsOccurrenceQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useIsOccurrenceQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOccurrenceQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useIsOccurrenceQ3Query(baseOptions?: Apollo.QueryHookOptions<IsOccurrenceQ3Query, IsOccurrenceQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOccurrenceQ3Query, IsOccurrenceQ3QueryVariables>(IsOccurrenceQ3Document, options);
      }
export function useIsOccurrenceQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOccurrenceQ3Query, IsOccurrenceQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOccurrenceQ3Query, IsOccurrenceQ3QueryVariables>(IsOccurrenceQ3Document, options);
        }
export type IsOccurrenceQ3QueryHookResult = ReturnType<typeof useIsOccurrenceQ3Query>;
export type IsOccurrenceQ3LazyQueryHookResult = ReturnType<typeof useIsOccurrenceQ3LazyQuery>;
export type IsOccurrenceQ3QueryResult = Apollo.QueryResult<IsOccurrenceQ3Query, IsOccurrenceQ3QueryVariables>;
export const IsOccurrenceQ4Document = gql`
    query IsOccurrenceQ4 {
  IsOccurrence(
    isOccurrenceSpec: {subject: {package: {name: "openssl", version: "3.0.3"}}}
  ) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useIsOccurrenceQ4Query__
 *
 * To run a query within a React component, call `useIsOccurrenceQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useIsOccurrenceQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOccurrenceQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useIsOccurrenceQ4Query(baseOptions?: Apollo.QueryHookOptions<IsOccurrenceQ4Query, IsOccurrenceQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOccurrenceQ4Query, IsOccurrenceQ4QueryVariables>(IsOccurrenceQ4Document, options);
      }
export function useIsOccurrenceQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOccurrenceQ4Query, IsOccurrenceQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOccurrenceQ4Query, IsOccurrenceQ4QueryVariables>(IsOccurrenceQ4Document, options);
        }
export type IsOccurrenceQ4QueryHookResult = ReturnType<typeof useIsOccurrenceQ4Query>;
export type IsOccurrenceQ4LazyQueryHookResult = ReturnType<typeof useIsOccurrenceQ4LazyQuery>;
export type IsOccurrenceQ4QueryResult = Apollo.QueryResult<IsOccurrenceQ4Query, IsOccurrenceQ4QueryVariables>;
export const IsOccurrenceQ5Document = gql`
    query IsOccurrenceQ5 {
  IsOccurrence(
    isOccurrenceSpec: {subject: {source: {name: "github.com/guacsec/guac"}}}
  ) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useIsOccurrenceQ5Query__
 *
 * To run a query within a React component, call `useIsOccurrenceQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useIsOccurrenceQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOccurrenceQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useIsOccurrenceQ5Query(baseOptions?: Apollo.QueryHookOptions<IsOccurrenceQ5Query, IsOccurrenceQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOccurrenceQ5Query, IsOccurrenceQ5QueryVariables>(IsOccurrenceQ5Document, options);
      }
export function useIsOccurrenceQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOccurrenceQ5Query, IsOccurrenceQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOccurrenceQ5Query, IsOccurrenceQ5QueryVariables>(IsOccurrenceQ5Document, options);
        }
export type IsOccurrenceQ5QueryHookResult = ReturnType<typeof useIsOccurrenceQ5Query>;
export type IsOccurrenceQ5LazyQueryHookResult = ReturnType<typeof useIsOccurrenceQ5LazyQuery>;
export type IsOccurrenceQ5QueryResult = Apollo.QueryResult<IsOccurrenceQ5Query, IsOccurrenceQ5QueryVariables>;
export const IsOccurrenceQ6Document = gql`
    query IsOccurrenceQ6 {
  IsOccurrence(
    isOccurrenceSpec: {subject: {package: {name: "openssl"}, source: {name: "github.com/guacsec/guac"}}}
  ) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useIsOccurrenceQ6Query__
 *
 * To run a query within a React component, call `useIsOccurrenceQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useIsOccurrenceQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOccurrenceQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useIsOccurrenceQ6Query(baseOptions?: Apollo.QueryHookOptions<IsOccurrenceQ6Query, IsOccurrenceQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOccurrenceQ6Query, IsOccurrenceQ6QueryVariables>(IsOccurrenceQ6Document, options);
      }
export function useIsOccurrenceQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOccurrenceQ6Query, IsOccurrenceQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOccurrenceQ6Query, IsOccurrenceQ6QueryVariables>(IsOccurrenceQ6Document, options);
        }
export type IsOccurrenceQ6QueryHookResult = ReturnType<typeof useIsOccurrenceQ6Query>;
export type IsOccurrenceQ6LazyQueryHookResult = ReturnType<typeof useIsOccurrenceQ6LazyQuery>;
export type IsOccurrenceQ6QueryResult = Apollo.QueryResult<IsOccurrenceQ6Query, IsOccurrenceQ6QueryVariables>;
export const IsVulnerabilityQ1Document = gql`
    query IsVulnerabilityQ1 {
  IsVulnerability(isVulnerabilitySpec: {}) {
    ...allIsVulnerabilityTree
  }
}
    ${AllIsVulnerabilityTreeFragmentDoc}`;

/**
 * __useIsVulnerabilityQ1Query__
 *
 * To run a query within a React component, call `useIsVulnerabilityQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useIsVulnerabilityQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsVulnerabilityQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useIsVulnerabilityQ1Query(baseOptions?: Apollo.QueryHookOptions<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>(IsVulnerabilityQ1Document, options);
      }
export function useIsVulnerabilityQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>(IsVulnerabilityQ1Document, options);
        }
export type IsVulnerabilityQ1QueryHookResult = ReturnType<typeof useIsVulnerabilityQ1Query>;
export type IsVulnerabilityQ1LazyQueryHookResult = ReturnType<typeof useIsVulnerabilityQ1LazyQuery>;
export type IsVulnerabilityQ1QueryResult = Apollo.QueryResult<IsVulnerabilityQ1Query, IsVulnerabilityQ1QueryVariables>;
export const IsVulnerabilityQ2Document = gql`
    query IsVulnerabilityQ2 {
  IsVulnerability(isVulnerabilitySpec: {origin: "testing backend"}) {
    ...allIsVulnerabilityTree
  }
}
    ${AllIsVulnerabilityTreeFragmentDoc}`;

/**
 * __useIsVulnerabilityQ2Query__
 *
 * To run a query within a React component, call `useIsVulnerabilityQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useIsVulnerabilityQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsVulnerabilityQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useIsVulnerabilityQ2Query(baseOptions?: Apollo.QueryHookOptions<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>(IsVulnerabilityQ2Document, options);
      }
export function useIsVulnerabilityQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>(IsVulnerabilityQ2Document, options);
        }
export type IsVulnerabilityQ2QueryHookResult = ReturnType<typeof useIsVulnerabilityQ2Query>;
export type IsVulnerabilityQ2LazyQueryHookResult = ReturnType<typeof useIsVulnerabilityQ2LazyQuery>;
export type IsVulnerabilityQ2QueryResult = Apollo.QueryResult<IsVulnerabilityQ2Query, IsVulnerabilityQ2QueryVariables>;
export const IsVulnerabilityQ3Document = gql`
    query IsVulnerabilityQ3 {
  IsVulnerability(isVulnerabilitySpec: {osv: {osvId: "GHSA-h45f-rjvw-2rv2"}}) {
    ...allIsVulnerabilityTree
  }
}
    ${AllIsVulnerabilityTreeFragmentDoc}`;

/**
 * __useIsVulnerabilityQ3Query__
 *
 * To run a query within a React component, call `useIsVulnerabilityQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useIsVulnerabilityQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsVulnerabilityQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useIsVulnerabilityQ3Query(baseOptions?: Apollo.QueryHookOptions<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>(IsVulnerabilityQ3Document, options);
      }
export function useIsVulnerabilityQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>(IsVulnerabilityQ3Document, options);
        }
export type IsVulnerabilityQ3QueryHookResult = ReturnType<typeof useIsVulnerabilityQ3Query>;
export type IsVulnerabilityQ3LazyQueryHookResult = ReturnType<typeof useIsVulnerabilityQ3LazyQuery>;
export type IsVulnerabilityQ3QueryResult = Apollo.QueryResult<IsVulnerabilityQ3Query, IsVulnerabilityQ3QueryVariables>;
export const IsVulnerabilityQ4Document = gql`
    query IsVulnerabilityQ4 {
  IsVulnerability(isVulnerabilitySpec: {osv: {osvId: "CVE-2019-13110"}}) {
    ...allIsVulnerabilityTree
  }
}
    ${AllIsVulnerabilityTreeFragmentDoc}`;

/**
 * __useIsVulnerabilityQ4Query__
 *
 * To run a query within a React component, call `useIsVulnerabilityQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useIsVulnerabilityQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsVulnerabilityQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useIsVulnerabilityQ4Query(baseOptions?: Apollo.QueryHookOptions<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>(IsVulnerabilityQ4Document, options);
      }
export function useIsVulnerabilityQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>(IsVulnerabilityQ4Document, options);
        }
export type IsVulnerabilityQ4QueryHookResult = ReturnType<typeof useIsVulnerabilityQ4Query>;
export type IsVulnerabilityQ4LazyQueryHookResult = ReturnType<typeof useIsVulnerabilityQ4LazyQuery>;
export type IsVulnerabilityQ4QueryResult = Apollo.QueryResult<IsVulnerabilityQ4Query, IsVulnerabilityQ4QueryVariables>;
export const IsVulnerabilityQ5Document = gql`
    query IsVulnerabilityQ5 {
  IsVulnerability(
    isVulnerabilitySpec: {vulnerability: {cve: {cveId: "CVE-2019-13110"}}}
  ) {
    ...allIsVulnerabilityTree
  }
}
    ${AllIsVulnerabilityTreeFragmentDoc}`;

/**
 * __useIsVulnerabilityQ5Query__
 *
 * To run a query within a React component, call `useIsVulnerabilityQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useIsVulnerabilityQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsVulnerabilityQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useIsVulnerabilityQ5Query(baseOptions?: Apollo.QueryHookOptions<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>(IsVulnerabilityQ5Document, options);
      }
export function useIsVulnerabilityQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>(IsVulnerabilityQ5Document, options);
        }
export type IsVulnerabilityQ5QueryHookResult = ReturnType<typeof useIsVulnerabilityQ5Query>;
export type IsVulnerabilityQ5LazyQueryHookResult = ReturnType<typeof useIsVulnerabilityQ5LazyQuery>;
export type IsVulnerabilityQ5QueryResult = Apollo.QueryResult<IsVulnerabilityQ5Query, IsVulnerabilityQ5QueryVariables>;
export const IsVulnerabilityQ6Document = gql`
    query IsVulnerabilityQ6 {
  IsVulnerability(
    isVulnerabilitySpec: {vulnerability: {ghsa: {ghsaId: "GHSA-h45f-rjvw-2rv2"}}}
  ) {
    ...allIsVulnerabilityTree
  }
}
    ${AllIsVulnerabilityTreeFragmentDoc}`;

/**
 * __useIsVulnerabilityQ6Query__
 *
 * To run a query within a React component, call `useIsVulnerabilityQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useIsVulnerabilityQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsVulnerabilityQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useIsVulnerabilityQ6Query(baseOptions?: Apollo.QueryHookOptions<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>(IsVulnerabilityQ6Document, options);
      }
export function useIsVulnerabilityQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>(IsVulnerabilityQ6Document, options);
        }
export type IsVulnerabilityQ6QueryHookResult = ReturnType<typeof useIsVulnerabilityQ6Query>;
export type IsVulnerabilityQ6LazyQueryHookResult = ReturnType<typeof useIsVulnerabilityQ6LazyQuery>;
export type IsVulnerabilityQ6QueryResult = Apollo.QueryResult<IsVulnerabilityQ6Query, IsVulnerabilityQ6QueryVariables>;
export const PkgQ1Document = gql`
    query PkgQ1 {
  packages(pkgSpec: {}) {
    type
    namespaces {
      namespace
      names {
        name
      }
    }
  }
}
    `;

/**
 * __usePkgQ1Query__
 *
 * To run a query within a React component, call `usePkgQ1Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ1Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ1Query(baseOptions?: Apollo.QueryHookOptions<PkgQ1Query, PkgQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ1Query, PkgQ1QueryVariables>(PkgQ1Document, options);
      }
export function usePkgQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ1Query, PkgQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ1Query, PkgQ1QueryVariables>(PkgQ1Document, options);
        }
export type PkgQ1QueryHookResult = ReturnType<typeof usePkgQ1Query>;
export type PkgQ1LazyQueryHookResult = ReturnType<typeof usePkgQ1LazyQuery>;
export type PkgQ1QueryResult = Apollo.QueryResult<PkgQ1Query, PkgQ1QueryVariables>;
export const PkgQ2Document = gql`
    query PkgQ2 {
  packages(pkgSpec: {}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ2Query__
 *
 * To run a query within a React component, call `usePkgQ2Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ2Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ2Query(baseOptions?: Apollo.QueryHookOptions<PkgQ2Query, PkgQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ2Query, PkgQ2QueryVariables>(PkgQ2Document, options);
      }
export function usePkgQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ2Query, PkgQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ2Query, PkgQ2QueryVariables>(PkgQ2Document, options);
        }
export type PkgQ2QueryHookResult = ReturnType<typeof usePkgQ2Query>;
export type PkgQ2LazyQueryHookResult = ReturnType<typeof usePkgQ2LazyQuery>;
export type PkgQ2QueryResult = Apollo.QueryResult<PkgQ2Query, PkgQ2QueryVariables>;
export const PkgQ3Document = gql`
    query PkgQ3 {
  packages(pkgSpec: {type: "pypi"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ3Query__
 *
 * To run a query within a React component, call `usePkgQ3Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ3Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ3Query(baseOptions?: Apollo.QueryHookOptions<PkgQ3Query, PkgQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ3Query, PkgQ3QueryVariables>(PkgQ3Document, options);
      }
export function usePkgQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ3Query, PkgQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ3Query, PkgQ3QueryVariables>(PkgQ3Document, options);
        }
export type PkgQ3QueryHookResult = ReturnType<typeof usePkgQ3Query>;
export type PkgQ3LazyQueryHookResult = ReturnType<typeof usePkgQ3LazyQuery>;
export type PkgQ3QueryResult = Apollo.QueryResult<PkgQ3Query, PkgQ3QueryVariables>;
export const PkgQ4Document = gql`
    query PkgQ4 {
  packages(pkgSpec: {type: "pypi", namespace: "debian"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ4Query__
 *
 * To run a query within a React component, call `usePkgQ4Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ4Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ4Query(baseOptions?: Apollo.QueryHookOptions<PkgQ4Query, PkgQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ4Query, PkgQ4QueryVariables>(PkgQ4Document, options);
      }
export function usePkgQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ4Query, PkgQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ4Query, PkgQ4QueryVariables>(PkgQ4Document, options);
        }
export type PkgQ4QueryHookResult = ReturnType<typeof usePkgQ4Query>;
export type PkgQ4LazyQueryHookResult = ReturnType<typeof usePkgQ4LazyQuery>;
export type PkgQ4QueryResult = Apollo.QueryResult<PkgQ4Query, PkgQ4QueryVariables>;
export const PkgQ5Document = gql`
    query PkgQ5 {
  packages(pkgSpec: {type: "deb", namespace: "debian"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ5Query__
 *
 * To run a query within a React component, call `usePkgQ5Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ5Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ5Query(baseOptions?: Apollo.QueryHookOptions<PkgQ5Query, PkgQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ5Query, PkgQ5QueryVariables>(PkgQ5Document, options);
      }
export function usePkgQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ5Query, PkgQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ5Query, PkgQ5QueryVariables>(PkgQ5Document, options);
        }
export type PkgQ5QueryHookResult = ReturnType<typeof usePkgQ5Query>;
export type PkgQ5LazyQueryHookResult = ReturnType<typeof usePkgQ5LazyQuery>;
export type PkgQ5QueryResult = Apollo.QueryResult<PkgQ5Query, PkgQ5QueryVariables>;
export const PkgQ6Document = gql`
    query PkgQ6 {
  packages(pkgSpec: {type: "deb", namespace: "ubuntu", name: "dpkg"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ6Query__
 *
 * To run a query within a React component, call `usePkgQ6Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ6Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ6Query(baseOptions?: Apollo.QueryHookOptions<PkgQ6Query, PkgQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ6Query, PkgQ6QueryVariables>(PkgQ6Document, options);
      }
export function usePkgQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ6Query, PkgQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ6Query, PkgQ6QueryVariables>(PkgQ6Document, options);
        }
export type PkgQ6QueryHookResult = ReturnType<typeof usePkgQ6Query>;
export type PkgQ6LazyQueryHookResult = ReturnType<typeof usePkgQ6LazyQuery>;
export type PkgQ6QueryResult = Apollo.QueryResult<PkgQ6Query, PkgQ6QueryVariables>;
export const PkgQ7Document = gql`
    query PkgQ7 {
  packages(pkgSpec: {type: "deb", name: "dpkg"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ7Query__
 *
 * To run a query within a React component, call `usePkgQ7Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ7Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ7Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ7Query(baseOptions?: Apollo.QueryHookOptions<PkgQ7Query, PkgQ7QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ7Query, PkgQ7QueryVariables>(PkgQ7Document, options);
      }
export function usePkgQ7LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ7Query, PkgQ7QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ7Query, PkgQ7QueryVariables>(PkgQ7Document, options);
        }
export type PkgQ7QueryHookResult = ReturnType<typeof usePkgQ7Query>;
export type PkgQ7LazyQueryHookResult = ReturnType<typeof usePkgQ7LazyQuery>;
export type PkgQ7QueryResult = Apollo.QueryResult<PkgQ7Query, PkgQ7QueryVariables>;
export const PkgQ8Document = gql`
    query PkgQ8 {
  packages(pkgSpec: {name: "openssl", version: "3.0.3"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ8Query__
 *
 * To run a query within a React component, call `usePkgQ8Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ8Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ8Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ8Query(baseOptions?: Apollo.QueryHookOptions<PkgQ8Query, PkgQ8QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ8Query, PkgQ8QueryVariables>(PkgQ8Document, options);
      }
export function usePkgQ8LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ8Query, PkgQ8QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ8Query, PkgQ8QueryVariables>(PkgQ8Document, options);
        }
export type PkgQ8QueryHookResult = ReturnType<typeof usePkgQ8Query>;
export type PkgQ8LazyQueryHookResult = ReturnType<typeof usePkgQ8LazyQuery>;
export type PkgQ8QueryResult = Apollo.QueryResult<PkgQ8Query, PkgQ8QueryVariables>;
export const PkgQ9Document = gql`
    query PkgQ9 {
  packages(pkgSpec: {name: "openssl"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQ9Query__
 *
 * To run a query within a React component, call `usePkgQ9Query` and pass it any options that fit your needs.
 * When your component renders, `usePkgQ9Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQ9Query({
 *   variables: {
 *   },
 * });
 */
export function usePkgQ9Query(baseOptions?: Apollo.QueryHookOptions<PkgQ9Query, PkgQ9QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQ9Query, PkgQ9QueryVariables>(PkgQ9Document, options);
      }
export function usePkgQ9LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQ9Query, PkgQ9QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQ9Query, PkgQ9QueryVariables>(PkgQ9Document, options);
        }
export type PkgQ9QueryHookResult = ReturnType<typeof usePkgQ9Query>;
export type PkgQ9LazyQueryHookResult = ReturnType<typeof usePkgQ9LazyQuery>;
export type PkgQ9QueryResult = Apollo.QueryResult<PkgQ9Query, PkgQ9QueryVariables>;
export const PkgQaDocument = gql`
    query PkgQA {
  packages(pkgSpec: {qualifiers: [{key: "arch", value: "amd64"}]}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQaQuery__
 *
 * To run a query within a React component, call `usePkgQaQuery` and pass it any options that fit your needs.
 * When your component renders, `usePkgQaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQaQuery({
 *   variables: {
 *   },
 * });
 */
export function usePkgQaQuery(baseOptions?: Apollo.QueryHookOptions<PkgQaQuery, PkgQaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQaQuery, PkgQaQueryVariables>(PkgQaDocument, options);
      }
export function usePkgQaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQaQuery, PkgQaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQaQuery, PkgQaQueryVariables>(PkgQaDocument, options);
        }
export type PkgQaQueryHookResult = ReturnType<typeof usePkgQaQuery>;
export type PkgQaLazyQueryHookResult = ReturnType<typeof usePkgQaLazyQuery>;
export type PkgQaQueryResult = Apollo.QueryResult<PkgQaQuery, PkgQaQueryVariables>;
export const PkgQbDocument = gql`
    query PkgQB {
  packages(
    pkgSpec: {qualifiers: [{key: "arch", value: "amd64"}, {key: "distro", value: "stretch"}]}
  ) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQbQuery__
 *
 * To run a query within a React component, call `usePkgQbQuery` and pass it any options that fit your needs.
 * When your component renders, `usePkgQbQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQbQuery({
 *   variables: {
 *   },
 * });
 */
export function usePkgQbQuery(baseOptions?: Apollo.QueryHookOptions<PkgQbQuery, PkgQbQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQbQuery, PkgQbQueryVariables>(PkgQbDocument, options);
      }
export function usePkgQbLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQbQuery, PkgQbQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQbQuery, PkgQbQueryVariables>(PkgQbDocument, options);
        }
export type PkgQbQueryHookResult = ReturnType<typeof usePkgQbQuery>;
export type PkgQbLazyQueryHookResult = ReturnType<typeof usePkgQbLazyQuery>;
export type PkgQbQueryResult = Apollo.QueryResult<PkgQbQuery, PkgQbQueryVariables>;
export const PkgQcDocument = gql`
    query PkgQC {
  packages(pkgSpec: {subpath: "subpath"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQcQuery__
 *
 * To run a query within a React component, call `usePkgQcQuery` and pass it any options that fit your needs.
 * When your component renders, `usePkgQcQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQcQuery({
 *   variables: {
 *   },
 * });
 */
export function usePkgQcQuery(baseOptions?: Apollo.QueryHookOptions<PkgQcQuery, PkgQcQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQcQuery, PkgQcQueryVariables>(PkgQcDocument, options);
      }
export function usePkgQcLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQcQuery, PkgQcQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQcQuery, PkgQcQueryVariables>(PkgQcDocument, options);
        }
export type PkgQcQueryHookResult = ReturnType<typeof usePkgQcQuery>;
export type PkgQcLazyQueryHookResult = ReturnType<typeof usePkgQcLazyQuery>;
export type PkgQcQueryResult = Apollo.QueryResult<PkgQcQuery, PkgQcQueryVariables>;
export const PkgQdDocument = gql`
    query PkgQD {
  packages(pkgSpec: {matchOnlyEmptyQualifiers: true}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __usePkgQdQuery__
 *
 * To run a query within a React component, call `usePkgQdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePkgQdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgQdQuery({
 *   variables: {
 *   },
 * });
 */
export function usePkgQdQuery(baseOptions?: Apollo.QueryHookOptions<PkgQdQuery, PkgQdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PkgQdQuery, PkgQdQueryVariables>(PkgQdDocument, options);
      }
export function usePkgQdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PkgQdQuery, PkgQdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PkgQdQuery, PkgQdQueryVariables>(PkgQdDocument, options);
        }
export type PkgQdQueryHookResult = ReturnType<typeof usePkgQdQuery>;
export type PkgQdLazyQueryHookResult = ReturnType<typeof usePkgQdLazyQuery>;
export type PkgQdQueryResult = Apollo.QueryResult<PkgQdQuery, PkgQdQueryVariables>;
export const PkgM1Document = gql`
    mutation PkgM1 {
  ingestPackage(pkg: {type: "pypi", name: "tensorflow"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;
export type PkgM1MutationFn = Apollo.MutationFunction<PkgM1Mutation, PkgM1MutationVariables>;

/**
 * __usePkgM1Mutation__
 *
 * To run a mutation, you first call `usePkgM1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM1Mutation, { data, loading, error }] = usePkgM1Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM1Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM1Mutation, PkgM1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM1Mutation, PkgM1MutationVariables>(PkgM1Document, options);
      }
export type PkgM1MutationHookResult = ReturnType<typeof usePkgM1Mutation>;
export type PkgM1MutationResult = Apollo.MutationResult<PkgM1Mutation>;
export type PkgM1MutationOptions = Apollo.BaseMutationOptions<PkgM1Mutation, PkgM1MutationVariables>;
export const PkgM2Document = gql`
    mutation PkgM2 {
  ingestPackage(
    pkg: {type: "pypi", name: "tensorflow", qualifiers: [{key: "arch", value: "amd64"}, {key: "distro", value: "stretch"}]}
  ) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;
export type PkgM2MutationFn = Apollo.MutationFunction<PkgM2Mutation, PkgM2MutationVariables>;

/**
 * __usePkgM2Mutation__
 *
 * To run a mutation, you first call `usePkgM2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM2Mutation, { data, loading, error }] = usePkgM2Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM2Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM2Mutation, PkgM2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM2Mutation, PkgM2MutationVariables>(PkgM2Document, options);
      }
export type PkgM2MutationHookResult = ReturnType<typeof usePkgM2Mutation>;
export type PkgM2MutationResult = Apollo.MutationResult<PkgM2Mutation>;
export type PkgM2MutationOptions = Apollo.BaseMutationOptions<PkgM2Mutation, PkgM2MutationVariables>;
export const PkgM3Document = gql`
    mutation PkgM3 {
  ingestPackage(pkg: {type: "pypi", name: "tensorflow", version: "2.12.0"}) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;
export type PkgM3MutationFn = Apollo.MutationFunction<PkgM3Mutation, PkgM3MutationVariables>;

/**
 * __usePkgM3Mutation__
 *
 * To run a mutation, you first call `usePkgM3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM3Mutation, { data, loading, error }] = usePkgM3Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM3Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM3Mutation, PkgM3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM3Mutation, PkgM3MutationVariables>(PkgM3Document, options);
      }
export type PkgM3MutationHookResult = ReturnType<typeof usePkgM3Mutation>;
export type PkgM3MutationResult = Apollo.MutationResult<PkgM3Mutation>;
export type PkgM3MutationOptions = Apollo.BaseMutationOptions<PkgM3Mutation, PkgM3MutationVariables>;
export const PkgM4Document = gql`
    mutation PkgM4 {
  ingestPackage(
    pkg: {type: "pypi", name: "tensorflow", version: "2.12.0", qualifiers: [{key: "arch", value: "amd64"}, {key: "distro", value: "stretch"}]}
  ) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;
export type PkgM4MutationFn = Apollo.MutationFunction<PkgM4Mutation, PkgM4MutationVariables>;

/**
 * __usePkgM4Mutation__
 *
 * To run a mutation, you first call `usePkgM4Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM4Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM4Mutation, { data, loading, error }] = usePkgM4Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM4Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM4Mutation, PkgM4MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM4Mutation, PkgM4MutationVariables>(PkgM4Document, options);
      }
export type PkgM4MutationHookResult = ReturnType<typeof usePkgM4Mutation>;
export type PkgM4MutationResult = Apollo.MutationResult<PkgM4Mutation>;
export type PkgM4MutationOptions = Apollo.BaseMutationOptions<PkgM4Mutation, PkgM4MutationVariables>;
export const PkgM5Document = gql`
    mutation PkgM5 {
  ingestPackage(
    pkg: {type: "pypi", name: "tensorflow", version: "2.12.0", qualifiers: [{key: "distro", value: "stretch"}, {key: "arch", value: "amd64"}]}
  ) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;
export type PkgM5MutationFn = Apollo.MutationFunction<PkgM5Mutation, PkgM5MutationVariables>;

/**
 * __usePkgM5Mutation__
 *
 * To run a mutation, you first call `usePkgM5Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM5Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM5Mutation, { data, loading, error }] = usePkgM5Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM5Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM5Mutation, PkgM5MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM5Mutation, PkgM5MutationVariables>(PkgM5Document, options);
      }
export type PkgM5MutationHookResult = ReturnType<typeof usePkgM5Mutation>;
export type PkgM5MutationResult = Apollo.MutationResult<PkgM5Mutation>;
export type PkgM5MutationOptions = Apollo.BaseMutationOptions<PkgM5Mutation, PkgM5MutationVariables>;
export const PkgM6Document = gql`
    mutation PkgM6 {
  ingestPackage(
    pkg: {type: "pypi", name: "tensorflow", version: "2.12.0", subpath: "foo", qualifiers: [{key: "distro", value: "stretch"}, {key: "arch", value: "amd64"}]}
  ) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;
export type PkgM6MutationFn = Apollo.MutationFunction<PkgM6Mutation, PkgM6MutationVariables>;

/**
 * __usePkgM6Mutation__
 *
 * To run a mutation, you first call `usePkgM6Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM6Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM6Mutation, { data, loading, error }] = usePkgM6Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM6Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM6Mutation, PkgM6MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM6Mutation, PkgM6MutationVariables>(PkgM6Document, options);
      }
export type PkgM6MutationHookResult = ReturnType<typeof usePkgM6Mutation>;
export type PkgM6MutationResult = Apollo.MutationResult<PkgM6Mutation>;
export type PkgM6MutationOptions = Apollo.BaseMutationOptions<PkgM6Mutation, PkgM6MutationVariables>;
export const PkgM7Document = gql`
    mutation PkgM7 {
  ingestPackage(
    pkg: {type: "pypi", name: "tensorflow", version: "2.12.0", subpath: "foo", qualifiers: [{key: "distro", value: "stretch"}, {key: "arch", value: "amd64"}]}
  ) {
    namespaces {
      names {
        versions {
          qualifiers {
            key
            value
          }
        }
      }
    }
  }
}
    `;
export type PkgM7MutationFn = Apollo.MutationFunction<PkgM7Mutation, PkgM7MutationVariables>;

/**
 * __usePkgM7Mutation__
 *
 * To run a mutation, you first call `usePkgM7Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePkgM7Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pkgM7Mutation, { data, loading, error }] = usePkgM7Mutation({
 *   variables: {
 *   },
 * });
 */
export function usePkgM7Mutation(baseOptions?: Apollo.MutationHookOptions<PkgM7Mutation, PkgM7MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PkgM7Mutation, PkgM7MutationVariables>(PkgM7Document, options);
      }
export type PkgM7MutationHookResult = ReturnType<typeof usePkgM7Mutation>;
export type PkgM7MutationResult = Apollo.MutationResult<PkgM7Mutation>;
export type PkgM7MutationOptions = Apollo.BaseMutationOptions<PkgM7Mutation, PkgM7MutationVariables>;
export const SrcQ1Document = gql`
    query SrcQ1 {
  sources(sourceSpec: {}) {
    namespaces {
      names {
        name
      }
    }
  }
}
    `;

/**
 * __useSrcQ1Query__
 *
 * To run a query within a React component, call `useSrcQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ1Query(baseOptions?: Apollo.QueryHookOptions<SrcQ1Query, SrcQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ1Query, SrcQ1QueryVariables>(SrcQ1Document, options);
      }
export function useSrcQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ1Query, SrcQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ1Query, SrcQ1QueryVariables>(SrcQ1Document, options);
        }
export type SrcQ1QueryHookResult = ReturnType<typeof useSrcQ1Query>;
export type SrcQ1LazyQueryHookResult = ReturnType<typeof useSrcQ1LazyQuery>;
export type SrcQ1QueryResult = Apollo.QueryResult<SrcQ1Query, SrcQ1QueryVariables>;
export const SrcQ2Document = gql`
    query SrcQ2 {
  sources(sourceSpec: {}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ2Query__
 *
 * To run a query within a React component, call `useSrcQ2Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ2Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ2Query(baseOptions?: Apollo.QueryHookOptions<SrcQ2Query, SrcQ2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ2Query, SrcQ2QueryVariables>(SrcQ2Document, options);
      }
export function useSrcQ2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ2Query, SrcQ2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ2Query, SrcQ2QueryVariables>(SrcQ2Document, options);
        }
export type SrcQ2QueryHookResult = ReturnType<typeof useSrcQ2Query>;
export type SrcQ2LazyQueryHookResult = ReturnType<typeof useSrcQ2LazyQuery>;
export type SrcQ2QueryResult = Apollo.QueryResult<SrcQ2Query, SrcQ2QueryVariables>;
export const SrcQ3Document = gql`
    query SrcQ3 {
  sources(sourceSpec: {tag: "", commit: ""}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ3Query__
 *
 * To run a query within a React component, call `useSrcQ3Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ3Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ3Query(baseOptions?: Apollo.QueryHookOptions<SrcQ3Query, SrcQ3QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ3Query, SrcQ3QueryVariables>(SrcQ3Document, options);
      }
export function useSrcQ3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ3Query, SrcQ3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ3Query, SrcQ3QueryVariables>(SrcQ3Document, options);
        }
export type SrcQ3QueryHookResult = ReturnType<typeof useSrcQ3Query>;
export type SrcQ3LazyQueryHookResult = ReturnType<typeof useSrcQ3LazyQuery>;
export type SrcQ3QueryResult = Apollo.QueryResult<SrcQ3Query, SrcQ3QueryVariables>;
export const SrcQ4Document = gql`
    query SrcQ4 {
  sources(sourceSpec: {name: "github.com/guacsec/guac"}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ4Query__
 *
 * To run a query within a React component, call `useSrcQ4Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ4Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ4Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ4Query(baseOptions?: Apollo.QueryHookOptions<SrcQ4Query, SrcQ4QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ4Query, SrcQ4QueryVariables>(SrcQ4Document, options);
      }
export function useSrcQ4LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ4Query, SrcQ4QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ4Query, SrcQ4QueryVariables>(SrcQ4Document, options);
        }
export type SrcQ4QueryHookResult = ReturnType<typeof useSrcQ4Query>;
export type SrcQ4LazyQueryHookResult = ReturnType<typeof useSrcQ4LazyQuery>;
export type SrcQ4QueryResult = Apollo.QueryResult<SrcQ4Query, SrcQ4QueryVariables>;
export const SrcQ5Document = gql`
    query SrcQ5 {
  sources(sourceSpec: {tag: "v0.0.1"}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ5Query__
 *
 * To run a query within a React component, call `useSrcQ5Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ5Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ5Query(baseOptions?: Apollo.QueryHookOptions<SrcQ5Query, SrcQ5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ5Query, SrcQ5QueryVariables>(SrcQ5Document, options);
      }
export function useSrcQ5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ5Query, SrcQ5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ5Query, SrcQ5QueryVariables>(SrcQ5Document, options);
        }
export type SrcQ5QueryHookResult = ReturnType<typeof useSrcQ5Query>;
export type SrcQ5LazyQueryHookResult = ReturnType<typeof useSrcQ5LazyQuery>;
export type SrcQ5QueryResult = Apollo.QueryResult<SrcQ5Query, SrcQ5QueryVariables>;
export const SrcQ6Document = gql`
    query SrcQ6 {
  sources(sourceSpec: {commit: "fcba958b73e27cad8b5c8655d46439984d27853b"}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ6Query__
 *
 * To run a query within a React component, call `useSrcQ6Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ6Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ6Query(baseOptions?: Apollo.QueryHookOptions<SrcQ6Query, SrcQ6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ6Query, SrcQ6QueryVariables>(SrcQ6Document, options);
      }
export function useSrcQ6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ6Query, SrcQ6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ6Query, SrcQ6QueryVariables>(SrcQ6Document, options);
        }
export type SrcQ6QueryHookResult = ReturnType<typeof useSrcQ6Query>;
export type SrcQ6LazyQueryHookResult = ReturnType<typeof useSrcQ6LazyQuery>;
export type SrcQ6QueryResult = Apollo.QueryResult<SrcQ6Query, SrcQ6QueryVariables>;
export const SrcQ7Document = gql`
    query SrcQ7 {
  sources(sourceSpec: {type: "svn"}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ7Query__
 *
 * To run a query within a React component, call `useSrcQ7Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ7Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ7Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ7Query(baseOptions?: Apollo.QueryHookOptions<SrcQ7Query, SrcQ7QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ7Query, SrcQ7QueryVariables>(SrcQ7Document, options);
      }
export function useSrcQ7LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ7Query, SrcQ7QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ7Query, SrcQ7QueryVariables>(SrcQ7Document, options);
        }
export type SrcQ7QueryHookResult = ReturnType<typeof useSrcQ7Query>;
export type SrcQ7LazyQueryHookResult = ReturnType<typeof useSrcQ7LazyQuery>;
export type SrcQ7QueryResult = Apollo.QueryResult<SrcQ7Query, SrcQ7QueryVariables>;
export const SrcQ8Document = gql`
    query SrcQ8 {
  sources(sourceSpec: {namespace: "gitlab"}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ8Query__
 *
 * To run a query within a React component, call `useSrcQ8Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ8Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ8Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ8Query(baseOptions?: Apollo.QueryHookOptions<SrcQ8Query, SrcQ8QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ8Query, SrcQ8QueryVariables>(SrcQ8Document, options);
      }
export function useSrcQ8LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ8Query, SrcQ8QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ8Query, SrcQ8QueryVariables>(SrcQ8Document, options);
        }
export type SrcQ8QueryHookResult = ReturnType<typeof useSrcQ8Query>;
export type SrcQ8LazyQueryHookResult = ReturnType<typeof useSrcQ8LazyQuery>;
export type SrcQ8QueryResult = Apollo.QueryResult<SrcQ8Query, SrcQ8QueryVariables>;
export const SrcQ9Document = gql`
    query SrcQ9 {
  sources(sourceSpec: {tag: "asd", commit: "sad"}) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useSrcQ9Query__
 *
 * To run a query within a React component, call `useSrcQ9Query` and pass it any options that fit your needs.
 * When your component renders, `useSrcQ9Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSrcQ9Query({
 *   variables: {
 *   },
 * });
 */
export function useSrcQ9Query(baseOptions?: Apollo.QueryHookOptions<SrcQ9Query, SrcQ9QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SrcQ9Query, SrcQ9QueryVariables>(SrcQ9Document, options);
      }
export function useSrcQ9LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SrcQ9Query, SrcQ9QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SrcQ9Query, SrcQ9QueryVariables>(SrcQ9Document, options);
        }
export type SrcQ9QueryHookResult = ReturnType<typeof useSrcQ9Query>;
export type SrcQ9LazyQueryHookResult = ReturnType<typeof useSrcQ9LazyQuery>;
export type SrcQ9QueryResult = Apollo.QueryResult<SrcQ9Query, SrcQ9QueryVariables>;
export const SrcM1Document = gql`
    mutation SrcM1 {
  ingestSource(
    source: {type: "git", namespace: "github", name: "github.com/tensorflow/tensorflow"}
  ) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;
export type SrcM1MutationFn = Apollo.MutationFunction<SrcM1Mutation, SrcM1MutationVariables>;

/**
 * __useSrcM1Mutation__
 *
 * To run a mutation, you first call `useSrcM1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSrcM1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [srcM1Mutation, { data, loading, error }] = useSrcM1Mutation({
 *   variables: {
 *   },
 * });
 */
export function useSrcM1Mutation(baseOptions?: Apollo.MutationHookOptions<SrcM1Mutation, SrcM1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SrcM1Mutation, SrcM1MutationVariables>(SrcM1Document, options);
      }
export type SrcM1MutationHookResult = ReturnType<typeof useSrcM1Mutation>;
export type SrcM1MutationResult = Apollo.MutationResult<SrcM1Mutation>;
export type SrcM1MutationOptions = Apollo.BaseMutationOptions<SrcM1Mutation, SrcM1MutationVariables>;
export const SrcM2Document = gql`
    mutation SrcM2 {
  ingestSource(
    source: {type: "git", namespace: "github", name: "github.com/tensorflow/tensorflow", commit: "4fd637ad9d674c88c50d56a5d47cd77f6032e609"}
  ) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;
export type SrcM2MutationFn = Apollo.MutationFunction<SrcM2Mutation, SrcM2MutationVariables>;

/**
 * __useSrcM2Mutation__
 *
 * To run a mutation, you first call `useSrcM2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSrcM2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [srcM2Mutation, { data, loading, error }] = useSrcM2Mutation({
 *   variables: {
 *   },
 * });
 */
export function useSrcM2Mutation(baseOptions?: Apollo.MutationHookOptions<SrcM2Mutation, SrcM2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SrcM2Mutation, SrcM2MutationVariables>(SrcM2Document, options);
      }
export type SrcM2MutationHookResult = ReturnType<typeof useSrcM2Mutation>;
export type SrcM2MutationResult = Apollo.MutationResult<SrcM2Mutation>;
export type SrcM2MutationOptions = Apollo.BaseMutationOptions<SrcM2Mutation, SrcM2MutationVariables>;
export const SrcM3Document = gql`
    mutation SrcM3 {
  ingestSource(
    source: {type: "git", namespace: "github", name: "github.com/tensorflow/tensorflow", tag: "v2.12.0"}
  ) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;
export type SrcM3MutationFn = Apollo.MutationFunction<SrcM3Mutation, SrcM3MutationVariables>;

/**
 * __useSrcM3Mutation__
 *
 * To run a mutation, you first call `useSrcM3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSrcM3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [srcM3Mutation, { data, loading, error }] = useSrcM3Mutation({
 *   variables: {
 *   },
 * });
 */
export function useSrcM3Mutation(baseOptions?: Apollo.MutationHookOptions<SrcM3Mutation, SrcM3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SrcM3Mutation, SrcM3MutationVariables>(SrcM3Document, options);
      }
export type SrcM3MutationHookResult = ReturnType<typeof useSrcM3Mutation>;
export type SrcM3MutationResult = Apollo.MutationResult<SrcM3Mutation>;
export type SrcM3MutationOptions = Apollo.BaseMutationOptions<SrcM3Mutation, SrcM3MutationVariables>;
export const SrcM4Document = gql`
    mutation SrcM4 {
  ingestSource(
    source: {type: "git", namespace: "github", name: "github.com/tensorflow/tensorflow", commit: "4fd637ad9d674c88c50d56a5d47cd77f6032e609", tag: "2.12.0"}
  ) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;
export type SrcM4MutationFn = Apollo.MutationFunction<SrcM4Mutation, SrcM4MutationVariables>;

/**
 * __useSrcM4Mutation__
 *
 * To run a mutation, you first call `useSrcM4Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSrcM4Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [srcM4Mutation, { data, loading, error }] = useSrcM4Mutation({
 *   variables: {
 *   },
 * });
 */
export function useSrcM4Mutation(baseOptions?: Apollo.MutationHookOptions<SrcM4Mutation, SrcM4MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SrcM4Mutation, SrcM4MutationVariables>(SrcM4Document, options);
      }
export type SrcM4MutationHookResult = ReturnType<typeof useSrcM4Mutation>;
export type SrcM4MutationResult = Apollo.MutationResult<SrcM4Mutation>;
export type SrcM4MutationOptions = Apollo.BaseMutationOptions<SrcM4Mutation, SrcM4MutationVariables>;
export const SrcM5Document = gql`
    mutation SrcM5 {
  ingestSource(
    source: {type: "git", namespace: "github", name: "github.com/tensorflow/tensorflow", tag: "v2.12.0"}
  ) {
    namespaces {
      names {
        name
      }
    }
  }
}
    `;
export type SrcM5MutationFn = Apollo.MutationFunction<SrcM5Mutation, SrcM5MutationVariables>;

/**
 * __useSrcM5Mutation__
 *
 * To run a mutation, you first call `useSrcM5Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSrcM5Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [srcM5Mutation, { data, loading, error }] = useSrcM5Mutation({
 *   variables: {
 *   },
 * });
 */
export function useSrcM5Mutation(baseOptions?: Apollo.MutationHookOptions<SrcM5Mutation, SrcM5MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SrcM5Mutation, SrcM5MutationVariables>(SrcM5Document, options);
      }
export type SrcM5MutationHookResult = ReturnType<typeof useSrcM5Mutation>;
export type SrcM5MutationResult = Apollo.MutationResult<SrcM5Mutation>;
export type SrcM5MutationOptions = Apollo.BaseMutationOptions<SrcM5Mutation, SrcM5MutationVariables>;
export const SrcM6Document = gql`
    mutation SrcM6 {
  ingestSource(
    source: {type: "git", namespace: "github", name: "github.com/tensorflow/tensorflow", commit: "", tag: "v2.12.0"}
  ) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;
export type SrcM6MutationFn = Apollo.MutationFunction<SrcM6Mutation, SrcM6MutationVariables>;

/**
 * __useSrcM6Mutation__
 *
 * To run a mutation, you first call `useSrcM6Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSrcM6Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [srcM6Mutation, { data, loading, error }] = useSrcM6Mutation({
 *   variables: {
 *   },
 * });
 */
export function useSrcM6Mutation(baseOptions?: Apollo.MutationHookOptions<SrcM6Mutation, SrcM6MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SrcM6Mutation, SrcM6MutationVariables>(SrcM6Document, options);
      }
export type SrcM6MutationHookResult = ReturnType<typeof useSrcM6Mutation>;
export type SrcM6MutationResult = Apollo.MutationResult<SrcM6Mutation>;
export type SrcM6MutationOptions = Apollo.BaseMutationOptions<SrcM6Mutation, SrcM6MutationVariables>;
export const GetPkgDocument = gql`
    query GetPkg($spec: PkgSpec) {
  packages(pkgSpec: $spec) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __useGetPkgQuery__
 *
 * To run a query within a React component, call `useGetPkgQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPkgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPkgQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetPkgQuery(baseOptions?: Apollo.QueryHookOptions<GetPkgQuery, GetPkgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPkgQuery, GetPkgQueryVariables>(GetPkgDocument, options);
      }
export function useGetPkgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPkgQuery, GetPkgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPkgQuery, GetPkgQueryVariables>(GetPkgDocument, options);
        }
export type GetPkgQueryHookResult = ReturnType<typeof useGetPkgQuery>;
export type GetPkgLazyQueryHookResult = ReturnType<typeof useGetPkgLazyQuery>;
export type GetPkgQueryResult = Apollo.QueryResult<GetPkgQuery, GetPkgQueryVariables>;
export const GetSrcDocument = gql`
    query GetSrc($spec: SourceSpec) {
  sources(sourceSpec: $spec) {
    ...allSrcTree
  }
}
    ${AllSrcTreeFragmentDoc}`;

/**
 * __useGetSrcQuery__
 *
 * To run a query within a React component, call `useGetSrcQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSrcQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSrcQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetSrcQuery(baseOptions?: Apollo.QueryHookOptions<GetSrcQuery, GetSrcQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSrcQuery, GetSrcQueryVariables>(GetSrcDocument, options);
      }
export function useGetSrcLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSrcQuery, GetSrcQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSrcQuery, GetSrcQueryVariables>(GetSrcDocument, options);
        }
export type GetSrcQueryHookResult = ReturnType<typeof useGetSrcQuery>;
export type GetSrcLazyQueryHookResult = ReturnType<typeof useGetSrcLazyQuery>;
export type GetSrcQueryResult = Apollo.QueryResult<GetSrcQuery, GetSrcQueryVariables>;
export const GetArtifactDocument = gql`
    query GetArtifact($spec: ArtifactSpec) {
  artifacts(artifactSpec: $spec) {
    ...allArtifactTree
  }
}
    ${AllArtifactTreeFragmentDoc}`;

/**
 * __useGetArtifactQuery__
 *
 * To run a query within a React component, call `useGetArtifactQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtifactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtifactQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetArtifactQuery(baseOptions?: Apollo.QueryHookOptions<GetArtifactQuery, GetArtifactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArtifactQuery, GetArtifactQueryVariables>(GetArtifactDocument, options);
      }
export function useGetArtifactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtifactQuery, GetArtifactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArtifactQuery, GetArtifactQueryVariables>(GetArtifactDocument, options);
        }
export type GetArtifactQueryHookResult = ReturnType<typeof useGetArtifactQuery>;
export type GetArtifactLazyQueryHookResult = ReturnType<typeof useGetArtifactLazyQuery>;
export type GetArtifactQueryResult = Apollo.QueryResult<GetArtifactQuery, GetArtifactQueryVariables>;
export const GetCveDocument = gql`
    query GetCve($spec: CVESpec) {
  cve(cveSpec: $spec) {
    ...allCveTree
  }
}
    ${AllCveTreeFragmentDoc}`;

/**
 * __useGetCveQuery__
 *
 * To run a query within a React component, call `useGetCveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCveQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetCveQuery(baseOptions?: Apollo.QueryHookOptions<GetCveQuery, GetCveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCveQuery, GetCveQueryVariables>(GetCveDocument, options);
      }
export function useGetCveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCveQuery, GetCveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCveQuery, GetCveQueryVariables>(GetCveDocument, options);
        }
export type GetCveQueryHookResult = ReturnType<typeof useGetCveQuery>;
export type GetCveLazyQueryHookResult = ReturnType<typeof useGetCveLazyQuery>;
export type GetCveQueryResult = Apollo.QueryResult<GetCveQuery, GetCveQueryVariables>;
export const GetIsDepedencyDocument = gql`
    query GetIsDepedency($spec: IsDependencySpec) {
  IsDependency(isDependencySpec: $spec) {
    ...allIsDependencyTree
  }
}
    ${AllIsDependencyTreeFragmentDoc}`;

/**
 * __useGetIsDepedencyQuery__
 *
 * To run a query within a React component, call `useGetIsDepedencyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsDepedencyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsDepedencyQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetIsDepedencyQuery(baseOptions?: Apollo.QueryHookOptions<GetIsDepedencyQuery, GetIsDepedencyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsDepedencyQuery, GetIsDepedencyQueryVariables>(GetIsDepedencyDocument, options);
      }
export function useGetIsDepedencyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsDepedencyQuery, GetIsDepedencyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsDepedencyQuery, GetIsDepedencyQueryVariables>(GetIsDepedencyDocument, options);
        }
export type GetIsDepedencyQueryHookResult = ReturnType<typeof useGetIsDepedencyQuery>;
export type GetIsDepedencyLazyQueryHookResult = ReturnType<typeof useGetIsDepedencyLazyQuery>;
export type GetIsDepedencyQueryResult = Apollo.QueryResult<GetIsDepedencyQuery, GetIsDepedencyQueryVariables>;
export const GetIsOccurrenceDocument = gql`
    query GetIsOccurrence($spec: IsOccurrenceSpec) {
  IsOccurrence(isOccurrenceSpec: $spec) {
    ...allIsOccurrencesTree
  }
}
    ${AllIsOccurrencesTreeFragmentDoc}`;

/**
 * __useGetIsOccurrenceQuery__
 *
 * To run a query within a React component, call `useGetIsOccurrenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsOccurrenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsOccurrenceQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetIsOccurrenceQuery(baseOptions?: Apollo.QueryHookOptions<GetIsOccurrenceQuery, GetIsOccurrenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsOccurrenceQuery, GetIsOccurrenceQueryVariables>(GetIsOccurrenceDocument, options);
      }
export function useGetIsOccurrenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsOccurrenceQuery, GetIsOccurrenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsOccurrenceQuery, GetIsOccurrenceQueryVariables>(GetIsOccurrenceDocument, options);
        }
export type GetIsOccurrenceQueryHookResult = ReturnType<typeof useGetIsOccurrenceQuery>;
export type GetIsOccurrenceLazyQueryHookResult = ReturnType<typeof useGetIsOccurrenceLazyQuery>;
export type GetIsOccurrenceQueryResult = Apollo.QueryResult<GetIsOccurrenceQuery, GetIsOccurrenceQueryVariables>;
export const GetHasSourceAtDocument = gql`
    query GetHasSourceAt($spec: HasSourceAtSpec) {
  HasSourceAt(hasSourceAtSpec: $spec) {
    ...allHasSourceAtTree
  }
}
    ${AllHasSourceAtTreeFragmentDoc}`;

/**
 * __useGetHasSourceAtQuery__
 *
 * To run a query within a React component, call `useGetHasSourceAtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHasSourceAtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHasSourceAtQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetHasSourceAtQuery(baseOptions?: Apollo.QueryHookOptions<GetHasSourceAtQuery, GetHasSourceAtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHasSourceAtQuery, GetHasSourceAtQueryVariables>(GetHasSourceAtDocument, options);
      }
export function useGetHasSourceAtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHasSourceAtQuery, GetHasSourceAtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHasSourceAtQuery, GetHasSourceAtQueryVariables>(GetHasSourceAtDocument, options);
        }
export type GetHasSourceAtQueryHookResult = ReturnType<typeof useGetHasSourceAtQuery>;
export type GetHasSourceAtLazyQueryHookResult = ReturnType<typeof useGetHasSourceAtLazyQuery>;
export type GetHasSourceAtQueryResult = Apollo.QueryResult<GetHasSourceAtQuery, GetHasSourceAtQueryVariables>;
export const GetCertifyVulnDocument = gql`
    query GetCertifyVuln($spec: CertifyVulnSpec) {
  CertifyVuln(certifyVulnSpec: $spec) {
    ...allCertifyVulnTree
  }
}
    ${AllCertifyVulnTreeFragmentDoc}`;

/**
 * __useGetCertifyVulnQuery__
 *
 * To run a query within a React component, call `useGetCertifyVulnQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCertifyVulnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCertifyVulnQuery({
 *   variables: {
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useGetCertifyVulnQuery(baseOptions?: Apollo.QueryHookOptions<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>(GetCertifyVulnDocument, options);
      }
export function useGetCertifyVulnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>(GetCertifyVulnDocument, options);
        }
export type GetCertifyVulnQueryHookResult = ReturnType<typeof useGetCertifyVulnQuery>;
export type GetCertifyVulnLazyQueryHookResult = ReturnType<typeof useGetCertifyVulnLazyQuery>;
export type GetCertifyVulnQueryResult = Apollo.QueryResult<GetCertifyVulnQuery, GetCertifyVulnQueryVariables>;
export const ReachQ1Document = gql`
    query ReachQ1 {
  packages(
    pkgSpec: {type: "deb", namespace: "ubuntu", name: "dpkg", qualifiers: [{key: "arch", value: "amd64"}]}
  ) {
    ...allPkgTree
  }
}
    ${AllPkgTreeFragmentDoc}`;

/**
 * __useReachQ1Query__
 *
 * To run a query within a React component, call `useReachQ1Query` and pass it any options that fit your needs.
 * When your component renders, `useReachQ1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReachQ1Query({
 *   variables: {
 *   },
 * });
 */
export function useReachQ1Query(baseOptions?: Apollo.QueryHookOptions<ReachQ1Query, ReachQ1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReachQ1Query, ReachQ1QueryVariables>(ReachQ1Document, options);
      }
export function useReachQ1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReachQ1Query, ReachQ1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReachQ1Query, ReachQ1QueryVariables>(ReachQ1Document, options);
        }
export type ReachQ1QueryHookResult = ReturnType<typeof useReachQ1Query>;
export type ReachQ1LazyQueryHookResult = ReturnType<typeof useReachQ1LazyQuery>;
export type ReachQ1QueryResult = Apollo.QueryResult<ReachQ1Query, ReachQ1QueryVariables>;
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

export type BuilderQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type BuilderQ1Query = { __typename?: 'Query', builders: Array<{ __typename?: 'Builder', uri: string }> };

export type BuilderQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type BuilderQ2Query = { __typename?: 'Query', builders: Array<{ __typename?: 'Builder', uri: string }> };

export type BuilderM1MutationVariables = Exact<{ [key: string]: never; }>;


export type BuilderM1Mutation = { __typename?: 'Mutation', ingestBuilder: { __typename?: 'Builder', uri: string } };

export type AllCertifyBadTreeFragment = { __typename?: 'CertifyBad', justification: string, origin: string, collector: string, subject: { __typename: 'Artifact', algorithm: string, digest: string } | { __typename: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', type: string, namespaces: Array<{ __typename?: 'SourceNamespace', namespace: string, names: Array<{ __typename?: 'SourceName', name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllCertifyBadTreeFragment' };

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

export type AllCertifyPkgTreeFragment = { __typename?: 'CertifyPkg', justification: string, origin: string, collector: string, packages: Array<{ __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }> } & { ' $fragmentName'?: 'AllCertifyPkgTreeFragment' };

export type CertifyPkgQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ1Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ2QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ2Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ3QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ3Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ4QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ4Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

export type CertifyPkgQ5QueryVariables = Exact<{ [key: string]: never; }>;


export type CertifyPkgQ5Query = { __typename?: 'Query', CertifyPkg: Array<(
    { __typename?: 'CertifyPkg' }
    & { ' $fragmentRefs'?: { 'AllCertifyPkgTreeFragment': AllCertifyPkgTreeFragment } }
  )> };

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

export type AllCertifyVexStatementTreeFragment = { __typename?: 'CertifyVEXStatement', justification: string, knownSince: any, origin: string, collector: string, subject: { __typename: 'Artifact', algorithm: string, digest: string } | { __typename: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, vulnerability: { __typename: 'CVE', year: number, cveIds: Array<{ __typename?: 'CVEId', id: string }> } | { __typename: 'GHSA', ghsaIds: Array<{ __typename?: 'GHSAId', id: string }> } } & { ' $fragmentName'?: 'AllCertifyVexStatementTreeFragment' };

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

export type AllCertifyVulnTreeFragment = { __typename?: 'CertifyVuln', package: { __typename?: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> }, vulnerability: { __typename: 'CVE', id: string, year: number, cveIds: Array<{ __typename?: 'CVEId', id: string, cveId: string }> } | { __typename: 'GHSA', id: string, ghsaIds: Array<{ __typename?: 'GHSAId', id: string, ghsaId: string }> } | { __typename: 'OSV', id: string, osvIds: Array<{ __typename?: 'OSVId', id: string, osvId: string }> }, metadata: { __typename?: 'VulnerabilityMetaData', dbUri: string, dbVersion: string, scannerUri: string, scannerVersion: string, timeScanned: any, origin: string, collector: string } } & { ' $fragmentName'?: 'AllCertifyVulnTreeFragment' };

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

export type AllHasSbomTreeFragment = { __typename?: 'HasSBOM', uri: string, origin: string, collector: string, subject: { __typename: 'Package', type: string, namespaces: Array<{ __typename?: 'PackageNamespace', namespace: string, names: Array<{ __typename?: 'PackageName', name: string, versions: Array<{ __typename?: 'PackageVersion', version: string, subpath: string, qualifiers: Array<{ __typename?: 'PackageQualifier', key: string, value: string }> }> }> }> } | { __typename: 'Source', type: string, namespaces: Array<{ __typename?: 'SourceNamespace', namespace: string, names: Array<{ __typename?: 'SourceName', name: string, tag?: string | null, commit?: string | null }> }> } } & { ' $fragmentName'?: 'AllHasSbomTreeFragment' };

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

export type AllSlsaTreeFragment = { __typename?: 'HasSLSA', subject: { __typename: 'Artifact', algorithm: string, digest: string } | (
    { __typename: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  ) | (
    { __typename: 'Source' }
    & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
  ), slsa?: { __typename?: 'SLSA', buildType: string, slsaVersion: string, startedOn: any, finishedOn: any, origin: string, collector: string, builtFrom: Array<{ __typename: 'Artifact', algorithm: string, digest: string } | (
      { __typename: 'Package' }
      & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
    ) | (
      { __typename: 'Source' }
      & { ' $fragmentRefs'?: { 'AllSrcTreeFragment': AllSrcTreeFragment } }
    )>, builtBy: { __typename?: 'Builder', uri: string }, slsaPredicate: Array<{ __typename?: 'SLSAPredicate', key: string, value: string }> } | null } & { ' $fragmentName'?: 'AllSlsaTreeFragment' };

export type Slsaq1QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq1Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

export type Slsaq2QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq2Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

export type Slsaq3QueryVariables = Exact<{ [key: string]: never; }>;


export type Slsaq3Query = { __typename?: 'Query', HasSLSA: Array<(
    { __typename?: 'HasSLSA' }
    & { ' $fragmentRefs'?: { 'AllSlsaTreeFragment': AllSlsaTreeFragment } }
  )> };

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

export type AllIsVulnerabilityTreeFragment = { __typename?: 'IsVulnerability', justification: string, origin: string, collector: string, osv: { __typename?: 'OSV', osvIds: Array<{ __typename?: 'OSVId', id: string }> }, vulnerability: { __typename: 'CVE', year: number, cveIds: Array<{ __typename?: 'CVEId', id: string }> } | { __typename: 'GHSA', ghsaIds: Array<{ __typename?: 'GHSAId', id: string }> } } & { ' $fragmentName'?: 'AllIsVulnerabilityTreeFragment' };

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

export type ReachQ1QueryVariables = Exact<{ [key: string]: never; }>;


export type ReachQ1Query = { __typename?: 'Query', packages: Array<(
    { __typename?: 'Package' }
    & { ' $fragmentRefs'?: { 'AllPkgTreeFragment': AllPkgTreeFragment } }
  )> };
