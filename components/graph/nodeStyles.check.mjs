/**
 * Self-check for the node visual language. Plain node, no framework:
 *
 *   node components/graph/nodeStyles.check.mjs
 *
 * Fails if:
 *   1. a node type emitted by utils/ggraph.tsx has no style (renders as a mystery blob),
 *   2. a style exists for a type nothing emits (dead entry),
 *   3. the family-hue count drifts from the validated 5,
 *   4. two keyboard shortcuts claim the same key (the second becomes unreachable,
 *      while the help panel keeps advertising it),
 *   5. a member of the generated `Node` union has no case in ParseNode and is not
 *      on the known-gap list below.
 *
 * nodeStyles.ts is TypeScript, so it is scanned as text rather than imported --
 * that keeps this runnable with bare `node` and no loader. The sanity floors below
 * make a broken regex fail loudly instead of passing vacuously.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const read = (p) => readFileSync(resolve(repoRoot, p), "utf8");

/** Everything utils/ggraph.tsx actually puts on a node. */
const emittedTypes = new Set(
  [...read("utils/ggraph.tsx").matchAll(/\btype:\s*"([A-Za-z]+)"/g)].map(
    (m) => m[1]
  )
);

const styleSrc = read("components/graph/nodeStyles.ts");

/** Slice one `NAME...= {` .. `};` block so sibling objects don't leak in. */
const objectBody = (source, declaration) => {
  const start = source.indexOf(declaration);
  assert.notEqual(start, -1, `could not find "${declaration}" in nodeStyles.ts`);
  const from = start + declaration.length;
  const end = source.indexOf("\n};", from);
  assert.notEqual(end, -1, `could not find end of "${declaration}"`);
  return source.slice(from, end);
};

const topLevelKeys = (body) =>
  new Set([...body.matchAll(/^ {2}([A-Za-z]+): \{/gm)].map((m) => m[1]));

const styledTypes = topLevelKeys(
  objectBody(styleSrc, "NODE_STYLES: Record<string, NodeStyle> = {")
);
const families = topLevelKeys(
  objectBody(
    styleSrc,
    "FAMILY_COLORS: Record<Family, { light: string; dark: string }> = {"
  )
);

// Sanity floors: if a regex above silently matched nothing, stop here.
assert.ok(
  emittedTypes.size >= 20,
  `only found ${emittedTypes.size} emitted types in utils/ggraph.tsx -- scan is broken`
);
assert.ok(
  styledTypes.size >= 20,
  `only found ${styledTypes.size} styled types in nodeStyles.ts -- scan is broken`
);

const missing = [...emittedTypes].filter((t) => !styledTypes.has(t)).sort();
const dead = [...styledTypes].filter((t) => !emittedTypes.has(t)).sort();

assert.deepEqual(
  missing,
  [],
  `node types emitted by utils/ggraph.tsx with no style (would render as a mystery blob): ${missing.join(", ")}`
);
assert.deepEqual(
  dead,
  [],
  `styles for types nothing emits (dead entries -- delete them): ${dead.join(", ")}`
);
assert.equal(
  families.size,
  5,
  `family-hue count is ${families.size}, expected the validated 5. Adding or removing a hue requires re-running the all-pairs contrast check in both modes -- see the note above FAMILY_COLORS.`
);

console.log(
  `ok  ${styledTypes.size} node types styled, ${families.size} families, no dead entries`
);

/**
 * Shortcuts: one array in app/page.tsx both binds the keys and renders the help
 * panel, so the two cannot disagree about *what* exists. They can still disagree
 * about what fires: `useShortcuts` resolves a key with `.find()`, so a duplicate
 * silently shadows the later entry.
 */
const pageSrc = read("app/page.tsx");
const matches = [...pageSrc.matchAll(/match: \[([^\]]*)\]/g)].map((m) =>
  [...m[1].matchAll(/"([^"]+)"/g)].map((k) => k[1])
);

assert.ok(
  matches.length >= 8,
  `only found ${matches.length} shortcuts in app/page.tsx -- scan is broken`
);

const seen = new Map();
const collisions = [];
matches.flat().forEach((key) => {
  if (seen.has(key)) collisions.push(key);
  seen.set(key, true);
});

assert.deepEqual(
  collisions,
  [],
  `keys bound by more than one shortcut (only the first will ever fire): ${collisions.join(", ")}`
);

console.log(
  `ok  ${matches.length} shortcuts over ${seen.size} keys, no collisions`
);

/**
 * ParseNode's switch vs. the generated `Node` union.
 *
 * A member with no case returns undefined. `parseAndFilterGraph` now tolerates
 * that, so the failure is silent: the neighbour simply never appears. The schema
 * is code-generated, so a newly added union member would reintroduce the gap with
 * nothing to notice it -- hence this check.
 *
 * Compared case-insensitively: the generated TS names differ in capitalisation
 * from the GraphQL __typename the switch matches on (HasSbom/"HasSBOM",
 * HasSlsa/"HasSLSA", CertifyVexStatement/"CertifyVEXStatement").
 */
const KNOWN_UNPARSED = ["PointOfContact", "VulnerabilityMetadata"];

const schemaSrc = read("gql/__generated__/graphql.ts");
const unionMatch = schemaSrc.match(/export type Node = ([^;]+);/);
assert.ok(unionMatch, "could not find the `Node` union in the generated schema");

const unionMembers = unionMatch[1].split("|").map((m) => m.trim());
assert.ok(
  unionMembers.length >= 20,
  `only found ${unionMembers.length} Node union members -- scan is broken`
);

const parsedCases = new Set(
  [...read("utils/ggraph.tsx").matchAll(/case "([A-Za-z]+)":/g)].map((m) =>
    m[1].toLowerCase()
  )
);
assert.ok(
  parsedCases.size >= 15,
  `only found ${parsedCases.size} cases in ParseNode -- scan is broken`
);

const known = new Set(KNOWN_UNPARSED.map((n) => n.toLowerCase()));
const unexpected = unionMembers.filter(
  (m) => !parsedCases.has(m.toLowerCase()) && !known.has(m.toLowerCase())
);
const fixed = KNOWN_UNPARSED.filter((m) => parsedCases.has(m.toLowerCase()));

assert.deepEqual(
  unexpected,
  [],
  `Node union members with no case in ParseNode (they will silently never render): ${unexpected.join(", ")}`
);
assert.deepEqual(
  fixed,
  [],
  `these now have a parser -- drop them from KNOWN_UNPARSED: ${fixed.join(", ")}`
);

console.log(
  `ok  ${unionMembers.length} Node types, ${KNOWN_UNPARSED.length} known-unparsed, no new gaps`
);
