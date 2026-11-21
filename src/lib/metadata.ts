import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

/**
 * Open Graph defaults for every page. A page that sets its own `openGraph`
 * replaces this object completely (Next.js doesn't merge it), so pages go
 * through `pageMetadata()` below instead of writing their own.
 */
export const defaultOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: siteConfig.name,
  title: defaultTitle,
  description: siteConfig.description,
  images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: defaultTitle,
      type: "image/png",
    },
  ],
} satisfies NonNullable<Metadata["openGraph"]>;

/**
 * Title, description, canonical URL and Open Graph for one page, all pointing
 * at the page's own `path` (e.g. "/about"). Leave `title` out for the homepage,
 * which uses the site-wide default title.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...defaultOpenGraph,
      title: title ? `${title} | ${siteConfig.name}` : defaultTitle,
      description,
      url: path,
    },
  };
}
