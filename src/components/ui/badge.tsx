import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-sm font-medium text-[var(--charcoal)] shadow-sm",
        className
      )}
      {...props}
    />
  );
}