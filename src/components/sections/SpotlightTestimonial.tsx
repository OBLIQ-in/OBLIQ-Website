import { Reveal } from "@/components/ui/reveal";

/**
 * Spotlight testimonial — one large centered quote with author attribution,
 * the calm before the testimonial marquee. Server component.
 *
 * PLACEHOLDER: the quote and author mirror obliqq.framer.ai and are not a
 * real customer yet. Swap them for a genuine testimonial before launch.
 */
const testimonial = {
  quote: "Obliq is by far the best agency tool I have ever used",
  name: "Martha Punla",
  role: "VP Marketing, Meta",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function SpotlightTestimonial() {
  return (
    <section
      id="testimonial"
      aria-label="Customer testimonial"
      className="section relative isolate overflow-hidden bg-[var(--cream)]"
    >
      {/* Soft sky blob behind the quote */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sky-card)] opacity-40 blur-3xl"
      />

      <Reveal className="container-obliq">
        <figure className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center font-rounded">
          <span
            aria-hidden="true"
            className="-mb-8 select-none text-[96px] font-semibold leading-[0.5] text-[var(--sky-ring)] md:-mb-12 md:text-[140px]"
          >
            &ldquo;
          </span>
          <blockquote>
            <p className="text-balance text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)] md:text-[52px]">
              {testimonial.quote}
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-3 text-left">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--sky-card)] text-sm font-semibold text-[var(--ink)]"
            >
              {initials(testimonial.name)}
            </span>
            <span className="flex flex-col">
              <cite className="text-base font-semibold not-italic text-[var(--ink)]">
                {testimonial.name}
              </cite>
              <span className="text-sm text-[var(--ink-soft)]">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
