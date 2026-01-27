/**
 * FAQ Generator
 *
 * Generates location-specific FAQs
 */

import type { Town, County } from '@/data/locations';
import { faqTemplates } from '../templates';

export type FAQ = {
    question: string;
    answer: string;
};

/**
 * Generate FAQs for a town
 * Returns 8 location-customized FAQs
 */
export function generateFAQs(town: Town, county: County): FAQ[] {
    return faqTemplates.map(template => ({
        question: template.generateQuestion(town),
        answer: template.generateAnswer(town, county)
    }));
}

/**
 * Check if a town needs FAQs generated
 */
export function needsFAQs(town: Town): boolean {
    // If already has 8+ FAQs, check if they're generated
    if (town.faqs && town.faqs.length >= 8) {
        // If tracking shows they're manually written, don't regenerate
        if (town._generated?.faqs === false) {
            return false;
        }
    }

    // Needs generation if fewer than 8 FAQs
    return !town.faqs || town.faqs.length < 8;
}

/**
 * Merge generated FAQs with existing custom FAQs
 * Prioritizes custom FAQs, fills gaps with generated ones
 */
export function mergeFAQs(
    existingFAQs: FAQ[] | undefined,
    generatedFAQs: FAQ[],
    targetCount: number = 8
): FAQ[] {
    if (!existingFAQs || existingFAQs.length === 0) {
        return generatedFAQs.slice(0, targetCount);
    }

    // Start with existing FAQs
    const merged = [...existingFAQs];

    // Add generated FAQs to reach target count
    let generatedIndex = 0;
    while (merged.length < targetCount && generatedIndex < generatedFAQs.length) {
        const generatedFaq = generatedFAQs[generatedIndex];

        // Check if this question is already covered
        const isDuplicate = merged.some(existing =>
            existing.question.toLowerCase().includes(generatedFaq.question.toLowerCase().split('?')[0])
        );

        if (!isDuplicate) {
            merged.push(generatedFaq);
        }

        generatedIndex++;
    }

    return merged.slice(0, targetCount);
}

/**
 * Batch generate FAQs for multiple towns
 */
export function batchGenerateFAQs(
    towns: Town[],
    getCountyFn: (countySlug: string) => County | undefined
): Map<string, FAQ[]> {
    const results = new Map<string, FAQ[]>();

    towns.forEach(town => {
        if (!needsFAQs(town)) {
            return;
        }

        const county = getCountyFn(town.countySlug);
        if (!county) {
            console.error(`County not found for town ${town.name} (${town.countySlug})`);
            return;
        }

        try {
            const generatedFAQs = generateFAQs(town, county);
            const mergedFAQs = mergeFAQs(town.faqs, generatedFAQs);
            results.set(`${town.countySlug}/${town.slug}`, mergedFAQs);
        } catch (error) {
            console.error(`Error generating FAQs for ${town.name}:`, error);
        }
    });

    return results;
}
