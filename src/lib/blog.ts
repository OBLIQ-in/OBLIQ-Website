/**
 * Blog content layer.
 *
 * Posts live in `src/content/blog/<slug>.mdx`. Each file exports its
 * metadata as `export const frontmatter = { ... }` (see BlogFrontmatter).
 * Adding a post means adding one .mdx file — no code changes needed.
 *
 * Keep at least one .mdx file in the folder (the template post does this):
 * Turbopack fails to resolve the dynamic import below when nothing matches.
 *
 * Server-only: uses the filesystem at build time.
 */
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { BlogFrontmatter, BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const WORDS_PER_MINUTE = 220;

interface BlogModule {
  default: ComponentType;
  frontmatter: BlogFrontmatter;
}

/** Slugs of every post, derived from the .mdx filenames. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readingTime(slug: string): number {
  const source = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  // Ignore the frontmatter export block when counting words
  const body = source.replace(/export const frontmatter[\s\S]*?\n};?\n/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

async function loadPost(slug: string): Promise<{ post: BlogPost; Content: ComponentType }> {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as BlogModule;
  return {
    post: { ...mod.frontmatter, slug, readingTime: readingTime(slug) },
    Content: mod.default,
  };
}

/** All posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(getPostSlugs().map(async (slug) => (await loadPost(slug)).post));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** A single post plus its rendered MDX component, or null if the slug doesn't exist. */
export async function getPost(slug: string) {
  if (!getPostSlugs().includes(slug)) return null;
  return loadPost(slug);
}

/** Neighbouring posts in date order: `newer` and `older` (either may be undefined). */
export async function getAdjacentPosts(slug: string) {
  const posts = await getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

/** e.g. "29 Sept 2026" — UTC so build machines in any timezone agree. */
export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

/** Background token for a post's placeholder cover art. */
export const coverTones: Record<NonNullable<BlogFrontmatter["cover"]>, string> = {
  sky: "var(--sky-card)",
  peach: "var(--peach-card)",
  cream: "var(--cream-card)",
};

export function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export type { BlogPost, BlogFrontmatter };
