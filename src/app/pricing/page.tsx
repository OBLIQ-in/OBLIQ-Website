import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionPlaceholder } from "@/components/sections/placeholder";
import type { PlaceholderSection } from "@/types";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Obliq. Free forever for open source.",
};

const pricingPlaceholder: PlaceholderSection = {
  title:       "Pricing Tiers",
  description: "Free, Pro, and Enterprise tiers with a feature comparison table. Data should come from src/lib/site.ts.",
  issueNumber: 33,
  issueUrl:    "https://github.com/OBLIQ-in/OBLIQ-Website/issues/33",
};

export default function PricingPage() {
  return (
    <div className="section pt-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Pricing"
          heading="Simple, honest pricing."
          subheading="Start for free. Upgrade when you need more. Always open source."

        />
        <div className="mt-12">
          <SectionPlaceholder section={pricingPlaceholder} headingLevel="h2" />
        </div>
      </Container>
    </div>
  );
}
