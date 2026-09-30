import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * A price can be a single string ("Free", "$87") or one value per billing
 * period. With per-period values the card renders both, and an ancestor with
 * `data-billing="monthly"` switches which one is visible — so the card stays
 * a server component and the billing toggle (#37) only flips that attribute.
 * Without the attribute, the annual value is shown.
 */
type Billed = { annually: string; monthly: string };

export interface PricingCardProps {
  name: string;
  price: string | Billed;
  period?: string | Billed;
  description: string;
  features: string[];
  featured?: boolean;
  /** Small label next to the plan name, e.g. "Save 20%". */
  badge?: string;
  /** Show the badge only for this billing period (e.g. "Save 20%" on annual). */
  badgeBilling?: keyof Billed;
  cta: { label: string; href: string };
  /** Content above the plan name — the featured card holds the billing toggle here. */
  top?: ReactNode;
  className?: string;
}

function BilledText({ value }: { value: string | Billed }) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      <span className="in-data-[billing=monthly]:hidden">{value.annually}</span>
      <span className="hidden in-data-[billing=monthly]:inline">{value.monthly}</span>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 flex-shrink-0 text-[var(--ink)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  featured = false,
  badge,
  badgeBilling,
  cta,
  top,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-8 p-8 rounded-3xl font-rounded",
        featured
          ? [
              "bg-[linear-gradient(180deg,var(--sky-card)_15%,var(--peach-card)_100%)]",
              // Blue ring drawn inside the card edge, like the Framer design
              "after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl",
              "after:border-[5px] after:border-[var(--sky-ring)]",
            ]
          : "bg-white/70",
        className
      )}
    >
      {top}

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          {/* min-h keeps the row the badge's height, so hiding it doesn't shift the card */}
          <div className={cn("flex items-center gap-2", badge && "min-h-7")}>
            <h3 className="text-lg font-medium leading-[1.4] text-[var(--ink-soft)]">{name}</h3>
            {badge && (
              <span
                className={cn(
                  "rounded-full bg-[var(--success-bg)] px-3 py-1 text-sm font-medium leading-[1.4] text-[var(--success)]",
                  badgeBilling === "annually" && "in-data-[billing=monthly]:hidden",
                  badgeBilling === "monthly" && "hidden in-data-[billing=monthly]:inline-block"
                )}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Fixed line height so switching billing periods never shifts the layout */}
          <p className="text-[40px] font-semibold leading-[48px] tracking-[-0.03em] text-[var(--ink)]">
            <BilledText value={price} />
            {period && <BilledText value={period} />}
          </p>
        </div>

        <p className="text-lg leading-[1.5] text-[var(--ink-soft)]">{description}</p>

        <ul className="flex flex-col gap-[15px]" role="list">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-lg leading-[1.5] text-[var(--ink-soft)]">
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        href={cta.href}
        size="lg"
        className={cn(
          "mt-auto h-[55px] w-full text-base",
          featured
            ? "bg-[var(--ink)] text-white hover:opacity-90"
            : "bg-[var(--pill)] text-[var(--ink)] hover:bg-[var(--pill-hover)] hover:opacity-100"
        )}
      >
        {cta.label}
      </Button>
    </div>
  );
}
