import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

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
type ButtonProps = ButtonVariants & (AsButton | AsLink);

export function Button({ variant, size, className, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AsLink;
    const isExternal = href.startsWith("http");
    return (
      <Link href={href} className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as Omit<AsLink, "href">)}
      />
    );
  }
  return <button className={classes} {...(props as AsButton)} />;
}

export { buttonVariants };
export type { ButtonProps };
