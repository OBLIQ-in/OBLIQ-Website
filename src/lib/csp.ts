/**
 * Content-Security-Policy for every route, applied in next.config.ts.
 *
 * Imported by next.config.ts, so relative imports only (no "@/" aliases).
 */
import { analyticsOrigin } from "./analytics";

const isDev = process.env.NODE_ENV === "development";
// Vercel preview deployments inject the comments toolbar from vercel.live
const isVercelPreview = process.env.VERCEL_ENV === "preview";

/** Plausible (only when analytics is enabled) — script load + event posts. */
const analytics = analyticsOrigin ? [analyticsOrigin] : [];
const vercelLive = isVercelPreview ? ["https://vercel.live"] : [];

const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  // The App Router streams inline bootstrap scripts into statically rendered
  // pages; allowing them by nonce would force every page to render
  // dynamically, so inline stays allowed but script *origins* are locked down.
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    ...analytics,
    ...vercelLive,
  ],
  // Inline style attributes are used throughout; Inter comes from Google Fonts
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", ...vercelLive],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com", ...(isVercelPreview ? ["https://vercel.live", "https://assets.vercel.com"] : [])],
  // Brand assets (lib/assets.ts) come from GitHub raw or jsDelivr
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://raw.githubusercontent.com",
    "https://cdn.jsdelivr.net",
    ...(isVercelPreview ? ["https://vercel.live", "https://vercel.com"] : []),
  ],
  // Add the form service's origin here when the contact form is wired up (#55)
  "connect-src": [
    "'self'",
    ...analytics,
    ...(isDev ? ["ws:"] : []),
    ...(isVercelPreview ? ["https://vercel.live", "wss://ws-us3.pusher.com"] : []),
  ],
  "frame-src": isVercelPreview ? ["https://vercel.live"] : ["'none'"],
  "frame-ancestors": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
};

export const contentSecurityPolicy = Object.entries(directives)
  .map(([name, values]) => `${name} ${values.join(" ")}`)
  .join("; ");
