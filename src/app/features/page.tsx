import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FinancialManagement } from "@/components/sections/FinancialManagement";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionPlaceholder, openIssue } from "@/components/sections/placeholder";

export const metadata: Metadata = pageMetadata({
  path: "/features",
  title: "Features",
  description: "Explore how Obliq helps you track invoices, expenses, and earnings.",
});

// Project management is still on the contributor board.
const projectManagement = openIssue(
  30,
  "Project management",
  "“Keep every project moving forward”: copy, a product image and feature chips."
);

export default function FeaturesPage() {
  return (
    <>
      <div className="pt-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Features"
            heading="Everything you need."
            subheading="Keep track of invoices, expenses, and earnings with Obliq."
          />
          <div className="mt-12">
            <SectionPlaceholder section={projectManagement} headingLevel="h2" />
          </div>
        </Container>
      </div>
      <FinancialManagement />
    </>
  );
}
