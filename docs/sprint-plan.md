# Capiflo Sprint Plan

- **Document owner:** Capiflo AI/dev agent
- **Last updated:** 15 Nov 2025
- **Sprint length:** 1 week
- **Tooling expectations:** Every sprint should be tracked through GitHub issues (labels: `sprint-x`, `page`, `calculator`, `design`, `integration`, etc.) and summarised in `docs/build-log.md`.

## Sprint 0 – Project Foundations
- **Goal:** Prepare the codebase and documentation so the team can deliver at Apple-grade quality without friction.
- **Deliverables:**
  - Repo cloned, environment variables & package managers verified.
  - PRD captured (docs/prd.md), sprint plan agreed, documentation scaffolds created (`docs/build-log.md`, `docs/design-system.md`, `docs/architecture.md`, `CHANGELOG.md`).
  - Issue templates / labels configured in GitHub.
- **Acceptance criteria:** Able to run dev server locally; baseline docs committed.

## Sprint 1 – Core Branding & Homepage MVP
- **Goal:** Ship a live-quality homepage that conveys the Capiflo brand.
- **Key user value:** Visitors immediately understand Capiflo’s trustworthiness and can start a funding journey within hero/CTA sections.
- **Deliverables:**
  - Implement global theming (typography, colour tokens, light/dark support) in Tailwind + ShadCN.
  - Build navigation/header/footer with CTA buttons.
  - Craft hero + initial bento grid for key funding sectors.
  - Add trust indicators (logos, stats) and two quick calculator entry cards.
  - Set up analytics stub (e.g., placeholder for Vercel Analytics or Segment).
- **Acceptance criteria:** CLS < 0.1 on homepage template, hero CTA links operational, design reviewed against `docs/design-system.md`.

## Sprint 2 – Priority Funding Pages & Calculators
- **Goal:** Enable deep dives into two priority sectors with embedded calculators.
- **Deliverables:**
  - Pages: `/funding/business-loans`, `/funding/invoice-finance` with sections (What it is, Who it’s for, Criteria, Use cases, FAQ, CTA wizard).
  - Components: Business Loan Eligibility & Range calculator, Repayment calculator (shared component usage demo).
  - Lead capture hook after calculator completion (stores data locally / mocked server action).
  - Update navigation + sitemap data to reference new routes.
- **Acceptance criteria:** Calculators respond instantly to input, capture forms validate, content follows SEO heading structure.

## Sprint 3 – Calculator Suite Expansion & Contact Flow
- **Goal:** Cover the remaining calculators needed for MVP lead quality and introduce the guided lead capture wizard.
- **Deliverables:**
  - Merchant Cash Advance, Invoice Finance Advance, VAT & Corporation Tax calculators.
  - Borrowing Power Quick Check with basic AI summary stub (server action returning templated guidance for now).
  - 3-step lead capture wizard (Business Basics → Funding Snapshot → Contact & Consent) integrated with calculators and `/contact`.
  - Start `/calculators` index page with cards linking to each tool.
- **Acceptance criteria:** Wizard enforces GDPR consent, calculators share base components, mobile layout validated.

## Sprint 4 – Content Expansion & Knowledge Centre
- **Goal:** Provide comprehensive sector coverage and launch the Knowledge Centre/blog foundation.
- **Deliverables:**
  - Remaining funding pages (MCA, Asset, VAT, Corp Tax, Start-Up, Property-Backed, Recovery, Growth) with shared templates.
  - `/about`, `/contact`, `/legal/privacy`, `/legal/terms` content.
  - Blog listing page + MDX-ready article structure with `/blog/[slug]` template.
  - docs/architecture.md outlining folder structure, calculator abstraction, data flow.
- **Acceptance criteria:** Lighthouse SEO score > 90 for key pages, route list matches PRD, MDX articles render with metadata.

## Sprint 5 – Integrations & Smart Routing Foundations
- **Goal:** Connect lead outputs to CRM and lay groundwork for AI-driven routing.
- **Deliverables:**
  - Define integration layer (e.g., server action posting to GoHighLevel/HubSpot webhooks; use mocked endpoint if credentials pending).
  - Add tagging metadata to calculator submissions.
  - Implement JSON-LD for Organisation + FAQ, Open Graph tags for key pages.
  - docs/design-system.md completed with colours, typography, spacing, component usage, animation guidelines.
- **Acceptance criteria:** Test webhook receives structured payload, metadata validated via schema.org testing tools, design system reviewed.

## Sprint 6 – Optimisation & Smart Recommendations
- **Goal:** Upgrade routing intelligence and polish UX/performance ahead of launch.
- **Deliverables:**
  - AI summary service that recommends funding types post-calculator (could use rules-based stub + LLM hook abstraction).
  - Lead prioritisation tags feeding CRM stages.
  - Performance optimisations (image strategy, code splitting, caching) to hit Core Web Vitals targets.
  - CHANGELOG.md entries for each release candidate (v0.1.0, v0.2.0, etc.).
  - docs/build-log.md retro for Sprint 5–6.
- **Acceptance criteria:** Automated tests for calculators & forms, Lighthouse performance > 90 mobile, smart recommendations visible in CRM payloads.

## Ongoing Ceremonies
- **Backlog grooming:** Twice per sprint, ensure PRD coverage, redefine acceptance criteria when scope shifts.
- **Sprint review:** Demo completed pages/calculators, capture stakeholder feedback.
- **Retro:** Log in `docs/build-log.md` (what went well, risks, actions).
- **Release cadence:** Tag releases at end of each sprint; update `CHANGELOG.md` with semantic versions.
