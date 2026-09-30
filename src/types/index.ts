/**
 * Global TypeScript types for the Obliq website.
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

/** Metadata each post exports from its .mdx file as `export const frontmatter`. */
export interface BlogFrontmatter {
  title: string;
  description: string;
  category: string;
  author: Author;
  /** ISO date, e.g. "2026-09-29" */
  date: string;
  /** Placeholder cover art tone until real covers come from brand-assets */
  cover?: "sky" | "peach" | "cream";
  /** Pin this post as the full-width feature on /blog (newest featured post wins) */
  featured?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  /** Estimated minutes to read */
  readingTime: number;
}

export interface Author {
  name: string;
  role?: string;
  avatar?: string;
  /** Profile link shown on the author card (GitHub, LinkedIn, …) */
  url?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

/** Used by the placeholder system — each placeholder maps to a GitHub issue. */
export interface PlaceholderSection {
  title: string;
  description: string;
  issueNumber: number;
  issueUrl: string;
}
