import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

/**
 * LogoCloud — Social proof logo cloud section (spec §02).
 *
 * Line rendered in text-muted centered above an infinite marquee of client logos.
 *
 * Implementation note:
 * Wordmarks as styled text keep the repo binary-free. When real client logos
 * exist they'll be SVGs in the brand-assets repo (OBLIQ-in/brand-assets).
 */

const WORDMARKS = [
  { name: "Theo", className: "font-bold tracking-tight" },
  { name: "Amsterdam", className: "font-semibold tracking-wider uppercase text-lg sm:text-xl" },
  { name: "Savannah", className: "font-medium italic tracking-normal" },
  { name: "Milano", className: "font-black tracking-widest uppercase text-base sm:text-lg" },
  { name: "Luminous", className: "font-bold tracking-tight" },
] as const;

export function LogoCloud() {
  return (
    <section
      id="clients"
      aria-label="Trusted by CA firms, startups, freelancers and studios"
      className="py-12 md:py-16 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="container-obliq mb-8 text-center">
        <p className="text-center text-sm font-medium text-muted">
          Trusted by 1+ CA firms, startups, freelancers and studios
        </p>
      </div>

      <Marquee pauseOnHover repeat={4} duration={30}>
        {WORDMARKS.map((mark) => (
          <span
            key={mark.name}
            className={cn(
              "font-display text-ink/40 text-xl sm:text-2xl select-none transition-colors hover:text-ink/70",
              mark.className
            )}
          >
            {mark.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export default LogoCloud;
