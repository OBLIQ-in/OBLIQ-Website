import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/**
 * One testimonial quote card: quote, initials avatar (no stock photos of
 * real people), name, role and company. Fixed width is set by the caller
 * so every card in the marquee row stays consistent.
 *
 * Server component: no state, no effects, no client JS.
 */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between gap-5 rounded-2xl border",
        "border-[var(--border)] bg-[var(--cream-card)] p-6 font-rounded",
        className
      )}
    >
      <blockquote className="text-[15px] leading-relaxed text-[var(--body-text)]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--sky-card)] text-sm font-semibold text-[var(--ink)]"
        >
          {initials(testimonial.author)}
        </span>
        <span className="flex min-w-0 flex-col">
          <cite className="truncate text-sm font-semibold not-italic text-[var(--ink)]">
            {testimonial.author}
          </cite>
          <span className="truncate text-xs text-[var(--ink-soft)]">
            {testimonial.company ? `${testimonial.role}, ${testimonial.company}` : testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
