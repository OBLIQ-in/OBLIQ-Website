/**
 * Open roles listed in the "Position Applying For" select on /contact-us.
 * Same four roles as obliqq.framer.ai/contact-us — change them here only.
 */
export const positions = [
  "Community & Support Lead",
  "Social Media & Content Lead",
  "GitHub & Product/UI Lead",
  "CA Outreach & Partnerships Lead",
] as const;

export type Position = (typeof positions)[number];
