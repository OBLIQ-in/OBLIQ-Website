"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Delay between siblings when using `index` for a staggered group. */
const STAGGER_MS = 60;

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Position in a staggered group — adds `index × 60ms` of delay */
  index?: number;
  /** Extra delay in ms, added on top of the stagger */
  delay?: number;
}

// One observer shared by every Reveal on the page.
let observer: IntersectionObserver | undefined;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-reveal", "shown");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  return observer;
}

/**
 * Reveal — fades content in with a 16px rise the first time it scrolls
 * into view. The site's single scroll-animation primitive: use it instead
 * of one-off animations.
 *
 * Nothing is hidden in the server HTML: after mount, only elements still
 * below the fold are hidden and then revealed on scroll. Content already on
 * screen (and every page without JavaScript) is visible immediately, so LCP
 * isn't delayed. Only opacity/transform animate (no layout shift), and with
 * `prefers-reduced-motion: reduce` nothing moves. Styles: `.reveal` in globals.css.
 *
 * @example
 * {items.map((item, i) => (
 *   <Reveal key={item.id} index={i}>…</Reveal>
 * ))}
 */
export function Reveal({ index = 0, delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen: leave it visible rather than flashing it out and back in
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;

    el.setAttribute("data-reveal", "pending");
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${index * STAGGER_MS + delay}ms`, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
