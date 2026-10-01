"use client";

import { Shortcut } from "@/hooks/useShortcuts";
import {
  FAMILY_LABELS,
  FAMILY_ORDER,
  familyColor,
} from "@/components/graph/nodeStyles";
import { useContext } from "react";
import GuacVizThemeContext from "@/app/themeContext";

/**
 * What a first-time reader needs before the graph means anything: what the shapes
 * encode, what the families are, and how to drive it. The shortcut rows come from
 * the same array that binds the keys, so they cannot drift apart.
 */
export default function HelpPanel({
  shortcuts,
  onClose,
}: {
  shortcuts: Shortcut[];
  onClose: () => void;
}) {
  const { isDarkTheme } = useContext(GuacVizThemeContext);

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Help"
    >
      <div
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-stone-100 dark:bg-stone-800 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-semibold">Reading this graph</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-0.5 text-sm opacity-70 hover:opacity-100"
            aria-label="Close help"
          >
            Esc ✕
          </button>
        </div>

        <p className="mb-4 text-sm leading-relaxed opacity-80">
          Every node is one record from GUAC. Pick a package with the selectors
          at the top, then click any node to walk to its neighbours — the trail
          you take shows up in the breadcrumb.
        </p>

        <section className="mb-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
            Shapes
          </h3>
          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-x-3">
              <dt className="w-32 shrink-0 opacity-70">Filled dot</dt>
              <dd>
                A <strong>thing</strong> — a package, a source repo, an
                artifact, a vulnerability.
              </dd>
            </div>
            <div className="flex gap-x-3">
              <dt className="w-32 shrink-0 opacity-70">Hollow diamond</dt>
              <dd>
                A <strong>claim about</strong> those things — an SBOM, a
                dependency, a SLSA attestation, a scan result.
              </dd>
            </div>
            <div className="flex gap-x-3">
              <dt className="w-32 shrink-0 opacity-70">Dot size</dt>
              <dd>
                How specific it is: ecosystem → namespace → name → version.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
            Colours
          </h3>
          <p className="mb-2 text-xs opacity-70">
            Each node type keeps its own hue; the swatch below is the family it
            belongs to. The legend beside the graph names every type on screen
            and counts it.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
            {FAMILY_ORDER.map((family) => (
              <li key={family} className="flex items-center gap-x-2">
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: familyColor(family, isDarkTheme) }}
                  aria-hidden="true"
                />
                {FAMILY_LABELS[family]}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
            Keyboard
          </h3>
          <ul className="space-y-1 text-sm">
            {shortcuts.map((s) => (
              <li key={s.keys} className="flex items-center gap-x-3">
                <kbd className="min-w-[3.5rem] rounded border border-black/20 dark:border-white/25 px-1.5 py-0.5 text-center text-xs font-mono">
                  {s.keys}
                </kbd>
                <span className="opacity-80">{s.label}</span>
              </li>
            ))}
            <li className="flex items-center gap-x-3">
              <kbd className="min-w-[3.5rem] rounded border border-black/20 dark:border-white/25 px-1.5 py-0.5 text-center text-xs font-mono">
                right-click
              </kbd>
              <span className="opacity-80">Show a node&apos;s raw record</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
