# Capiflo Architecture Overview
_Last updated: 15 Nov 2025_

## 1. Stack Summary
- **Framework:** Next.js 16 (App Router, React Server Components + Server Actions)
- **Language:** TypeScript 5, React 19
- **Styling:** Tailwind CSS v4 using ShadCN component library
- **State:** Local component state + server actions for mutations; `useFormState` for forms
- **Tooling:** ESLint, Prettier, testing via Playwright / Vitest (to be introduced), Docker for deployment parity

## 2. Directory Structure (initial)
```
/
├── docs/                  # PRD, sprint plans, design + architecture docs
├── public/                # Static assets (logos, icons, og images)
├── src/
│   ├── app/               # App Router pages, layouts, metadata
│   │   ├── (marketing)/   # Marketing routes (home, about, funding, calculators)
│   │   ├── (legal)/       # Privacy, terms
│   │   └── api/           # Route handlers / server actions
│   ├── components/        # Design system + shared UI (ShadCN)
│   ├── lib/               # Utility modules (calculations, formatting, analytics)
│   ├── data/              # Static JSON/MDX content, calculators config
│   └── styles/            # Tailwind base, CSS variables
├── components.json        # ShadCN component manifest
├── package.json
└── README.md
```

## 3. Layered Responsibilities
1. **Pages (app/)** – Compose sections, fetch content, handle metadata, and orchestrate calculators/forms.
2. **Components** – Presentational units (Hero, BentoGrid, CTA) built atop ShadCN primitives.
3. **Lib** – Pure logic (calculator math, validation, routing rules, CRM payload builders).
4. **Data** – YAML/JSON/MDX describing funding products, FAQs, blog posts.
5. **Infrastructure** – Next config, Tailwind config, Docker, env management.

## 4. Calculators Architecture
- Each calculator resides under `src/components/calculators/<name>` with:
  - `types.ts` – input/output interfaces
  - `logic.ts` – pure calculation functions, unit-testable
  - `ui.tsx` – ShadCN form controls + result display
- Shared hooks (e.g., `useCalculatorForm`) manage state, validation, lead capture handoff.
- Server action `createLead` persists results to CRM via webhook.

## 5. Lead Capture & Routing
- Lead wizard implemented as `src/components/forms/lead-wizard` using ShadCN `Stepper` pattern.
- On submit, server action packages payload `{ company, fundingSnapshot, contact, tags }`.
- Phase 1: store in Supabase/edge KV or send to webhook stub.
- Phase 2: integrate CRM (GoHighLevel/HubSpot) via secure API key stored in env.
- Smart routing uses `lib/routing/rules.ts` to classify leads; optional AI integration in `lib/routing/ai.ts`.

## 6. Content & Blog
- Funding pages read JSON/MDX from `src/data/funding/<slug>.json`.
- Blog uses MDX with frontmatter; Next.js generates static params.
- Knowledge Centre components under `src/components/blog` with ShadCN Cards.

## 7. Theming Strategy
- Define CSS variables in `src/styles/theme.css` for colours/spacing.
- Tailwind uses `@theme` directive referencing variables for easy updates.
- Dark mode toggled via ShadCN theme provider.

## 8. Testing & Quality
- Unit tests for calculator logic in `__tests__/calculators` using Vitest.
- Component tests via Storybook/Playwright (future sprint).
- CI pipeline (GitHub Actions) runs lint, type-check, tests on PRs.

## 9. Deployment
- Primary target: Vercel (auto from main branch).
- Dockerfile supports container builds; env vars injected via Vercel dashboard.
- Use `vercel.json` or Next config for caching headers, rewrites if needed.

## 10. Observability & Analytics
- Introduce analytics placeholder (Vercel Analytics); expand to Segment + FullStory as required.
- CRM integration logging to server console + optional Slack webhook for lead alerts.

Maintain this doc as architecture evolves (e.g., data store changes, AI services, integration layers).
