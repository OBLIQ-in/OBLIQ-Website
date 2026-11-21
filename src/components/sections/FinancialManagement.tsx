import { ChipList } from "@/components/ui/ChipList";
import { MockupFrame } from "@/components/ui/mockup-frame";
import { Reveal } from "@/components/ui/reveal";

const FEATURES = ["Invoicing", "Budgets", "Forecasting", "Integrations"];

function FinancePreview() {
  return (
    <div aria-hidden="true" className="space-y-5 p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-[var(--charcoal)]" />
          <div className="space-y-1.5">
            <span className="block h-2 w-24 rounded-full bg-[var(--charcoal)]/70" />
            <span className="block h-1.5 w-16 rounded-full bg-[var(--muted)]/40" />
          </div>
        </div>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] text-[var(--muted)]">
          This month
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <span className="block h-1.5 w-20 rounded-full bg-[var(--muted)]/35" />
          <span className="mt-3 block h-5 w-24 rounded-md bg-[var(--charcoal)]/75" />
          <span className="mt-4 block h-1.5 w-full rounded-full bg-[var(--cream-pill)]" />
          <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-[var(--cream-pill)]" />
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <span className="block h-1.5 w-16 rounded-full bg-[var(--muted)]/35" />
          <span className="mt-3 block h-5 w-20 rounded-md bg-[var(--charcoal)]/75" />
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--cream-pill)]">
            <span className="block h-full w-2/3 rounded-full bg-[var(--lime)]" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <span className="block h-1.5 w-24 rounded-full bg-[var(--muted)]/35" />
            <span className="block h-2.5 w-32 rounded-full bg-[var(--charcoal)]/70" />
          </div>
          <span className="rounded-full bg-[var(--lime)] px-4 py-2 text-xs font-semibold text-[var(--charcoal)]">
            $8,240 received
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {[0, 1, 2].map((invoice) => (
            <div
              key={invoice}
              className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="h-8 w-8 shrink-0 rounded-lg bg-[var(--cream-pill)]" />
                <span className="min-w-0 flex-1 space-y-1.5">
                  <span className="block h-1.5 w-3/4 rounded-full bg-[var(--charcoal)]/45" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-[var(--muted)]/25" />
                </span>
              </div>
              <span className="h-5 w-14 shrink-0 rounded-full bg-[var(--cream-pill)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FinancialManagement() {
  return (
    <section
      id="financial-management"
      aria-labelledby="financial-management-heading"
      className="section overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="container-obliq grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-1 min-w-0 lg:order-1">
          <MockupFrame variant="browser" url="obliq.in/finances" aria-hidden="true">
            <FinancePreview />
          </MockupFrame>
        </Reveal>

        <Reveal className="order-2 flex flex-col items-start gap-5 lg:order-2">
          <span className="eyebrow">Financial management</span>
          <h2
            id="financial-management-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl"
          >
            Track income, get paid, stress less
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[var(--body-text)]">
            Keep invoices, expenses, and earnings in one clear view. Stay on top
            of your budget and know what is coming in next.
          </p>
          <ChipList items={FEATURES} aria-label="Financial management features" />
        </Reveal>
      </div>
    </section>
  );
}
