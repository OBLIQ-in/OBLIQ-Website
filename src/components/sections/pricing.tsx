import { PricingCard } from "@/components/ui/pricing-card";
import { BillingProvider, BillingToggle } from "@/components/sections/billing-toggle";
import { plans } from "@/lib/pricing";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Pricing — three plans with an Annually / Monthly toggle inside the
 * featured card. Server component; only the billing toggle runs on the client.
 *
 * Renders as a homepage section (h2) or as the /pricing page itself (as="h1").
 */
export function Pricing({ as: Heading = "h2", className }: { as?: "h1" | "h2"; className?: string }) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={cn(
        "section scroll-mt-24 bg-[linear-gradient(180deg,var(--pricing-bg-top),var(--pricing-bg-bottom))]",
        className
      )}
    >
      <div className="container-obliq flex flex-col items-center gap-14">
        <Reveal className="flex flex-col items-center gap-3 text-center font-rounded">
          <span className="eyebrow">Pricing</span>
          <Heading
            id="pricing-heading"
            className="text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)] md:text-[52px]"
          >
            Simple plans
            <br />
            for serious work
          </Heading>
        </Reveal>

        <BillingProvider>
          {/* One column until lg: at md the three cards were ~215px wide, which
              crushed the toggle and clipped the CTA labels (#63) */}
          <div className="mx-auto grid w-full max-w-[440px] grid-cols-1 gap-6 lg:max-w-[1072px] lg:grid-cols-3 lg:items-end">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} index={i}>
                <PricingCard
                  {...plan}
                  top={plan.featured ? <BillingToggle /> : undefined}
                  headingLevel={Heading === "h1" ? "h2" : "h3"}
                />
              </Reveal>
            ))}
          </div>
        </BillingProvider>

        <p className="text-center font-rounded text-base leading-6 text-[var(--ink-muted)]">
          Trusted by 1+ CA firms, startups, freelancers and studios
        </p>
      </div>
    </section>
  );
}
