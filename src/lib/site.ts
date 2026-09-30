/**
 * Central site configuration for Obliq.
 * All site-wide metadata, URLs, and navigation live here.
 * Update this file to change the canonical domain, branding,
 * social links, and navigation items across the entire site.
 */

export const siteConfig = {
  name: "Obliq",
  tagline: "Compliance work breaks before filing.",
  description:
    "CA firms manage dozens of recurring deadlines across multiple clients. The challenge is rarely filing itself — it's delayed documents, fragmented follow-ups, and poor visibility before deadlines become risky.",
  url: "https://obliq.in",
  ogImage: "https://obliq.in/og.png",

  links: {
    github: "https://github.com/OBLIQ-in",
    twitter: "https://twitter.com/obliq_in",
    discord: "https://discord.gg/XPC4ETU7kp",
  },

  email: {
    support: "support@obliq.in",
    press: "press@obliq.in",
  },

  nav: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],

  footerNav: {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    community: [
      { label: "GitHub", href: "https://github.com/OBLIQ-in" },
      { label: "Discord", href: "https://discord.gg/XPC4ETU7kp" },
      { label: "Twitter", href: "https://twitter.com/obliq_in" },
      { label: "Contributing", href: "/contributing" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
