"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Billing = "annually" | "monthly";

const options: { value: Billing; label: string }[] = [
  { value: "annually", label: "Annually" },
  { value: "monthly", label: "Monthly" },
];

const BillingContext = createContext<{
  billing: Billing;
  setBilling: (billing: Billing) => void;
} | null>(null);

/**
 * Holds the selected billing period and exposes it as `data-billing` on a
 * wrapper. The pricing cards inside are server-rendered with both prices;
 * this attribute decides which one is visible.
 */
export function BillingProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState<Billing>("annually");
  return (
    <BillingContext.Provider value={{ billing, setBilling }}>
      <div data-billing={billing} className="w-full">
        {children}
      </div>
    </BillingContext.Provider>
  );
}

/**
 * Annually / Monthly switch. Sits inside the featured pricing card, so it
 * reads and updates the period through BillingProvider's context.
 */
export function BillingToggle() {
  const ctx = useContext(BillingContext);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  if (!ctx) throw new Error("BillingToggle must be used inside BillingProvider");
  const { billing, setBilling } = ctx;
  const selected = options.findIndex((o) => o.value === billing);

  // Radio group keyboard pattern: arrow keys move the selection and focus.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (selected + step + options.length) % options.length;
    const option = options[next];
    if (!option) return;
    setBilling(option.value);
    buttons.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      onKeyDown={onKeyDown}
      className="relative grid h-12 grid-cols-2 rounded-full bg-[var(--pill)] p-1 font-rounded"
    >
      {/* White pill that slides under the selected option */}
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_4px_50px_rgba(97,74,68,0.06)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(${selected * 100}%)` }}
      />

      {options.map((option, i) => {
        const checked = billing === option.value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => setBilling(option.value)}
            className={cn(
              "relative z-10 rounded-full text-base font-semibold text-[var(--ink)] transition-colors duration-200",
              checked ? "cursor-default" : "hover:bg-white/50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
