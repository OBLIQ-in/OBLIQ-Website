import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { contentSecurityPolicy } from "./src/lib/csp";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          // Don't let browsers guess a different content type than the one served
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send only the origin to other sites, and nothing when downgrading to http
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site uses none of these; deny them to the page and any embed
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Clickjacking is covered by the CSP's frame-ancestors 'none'; HSTS is left to the host
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/OBLIQ-in/brand-assets/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/OBLIQ-in/brand-assets@**",
      },
    ],
  },
};

// No remark/rehype plugins: posts declare metadata with `export const frontmatter`,
// which keeps the config serializable for Turbopack.
const withMDX = createMDX({});

export default withMDX(nextConfig);
