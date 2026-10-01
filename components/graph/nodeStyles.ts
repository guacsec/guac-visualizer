/**
 * Single source of truth for how a GUAC node type is drawn.
 *
 * Three independent visual channels, so they never fight each other:
 *
 *   family  -> which part of the supply chain the node belongs to (legend grouping)
 *   tier    -> how concrete the node is (ecosystem -> namespace -> name -> version), via size
 *   role    -> entity = a *thing* (filled circle)
 *              evidence = a *claim about* things (small hollow diamond)
 *
 * The role split is the load-bearing one: about a third of GUAC's node types are
 * relationships reified as nodes (IsDependency, HasSlsa, CertifyVuln, HasSbom...).
 * Drawing them small and hollow separates the connectors from the things being
 * connected.
 *
 * COLOR: per-type hues are carried over verbatim from the pre-redesign
 * `switch (nodeType)` in Graph.tsx -- see LEGACY note below.
 */

export type Family =
  | "package"
  | "source"
  | "artifact"
  | "vulnerability"
  | "supporting";

export type Role = "entity" | "evidence";

/** 1 = broadest (an ecosystem), 4 = most specific (a version, an artifact, a CVE). */
export type Tier = 1 | 2 | 3 | 4;

export type NodeStyle = {
  label: string;
  family: Family;
  role: Role;
  tier: Tier;
  /** Per-type hue, preserved from the original switch. See LEGACY_COLOR_DEFAULT. */
  color: string;
};

/**
 * Family hues, light/dark.
 *
 * NOTE: these are currently only used for legend family headers -- node bodies use
 * the per-type `color` above. They are kept because they are validated numbers and
 * are the palette to switch to if per-type hues are ever dropped.
 *
 * DO NOT ADD A SIXTH HUE WITHOUT RE-VALIDATING. Checked on the all-pairs list (a
 * force layout means any two nodes can end up adjacent) against the app's real
 * canvas surfaces, in both modes:
 *   light #e7e5e4: worst CVD dE 9.1, worst normal-vision dE 22.9 -> pass
 *   dark  #27272a: worst CVD dE 7.2, worst normal-vision dE 16.9 -> pass
 * The dark figure sits in the 6-8 "floor" band, legal ONLY because size, shape and
 * an always-visible legend act as secondary encoding -- those channels are
 * load-bearing, not decoration. A green "all clear" was tried and cut: it collided
 * with aqua for normal vision and with red under deuteranopia.
 *
 * `vulnerability` deliberately reuses the reserved status-"critical" step -- that
 * node genuinely means "bad state", so it earns the alarm color. It is
 * mode-invariant.
 */
export const FAMILY_COLORS: Record<Family, { light: string; dark: string }> = {
  package: { light: "#2a78d6", dark: "#3987e5" },
  source: { light: "#1baf7a", dark: "#199e70" },
  artifact: { light: "#eda100", dark: "#c98500" },
  vulnerability: { light: "#d03b3b", dark: "#d03b3b" },
  supporting: { light: "#6b7280", dark: "#9ca3af" },
};

export const FAMILY_LABELS: Record<Family, string> = {
  package: "Package",
  source: "Source",
  artifact: "Artifact & build",
  vulnerability: "Vulnerability",
  supporting: "Supporting",
};

/** Legend / grouping order, broadest subject first. */
export const FAMILY_ORDER: Family[] = [
  "package",
  "source",
  "artifact",
  "vulnerability",
  "supporting",
];

/**
 * LEGACY: the old switch ended in `default: ctx.fillStyle = "blue"`, so every type
 * it did not name rendered blue. Seven types fell through silently (HasSbom,
 * PkgEqual, HashEqual, CertifyBad, CertifyGood, CertifyVexStatement,
 * VulnerabilityMetadata) and are kept blue here to preserve existing appearance.
 *
 * PackageVersion also uses this: its old case set no fillStyle at all, so it
 * inherited whatever fill the previously-drawn node happened to leave on the
 * context. There is no "before" color to preserve, so it takes the app's own
 * default rather than introducing a new hue.
 */
export const LEGACY_COLOR_DEFAULT = "blue";

