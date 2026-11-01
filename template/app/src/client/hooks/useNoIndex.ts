import { useEffect } from "react";

/**
 * Adds <meta name="robots" content="noindex, follow"> while the page is shown.
 * Used for pages that stay reachable for existing links but should drop out of
 * search results.
 */
export function useNoIndex(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, [enabled]);
}
