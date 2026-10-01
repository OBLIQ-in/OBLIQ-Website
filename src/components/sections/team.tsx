import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/lib/team";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * "Team Behind OBLIQ.io" — founder cards under the join form on /contact-us.
 * Driven entirely by `src/lib/team.ts`. Server component.
 */
export function TeamSection() {
  return (
    <section
      aria-labelledby="team-heading"
      className="bg-[var(--contact-bg-bottom)] px-4 pb-24 pt-8"
    >
      <div className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-10">
        <Reveal className="flex flex-col items-center text-center font-rounded">
          <span className="rounded-full bg-[var(--pill)] px-3 pb-2 pt-[9px] text-xs font-semibold uppercase leading-[15px] text-[var(--eyebrow-brown)]">
            team
          </span>
          <h2
            id="team-heading"
            className="mt-4 text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)] md:text-[52px]"
          >
            Team Behind OBLIQ.io
          </h2>
        </Reveal>

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {team.map((member, i) => (
            <li key={member.name} className="flex">
              <Reveal index={i} className="flex w-full">
                <article className="flex w-full flex-col items-center gap-4 rounded-2xl bg-[var(--surface)]/70 p-8 text-center font-rounded">
                  <span
                    aria-hidden="true"
                    className="flex size-20 items-center justify-center rounded-full bg-[var(--sky-card)] text-xl font-semibold text-[var(--ink)]"
                  >
                    {initials(member.name)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-[var(--ink)]">{member.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--eyebrow-brown)]">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                    {member.credentials.join(" | ")}
                  </p>
                  <Button
                    href={member.linkedin}
                    aria-label={`Connect with ${member.name} on LinkedIn (opens in a new tab)`}
                    className="mt-auto"
                  >
                    Connect
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </Button>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