export const NODE_STYLES: Record<string, NodeStyle> = {
  // ---- package ----
  PackageType: {
    label: "Package type",
    family: "package",
    role: "entity",
    tier: 1,
    color: "teal",
  },
  PackageNamespace: {
    label: "Package namespace",
    family: "package",
    role: "entity",
    tier: 2,
    color: "DarkOrchid",
  },
  PackageName: {
    label: "Package name",
    family: "package",
    role: "entity",
    tier: 3,
    color: "#7D0541",
  },
  PackageVersion: {
    label: "Package version",
    family: "package",
    role: "entity",
    tier: 4,
    color: LEGACY_COLOR_DEFAULT,
  },
  IsDependency: {
    label: "Dependency",
    family: "package",
    role: "evidence",
    tier: 3,
    color: "hotpink",
  },
  HasSbom: {
    label: "SBOM",
    family: "package",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },
  PkgEqual: {
    label: "Package equality",
    family: "package",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },

  // ---- source ----
  SourceType: {
    label: "Source type",
    family: "source",
    role: "entity",
    tier: 1,
    color: "#997070",
  },
  SourceNamespace: {
    label: "Source namespace",
    family: "source",
    role: "entity",
    tier: 2,
    color: "#C48189",
  },
  SourceName: {
    label: "Source name",
    family: "source",
    role: "entity",
    tier: 3,
    color: "SandyBrown",
  },
  HasSourceAt: {
    label: "Source location",
    family: "source",
    role: "evidence",
    tier: 3,
    color: "#C4AEAD",
  },
  CertifyScorecard: {
    label: "Scorecard",
    family: "source",
    role: "evidence",
    tier: 3,
    color: "#7E354D",
  },

  // ---- artifact & build ----
  Artifact: {
    label: "Artifact",
    family: "artifact",
    role: "entity",
    tier: 4,
    color: "Coral",
  },
  Builder: {
    label: "Builder",
    family: "artifact",
    role: "entity",
    tier: 2,
    color: "RebeccaPurple",
  },
  IsOccurrence: {
    label: "Occurrence",
    family: "artifact",
    role: "evidence",
    tier: 3,
    color: "Goldenrod",
  },
  HasSlsa: {
    label: "SLSA attestation",
    family: "artifact",
    role: "evidence",
    tier: 3,
    color: "DarkTurquoise",
  },
  HashEqual: {
    label: "Hash equality",
    family: "artifact",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },

  // ---- vulnerability ----
  Vulnerability: {
    label: "Vulnerability",
    family: "vulnerability",
    role: "entity",
    tier: 3,
    color: "Brown",
  },
  VulnerabilityID: {
    label: "Vulnerability ID",
    family: "vulnerability",
    role: "entity",
    tier: 4,
    color: "darkorange",
  },
  CertifyVuln: {
    label: "Vulnerability certification",
    family: "vulnerability",
    role: "evidence",
    tier: 3,
    color: "tomato",
  },
  VulnEqual: {
    label: "Vulnerability equality",
    family: "vulnerability",
    role: "evidence",
    tier: 3,
    color: "DarkMagenta",
  },
  VulnerabilityMetadata: {
    label: "Vulnerability metadata",
    family: "vulnerability",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },
  CertifyVexStatement: {
    label: "VEX statement",
    family: "vulnerability",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },
  CertifyBad: {
    label: "Bad certification",
    family: "vulnerability",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },

  // ---- supporting ----
  License: {
    label: "License",
    family: "supporting",
    role: "entity",
    tier: 2,
    color: "DarkOliveGreen",
  },
  CertifyGood: {
    label: "Good certification",
    family: "supporting",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },
  HasMetadata: {
    label: "Metadata",
    family: "supporting",
    role: "evidence",
    tier: 3,
    color: LEGACY_COLOR_DEFAULT,
  },
  CertifyLegal: {
    label: "Legal certification",
    family: "supporting",
    role: "evidence",
    tier: 3,
    color: "DarkOliveGreen",
  },
};

/** Anything unmapped reads as a generic supporting entity rather than vanishing. */
const FALLBACK_STYLE: NodeStyle = {
  label: "Unknown",
  family: "supporting",
  role: "entity",
  tier: 2,
  color: LEGACY_COLOR_DEFAULT,
};

export const styleForType = (type: string | undefined): NodeStyle =>
  (type && NODE_STYLES[type]) || FALLBACK_STYLE;

export const familyColor = (family: Family, isDark: boolean): string =>
  isDark ? FAMILY_COLORS[family].dark : FAMILY_COLORS[family].light;

const TIER_RADII: Record<Tier, number> = { 1: 4, 2: 5, 3: 6.25, 4: 7.5 };

/** Evidence is a fixed small size -- it is a connector, not a subject. */
export const radiusForStyle = (style: NodeStyle): number =>
  style.role === "evidence" ? 4 : TIER_RADII[style.tier];
