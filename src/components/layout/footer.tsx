import Link from "next/link";
import { GitFork, Share2, MessageCircle, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "GitHub",  href: siteConfig.links.github,  icon: <GitFork  className="h-3.5 w-3.5" aria-hidden="true" /> },
  { label: "Twitter", href: siteConfig.links.twitter,  icon: <Share2   className="h-3.5 w-3.5" aria-hidden="true" /> },
  { label: "Discord", href: siteConfig.links.discord,  icon: <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[rgba(0,0,0,0.08)]"
      style={{ background: "var(--cream-2)" }}
      aria-label="Site footer"
    >
      <div className="container-obliq">
        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" aria-label="Obliq home" className="group w-fit flex items-center gap-1">
              <span
                className="font-black text-[var(--charcoal)] group-hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "1.1rem",
                  border: "2px solid var(--charcoal)",
                  padding: "2px 5px",
                  borderRadius: "4px",
                  lineHeight: 1,
                }}
              >
                OBLIQ
              </span>
              <span className="text-[var(--muted)] text-[0.6rem] font-medium self-end mb-0.5">.in</span>
            </Link>

            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[220px]">
              {siteConfig.description}
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Obliq on ${s.label}`}
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center",
                    "border border-[rgba(0,0,0,0.12)] text-[var(--charcoal)] opacity-50",
                    "hover:opacity-100 hover:border-[rgba(0,0,0,0.25)] transition-all duration-200"
                  )}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href={`mailto:${siteConfig.email.support}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors w-fit"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.email.support}
            </a>
          </div>

          {/* Nav columns */}
          {(
            [
              ["Product",   siteConfig.footerNav.product],
              ["Company",   siteConfig.footerNav.company],
              ["Community", siteConfig.footerNav.community],
              ["Legal",     siteConfig.footerNav.legal],
            ] as const
          ).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h2 className="eyebrow">{title}</h2>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.href}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                        >
                          {link.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="divider" />
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted)]">© {year} Obliq. MIT License.</p>
          <p className="text-xs text-[var(--muted)]">Built with ❤️ by the Obliq community</p>
        </div>
      </div>
    </footer>
  );
}
