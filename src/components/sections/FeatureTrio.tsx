import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/**
 * FeatureTrio — three equal cards at the bottom of the features section:
 * collaborate in realtime, speaks your language, view things your way.
 * Matches obliqq.framer.ai. Server component.
 *
 * The icons are the same outline icons the Framer site uses, inlined here.
 */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "h-6 w-6",
} as const;

const HandshakeIcon = () => (
  <svg {...iconProps}>
    <path d="M 15 1.5 L 11.25 5.25 L 5.25 3.75 L 0 0" style={{ transform: "translate(3.75px, 12.75px)" }} />
    <path d="M 0 1.372 L 5.186 0 L 10.373 1.372" style={{ transform: "translate(6.814px, 5.25px)" }} />
    <path d="M 2.472 0.414 L 0.079 5.201 C -0.106 5.571 0.044 6.022 0.414 6.207 L 3 7.5 L 6.063 1.371 L 3.479 0.08 C 3.301 -0.01 3.095 -0.024 2.906 0.038 C 2.717 0.101 2.561 0.236 2.472 0.414 Z" style={{ transform: "translate(0.75px, 5.25px)" }} />
    <path d="M 3.064 7.5 L 5.649 6.207 C 6.019 6.022 6.169 5.571 5.984 5.201 L 3.592 0.414 C 3.502 0.236 3.346 0.101 3.157 0.038 C 2.969 -0.024 2.763 -0.01 2.585 0.08 L 0 1.371 Z" style={{ transform: "translate(17.186px, 5.25px)" }} />
    <path d="M 8.25 0 L 4.5 0 L 0.22 4.152 C 0.059 4.313 -0.021 4.539 0.005 4.765 C 0.03 4.992 0.157 5.195 0.349 5.317 C 1.991 6.366 4.219 6.293 6 4.5 L 9.75 7.5 L 11.25 6" style={{ transform: "translate(9px, 6.75px)" }} />
    <path d="M 6.381 2.742 L 2.469 1.764 L 0 0" style={{ transform: "translate(5.25px, 17.508px)" }} />
  </svg>
);

const LanguageIcon = () => (
  <svg {...iconProps}>
    <path
      style={{ transform: "translate(3px, 3px)" }}
      d="M 7.5 18 L 12.75 6.75 L 18 18 M 9 15 L 16.5 15 M 0 2.621 C 1.966 2.376 3.968 2.25 6 2.25 M 6 2.25 C 7.121 2.25 8.233 2.288 9.334 2.364 M 6 2.25 L 6 0 M 9.334 2.364 C 8.176 7.658 4.689 12.08 0 14.502 M 9.334 2.364 C 10.23 2.425 11.119 2.511 12 2.621 M 7.411 11.116 C 5.786 9.462 4.477 7.495 3.584 5.314"
    />
  </svg>
);

const ViewsIcon = () => (
  <svg {...iconProps}>
    <path style={{ transform: "translate(2.25px, 6px)" }} d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 L 7.125 0 C 7.746 0 8.25 0.504 8.25 1.125 L 8.25 4.875 C 8.25 5.496 7.746 6 7.125 6 L 1.125 6 C 0.504 6 0 5.496 0 4.875 Z" />
    <path style={{ transform: "translate(14.25px, 7.5px)" }} d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 L 6.375 0 C 6.996 0 7.5 0.504 7.5 1.125 L 7.5 9.375 C 7.5 9.996 6.996 10.5 6.375 10.5 L 1.125 10.5 C 0.504 10.5 0 9.996 0 9.375 Z" />
    <path style={{ transform: "translate(3.75px, 15px)" }} d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 L 6.375 0 C 6.996 0 7.5 0.504 7.5 1.125 L 7.5 3.375 C 7.5 3.996 6.996 4.5 6.375 4.5 L 1.125 4.5 C 0.504 4.5 0 3.996 0 3.375 Z" />
  </svg>
);

const features: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Collaborate in realtime",
    text: "Keep every conversation in sync use comments, messages, and project chats to stay on the same page.",
    icon: <HandshakeIcon />,
  },
  {
    title: "Speaks your language",
    text: "Set your language, currency, time, and date preferences for a seamless experience that feels truly local.",
    icon: <LanguageIcon />,
  },
  {
    title: "View things your way",
    text: "Easily toggle between various views, including Kanban, cards, list, table, timeline, and calendar.",
    icon: <ViewsIcon />,
  },
];

export function FeatureTrio() {
  return (
    <ul className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
      {features.map((feature, i) => (
        <li key={feature.title}>
          <Reveal index={i} className="h-full">
            <article className="flex h-full min-h-[304px] flex-col justify-between gap-[68px] rounded-3xl bg-[var(--feature-card)] p-8 font-rounded">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-[0_4px_50px_rgba(97,74,68,0.1)]">
                {feature.icon}
              </span>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.03em] text-[var(--ink)]">
                  {feature.title}
                </h3>
                <p className="text-base leading-6 text-[var(--ink-soft)]">{feature.text}</p>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
