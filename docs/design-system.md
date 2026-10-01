# Obliq Design System

Reference guide for contributors building new sections or components.

---

## Palette

The Obliq palette is extracted from the Framer marketing site:

| Name | CSS Variable | Hex | Use |
|------|-------------|-----|-----|
| Cream | `--obliq-cream` | `#f5f0e8` | Primary text |
| Cream Dark | `--obliq-cream-dark` | `#e8e0cc` | Muted text |
| Lime | `--obliq-lime` | `#c8f560` | Primary accent, CTAs, active states |
| Lime Light | `--obliq-lime-light` | `#dffb8c` | Lime hover states |
| Periwinkle | `--obliq-periwinkle` | `#7b8cde` | Secondary accent, badges |
| Periwinkle Light | `--obliq-periwinkle-light` | `#aab4ee` | Periwinkle highlights |
| Charcoal | `--obliq-charcoal` | `#1a1a2e` | Page background |
| Charcoal 2 | `--obliq-charcoal-2` | `#16213e` | Elevated surfaces |
| Slate | `--obliq-slate` | `#2d3561` | Borders, dividers |
| Muted | `--obliq-muted` | `#6b7280` | Secondary text |

> ⚠️ Always use CSS variables. Never hardcode hex values in components.

---

## Typography

| Role | Font | Weight | Size range |
|------|------|--------|------------|
| Body | Inter | 400, 500 | 14–18px |
| Display / Headings | Plus Jakarta Sans | 600–900 | 24–96px |
| Mono | System mono | 400 | 13–14px |

### Heading scale

```
h1  → text-5xl → text-8xl  (Hero only — one per page)
h2  → text-3xl → text-5xl  (Section headings via SectionHeading)
h3  → text-xl  → text-2xl  (Card headings)
h4  → text-lg              (Sub-section headings)
```

---

## Spacing

All sections use the `section` CSS class:

```css
.section {
  padding-top: var(--section-padding-y);    /* clamp(4rem, 8vw, 7rem) */
  padding-bottom: var(--section-padding-y);
}
```

Container max-width is `1200px` via the `Container` component.

---

## Components

### Button

```tsx
import { Button } from "@/components/ui/button";

// Variants: primary | secondary | periwinkle | ghost | danger
// Sizes: sm | md | lg | xl | icon

<Button variant="primary" size="lg">Get started</Button>
<Button href="/contact" variant="secondary" size="md">Learn more</Button>
<Button href="https://github.com/..." variant="ghost">GitHub</Button>
```

### Container

```tsx
import { Container } from "@/components/ui/container";

<Container>          {/* max-w: 1200px */}
<Container narrow>   {/* max-w: 768px  */}
```

### SectionHeading

```tsx
import { SectionHeading } from "@/components/ui/section-heading";

<SectionHeading
  eyebrow="Features"
  heading="Everything you need"
  subheading="..."
  gradient          // lime gradient on heading text
  align="center"    // "center" | "left"
/>
```

---

## Utilities

### cn()

Merge Tailwind classes safely:

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class", className)} />
```

### CSS utility classes

| Class | Effect |
|-------|--------|
| `text-gradient-lime` | Lime gradient text |
| `text-gradient-periwinkle` | Periwinkle gradient text |
| `text-gradient-brand` | Lime → periwinkle gradient text |
| `glass` | Glassmorphism background + blur |
| `glass-hover` | Glass on :hover |
| `glow-lime` | Lime box-shadow glow |
| `glow-periwinkle` | Periwinkle box-shadow glow |
| `bg-mesh` | Background with radial gradient orbs |
| `section` | Standard section vertical padding |
| `container-obliq` | Equivalent to `<Container>` |
| `divider` | Horizontal gradient divider line |
| `placeholder-section` | Contributor placeholder dashed border |

### Animations

```css
.animate-fade-up    /* fade + slide up — use for content entrance */
.animate-fade-in    /* opacity fade */
.animate-float      /* infinite vertical float */
.animate-pulse-lime /* pulsing lime glow */
```

These are for on-load entrances (e.g. the hero). For anything that should
animate **as it scrolls into view**, use the `Reveal` primitive — never a
one-off animation:

```tsx
import { Reveal } from "@/components/ui/reveal";

<Reveal>…</Reveal>                       {/* fade + 16px rise, once */}
{items.map((item, i) => (
  <Reveal key={item.id} index={i}>…</Reveal>  /* 60ms stagger per index */
))}
```

`SectionHeading` and `SectionPlaceholder` already use it. Only content below
the fold is hidden (after mount), so above-the-fold content, no-JS visitors
and `prefers-reduced-motion: reduce` users always see content immediately.
With reduced motion, all animations and transitions site-wide are disabled.

---

## Accessibility

- Use semantic HTML (`<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`)
- Every section must have an `aria-label` or be labelled by a heading
- All interactive elements must be keyboard accessible
- Use `aria-hidden="true"` on decorative icons and elements
- Maintain 4.5:1 contrast ratio for body text
- `focus-visible` ring is defined globally — don't remove it

---

## Dark mode

The site has a light and a dark theme. The navbar's sun/moon button switches between them; the choice is saved in `localStorage` (`theme`), and with no saved choice the site follows the OS setting (`prefers-color-scheme`), live. An inline script in `layout.tsx` sets the theme before first paint, so there is no flash of the wrong theme.

How it works: `.dark` on `<html>` redefines the `:root` tokens in `globals.css`. Cream and ink swap places; accents (`--lime`, `--sky-ring`) stay. **Use tokens, not raw colours,** and new components get dark mode for free:

| Instead of | Use |
|---|---|
| `bg-white` (cards, fields) | `bg-[var(--surface)]` (opacity works: `bg-[var(--surface)]/70`) |
| `text-white` on an ink/charcoal fill | `text-[var(--on-ink)]` |
| `border-[rgba(0,0,0,0.12)]`, `hover:bg-[rgba(0,0,0,0.05)]` | `border-[rgb(var(--tint-rgb)/0.12)]`, `hover:bg-[rgb(var(--tint-rgb)/0.05)]` |
| a one-off hex colour | a token from `:root` (add one, with a `.dark` value, if none fits) |

- For the rare dark-only tweak, Tailwind's `dark:` variant follows the `.dark` class (e.g. `dark:bg-white/15`).
- Wrap anything that must stay light, such as a product screenshot, in `.theme-light`; `MockupFrame` already does.
- Check new sections in both themes before opening a PR.

---

## Reference section

Before building a new section, read:
[`src/components/sections/hero.tsx`](../src/components/sections/hero.tsx)

It demonstrates every pattern listed above in a working implementation.
