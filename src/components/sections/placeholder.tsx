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
          "px-4 py-2 text-sm font-medium",
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

const ISSUES_URL = "https://github.com/OBLIQ-in/OBLIQ-Website/issues";

/** A board entry for an open GitHub issue; the URL is derived from its number. */
export function openIssue(issueNumber: number, title: string, description: string): PlaceholderSection {
  return { title, description, issueNumber, issueUrl: `${ISSUES_URL}/${issueNumber}` };
}

/**
 * The homepage "live to-do board": homepage sections that are still open,
 * in page order. When a section's PR merges, remove its entry here (and render
 * the section in app/page.tsx) so the board never points at closed work.
 */
export const placeholderSections: PlaceholderSection[] = [
  openIssue(26, "Logo cloud — “Trusted by…”", "A “Trusted by CA firms, startups, freelancers and studios” line above an infinite marquee of client logos, right under the hero."),
  openIssue(29, "Device showcase — “Work from anywhere, stay in sync”", "A phone overlapping a browser window with Mobile App / Web App chips — showing Obliq works everywhere."),
  openIssue(30, "Project management — “Keep every project moving forward”", "First of two alternating feature sections: copy left, product image right, feature chips underneath."),
  openIssue(31, "Financial management — “Track income, get paid, stress less”", "The mirror of the project-management section: image left, copy right — invoicing, expenses and earnings."),
  openIssue(32, "Features / personalization", "The “Built for freelancers, powered by simplicity” block with a large customization screenshot."),
  openIssue(34, "Feature trio", "Three equal cards: collaborate in realtime, speaks your language, view things your way."),
  openIssue(35, "Spotlight testimonial", "One large centered quote with author attribution — the calm before the testimonial marquee."),
  openIssue(36, "Testimonial marquee", "A slow horizontal river of testimonial cards."),
  openIssue(38, "Blog preview", "A featured post plus a grid of recent posts, linking to the blog."),
  openIssue(51, "Community — “Stay in the loop”", "Two large social cards with follower counts and calls to action."),
  openIssue(52, "Final CTA banner", "The dark band above the footer that gives visitors one last nudge."),
];
