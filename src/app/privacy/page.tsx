import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Obliq website handles your data — what we collect, why, who we share it with, and the choices you have.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "29 September 2026";

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="flex flex-col gap-4 scroll-mt-28">
      <h2
        id={`${id}-heading`}
        className="text-xl font-bold tracking-tight text-[var(--charcoal)] sm:text-2xl"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

const sections = [
  { id: "who-we-are", title: "1. Who we are" },
  { id: "what-we-collect", title: "2. What we collect" },
  { id: "how-we-use-it", title: "3. How we use it" },
  { id: "third-parties", title: "4. Third-party services" },
  { id: "cookies", title: "5. Cookies and analytics" },
  { id: "retention", title: "6. How long we keep data" },
  { id: "your-rights", title: "7. Your rights" },
  { id: "children", title: "8. Children" },
  { id: "changes", title: "9. Changes to this policy" },
  { id: "contact", title: "10. Contact us" },
] as const;

export default function PrivacyPage() {
  return (
    <div className="section pt-36" style={{ background: "var(--cream)" }}>
      <article className="container-obliq max-w-3xl">
        <header className="flex flex-col gap-3">
          <span className="eyebrow">Legal</span>
          <h1
            className="font-black leading-tight tracking-tight text-[var(--charcoal)]"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.5rem)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--muted)]">Last updated: {LAST_UPDATED}</p>
          <p className="max-w-xl text-base leading-relaxed text-[var(--body-text)]">
            We collect as little as we can and tell you exactly what it is. This page explains
            what the {siteConfig.name} website ({siteConfig.url}) does with your data.
          </p>
        </header>

        {/* Table of contents */}
        <nav aria-label="Privacy policy contents" className="card-cream mt-10 p-6">
          <h2 className="eyebrow mb-3">On this page</h2>
          <ol className="grid gap-1.5 text-sm sm:grid-cols-2" role="list">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[var(--body-text)] underline-offset-4 hover:text-[var(--charcoal)] hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 flex flex-col gap-12 text-base leading-relaxed text-[var(--body-text)] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[var(--charcoal)] [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
          <PolicySection id="who-we-are" title={sections[0].title}>
            <p>
              {siteConfig.name} is an open-source project. This website and its source code are
              published under the MIT License at{" "}
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                github.com/OBLIQ-in
              </a>
              . In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean the
              maintainers of the {siteConfig.name} project.
            </p>
            {/* TODO(maintainers): add the legal entity name and registered address (if any) of the data controller. */}
            <p>
              The data controller for this website is the {siteConfig.name} project, reachable at{" "}
              <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>.
            </p>
          </PolicySection>

          <PolicySection id="what-we-collect" title={sections[1].title}>
            <p>
              <strong className="text-[var(--charcoal)]">Information you give us.</strong> When you
              use a form on this site (for example the contact form or the newsletter sign-up, once
              they are live) we receive what you type in: typically your name, email address, and
              your message. We only ask for what we need to reply.
            </p>
            <p>
              <strong className="text-[var(--charcoal)]">Information sent automatically.</strong>{" "}
              Like any website, your browser sends technical data with each request — your IP
              address, browser type, operating system, the page requested, the referring page, and
              the time of the request. Our hosting provider records this in standard server logs.
            </p>
            <p>
              We do <strong className="text-[var(--charcoal)]">not</strong> ask for payment
              details, government IDs, or any sensitive personal data on this website.
            </p>
          </PolicySection>

          <PolicySection id="how-we-use-it" title={sections[2].title}>
            <ul>
              <li>To reply to messages and requests you send us.</li>
              <li>To send you updates, if — and only if — you subscribed to them.</li>
              <li>To keep the website running, secure, and free of abuse (e.g. spam or attacks).</li>
              <li>To understand, in aggregate, how the site is used so we can improve it.</li>
            </ul>
            <p>
              We never sell your personal data, and we do not use it for advertising. Our legal
              bases, where these apply, are your consent (newsletter), our legitimate interest in
              responding to you and operating the site securely, and compliance with the law.
            </p>
          </PolicySection>

          <PolicySection id="third-parties" title={sections[3].title}>
            <p>
              The site relies on a small number of third parties. When your browser loads content
              from them, they receive your IP address and standard request data under their own
              privacy policies:
            </p>
            <ul>
              <li>
                <strong className="text-[var(--charcoal)]">Hosting provider</strong> — serves the
                website and keeps server logs.
                {/* TODO(maintainers): name the hosting provider (e.g. Vercel) and link its privacy policy. */}
              </li>
              <li>
                <strong className="text-[var(--charcoal)]">Google Fonts</strong> — delivers the
                Inter typeface.{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-[var(--charcoal)]">GitHub and jsDelivr</strong> — host
                brand images and screenshots.{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Privacy Statement
                </a>
                {" · "}
                <a href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net" target="_blank" rel="noopener noreferrer">
                  jsDelivr Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-[var(--charcoal)]">Form and email services</strong> — once
                the contact form and newsletter are connected, submissions will be processed by the
                service that delivers them to us.
                {/* TODO(maintainers): name the form/email provider(s) once issues #33 and #45 are wired up. */}
              </li>
            </ul>
            <p>
              Links to other sites (GitHub, Discord, social networks) are governed by those
              sites&rsquo; own policies once you follow them.
            </p>
          </PolicySection>

          <PolicySection id="cookies" title={sections[4].title}>
            <p>
              This website does not currently set any cookies of its own and does not run any
              analytics or tracking scripts.
            </p>
            <p>
              If we add analytics in the future, we will prefer privacy-friendly, cookie-less tools,
              update this page before it goes live, and ask for your consent wherever the law
              requires it.
            </p>
          </PolicySection>

          <PolicySection id="retention" title={sections[5].title}>
            <ul>
              <li>Messages you send us: for as long as needed to handle your request, then deleted.</li>
              <li>Newsletter subscriptions: until you unsubscribe.</li>
              <li>Server logs: kept by our hosting provider for a limited period for security and debugging.</li>
            </ul>
            {/* TODO(maintainers): replace with concrete retention periods once providers are chosen. */}
          </PolicySection>

          <PolicySection id="your-rights" title={sections[6].title}>
            <p>
              Depending on where you live (for example under India&rsquo;s Digital Personal Data
              Protection Act, 2023 or the EU/UK GDPR), you may have the right to:
            </p>
            <ul>
              <li>access the personal data we hold about you;</li>
              <li>correct inaccurate data or have it deleted;</li>
              <li>withdraw consent at any time (for example, by unsubscribing);</li>
              <li>object to or restrict certain processing; and</li>
              <li>complain to your local data protection authority.</li>
            </ul>
            <p>
              To exercise any of these, email{" "}
              <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>. We aim
              to respond within 30 days.
            </p>
          </PolicySection>

          <PolicySection id="children" title={sections[7].title}>
            <p>
              This website is intended for professionals and is not directed at children. We do not
              knowingly collect personal data from anyone under 18. If you believe a child has sent
              us personal data, contact us and we will delete it.
            </p>
          </PolicySection>

          <PolicySection id="changes" title={sections[8].title}>
            <p>
              We may update this policy as the site evolves. The &ldquo;Last updated&rdquo; date at
              the top will always reflect the latest version, and because this website is open
              source, every change is visible in the{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/commits/main/src/app/privacy/page.tsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                public commit history
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection id="contact" title={sections[9].title}>
            <p>
              Questions about this policy or your data? Email{" "}
              <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a> or reach
              us through our <Link href="/contact">contact page</Link>. To report a security issue,
              please follow our{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/blob/main/SECURITY.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                security policy
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </article>
    </div>
  );
}
