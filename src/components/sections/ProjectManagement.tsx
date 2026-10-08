import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChipList } from "@/components/ui/chip-list";
import { MockupFrame } from "@/components/ui/mockup-frame";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Filter,
  ArrowUpRight,
} from "lucide-react";

/**
 * ProjectManagement — Section §04
 * "Keep every project moving forward"
 *
 * Requirements:
 * - Copy matching spec §04
 * - SectionHeading align="left", eyebrow="project management"
 * - ui/ChipList with Tasks, Time tracking, Timesheets, Reports
 * - CTA Button "Try Obliq free" (secondary variant) → /contact-us
 * - ui/MockupFrame variant="app"
 * - section id="features" scroll-mt-24
 * - Desktop: text left, image right. Mobile: stacked (image first).
 * - Background: bg-mist/50
 */
export function ProjectManagement() {
  const chips = ["Tasks", "Time tracking", "Timesheets", "Reports"];

  return (
    <section
      id="features"
      aria-label="Project Management"
      className="section scroll-mt-24 bg-[var(--cream-2)]/50"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Text Content (Left on Desktop, Below Image on Mobile) ── */}
          <div className="order-2 lg:order-1 flex flex-col items-start gap-6">
            <SectionHeading
              align="left"
              eyebrow="project management"
              heading="Keep every project moving forward"
              subheading="Plan, assign, and deliver your work - all in one place. With smart task tracking, deadlines, and real-time progress, you stay organized and clients stay confident."
            />

            <ChipList chips={chips} />

            <div className="pt-2">
              <Button href="/contact-us" variant="secondary" size="lg">
                Try Obliq free
              </Button>
            </div>
          </div>

          {/* ── Product Mockup (Right on Desktop, Above Text on Mobile) ── */}
          <div className="order-1 lg:order-2 w-full">
            <MockupFrame variant="app" title="obliq.in/projects/q3-compliance">
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                {/* ── Top App Bar ── */}
                <div className="flex items-center justify-between gap-3 border-b border-[rgba(0,0,0,0.06)] pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-[var(--charcoal)] text-white flex items-center justify-center font-bold text-xs">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[var(--charcoal)] leading-tight">
                        Q3 GST & Audit Workspace
                      </h4>
                      <p className="text-[10px] text-[var(--muted)]">Acme Corp • 12 deliverables</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--cream-pill)] text-[var(--charcoal)]">
                      <Filter className="h-3 w-3" aria-hidden="true" />
                      Filter
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--charcoal)] text-white">
                      78% Complete
                    </span>
                  </div>
                </div>

                {/* ── Task Items List ── */}
                <div className="flex flex-col gap-2.5">
                  {/* Task 1 */}
                  <div className="card p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:border-[rgba(0,0,0,0.12)] transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-5 w-5 rounded-md bg-[rgba(200,90,50,0.12)] flex items-center justify-center flex-shrink-0">
                        <Clock className="h-3 w-3 text-[var(--rust)]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-[var(--charcoal)] truncate">
                          GSTR-3B Filing & Input Credit Match
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--muted)]">
                          <span className="inline-flex items-center gap-0.5 text-[var(--rust)] font-medium">
                            <Calendar className="h-2.5 w-2.5" aria-hidden="true" /> Due in 2 days
                          </span>
                          <span>•</span>
                          <span>Assigned to Priya S.</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[rgba(200,90,50,0.1)] text-[var(--rust)] flex-shrink-0">
                      In Review
                    </span>
                  </div>

                  {/* Task 2 */}
                  <div className="card p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:border-[rgba(0,0,0,0.12)] transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-5 w-5 rounded-md bg-[rgba(59,130,246,0.12)] flex items-center justify-center flex-shrink-0">
                        <Clock className="h-3 w-3 text-[var(--blue-accent)]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-[var(--charcoal)] truncate">
                          Statutory Audit Vouching & Ledger Audit
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--muted)]">
                          <span className="text-[var(--muted)]">Due Oct 28</span>
                          <span>•</span>
                          <span>Assigned to Rahul M.</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[rgba(59,130,246,0.1)] text-[var(--blue-accent)] flex-shrink-0">
                      In Progress
                    </span>
                  </div>

                  {/* Task 3 */}
                  <div className="card p-3 sm:p-3.5 flex items-center justify-between gap-3 opacity-80">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-5 w-5 rounded-md bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-3 w-3 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-[var(--charcoal)] line-through opacity-75 truncate">
                          TDS 26Q Returns Validation
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--muted)]">
                          <span>Verified by Partner</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-700 flex-shrink-0">
                      Delivered
                    </span>
                  </div>
                </div>

                {/* ── Realtime Timesheet Tracker Footer ── */}
                <div className="card-cream p-3 rounded-xl flex items-center justify-between gap-2 mt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    <div>
                      <span className="text-[11px] font-semibold text-[var(--charcoal)] block leading-tight">
                        Live Timesheet Tracking
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">
                        Active timer: 02h 45m • GST Audit
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--charcoal)]">
                    <span>Timesheets</span>
                    <ArrowUpRight className="h-3 w-3 text-[var(--muted)]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </MockupFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
