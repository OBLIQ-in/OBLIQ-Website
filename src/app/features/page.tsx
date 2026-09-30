import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionPlaceholder, openIssue } from "@/components/sections/placeholder";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the powerful features that make Obliq the platform of choice for open source teams.",
};

// The feature sections being built for the homepage; this page will reuse them
const featurePlaceholders = [
  openIssue(32, "Features / personalization", "The “Built for freelancers, powered by simplicity” block with a large customization screenshot."),
  openIssue(34, "Feature trio", "Three equal cards: collaborate in realtime, speaks your language, view things your way."),
];

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
        <div className="mt-12 flex flex-col gap-4">
          {featurePlaceholders.map((section, i) => (
            <SectionPlaceholder key={section.issueNumber} section={section} index={i} headingLevel="h2" />
          ))}
        </div>
      </Container>
    </div>
  );
}
