import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SpotlightTestimonial } from "@/components/sections/SpotlightTestimonial";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { Pricing } from "@/components/sections/pricing";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FeaturesPersonalize } from "@/components/sections/FeaturesPersonalize";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionPlaceholder, placeholderSections } from "@/components/sections/placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { DeviceShowcase } from "@/components/sections/DeviceShowcase";
import { siteConfig } from "@/lib/site";
import { Community } from "@/components/sections/Community";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description: siteConfig.description,
});

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

      <DeviceShowcase />

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
              <a
                href={`${siteConfig.links.repo}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[var(--charcoal)] transition-colors"
              >
                Start with the Contributing Guide
              </a>
            </p>
          </div>
        </div>
      </section>

      <FeaturesSection />

      <FeaturesPersonalize />

      <SpotlightTestimonial />

      <TestimonialMarquee />

      <Pricing />

      <Community />

      <CTABanner />
    </>
  );
}