/* eslint-disable */
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
  cveId: Array<CveId>;
  year: Scalars['String'];
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
  id: Scalars['String'];
};

/** CVEInputSpec is the same as CVESpec, but used for mutation ingestion. */
export type CveInputSpec = {
  cveId: Scalars['String'];
  year: Scalars['String'];
};

/** CVESpec allows filtering the list of cves to return. */
export type CveSpec = {
  cveId?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['String']>;
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
  ghsaId: Array<GhsaId>;
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
  id: Scalars['String'];
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
 * OSV represents an Open Source Vulnerability.
 *
 * We create a separate node to allow retrieving all OSVs.
 */
export type Osv = {
  __typename?: 'OSV';
  osvId: Array<OsvId>;
};

/**
 * OSVId is the actual ID that is given to a specific vulnerability.
 *
 * The `id` field is mandatory and canonicalized to be lowercase.
 *
 * This maps to a vulnerability ID specific to the environment (e.g., GHSA ID or
 * CVE ID).
 *
 * This node can be referred to by other parts of GUAC.
 */
export type OsvId = {
  __typename?: 'OSVId';
  id: Scalars['String'];
};

/** OSVInputSpec is the same as OSVSpec, but used for mutation ingestion. */
export type OsvInputSpec = {
  osvId: Scalars['String'];
};

/** OSVSpec allows filtering the list of OSV to return. */
export type OsvSpec = {
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
