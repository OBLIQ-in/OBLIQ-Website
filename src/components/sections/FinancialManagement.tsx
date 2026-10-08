import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChipList } from "@/components/ui/chip-list";
import { MockupFrame } from "@/components/ui/mockup-frame";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowUpRight, CreditCard, TrendingUp } from "lucide-react";

/**
 * FinancialManagement — Section §05
 * "Track income, get paid, stress less"
 *
 * Requirements:
 * 1. Spec §05 copy: heading, description, chip labels, CTA.
 * 2. Layout: Mirror of ProjectManagement (Image LEFT, copy RIGHT on desktop; stacked image first on mobile).
 * 3. SectionHeading align="left", eyebrow="financial management".
 * 4. ui/ChipList with Invoicing, Budgets, Forecasting, Integrations.
 * 5. CTA Button "Try Obliq free" (secondary variant) → /contact-us.
 * 6. Product mock inside ui/MockupFrame variant="app" with skeleton bars + lime total pill.
 * 7. Alternating background (bg-[var(--cream)]) to alternate rhythmically with bg-mist/50.
 */
export function FinancialManagement() {
  const chips = ["Invoicing", "Budgets", "Forecasting", "Integrations"];

  return (
    <section
      id="financial"
      aria-label="Financial Management"
      className="section scroll-mt-24 bg-[var(--cream)]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Product Mockup (Left on Desktop, Above Text on Mobile) ── */}
          <div className="order-1 lg:order-1 w-full">
            <MockupFrame variant="app" title="obliq.in/invoicing/summary">
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                {/* ── Top Financial Bar ── */}
                <div className="flex items-center justify-between gap-3 border-b border-[rgba(0,0,0,0.06)] pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-[var(--charcoal)] text-white flex items-center justify-center font-bold text-xs">
                      <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[var(--charcoal)] leading-tight">
                        Invoice #INV-2026-892
                      </h4>
                      <p className="text-[10px] text-[var(--muted)]">Client: Horizon Media Group</p>
                    </div>
                  </div>

                  {/* ── Lime Total Pill ── */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--lime)] text-[var(--charcoal)] shadow-sm">
                      <CreditCard className="h-3 w-3" aria-hidden="true" />
                      $24,850.00 Paid
                    </span>
                  </div>
                </div>

                {/* ── Budget & Invoice Skeleton Bars ── */}
                <div className="flex flex-col gap-3">
                  {/* Line Item 1 */}
                  <div className="card p-3 sm:p-3.5 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[var(--charcoal)] truncate">
                          Q3 Retainer & Quarterly Financial Audit
                        </span>
                        <span className="text-xs font-semibold text-[var(--charcoal)]">$14,000.00</span>
                      </div>
                      {/* Skeleton progress bar */}
                      <div className="w-full h-2 rounded-full bg-[rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="h-full bg-[var(--charcoal)] rounded-full w-[85%]" />
                      </div>
                    </div>
                  </div>

                  {/* Line Item 2 */}
                  <div className="card p-3 sm:p-3.5 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[var(--charcoal)] truncate">
                          Corporate Tax Filing & Compliance Documentation
                        </span>
                        <span className="text-xs font-semibold text-[var(--charcoal)]">$7,500.00</span>
                      </div>
                      {/* Skeleton progress bar */}
                      <div className="w-full h-2 rounded-full bg-[rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="h-full bg-[var(--blue-accent)] rounded-full w-[65%]" />
                      </div>
                    </div>
                  </div>

                  {/* Line Item 3 */}
                  <div className="card p-3 sm:p-3.5 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[var(--charcoal)] truncate">
                          Automated Payroll & Reconciliations
                        </span>
                        <span className="text-xs font-semibold text-[var(--charcoal)]">$3,350.00</span>
                      </div>
                      {/* Skeleton progress bar */}
                      <div className="w-full h-2 rounded-full bg-[rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="h-full bg-[var(--rust)] rounded-full w-[40%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Forecasting & Earnings Summary Footer ── */}
                <div className="card-cream p-3 rounded-xl flex items-center justify-between gap-2 mt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-[var(--charcoal)] block leading-tight">
                        Cash Flow Forecasting
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">
                        +34% Projected Q4 Growth
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--charcoal)]">
                    <span>Reports</span>
                    <ArrowUpRight className="h-3 w-3 text-[var(--muted)]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </MockupFrame>
          </div>

          {/* ── Text Content (Right on Desktop, Below Image on Mobile) ── */}
          <div className="order-2 lg:order-2 flex flex-col items-start gap-6">
            <SectionHeading
              align="left"
              eyebrow="financial management"
              heading="Track income, get paid, stress less"
              subheading="Create branded invoices, log expenses, and keep tabs on your earnings. Whether you bill hourly or per project, everything’s automated and tax-friendly."
            />

            <ChipList chips={chips} />

            <div className="pt-2">
              <Button href="/contact-us" variant="secondary" size="lg">
                Try Obliq free
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
