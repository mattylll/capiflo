/**
 * Funding Scenario Generator
 *
 * Generates location-specific funding scenarios based on business types
 */

import type { Town, County, TownFundingScenario } from '@/data/locations';
import { fundingScenarioTemplates } from '../templates';
import { adjustAmountForLocation } from '../utils';

/**
 * Generate funding scenarios for a town
 * Creates 4 scenarios based on top business types
 */
export function generateFundingScenarios(town: Town, county: County): TownFundingScenario[] {
    const scenarios: TownFundingScenario[] = [];

    // Take top 4 business types, or use generic if fewer
    const businessTypes = town.businessTypes.slice(0, 4);

    // Ensure we have at least 4 scenarios
    const typesToUse = [...businessTypes];
    while (typesToUse.length < 4) {
        typesToUse.push('Professional Services'); // Default fallback
    }

    typesToUse.slice(0, 4).forEach(businessType => {
        const template = fundingScenarioTemplates[businessType] || fundingScenarioTemplates['Professional Services'];

        // Adjust amounts based on population
        const adjustedAmount = adjustAmountForLocation(template.typicalAmount, town.population);

        scenarios.push({
            title: template.titleTemplate(town),
            description: template.description,
            typicalAmount: adjustedAmount,
            commonUses: template.commonUses
        });
    });

    return scenarios;
}

/**
 * Check if a town needs funding scenarios generated
 */
export function needsFundingScenarios(town: Town): boolean {
    // If already has 4+ scenarios, check if they're generated
    if (town.fundingScenarios && town.fundingScenarios.length >= 4) {
        // If tracking shows they're manually written, don't regenerate
        if (town._generated?.fundingScenarios === false) {
            return false;
        }
    }

    // Needs generation if fewer than 4 scenarios
    return !town.fundingScenarios || town.fundingScenarios.length < 4;
}

/**
 * Merge generated scenarios with existing custom scenarios
 */
export function mergeFundingScenarios(
    existingScenarios: TownFundingScenario[] | undefined,
    generatedScenarios: TownFundingScenario[],
    targetCount: number = 4
): TownFundingScenario[] {
    if (!existingScenarios || existingScenarios.length === 0) {
        return generatedScenarios.slice(0, targetCount);
    }

    // Start with existing scenarios
    const merged = [...existingScenarios];

    // Add generated scenarios to reach target count
    let generatedIndex = 0;
    while (merged.length < targetCount && generatedIndex < generatedScenarios.length) {
        const generatedScenario = generatedScenarios[generatedIndex];

        // Check if this scenario type is already covered
        const isDuplicate = merged.some(existing =>
            existing.title.toLowerCase().includes(generatedScenario.title.toLowerCase().split(' ')[2] || '')
        );

        if (!isDuplicate) {
            merged.push(generatedScenario);
        }

        generatedIndex++;
    }

    return merged.slice(0, targetCount);
}

/**
 * Batch generate funding scenarios for multiple towns
 */
export function batchGenerateFundingScenarios(
    towns: Town[],
    getCountyFn: (countySlug: string) => County | undefined
): Map<string, TownFundingScenario[]> {
    const results = new Map<string, TownFundingScenario[]>();

    towns.forEach(town => {
        if (!needsFundingScenarios(town)) {
            return;
        }

        const county = getCountyFn(town.countySlug);
        if (!county) {
            console.error(`County not found for town ${town.name} (${town.countySlug})`);
            return;
        }

        try {
            const generatedScenarios = generateFundingScenarios(town, county);
            const mergedScenarios = mergeFundingScenarios(town.fundingScenarios, generatedScenarios);
            results.set(`${town.countySlug}/${town.slug}`, mergedScenarios);
        } catch (error) {
            console.error(`Error generating funding scenarios for ${town.name}:`, error);
        }
    });

    return results;
}
