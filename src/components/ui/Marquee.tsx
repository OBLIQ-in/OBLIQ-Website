import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "style"> & {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
};

function Marquee({
  children,
  speed = 45,
  direction = "left",
  pauseOnHover = false,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee", className)}
      style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      {...props}
    >
      <div
        className={cn(
          "marquee-track",
          direction === "right" && "marquee-track-right",
          pauseOnHover && "marquee-track-pause-on-hover"
        )}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export { Marquee };
export type { MarqueeProps };