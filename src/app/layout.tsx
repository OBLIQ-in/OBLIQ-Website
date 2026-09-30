import type { Metadata } from "next";
import "@fontsource/open-runde/400.css";
import "@fontsource/open-runde/500.css";
import "@fontsource/open-runde/600.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site";

// Fonts are loaded via CSS @import in globals.css (Inter + Plus Jakarta Sans)
// This avoids Turbopack font module resolution issues in Next.js 15.5.x

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

  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url:    siteConfig.ogImage,
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} — ${siteConfig.tagline}`,
        type:   "image/png",
      },
    ],
  },

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

  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
