/**
 * Publishing-gate tiering (anti-thin-content guard).
 *
 * Grades a location by the genuine demographic/economic substance available to
 * it, so richer pages are crawled first and the thinnest are de-prioritised.
 * Mirrors the warehousepropertyfinance / commercialpropertydevelopmentfinance
 * `tierFor` approach. See seo/ENTITY-BRIEF.md §10.
 */

import type { Town, County } from '@/data/locations';

export type Tier = 'A' | 'B' | 'C';

/** Grade a town by data richness (business mix, population, stats, context). */
export function townTier(town: Town): Tier {
    const sectors = town.businessTypes?.length ?? 0;
    const hasPopulation = Boolean(town.population);
    const hasStats = (town.stats?.length ?? 0) >= 2;
    const hasContext = Boolean(town.generationContext || town.economicContext || town.businessDemographics);
    const hasEconomy = Boolean(town.localEconomy);

    if (sectors >= 4 && hasPopulation && (hasStats || hasContext)) return 'A';
    if (sectors >= 2 && (hasPopulation || hasEconomy)) return 'B';
    return 'C';
}

/** Grade a county by data richness (industries, highlights, stats). */
export function countyTier(county: County): Tier {
    const industries = county.keyIndustries?.length ?? 0;
    const highlights = county.economicHighlights?.length ?? 0;
    const hasStats = (county.stats?.length ?? 0) >= 2;

    if (industries >= 4 && highlights >= 2 && hasStats) return 'A';
    if (industries >= 2 || highlights >= 1) return 'B';
    return 'C';
}

/** Map a tier to a sitemap priority within the towns band. */
export function townTierPriority(tier: Tier): number {
    switch (tier) {
        case 'A':
            return 0.7;
        case 'B':
            return 0.6;
        case 'C':
            return 0.5;
    }
}
