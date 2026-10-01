import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "browser" | "phone" | "app";

export interface MockupFrameProps extends HTMLAttributes<HTMLElement> {
  /**
   * browser — window with a top bar (three dots + URL pill).
   * phone   — rounded phone body with a notch, 9:19.
   * app     — screenshot on a sky-to-peach panel, cut off at the bottom.
   */
  variant?: Variant;
  /** Browser only: the address shown in the URL pill. */
  url?: string;
  /** Caption shown under the frame. */
  label?: string;
  children?: ReactNode;
}

/**
 * Frame for product screenshots. The frame stays light in dark mode
 * (`.theme-light`), like a real screenshot would. Children fill the frame: pass an `<Image>`
 * (from brand-assets via getBrandAssetUrl) or any placeholder markup. With no
 * children the frame shows an empty `bg-mist` surface.
 */
export function MockupFrame({
  variant = "browser",
  url = "obliq.in",
  label,
  children,
  className,
  ...props
}: MockupFrameProps) {
  return (
    <figure className={cn("flex w-full flex-col items-center gap-3", className)} {...props}>
      {variant === "browser" && (
        <div className="theme-light w-full overflow-hidden rounded-[20px] bg-mist shadow-2xl shadow-ink/10">
          <div className="flex h-[38px] items-center gap-4 border-b border-[var(--border)] bg-[var(--cream-2)] px-4">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <span className="flex h-5 w-full max-w-[260px] items-center truncate rounded-full bg-black/5 px-3 text-[10px] text-[var(--muted)]">
              {url}
            </span>
          </div>
          <div className="relative min-h-40">{children}</div>
        </div>
      )}

      {variant === "phone" && (
        <div className="theme-light relative aspect-[9/19] w-full max-w-[280px] rounded-[2.5rem] bg-ink p-2.5 shadow-2xl shadow-ink/10">
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-mist">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink"
            />
            {children}
          </div>
        </div>
      )}

      {variant === "app" && (
        // The screenshot runs 20px past the panel's bottom edge and is clipped there
        <div className="theme-light w-full overflow-hidden rounded-3xl bg-[linear-gradient(180deg,var(--mockup-app-top),var(--mockup-app-bottom))] px-6 pt-12 shadow-2xl shadow-ink/10 md:px-10 md:pt-[100px]">
          <div className="relative -mb-5 min-h-40 overflow-hidden rounded-[20px] bg-mist">
            {children}
          </div>
        </div>
      )}

      {label && (
        <figcaption className="text-center font-rounded text-sm text-[var(--ink-muted)]">{label}</figcaption>
      )}
    </figure>
  );
}
