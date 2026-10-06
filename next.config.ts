import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { contentSecurityPolicy } from "./src/lib/csp";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy }],
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
