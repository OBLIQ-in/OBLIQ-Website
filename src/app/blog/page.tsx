import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { BlogCard } from "@/components/ui/BlogCard";
import { getAllPosts } from "@/lib/blog";

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
              <BlogCard
                title={featured.title}
                excerpt={featured.description}
                category={featured.category}
                href={`/blog/${featured.slug}`}
                author={featured.author}
                date={featured.date}
                cover={featured.cover}
                readingTime={featured.readingTime}
                featured
              />
            </Reveal>
            {rest.length > 0 && (
              <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <li key={post.slug} className="flex">
                    <Reveal index={i} className="flex w-full">
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
          </div>
        )}
      </div>
    </div>
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
