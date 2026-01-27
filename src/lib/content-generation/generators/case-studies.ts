/**
 * Case Study Generator
 *
 * Generates anonymized case studies for towns
 */

import type { Town, County, TownCaseStudy } from '@/data/locations';
import { caseStudyTemplates } from '../templates';
import { generateFundingAmount } from '../utils';

/**
 * Generate a case study for a town
 * Creates one anonymized case study based on primary business type
 */
export function generateCaseStudy(town: Town, county: County): TownCaseStudy {
    const primaryBusinessType = town.businessTypes[0] || 'Professional Services';

    // Find matching template or use default
    const template = caseStudyTemplates[primaryBusinessType] || caseStudyTemplates['Professional Services'];

    // Generate realistic funding amount based on population
    const amount = generateFundingAmount(town.population);

    // Determine location context within town
    const locationContext = town.generationContext?.primaryBusinessDistrict || town.name;

    return {
        title: template.titleTemplate(town, primaryBusinessType),
        businessType: template.businessType,
        location: locationContext,
        challenge: template.challengeTemplate,
        solution: template.solutionTemplate,
        fundingType: template.fundingType,
        amount,
        result: template.resultTemplate,
        timeframe: template.timeframe
    };
}

/**
 * Check if a town needs a case study generated
 */
export function needsCaseStudy(town: Town): boolean {
    // If already has a case study, check if it's generated
    if (town.caseStudy) {
        // If tracking shows it's manually written, don't regenerate
        if (town._generated?.caseStudy === false) {
            return false;
        }
    }

    // Needs generation if no case study exists
    return !town.caseStudy;
}

/**
 * Batch generate case studies for multiple towns
 */
export function batchGenerateCaseStudies(
    towns: Town[],
    getCountyFn: (countySlug: string) => County | undefined
): Map<string, TownCaseStudy> {
    const results = new Map<string, TownCaseStudy>();

    towns.forEach(town => {
        if (!needsCaseStudy(town)) {
            return;
        }

        const county = getCountyFn(town.countySlug);
        if (!county) {
            console.error(`County not found for town ${town.name} (${town.countySlug})`);
            return;
        }

        try {
            const caseStudy = generateCaseStudy(town, county);
            results.set(`${town.countySlug}/${town.slug}`, caseStudy);
        } catch (error) {
            console.error(`Error generating case study for ${town.name}:`, error);
        }
    });

    return results;
}
