import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps extends HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

/**
 * TestimonialCard — Reusable quote card for human reviews.
 * Designed to work inside marquee rows with a consistent fixed width.
 */
export function TestimonialCard({
  quote,
  name,
  role,
  initials,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "card flex flex-col gap-6 p-6 relative flex-shrink-0 w-full sm:w-[380px]", // fixed width on desktop for marquee stability
        className
      )}
      {...props}
    >
      {/* Decorative Quote Mark */}
      <div 
        className="absolute top-4 right-5 text-7xl font-serif leading-none select-none pointer-events-none"
        style={{ color: "var(--obliq-periwinkle, #7b8cde)", opacity: 0.15 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote Text */}
      <p className="text-base text-[var(--body-text)] leading-relaxed relative z-10">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 mt-auto pt-2 relative z-10">
        {/* Avatar */}
        <div 
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold text-sm tracking-wide"
          style={{
            backgroundColor: "var(--obliq-periwinkle-light, #aab4ee)",
            color: "var(--charcoal)",
          }}
          aria-hidden="true"
        >
          {initials}
        </div>
        
        {/* Name & Role */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[var(--charcoal)] leading-tight">
            {name}
          </span>
          <span className="text-xs text-[var(--muted)] leading-tight mt-1">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}