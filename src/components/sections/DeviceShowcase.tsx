import { MockupFrame } from "@/components/ui/mockup-frame";
import { SectionHeading } from "@/components/ui/section-heading";

function BrowserPreview() {
  return (
    <div
      aria-hidden="true"
      className="min-h-[280px] bg-[linear-gradient(135deg,#e9e9ff_0%,#f8f5ed_48%,#e0f0d7_100%)] p-4 sm:min-h-[350px] sm:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-[#777ed0]" />
          <span className="h-2 w-20 rounded-full bg-[#1a1a2e]/25" />
        </div>
        <span className="h-7 w-20 rounded-full bg-white/70" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:mt-8 sm:gap-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-xl bg-white/70 p-3 sm:p-4">
            <span className="block h-2 w-2/3 rounded-full bg-[#1a1a2e]/15" />
            <span className="mt-3 block h-5 w-1/2 rounded-md bg-[#8d91dc]/60 sm:h-7" />
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-white/75 p-3 sm:mt-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="h-2 w-24 rounded-full bg-[#1a1a2e]/20" />
          <span className="h-2 w-12 rounded-full bg-[#1a1a2e]/10" />
        </div>
        <div className="mt-5 flex h-20 items-end gap-2 sm:h-28 sm:gap-3">
          {[40, 65, 48, 82, 58, 95, 70, 88, 55, 76, 62, 92].map((height, item) => (
            <span
              key={item}
              className="flex-1 rounded-t-md bg-[#9298e0]/65"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhonePreview() {
  return (
    <div
      aria-hidden="true"
      className="h-full min-h-[350px] bg-[linear-gradient(160deg,#e8eaff_0%,#f8f5ed_56%,#e6f2dc_100%)] p-4 pt-12"
    >
      <div className="flex items-center justify-between">
        <span className="h-2 w-16 rounded-full bg-[#1a1a2e]/20" />
        <span className="h-7 w-7 rounded-full bg-[#c8f560]/80" />
      </div>
      <div className="mt-5 rounded-2xl bg-white/75 p-3">
        <span className="block h-2 w-2/3 rounded-full bg-[#1a1a2e]/15" />
        <span className="mt-3 block h-7 w-1/2 rounded-lg bg-[#9298e0]/55" />
        <span className="mt-3 block h-1.5 w-full rounded-full bg-[#1a1a2e]/10" />
        <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-[#1a1a2e]/10" />
      </div>
      <div className="mt-3 space-y-2.5">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/70 p-3">
            <span className="h-8 w-8 shrink-0 rounded-lg bg-[#c8f560]/70" />
            <span className="flex-1">
              <span className="block h-2 w-3/4 rounded-full bg-[#1a1a2e]/15" />
              <span className="mt-2 block h-1.5 w-1/2 rounded-full bg-[#1a1a2e]/10" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--charcoal)] shadow-lg shadow-ink/5">
      {children}
    </span>
  );
}

export function DeviceShowcase() {
  return (
    <section
      id="device-showcase"
      aria-label="Device showcase"
      className="section overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="container-obliq">
        <SectionHeading
          eyebrow="Seamless across devices"
          heading="Work from anywhere, stay in sync"
          subheading="Your whole workspace, ready wherever the day takes you."
        />

        <div className="mx-auto mt-12 max-w-[1040px] md:mt-16">
          <div className="flex flex-col gap-8 md:relative md:min-h-[540px] md:block">
            <div className="relative w-full md:absolute md:right-0 md:top-0 md:w-[86%]">
              <MockupFrame variant="browser" url="obliq.in/dashboard" aria-hidden="true">
                <BrowserPreview />
              </MockupFrame>
              <div className="mt-3 flex justify-end md:absolute md:-top-3 md:right-7 md:mt-0">
                <DeviceBadge>Web App</DeviceBadge>
              </div>
            </div>

            <div className="relative mx-auto w-[min(100%,200px)] md:absolute md:bottom-0 md:left-0 md:mx-0">
              <MockupFrame variant="phone" aria-hidden="true">
                <PhonePreview />
              </MockupFrame>
              <div className="mt-3 flex justify-center md:absolute md:left-full md:top-16 md:ml-4 md:mt-0 md:block">
                <DeviceBadge>Mobile App</DeviceBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
