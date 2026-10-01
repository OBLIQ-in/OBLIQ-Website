import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Obliq website — acceptable use, open-source licensing, disclaimers, and how to reach us.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "29 September 2026";

function TermsSection({
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
  { id: "acceptance", title: "1. Accepting these terms" },
  { id: "the-website", title: "2. About this website" },
  { id: "open-source", title: "3. Open-source code and licensing" },
  { id: "brand", title: "4. Name, logo and brand assets" },
  { id: "acceptable-use", title: "5. Acceptable use" },
  { id: "your-content", title: "6. What you send us" },
  { id: "third-party", title: "7. Third-party links and services" },
  { id: "disclaimer", title: "8. Disclaimer" },
  { id: "liability", title: "9. Limitation of liability" },
  { id: "privacy", title: "10. Privacy" },
  { id: "changes", title: "11. Changes to these terms" },
  { id: "law", title: "12. Governing law" },
  { id: "contact", title: "13. Contact us" },
] as const;

export default function TermsPage() {
  return (
    <div className="section pt-36" style={{ background: "var(--cream)" }}>
      <article className="container-obliq max-w-3xl">
        <header className="flex flex-col gap-3">
          <span className="eyebrow">Legal</span>
          <h1
            className="font-black leading-tight tracking-tight text-[var(--charcoal)]"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.5rem)" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--muted)]">Last updated: {LAST_UPDATED}</p>
          <p className="max-w-xl text-base leading-relaxed text-[var(--body-text)]">
            Plain-language terms for using the {siteConfig.name} website ({siteConfig.url}). Please
            read them alongside our <Link href="/privacy" className="underline underline-offset-4 hover:text-[var(--charcoal)]">Privacy Policy</Link>.
          </p>
        </header>

        {/* Table of contents */}
        <nav aria-label="Terms of service contents" className="card-cream mt-10 p-6">
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
          <TermsSection id="acceptance" title={sections[0].title}>
            <p>
              By accessing or using this website you agree to these Terms of Service. If you do not
              agree, please do not use the site. In these terms, &ldquo;we&rdquo;, &ldquo;us&rdquo;
              and &ldquo;our&rdquo; mean the maintainers of the {siteConfig.name} project.
            </p>
            {/* TODO(maintainers): add the legal entity name and registered address (if any) that offers this website. */}
          </TermsSection>

          <TermsSection id="the-website" title={sections[1].title}>
            <p>
              This is the marketing and information website for {siteConfig.name}. It describes the
              product, publishes updates, and lets you get in touch. These terms cover the website
              only — any future {siteConfig.name} product or paid plan may come with its own
              agreement, which will take precedence for that product.
            </p>
            <p>
              Content on the site — including features, plans and pricing — is provided for general
              information and may change without notice. Nothing on this website is legal, tax or
              financial advice.
            </p>
          </TermsSection>

          <TermsSection id="open-source" title={sections[2].title}>
            <p>
              The source code of this website is open source and available at{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/OBLIQ-in/OBLIQ-Website
              </a>{" "}
              under the{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT License
              </a>
              . Your use of the code is governed by that license, not by these terms.
            </p>
            <p>
              Contributions to the project are welcome and are subject to our{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                contributing guide
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/blob/main/CODE_OF_CONDUCT.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code of Conduct
              </a>
              . By submitting a contribution you agree it is licensed under the MIT License.
            </p>
          </TermsSection>

          <TermsSection id="brand" title={sections[3].title}>
            <p>
              The MIT License covers code, not identity. The {siteConfig.name} name, logo and brand
              assets identify the project; please don&rsquo;t use them in a way that suggests
              endorsement or affiliation, or that could confuse people about who runs a product or
              site. Referring to {siteConfig.name} by name to describe it accurately is always fine.
            </p>
          </TermsSection>

          <TermsSection id="acceptable-use" title={sections[4].title}>
            <p>When using this website, you agree not to:</p>
            <ul>
              <li>break any applicable law or infringe anyone else&rsquo;s rights;</li>
              <li>
                attempt to gain unauthorised access to, disrupt, or overload the site or its
                infrastructure;
              </li>
              <li>
                send spam, malware, or abusive, misleading or unlawful content through any form on
                the site; or
              </li>
              <li>impersonate another person or misrepresent your affiliation with anyone.</li>
            </ul>
            <p>
              Found a vulnerability? Please report it responsibly as described in our{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/blob/main/SECURITY.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                security policy
              </a>{" "}
              rather than testing it against the live site.
            </p>
          </TermsSection>

          <TermsSection id="your-content" title={sections[5].title}>
            <p>
              When you send us a message or feedback, you confirm you have the right to share it.
              You keep ownership of what you send; you give us permission to use it to respond to
              you and, for feedback and suggestions, to improve {siteConfig.name} without any
              obligation to you.
            </p>
          </TermsSection>

          <TermsSection id="third-party" title={sections[6].title}>
            <p>
              The site links to services we don&rsquo;t control, such as GitHub, Discord and social
              networks. We are not responsible for their content or practices, and their own terms
              apply once you follow those links.
            </p>
          </TermsSection>

          <TermsSection id="disclaimer" title={sections[7].title}>
            <p>
              The website and its content are provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo;, without warranties of any kind, express or implied — including
              accuracy, fitness for a particular purpose, and uninterrupted or error-free
              operation — to the fullest extent permitted by law.
            </p>
          </TermsSection>

          <TermsSection id="liability" title={sections[8].title}>
            <p>
              To the fullest extent permitted by law, we are not liable for any indirect,
              incidental, special or consequential loss, or any loss of data, profits or business,
              arising from your use of — or inability to use — this website. Nothing in these terms
              limits liability that cannot be limited under applicable law.
            </p>
          </TermsSection>

          <TermsSection id="privacy" title={sections[9].title}>
            <p>
              How we handle personal data is explained in our{" "}
              <Link href="/privacy">Privacy Policy</Link>, which forms part of these terms.
            </p>
          </TermsSection>

          <TermsSection id="changes" title={sections[10].title}>
            <p>
              We may update these terms as the site evolves. The &ldquo;Last updated&rdquo; date
              above always reflects the current version, and every change is visible in the{" "}
              <a
                href="https://github.com/OBLIQ-in/OBLIQ-Website/commits/main/src/app/terms/page.tsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                public commit history
              </a>
              . Continuing to use the site after a change means you accept the updated terms.
            </p>
          </TermsSection>

          <TermsSection id="law" title={sections[11].title}>
            {/* TODO(maintainers): confirm governing law and the city whose courts have jurisdiction. */}
            <p>
              These terms are governed by the laws of India. Any disputes will be handled by the
              competent courts in India, unless the law of your country requires otherwise.
            </p>
          </TermsSection>

          <TermsSection id="contact" title={sections[12].title}>
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a> or use
              our <Link href="/contact">contact page</Link>.
            </p>
          </TermsSection>
        </div>
      </article>
    </div>
  );
}
