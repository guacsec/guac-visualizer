"use client";

import { useEffect } from "react";

export type Shortcut = {
  /** How the binding is written in the help panel. */
  keys: string;
  /** Lowercased `event.key` values that trigger it. */
  match: string[];
  label: string;
  run: () => void;
};

/**
 * Binds a list of shortcuts to the window.
 *
 * The same list feeds the help panel, so a binding can never disagree with what
 * the UI claims it is -- that drift is the usual reason shortcut docs go stale.
 */
export function useShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const isTyping = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      // react-select mounts a real <input>, so plain letter keys must not steal it.
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target)) return;

      const key = event.key.toLowerCase();
      const hit = shortcuts.find((s) => s.match.includes(key));
      if (!hit) return;

      event.preventDefault();
      hit.run();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts]);
}
