#!/usr/bin/env tsx
/**
 * Capiflo pSEO research driver.
 *
 * Pulls live DataForSEO data to back the entity-variant + semantic-triple
 * content engine (mirrors the warehousepropertyfinance / commercialproperty-
 * developmentfinance approach):
 *
 *   1. keyword_overview  — volume + intent for product × location seeds
 *   2. related_keywords  — entity-variant expansion for the strongest seeds
 *   3. serp organic      — competitor titles (≈H1) + People-Also-Ask per head term
 *
 * Writes:
 *   seo/keyword-research/<date>.{json,md}
 *   seo/serp-research/<term-slug>/01-serp.json   (raw)
 *   seo/serp-research/paa.json                   (merged PAA bank for FAQ sourcing)
 *
 * Usage: npx tsx scripts/seo/run-research.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
    fetchOverview,
    fetchRelated,
    fetchSerp,
    sleep,
    requireAuth,
    type KeywordInfo
} from './dataforseo';

requireAuth();

// ── Capiflo product matrix ────────────────────────────────────────────────
// Head product term + variant phrases used for H1/H2/H3 differentiation.
const PRODUCTS: { slug: string; head: string; variants: string[] }[] = [
    {
        slug: 'business-loans',
        head: 'business loans',
        variants: ['business loans', 'business loan', 'small business loans', 'sme loans', 'business finance']
    },
    {
        slug: 'asset-finance',
        head: 'asset finance',
        variants: ['asset finance', 'equipment finance', 'equipment leasing', 'hire purchase']
    },
    {
        slug: 'invoice-finance',
        head: 'invoice finance',
        variants: ['invoice finance', 'invoice factoring', 'invoice discounting', 'debtor finance']
    },
    {
        slug: 'merchant-cash-advance',
        head: 'merchant cash advance',
        variants: ['merchant cash advance', 'business cash advance', 'revenue based finance']
    },
    {
        slug: 'commercial-mortgage',
        head: 'commercial mortgage',
        variants: ['commercial mortgage', 'commercial mortgages', 'property finance', 'commercial property finance']
    },
    {
        slug: 'vat-loans',
        head: 'vat loans',
        variants: ['vat loan', 'vat loans', 'vat funding', 'tax loan']
    },
    {
        slug: 'start-up-loans',
        head: 'start up loans',
        variants: ['start up loan', 'start up business loan', 'startup funding', 'new business loan']
    },
    {
        slug: 'working-capital',
        head: 'working capital loans',
        variants: ['working capital', 'working capital loan', 'cash flow finance', 'revolving credit facility']
    }
];

// Representative location set (covers the largest entities + a spread of regions),
// used to measure how "<product> <place>" modifiers behave. Not every town —
// the variants generalise (Benner method), this calibrates volume + PAA.
const LOCATIONS: { name: string; tier: 'city' | 'county' }[] = [
    { name: 'London', tier: 'city' },
    { name: 'Birmingham', tier: 'city' },
    { name: 'Manchester', tier: 'city' },
    { name: 'Leeds', tier: 'city' },
    { name: 'Glasgow', tier: 'city' },
    { name: 'Liverpool', tier: 'city' },
    { name: 'Bristol', tier: 'city' },
    { name: 'Sheffield', tier: 'city' },
    { name: 'Edinburgh', tier: 'city' },
    { name: 'Nottingham', tier: 'city' },
    { name: 'Leicester', tier: 'city' },
    { name: 'Kent', tier: 'county' },
    { name: 'Essex', tier: 'county' },
    { name: 'Surrey', tier: 'county' },
    { name: 'Hampshire', tier: 'county' },
    { name: 'Yorkshire', tier: 'county' }
];

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

function buildSeeds(): string[] {
    const out = new Set<string>();
    for (const p of PRODUCTS) {
        for (const v of p.variants) {
            out.add(v);
            for (const loc of LOCATIONS) {
                out.add(`${v} ${loc.name.toLowerCase()}`);
                out.add(`${v} in ${loc.name.toLowerCase()}`);
            }
        }
    }
    return [...out];
}

async function main() {
    const today = new Date().toISOString().slice(0, 10);
    console.error(`Capiflo pSEO research — ${today}`);

    const seeds = buildSeeds();
    console.error(`Seed keywords: ${seeds.length}`);

    // ── 1. Keyword overview (chunk into ≤100) ─────────────────────────────
    const overview = new Map<string, KeywordInfo>();
    for (let i = 0; i < seeds.length; i += 100) {
        const chunk = seeds.slice(i, i + 100);
        const m = await fetchOverview(chunk);
        for (const [k, v] of m) overview.set(k, v);
        console.error(`  overview ${Math.min(i + 100, seeds.length)}/${seeds.length}`);
        await sleep(300);
    }

    // ── 2. Related-keyword expansion for the strongest national seeds ─────
    const related: Record<string, KeywordInfo[]> = {};
    for (const p of PRODUCTS) {
        const r = await fetchRelated(p.head, 25);
        related[p.slug] = r.filter((x) => x.search_volume && x.search_volume > 0).sort((a, b) => (b.search_volume ?? 0) - (a.search_volume ?? 0));
        console.error(`  related ${p.head}: ${related[p.slug].length}`);
        await sleep(300);
    }

    // ── 3. SERP organic + PAA for each head product term ──────────────────
    const serpDir = path.join(process.cwd(), 'seo', 'serp-research');
    fs.mkdirSync(serpDir, { recursive: true });
    const paaBank: Record<string, string[]> = {};
    const competitors: Record<string, { domain: string; title: string }[]> = {};
    for (const p of PRODUCTS) {
        try {
            const snap = await fetchSerp(p.head);
            const dir = path.join(serpDir, p.slug);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, '01-serp.json'), JSON.stringify(snap.raw, null, 2));
            paaBank[p.slug] = snap.peopleAlsoAsk;
            competitors[p.slug] = snap.organic.map((o) => ({ domain: o.domain, title: o.title }));
            console.error(`  serp ${p.head}: ${snap.organic.length} organic, ${snap.peopleAlsoAsk.length} PAA`);
        } catch (e) {
            console.error(`  serp ${p.head} failed:`, (e as Error).message);
            paaBank[p.slug] = [];
            competitors[p.slug] = [];
        }
        await sleep(500);
    }
    fs.writeFileSync(path.join(serpDir, 'paa.json'), JSON.stringify(paaBank, null, 2));
    fs.writeFileSync(path.join(serpDir, 'competitors.json'), JSON.stringify(competitors, null, 2));

    // ── Write JSON + Markdown summary ─────────────────────────────────────
    const outDir = path.join(process.cwd(), 'seo', 'keyword-research');
    fs.mkdirSync(outDir, { recursive: true });
    const full = {
        date: today,
        location_code: 2826,
        seeds: [...overview.values()],
        related,
        paa: paaBank,
        competitors
    };
    fs.writeFileSync(path.join(outDir, `${today}.json`), JSON.stringify(full, null, 2));

    const lines: string[] = [
        `# Capiflo keyword & entity research — ${today}`,
        ``,
        `Source: DataForSEO Labs \`keyword_overview\` + \`related_keywords\` + SERP \`organic/live/advanced\`, location_code 2826 (UK), en.`,
        ``,
        `## National product head-terms`,
        ``,
        `| Vol | CPC | Comp | Intent | Keyword |`,
        `|---:|---:|:---|:---|:---|`
    ];
    const fmtVol = (v: number | null) => (v == null ? '—' : String(v));
    const fmtCpc = (v: number | null) => (v == null ? '—' : `£${v.toFixed(2)}`);
    for (const p of PRODUCTS) {
        for (const v of p.variants) {
            const k = overview.get(v.toLowerCase());
            if (k && k.search_volume)
                lines.push(`| ${fmtVol(k.search_volume)} | ${fmtCpc(k.cpc)} | ${k.competition_level ?? '—'} | ${k.intent ?? '—'} | \`${k.keyword}\` |`);
        }
    }

    lines.push(``, `## Top location-modified terms (with volume)`, ``, `| Vol | Intent | Keyword |`, `|---:|:---|:---|`);
    const locTerms = [...overview.values()]
        .filter((k) => k.search_volume && k.search_volume > 0 && LOCATIONS.some((l) => k.keyword.toLowerCase().includes(l.name.toLowerCase())))
        .sort((a, b) => (b.search_volume ?? 0) - (a.search_volume ?? 0))
        .slice(0, 40);
    for (const k of locTerms) lines.push(`| ${fmtVol(k.search_volume)} | ${k.intent ?? '—'} | \`${k.keyword}\` |`);

    lines.push(``, `## Related-keyword entity variants (per product)`, ``);
    for (const p of PRODUCTS) {
        lines.push(`### ${p.head}`, ``);
        const r = (related[p.slug] ?? []).slice(0, 15);
        if (!r.length) lines.push(`(none returned with volume)`, ``);
        else {
            lines.push(`| Vol | Intent | Keyword |`, `|---:|:---|:---|`);
            for (const k of r) lines.push(`| ${fmtVol(k.search_volume)} | ${k.intent ?? '—'} | \`${k.keyword}\` |`);
            lines.push(``);
        }
    }

    lines.push(`## People-Also-Ask bank (FAQ sourcing)`, ``);
    for (const p of PRODUCTS) {
        const q = paaBank[p.slug] ?? [];
        if (!q.length) continue;
        lines.push(`### ${p.head}`, ``, ...q.map((x) => `- ${x}`), ``);
    }

    lines.push(`## SERP competitors (top organic titles ≈ H1)`, ``);
    for (const p of PRODUCTS) {
        const c = competitors[p.slug] ?? [];
        if (!c.length) continue;
        lines.push(`### ${p.head}`, ``, ...c.slice(0, 8).map((x, i) => `${i + 1}. **${x.domain}** — ${x.title}`), ``);
    }

    fs.writeFileSync(path.join(outDir, `${today}.md`), lines.join('\n'));
    console.error(`\nWrote seo/keyword-research/${today}.{json,md} and seo/serp-research/*`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
