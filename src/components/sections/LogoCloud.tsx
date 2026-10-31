import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * LogoCloud — "Trusted by…" line with an infinite marquee of client names,
 * shown right under the hero. Server component: the marquee is pure CSS.
 *
 * Client names are placeholder wordmarks rendered as styled text, which keeps
 * the repo binary-free. When real client logos exist they will be SVGs in the
 * brand-assets repo — swap them in here using getBrandAssetUrl().
 *
 * Pauses on hover; with reduced motion it stops and wraps into a static row.
 */

const clients = ["Theo", "Amsterdam", "Savannah", "Milano", "Luminous"];

/** Enough names per loop to be wider than a 2560px screen. */
const MIN_ITEMS_PER_LOOP = 12;

export function LogoCloud() {
  const listsPerLoop = Math.ceil(MIN_ITEMS_PER_LOOP / clients.length);
  // The loop is rendered twice so the track can slide by -50% for a seamless cycle.
  const lists = Array.from({ length: listsPerLoop * 2 }, (_, i) => i);

  return (
    <section
      id="logo-cloud"
      aria-label="Trusted by"
      className="overflow-hidden py-14 sm:py-16"
      style={{ background: "var(--cream)" }}
    >
      <Reveal className="container-obliq">
        <p className="text-center text-sm text-muted sm:text-base">
          Trusted by 1+ CA firms, startups, freelancers and studios
        </p>
      </Reveal>

      <div className="group relative mt-8 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:mask-none">
        <div
          className={cn(
            "flex w-max animate-marquee group-hover:[animation-play-state:paused]",
            "motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center"
          )}
          style={{ animationDuration: `${listsPerLoop * 18}s` }}
        >
          {lists.map((i) => (
            <ul
              key={i}
              role="list"
              aria-hidden={i > 0 || undefined}
              className={cn(
                "flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16",
                i > 0
                  ? "motion-reduce:hidden"
                  : "motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-4 motion-reduce:px-4 motion-reduce:pr-4"
              )}
            >
              {clients.map((name) => (
                <li
                  key={name}
                  className="font-rounded whitespace-nowrap text-2xl font-bold tracking-tight text-ink/40 sm:text-3xl"
                >
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}