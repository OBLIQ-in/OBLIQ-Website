import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export interface ChipListProps extends HTMLAttributes<HTMLDivElement> {
  /** List of chip labels to render */
  chips: string[];
}

/**
 * ChipList — renders a horizontal list of pill-shaped feature tags
 * styled using design-system tokens.
 *
 * @example
 * <ChipList chips={["Tasks", "Time tracking", "Timesheets", "Reports"]} />
 */
export function ChipList({
  chips,
  className,
  ...props
}: ChipListProps) {
  if (!chips || chips.length === 0) return null;

  return (
    <div
      role="list"
      aria-label="Features list"
      className={cn("flex flex-wrap items-center gap-2 sm:gap-2.5", className)}
      {...props}
    >
      {chips.map((chip) => (
        <span
          key={chip}
          role="listitem"
          className={cn(
            "inline-flex items-center px-3.5 py-1.5 rounded-full",
            "text-xs sm:text-sm font-medium leading-none",
            "bg-[var(--cream-pill)] text-[var(--charcoal)]",
            "border border-[rgba(0,0,0,0.06)]",
            "transition-colors duration-150 hover:bg-[#d9d4cc]"
          )}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}
