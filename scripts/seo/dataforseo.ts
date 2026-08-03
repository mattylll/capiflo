/**
 * DataForSEO REST client (thin) for Capiflo pSEO research.
 *
 * Auth: base64 of `login:password` in DATAFORSEO_AUTH (env or .env.local),
 * sent as `Authorization: Basic <token>`. Ported from the Construction Capital
 * research pipeline. UK location_code 2826, language en.
 */

import * as fs from 'fs';
import * as path from 'path';

const ENV_PATH = path.join(process.cwd(), '.env.local');

export const DATAFORSEO_AUTH: string | null = (() => {
    if (process.env.DATAFORSEO_AUTH) return process.env.DATAFORSEO_AUTH;
    if (fs.existsSync(ENV_PATH)) {
        const m = fs.readFileSync(ENV_PATH, 'utf-8').match(/DATAFORSEO_AUTH=([^\s]+)/);
        if (m) return m[1];
    }
    return null;
})();

export const UK_LOCATION_CODE = 2826;
export const LANG = 'en';

export function requireAuth(): string {
    if (!DATAFORSEO_AUTH) {
        console.error('Missing DATAFORSEO_AUTH in env or .env.local');
        process.exit(1);
    }
    return DATAFORSEO_AUTH;
}

export async function dfs(endpoint: string, body: unknown): Promise<any> {
    const res = await fetch(`https://api.dataforseo.com/v3${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${requireAuth()}`
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        throw new Error(`DFS ${endpoint} -> HTTP ${res.status}: ${await res.text()}`);
    }
    return res.json();
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface KeywordInfo {
    keyword: string;
    search_volume: number | null;
    cpc: number | null;
    competition_level: string | null;
    competition_index: number | null;
    intent: string | null;
}

/** keyword_overview/live — volume + intent for up to 100 keywords in one call. */
export async function fetchOverview(keywords: string[]): Promise<Map<string, KeywordInfo>> {
    const result = new Map<string, KeywordInfo>();
    const batch = keywords.slice(0, 100);
    if (batch.length === 0) return result;
    const body = [{ keywords: batch, location_code: UK_LOCATION_CODE, language_code: LANG }];
    const json = await dfs('/dataforseo_labs/google/keyword_overview/live', body);
    const items = json?.tasks?.[0]?.result?.[0]?.items ?? [];
    for (const item of items) {
        const info = item.keyword_info ?? {};
        const intent = item.search_intent_info ?? {};
        result.set(String(item.keyword).toLowerCase(), {
            keyword: item.keyword,
            search_volume: info.search_volume ?? null,
            cpc: info.cpc ?? null,
            competition_level: info.competition_level ?? null,
            competition_index: info.competition_index ?? null,
            intent: intent.main_intent ?? null
        });
    }
    return result;
}

/** related_keywords/live — expansion seeds (entity variants) for one seed. */
export async function fetchRelated(seed: string, limit = 25): Promise<KeywordInfo[]> {
    const body = [
        { keyword: seed, location_code: UK_LOCATION_CODE, language_code: LANG, limit, depth: 1 }
    ];
    try {
        const json = await dfs('/dataforseo_labs/google/related_keywords/live', body);
        const items = json?.tasks?.[0]?.result?.[0]?.items ?? [];
        return items.flatMap((it: any) => {
            const kd = it.keyword_data;
            if (!kd) return [];
            return [
                {
                    keyword: kd.keyword,
                    search_volume: kd.keyword_info?.search_volume ?? null,
                    cpc: kd.keyword_info?.cpc ?? null,
                    competition_level: kd.keyword_info?.competition_level ?? null,
                    competition_index: kd.keyword_info?.competition_index ?? null,
                    intent: kd.search_intent_info?.main_intent ?? null
                }
            ];
        });
    } catch (e) {
        console.error(`  related fetch failed for "${seed}":`, (e as Error).message);
        return [];
    }
}

export interface SerpSnapshot {
    keyword: string;
    organic: { rank: number; domain: string; title: string; url: string }[];
    peopleAlsoAsk: string[];
    relatedSearches: string[];
}

/** serp/google/organic/live/advanced — competitor titles (≈H1), PAA, related. */
export async function fetchSerp(keyword: string): Promise<SerpSnapshot & { raw: any }> {
    const body = [
        {
            keyword,
            location_code: UK_LOCATION_CODE,
            language_code: LANG,
            depth: 20,
            people_also_ask_click_depth: 1
        }
    ];
    const json = await dfs('/serp/google/organic/live/advanced', body);
    const items = json?.tasks?.[0]?.result?.[0]?.items ?? [];
    const organic: SerpSnapshot['organic'] = [];
    const peopleAlsoAsk: string[] = [];
    const relatedSearches: string[] = [];
    for (const it of items) {
        if (it.type === 'organic') {
            organic.push({
                rank: it.rank_absolute ?? organic.length + 1,
                domain: it.domain ?? '',
                title: it.title ?? '',
                url: it.url ?? ''
            });
        } else if (it.type === 'people_also_ask') {
            for (const el of it.items ?? []) {
                if (el.title) peopleAlsoAsk.push(el.title);
            }
        } else if (it.type === 'related_searches') {
            for (const el of it.items ?? []) {
                if (typeof el === 'string') relatedSearches.push(el);
            }
        }
    }
    return { keyword, organic: organic.slice(0, 10), peopleAlsoAsk, relatedSearches, raw: json };
}
