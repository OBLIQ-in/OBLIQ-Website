import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "center" | "left";
  /** Heading level — use "h1" when this is the page title (one h1 per page) */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "center",
  as: Heading = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left"   && "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}
      <Heading
        className="font-black leading-tight tracking-tight text-[var(--charcoal)]"
        style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.5rem)" }}
      >
        {heading}
      </Heading>
      {subheading && (
        <p className="max-w-xl text-base leading-relaxed text-[var(--body-text)]">
          {subheading}
        </p>
      )}
    </Reveal>
  );
}
