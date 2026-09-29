// Example: <Badge variant="lime">Save 20%</Badge>

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "border border-[var(--border)] bg-white text-[var(--charcoal)]",
        lime: "bg-[var(--lime)] text-[var(--charcoal)]",
        dark: "bg-[var(--charcoal)] text-[var(--cream)]",
        outline: "border border-[var(--charcoal)] bg-transparent text-[var(--charcoal)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeProps };