"use client";

import Script from "next/script";
import { useEffect } from "react";
import { analyticsDomain, analyticsScriptSrc, trackEvent } from "@/lib/analytics";

/**
 * Loads Plausible and reports CTA clicks. Renders nothing unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 *
 * CTAs opt in with a `data-analytics-cta="<location>"` attribute, so server
 * components (navbar, hero, pricing cards) can be tracked without becoming
 * client components themselves.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsDomain) return;
    function onClick(e: MouseEvent) {
      const cta = (e.target as Element | null)?.closest<HTMLElement>("[data-analytics-cta]");
      if (cta) trackEvent("CTA Click", { location: cta.dataset.analyticsCta ?? "unknown" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!analyticsDomain) return null;

  // No inline init script: trackEvent() installs Plausible's queue stub itself,
  // so events fired before this loads are still delivered (see lib/analytics.ts).
  return <Script src={analyticsScriptSrc} data-domain={analyticsDomain} strategy="afterInteractive" />;
}
