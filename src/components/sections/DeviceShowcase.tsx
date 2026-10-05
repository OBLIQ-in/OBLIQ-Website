import { SectionHeading } from "@/components/ui/section-heading";
import { MockupFrame } from "@/components/ui/mockup-frame";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

const SKY =
  "linear-gradient(180deg, var(--mockup-app-top), var(--mockup-app-bottom))";

export function DeviceShowcase() {
  return (
    <section id="device-showcase" aria-label="Device showcase" className="section">
      <div className="container-obliq">
        <SectionHeading
          eyebrow="Seamless across devices"
          heading="Work from anywhere, stay in sync"
          subheading="Start on your laptop, pick up on your phone. Every task and review stays up to date."
        />

        <div className="mt-12 flex justify-center">
          <div className="w-[94%]">
            <div className="flex flex-col items-center gap-10 lg:relative lg:mb-10 lg:mt-16 lg:block">
              <Reveal className="flex w-full flex-col items-center gap-3 lg:ml-auto lg:w-[85%] lg:items-end">
                <Badge>Web App</Badge>

                <MockupFrame variant="browser" url="obliq.in/dashboard">
                  <BrowserArt />
                </MockupFrame>
              </Reveal>

              <Reveal
                index={1}
                className="flex w-[200px] flex-col items-center gap-3 lg:absolute lg:-bottom-8 lg:left-0 lg:z-10"
              >
                <Badge>Mobile App</Badge>

                <MockupFrame variant="phone">
                  <PhoneArt />
                </MockupFrame>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserArt() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[300px] lg:min-h-[400px]"
      style={{ background: SKY }}
    >
      <div className="hidden w-40 flex-shrink-0 flex-col gap-2 bg-white/50 p-4 lg:flex">
        <div className="mb-3 h-4 w-16 rounded bg-black/20" />

        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-3 rounded ${
              i === 0 ? "w-24 bg-black/20" : "w-20 bg-black/10"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="h-4 w-40 rounded bg-black/20" />

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-white/70" />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 rounded-xl bg-white/70 p-4">
          {[100, 85, 92, 70].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded bg-black/10"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneArt() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col gap-3 px-3 pb-3 pt-11"
      style={{ background: SKY }}
    >
      <div className="flex items-center gap-2">
        <div className="h-3.5 w-3.5 rounded bg-black/20" />
        <span className="text-xs font-semibold tracking-wide text-black/60">
          OBLIQ
        </span>
      </div>

      <div className="h-16 rounded-2xl bg-white/70" />

      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 rounded-xl bg-white/70 p-2.5"
        >
          <div className="h-5 w-5 flex-shrink-0 rounded-full bg-black/15" />

          <div className="flex flex-1 flex-col gap-1.5">
            <div className="h-2 w-3/4 rounded bg-black/20" />
            <div className="h-2 w-1/2 rounded bg-black/10" />
          </div>
        </div>
      ))}
    </div>
  );
}