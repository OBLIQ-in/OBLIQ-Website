import Image from "next/image";
import { FeatureTrio } from "@/components/sections/FeatureTrio";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * FeaturesSection — the "Built for freelancers, powered by simplicity" block
 * from obliqq.framer.ai: a heading, two large cards (personalization and
 * integrations), then the three-card row. Server component; the logo
 * marquee is pure CSS.
 *
 * Logo tiles are the same images the Framer site uses (white tile included).
 * Brand marks belong to their owners and show compatibility only.
 */

const rowOne = ["asana", "linear", "mailchimp", "confluence", "zapier", "slack", "loom", "google-meet", "spectrum"];
const rowTwo = ["zapier", "slack", "google-meet", "spectrum", "asana", "mailchimp", "confluence", "linear", "loom"];

const cardClass =
  "flex min-h-[559px] flex-col justify-between gap-10 rounded-3xl bg-[var(--feature-card)] p-8 font-rounded";
const cardTitle = "text-xl font-semibold leading-7 tracking-[-0.03em] text-[var(--ink)]";
const cardText = "text-base leading-6 text-[var(--ink-soft)]";

/** Tile width (76px) + gap (16px) × tiles in one list × 3 repeats, at roughly 40px/s. */
const MARQUEE_SECONDS = 62;

function LogoRow({ logos, reverse = false, offset = false }: { logos: string[]; reverse?: boolean; offset?: boolean }) {
  // Three copies per list keep a loop wider than the card; the loop renders twice for a seamless -50% slide
  const list = [...logos, ...logos, ...logos];
  return (
    // overflow-hidden + the fade keep the rows inside the card, also with reduced motion (the rows stay one line)
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_max(12%,48px),black_calc(100%-max(12%,48px)),transparent)]">
      <div
        className={cn(
          "flex w-max animate-marquee motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
          offset && "-ml-[46px]"
        )}
        style={{ animationDuration: `${MARQUEE_SECONDS}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} role="list" aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-4 pr-4">
            {list.map((name, i) => (
              <li key={`${name}-${i}`} className="h-[76px] w-[76px] shrink-0">
                <Image src={`/features/logos/${name}.svg`} alt={copy === 0 && i < logos.length ? `${name} logo` : ""} width={76} height={76} unoptimized />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading" className="section scroll-mt-24 overflow-hidden">
      <div className="container-obliq">
        <div className="mx-auto flex w-full max-w-[1072px] flex-col items-center gap-14">
          <Reveal className="flex flex-col items-center gap-5 text-center font-rounded">
            <p className="text-[15px] font-semibold uppercase leading-[1.25] text-[var(--eyebrow-brown)]">Features</p>
            <h2
              id="features-heading"
              className="text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)] md:text-[52px]"
            >
              Built for freelancers,
              <br />
              powered by simplicity
            </h2>
          </Reveal>

          <div className="flex w-full flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Reveal>
                <article className={cardClass}>
                  <h3 className={cardTitle}>Smart, flexible, and built around your business workflow</h3>
                  <div className="relative aspect-[460/176] w-full">
                    <Image
                      src="/features/personalize.png"
                      alt="Appearance settings with accent colour swatches, a Hide Obliq branding switch and a light and dark mode toggle"
                      fill
                      sizes="(min-width: 1024px) 460px, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <p className={cardText}>
                    <strong className="font-semibold text-[var(--ink)]">Personalize every detail</strong>, From branding
                    and interface layout to colors and menus, so Obliq feels like an extension of your brand.
                  </p>
                </article>
              </Reveal>

              <Reveal index={1}>
                <article className={cardClass}>
                  <h3 className={cardTitle}>Integrates seamlessly with the tools you already use</h3>
                  <div className="flex flex-col gap-4">
                    <LogoRow logos={rowOne} />
                    <LogoRow logos={rowTwo} reverse offset />
                  </div>
                  <p className={cardText}>
                    <strong className="font-semibold text-[var(--ink)]">Seamless integrations</strong>. Plug Obliq into
                    the tools you love. Set up automations, sync your data, and make your systems work smarter together.
                  </p>
                </article>
              </Reveal>
            </div>

            <FeatureTrio />
          </div>
        </div>
      </div>
    </section>
  );
}
