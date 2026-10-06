import { type HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  testimonial: Testimonial;
}

/**
 * TestimonialCard — Reusable quote card for human reviews.
 * Designed to work inside marquee rows with a consistent fixed width.
 */
export function TestimonialCard({
  testimonial,
  className,
  ...props
}: TestimonialCardProps) {
  const { quote, author, role, company, avatar } = testimonial;
  const displayName = author || "Anonymous";
  
  // Auto-generate initials if they weren't explicitly passed
  const displayInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <figure
      className={cn(
        "card flex flex-col gap-6 p-6 relative flex-shrink-0 w-full sm:w-[380px]", 
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
      <blockquote className="text-base text-[var(--body-text)] leading-relaxed relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author Info */}
      <figcaption className="flex items-center gap-3 mt-auto pt-2 relative z-10">
        {/* Avatar */}
        <div 
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold text-sm tracking-wide overflow-hidden"
          style={{
            backgroundColor: "var(--obliq-periwinkle-light, #aab4ee)",
            color: "var(--charcoal)",
          }}
          aria-hidden="true"
        >
          {avatar ? (
            <Image 
              src={avatar} 
              alt={displayName} 
              width={40} 
              height={40} 
              className="h-full w-full object-cover" 
            />
          ) : (
            displayInitials
          )}
        </div>
        
        {/* Name, Role & Company */}
        <div className="flex flex-col">
          <cite className="text-sm font-bold text-[var(--charcoal)] leading-tight not-italic">
            {displayName}
          </cite>
          <span className="text-xs text-[var(--muted)] leading-tight mt-1">
            {company ? `${role}, ${company}` : role}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}