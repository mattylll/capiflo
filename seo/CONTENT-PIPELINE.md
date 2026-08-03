# Capiflo Content Pipeline

How every piece of Capiflo content gets researched, generated and verified. Two methodologies are
wired in as tooling — run them, don't improvise:

- **Entity & hierarchy method (Bradley Benner / local-entities-pseo skill)** — governs *location*
  pages: entity variants per optimisation slot, Wikipedia-derived hierarchy, the "true statement"
  rule for what each page is optimised for.
- **DataForSEO content engine (dataforseo-content-engine skill)** — governs *article* content
  (guides, calculator articles, product pages): research before writing, SERP-calibrated briefs,
  Surfer-style term/entity coverage scoring, density gates.

Strategy artefacts live in `seo/` (`ENTITY-BRIEF.md` is the master brief). Runtime engine lives in
`src/lib/seo/`. Research credentials: `DATAFORSEO_AUTH` in `.env.local` (see `.env.local.example`).

---

## The commands

| Command | What it does | Output |
|---|---|---|
| `npm run seo:research` | Full research refresh: keyword overview + related + SERP + PAA for the product matrix | `seo/keyword-research/<date>.{json,md}`, `seo/serp-research/*` |
| `npm run seo:wiki` | Benner Wikipedia harvest: canonical titles, bold lead synonyms, What-links-here redirects for every county + town (filtered for typo/junk redirects) | `src/data/locations/wiki-variants.ts` (generated, committed) |
| `npm run seo:clusters -- "seed kw"` | Keyword clusters (calculators / questions / rates / guides) with UK volume + CPC | `seo/clusters/*` |
| `npm run seo:serp -- "kw"` | SERP snapshot: who ranks, PAA, related searches | `seo/serp/*` |
| `npm run seo:brief` | Per-article briefs for every entry in `seo/articles-content-engine.json` (skips existing) | `seo/briefs/<slug>.json` |
| `npm run seo:entities -- "kw" [built.html] [slug]` | SERP-consensus target terms + named entities + 0-100 content score of a draft | `seo/entities/<slug>.{json,md}` |
| `npm run seo:density -- "kw" [built.html]` | Rank-weighted density benchmark for the fixed entity list (`seo/entities-sme-finance.json`) | stdout + `seo/density/*` |
| `npm run generate-content` | Location prose generator CLI (dry-run/validate modes; live prose is computed at render time) | in-memory / validation report |

DataForSEO calls cost credits — `seo:brief` skips existing briefs, and `seo:entities`/`seo:serp`
are one SERP pull per keyword. Batch keyword lookups; don't loop `seo:serp` over hundreds of terms.

---

## Pipeline A — location pages (Benner method)

Location prose is **computed at render time** (`townVariants()` + the generators in
`src/lib/content-generation/`), not persisted. The research feeding it:

1. **Hierarchy + variants** — `npm run seo:wiki` harvests entity variants for all 71 counties and
   388 towns into `src/data/locations/wiki-variants.ts`. `entity-variants.ts` consumes them
   deterministically (hash-seeded, ISR-safe): secondary slots (H2 economy, H3 fragments) rotate
   through Wikipedia variants; the H1 always keeps the canonical head entity.
2. **Slot discipline** — every optimisation slot uses a *different* entity variant
   (URL ≠ title ≠ H1 ≠ H2a–e ≠ H3s). Implemented in `src/lib/seo/entity-variants.ts`; the slot
   table is `seo/ENTITY-BRIEF.md` §7. H1s carry an AI-search trigger word variant ("Specialist …")
   on a deterministic subset of pages.
3. **True-statement rule** — Capiflo has no physical premises, so the homepage is optimised for
   the United Kingdom entity, county pages for the county, town pages for the town. Never optimise
   a page for an area smaller than what it genuinely serves — and never larger than is true.
4. **Anti-thin gates** — `src/lib/seo/tiering.ts` grades towns A/B/C on real data richness and
   maps to sitemap priority; `src/lib/content-generation/validators.ts` enforces word counts and
   section minimums. Below-minimum towns get reduced sections, never padded fluff.
5. **New locations** — add the town/county data file, run `npm run seo:wiki -- --counties=<slug>`,
   build. For a genuinely new *area strategy* (e.g. expanding to a new country), run the
   local-entities-pseo skill's research-brief stage first and get sign-off on the hierarchy.

**Sub-page rule:** neighbourhoods are H3s on the town page, not separate pages. Only split out a
sub-page when the parent demonstrably fails to rank for `[service] [neighbourhood]` after ~3 weeks.

## Pipeline B — articles: guides, calculators, product pages (DataForSEO engine)

The rule is **research before writing** — never author to a keyword without pulling its SERP.

1. **Map demand** — `npm run seo:clusters -- "business loans" …` to find pages worth building.
2. **Scope the SERP** — `npm run seo:serp -- "<head kw>"`; confirm the dominant entity and note
   PAA (disambiguation traps are catalogued in `seo/ENTITY-BRIEF.md` §4).
3. **Brief** — add `{ slug, keyword, cluster }` to `seo/articles-content-engine.json`, run
   `npm run seo:brief`. You get top-3 competitor H1/H2/H3, density targets, word-count target, PAA.
4. **Discover coverage targets** — `npm run seo:entities -- "<kw>"` for the Surfer-style
   consensus term list with recommended usage counts.
5. **Author** — write the `ArticleContent` module in `src/content/{calculators,guides}/<slug>.ts`:
   hit the word count; 6–8 question-led entity-distinct H2s from brief + PAA; open definitions
   with semantic triples; answer PAA in the FAQ block. Voice: first-person plural broker voice,
   no em/en dashes, source-cite market figures, "we arrange / we match" never "we lend",
   never imply FCA authorisation (Capiflo arranges unregulated business lending only).
6. **Verify** — grade the *authored strings in the content module* (not the built `.html` — RSC
   shells are near-empty): `npm run seo:entities -- "<kw>" <rendered-or-source> <slug>` for the
   content score (aim ≥70) and MISSING/UNDER-USED lists; `npm run seo:density -- "<kw>" …` for
   the fixed-list density gate. Close real gaps; note deliberately-skipped generic terms.

## The gates (every page, before ship)

- One H1; title ≠ H1; every H2 a distinct entity; H3s under H2s; no H-tags in nav/footer.
- Entity coverage ≥ ~70 content score for articles; density 1.0–1.8% for the head keyword, never >3%.
- Semantic triple in the intro, each H2 opener, conclusion, image alts (`semantic-triples.ts`).
- FAQ answers real PAA from `seo/serp-research/paa.json` / the brief.
- Schema: JSON-LD parses; no fabricated data (ratings, NAP, SearchAction) — placeholder-gated
  fields stay hidden until real values land in `src/data/business-config.ts`.
- Regulatory: broker-not-lender framing; unregulated business lending; no FCA implication.

## Cadence

- `seo:research` + `seo:wiki`: quarterly, or when adding locations/products.
- `seo:brief` + authoring: per new article.
- `seo:entities` verification: per article at authoring time, and spot-check the live cluster
  quarterly (loop over built pages and roll up missing terms).
