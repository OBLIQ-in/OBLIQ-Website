# Obliq Website

> **Open Source. No Limits.**

The official marketing website for [Obliq]([https://obliq.in](https://github.com/OBLIQ-in)) — built with Next.js 16, Tailwind CSS v4, and TypeScript.

[![CI](https://github.com/OBLIQ-in/OBLIQ-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/OBLIQ-in/OBLIQ-Website/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/50dca47b-09f5-4fd0-a780-7c44508c0e8d/deploy-status)](https://app.netlify.com/projects/obliq-in/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Discord](https://img.shields.io/discord/1234567890?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/XPC4ETU7kp)

---

## ✨ Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Language | TypeScript (strict) |
| Icons | [Lucide React](https://lucide.dev) |
| Animation | [GSAP](https://greensock.com/gsap/) + CSS |
| Class utils | [CVA](https://cva.style) + [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

---

## 🚀 Getting Started

```bash
git clone https://github.com/OBLIQ-in/OBLIQ-Website.git
cd OBLIQ-Website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── app/              ← Next.js App Router pages + layouts
├── components/
│   ├── ui/           ← Design system primitives (Button, Container, SectionHeading)
│   ├── layout/       ← Navbar, Footer
│   └── sections/     ← Homepage sections
├── lib/
│   ├── site.ts       ← Site config (URL, nav, social links)
│   └── utils.ts      ← cn() and helpers
└── types/
    └── index.ts      ← Global TypeScript types
```

---

## 🎨 Design System

Palette: **cream** · **lime** · **periwinkle** · **charcoal**

See [`docs/design-system.md`](./docs/design-system.md) for the complete guide.

**Storybook:** run `npm run storybook` (http://localhost:6006) to browse every `ui/` component with live controls, plus a **Design tokens** page generated from `globals.css`. Adding a component? Put a `*.stories.tsx` file next to it.

---

## 💬 Community

| Channel | Purpose |
|---------|---------|
| [Discord](https://discord.gg/XPC4ETU7kp) | Real-time chat — quick questions, show your work, hang out between PRs |
| [GitHub Discussions](https://github.com/OBLIQ-in/OBLIQ-Website/discussions) | Long-form Q&A, RFCs, and design proposals |

**Discord channels:** `#welcome` · `#help` · `#show-your-work` · `#announcements`

> Use Discord for quick sync, Discussions for anything that should be searchable later.

---

## 🤝 Contributing

The homepage is a **live contributor to-do board** — each placeholder section maps to an open GitHub issue.

1. Browse [open issues](https://github.com/OBLIQ-in/OBLIQ-Website/issues)
2. Comment to claim one
3. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md)
4. Open a pull request

### Key issues

| Issue | Section |
|-------|---------|
| [#16](https://github.com/OBLIQ-in/OBLIQ-Website/issues/16) | Features Section |
| [#27](https://github.com/OBLIQ-in/OBLIQ-Website/issues/27) | Benefits Section |
| [#32](https://github.com/OBLIQ-in/OBLIQ-Website/issues/32) | Integrations Section |
| [#33](https://github.com/OBLIQ-in/OBLIQ-Website/issues/33) | Pricing Section |
| [#34](https://github.com/OBLIQ-in/OBLIQ-Website/issues/34) | Testimonials Section |
| [#35](https://github.com/OBLIQ-in/OBLIQ-Website/issues/35) | CTA Section |

---

## 📈 Analytics (maintainers)

The site uses [Plausible](https://plausible.io) — cookie-less and privacy-first. It is **off by default**: nothing loads unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set at build time, so local dev, forks and self-hosted copies stay analytics-free.

To turn it on for the production site:

1. Add the site in Plausible (e.g. `obliq.in`).
2. In Netlify → *Site configuration → Environment variables*, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to that domain — a bare hostname like `obliq.in` (comma-separate several for roll-up reporting). For a self-hosted Plausible CE, also set `NEXT_PUBLIC_PLAUSIBLE_SRC` to its `https://` script URL.
3. Redeploy (the values are inlined at build time). An invalid value — e.g. `https://obliq.in` or a non-https script URL — prints an `[analytics] … Analytics disabled.` warning in the build log and ships no tracking, rather than a broken tag.
4. In Plausible → *Site settings → Goals*, add custom-event goals for the events below so they show on the dashboard.

| Event | Props | Fired when |
|-------|-------|-----------|
| `CTA Click` | `location` (`hero`, `navbar`, `mobile-menu`, `pricing-<plan>`) | A "Try Obliq free" / pricing CTA is clicked |
| `Pricing Toggle` | `billing` (`annually` / `monthly`) | The billing switch changes |
| `Form Submit` | `form`, `position` | The join-our-team form passes validation and is sent |

New CTAs opt in with `data-analytics-cta="<location>"`; other events go through `trackEvent()` in `src/lib/analytics.ts`. Never send anything a visitor typed, and keep the [Privacy Policy](src/app/privacy/page.tsx) in sync with what is tracked. See `.env.example`.

**Content-Security-Policy:** every route is served with a CSP built in `src/lib/csp.ts`. The Plausible origin (taken from the script URL, so self-hosted instances work too) is allowed for scripts and event requests only when analytics is on. Loading anything from a new origin — a form service, an embed, a CDN — means adding it to the matching directive there, or the browser will block it.

---

## 📬 Join-our-team form (maintainers)

Applications go through [Formspree](https://formspree.io) (free plan, no backend of our own). The browser posts to our own `/api/join` route, which forwards to Formspree, so the endpoint is never exposed in the page and the Content-Security-Policy needs no change.

1. Create a form in Formspree and copy its endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`).
2. Set `FORMSPREE_ENDPOINT` — locally in `.env.local`, in production under Netlify → *Site configuration → Environment variables*. Don't prefix it with `NEXT_PUBLIC_`.
3. Redeploy.

Resumes are collected as a link (Drive, Dropbox, etc.) because file uploads aren't on the free plan. A hidden honeypot field filters out simple spam bots. If the variable isn't set, the form shows an error instead of sending.

---

## 📜 Scripts

```bash
npm run dev    # Development server (Turbopack)
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
npm run test:e2e  # Playwright smoke tests (builds + serves on :3100)
npm run storybook        # Storybook on :6006
npm run build-storybook  # Static Storybook build (also runs in CI)
```

First time running the e2e tests? Install the browser once with `npx playwright install chromium`.

---

## 📄 License

MIT © [Obliq](https://obliq.in)

