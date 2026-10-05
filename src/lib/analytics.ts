/**
 * Privacy-first analytics (Plausible). Everything here is a no-op unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set at build time, so forks and
 * self-hosted copies ship without any tracking.
 *
 * No path aliases in this file: next.config.ts imports it (via lib/csp.ts).
 */

/** One hostname label: letters, digits and inner hyphens, 1–63 chars. */
const LABEL = "[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?";
/** A dotted hostname with an alphabetic TLD, e.g. obliq.in or blog.obliq.in. */
const DOMAIN_RE = new RegExp(`^(?=.{1,253}$)(?:${LABEL}\\.)+[a-z]{2,63}$`, "i");

function warn(message: string) {
  // Only at build/server time; don't log configuration noise in visitors' consoles
  if (typeof window === "undefined") console.warn(`[analytics] ${message} Analytics disabled.`);
}

/**
 * Validates NEXT_PUBLIC_PLAUSIBLE_DOMAIN. Plausible accepts a comma-separated
 * list for roll-up reporting, so each entry is checked. Anything that isn't a
 * bare hostname (protocol, path, port, spaces) disables analytics.
 */
function parseDomain(raw: string | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  const domains = value.split(",").map((d) => d.trim().toLowerCase());
  if (domains.every((d) => DOMAIN_RE.test(d))) return domains.join(",");
  warn(`NEXT_PUBLIC_PLAUSIBLE_DOMAIN="${value}" is not a valid domain (expected e.g. "obliq.in").`);
  return undefined;
}

/** Validates NEXT_PUBLIC_PLAUSIBLE_SRC: must be an https:// URL. */
function parseScriptSrc(raw: string | undefined): URL | undefined {
  const value = raw?.trim() || "https://plausible.io/js/script.js";
  try {
    const url = new URL(value);
    if (url.protocol === "https:") return url;
  } catch {
    // fall through to the warning
  }
  warn(`NEXT_PUBLIC_PLAUSIBLE_SRC="${value}" must be an https:// URL.`);
  return undefined;
}

const domain = parseDomain(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
const scriptUrl = domain ? parseScriptSrc(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC) : undefined;

/** The Plausible site domain, or undefined when analytics is off. */
export const analyticsDomain = scriptUrl ? domain : undefined;

/** Plausible Cloud by default; point at a self-hosted Plausible CE instead. */
export const analyticsScriptSrc = scriptUrl?.href;

/**
 * Origin the script loads from and posts events to (/api/event). Used to
 * allow-list Plausible in the Content-Security-Policy; undefined when off.
 */
export const analyticsOrigin = scriptUrl?.origin;

export type AnalyticsEvent = "CTA Click" | "Pricing Toggle" | "Form Submit";

type Plausible = ((
  event: AnalyticsEvent,
  options?: { props?: Record<string, string> }
) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

/**
 * Plausible's standard queue stub, installed from JS rather than an inline
 * <script> so the CSP needs no inline allowance for analytics. Events sent
 * before the script loads are queued and replayed once it does.
 */
function plausible(): Plausible {
  window.plausible ??= Object.assign(
    (...args: unknown[]) => {
      (window.plausible!.q ??= []).push(args);
    },
    { q: [] as unknown[][] }
  );
  return window.plausible;
}

/** Sends a custom event. Safe to call anywhere; does nothing when disabled. */
export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>) {
  if (!analyticsDomain || typeof window === "undefined") return;
  plausible()(event, props ? { props } : undefined);
}
