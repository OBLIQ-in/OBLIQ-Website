import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/ui/BlogCard";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts, type BlogPost } from "@/lib/blog";

interface BlogPreviewProps {
  posts?: BlogPost[];
}

/**
 * BlogPreview Section (Issue #28 / Issue #38).
 * Displays a featured post and a 3-column grid of recent blog posts.
 */
export async function BlogPreview({ posts: customPosts }: BlogPreviewProps) {
  const posts = customPosts ?? (await getAllPosts());

  // Find the featured post (fallback to first post if none marked featured)
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];

  // Grid of 3 recent posts excluding the featured post
  const recentPosts = posts
    .filter((p) => p.slug !== featuredPost?.slug)
    .slice(0, 3);

  if (!featuredPost) {
    return null;
  }

  return (
    <section
      id="blog"
      aria-labelledby="blog-preview-heading"
      className="section scroll-mt-24 bg-[var(--cream)]"
    >
      <div className="container-obliq flex flex-col items-center gap-12 md:gap-14">
        {/* Section Heading */}
        <Reveal className="flex flex-col items-center gap-3 text-center font-rounded">
          <span className="eyebrow">blog</span>
          <h2
            id="blog-preview-heading"
            className="text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)] md:text-[52px]"
          >
            Ideas to level-up your freelance game
          </h2>
        </Reveal>

        {/* Featured Card (Large / spans 2 cols on wide layouts) */}
        <div className="w-full">
          <Reveal>
            <BlogCard
              title={featuredPost.title}
              excerpt={featuredPost.description}
              category={featuredPost.category}
              href={`/blog/${featuredPost.slug}`}
              author={featuredPost.author}
              date={featuredPost.date}
              cover={featuredPost.cover}
              readingTime={featuredPost.readingTime}
              featured
            />
          </Reveal>
        </div>

        {/* Grid of 3 recent posts */}
        {recentPosts.length > 0 && (
          <ul
            role="list"
            className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {recentPosts.map((post, i) => (
              <li key={post.slug} className="flex h-full">
                <Reveal index={i} className="flex h-full w-full">
                  <BlogCard
                    title={post.title}
                    excerpt={post.description}
                    category={post.category}
                    href={`/blog/${post.slug}`}
                    author={post.author}
                    date={post.date}
                    cover={post.cover}
                    readingTime={post.readingTime}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {/* Explore all link */}
        <Reveal className="flex justify-center pt-2">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.12)] bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--charcoal)] backdrop-blur-xs transition-all duration-200 hover:border-[rgba(0,0,0,0.25)] hover:bg-white"
          >
            <span>Explore all articles</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
