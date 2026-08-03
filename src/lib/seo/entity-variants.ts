/**
 * Entity-variant engine (Bradley-Benner method).
 *
 * Every optimisation slot (URL, SEO title, H1, each H2, H3/FAQ) gets a DIFFERENT
 * entity variant so the page reads as a thorough topical pass rather than keyword
 * stuffing. Variation is deterministic: a stable hash of the location/sector slug
 * selects phrasing, so pages rebuild identically (no Math.random — ISR-safe).
 *
 * Ported and adapted from warehousepropertyfinance/src/_data/lib/derive.js +
 * content.js. See seo/ENTITY-BRIEF.md §7.
 */

import type { Town, County } from '@/data/locations';
import { regionNames, type UKRegion } from '@/data/locations';
import { wikiVariants } from '@/data/locations/wiki-variants';

// ── Deterministic variation (FNV-1a) ──────────────────────────────────────

export function hash(seed: string, salt = 0): number {
    let h = 2166136261 ^ salt;
    const s = String(seed);
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/** Pick one variant from a pool, deterministically by seed (+salt to decorrelate slots). */
export function pick<T>(variants: T[], seed: string, salt = 0): T {
    return variants[hash(seed, salt) % variants.length];
}

const regionName = (region?: UKRegion): string =>
    region ? regionNames[region] : 'the UK';

/**
 * Wikipedia-derived name variant for a location (Benner "What links here"
 * research, harvested by scripts/seo/wiki-entities.ts). Falls back to the
 * canonical name when no variants have been harvested yet. Deterministic,
 * so pages rebuild identically.
 */
// Structural whitelist for heading use. Wikipedia redirects include typo,
// office and topical redirects ("Mayor of Brighton", "Homelessness in
// Brighton", "Manchester developments") that contain the place name but are
// not name variants — blacklisting them is whack-a-mole, so instead a variant
// is only heading-safe when it is the canonical name plus a recognised
// administrative qualifier, or the name followed by proper place-name words.
const ADMIN_PREFIX =
    /^(the )?(city|town|port|county|greater|royal borough|london borough|metropolitan borough|county borough|borough|civil parish|metropolitan county|ceremonial county)( of)?$/i;
const SUFFIX_CONNECTORS = new Set(['upon', 'on', 'under', 'by', 'le', 'super', 'cum', 'and', 'the', 'next']);
// Local newspapers are named after town pairs ("Pontypridd and Llantrisant
// Observer") and slip through the connector rule.
const MEDIA_TAIL = /\b(observer|gazette|times|herald|chronicle|post|echo|mail|express|advertiser|journal|news|argus|courier)$/i;

const headingSafe = (v: string, name: string): boolean => {
    if (v.includes(',')) return false; // "Cheshire, England" reads badly mid-heading
    const lv = v.toLowerCase();
    const ln = name.toLowerCase();
    if (lv === ln) return false; // no value over the fallback
    if (lv.endsWith(` ${ln}`)) {
        // "City of Manchester", "County of Northumberland" — qualifier must be administrative.
        return ADMIN_PREFIX.test(v.slice(0, v.length - name.length).trim());
    }
    if (lv.startsWith(`${ln} `)) {
        // "Newcastle upon Tyne", "Brighton and Hove" — every following word
        // must be a connector or capitalised, AND at least one connector must
        // be present: plain "X Something" redirects are almost always
        // institutions ("Stretford Mall", "Lancaster Steiner School"), not
        // name variants.
        const rest = v.slice(name.length).trim().split(/\s+/);
        return (
            !MEDIA_TAIL.test(v) &&
            rest.some((w) => SUFFIX_CONNECTORS.has(w.toLowerCase())) &&
            rest.every((w) => SUFFIX_CONNECTORS.has(w.toLowerCase()) || /^[A-Z]/.test(w))
        );
    }
    return false;
};

const wikiAlt = (key: string, fallback: string, seed: string): string => {
    const alts = (wikiVariants[key] ?? []).filter((a) => headingSafe(a, fallback));
    if (alts.length === 0) return fallback;
    return pick([fallback, ...alts], seed, 7);
};

// ── Town entity-variant slot set ───────────────────────────────────────────

export interface TownVariants {
    /** URL path (shortest clean form). */
    url: string;
    /** SEO <title> — distinct from H1, carries disambiguators. */
    seoTitle: string;
    /** H1 — exact head keyword, one per page. */
    h1: string;
    /** Section H2s — each a DISTINCT entity. */
    h2Funding: string;
    h2Products: string;
    h2Borrow: string;
    h2Economy: string;
    h2Sectors: string;
    /** H3 / FAQ entity fragments. */
    unsecured: string;
    assetFinance: string;
    invoiceFinance: string;
    mca: string;
    shortFunding: string;
    /** Display helpers. */
    countyPhrase: string;
    regionPhrase: string;
}

export function townVariants(town: Town, county: County): TownVariants {
    const t = town.name;
    const c = county.name;
    const region = regionName(town.region ?? county.region);
    const seed = `${county.slug}/${town.slug}`;

    // Wikipedia name variant for secondary slots (never the H1 — the H1 keeps
    // the canonical head entity).
    const alt = wikiAlt(seed, t, seed);

    // H1 head-keyword variants: head kw + AI-search trigger word ("specialist"
    // is the defensible qualifier for finance; see ENTITY-BRIEF §7 and the
    // local-entities-pseo skill §4d). Picked deterministically per town.
    const h1 = pick(
        [
            `Business Loans in ${t}`,
            `Specialist Business Loans in ${t}`,
            `Business Finance in ${t}`,
            `Specialist Business Finance in ${t}`
        ],
        seed,
        1
    );

    return {
        url: `/locations/${county.slug}/${town.slug}`,
        seoTitle: `Business Loans ${t} | SME & Commercial Finance | Capiflo`,
        h1,
        h2Funding: pick(
            [
                `SME funding options for ${t} businesses`,
                `Business funding for ${t} companies`,
                `Funding solutions for SMEs in ${t}`
            ],
            seed,
            2
        ),
        h2Products: pick(
            [
                `Asset, invoice and commercial finance across ${c}`,
                `Commercial finance products for ${c} businesses`,
                `Secured and unsecured lending across ${c}`
            ],
            seed,
            3
        ),
        h2Borrow: pick(
            [
                `How much ${t} businesses can borrow`,
                `Eligibility and borrowing for ${t} firms`,
                `What ${t} SMEs can raise and how fast`
            ],
            seed,
            4
        ),
        h2Economy: pick(
            [`The ${alt} business economy`, `${alt}'s local business landscape`, `Business and lending in ${region}`],
            seed,
            5
        ),
        h2Sectors: pick(
            [`Key ${t} sectors we fund`, `${t} industries and how they fund growth`, `Sector-specific finance in ${t}`],
            seed,
            6
        ),
        unsecured: `unsecured business loans in ${t}`,
        assetFinance: `${t} asset and equipment finance`,
        invoiceFinance: `invoice finance for ${alt} businesses`,
        mca: `${t} merchant cash advance`,
        shortFunding: `${t} business finance`,
        countyPhrase: `across ${c}`,
        regionPhrase: `the ${region} economy`
    };
}

// ── County entity-variant slot set ─────────────────────────────────────────

export interface CountyVariants {
    url: string;
    seoTitle: string;
    h1: string;
    h2Funding: string;
    h2Products: string;
    h2Sectors: string;
    h2Access: string;
    regionPhrase: string;
}

export function countyVariants(county: County): CountyVariants {
    const c = county.name;
    const region = regionName(county.region);
    const seed = county.slug;
    return {
        url: `/locations/${county.slug}`,
        seoTitle: `Business Loans ${c} | UK SME Funding | Capiflo`,
        h1: pick(
            [`Business Loans in ${c}`, `Business Finance in ${c}`, `Specialist Business Finance in ${c}`],
            seed,
            1
        ),
        h2Funding: pick(
            [`Funding for businesses across ${c}`, `Business funding throughout ${c}`],
            seed,
            2
        ),
        h2Products: pick(
            [`Commercial finance products in ${region}`, `Lending options for ${c} SMEs`],
            seed,
            3
        ),
        h2Sectors: pick([`Key ${c} business sectors we fund`, `${c} industries we finance`], seed, 4),
        h2Access: pick([`How ${c} SMEs access finance`, `Getting funded in ${c}`], seed, 5),
        regionPhrase: `the ${region} economy`
    };
}

// ── Sector entity-variant slot set ─────────────────────────────────────────

export interface SectorVariants {
    seoTitle: string;
    h1: string;
    h2Funding: string;
    h2Products: string;
    h2Eligibility: string;
    h2Why: string;
}

export function sectorVariants(sectorTitle: string, slug: string): SectorVariants {
    const s = sectorTitle;
    const seed = slug;
    return {
        seoTitle: `${s} Business Finance | Funding for ${s} Firms | Capiflo`,
        h1: pick([`${s} Business Finance`, `Business Finance for ${s}`], seed, 1),
        h2Funding: pick([`Funding for ${s} businesses`, `How ${s} firms raise capital`], seed, 2),
        h2Products: pick(
            [`Asset and invoice finance for ${s}`, `Commercial finance products for ${s}`],
            seed,
            3
        ),
        h2Eligibility: pick([`${s} eligibility and rates`, `What ${s} firms need to qualify`], seed, 4),
        h2Why: pick([`Why lenders back ${s} businesses`, `How we fund the ${s} sector`], seed, 5)
    };
}
