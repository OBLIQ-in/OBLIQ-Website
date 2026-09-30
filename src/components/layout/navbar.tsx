"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navbar — floating pill style matching obliqq.framer.ai
 * - Centered floating glass pill
 * - OBLIQ.in logo (pixel block style)
 * - Nav links + "Try Obliq free" dark CTA
 * - Mobile hamburger overlay
 */
export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Features",     href: "/features" },
    { label: "Benefits",     href: "/about"    },
    { label: "Pricing",      href: "/pricing"  },
    { label: "Blog",         href: "/blog"     },
    { label: "Join Our Team",href: "/contact"  },
  ];

  return (
    <>
      {/* ── Desktop / Tablet floating pill header ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-start justify-center",
          "transition-all duration-300",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div
          className="navbar-pill mx-4 w-full flex items-center justify-between gap-4"
          style={{ maxWidth: "1120px", padding: "10px 14px 10px 20px" }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Obliq home"
            className="flex items-center gap-1 flex-shrink-0 group"
          >
            <span
              className="font-black tracking-tight leading-none text-[var(--charcoal)] group-hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "1.3rem",
                letterSpacing: "-0.02em",
                border: "2px solid var(--charcoal)",
                padding: "2px 6px",
                borderRadius: "4px",
                lineHeight: 1,
              }}
            >
              OBLIQ
            </span>
            <span
              className="text-[var(--muted)]"
              style={{ fontSize: "0.6rem", alignSelf: "flex-end", marginBottom: "2px", fontWeight: 500 }}
            >
              .in
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-[rgba(0,0,0,0.07)] text-[var(--charcoal)]"
                      : "text-[var(--charcoal)] opacity-65 hover:opacity-100 hover:bg-[rgba(0,0,0,0.05)]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link href="/contact" className="btn-primary hidden md:inline-flex" style={{ fontSize: "0.875rem", padding: "0.55rem 1.25rem" }}>
            Try Obliq free
          </Link>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            className={cn(
              "md:hidden flex items-center justify-center h-9 w-9 rounded-full",
              "text-[var(--charcoal)] hover:bg-[rgba(0,0,0,0.06)] transition-colors"
            )}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen
              ? <X    className="h-5 w-5" aria-hidden="true" />
              : <Menu className="h-5 w-5" aria-hidden="true" />
            }
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-40 md:hidden flex flex-col",
          "bg-[var(--cream)] transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-[72px] flex-shrink-0" />
        <div className="flex-1 overflow-y-auto px-5 py-8 flex flex-col gap-2">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-5 py-4 rounded-2xl text-lg font-semibold transition-all",
                  active
                    ? "bg-[rgba(0,0,0,0.06)] text-[var(--charcoal)]"
                    : "text-[var(--charcoal)] opacity-60 hover:opacity-100 hover:bg-[rgba(0,0,0,0.04)]"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="divider my-4" />
          <Link href="/contact" className="btn-primary text-center text-base py-4">
            Try Obliq free
          </Link>
        </div>
      </div>
    </>
  );
}
