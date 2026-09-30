import type { Metadata } from "next";
import { JoinForm } from "@/components/sections/join-form";

export const metadata: Metadata = {
  title: "Join Our Team",
  description:
    "Build the future of AI with OBLIQ. Apply for an open role on our team — community, content, product/UI or CA partnerships.",
};

/** /contact-us — the "Join our team" page, matching obliqq.framer.ai/contact-us. */
export default function ContactUsPage() {
  return (
    <section
      aria-labelledby="join-heading"
      className="bg-[linear-gradient(180deg,var(--contact-bg-top),var(--contact-bg-bottom))] px-4 pb-16 pt-32 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-10">
        <div className="flex flex-col items-center text-center font-rounded">
          <span className="rounded-full bg-[var(--pill)] px-3 pb-2 pt-[9px] text-xs font-semibold uppercase leading-[15px] text-[var(--eyebrow-brown)]">
            Join our team
          </span>
          <h1
            id="join-heading"
            className="mt-4 text-[40px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)] md:text-[76px]"
          >
            Build the Future of AI with Us
          </h1>
          <p className="mt-3 text-base leading-[1.5] text-[var(--ink-soft)] md:text-xl">
            Have questions about Obliq? Join Our Team and we&rsquo;ll be happy to work with you.
          </p>
        </div>

        <JoinForm />
      </div>
    </section>
  );
}
