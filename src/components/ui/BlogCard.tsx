import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { coverTones, formatPostDate, authorInitials } from "@/lib/blog";

export interface BlogCardProps {
  title: string;
  excerpt?: string;
  category?: string;
  href: string;
  author?: { name: string; role?: string };
  date?: string;
  cover?: "sky" | "peach" | "cream" | (string & {});
  featured?: boolean;
  readingTime?: number;
  /** Level of the card title heading: one below the section heading (h3 under an h2, h2 under a page h1). */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * Reusable BlogCard component (Issue #23).
 * Follows the stretched-link pattern, accessible focus ring,
 * and responsive card styling matching obliqq.framer.ai.
 */
export function BlogCard({
  title,
  excerpt,
  category,
  href,
  author,
  date,
  cover = "cream",
  featured = false,
  readingTime,
  headingLevel: Heading = "h3",
  className,
}: BlogCardProps) {
  const coverBg =
    typeof cover === "string" && Object.hasOwn(coverTones, cover)
      ? coverTones[cover as keyof typeof coverTones]
      : cover || "var(--cream-card)";

  return (
    <article
      className={cn(
        "group relative flex w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-card)] bg-[var(--surface)]/60 backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--tint-rgb)/0.16)] hover:shadow-lg",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--charcoal)]",
        featured ? "flex-col md:flex-row" : "flex-col h-full",
        className
      )}
    >
      {/* Decorative cover container */}
      <div
        aria-hidden="true"
        className={cn(
          "relative shrink-0 overflow-hidden select-none",
          featured
            ? "aspect-[16/10] md:aspect-auto md:w-1/2 min-h-[220px]"
            : "aspect-[16/10] w-full"
        )}
        style={{ background: coverBg }}
      >
        {/* Soft abstract graphic elements mimicking Framer artwork */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
        <span className="absolute -right-8 -top-12 h-44 w-44 rounded-full bg-white/40 dark:bg-white/5 blur-xs transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute -bottom-14 left-6 h-36 w-36 rounded-full bg-white/30 dark:bg-white/[0.03] blur-xs transition-transform duration-500 group-hover:scale-105" />
      </div>

      {/* Card Content */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-3",
          featured
            ? "p-6 sm:p-8 md:p-10 md:justify-center"
            : "p-5 sm:p-6"
        )}
      >
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
                category === "Must Read"
                  ? "bg-[var(--peach-card)] text-[var(--charcoal)] border border-[rgb(var(--tint-rgb)/0.12)]"
                  : "bg-[var(--cream-pill)] text-[var(--charcoal)]"
              )}
            >
              {category}
            </span>
          )}
          {featured && (
            <span className="rounded-full bg-[var(--charcoal)] px-3 py-1 text-xs font-semibold text-[var(--cream)]">
              Featured
            </span>
          )}
        </div>

        {/* Title with stretched link */}
        <Heading
          className={cn(
            "font-rounded font-bold leading-snug tracking-tight text-[var(--charcoal)] transition-colors group-hover:text-[var(--eyebrow-brown)]",
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </Link>
        </Heading>

        {/* Excerpt */}
        {excerpt && (
          <p
            className={cn(
              "text-[var(--body-text)] leading-relaxed",
              featured ? "text-sm sm:text-base line-clamp-3" : "line-clamp-2 text-sm"
            )}
          >
            {excerpt}
          </p>
        )}

        {/* Author / Date / Arrow Footer */}
        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3 pt-3 text-xs sm:text-sm text-[var(--muted)]",
            "border-t border-[rgb(var(--tint-rgb)/0.06)]"
          )}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {author && (
              <span className="inline-flex items-center gap-2 font-medium text-[var(--charcoal)] whitespace-nowrap">
                {author.name && (
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal)] text-[10px] font-bold text-[var(--cream)]"
                  >
                    {authorInitials(author.name)}
                  </span>
                )}
                <span className="whitespace-nowrap">{author.name}</span>
                {author.role && featured ? (
                  <span className="hidden sm:inline text-xs font-normal text-[var(--muted)] whitespace-nowrap">
                    · {author.role}
                  </span>
                ) : null}
              </span>
            )}
            {(date || readingTime) ? (
              <span className="whitespace-nowrap text-[var(--muted)]">
                {date ? <time dateTime={date}>{formatPostDate(date)}</time> : null}
                {date && readingTime ? <span className="mx-1" aria-hidden="true">·</span> : null}
                {readingTime ? `${readingTime} min read` : null}
              </span>
            ) : null}
          </div>

          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--cream-2)] text-[var(--charcoal)] transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
}
