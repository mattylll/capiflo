#!/usr/bin/env tsx
/**
 * Wikipedia entity-variant harvester (Bradley-Benner method).
 *
 * For every county and town in src/data/locations it pulls, from Wikipedia:
 *   1. the canonical page title (following redirects),
 *   2. every redirect pointing at that page — the "What links here → redirects
 *      only" trick: each redirect title is a valid entity variant, and
 *   3. the bolded synonyms in the lead section.
 *
 * Output is written to src/data/locations/wiki-variants.ts as a generated,
 * committed module consumed by src/lib/seo/entity-variants.ts, so render-time
 * needs no filesystem or network access. Re-runs are incremental: existing
 * entries are kept unless --overwrite is passed.
 *
 * Usage:
 *   npm run seo:wiki                        # all counties + towns (slow, ~1k requests)
 *   npm run seo:wiki -- --counties=kent     # one county + its towns
 *   npm run seo:wiki -- --limit=25          # first N missing locations only
 */

import * as fs from 'fs';
import * as path from 'path';
import { counties } from '../../src/data/locations/counties';
import { towns } from '../../src/data/locations/towns';

const API = 'https://en.wikipedia.org/w/api.php';
const HEADERS = { 'User-Agent': 'CapifloSeoResearch/1.0 (hello@capiflo.co.uk)' };
const OUT_FILE = path.join(process.cwd(), 'src', 'data', 'locations', 'wiki-variants.ts');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api(params: Record<string, string>): Promise<any> {
    const qs = new URLSearchParams({ format: 'json', origin: '*', ...params });
    const res = await fetch(`${API}?${qs}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Wikipedia API ${res.status}`);
    return res.json();
}

/** Resolve a place name to its canonical page title, or null if missing/disambiguation. */
async function resolveTitle(name: string, countyName?: string): Promise<string | null> {
    for (const candidate of countyName ? [`${name}, ${countyName}`, name] : [name]) {
        const data = await api({
            action: 'query',
            titles: candidate,
            redirects: '1',
            prop: 'pageprops',
            ppprop: 'disambiguation'
        });
        const pages = data?.query?.pages ?? {};
        const page: any = Object.values(pages)[0];
        if (!page || page.missing !== undefined) continue;
        if (page.pageprops?.disambiguation !== undefined) continue; // ambiguous — try next candidate
        return page.title as string;
    }
    return null;
}

/** All redirect titles pointing at a page (the What-links-here trick). */
async function redirectVariants(title: string): Promise<string[]> {
    const out: string[] = [];
    let cont: string | undefined;
    do {
        const data = await api({
            action: 'query',
            list: 'backlinks',
            bltitle: title,
            blfilterredir: 'redirects',
            bllimit: '100',
            ...(cont ? { blcontinue: cont } : {})
        });
        for (const bl of data?.query?.backlinks ?? []) out.push(bl.title as string);
        cont = data?.continue?.blcontinue;
    } while (cont);
    return out;
}

/** Bolded synonyms in the lead-section wikitext ('''…''' markers). */
async function boldLeadVariants(title: string): Promise<string[]> {
    const data = await api({ action: 'parse', page: title, prop: 'wikitext', section: '0' });
    const wikitext: string = data?.parse?.wikitext?.['*'] ?? '';
    const out: string[] = [];
    for (const m of wikitext.matchAll(/'''([^']{2,60}?)'''/g)) out.push(m[1]);
    return out;
}

/** Topical redirects that are never name variants. */
const JUNK =
    /(disambiguation|list of|history of|geography of|bus |transport|route|railway|climate|economy of|demograph|sport in|timeline|flag of|coat of arms|enterprise zone|statutory)/i;

/**
 * Keep clean, human-usable name variants.
 *
 * Bold lead-section synonyms are trusted (Wikipedia editors bold genuine
 * alternate names). Redirects are NOT trusted blindly: Wikipedia keeps typo
 * redirects ("Merceyside", "Lancastershire") and archaic/foreign spellings
 * that must never appear in a heading — a redirect is only kept when it
 * contains the canonical name verbatim (e.g. "Lancashire, England",
 * "Greater Manchester City Region").
 */
function clean(primary: string, bolds: string[], redirects: string[]): string[] {
    const seen = new Set<string>([primary.toLowerCase()]);
    const out: string[] = [];
    const primaryLower = primary.toLowerCase();

    const add = (raw: string, requireContainment: boolean) => {
        const v = raw.replace(/\s+/g, ' ').trim();
        const key = v.toLowerCase();
        if (seen.has(key)) return;
        if (!/^[A-Za-z][A-Za-z .,'-]{1,50}$/.test(v)) return; // letters + basic punctuation only
        if (JUNK.test(v)) return;
        if (requireContainment && !key.includes(primaryLower)) return;
        seen.add(key);
        out.push(v);
    };

    for (const b of bolds) add(b, false);
    for (const r of redirects) add(r, true);
    return out;
}

async function main() {
    const args = process.argv.slice(2);
    const overwrite = args.includes('--overwrite');
    const countyFilter = args.find((a) => a.startsWith('--counties='))?.split('=')[1]?.split(',');
    const limit = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? Infinity);

    // Load existing generated module (incremental re-runs).
    let existing: Record<string, string[]> = {};
    if (fs.existsSync(OUT_FILE) && !overwrite) {
        const m = fs.readFileSync(OUT_FILE, 'utf8').match(/= (\{[\s\S]*\}) as const/);
        if (m) existing = JSON.parse(m[1]);
    }

    const jobs: { key: string; name: string; countyName?: string }[] = [];
    for (const c of counties) {
        if (countyFilter && !countyFilter.includes(c.slug)) continue;
        jobs.push({ key: `county:${c.slug}`, name: c.name });
    }
    for (const t of towns) {
        if (countyFilter && !countyFilter.includes(t.countySlug)) continue;
        const county = counties.find((c) => c.slug === t.countySlug);
        jobs.push({ key: `${t.countySlug}/${t.slug}`, name: t.name, countyName: county?.name });
    }

    const pending = jobs.filter((j) => !(j.key in existing)).slice(0, limit);
    console.error(`wiki-entities: ${pending.length} to fetch (${jobs.length - pending.length} cached)`);

    let done = 0;
    for (const job of pending) {
        try {
            const title = await resolveTitle(job.name, job.countyName);
            if (!title) {
                existing[job.key] = [];
            } else {
                const [redirects, bolds] = [await redirectVariants(title), await boldLeadVariants(title)];
                const variants = clean(job.name, [title, ...bolds], redirects);
                existing[job.key] = variants.slice(0, 8); // cap: headings only need a handful
            }
        } catch (e) {
            console.error(`  ${job.key} failed: ${(e as Error).message}`);
        }
        done++;
        if (done % 20 === 0) console.error(`  ${done}/${pending.length}`);
        await sleep(250); // stay well inside Wikipedia rate limits
    }

    const body = [
        '/**',
        ' * GENERATED by scripts/seo/wiki-entities.ts — do not edit by hand.',
        ' * Wikipedia-derived entity variants (canonical titles, lead-section bold',
        ' * synonyms, and What-links-here redirects) per location key.',
        ' * Keys: "county:<countySlug>" and "<countySlug>/<townSlug>".',
        ' */',
        '',
        `export const wikiVariants: Record<string, readonly string[]> = ${JSON.stringify(existing, null, 4)} as const;`,
        ''
    ].join('\n');
    fs.writeFileSync(OUT_FILE, body);
    console.error(`Wrote ${OUT_FILE} (${Object.keys(existing).length} locations)`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
