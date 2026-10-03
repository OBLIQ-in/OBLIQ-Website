import Link from "next/link";
import { GitBranch, ExternalLink, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import type { PlaceholderSection } from "@/types";

interface SectionPlaceholderProps {
  section: PlaceholderSection;
  index?: number;
  /** Heading level for the title — "h2" when the placeholder sits directly under the page h1 */
  headingLevel?: "h2" | "h3";
}

export function SectionPlaceholder({ section, index = 0, headingLevel: Heading = "h3" }: SectionPlaceholderProps) {
  return (
    <Reveal
      index={index}
      className={cn(
        "placeholder-section w-full px-6 py-8 sm:px-8 sm:py-10",
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
      )}
      aria-label={`Placeholder: ${section.title}`}
    >
      <div className="flex items-start gap-4">
        <div
          className="mt-0.5 h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--cream-card)", border: "1px solid rgba(0,0,0,0.08)" }}
          aria-hidden="true"
        >
          <Plus className="h-4 w-4 text-[var(--charcoal)] opacity-40" />
        </div>

        <div className="flex flex-col gap-1">
          <Heading className="font-semibold text-base text-[var(--charcoal)]">{section.title}</Heading>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md">{section.description}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <GitBranch className="h-3 w-3 text-[var(--muted)]" aria-hidden="true" />
            <span className="text-xs text-[var(--muted)] font-mono">#{section.issueNumber}</span>
          </div>
        </div>
      </div>

      <Link
        href={section.issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contribute — issue #${section.issueNumber}`}
        className={cn(
          "flex-shrink-0 inline-flex items-center gap-2 rounded-full",
          "min-h-11 px-4 py-2 text-sm font-medium",
          "border border-[rgba(0,0,0,0.12)] text-[var(--body-text)]",
          "hover:text-[var(--charcoal)] hover:border-[rgba(0,0,0,0.25)] hover:bg-[var(--cream-2)]",
          "transition-all duration-200"
        )}
      >
        Contribute
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </Reveal>
  );
}

/**
 * IMPORTANT: Issue numbers #16, #27, and #32 are referenced in documentation.
 * Do NOT renumber these without updating all docs and GitHub issues.
 */
export const placeholderSections: PlaceholderSection[] = [
  {
    title: "Benefits / Why Obliq Section",
    description: "Highlight key benefits that differentiate Obliq. Side-by-side layout with stats.",
    issueNumber: 27,
    issueUrl: "https://github.com/OBLIQ-in/OBLIQ-Website/issues/27",
  },
  {
    title: "Testimonials Section",
    description: "Social proof from real users — quote cards with avatar, name, role and company.",
    issueNumber: 34,
    issueUrl: "https://github.com/OBLIQ-in/OBLIQ-Website/issues/34",
  },
  {
    title: "Call-to-Action (CTA) Section",
    description: "Final conversion block before the footer — strong headline and primary CTA.",
    issueNumber: 35,
    issueUrl: "https://github.com/OBLIQ-in/OBLIQ-Website/issues/35",
  },
];
