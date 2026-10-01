import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";

/**
 * Global MDX component overrides (required by @next/mdx in the App Router).
 * Typography itself comes from the `.prose-obliq` class in globals.css —
 * here we only swap in components that need behaviour, like client-side
 * navigation for internal links and keyboard access to code blocks.
 */
const components: MDXComponents = {
  // Code blocks can scroll sideways, so they must be reachable by keyboard
  pre: (props: HTMLAttributes<HTMLPreElement>) => <pre tabIndex={0} {...props} />,
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
