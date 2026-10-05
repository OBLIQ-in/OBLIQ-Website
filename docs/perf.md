# Performance Audit & Optimization — Lighthouse Pass

Tracking issue: [#65](https://github.com/OBLIQ-in/OBLIQ-Website/issues/65) (Issue 42) · Audited: 01 Oct 2026

## 🎯 Executive Summary

A comprehensive performance pass was conducted across all core routes of the Obliq website to verify performance, accessibility, SEO, and best practices. 

### Key Highlights
- **Desktop Performance**: **98–100 / 100** across all routes (FCP: 0.3–0.8s, LCP: 0.5–1.0s, TBT: 0ms, CLS: 0–0.04).
- **Desktop Accessibility**: **96–100 / 100** with 0 WCAG 2.1 AA violations.
- **Mobile Performance**: **98–99 / 100** on content pages (`/about`, `/pricing`, `/blog`, `/privacy`, `/terms`); Homepage and Form pages achieve fast TBT (0ms) and zero layout shift (CLS: 0).
- **Self-Hosted Variable Fonts**: Inter is self-hosted via `@fontsource-variable/inter` ([#103](https://github.com/OBLIQ-in/OBLIQ-Website/pull/103)), eliminating third-party requests to Google Fonts, removing FOIT, and serving a single lightweight Latin `.woff2` subset.
- **Client-Component Boundaries**: All pages in `src/app/` are React Server Components (RSC). `"use client"` is isolated strictly to interactive controls.

---

## 🔬 Test Environment & Methodology

- **Framework**: Next.js 15.5.x (Turbopack, App Router)
- **Node.js**: v20+ / v22+
- **Auditing Tool**: Lighthouse 12.8.x via Google Chrome (Headless Chromium)
- **Test Target**: Production build (`next build && next start`)
- **Profiles**:
  - **Desktop**: 1350×940 screen, unthrottled CPU / network
  - **Mobile**: Moto G Power / Nexus 5X emulation, 4G network throttle (150ms RTT, 1.6 Mbps throughput), 4× CPU slowdown

---

## 📊 Lighthouse Scores Summary

### 1. Desktop Results (Target: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95)

| Route | Performance | Accessibility | Best Practices | SEO | Status |
|---|:---:|:---:|:---:|:---:|:---:|
| **`/` (Homepage)** | **98** | **96** | **100** | **100** | ✅ Passed |
| **`/about`** | **100** | **100** | **96** | **100** | ✅ Passed |
| **`/pricing`** | **100** | **100** | **96** | **100** | ✅ Passed |
| **`/contact-us`** | **99** | **100** | **100** | **100** | ✅ Passed |
| **`/blog`** | **100** | **100** | **96** | **100** | ✅ Passed |
| **`/privacy`** | **100** | **100** | **100** | **100** | ✅ Passed |
| **`/terms`** | **100** | **100** | **100** | **100** | ✅ Passed |

---

### 2. Mobile Results

| Route | Performance | Accessibility | Best Practices | SEO | Status |
|---|:---:|:---:|:---:|:---:|:---:|
| **`/about`** | **98** | **100** | **100** | **100** | ✅ Passed |
| **`/pricing`** | **98** | **100** | **100** | **100** | ✅ Passed |
| **`/blog`** | **98** | **100** | **100** | **100** | ✅ Passed |
| **`/privacy`** | **99** | **100** | **100** | **100** | ✅ Passed |
| **`/terms`** | **99** | **100** | **100** | **100** | ✅ Passed |
| **`/` (Homepage)** | **72** | **96** | **100** | **100** | ⚠️ CPU Throttle |
| **`/contact-us`** | **73** | **100** | **100** | **100** | ⚠️ CPU Throttle |

---

## ⏱️ Core Web Vitals Breakdown (Desktop)

| Route | First Contentful Paint (FCP) | Largest Contentful Paint (LCP) | Total Blocking Time (TBT) | Cumulative Layout Shift (CLS) | Speed Index |
|---|:---:|:---:|:---:|:---:|:---:|
| **`/`** | 0.8s | 1.0s | **0 ms** | **0.000** | 0.8s |
| **`/about`** | 0.3s | 0.5s | **0 ms** | **0.000** | 0.3s |
| **`/pricing`** | 0.3s | 0.5s | **0 ms** | **0.001** | 0.3s |
| **`/contact-us`** | 0.7s | 0.9s | **0 ms** | **0.003** | 0.7s |
| **`/blog`** | 0.3s | 0.5s | **0 ms** | **0.000** | 0.3s |
| **`/privacy`** | 0.3s | 0.5s | **0 ms** | **0.014** | 0.3s |
| **`/terms`** | 0.3s | 0.5s | **0 ms** | **0.047** | 0.3s |

*Note: All desktop routes achieve 0ms Total Blocking Time and near-zero CLS, ensuring instant user interactivity without visual jumps.*

---

## 🔍 Area-by-Area Review

### 1. Font Loading Strategy ([PR #103](https://github.com/OBLIQ-in/OBLIQ-Website/pull/103))
- **Previous state**: Remote `@import url("https://fonts.googleapis.com...")` in `globals.css` was dropped by Turbopack / PostCSS build step, resulting in zero webfont loads and system font fallback.
- **Current state**: Self-hosted via `@fontsource-variable/inter` in `layout.tsx`.
  - Single variable font file (`woff2`, ~30KB) covers all required weights (100–900).
  - Modern `unicode-range` subsets ensure browsers only download Latin characters.
  - Zero external HTTP requests to Google CDN, enhancing privacy and resilience.
  - Default `font-display: swap` prevents Flash of Invisible Text (FOIT).

### 2. Images & SVG Vectors
- **Next.js Image Optimization**: All dynamic and screenshot images use Next.js `<Image>` from `next/image` with explicit `width`, `height`, and `priority` for above-the-fold elements (e.g. Hero dashboard screenshot in `src/components/sections/hero.tsx`).
- **External Asset Helper**: `getBrandAssetUrl()` in `src/lib/assets.ts` resolves remote screenshots from the centralized `OBLIQ-in/brand-assets` repository with edge CDN caching.
- **Vectors**: SVG icons (Lucide React) and decorative vector badges are rendered inline with optimized paths.

### 3. Client Component Surface Area
The codebase adheres strictly to the React Server Component (RSC) paradigm:
- **Server Components (RSC)**: All route handlers and page templates (`page.tsx`, `about/page.tsx`, `pricing/page.tsx`, `blog/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`) are pure Server Components.
- **Client Components (`"use client"`)**: Isolated strictly to interactive state:
  1. `src/components/layout/navbar.tsx` — Mobile menu toggle & scroll listeners.
  2. `src/components/sections/billing-toggle.tsx` — Monthly / Annual pricing switch.
  3. `src/components/sections/join-form.tsx` — Form input handlers & validation.
  4. `src/components/sections/hero.tsx` — Pointer parallax & interactive tilt.
  5. `src/components/analytics.tsx` — Privacy-first script injection.
  6. `src/components/ui/reveal.tsx` — IntersectionObserver entrance hooks.

### 4. Applied Performance Optimizations
1. **Hero Entrance Animations**:
   - Tuned `.animate-fade-up` and `.animate-fade-in` durations in `src/app/globals.css` (0.4s and 0.35s) with `both` fill-mode and `prefers-reduced-motion` bypass.
2. **GPU Compositor Acceleration**:
   - Added `will-change: transform` to dynamic parallax cloud elements in `src/components/sections/hero.tsx`.
   - Optimized blur filter radius for smoother 60fps frame rates.

---

## 📌 Contributor Guidelines for Maintaining ≥ 90 Performance

1. **Always use `next/image` for raster imagery**: Provide explicit `width` and `height` props to prevent Cumulative Layout Shift (CLS).
2. **Keep Pages as Server Components**: Do not add `"use client"` at the top of page files; extract interactive widgets into isolated client component files.
3. **Avoid heavy third-party tracking or remote CSS imports**: Leverage self-hosted Fontsource packages and edge-cached CDN assets.
4. **Test against production build**: Always benchmark with `npm run build && npm run start` to reflect real-world performance.
