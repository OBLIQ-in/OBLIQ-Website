import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { coverTones, formatPostDate, getAllPosts, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

const description = "Practical guides, product updates and open-source stories from the Obliq team and community.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Obliq",
    description,
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <div className="section pt-36" style={{ background: "var(--cream)" }}>
      <div className="container-obliq">
        <SectionHeading
          as="h1"
          eyebrow="Blog"
          heading="From the community."
          subheading={description}
        />

        {!featured ? (
          <EmptyState />
        ) : (
          <div className="mt-14 flex flex-col gap-6">
            <Reveal className="flex">
              <PostCard post={featured} featured />
            </Reveal>
            {rest.length > 0 && (
              <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <li key={post.slug} className="flex">
                    <Reveal index={i} className="flex w-full">
                      <PostCard post={post} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// TODO(issue #23): swap for ui/BlogCard once it lands.
function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-card)] bg-[var(--surface)]/60",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--tint-rgb)/0.16)] focus-within:ring-2 focus-within:ring-[var(--charcoal)]",
        featured ? "flex-col md:flex-row" : "flex-col"
      )}
    >
      {/* Placeholder cover art until real covers come from brand-assets */}
      <div
        aria-hidden="true"
        className={cn(
          "relative shrink-0 overflow-hidden",
          featured ? "aspect-[16/10] md:aspect-auto md:w-1/2" : "aspect-[16/10]"
        )}
        style={{ background: coverTones[post.cover ?? "cream"] }}
      >
        <span className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-white/40 dark:bg-white/5" />
        <span className="absolute -bottom-14 left-6 h-32 w-32 rounded-full bg-white/30 dark:bg-white/[0.03]" />
      </div>

      <div className={cn("flex flex-1 flex-col gap-3", featured ? "p-7 md:p-10 md:justify-center" : "p-6")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--cream-pill)] px-3 py-1 text-xs font-semibold text-[var(--charcoal)]">
            {post.category}
          </span>
          {featured && (
            <span className="rounded-full bg-[var(--charcoal)] px-3 py-1 text-xs font-semibold text-[var(--cream)]">
              Featured
            </span>
          )}
        </div>

        <h2
          className={cn(
            "font-bold leading-snug tracking-tight text-[var(--charcoal)]",
            featured ? "text-2xl md:text-3xl" : "text-lg"
          )}
        >
          {/* Stretched link: the whole card is one link target */}
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h2>

        <p className={cn("text-[var(--body-text)] leading-relaxed", featured ? "text-base" : "line-clamp-2 text-sm")}>
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm text-[var(--muted)]">
          <span>
            {post.author.name} · <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-[var(--charcoal)] transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="placeholder-section mx-auto mt-14 flex max-w-xl flex-col items-center gap-3 px-6 py-14 text-center">
      <PenLine className="h-6 w-6 text-[var(--muted)]" aria-hidden="true" />
      <p className="text-lg font-semibold text-[var(--charcoal)]">No posts yet — the first one is on its way.</p>
      <p className="text-sm text-[var(--body-text)]">
        Want to write it?{" "}
        <a
          href="https://github.com/OBLIQ-in/OBLIQ-Website/issues/60"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-[var(--charcoal)]"
        >
          Pick up a launch post
        </a>
        .
      </p>
    </div>
  );
}
