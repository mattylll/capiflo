# Capiflo Design System

_Last updated: 15 Nov 2025_

## 1. Brand Foundations

### 1.1 Colour Palette
| Token | Hex | Usage |
| --- | --- | --- |
| `--capiflo-bg` | `#F7F7F9` | Page background, large sections |
| `--capiflo-surface` | `#FFFFFF` | Cards, drawers, modals |
| `--capiflo-text` | `#0E0E0F` | Primary body text |
| `--capiflo-muted` | `#5F6166` | Secondary text, helper copy |
| `--capiflo-border` | `#E1E2E6` | Border strokes, dividers |
| `--capiflo-accent` | `#2F6BFF` | Primary CTA, links |
| `--capiflo-accent-soft` | `rgba(47, 107, 255, 0.12)` | Hover/focus glows |

> Tailwind theme tokens should map to these CSS variables and support dark mode equivalents (swap bg/text contrast, accent lightness).

### 1.2 Typography
| Style | Font | Size | Weight | Usage |
| --- | --- | --- | --- | --- |
| Display | `Inter`, `SF Pro Display`, `system` fallback | clamp(3rem, 6vw, 4rem) | 600 | Hero headings |
| H2 | `Inter` | 2.25rem / 130% | 600 | Section titles |
| Body | `Inter` | 1rem / 150% | 400 | Main copy |
| Small | `Inter` | 0.9rem / 150% | 400 | Labels, helper text |
| Mono | `Space Mono`, monospace | 0.95rem | 500 | Data points, stats |

Use generous spacing (line-height ≥ 1.4) and letter spacing `-0.01em` for headings.

### 1.3 Iconography & Imagery
- Prefer thin-stroke icons with rounded corners.
- Use real UK SME photography; avoid cliché stock.
- Apply soft gradients or duotone overlays for brand cohesion.

## 2. Layout & Spacing
- 12-column grid with 72px max gutter on desktop, 24px on mobile.
- Section padding: 80px desktop, 56px tablet, 32px mobile.
- Components use `rounded-2xl` and `shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]` for depth.
- Maintain minimum 32px spacing between stacked blocks; use bento layout for feature grids (2x3 tiles desktop).

## 3. Components

### 3.1 Buttons
- Primary: solid accent background, white text, subtle glow on hover.
- Secondary: outline using `--capiflo-border`, text in accent colour.
- Ghost: transparent background, accent text, used for inline CTAs.
- States: hover adds 4px shadow + 1% scale, focus ring `0 0 0 3px var(--capiflo-accent-soft)`.

### 3.2 Cards
- Base card uses ShadCN `Card` with `rounded-3xl`, 32px padding, `shadow-lg`.
- Bento tiles can include gradient border (`border-gradient`) and small icon.
- Cards should support light/dark modes with CSS variables.

### 3.3 Forms
- Form controls from ShadCN `Form`, `Input`, `Select`, `Textarea`.
- Labels use small text style, helper text uses muted colour.
- Focus rings must meet WCAG contrast; include inline validation states with red text `#FF3D71`.

### 3.4 Modals & Drawers
- Use ShadCN `Dialog` and `Sheet` components.
- Backdrop blur (`backdrop-blur-md`) with 40% opacity overlay.
- Modal width limited to 560px for wizards; drawers slide from right with 24px inset.

## 4. Motion & Interaction
- Page transitions: fade/slide using Framer Motion, 400ms ease-out.
- Hover transitions: 200ms ease; limit scale to 1.02.
- Micro-interactions (stats counters, progress) should feel smooth and understated.

## 5. Accessibility
- Minimum text contrast 4.5:1.
- Focus outline visible even in dark mode.
- Ensure form controls reachable via keyboard; modals trap focus.

## 6. Implementation Notes
- Map tokens in `tailwind.config.ts` to CSS variables declared in `globals.css`.
- Provide dark mode by inverting bg/text tokens and using toned-down accent (#8FB3FF).
- Document any new components in this file when introduced.
