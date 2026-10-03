import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

/**
 * TestimonialMarquee — a slow horizontal river of testimonial cards
 * (issue #36). Pure CSS marquee, server component: the card list is
 * rendered twice per loop so the track can slide by -50% for a seamless
 * cycle, drifting for ~50s per loop and pausing on hover.
 *
 * Quotes mirror obliqq.framer.ai and are placeholders until real
 * customers can be quoted. Avatars are initials circles — never hotlinked
 * stock photos of real people.
 */

// The Spotlight testimonial directly above this section (Martha Punla) is
// deliberately omitted so the same quote never appears twice in a row.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "As a fast-moving design team, we needed a tool that matched our pace. From client onboarding to getting paid, this just works — clean, fast, and beautifully built.",
    author: "Zara Khan",
    role: "Design Ops Lead",
    company: "teamwork.",
  },
  {
    quote:
      "We used to duct-tape tools together. Now our contracts, time tracking, and payments live in one clean system. It's everything a small team needs to stay pro.",
    author: "Sergio Walker",
    role: "Agency Owner",
    company: "",
  },
  {
    quote:
      "Managing projects used to mean spreadsheets, DMs, and missed invoices. This platform keeps our workflows tight and our clients impressed.",
    author: "Amos Chen",
    role: "Art Director",
    company: "Pentagram",
  },
];

export function TestimonialMarquee() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="container-obliq">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Testimonials"
          heading="Loved by freelancers and teams"
          subheading="From solo freelancers to agencies, here is what working on Obliq feels like."
        />
      </div>

      <div className="group relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
        <div
          className={cn(
            "flex w-max animate-marquee group-hover:[animation-play-state:paused]",
            "motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center"
          )}
          style={{ animationDuration: `${LOOP_SECONDS}s` }}
        >
          {lists.map((i) => (
            <CardList key={i} testimonials={TESTIMONIALS} duplicate={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One loop must be wider than the widest common screen (2560px) so the
 * -50% slide never exposes a gap: 3 cards ≈ 1080px → 3 lists per loop.
 * The track renders that loop twice for the seamless cycle.
 */
const LISTS_PER_LOOP = 3;
const LOOP_SECONDS = 50;
const lists = Array.from({ length: LISTS_PER_LOOP * 2 }, (_, i) => i);

function CardList({
  testimonials,
  duplicate = false,
}: {
  testimonials: Testimonial[];
  duplicate?: boolean;
}) {
  return (
    <ul
      role="list"
      aria-hidden={duplicate || undefined}
      className={cn(
        "flex w-max shrink-0 gap-5 pr-5",
        duplicate
          ? "motion-reduce:hidden"
          : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4"
      )}
    >
      {testimonials.map((testimonial) => (
        <li
          key={testimonial.author}
          className="w-[280px] shrink-0 sm:w-[340px]"
        >
          <TestimonialCard testimonial={testimonial} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
