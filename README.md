# Obliq Website

> **Open Source. No Limits.**

The official marketing website for [Obliq]([https://obliq.in](https://github.com/OBLIQ-in)) — built with Next.js 15, Tailwind CSS v4, and TypeScript.

[![CI](https://github.com/OBLIQ-in/OBLIQ-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/OBLIQ-in/OBLIQ-Website/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/50dca47b-09f5-4fd0-a780-7c44508c0e8d/deploy-status)](https://app.netlify.com/projects/obliq-in/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Discord](https://img.shields.io/discord/1234567890?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/XPC4ETU7kp)

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

### Finding an issue

Work is organised into phases (GitHub milestones and `phase:` labels):

| Filter | What's in it |
|--------|--------------|
| [`good first issue`](https://github.com/OBLIQ-in/OBLIQ-Website/issues?q=is%3Aopen+label%3A%22good+first+issue%22) | Small, well-scoped starting points |
| [Phase 3 — Homepage Sections](https://github.com/OBLIQ-in/OBLIQ-Website/issues?q=is%3Aopen+label%3A%22phase+3%3A+homepage+sections%22) | The sections shown on the homepage to-do board |
| [Phase 4 — Pages & Content](https://github.com/OBLIQ-in/OBLIQ-Website/issues?q=is%3Aopen+label%3A%22phase+4%3A+pages+%26+content%22) | Standalone pages, blog posts, forms |
| [Phase 5 — Quality & Polish](https://github.com/OBLIQ-in/OBLIQ-Website/issues?q=is%3Aopen+label%3A%22phase+5%3A+quality+%26+polish%22) | Accessibility, performance, responsive QA |
| [All milestones](https://github.com/OBLIQ-in/OBLIQ-Website/milestones) | The full roadmap |

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

