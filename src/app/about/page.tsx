import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { GitFork } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Obliq — built for CA firms and compliance teams.",
};

export default function AboutPage() {
  return (
    <div className="section pt-36" style={{ background: "var(--cream)" }}>
      <div className="container-obliq max-w-3xl">
        <SectionHeading
          as="h1"
          eyebrow="About"
          heading="Built in the open."
          subheading="Obliq is a community-driven open source project. We believe the best tools are built transparently, by people who use them every day."
          align="left"
        />
        <Reveal index={1} className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-[var(--body-text)]">
          <p>
            Obliq was born from a simple frustration: compliance tools for CA firms are closed,
            expensive, and slow to ship the features their users actually need.
          </p>
          <p>
            Everything we build is open source under the MIT license. Our roadmap is public,
            our issues are open, and every decision is made in the community.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-10 flex flex-wrap gap-3">
          <Button href={siteConfig.links.github} size="lg" variant="primary">
            <GitFork className="h-5 w-5" />
            View on GitHub
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Get in touch
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
