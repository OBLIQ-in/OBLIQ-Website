import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

export interface MockupFrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the frame */
  variant?: "app" | "browser";
  /** Optional title or URL shown in the window header */
  title?: string;
  /** Inner content of the mockup */
  children?: ReactNode;
}

/**
 * MockupFrame — renders a polished application or browser window container
 * with window chrome controls, header bar, and shadow.
 *
 * @example
 * <MockupFrame variant="app" title="obliq.in/projects">
 *   <ProductMockUI />
 * </MockupFrame>
 */
export function MockupFrame({
  variant = "app",
  title = "obliq.in/projects",
  children,
  className,
  ...props
}: MockupFrameProps) {
  return (
    <div
      className={cn(
        "card w-full overflow-hidden transition-all duration-300",
        "rounded-[20px] border border-[rgba(0,0,0,0.07)]",
        "shadow-[0_8px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
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

        {variant === "app" && title && (
          <div
            className="flex-1 mx-3 sm:mx-4 h-5 rounded-full flex items-center px-3"
            style={{ background: "rgba(0,0,0,0.05)", maxWidth: "260px" }}
          >
            <span className="text-[10px] sm:text-[11px] font-mono text-[var(--muted)] truncate">
              {title}
            </span>
          </div>
        )}
      </div>

      {/* ── Mockup Content Body ── */}
      <div className="bg-[#faf9f7] w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
