# Contributing to Obliq Website

Thank you for your interest in contributing to the Obliq website! 🎉

This is an open-source project and every contribution — big or small — is welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Community](#community)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Assets & Images](#assets--images)
- [How to Claim an Issue](#how-to-claim-an-issue)
- [Pull Request Guidelines](#pull-request-guidelines)
- [CI Checks](#ci-checks)

---

## Code of Conduct

By participating, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Community

**Stuck for more than an hour? Ask — that's normal around here.**

| Channel | When to use |
|---------|------------|
| [Discord](https://discord.gg/XPC4ETU7kp) | Quick questions, pair-debugging, showing WIPs, hanging out |
| [GitHub Discussions](https://github.com/OBLIQ-in/OBLIQ-Website/discussions) | Long-form Q&A, design proposals, RFCs |
| [GitHub Issues](https://github.com/OBLIQ-in/OBLIQ-Website/issues) | Bug reports, feature requests, task tracking |

**Discord channels:** `#welcome` · `#help` · `#show-your-work` · `#announcements`

> **Rule of thumb:** Discord for real-time sync. Discussions for anything that should be searchable later.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Git

### Setup

```bash
git clone https://github.com/OBLIQ-in/OBLIQ-Website.git
cd OBLIQ-Website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Workflow

```
main (protected)
  └── feature/your-feature  ← work here
        └── PR → main
```

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/features-section`
3. **Develop** your changes
4. **Lint**: `npm run lint`
5. **Build**: `npm run build` — must pass
6. **Commit**: follow [Conventional Commits](https://www.conventionalcommits.org/)
7. **Push** and open a **Pull Request** to `main`

---

## Project Structure

```
src/
├── app/                  ← Next.js App Router pages
│   ├── layout.tsx        ← Root layout + SEO metadata
│   ├── page.tsx          ← Homepage
│   ├── about/
│   ├── features/
│   ├── pricing/
│   ├── blog/
│   └── contact/
│
├── components/
│   ├── ui/               ← Design system primitives
│   │   ├── button.tsx
│   │   ├── container.tsx
│   │   └── section-heading.tsx
│   │
│   ├── layout/           ← Site-wide layout
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   │
│   └── sections/         ← Homepage sections
│       ├── hero.tsx      ← REFERENCE SECTION — read first
│       └── placeholder.tsx
│
├── lib/
│   ├── site.ts           ← Canonical config (URL, nav, social)
│   └── utils.ts          ← cn() and helpers
│
└── types/
    └── index.ts          ← Global TypeScript types
```

---

## Design System

The design system lives in [`src/app/globals.css`](./src/app/globals.css).

### Palette

| Token | Value | Use |
|-------|-------|-----|
| `--obliq-cream` | `#f5f0e8` | Body text |
| `--obliq-lime` | `#c8f560` | Primary accent, CTAs |
| `--obliq-periwinkle` | `#7b8cde` | Secondary accent |
| `--obliq-charcoal` | `#1a1a2e` | Background |

### Key rules

- Always use CSS variables — **never** hardcode hex values in components
- Use the `Container` component for consistent max-width
- Use `SectionHeading` for all section headings
- Use the `Button` component — don't write raw `<button>` elements for CTAs
- Use `cn()` from `src/lib/utils.ts` for conditional class merging

### Reference section

Read [`src/components/sections/hero.tsx`](./src/components/sections/hero.tsx) before building a new section.
It demonstrates the correct pattern for:

- Typography hierarchy
- Spacing
- Animation (CSS keyframes)
- Responsive design
- Accessibility

---

## Assets & Images

To keep the website repository lightweight, **do not commit screenshots, mockups, or binary imagery directly to `OBLIQ-Website`**.

All brand assets, logos, and product screenshots belong in the dedicated repository:  
👉 **[OBLIQ-in/brand-assets](https://github.com/OBLIQ-in/brand-assets)**

### Contributor Workflow for Adding Images

1. **Fork & clone `brand-assets`**:
   ```bash
   git clone https://github.com/<your-username>/brand-assets.git
   cd brand-assets
   ```
2. **Add the file into the correct folder**:
   - `logos/` — SVGs for brand logos and icons
   - `screenshots/` — UI screenshots and mockups (issues #28, #29, #30)
   - `imagery/` — Background patterns, banners, and illustrations
3. **Commit & Open a PR**:
   ```bash
   git add -A
   git commit -m "assets: add compliance tracker screenshot"
   git push origin main
   ```
4. **Use it in the Website**:
   Once merged (or in your PR), reference the asset using `getBrandAssetUrl()` from `@/lib/assets`:
   ```tsx
   import Image from "next/image";
   import { getBrandAssetUrl } from "@/lib/assets";

   export function MyComponent() {
     return (
       <Image
         src={getBrandAssetUrl("screenshots/dashboard.png")}
         alt="Obliq Dashboard"
         width={1200}
         height={700}
       />
     );
   }
   ```

## How to Claim an Issue

1. Go to the [issue tracker](https://github.com/OBLIQ-in/OBLIQ-Website/issues)
2. Find an unassigned issue (look for the `good first issue` or `help wanted` label)
3. Comment: "I'd like to work on this"
4. A maintainer will assign it to you

### Keeping the to-do board current

The homepage board lists open homepage-section issues from `placeholderSections` in
[`src/components/sections/placeholder.tsx`](./src/components/sections/placeholder.tsx).
If your PR builds one of those sections, remove its entry there and render the section
in `src/app/page.tsx` in the same PR, so the board never points at closed work.

---

## Pull Request Guidelines

- **One feature per PR** — keep PRs focused
- **Fill in the PR template** completely
- **Include screenshots** for visual changes
- **Must pass CI** — lint + build must succeed
- **Describe the changes** clearly in the PR description

### Commit message format

```
feat: add features section
fix: navbar scroll on mobile
docs: update contributing guide
style: fix spacing in hero
```

---

## CI Checks

Every PR runs:

| Check | Command |
|-------|---------|
| Lint | `npm run lint` |
| Build | `npm run build` |

Both must pass before a PR can be merged.
