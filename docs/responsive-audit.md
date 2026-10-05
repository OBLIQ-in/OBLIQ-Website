# Responsive QA Audit

Tracking issue: [#63](https://github.com/OBLIQ-in/OBLIQ-Website/issues/63) · Audited: 1 Oct 2026 against `main` at `d33ee37`

> **Phase 3 is still open.** This pass covers every section that has shipped. Sections still on the homepage contributor board need the same checks when they land. Re-run the method below and add their rows.

## Method

- **Build:** production (`next build && next start`), Chromium via Playwright. Viewports below 1024px emulate touch (`hasTouch`); below 768px also mobile (`isMobile`).
- **Breakpoints:** 320, 375, 768, 1024 and 1440px wide.
- **Routes:** `/`, `/about`, `/features`, `/pricing`, `/blog`, `/blog/[slug]`, `/contact-us`, `/privacy`, `/terms`, and a 404.
- **Automated checks** on every route × breakpoint:
  - **Horizontal overflow:** any visible element extending past the viewport that isn't inside an `overflow` container (the page's `overflow-x: hidden` would otherwise hide it).
  - **Clipped text:** elements with `overflow: hidden/clip` whose content is wider than the box, excluding `text-overflow: ellipsis` and `.sr-only`.
  - **Touch targets:** every link, button, form control and `role=radio` under 44×44px. Links inside running text are flagged separately, since WCAG 2.5.8 exempts inline targets.
- **Visual review:** a screenshot of every section at every breakpoint, checked by eye for cramped spacing, awkward wrapping and cropping.
- **Marquees:** speed (px/s and screens/s), edge-fade width, the hover-pause behaviour on touch, and reduced motion.

## Results

| Check | Before | After fixes |
|---|---|---|
| Routes × breakpoints with horizontal overflow | 0 / 50 | 0 / 50 |
| Clipped text (excluding `.sr-only`) | 2 (pricing CTAs at 768px) | **0** |
| Distinct non-inline controls under 44×44px, at 320–768px | 164 | **0** |
| Hero mockup cropped mid-word | 320, 375px | **none** |

**Fix PRs:** [#126](https://github.com/OBLIQ-in/OBLIQ-Website/pull/126) pricing columns · [#127](https://github.com/OBLIQ-in/OBLIQ-Website/pull/127) hero mockup · [#128](https://github.com/OBLIQ-in/OBLIQ-Website/pull/128) touch targets · [#129](https://github.com/OBLIQ-in/OBLIQ-Website/pull/129) marquee fade. Before/after screenshots of the worst three are in #126, #127 and #128.

## Checklist

✅ pass · ❌ fail, fixed in the linked PR · ⚠️ minor, noted but not changed

### Homepage sections

| Section | 320 | 375 | 768 | 1024 | 1440 | Notes |
|---|---|---|---|---|---|---|
| Navbar | ❌ | ❌ | ❌ | ❌ | ❌ | Mobile toggle 36×36, desktop links 36px tall, CTA 40px, logo 29px → all ≥ 44px (#128). The pill height is unchanged. |
| Mobile menu | ✅ | ✅ | — | — | — | Full-screen links are 60px rows. |
| Hero | ❌ | ❌ | ✅ | ✅ | ✅ | The mockup's fixed sidebar and quick-actions panels squeezed the main area to about 100px, so the stat cards and legend clipped (#127). ⚠️ At 320px the eyebrow wraps, leaving "FIRMS" alone on its own line. |
| Contributor board | ❌ | ❌ | ❌ | ❌ | ❌ | "Contribute" pills 38px → 44px (#128). The layout itself passes at every width. |
| Integrations marquee | ⚠️ | ✅ | ✅ | ✅ | ✅ | The 12% edge fade is only 38px at 320px, so it was raised to at least 48px (#129). Speed passes (see below). |
| Spotlight testimonial | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Pricing | ❌ | ❌ | ❌ | ❌ | ❌ | **768px:** three ~215px columns crushed the toggle ("AnnuallyMonthly") and clipped the CTA labels, so it is one column until `lg` (#126). **All widths:** toggle options 40px → 44px (#128). |
| Footer | ❌ | ❌ | ❌ | ✅ | ✅ | Below `lg`, social icons 32px → 44px, links 17px → 44px rows, and the logo and email get padded hit areas (#128). From `lg` up the lists stay compact for mouse use. |

### Pages

| Page | 320 | 375 | 768 | 1024 | 1440 | Notes |
|---|---|---|---|---|---|---|
| `/about` | ✅ | ✅ | ✅ | ✅ | ✅ | |
| `/features`, `/pricing` (stubs) | ❌ | ❌ | ❌ | ❌ | ❌ | Same "Contribute" pill as the board (#128) |
| `/blog` | ✅ | ✅ | ✅ | ✅ | ✅ | The card title link is 36px tall, but its stretched `::after` covers the whole card |
| `/blog/[slug]` | ❌ | ❌ | ❌ | ❌ | ❌ | "All posts" 20px and the author "Profile" link 20px get padded hit areas (#128). Code blocks scroll inside their own box, by design. |
| `/contact-us` (join form) | ✅ | ✅ | ✅ | ✅ | ✅ | Fields are ≥ 48px. The hidden file input is reached through its full-width label. |
| `/contact-us` (team) | ❌ | ❌ | ❌ | ❌ | ❌ | "Connect" 40px → 44px (#128) |
| `/privacy`, `/terms` | ❌ | ❌ | ❌ | ✅ | ✅ | Below `lg`, the "On this page" links go from 17px to 44px rows (#128). Links inside paragraphs are exempt (WCAG 2.5.8 inline). |
| 404 | ✅ | ✅ | ✅ | ✅ | ✅ | |

## Marquee behaviour

| Width | Speed | Screens/s | Edge fade each side |
|---|---|---|---|
| 320 | 52px/s | 0.16 | 38px → **48px** |
| 375 | 52px/s | 0.14 | 45px → **48px** |
| 768 | 52px/s | 0.07 | 92px |
| 1024 | 52px/s | 0.05 | 123px |
| 1440 | 52px/s | 0.04 | 173px |

- **Speed:** constant in px/s, so a pill takes about 6s to cross a 320px phone, which is comfortably readable. No change.
- **Hover pause:** Tailwind v4 compiles `group-hover` inside `@media (hover: hover)`, so a tap on a touch screen can't leave a row stuck paused.
- **Reduced motion:** both rows stop and wrap into a static, centred list with no mask.

## Re-running

Run the checks against a production build at the five widths above. Before fixing anything, confirm each finding by looking at the section's screenshot. The automated touch-target check also flags inline prose links, and those are exempt.
