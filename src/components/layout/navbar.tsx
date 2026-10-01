"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navbar — floating pill style matching obliqq.framer.ai
 * - Centered floating glass pill
 * - OBLIQ.in logo (pixel block style)
 * - Nav links + "Try Obliq free" dark CTA
 * - Mobile hamburger overlay: animates in, locks body scroll, traps focus,
 *   closes on Escape and hands focus back to the toggle
 */
export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);
  const wasOpen   = useRef(false);

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

  // Focus management: move focus into the open menu, keep Tab cycling between
  // the toggle (the visible close button) and the menu links, close on Escape,
  // and return focus to the toggle once the menu closes.
  useEffect(() => {
    if (!menuOpen) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const focusables = () => [
      toggleRef.current,
      ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
    ].filter((el): el is HTMLElement => el !== null);

    focusables()[1]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items  = focusables();
      const first  = items[0];
      const last   = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement | null;
      if (!active || !items.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // The menu is md:hidden — close it if the viewport grows past that, so the
  // scroll lock and focus trap don't outlive the visible menu.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // Section pages (e.g. /blog/some-post) keep their parent link active.
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-150",
                    // Lime underline that grows from the left on hover/focus, and stays on the active link
                    "after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--lime)]",
                    "after:origin-left after:transition-transform after:duration-200 after:ease-out",
                    "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                    active ? "after:scale-x-100" : "after:scale-x-0",
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
          <Link href="/contact" data-analytics-cta="navbar" className="btn-primary hidden md:inline-flex" style={{ fontSize: "0.875rem", padding: "0.55rem 1.25rem" }}>
            Try Obliq free
          </Link>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            ref={toggleRef}
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
        ref={menuRef}
        role="dialog"
        aria-label="Mobile navigation"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 md:hidden flex flex-col",
          "bg-[var(--cream)] transition-[opacity,transform] duration-200 ease-out",
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="h-[72px] flex-shrink-0" />
        <div className="flex-1 overflow-y-auto px-5 py-8 flex flex-col gap-2">
          {navLinks.map((item) => {
            const active = isActive(item.href);
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
          <Link href="/contact" data-analytics-cta="mobile-menu" className="btn-primary text-center text-base py-4">
            Try Obliq free
          </Link>
        </div>
      </div>
    </>
  );
}
