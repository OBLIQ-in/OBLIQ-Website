# Accessibility Audit — WCAG 2.1 AA

Tracking issue: [#64](https://github.com/OBLIQ-in/OBLIQ-Website/issues/64) · Audited: 29 Sep 2026

## Method

- **Automated:** [axe-core](https://github.com/dequelabs/axe-core) 4.x (rule sets `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice`) run in Microsoft Edge via Playwright against a production build (`next build && next start`).
- **Viewports:** 1440×1000 (desktop) and 390×844 (mobile).
- **Routes:** `/`, `/about`, `/features`, `/pricing`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, and a 404.
- **Keyboard:** scripted Tab walk through every focusable element on each page, checking focus order, that the focused element is visible on screen, and that it has a focus indicator (outline, or a `focus-within` ring on its card).
- **Contrast:** every text token × background token pairing computed from `globals.css` (table below).

## Results

| Check | Before | After |
|---|---|---|
| axe rule violations (any impact), desktop | 15 across 9 routes (9 serious) | **0** |
| axe rule violations (any impact), mobile | 16 across 9 routes (10 serious) | **0** |
| Pages with exactly one `h1` | 4 / 9 | **9 / 9** |
| Logical heading order | 1 page skipped a level | **all pages** |
| Skip-to-content link | missing | **first focusable element on every page** |
| Tab stops without a visible focus indicator | — | **0** |

### Fixes

| Finding | WCAG | Fix |
|---|---|---|
| No skip link | 2.4.1 Bypass Blocks | `.skip-link` added as the first element in `<body>`; appears on focus and moves focus to `<main id="main-content" tabIndex={-1}>` |
| `/about`, `/features`, `/pricing`, `/blog`, `/contact` had no `h1` | 1.3.1, 2.4.6 | `SectionHeading` gains `as="h1" \| "h2"`; page titles pass `as="h1"` |
| Heading levels skipped (h1 → h3) | 1.3.1 | Footer column titles `h3` → `h2`; `SectionPlaceholder` gains `headingLevel`, stub pages use `h2`; decorative hero mockup greeting `h3` → `p` |
| Navbar/footer `.in` suffix at 2.5–3.3:1 | 1.4.3 Contrast | `opacity-40/50` → `text-[var(--muted)]` (≥ 5:1) |
| "Contribute" pills at 4.42:1 | 1.4.3 | `opacity-60` → `text-[var(--body-text)]` (7.5:1) |
| Pricing "save" badge at 2.79:1 | 1.4.3 | `--success` darkened `#00a82d` → `#007a21` (4.87:1 on `--success-bg`, same hue) |
| Hero mockup "Billable" legend at 2.63:1 | 1.4.3 | `text-blue-400` → `text-blue-600` |
| Blog cover decorative category word at 1.33:1 | 1.4.3 | Removed — the category is already shown as a pill above the title |
| Scrollable code blocks not keyboard-reachable | 2.1.1 Keyboard | MDX `pre` renders with `tabIndex={0}` |

## Landmarks

Every page has exactly one `header` (site banner) › `nav[aria-label="Main navigation"]`, one `main#main-content`, and one `footer[aria-label="Site footer"]`. Article pages add an in-article `<header>` (not a banner landmark) and the legal pages add a labelled table-of-contents `<nav>`.

## Keyboard walkthrough

| Page | Tab stops | First stop | Skip link → focus | Stops without visible focus |
|---|---|---|---|---|
| `/` | 40 | Skip to main content | `#main-content`, next Tab inside `main` | 0 |
| `/about` | 30 | Skip to main content | ✅ | 0 |
| `/blog` | 29 | Skip to main content | ✅ | 0 |
| `/blog/[slug]` | 33 | Skip to main content | ✅ (code block is a stop) | 0 |
| `/privacy` | 48 | Skip to main content | ✅ | 0 |
| `/contact` | 29 | Skip to main content | ✅ | 0 |

Order follows the visual order: skip link → logo → main nav → header CTA → page content → footer (brand, social, email, then Product / Company / Community / Legal columns).

## Token contrast

Normal text needs **4.5:1** (✅); large text (≥ 24px, or ≥ 18.7px bold) and UI components need **3:1** (🟡); below 3:1 is ❌.

| Text ↓ / Background → | `cream` | `cream-2` | `cream-card` | `cream-pill` | `pill` | `sky-top` | `sky-card` | `peach-card` | `pricing-bg-top` |
|---|---|---|---|---|---|---|---|---|---|
| `charcoal` | 15.9 ✅ | 15.1 ✅ | 14.3 ✅ | 13.6 ✅ | 15.8 ✅ | 12.3 ✅ | 11.7 ✅ | 14.5 ✅ | 15.3 ✅ |
| `ink` | 16.1 ✅ | 15.2 ✅ | 14.4 ✅ | 13.8 ✅ | 16.0 ✅ | 12.4 ✅ | 11.8 ✅ | 14.7 ✅ | 15.4 ✅ |
| `charcoal-2` | 12.8 ✅ | 12.2 ✅ | 11.5 ✅ | 11.0 ✅ | 12.8 ✅ | 9.9 ✅ | 9.4 ✅ | 11.7 ✅ | 12.3 ✅ |
| `ink-soft` | 9.2 ✅ | 8.8 ✅ | 8.3 ✅ | 7.9 ✅ | 9.2 ✅ | 7.1 ✅ | 6.8 ✅ | 8.5 ✅ | 8.9 ✅ |
| `body-text` | 7.9 ✅ | 7.5 ✅ | 7.1 ✅ | 6.8 ✅ | 7.9 ✅ | 6.1 ✅ | 5.8 ✅ | 7.2 ✅ | 7.6 ✅ |
| `muted` | 5.3 ✅ | 5.0 ✅ | 4.8 ✅ | 4.5 ✅ | 5.3 ✅ | 4.1 🟡 | 3.9 🟡 | 4.8 ✅ | 5.1 ✅ |
| `rust` | 3.8 🟡 | 3.6 🟡 | 3.4 🟡 | 3.2 🟡 | 3.8 🟡 | 2.9 ❌ | 2.8 ❌ | 3.5 🟡 | 3.6 🟡 |
| `blue-accent` | 3.3 🟡 | 3.1 🟡 | 3.0 ❌ | 2.8 ❌ | 3.3 🟡 | 2.5 ❌ | 2.4 ❌ | 3.0 🟡 | 3.2 🟡 |
| `success` | 4.9 ✅ | 4.7 ✅ | 4.4 🟡 | 4.2 🟡 | 4.9 ✅ | 3.8 🟡 | 3.6 🟡 | 4.5 ✅ | 4.7 ✅ |

- `cream` on `charcoal`: **15.88:1** ✅
- `cream` on `ink`: **16.06:1** ✅
- `success` on `success-bg`: **4.87:1** ✅

**Guidance:**

- `charcoal`, `ink`, `charcoal-2`, `ink-soft` and `body-text` are safe for any text on any surface.
- `muted` is safe on the cream family, but only **large text** on the sky backgrounds (`sky-top`, `sky-card`) — use `ink-soft` for small text there.
- `rust` and `blue-accent` are **not text colours** on these surfaces; keep them for fills, icons and large display text.
- `success` is safe on `success-bg`, `cream` and `pill`; avoid it for small text on `cream-card` / `cream-pill` / sky.

## Screen-Reader Smoke Test (NVDA / Narrator / VoiceOver)

Tested on 01 Oct 2026 across `/` (homepage) and `/contact-us` (application/contact form):

- **Landmarks & Page Structure**:
  - Semantic landmark regions (`banner`, `navigation`, `main`, `form`, `contentinfo`) are announced clearly.
  - Logical heading hierarchy with one single `h1` per page (`"Compliance work breaks before filing."` on `/`, `"Build the Future of AI with Us"` on `/contact-us`) followed by logical `h2` and `h3` sections.
- **Skip to Content Link**:
  - Appears as tab stop #1 with accessible name `"Skip to main content, link"`.
  - Pressing Enter moves browser focus directly to `#main-content`.
- **Form Controls & Labels (`/contact-us`)**:
  - All 10 form controls have explicit HTML `<label for="...">` associations matching their `id`.
  - Screen reader clearly announces labels and roles (e.g. `"Name * (Required), edit text"`, `"Email * (Required), edit text"`, `"Position Applying For * (Required), combobox"`, `"Resume * (Required), choose file button"`).
- **Navigation & Social Links**:
  - Icon-only links (GitHub, Twitter, Discord) properly announce their accessible names via `aria-label`.
- **Result**: ✅ Passed with 0 accessibility or focus traps.

## Open items (need a design decision)

- **Mobile menu focus management** (trap focus, `Escape` to close, return focus to the toggle) — tracked in #27.
- **`Button` `rust` variant:** white on `--rust` is 4.23:1 — passes for large text only. It's unused today; raise in Discussions before using it for small labels.
