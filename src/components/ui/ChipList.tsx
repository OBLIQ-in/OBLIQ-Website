import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface ChipListProps extends HTMLAttributes<HTMLDivElement> {
  items: string[];
}

export function ChipList({ items, className, ...props }: ChipListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-sm text-[var(--muted)] whitespace-nowrap"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

