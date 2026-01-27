/**
 * Content Generation Orchestrator
 *
 * Main entry point for generating location content
 */

import type { Town, County } from '@/data/locations';
import { generateExtendedOverview } from './generators/extended-overview';
import { generateFAQs } from './generators/faqs';
import { generateFundingScenarios } from './generators/funding-scenarios';
import { generateCaseStudy } from './generators/case-studies';
import { validateTownContent } from './validators';
import { generateTimestamp } from './utils';

export type ContentGenerationOptions = {
    overwrite?: boolean; // Overwrite existing content
    dryRun?: boolean; // Don't actually modify, just preview
    validateOnly?: boolean; // Only run validation, don't generate
    components?: {
        extendedOverview?: boolean;
        faqs?: boolean;
        fundingScenarios?: boolean;
        caseStudy?: boolean;
    };
};

export type ContentGenerationResult = {
    town: string;
    county: string;
    generated: {
        extendedOverview: boolean;
        faqs: boolean;
        fundingScenarios: boolean;
        caseStudy: boolean;
    };
    validation: ReturnType<typeof validateTownContent>;
    updatedTown?: Town;
};

/**
 * Generate all content for a single town
 */
export function generateTownContent(
    town: Town,
    county: County,
    options: ContentGenerationOptions = {}
): ContentGenerationResult {
    const {
        overwrite = false,
        dryRun = false,
        validateOnly = false,
        components = {
            extendedOverview: true,
            faqs: true,
            fundingScenarios: true,
            caseStudy: true
        }
    } = options;

    const result: ContentGenerationResult = {
        town: town.name,
        county: county.name,
        generated: {
            extendedOverview: false,
            faqs: false,
            fundingScenarios: false,
            caseStudy: false
        },
        validation: validateTownContent(town)
    };

    // If validate only, return current validation
    if (validateOnly) {
        return result;
    }

    // Create a copy of the town to modify
    const updatedTown: Town = { ...town };

    // Initialize generation tracking
    if (!updatedTown._generated) {
        updatedTown._generated = {};
    }

    // Generate Extended Overview
    if (components.extendedOverview) {
        const shouldGenerate =
            overwrite ||
            !updatedTown.extendedOverview ||
            updatedTown.extendedOverview.length < 300;

        if (shouldGenerate && !dryRun) {
            updatedTown.extendedOverview = generateExtendedOverview(town, county);
            updatedTown._generated.extendedOverview = true;
            updatedTown._generated.generatedAt = generateTimestamp();
            result.generated.extendedOverview = true;
        }
    }

    // Generate FAQs
    if (components.faqs) {
        const shouldGenerate =
            overwrite || !updatedTown.faqs || updatedTown.faqs.length < 8;

        if (shouldGenerate && !dryRun) {
            updatedTown.faqs = generateFAQs(town, county);
            updatedTown._generated.faqs = true;
            updatedTown._generated.generatedAt = generateTimestamp();
            result.generated.faqs = true;
        }
    }

    // Generate Funding Scenarios
    if (components.fundingScenarios) {
        const shouldGenerate =
            overwrite ||
            !updatedTown.fundingScenarios ||
            updatedTown.fundingScenarios.length < 4;

        if (shouldGenerate && !dryRun) {
            updatedTown.fundingScenarios = generateFundingScenarios(town, county);
            updatedTown._generated.fundingScenarios = true;
            updatedTown._generated.generatedAt = generateTimestamp();
            result.generated.fundingScenarios = true;
        }
    }

    // Generate Case Study
    if (components.caseStudy) {
        const shouldGenerate = overwrite || !updatedTown.caseStudy;

        if (shouldGenerate && !dryRun) {
            updatedTown.caseStudy = generateCaseStudy(town, county);
            updatedTown._generated.caseStudy = true;
            updatedTown._generated.generatedAt = generateTimestamp();
            result.generated.caseStudy = true;
        }
    }

    // Validate generated content
    result.validation = validateTownContent(updatedTown);
    result.updatedTown = updatedTown;

    return result;
}

/**
 * Generate content for multiple towns
 */
export function generateBatchContent(
    towns: Town[],
    getCountyFn: (countySlug: string) => County | undefined,
    options: ContentGenerationOptions = {}
): ContentGenerationResult[] {
    const results: ContentGenerationResult[] = [];

    towns.forEach(town => {
        const county = getCountyFn(town.countySlug);
        if (!county) {
            console.error(`County not found for town ${town.name} (${town.countySlug})`);
            return;
        }

        try {
            const result = generateTownContent(town, county, options);
            results.push(result);
        } catch (error) {
            console.error(`Error generating content for ${town.name}:`, error);
        }
    });

    return results;
}

/**
 * Get generation statistics from results
 */
export function getGenerationStats(results: ContentGenerationResult[]): {
    total: number;
    generated: {
        extendedOverview: number;
        faqs: number;
        fundingScenarios: number;
        caseStudy: number;
    };
    validation: {
        valid: number;
        invalid: number;
        errors: number;
        warnings: number;
    };
} {
    const stats = {
        total: results.length,
        generated: {
            extendedOverview: 0,
            faqs: 0,
            fundingScenarios: 0,
            caseStudy: 0
        },
        validation: {
            valid: 0,
            invalid: 0,
            errors: 0,
            warnings: 0
        }
    };

    results.forEach(result => {
        // Count generated content
        if (result.generated.extendedOverview) stats.generated.extendedOverview++;
        if (result.generated.faqs) stats.generated.faqs++;
        if (result.generated.fundingScenarios) stats.generated.fundingScenarios++;
        if (result.generated.caseStudy) stats.generated.caseStudy++;

        // Count validation results
        if (result.validation.overall) {
            stats.validation.valid++;
        } else {
            stats.validation.invalid++;
        }

        // Count errors and warnings
        stats.validation.errors +=
            result.validation.extendedOverview.errors.length +
            result.validation.faqs.errors.length +
            result.validation.fundingScenarios.errors.length +
            result.validation.caseStudy.errors.length;

        stats.validation.warnings +=
            result.validation.extendedOverview.warnings.length +
            result.validation.faqs.warnings.length +
            result.validation.fundingScenarios.warnings.length +
            result.validation.caseStudy.warnings.length;
    });

    return stats;
}

// Re-export generators and validators
export * from './generators/extended-overview';
export * from './generators/faqs';
export * from './generators/funding-scenarios';
export * from './generators/case-studies';
export * from './validators';
export * from './utils';
