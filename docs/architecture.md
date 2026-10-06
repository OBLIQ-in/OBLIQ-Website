# Architecture

Technical overview of the Obliq website codebase.

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 15.x |
| Router | App Router | — |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | v4 |
| Icons | Lucide React | latest |
| Animation | GSAP + CSS | — |
| Class utils | CVA + clsx + tailwind-merge | — |

---

## Routing

Next.js App Router — all routes are in `src/app/`.

```
/           → src/app/page.tsx
/about      → src/app/about/page.tsx
/features   → src/app/features/page.tsx
/pricing    → src/app/pricing/page.tsx
/blog       → src/app/blog/page.tsx
/contact    → src/app/contact/page.tsx
```

---

## Data Flow

All static configuration lives in `src/lib/site.ts`:

```
siteConfig
├── name, tagline, description
├── url                  ← canonical domain — change here only
├── ogImage
├── links (github, twitter, discord)
├── email
├── nav[]                ← Navbar links
└── footerNav{}          ← Footer column links
```

---

## SEO

Metadata is configured in `src/app/layout.tsx` using Next.js 15's `Metadata` API.

- `metadataBase` is set from `siteConfig.url`
- Title template: `%s | Obliq`
- OG and Twitter card images: `siteConfig.ogImage`
- Each page exports its own `metadata` object for page-specific overrides

---

## Component Hierarchy

```
RootLayout (layout.tsx)
├── <Navbar>
├── <main> (page content)
│   └── HomePage (page.tsx)
│       ├── <Hero>
│       └── <SectionPlaceholder> ×6
└── <Footer>
```

---

## Blog (issue #36)

Posts are MDX files rendered with `@next/mdx`:

1. Posts live in `src/content/blog/<slug>.mdx` — the filename is the URL slug
2. Each post declares metadata with `export const frontmatter = { ... }` (type: `BlogFrontmatter` in `src/types/index.ts`)
3. `src/lib/blog.ts` lists, loads and orders posts (`getAllPosts`, `getPost`, `getAdjacentPosts`)
4. `src/app/blog/[slug]/page.tsx` pre-renders every post via `generateStaticParams`; unknown slugs 404
5. Typography comes from the `.prose-obliq` class in `globals.css`; `src/mdx-components.tsx` maps internal links to `next/link`

See `src/content/blog/how-to-write-for-the-obliq-blog.mdx` for a template post.

---

## Contact Form (not yet implemented — issue #37)

Recommended approach:

1. Use [Resend](https://resend.com) or [Formspree](https://formspree.io)
2. Create a Server Action in `src/app/contact/actions.ts`
3. Validate with [Zod](https://zod.dev)
4. Rate-limit with Upstash or similar

---

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:

- Triggers on: PR to `main`
- Jobs: `lint` → `build`
- `main` branch protection requires CI to pass

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Override canonical URL | No |

---

## Performance

- All fonts loaded via `next/font/google` (no layout shift)
- Images should use `next/image`
- Animations use CSS keyframes where possible; GSAP for complex sequences
- No JavaScript hydration for purely static sections (Server Components)
