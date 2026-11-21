import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Community() {
  // Safely cast links without using 'any' to satisfy TypeScript strict mode
  const links = siteConfig.links as Record<string, string>;

  return (
    <section className="section bg-[var(--cream)]" aria-label="Community">
      <Container>
        <div className="mb-14">
          <SectionHeading 
            eyebrow="Community"
            heading="Stay in the loop"
            subheading="Join our growing community of early adopters, founders, and developers."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LinkedIn Card */}
          <a 
            href={links?.linkedin || "https://linkedin.com/company/obliq-in"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card p-6 flex flex-col gap-10 group hover:border-[rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="bg-[var(--cream-pill)] text-[var(--charcoal)] text-xs font-bold px-3 py-1.5 rounded-full">
                0.5K followers
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--charcoal)] mb-1">LinkedIn</h3>
              <p className="text-sm text-[var(--muted)] flex items-center gap-1 group-hover:text-[var(--charcoal)] transition-colors font-medium">
                Connect with us <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </a>

          {/* Facebook Card */}
          <a 
            href={links?.facebook || "https://facebook.com/obliq.in"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card p-6 flex flex-col gap-10 group hover:border-[rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="bg-[var(--cream-pill)] text-[var(--charcoal)] text-xs font-bold px-3 py-1.5 rounded-full">
                10K followers
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--charcoal)] mb-1">Facebook</h3>
              <p className="text-sm text-[var(--muted)] flex items-center gap-1 group-hover:text-[var(--charcoal)] transition-colors font-medium">
                Join us <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </a>

          {/* GitHub Discussions Card */}
          <a 
            href={links?.github ? `${links.github}/discussions` : "https://github.com/obliq-in/discussions"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card p-6 flex flex-col gap-10 group hover:border-[rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-full bg-[var(--charcoal)] text-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="bg-[var(--cream-pill)] text-[var(--charcoal)] text-xs font-bold px-3 py-1.5 rounded-full">
                Open Source
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--charcoal)] mb-1">Discussions</h3>
              <p className="text-sm text-[var(--muted)] flex items-center gap-1 group-hover:text-[var(--charcoal)] transition-colors font-medium">
                Join the conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}