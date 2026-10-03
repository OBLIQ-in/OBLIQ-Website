import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionPlaceholder } from "@/components/sections/placeholder";
import type { PlaceholderSection } from "@/types";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the powerful features that make Obliq the platform of choice for open source teams.",
  alternates: { canonical: "/features" },
};

const featurePlaceholder: PlaceholderSection = {
  title:       "Features Page — Full Content",
  description: "This page needs a full features deep-dive with expanded descriptions, screenshots or demos, and a comparison table.",
  issueNumber: 16,
  issueUrl:    "https://github.com/OBLIQ-in/OBLIQ-Website/issues/16",
};

export default function FeaturesPage() {
  return (
    <div className="section pt-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Features"
          heading="Everything you need."
          subheading="Obliq provides a complete toolkit for modern open source development."

        />
        <div className="mt-12">
          <SectionPlaceholder section={featurePlaceholder} headingLevel="h2" />
        </div>
      </Container>
    </div>
  );
}
