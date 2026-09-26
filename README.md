# Obliq Website

> **Open Source. No Limits.**

The official marketing website for [Obliq]([https://obliq.in](https://github.com/OBLIQ-in)) — built with Next.js 15, Tailwind CSS v4, and TypeScript.

[![CI](https://github.com/OBLIQ-in/OBLIQ-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/OBLIQ-in/OBLIQ-Website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
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

## 📜 Scripts

```bash
npm run dev    # Development server (Turbopack)
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
```

---

## 📄 License

MIT © [Obliq](https://obliq.in)
