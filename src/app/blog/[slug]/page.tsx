import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  authorInitials,
  coverTones,
  formatPostDate,
  getAdjacentPosts,
  getPost,
  getPostSlugs,
  type BlogPost,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only slugs that exist at build time are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(slug);
  if (!result) return {};
  const { post } = result;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name, url: post.author.url }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author.name],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getPost(slug);
  if (!result) notFound();

  const { post, Content } = result;
  const { newer, older } = await getAdjacentPosts(slug);

  return (
    <div className="section pt-36" style={{ background: "var(--cream)" }}>
      <article className="container-obliq max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex min-h-11 -my-3 items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--charcoal)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All posts
        </Link>

        {/* Header */}
        <header className="mt-8 flex flex-col gap-5">
          <span className="w-fit rounded-full bg-[var(--cream-pill)] px-3 py-1 text-xs font-semibold text-[var(--charcoal)]">
            {post.category}
          </span>
          <h1
            className="font-black leading-[1.08] tracking-tight text-[var(--charcoal)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--body-text)]">{post.description}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--charcoal)]">{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <CoverArt post={post} />

        {/* Body */}
        <div className="prose-obliq mt-12">
          <Content />
        </div>

        {/* Author card */}
        <aside
          aria-label="About the author"
          className="card-cream mt-16 flex items-center gap-4 p-6"
        >
          <span
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold text-[var(--charcoal)]"
            style={{ background: "var(--sky-card)" }}
          >
            {authorInitials(post.author.name)}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="eyebrow">Written by</span>
            <span className="font-semibold text-[var(--charcoal)]">{post.author.name}</span>
            {post.author.role && (
              <span className="text-sm text-[var(--muted)]">{post.author.role}</span>
            )}
          </div>
          {post.author.url && (
            <a
              href={post.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex min-h-11 min-w-11 -my-3 items-center justify-center text-sm font-medium text-[var(--charcoal)] underline underline-offset-4"
            >
              Profile<span className="sr-only"> of {post.author.name}</span>
            </a>
          )}
        </aside>

        {/* Prev / next */}
        {(newer || older) && (
          <nav aria-label="More posts" className="mt-10 grid gap-4 sm:grid-cols-2">
            {older ? <PostNavLink post={older} direction="prev" /> : <span className="hidden sm:block" />}
            {newer && <PostNavLink post={newer} direction="next" />}
          </nav>
        )}
      </article>
    </div>
  );
}

/** Placeholder cover until real artwork is available from brand-assets. */
function CoverArt({ post }: { post: BlogPost }) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-10 aspect-[16/7] overflow-hidden rounded-[var(--radius-card)]"
      style={{ background: coverTones[post.cover ?? "cream"] }}
    >
      <span className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/40" />
      <span className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/30" />
    </div>
  );
}

function PostNavLink({ post, direction }: { post: BlogPost; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/blog/${post.slug}`}
      rel={isPrev ? "prev" : "next"}
      className={cn(
        "group flex flex-col gap-1 rounded-[var(--radius-lg)] border border-[var(--border)] p-5 transition-colors hover:border-[rgba(0,0,0,0.2)]",
        isPrev ? "items-start text-left" : "items-end text-right sm:col-start-2"
      )}
    >
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)]">
        {isPrev && <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />}
        {isPrev ? "Previous post" : "Next post"}
        {!isPrev && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
      </span>
      <span className="font-semibold text-[var(--charcoal)]">{post.title}</span>
    </Link>
  );
}
