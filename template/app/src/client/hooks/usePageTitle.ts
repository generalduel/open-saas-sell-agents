import { useEffect } from "react";

const SITE_TITLE = "AI Workforce | Managed AI agents for your business";

/** Sets the browser tab title for a page; restores the site title on unmount. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | AI Workforce` : SITE_TITLE;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [title]);
}
