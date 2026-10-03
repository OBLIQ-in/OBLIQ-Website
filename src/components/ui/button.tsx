import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full",
    "transition-all duration-200 cursor-pointer select-none relative overflow-hidden whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:   ["bg-[var(--charcoal)] text-[var(--on-ink)]", "hover:opacity-85 active:scale-[0.97]"],
        secondary: ["bg-[var(--cream-pill)] text-[var(--charcoal)]", "hover:bg-[var(--cream-pill-hover)] active:scale-[0.97]"],
        outline:   ["border border-[rgb(var(--tint-rgb)/0.15)] text-[var(--charcoal)] bg-transparent", "hover:bg-[var(--cream-2)] active:scale-[0.97]"],
        ghost:     ["text-[var(--charcoal)] bg-transparent", "hover:bg-[var(--cream-2)] active:scale-[0.97]"],
        rust:      ["bg-[var(--rust)] text-white", "hover:opacity-85 active:scale-[0.97]"],
      },
      size: {
        sm:   "h-8  px-4  text-xs",
        md:   "h-10 px-5  text-sm",
        lg:   "h-12 px-7  text-base",
        xl:   "h-14 px-9  text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;
type AsButton = ComponentPropsWithoutRef<"button"> & { href?: never };
type AsLink   = ComponentPropsWithoutRef<typeof Link> & { href: string };

interface ButtonExtras {
  /** Rendered before the label, spaced by the pill's `gap-2` */
  leftIcon?: ReactNode;
  /** Rendered after the label, spaced by the pill's `gap-2` */
  rightIcon?: ReactNode;
  /** Swaps the left icon for a spinner, sets `aria-busy` and blocks interaction */
  loading?: boolean;
}

type ButtonProps = ButtonVariants & ButtonExtras & (AsButton | AsLink);

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export function Button({
  variant,
  size,
  className,
  leftIcon,
  rightIcon,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), loading && "pointer-events-none", className);
  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      {children}
      {rightIcon}
    </>
  );
  const busy = loading ? { "aria-busy": true } : {};

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AsLink;
    const isExternal = href.startsWith("http");
    return (
      <Link href={href} className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as Omit<AsLink, "href">)}
        {...busy}
        {...(loading ? { "aria-disabled": true, tabIndex: -1 } : {})}
      >
        {content}
      </Link>
    );
  }
  const { disabled, ...rest } = props as AsButton;
  return (
    <button className={classes} disabled={disabled || loading} {...rest} {...busy}>
      {content}
    </button>
  );
}

export { buttonVariants };
export type { ButtonProps };
