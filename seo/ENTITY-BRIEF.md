# Capiflo — Entity Brief & pSEO Strategy

_Source data: `seo/keyword-research/2026-06-02.{json,md}`, `seo/serp-research/*` (DataForSEO, location_code 2826 UK, en). Method: Bradley-Benner entity-and-hierarchy + semantic triples. Consumed by `src/lib/seo/entity-variants.ts`, `src/lib/seo/semantic-triples.ts`, and the content-generation templates._

## 1. What Capiflo is (the brand entity)

Capiflo is a **UK business finance broker** (FinancialService) that matches SMEs to funding across 120+ lenders. Every page must agree, top to bottom: **who we are (Capiflo, a broker) → what we do (arrange SME finance) → where we do it (the location entity)**. Capiflo is a broker, **not a lender** — copy says "we arrange / we match", never "we lend".

## 2. Head terms & search demand (live volumes)

| Product | Head term | UK vol/mo | Intent | Notes |
|---|---|---:|:--|:--|
| Business loans | `business loans` / `business loan` | 27,100 | commercial | primary head entity; CPC £62 (high commercial value) |
| Start-up loans | `start up business loan` / `start up loan` | 8,100 / 5,400 | commercial | strong; gov "Start Up Loan" is a named entity/competitor |
| Small business loans | `small business loans` | 5,400 | commercial | key variant of the head |
| Commercial mortgage | `commercial mortgage(s)` | 4,400 | commercial | calculator + rates demand high |
| Working capital | `working capital` | 4,400 | informational | pair with `working capital loan` (320, commercial) |
| Asset finance | `asset finance` | 1,900 | commercial | co-entity: `hire purchase` (5,400), `equipment finance` |
| Invoice finance | `invoice finance` | 1,900 | commercial | co-entities: `invoice factoring` (1,600), `invoice discounting` (880) |
| Merchant cash advance | `merchant cash advance` | 1,300 | commercial | co-entity: `business cash advance` |
| Revolving credit | `revolving credit facility` | 1,000 | commercial | working-capital cluster |
| VAT loans | `vat loans` / `vat loan` | 480 | commercial | co-entities: `vat finance`, `tax loan` |

**Modifier demand is thin** (`business loans london` ≈ 70, most town terms 10–20). This is the load-bearing strategic fact: **location pages cannot win on exact-match volume** — they win by (a) entity variation that earns the long tail, (b) genuine local business/economic substance (anti-thin-content), and (c) internal linking up the county→region hierarchy. Do not stuff `business loans {town}`; vary the entity per slot.

## 3. Co-occurrence entity set (pin the topic)

Every location/product page should co-occur these entities so Google resolves the page to *SME lending*, not retail/personal loans:

**Primary:** business loan, SME / small business, commercial finance, broker, lender, unsecured loan, secured loan, working capital, cash flow, asset finance, hire purchase, invoice finance, factoring, discounting, merchant cash advance, commercial mortgage, APR, term, repayment, director's guarantee.

**Supporting:** funding, eligibility, trading history, turnover, business bank account, VAT return, deposit, LTV, equipment, vehicles, machinery, receivables, card turnover, growth capital, acquisition finance, refinance.

## 4. Disambiguation traps

- **"working capital"** SERP skews informational (formula/definition). For the *loan* meaning, co-occur `working capital loan`, `cash flow finance`, `revolving credit facility`.
- **"asset finance"** PAA drifts to "types of financial assets" (investment meaning). Pin with `hire purchase`, `equipment finance`, `lease`, `vehicles`, `machinery`.
- **"start up loans"** is dominated by the **government Start Up Loan** (gov.uk, startuploans.co.uk). Differentiate: Capiflo arranges commercial start-up/early-stage funding *beyond* the £25k government scheme.
- **"commercial mortgage"** PAA leaks residential ("can a 70-year-old get a 30-year mortgage"). Pin with `commercial property`, `owner-occupier`, `investment`, `LTV`, `deposit`, `business premises`.

