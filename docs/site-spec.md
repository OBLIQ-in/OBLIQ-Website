# Site Specification

Detailed specification for the Obliq marketing website.

---

## Goal

A marketing website for Obliq — an open source developer platform. The site must:

1. Communicate what Obliq does clearly and compellingly
2. Convert visitors to GitHub stars and sign-ups
3. Serve as a live contributor to-do board via the placeholder system
4. Be fully open source and easy to contribute to

---

## Pages

| Page | Status | Notes |
|------|--------|-------|
| `/` | ✅ Built | Homepage sections below; open ones show on the to-do board |
| `/about` | ✅ Stub | Brand story |
| `/features` | 🔜 #30, #31 | Will reuse the homepage feature sections; shows their open issues for now |
| `/pricing` | ✅ Built | Renders the pricing section (#37) |
| `/blog` | ✅ Built | MDX blog: template #59, index #58, launch posts #60 |
| `/contact-us` | ✅ Built | Join Our Team form (#54), sent via Formspree (#55); `/contact` redirects here |
| `/privacy`, `/terms` | ✅ Built | #61, #62 |

---

## Homepage Sections

In page order, as on the [Framer reference](https://obliqq.framer.ai/):

| Section | Status | Issue |
|---------|--------|-------|
| Navbar | ✅ Built | #27 |
| Hero | ✅ Built | #28 |
| Logo cloud — "Trusted by…" | 🔜 Open | #26 |
| Device showcase | 🔜 Open | #29 |
| Project management | 🔜 Open | #30 |
| Financial management | 🔜 Open | #31 |
| Features / personalization (with the feature trio) | ✅ Built | #32, #34 |
| Spotlight testimonial | ✅ Built | #35 |
| Testimonial marquee | ✅ Built | #36 |
| Pricing | ✅ Built | #37 |
| Blog preview | 🔜 Open | #38 |
| Community — "Stay in the loop" | ✅ Built | #51 |
| Final CTA banner | ✅ Built | #52 |
| Footer | ✅ Built | #53 |

The open rows are what the homepage to-do board shows (`placeholderSections` in `src/components/sections/placeholder.tsx`).

---

## Design Requirements

- **Dark mode only** — background `#1a1a2e`
- **Palette** — cream · lime · periwinkle (see design-system.md)
- **Font** — Inter (body and headings) + Open Runde (rounded UI text)
- **Mobile first** — all breakpoints: mobile → tablet → desktop
- **Glassmorphism** — used on Navbar and cards
- **Animations** — subtle, purposeful, not excessive

---

## Content

- Site name: **Obliq**
- Tagline: **Open Source. No Limits.**
- URL: `https://obliq.in`
- GitHub: `https://github.com/OBLIQ-in`
- License: MIT

---

## SEO Requirements

- Unique `<title>` per page
- Meta description on every page
- OG image: `https://obliq.in/og.png` (1200×630)
- Twitter card: `summary_large_image`
- `robots: index, follow` on all public pages
- Canonical URL driven by `siteConfig.url` in `src/lib/site.ts`

---

## Accessibility Requirements

- WCAG 2.1 AA minimum
- Keyboard navigation throughout
- ARIA labels on all interactive elements
- Logical heading hierarchy (one `h1` per page)
- Skip to main content link (via `#main-content`)
