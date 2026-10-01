import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Integrations } from "@/components/sections/Integrations";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionPlaceholder, placeholderSections } from "@/components/sections/placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteConfig.ogImage,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.twitter,
    siteConfig.links.discord,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email.support,
    contactType: "customer support",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Hero />

      {/* Contributor to-do board */}
      <section
        id="contribute"
        aria-label="Open contributor sections"
        className="section"
        style={{ background: "var(--cream)" }}
      >
        <div className="container-obliq">
          <div className="mb-10 flex flex-col items-center text-center gap-3">
            <SectionHeading
              eyebrow="Open for contributions"
              heading="This page is a live to-do board."
              subheading="Each section below maps to an open GitHub issue. Pick one, read it, and open a PR."
            />
          </div>

          <div className="flex flex-col gap-4">
            {placeholderSections.map((section, i) => (
              <SectionPlaceholder key={section.issueNumber} section={section} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--muted)]">
              New to open source?{" "}
              <a href="/contributing" className="underline underline-offset-4 hover:text-[var(--charcoal)] transition-colors">
                Start with the Contributing Guide
              </a>
            </p>
          </div>
        </div>
      </section>

      <Integrations />

      <Pricing />

      <CTABanner />
    </>
  );
}
