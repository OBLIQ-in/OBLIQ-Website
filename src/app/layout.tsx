import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/open-runde/400.css";
import "@fontsource/open-runde/500.css";
import "@fontsource/open-runde/600.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import { defaultOpenGraph } from "@/lib/metadata";

// Fonts are self-hosted via Fontsource: Inter (variable, 100–900) for body and
// headings, Open Runde for rounded UI text. No third-party font requests, and
// no next/font — it had Turbopack module resolution issues in Next.js 15.5.x.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  keywords: [
    "Obliq",
    "open source",
    "developer tools",
    "platform",
    "MIT license",
    "web development",
    "open web",
  ],

  authors: [{ name: "Obliq", url: siteConfig.url }],
  creator: "Obliq",
  publisher: "Obliq",

  openGraph: defaultOpenGraph,

  twitter: {
    card:        "summary_large_image",
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images:      [siteConfig.ogImage],
    creator:     "@obliq_in",
    site:        "@obliq_in",
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // Icons come from Next.js file conventions: app/favicon.ico, app/icon.svg
  // and app/apple-icon.tsx — no manual <link> tags needed.

  // No site-wide canonical or og:url here: every page sets its own, otherwise
  // pages without one would tell search engines they are the homepage.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the theme script adds the "dark" class before React hydrates
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
