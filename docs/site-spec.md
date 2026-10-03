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
| `/` | ✅ Scaffold | Hero + placeholder board |
| `/about` | ✅ Stub | Brand story |
| `/features` | 🔜 Issue #16 | Full features deep-dive |
| `/pricing` | 🔜 Issue #33 | Tier comparison |
| `/blog` | 🔜 Issue #36 | MDX blog |
| `/contact` | 🔜 Issue #37 | Contact form |

---

## Homepage Sections

| Section | Status | Issue |
|---------|--------|-------|
| Hero | ✅ Built | — |
| Features | 🔜 Open | #16 |
| Benefits / Why Obliq | 🔜 Open | #27 |
| Integrations | 🔜 Open | #32 |
| Pricing | 🔜 Open | #33 |
| Testimonials | 🔜 Open | #34 |
| CTA | 🔜 Open | #35 |

> **Important:** Issue numbers #16, #27, and #32 are referenced in code. Do not renumber.

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
