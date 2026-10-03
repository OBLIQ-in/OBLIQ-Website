"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Footer newsletter capture — UI only.
 *
 * TODO: wire to an email service (no tracking issue yet; #53 scoped this
 * form as UI only). Until then a valid submit just tells the visitor that
 * signups aren't open, rather than pretending they were subscribed.
 */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 max-w-sm" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="eyebrow">Newsletter</h2>
      <p className="text-sm text-[var(--muted)] leading-relaxed">
        Product updates and practice-management tips. No spam.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@firm.com"
          aria-label="Email address"
          aria-describedby={submitted ? "newsletter-status" : undefined}
          onChange={() => setSubmitted(false)}
          className={cn(
            "h-10 min-w-0 flex-1 rounded-full bg-white px-4 text-sm text-[var(--charcoal)]",
            "border border-[rgba(0,0,0,0.12)] placeholder:text-[var(--muted)]",
            "transition-colors hover:border-[rgba(0,0,0,0.25)]",
            "focus-visible:outline-none focus-visible:border-[var(--charcoal)] focus-visible:ring-2 focus-visible:ring-[var(--charcoal)] focus-visible:ring-offset-2",
          )}
        />
        <Button type="submit" size="md">Subscribe</Button>
      </div>
      <p id="newsletter-status" role="status" className="min-h-5 text-xs text-[var(--muted)]">
        {submitted && "Thanks! Newsletter signups aren't open yet. We'll launch them soon."}
      </p>
    </form>
  );
}
