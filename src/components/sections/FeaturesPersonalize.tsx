import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MockupFrame } from "@/components/ui/mockup-frame";
import { cn } from "@/lib/utils";

/**
 * FeaturesPersonalize — “Built for freelancers, powered by simplicity.”
 *
 * A centered editorial intro followed by a wide browser mockup showing a
 * CSS-only theme picker (color swatches + layout toggles), with soft
 * periwinkle/lime blobs behind the frame — the same blurred-blob language
 * as the Hero clouds, recolored to the brand accents.
 *
 * Server component: no state, no effects, no client JS. The mock controls
 * are presentation only (the product isn't interactive here), so they are
 * plain list items, not buttons.
 */

/* ── Copy ─────────────────────────────────────────────────────────────── */

const HEADING = "Built for freelancers, powered by simplicity";

const SUBLINE =
  "Tailor the workspace to the way you work — colors, density and layout, adjusted in seconds.";

const BLURB =
  "Pick a palette, choose a comfortable density, and Obliq reshapes around your workflow — no rebuilding, no relearning.";

/* ── Theme picker content (pure presentation, no state) ───────────────── */

/** Accent colors shown as swatches; periwinkle is the active pick. */
const SWATCHES = [
  { name: "Periwinkle", color: "var(--obliq-periwinkle, #7b8cde)" },
  { name: "Lime", color: "var(--obliq-lime, #c8f560)" },
  { name: "Ink", color: "var(--obliq-charcoal, #1a1a2e)" },
] as const;

/** Layout-density options; “Cozy” is shown selected. */
const LAYOUTS = [
  { name: "Compact", bars: [2, 2, 2] },
  { name: "Cozy", bars: [3, 2, 1] },
  { name: "Comfort", bars: [1, 1, 1] },
] as const;

const ACTIVE_SWATCH = "Periwinkle";
const ACTIVE_LAYOUT = "Cozy";

/** Skeleton row used in the preview area. */
function PreviewBars({ widths }: { widths: readonly number[] }) {
  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      {widths.map((w, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full bg-black/[0.08]"
          style={{ width: `${w * 22}%` }}
        />
      ))}
    </div>
  );
}

export function FeaturesPersonalize() {
  return (
    <section
      id="features-personalize"
      aria-labelledby="features-personalize-heading"
      className="section relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Decorative blobs — behind the mockup, clipped by overflow-hidden */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-24 top-24 h-64 w-64 rounded-full opacity-60 blur-3xl sm:top-32 md:-left-16 md:h-80 md:w-80"
          style={{ background: "var(--obliq-periwinkle-light, #aab4ee)" }}
        />
        <div
          className="absolute -right-20 top-1/2 h-56 w-56 rounded-full opacity-50 blur-3xl md:-right-10 md:h-72 md:w-72"
          style={{ background: "var(--obliq-lime, #c8f560)" }}
        />
      </div>

      <div className="container-obliq relative flex flex-col items-center">
        <SectionHeading
          id="features-personalize-heading"
          eyebrow="Features"
          heading={HEADING}
          subheading={SUBLINE}
        />

        <Reveal className="mt-12 w-full md:mt-16" delay={120}>
          <div className="relative mx-auto w-full max-w-[900px]">
            <MockupFrame
              variant="browser"
              url="obliq.in/appearance"
              className="relative z-10"
            >
              <ThemePickerMock />
            </MockupFrame>

            {/* Copy block under the visual, like the Framer reference */}
            <div className="mx-auto mt-8 max-w-md text-center">
              <h3 className="font-rounded text-lg font-semibold tracking-[-0.01em] text-[var(--charcoal)]">
                Personalize every detail
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">{BLURB}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CSS-only product mockup ──────────────────────────────────────────── */

/**
 * ThemePickerMock — a static appearance/settings screen: a customization
 * header, three color swatches with a selected ring, layout toggles with a
 * highlighted option, and a skeleton content preview. No interactivity.
 */
function ThemePickerMock() {
  return (
    <div className="flex flex-col gap-5 p-5 sm:p-8" style={{ background: "#faf9f7" }}>
      {/* Mock header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-7 w-7 rounded-lg"
            style={{ background: "var(--charcoal)" }}
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[var(--charcoal)]">Appearance</span>
            <span className="text-[10px] text-[var(--muted)]">Workspace theme</span>
          </div>
        </div>
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-medium text-[var(--muted)]"
          style={{ borderColor: "var(--border)" }}
        >
          Draft
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.2fr] md:gap-8">
        {/* Controls column */}
        <div className="flex flex-col gap-5">
          {/* Color swatches */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Accent color
            </span>
            <ul className="flex gap-2.5">
              {SWATCHES.map((s) => (
                <li
                  key={s.name}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    s.name === ACTIVE_SWATCH
                      ? "ring-2 ring-[var(--charcoal)] ring-offset-2 ring-offset-[#faf9f7]"
                      : "ring-1 ring-black/10"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="h-7 w-7 rounded-lg"
                    style={{ background: s.color }}
                  />
                  <span className="sr-only">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Layout toggles */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Layout
            </span>
            <ul className="grid grid-cols-3 gap-2.5">
              {LAYOUTS.map((l) => (
                <li
                  key={l.name}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-2.5",
                    l.name === ACTIVE_LAYOUT
                      ? "border-[var(--charcoal)] bg-black/[0.03]"
                      : "border-[var(--border)]"
                  )}
                >
                  <span aria-hidden="true" className="flex w-full flex-col items-center gap-1">
                    {l.bars.map((h, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-full rounded-full",
                          l.name === ACTIVE_LAYOUT ? "bg-[var(--charcoal)]/70" : "bg-black/10"
                        )}
                        style={{ height: `${h * 2}px` }}
                      />
                    ))}
                  </span>
                  <span className="text-[10px] font-medium text-[var(--ink-muted)]">{l.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preview column */}
        <div
          className="flex flex-col gap-3 rounded-xl border p-4"
          style={{ borderColor: "var(--border)", background: "#fff" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--charcoal)]">Preview</span>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--obliq-periwinkle, #7b8cde)" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--obliq-lime, #c8f560)" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--obliq-charcoal, #1a1a2e)" }} />
            </div>
          </div>
          <div
            className="flex items-center gap-2 rounded-lg p-2"
            style={{ background: "var(--cream-pill)" }}
          >
            <span
              aria-hidden="true"
              className="h-6 w-6 shrink-0 rounded-md"
              style={{ background: "var(--obliq-periwinkle, #7b8cde)" }}
            />
            <div className="flex flex-col gap-1">
              <span aria-hidden="true" className="h-1.5 w-20 rounded-full bg-black/10" />
              <span aria-hidden="true" className="h-1.5 w-12 rounded-full bg-black/10" />
            </div>
          </div>
          <PreviewBars widths={[4, 3, 4, 2]} />
          <PreviewBars widths={[3, 4, 2]} />
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-6 w-16 rounded-full"
              style={{ background: "var(--charcoal)" }}
            />
            <span
              aria-hidden="true"
              className="h-6 w-16 rounded-full border"
              style={{ borderColor: "var(--border)" }}
            />
            <span
              aria-hidden="true"
              className="h-6 w-6 rounded-full"
              style={{ background: "var(--obliq-lime, #c8f560)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
