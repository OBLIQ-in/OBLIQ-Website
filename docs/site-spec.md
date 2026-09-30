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

| Page | Status | Issue | Notes |
|------|--------|-------|-------|
| `/` | 🚧 In progress | see below | Hero, Integrations, Pricing + contributor to-do board |
| `/about` | ✅ Stub | — | Brand story |
| `/features` | 🔜 Open | #32, #34 | Reuses the homepage feature sections |
| `/pricing` | ✅ Built | #37 | The pricing section, as the page |
| `/blog` | ✅ Built | #58 | Index; launch posts in #60 |
| `/blog/[slug]` | ✅ Built | #59 | MDX post template |
| `/contact-us` | ✅ Form UI | #54 | Join Our Team; sending the form is #55 (`/contact` redirects here) |
| `/privacy` | ✅ Built | #61 | Privacy Policy |
| `/terms` | ✅ Built | #62 | Terms of Service |

---

## Homepage Sections

In page order:

| Section | Status | Issue |
|---------|--------|-------|
| Hero | ✅ Built | — (entrance animations: #28) |
| Logo cloud — "Trusted by…" | 🔜 Open | #26 |
| Device showcase | 🔜 Open | #29 |
| Project management | 🔜 Open | #30 |
| Financial management | 🔜 Open | #31 |
| Features / personalization | 🔜 Open | #32 |
| Integrations marquee | ✅ Built | #33 |
| Feature trio | 🔜 Open | #34 |
| Spotlight testimonial | 🔜 Open | #35 |
| Testimonial marquee | 🔜 Open | #36 |
| Pricing | ✅ Built | #37 |
| Blog preview | 🔜 Open | #38 |
| Community — "Stay in the loop" | 🔜 Open | #51 |
| Final CTA banner | 🔜 Open | #52 |
| Footer — newsletter + sitemap | 🔜 Open | #53 |

Open sections also appear on the homepage to-do board, driven by `placeholderSections` in `src/components/sections/placeholder.tsx` — update both when a section ships.

---

## Design Requirements

- **Dark mode only** — background `#1a1a2e`
- **Palette** — cream · lime · periwinkle (see design-system.md)
- **Font** — Inter (body) + Plus Jakarta Sans (display)
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
