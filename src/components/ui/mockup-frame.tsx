import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

type Variant = "browser" | "phone" | "app";

export interface MockupFrameProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * app / browser — window frame with top bar chrome controls.
   * phone         — rounded phone body with notch.
   */
  variant?: Variant;
  /** Address or title shown in the URL pill */
  url?: string;
  /** Optional window title */
  title?: string;
  /** Optional caption under the frame */
  label?: string;
  /** Inner content of the mockup */
  children?: ReactNode;
}

/**
 * MockupFrame — renders a polished application, browser, or device mockup frame
 * with window chrome controls, header bar, and shadow.
 *
 * @example
 * <MockupFrame variant="app" title="obliq.in/projects">
 *   <ProductMockUI />
 * </MockupFrame>
 */
export function MockupFrame({
  variant = "app",
  url,
  title,
  label,
  children,
  className,
  ...props
}: MockupFrameProps) {
  const displayTitle = title || url || "obliq.in";

  return (
    <figure className={cn("flex w-full flex-col items-center gap-3", className)} {...props}>
      {(variant === "app" || variant === "browser") && (
        <div
          className={cn(
            "card w-full overflow-hidden transition-all duration-300",
            "rounded-[20px] border border-[rgba(0,0,0,0.07)]",
            "shadow-[0_8px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
          )}
        >
          {/* ── Window Chrome Bar ── */}
          <div
            className="flex items-center gap-2 px-4 border-b border-[rgba(0,0,0,0.06)]"
            style={{ background: "#f2f0eb", height: "38px" }}
          >
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-90" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-90" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-90" />
            </div>

            {displayTitle && (
              <span className="flex h-5 w-full max-w-[260px] items-center truncate rounded-full bg-black/5 px-3 text-[10px] font-mono text-[var(--body-text)]">
                {displayTitle}
              </span>
            )}
          </div>

          {/* ── Mockup Content Body ── */}
          <div className="bg-[#faf9f7] w-full overflow-hidden">{children}</div>
        </div>
      )}

      {variant === "phone" && (
        <div className="relative aspect-[9/19] w-full max-w-[280px] rounded-[2.5rem] bg-[var(--charcoal)] p-2.5 shadow-2xl">
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-mist">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[var(--charcoal)]"
            />
            {children}
          </div>
        </div>
      )}

      {label && (
        <figcaption className="text-center font-rounded text-sm text-[var(--muted)]">{label}</figcaption>
      )}
    </figure>
  );
}
