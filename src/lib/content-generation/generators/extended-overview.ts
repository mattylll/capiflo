/**
 * Extended Overview Generator
 *
 * Generates 400-600 word overviews for town pages
 */

import type { Town, County } from '@/data/locations';
import { extendedOverviewTemplates } from '../templates';
import { countWords } from '../utils';

/**
 * Generate extended overview for a town
 * Target: 400-600 words with natural flow
 */
export function generateExtendedOverview(town: Town, county: County): string {
    const sections: string[] = [];

    // 1. Introduction (80-100 words)
    sections.push(extendedOverviewTemplates.intro(town, county));

    // 2. Business Landscape (100-120 words)
    sections.push(extendedOverviewTemplates.businessLandscape(town, county));

    // 3. Sector Analysis (100-120 words)
    sections.push(extendedOverviewTemplates.sectorAnalysis(town));

    // 4. Funding Patterns (100-120 words)
    sections.push(extendedOverviewTemplates.fundingPatterns(town, county));

    // 5. Operating Context (100-120 words)
    sections.push(extendedOverviewTemplates.operatingContext(town, county));

    // 6. Conclusion (80-100 words)
    sections.push(extendedOverviewTemplates.conclusion(town, county));

    // Join sections with double line breaks
    const overview = sections.join('\n\n');

    // Verify word count is within target range
    const wordCount = countWords(overview);
    if (wordCount < 300) {
        console.warn(`Warning: Generated overview for ${town.name} is only ${wordCount} words (target: 400-600)`);
    } else if (wordCount > 700) {
        console.warn(`Warning: Generated overview for ${town.name} is ${wordCount} words (target: 400-600)`);
    }

    return overview;
}

/**
 * Check if a town needs an extended overview generated
 */
export function needsExtendedOverview(town: Town): boolean {
    // Check if it already has an extended overview
    if (town.extendedOverview && town.extendedOverview.length > 300) {
        // Check if it was generated (if tracking is available)
        if (town._generated?.extendedOverview === false) {
            // It's manually written, don't regenerate
            return false;
        }
    }

    // Needs generation if no extended overview or it's very short
    return !town.extendedOverview || town.extendedOverview.length < 300;
}

/**
 * Batch generate extended overviews for multiple towns
 */
export function batchGenerateExtendedOverviews(
    towns: Town[],
    getCountyFn: (countySlug: string) => County | undefined
): Map<string, string> {
    const results = new Map<string, string>();

    towns.forEach(town => {
        if (!needsExtendedOverview(town)) {
            return;
        }

        const county = getCountyFn(town.countySlug);
        if (!county) {
            console.error(`County not found for town ${town.name} (${town.countySlug})`);
            return;
        }

        try {
            const overview = generateExtendedOverview(town, county);
            results.set(`${town.countySlug}/${town.slug}`, overview);
        } catch (error) {
            console.error(`Error generating overview for ${town.name}:`, error);
        }
    });

    return results;
}
