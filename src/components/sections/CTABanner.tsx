import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Final CTA banner — the dark band above the footer that gives visitors one
 * last nudge. Server component; the decorative blobs are pure CSS.
 */
export function CTABanner() {
  return (
    <section
      id="get-started"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[var(--ink)] px-4 py-24 md:py-32"
    >
      {/* Decorative shapes — sky accents at low opacity, hidden from assistive tech */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-[var(--sky-ring)] opacity-20 blur-3xl md:size-96" />
        <div className="absolute -bottom-32 -right-16 size-80 rounded-full bg-[var(--sky-card)] opacity-15 blur-3xl md:size-[28rem]" />
        <div className="absolute right-[12%] top-10 hidden size-16 rotate-12 rounded-2xl border border-[var(--cream)]/10 md:block" />
        <div className="absolute bottom-12 left-[10%] hidden size-10 rounded-full border border-[var(--cream)]/10 md:block" />
      </div>

      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center font-rounded">
        <h2
          id="cta-heading"
          className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--cream)] md:text-[60px]"
        >
          Your deadlines, finally under control.
        </h2>
        <Button
          href="/contact-us"
          variant="secondary"
          size="lg"
          className="bg-[var(--cream)] hover:bg-[var(--cream-pill)] focus-visible:ring-[var(--cream)] focus-visible:ring-offset-[var(--ink)]"
        >
          Try Obliq free
        </Button>
      </Reveal>
    </section>
  );
}
