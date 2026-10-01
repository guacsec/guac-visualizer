"use client";

import { useContext } from "react";
import GuacVizThemeContext from "@/app/themeContext";
import {
  Family,
  FAMILY_LABELS,
  FAMILY_ORDER,
  familyColor,
  NodeStyle,
  radiusForStyle,
  styleForType,
} from "@/components/graph/nodeStyles";
import { GraphDataWithMetadata } from "@/components/graph/types";

const SWATCH_BOX = 18;
/** Matches Graph.tsx's canvas fill, so evidence swatches read as hollow here too. */
const CANVAS_BG = "#e7e5e4";

/** Mirrors the canvas exactly: filled dot for an entity, hollow diamond for evidence. */
const Swatch = ({ style, isDark }: { style: NodeStyle; isDark: boolean }) => {
  const size = radiusForStyle(style) * 2;

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: SWATCH_BOX, height: SWATCH_BOX }}
      aria-hidden="true"
    >
      <span
        style={{
          width: size,
          height: size,
          backgroundColor: style.role === "evidence" ? CANVAS_BG : style.color,
          border:
            style.role === "evidence"
              ? `1.75px solid ${style.color}`
              : `1px solid ${isDark ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.35)"}`,
          borderRadius: style.role === "evidence" ? 0 : "50%",
          transform: style.role === "evidence" ? "rotate(45deg)" : undefined,
        }}
      />
    </span>
  );
};

type Row = { type: string; style: NodeStyle; count: number };

/** Entities before evidence, then broadest tier first -- the reading order of the graph. */
const rowOrder = (a: Row, b: Row) => {
  if (a.style.role !== b.style.role) {
    return a.style.role === "entity" ? -1 : 1;
  }
  if (a.style.tier !== b.style.tier) {
    return a.style.tier - b.style.tier;
  }
  return a.style.label.localeCompare(b.style.label);
};

export default function GraphLegend({
  graphData,
  focusTypes,
  onToggleType,
  onClearFocus,
}: {
  graphData: GraphDataWithMetadata;
  focusTypes: Set<string> | null;
  onToggleType: (type: string) => void;
  onClearFocus: () => void;
}) {
  const { isDarkTheme } = useContext(GuacVizThemeContext);

  const counts = new Map<string, number>();
  graphData.nodes.forEach((node) => {
    counts.set(node.type, (counts.get(node.type) ?? 0) + 1);
  });

  if (counts.size === 0) {
    return null;
  }

  const byFamily = new Map<Family, Row[]>();
  counts.forEach((count, type) => {
    const style = styleForType(type);
    const rows = byFamily.get(style.family) ?? [];
    rows.push({ type, style, count });
    byFamily.set(style.family, rows);
  });

  return (
    <div className="flex flex-col text-sm">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-semibold uppercase tracking-wide text-xs opacity-70">
          Legend
        </h2>
        {focusTypes && (
          <button
            onClick={onClearFocus}
            className="text-xs underline opacity-70 hover:opacity-100"
          >
            clear filter
          </button>
        )}
      </div>
      <p className="pb-3 text-xs opacity-60 leading-snug">
        Dots are things, diamonds are claims about them. Bigger dot = more
        specific. Click a row to isolate it.
      </p>

      <div className="flex flex-col gap-y-3">
        {FAMILY_ORDER.filter((family) => byFamily.has(family)).map((family) => {
          const rows = (byFamily.get(family) ?? []).sort(rowOrder);
          const familyCount = rows.reduce((sum, row) => sum + row.count, 0);

          return (
            <div key={family}>
              <div className="flex items-center gap-x-2 mb-1">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: familyColor(family, isDarkTheme) }}
                  aria-hidden="true"
                />
                <span className="font-semibold uppercase tracking-wide text-xs">
                  {FAMILY_LABELS[family]}
                </span>
                <span className="opacity-60 text-xs">{familyCount}</span>
              </div>

              <ul className="flex flex-col">
                {rows.map((row) => {
                  const active = !focusTypes || focusTypes.has(row.type);
                  return (
                    <li key={row.type}>
                      <button
                        onClick={() => onToggleType(row.type)}
                        aria-pressed={focusTypes ? focusTypes.has(row.type) : false}
                        title={`${row.style.label} — click to isolate`}
                        className={`flex w-full items-center gap-x-2 rounded px-1 py-0.5 text-left hover:bg-black/5 dark:hover:bg-white/10 ${
                          active ? "" : "opacity-35"
                        }`}
                      >
                        <Swatch style={row.style} isDark={isDarkTheme} />
                        <span className="grow text-xs">{row.style.label}</span>
                        <span className="opacity-60 text-xs tabular-nums">
                          {row.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
