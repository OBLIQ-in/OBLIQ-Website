import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section 
      className="hero-sky relative overflow-hidden min-h-screen flex flex-col"
      aria-label="Page not found"
    >
      {/* ── Cloud: left ── */}
      <div
        className="pointer-events-none absolute transition-transform duration-700 ease-out animate-float"
        style={{ top: "25%", left: "-15%", width: "500px", height: "300px", animationDelay: "0ms" }}
        aria-hidden="true"
      >
        <div style={{
          width: "100%", height: "100%",
          background: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
          filter: "blur(45px)",
        }} />
      </div>

      {/* ── Cloud: right ── */}
      <div
        className="pointer-events-none absolute transition-transform duration-700 ease-out animate-float"
        style={{ top: "30%", right: "-15%", width: "450px", height: "250px", animationDelay: "500ms" }}
        aria-hidden="true"
      >
        <div style={{
          width: "100%", height: "100%",
          background: "rgba(255,255,255,0.65)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }} />
      </div>

      {/* ── Spacer for floating navbar ── */}
      <div className="h-[120px] flex-shrink-0" />

      {/* ── Main content ── */}
      <div className="container-obliq flex-1 flex flex-col items-center justify-center text-center pb-24 z-10">
        
        {/* Eyebrow Pill */}
        <div 
          className="mb-10 rounded-full bg-white shadow-sm border border-[rgba(0,0,0,0.04)] animate-fade-up inline-flex items-center justify-center"
          style={{ padding: "8px 24px" }}
        >
          <span className="text-[11px] font-bold tracking-[0.1em] text-[var(--muted)] uppercase whitespace-nowrap">
            Page not found
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-bold leading-[1.1] tracking-tight text-[var(--charcoal)] animate-fade-up"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            maxWidth: "800px",
            animationDelay: "80ms",
          }}
        >
          Obliq can&apos;t<br />track this page.
        </h1>

        {/* Subheading */}
        <p
          className="mt-8 animate-fade-up max-w-[500px] mx-auto text-[var(--body-text)]"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.6,
            animationDelay: "160ms",
          }}
        >
          Looks like this page is missing. Try heading back<br className="hidden sm:block" /> or exploring something new.
        </p>

        {/* CTA button */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Button 
            href="/" 
            variant="primary" 
            size="lg" 
            className="whitespace-nowrap"
            style={{ padding: "14px 36px", fontSize: "16px" }}
          >
            Go home
          </Button>
        </div>
      </div>

      {/* ── Fade to cream at bottom ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height: "150px", background: "linear-gradient(to bottom, transparent, var(--cream))" }}
        aria-hidden="true"
      />
    </section>
  );
}