## 5. People-Also-Ask bank (FAQ source of truth)

Real PAA per product is captured in `seo/serp-research/paa.json` and surfaced by the FAQ generator. Highlights to answer in copy:
- Business loans: *easiest business loan to get approved for; am I eligible; can I borrow to start up; monthly payment on £50,000; loan without collateral.*
- Commercial mortgage: *how much deposit; can I get a 100% commercial mortgage; is it difficult to get.*
- MCA: *how does a merchant cash advance work; what if I can't pay it back.*
- Invoice finance: *what is it; is it a good idea; is it debt.*
- VAT loans: *how does a VAT loan work; what if I can't afford my VAT bill.*

## 6. Competitor landscape (top organic ≈ H1 patterns)

British Business Bank ("What is X?"), NatWest/Lloyds/Barclays (bank product pages), Funding Circle / iwoca / Allica / Tide (fintech lenders), GoCompare / MoneySuperMarket (comparison). Capiflo's wedge vs all of them: **independent broker + local entity coverage + whole-of-market comparison**. Match their depth (calculators, "what is", rates) but localise.

## 7. Entity-variant discipline (Bradley-Benner) — the per-page rule

Every optimisation slot uses a **different** entity variant. Never repeat the same phrase across URL / SEO title / H1 / H2a–d / H3-FAQ. Implemented deterministically (hash of slug) in `src/lib/seo/entity-variants.ts`.

### Town page slots

| Slot | Pattern | Example (Leeds, West Yorkshire) |
|---|---|---|
| URL | `/locations/{county}/{town}` | `/locations/west-yorkshire/leeds` |
| SEO `<title>` | `Business Loans {Town} \| SME & Commercial Finance \| Capiflo` | distinct from H1, carries disambiguators |
| H1 (head kw + trigger) | `Business Loans in {Town}` | exact head keyword, one per page |
| H2 a (funding range) | `SME funding options for {Town} businesses` | |
| H2 b (products) | `Asset, invoice and commercial finance across {County}` | distinct product entities |
| H2 c (borrow/eligibility) | `How much {Town} businesses can borrow` | |
| H2 d (local economy) | `The {Town} business economy` (or `{Region}` framing) | local-context variant |
| H3 / FAQ | `unsecured business loans in {Town}`, `{Town} merchant cash advance`, rates, eligibility | PAA-led |

### County page slots
H1 `Business Loans in {County}`; SEO title `Business Loans {County} \| UK SME Funding \| Capiflo`; H2s: `Funding for businesses across {County}`, `Commercial finance products in {Region}`, `Key {County} business sectors we fund`, `How {County} SMEs access finance`.

### Sector page slots
H1 `{Sector} Business Finance`; H2s vary `Funding for {Sector} businesses`, `How {Sector} firms use asset/invoice finance`, `{Sector} eligibility and rates`, `Why {Sector} lenders back …`.

## 8. Semantic triples (Subject → Predicate → Object)

At least one triple in the intro, each H2 opener, the conclusion, and image alt (`src/lib/seo/semantic-triples.ts`):
- **Place:** `{Town} sits in {county}, within the {region} economy.`
- **Brand:** `Capiflo arranges business finance for SMEs across {county}.`
- **Product:** `An unsecured business loan funds working capital and growth.`
- **Sector:** `Capiflo provides asset finance to {sector} firms in {town}.`

## 9. Keyword density & headings (gates)

Density target 1.0–1.8% for the page head keyword (`src/config/seo.ts` `keywords`), never above 3%. One H1; H2s introduce sections only; H3s under H2s; no H-tags in nav/footer. Body copy is for humans — vary, don't stuff.

## 10. Anti-thin-content tiering

Pages are graded A/B/C by the real demographic data available (`tierFor`). Tier A (rich industries + stats) → all sections; B → core; C (lean) → reduced sections leaning on county/region context + entity variation. Below-minimum towns are de-prioritised in the sitemap. No page ships thin.
