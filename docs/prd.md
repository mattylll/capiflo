# Capiflo – Product Requirements Document (PRD)

- **Version:** v1.1
- **Date:** 15 Nov 2025
- **Brand:** Capiflo
- **Category:** UK SME Finance Platform (Broker)
- **Objective:** Build the UK’s most trusted, Apple-grade SME funding website with instant calculators, intelligent routing, and a premium UX that elevates trust and conversions — using the `nextjs-16-starter-shadcn` repo as the base.

## 1. Executive Summary

Capiflo is a national SME funding platform offering fast, transparent, and personalised finance solutions for UK businesses. The platform should:

- Feel premium (Apple-like design, minimal, beautifully spaced, high trust)
- Offer AI-powered calculators and guided funding journeys
- Cover multiple SME funding sectors (loans, MCA, invoice finance, asset, VAT, Corp tax, etc.)
- Capture qualified leads for brokerage and lender partners
- Run on a modern Next.js 16 + ShadCN stack using the GitHub starter repo: [`siddharthamaity/nextjs-16-starter-shadcn`](https://github.com/siddharthamaity/nextjs-16-starter-shadcn)

Development will be conducted via short sprints with an AI/dev agent that logs all build steps in GitHub (issues, milestones, build-log, PR descriptions).

## 2. Goals & KPIs

### 2.1 Primary Goals

1. Establish Capiflo as a national SME funding brand with a distinctly high-end design.
2. Enable users to find and apply for the right funding product within 60 seconds.
3. Use calculators plus guided flows to generate high-quality, structured finance leads.
4. Build on a clean, extensible Next.js 16 + ShadCN base for future AI + API integrations.

### 2.2 Key KPIs

- Landing → Lead Conversion Rate: 8–12%
- Calculator Usage Rate: 40%+ of visitors
- Lead Data Completeness: 75%+ required fields
- Organic Traffic (6 months): 10k/month
- Core Web Vitals: Good on mobile (LCP < 2s, CLS < 0.1)

## 3. Target Users

### 3.1 SME Owners & Directors

- **Turnover:** ~£75k–£20m
- **Pain:** rejected by bank or confused by options, time-poor
- **Need:** clarity, speed, reassurance, and a “done-with-you” feeling

### 3.2 Brokers / Partners

- Networking hosts, accountants, advisors etc.
- Need: a premium destination they’re proud to send clients to

### 3.3 Lenders

- Want structured, pre-vetted applications
- Need: clean, consistent data and documentation from Capiflo

## 4. Core Features

### 4.1 Homepage (Apple-like Hero Experience)

- **Hero section:** Clean, high-contrast layout with minimal copy and strong primary CTA: `Get Funding` (primary) and `Check Eligibility` (secondary).
- **Bento-style content grid:** Each tile for a funding sector (Loans, MCA, Invoice, Asset, VAT, Corp Tax, etc.) linking to sector pages and/or launching calculators.
- **Instant entry points to calculators:**
  - “How much can I borrow?”
  - “Estimate my repayments”
- **Trust elements:** Lender logos and reviews/outcomes (e.g. “Helped SMEs unlock £X funding”).
- **Micro-interactions:** Subtle hover states, light gradients, smooth scroll transitions.

### 4.2 Funding Sector Pages

Each sector page includes plain-English explanations, target profiles, criteria, embedded calculators, use cases, FAQ, and a primary CTA (`Check your options`) that opens a short wizard.

Core sector pages:

- Business Loans
- Merchant Cash Advance
- Invoice Finance
- Asset Finance
- VAT Loans
- Corporation Tax Loans
- Start-Up Loans
- Property-Backed Loans (bridging / development)
- Recovery / Turnaround Finance
- Growth & Expansion Finance

### 4.3 Calculator Suite (AI-Powered)

- Modular React components styled with ShadCN + Tailwind.
- Smooth, real-time updates and responsive layouts.
- Each calculator ends with soft lead capture (email + phone + consents).
- Calculation logic separated from UI for easy extension.

Initial calculators:

1. **Business Loan Eligibility & Range** – Inputs: turnover, years trading, profit, credit profile, purpose. Outputs: estimated range, product fit, rate band.
2. **Repayment Calculator** – Inputs: amount, term, rate band. Outputs: monthly repayments, total repayable, simple chart.
3. **Merchant Cash Advance Calculator** – Inputs: monthly card revenue, advance size, factor rate. Outputs: repayment estimate, % of card sales, timeline.
4. **Invoice Finance Advance Calculator** – Inputs: invoice amount, advance %, fees. Outputs: upfront cash, approximate cost.
5. **Borrowing Power Quick Check (AI)** – Inputs: turnover, years trading, sector, security Y/N. Outputs: AI summary of potential options.
6. **VAT & Corporation Tax Funding Calculators** – Sliders showing financing impact on cashflow.

### 4.4 Smart Routing (Phase 2+)

- AI summary after calculators/wizards.
- System tags lead with recommended products + priority.
- Routes to internal pipeline (GoHighLevel / HubSpot) with appropriate stage.

### 4.5 Lead Capture Flow

- Three minimal steps (Business Basics, Funding Snapshot, Contact & Consent).
- Built with ShadCN components, plenty of whitespace, progress indicator, and easy back navigation.

### 4.6 Knowledge Centre / Blog

- Structured content types (product guides, scenario guides, case studies).
- Card grid layout with ShadCN Cards, SEO-optimised with proper headings and metadata.

### 4.7 CRM & Automation Integration

- Integrate with GoHighLevel or HubSpot for lead capture, tagging, pipeline movement, and follow-up sequences.
- Calculator submissions create contacts and deals, attaching structured data as custom fields.

## 5. Design Brief (Integrated)

### 5.1 Design Philosophy – “Apple for Business Finance”

- Calm, confident, premium aesthetic.
- Minimalistic layouts, strong typography, subtle motion.

### 5.2 Visual Style

- **Colours:** White/off-white/soft grey base, charcoal text, single electric blue accent.
- **Typography:** Inter/SF Pro-style fonts, large headings, generous line-height.
- **Layout:** 12-column responsive grid, bento boxes, generous padding.
- **UI Elements:** ShadCN buttons/inputs/cards with slight rounding and soft shadows, dark mode ready.

### 5.3 Interactions

- Smooth page transitions, hover states with subtle scale/shadow/border glow, use drawers/modals instead of popups.

### 5.4 Imagery

- Realistic UK business imagery, avoid cliché stock photos.

### 5.5 Accessibility

- WCAG-compliant contrast, keyboard navigable forms, clear focus states.

## 6. Technical Architecture

### 6.1 Base Repository

- Use `siddharthamaity/nextjs-16-starter-shadcn` foundation with Next.js 16 (App Router), React 19, TS 5, Tailwind v4, ShadCN, theme switching, ESLint + Prettier, Docker files, and `/src` structure.
- Extend existing patterns (components.json, ESLint/Prettier, Next.js conventions).

### 6.2 Architecture Overview

- **Frontend:** Next.js 16 App Router
- **UI Layer:** ShadCN components + Tailwind utilities
- **Styling:** Tailwind CSS with Capiflo design tokens
- **State:** Local component state + server actions
- **Forms:** Next.js server actions or API routes with ShadCN Form
- **CMS:** Initially file-based/MDX or JSON; later Sanity/Contentful
- **Deployment:** Vercel preferred; Docker optional

## 7. Pages & Routes

Core routes:

- `/` – Homepage
- `/about`
- `/contact`
- `/funding/business-loans`
- `/funding/merchant-cash-advance`
- `/funding/invoice-finance`
- `/funding/asset-finance`
- `/funding/vat-loans`
- `/funding/corporation-tax-loans`
- `/funding/start-up-loans`
- `/funding/property-backed`
- `/funding/growth`
- `/calculators`
- `/blog`
- `/blog/[slug]`
- `/legal/privacy`
- `/legal/terms`

## 8. SEO & Performance

- Semantic HTML, correct heading hierarchy.
- Meta titles/descriptions per page.
- Open Graph + Twitter cards.
- JSON-LD schema (Organisation, FAQ, Product/Service).
- Prefer static generation; server render only when needed.
- Optimise imagery with `<Image />`.

## 9. Security & Compliance

- Enforce HTTPS.
- Sanitize/validate inputs on server actions/APIs.
- GDPR-compliant consents.
- Clear Privacy & Terms pages.
- Store secrets in env vars (never client-side).

## 10. Development Process: Sprints & Agent-Led Build Logging

### 10.1 Sprints

- 1-week sprints with clear goals, labelled GitHub issues, short retro added to `docs/build-log.md`.

### 10.2 Agent Responsibilities

- Translate PRD into backlog.
- Create GitHub issues with labels (`page`, `calculator`, `integration`, `design`, `bug`, `chore`).
- Plan sprints, ensure issues have acceptance criteria + DoD.
- Maintain `docs/build-log.md`, root `CHANGELOG.md`, and `docs/design-system.md`.
- Document every PR with linked issues and concise descriptions.

### 10.3 Required Repo Files for Process

- `docs/build-log.md`
- `CHANGELOG.md`
- `docs/design-system.md`
- `docs/architecture.md`

## 11. Phased Delivery

| Phase | Timeline | Focus |
| --- | --- | --- |
| Phase 1 – Foundation & MVP (Weeks 1–3) | Fork/clone repo, set branding, base layout/nav, homepage, 2 funding pages, 2 calculators, basic contact form, analytics, CRM integration. |
| Phase 2 – Full Sector Coverage & Calculator Suite (Weeks 4–7) | Remaining funding pages + calculators, Knowledge Centre/Blog, refined styling, SEO improvements. |
| Phase 3 – Smart Routing & Optimisation (Weeks 8–10) | AI recommendations, lead tagging/routing, A/B tests, performance & UX refinements. |

## 12. Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Over-complex calculators | Start simple; iterate with user feedback. |
| Design drift away from Apple-like standard | Maintain `docs/design-system.md` and run regular UI reviews. |
| Inconsistent logging/documentation | Make build-log & changelog updates part of DoD. |
| API/CRM integration issues | Start with simple webhook/email integration, then upgrade. |

## 13. Success Criteria

Capiflo v1 succeeds when:

- The site matches high-end fintech/Apple-esque visuals.
- Calculators drive the majority of lead submissions.
- Agents can easily extend the system with new calculators/pages.
- Lenders/partners receive well-qualified, structured leads.
- Sprint logs and documentation keep future iteration friction low.
