"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getBrandAssetUrl } from "@/lib/assets";
import { MockupFrame } from "@/components/ui/mockup-frame";

/**
 * Screenshot swap path: while this is null the hero shows the CSS dashboard
 * mockup below. Once a real screenshot is in OBLIQ-in/brand-assets, set its
 * path here (e.g. "screenshots/dashboard.png") and the mockup is replaced.
 */
const HERO_SCREENSHOT: string | null = null;

/** Entrance stagger: eyebrow → headline → copy → CTAs → dashboard. */
const STAGGER_MS = 70;
const enter = (step: number) => ({ animationDelay: `${step * STAGGER_MS}ms` });

/**
 * Hero — matches obliqq.framer.ai exactly.
 *
 * Design:
 * - Sky blue gradient background (#B8D4E9 → #DDE9F5)
 * - Fluffy white cloud shapes (CSS blobs) on left + right
 * - Big centered headline (dark, ~80px, bold)
 * - Subheading paragraph (muted, max-w 560px)
 * - Two pill buttons: dark "Try Obliq free" + muted "See features"
 * - App screenshot / dashboard preview below
 * - Fade into cream body below
 *
 * Motion (all skipped with prefers-reduced-motion):
 * - Staggered fade + rise entrance via `.animate-fade-up` + `enter(step)`
 * - Dashboard tilts on hover on desktop pointers (`.hero-tilt`, pure CSS)
 * - Clouds drift with the mouse on desktop pointers
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Subtle mouse parallax on clouds */
  useEffect(() => {
    const allowed = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!allowed.matches) return;

    const onMove = (e: MouseEvent) => {
      const sec = sectionRef.current;
      if (!sec) return;
      const xPct = (e.clientX / window.innerWidth  - 0.5);
      const yPct = (e.clientY / window.innerHeight - 0.5);
      sec.querySelectorAll<HTMLElement>("[data-cloud]").forEach((el, i) => {
        const depth = i % 2 === 0 ? 12 : 8;
        el.style.transform = `translate(${xPct * depth}px, ${yPct * depth * 0.5}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="hero-sky relative overflow-hidden min-h-screen flex flex-col"
    >
      {/* ── Cloud: left ── */}
      <div
        data-cloud="l1"
        className="pointer-events-none absolute transition-transform duration-700 ease-out will-change-transform"
        style={{ top: "12%", left: "-6%", width: "340px", height: "180px" }}
        aria-hidden="true"
      >
        <div style={{
          width: "100%", height: "100%",
          background: "rgba(255,255,255,0.65)",
          borderRadius: "50%",
          filter: "blur(28px)",
        }} />
      </div>
      <div
        data-cloud="l2"
        className="pointer-events-none absolute transition-transform duration-700 ease-out will-change-transform"
        style={{ top: "20%", left: "-2%", width: "220px", height: "110px" }}
        aria-hidden="true"
      >
        <div style={{
          width: "100%", height: "100%",
          background: "rgba(255,255,255,0.5)",
          borderRadius: "50%",
          filter: "blur(18px)",
        }} />
      </div>

      {/* ── Cloud: right ── */}
      <div
        data-cloud="r1"
        className="pointer-events-none absolute transition-transform duration-700 ease-out will-change-transform"
        style={{ top: "10%", right: "-5%", width: "300px", height: "160px" }}
        aria-hidden="true"
      >
        <div style={{
          width: "100%", height: "100%",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "50%",
          filter: "blur(26px)",
        }} />
      </div>
      <div
        data-cloud="r2"
        className="pointer-events-none absolute transition-transform duration-700 ease-out will-change-transform"
        style={{ top: "22%", right: "0%", width: "200px", height: "100px" }}
        aria-hidden="true"
      >
        <div style={{
          width: "100%", height: "100%",
          background: "rgba(255,255,255,0.45)",
          borderRadius: "50%",
          filter: "blur(16px)",
        }} />
      </div>

      {/* ── Spacer for floating navbar ── */}
      <div className="h-[90px] flex-shrink-0" />

      {/* ── Main hero content — relative z-10 keeps it above the clouds, which
           sit over the centre of the hero on phones ── */}
      <div className="container-obliq relative z-10 flex-1 flex flex-col items-center justify-center text-center pb-0 pt-12">

        {/* Eyebrow — ink-soft (≈7:1 on the sky) instead of .eyebrow's default muted (≈4:1) */}
        <span className="eyebrow mb-5 text-balance animate-fade-up !text-ink-soft" style={enter(0)}>
          Compliance workflows for CA firms
        </span>

        {/* Headline */}
        <h1
          className="font-black leading-[1.05] tracking-tight text-[var(--charcoal)] animate-fade-up"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            maxWidth: "800px",
            ...enter(1),
          }}
        >
          {siteConfig.tagline}
        </h1>

        {/* Subheading */}
        <p
          className="mt-5 animate-fade-up"
          style={{
            color: "var(--body-text)",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            lineHeight: 1.7,
            maxWidth: "560px",
            ...enter(2),
          }}
        >
          {siteConfig.description}
        </p>

        {/* CTA buttons */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={enter(3)}
        >
          <Link href="/contact" data-analytics-cta="hero" className="btn-primary" style={{ fontSize: "1rem", padding: "0.75rem 1.75rem" }}>
            Try Obliq free
          </Link>
          <Link
            href="/features"
            className="btn-secondary"
            style={{ fontSize: "1rem", padding: "0.75rem 1.75rem" }}
          >
            See features
          </Link>
        </div>

        {/* ── App screenshot / dashboard preview ── */}
        <div
          className="mt-14 w-full animate-fade-up"
          style={{ maxWidth: "900px", ...enter(4) }}
        >
          {/* Tilt lives on the frame: the entrance animation owns the wrapper's transform */}
          <MockupFrame variant="browser" url="obliq.in/dashboard" className="hero-tilt">
            {HERO_SCREENSHOT ? (
              <Image
                src={getBrandAssetUrl(HERO_SCREENSHOT)}
                alt="Obliq dashboard"
                width={1800}
                height={1080}
                priority
                className="h-auto w-full"
              />
            ) : (
              <DashboardMockup />
            )}
          </MockupFrame>
        </div>
      </div>

      {/* ── Fade to cream at bottom ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height: "120px", background: "linear-gradient(to bottom, transparent, var(--cream))" }}
        aria-hidden="true"
      />
    </section>
  );
}

/** CSS stand-in for the product screenshot until HERO_SCREENSHOT is set. */
function DashboardMockup() {
  return (
    <div
      className="flex"
      style={{ background: "#faf9f7", minHeight: "320px" }}
    >
      {/* Sidebar */}
      <div
        className="flex-shrink-0 border-r border-[rgba(0,0,0,0.06)] p-4 flex flex-col gap-1"
        style={{ width: "180px", background: "#f5f3ef" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 rounded bg-[var(--charcoal)]" />
          <span className="text-xs font-semibold text-[var(--charcoal)]">OBLIQ</span>
        </div>
        {["Home", "Clients", "Projects", "Invoices", "Contracts", "Accounting"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
            style={{
              background: item === "Home" ? "rgba(0,0,0,0.07)" : "transparent",
            }}
          >
            <div className="h-3 w-3 rounded bg-[var(--muted)] opacity-40" />
            <span className="text-xs text-[var(--charcoal)] opacity-70">{item}</span>
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 p-6 flex flex-col gap-4">
        {/* Greeting */}
        <div>
          <p className="font-semibold text-sm text-[var(--charcoal)]">Hello, there 👋</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">What are you working on?</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total projects",    value: "24" },
            { label: "Active projects",   value: "12" },
            { label: "Completed",         value: "10" },
            { label: "Total hours",       value: "840h" },
          ].map((s) => (
            <div
              key={s.label}
              className="card-cream flex flex-col gap-1 p-3"
              style={{ borderRadius: "12px" }}
            >
              <span className="text-[10px] text-[var(--muted)]">{s.label}</span>
              <span className="text-lg font-bold text-[var(--charcoal)]">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="card p-4 flex flex-col gap-2" style={{ borderRadius: "14px" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--charcoal)]">Hours overview</span>
            <div className="flex gap-3">
              <span className="text-[10px] text-blue-600">● Billable</span>
              <span className="text-[10px] text-[var(--muted)]">● Non-Billable</span>
            </div>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-1.5 h-14 mt-2">
            {[55, 38, 70, 42, 65, 35, 80, 48, 72, 38, 60, 44].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5 items-center">
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${h * 0.8}%`,
                    background: i % 2 === 0 ? "#93b4d8" : "#c8d8e8",
                    opacity: 0.85,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — quick actions */}
      <div
        className="flex-shrink-0 border-l border-[rgba(0,0,0,0.06)] p-4 flex flex-col gap-3"
        style={{ width: "160px", background: "#f9f7f4" }}
      >
        <span className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wider">Quick actions</span>
        {["Draft a proposal", "Create a contract", "Add a form"].map((a) => (
          <div
            key={a}
            className="card flex flex-col items-center gap-2 p-3 cursor-pointer hover:bg-[var(--cream-2)] transition-colors"
            style={{ borderRadius: "12px" }}
          >
            <div className="h-7 w-7 rounded-lg bg-[var(--cream-pill)] flex items-center justify-center">
              <div className="h-3 w-3 rounded bg-[var(--muted)] opacity-50" />
            </div>
            <span className="text-[10px] text-center text-[var(--charcoal)] opacity-70 leading-tight">{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
