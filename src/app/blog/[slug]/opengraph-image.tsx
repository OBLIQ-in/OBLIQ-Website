import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

// Branded share card for every blog post, generated at build time.
// Non-blog pages keep the default siteConfig.ogImage from the root layout.

export const alt = `${siteConfig.name} blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// ImageResponse can't read CSS variables — these mirror the tokens in globals.css.
const colors = {
  cream: "#f5f2eb", // --cream
  creamPill: "#e5e1da", // --cream-pill
  charcoal: "#181818", // --charcoal
  muted: "#6e6258", // --muted
  sky: "#b7d5f1", // --sky-card
  peach: "#f4e6da", // --peach-card
  creamCard: "#eae6df", // --cream-card
};

const accentByCover = { sky: colors.sky, peach: colors.peach, cream: colors.creamCard };

// Satori needs raw font data (woff/ttf, not woff2). Open Runde is the site's display face.
function loadFont(weight: 500 | 700) {
  return readFile(
    path.join(
      process.cwd(),
      "node_modules/@fontsource/open-runde/files",
      `open-runde-latin-${weight}-normal.woff`
    )
  );
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [result, medium, bold] = await Promise.all([getPost(slug), loadFont(500), loadFont(700)]);
  const post = result?.post;
  const accent = accentByCover[post?.cover ?? "sky"];
  const title = post?.title ?? `${siteConfig.name} blog`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.cream,
          color: colors.charcoal,
          fontFamily: "Open Runde",
          position: "relative",
        }}
      >
        {/* Subtle decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: accent,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -170,
            right: 220,
            width: 300,
            height: 300,
            borderRadius: 9999,
            background: accent,
            opacity: 0.45,
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 2,
              border: `3px solid ${colors.charcoal}`,
              borderRadius: 8,
              padding: "2px 12px",
            }}
          >
            OBLIQ
          </div>
          <div style={{ display: "flex", fontSize: 18, fontWeight: 500, color: colors.muted, marginBottom: 4 }}>
            .in / blog
          </div>
        </div>

        {/* Category + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 960 }}>
          {post && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 22,
                fontWeight: 700,
                background: colors.creamPill,
                borderRadius: 9999,
                padding: "8px 22px",
              }}
            >
              {post.category}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 60 : 72,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
        </div>

        {/* Byline */}
        <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: colors.muted }}>
          {post ? `${post.author.name} · ${formatPostDate(post.date)}` : siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Open Runde", data: medium, weight: 500, style: "normal" },
        { name: "Open Runde", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
