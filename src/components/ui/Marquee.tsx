import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Elements or items to scroll.
   */
  children: React.ReactNode;
  /**
   * Reverse direction of scroll (slides rightwards instead of leftwards).
   * @default false
   */
  reverse?: boolean;
  /**
   * Pause animation when hovered.
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Duration of a single full loop in seconds, or a valid CSS duration string.
   * @default 28
   */
  duration?: number | string;
  /**
   * Number of times children are repeated within each loop half so the track
   * is wider than wide viewports (2560px).
   * @default 4
   */
  repeat?: number;
  /**
   * Whether to apply the edge fade gradient mask (minimum 48px per responsive audit).
   * @default true
   */
  fade?: boolean;
  /**
   * Additional classes for the outer wrapper.
   */
  className?: string;
  /**
   * Additional classes for the inner scrolling track.
   */
  innerClassName?: string;
  /**
   * Gap between items. Can be customized with a Tailwind gap class.
   * @default "gap-12 sm:gap-16 pr-12 sm:pr-16"
   */
  itemContainerClassName?: string;
}

/**
 * Marquee — Infinite horizontal scrolling marquee.
 *
 * Implements seamless CSS loop animation via `@keyframes marquee`.
 * Duplicates content across two identical halves so the -50% translateX loop
 * never reveals gaps.
 *
 * Features:
 * - Hover pause via `group-hover:[animation-play-state:paused]`
 * - Reduced motion support: stops animation, centers items, and hides duplicate tracks
 * - Accessible: hides duplicate loops from assistive tech (`aria-hidden="true"`)
 * - Responsive edge-fade mask (min 48px)
 */
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  duration = 28,
  repeat = 4,
  fade = true,
  className,
  innerClassName,
  itemContainerClassName = "gap-12 sm:gap-16 pr-12 sm:pr-16",
  ...props
}: MarqueeProps) {
  const durationStr = typeof duration === "number" ? `${duration}s` : duration;

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_max(10%,48px),black_calc(100%-max(10%,48px)),transparent)] motion-reduce:[mask-image:none]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-max animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          "motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center motion-reduce:flex-wrap",
          innerClassName
        )}
        style={{ animationDuration: durationStr }}
      >
        {[0, 1].map((halfIndex) => (
          <div
            key={halfIndex}
            aria-hidden={halfIndex > 0 ? true : undefined}
            className={cn(
              "flex shrink-0 items-center",
              halfIndex > 0
                ? "motion-reduce:hidden"
                : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
            )}
          >
            {Array.from({ length: repeat }).map((_, repeatIndex) => (
              <div
                key={repeatIndex}
                aria-hidden={halfIndex > 0 || repeatIndex > 0 ? true : undefined}
                className={cn(
                  "flex shrink-0 items-center",
                  itemContainerClassName,
                  repeatIndex > 0 && "motion-reduce:hidden",
                  repeatIndex === 0 &&
                    halfIndex === 0 &&
                    "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 motion-reduce:gap-8 sm:motion-reduce:gap-12"
                )}
              >
                {children}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;

