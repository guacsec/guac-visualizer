"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Measures the element the graph actually lives in.
 *
 * The previous version guessed from `window.innerWidth * 0.5`, which was only
 * ever right for one layout -- collapse the legend or the details panel and the
 * canvas kept the old width, leaving a dead gutter beside a cramped graph.
 */
export function useDimensions<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}
