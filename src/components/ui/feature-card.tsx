import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  /** Choose the background color for the icon container */
  iconVariant?: "lime" | "periwinkle";
}

/**
 * FeatureCard — Reusable card for feature grids.
 */
export function FeatureCard({
  icon,
  title,
  children,
  iconVariant = "lime",
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "card flex flex-col gap-4 p-6 transition-colors duration-200 hover:border-[rgb(var(--tint-rgb)/0.15)]",
        className
      )}
      {...props}
    >
      {/* The pastel chip stays light in dark mode, so it keeps light tokens (dark icon) */}
      <div
        className="theme-light flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor:
            iconVariant === "lime"
              ? "var(--obliq-lime-light)"
              : "var(--obliq-periwinkle-light)",
          color: "var(--charcoal)",
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[1.05rem] font-bold text-[var(--charcoal)]">
          {title}
        </h3>
        <div className="text-sm text-[var(--body-text)] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}