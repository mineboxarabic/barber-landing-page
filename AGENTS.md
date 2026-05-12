# Barber Landing Page — Agent Context

## Stack

- **Framework:** Create React App (CRA) + TypeScript (strict)
- **Styling:** Tailwind CSS v3 — config in `tailwind.config.js`, directives in `src/index.css`
- **Animation:** Framer Motion (`motion.*` components + `useInView` hook)
- **Build tool:** Webpack (via react-scripts)

> Note: Tailwind v4 was not used — v4's `@import 'tailwindcss'` is incompatible with CRA's webpack pipeline without ejecting.

## Design System

Inspired by: https://abels-on-queen-dtk-barbershop.webflow.io

### Brand Colors (defined in `src/index.css` under `@theme`)

| Token                    | Hex       | Usage                        |
|--------------------------|-----------|------------------------------|
| `--color-brand-burgundy` | `#672f25` | Primary headings, accents    |
| `--color-brand-green`    | `#708472` | Buttons, secondary headings  |
| `--color-brand-brown`    | `#a16a38` | Links, decorative text       |
| `--color-brand-dark`     | `#161616` | Main background              |
| `--color-brand-charcoal` | `#272729` | Card backgrounds             |
| `--color-brand-gray`     | `#afa99f` | Muted text                   |
| `--color-brand-light`    | `#d9d8d6` | Light text on dark bg        |
| `--color-brand-cream`    | `#f4e4de` | Hero / light section bg      |

In Tailwind v4, use these as: `bg-(--color-brand-dark)`, `text-(--color-brand-green)`, etc.

### Typography

- `--font-script` → "Great Vibes" (cursive) — decorative script headings
- `--font-serif` → "Sorts Mill Goudy" (serif) — body, elegant text
- `--font-sans` → Helvetica Neue, system fallbacks — UI elements
- Fonts loaded from Google Fonts in `src/index.css`

### Animation Conventions

- **Scroll reveal:** `opacity: 0` + `translateY(60px)` → `opacity: 1` + `translateY(0)`
- **Duration:** 0.6s ease-out, stagger children by 0.1–0.15s
- **Trigger:** Use Framer Motion `useInView` with `{ once: true, margin: '-80px' }`
- **Page load:** Fade-in the whole page; hero logo scales from 1.5x → 1x

## Page Sections (in order)

1. `Hero` — Full viewport, dark bg, large logo, tagline, CTA button
2. `Story` — Two-column: image/monogram left, brand narrative right
3. `Gallery` — Grid of 8 images
4. `Team` — 6 barber cards with hover effects and booking links
5. `Contact` — Two-column: hours/info left, map right
6. `Footer` — Monogram, copyright, social links

## Folder Structure

```
src/
├── components/   # Reusable UI (Button, Card, SectionWrapper, etc.)
├── sections/     # Full-page sections (Hero.tsx, Story.tsx, etc.)
├── hooks/        # Custom hooks (useScrollAnimation, etc.)
├── assets/       # Images, SVGs (imported via TS, not public/)
├── styles/       # globals.css for non-Tailwind overrides
└── App.tsx       # Section assembly only — no logic here
```

## Imports

CRA resolves from `src/` as baseUrl — use bare paths (no `@` prefix):

```ts
import Foo from 'components/Foo';
import HeroSection from 'sections/Hero';
import { useInViewReveal } from 'hooks/useInViewReveal';
```

Note: `paths` aliases in tsconfig.json are TypeScript-only; CRA webpack does not resolve them.

## Rules for Agents

- **Always use Tailwind classes** — never inline styles unless CSS variables are needed
- **No comments** unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- **No extra abstractions** — build exactly what the current section needs
- **Framer Motion only** for animations — no CSS keyframes except in `globals.css` for unavoidable cases
- **TypeScript strict** — no `any`, always type props explicitly
- **Barrel imports** — export new components/hooks through their folder's `index.ts`

## Dev Commands

```bash
npm start        # Dev server on http://localhost:3000
npm run build    # Production build
npx prettier --write src/   # Format all source files
npx eslint src/             # Lint check
```
