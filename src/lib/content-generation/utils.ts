/**
 * Content Generation Utilities
 *
 * Helper functions for content generation
 */

import type { Town, County } from '@/data/locations';

/**
 * Count words in a string
 */
export const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Count occurrences of a term in text (case-insensitive)
 */
export const countOccurrences = (text: string, term: string): number => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
};

/**
 * Calculate keyword density as a percentage
 */
export const calculateKeywordDensity = (text: string, keyword: string): number => {
    const wordCount = countWords(text);
    const keywordCount = countOccurrences(text, keyword);
    return wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
};

/**
 * Generate realistic funding amount based on population
 */
export const generateFundingAmount = (population?: string): string => {
    if (!population) return '£25,000 - £100,000';

    // Extract numeric value from population string
    const popValue = parseInt(population.replace(/[^0-9]/g, ''));

    if (popValue > 500000) {
        return '£50,000 - £250,000';
    } else if (popValue > 200000) {
        return '£35,000 - £150,000';
    } else if (popValue > 100000) {
        return '£25,000 - £100,000';
    } else if (popValue > 50000) {
        return '£20,000 - £75,000';
    } else {
        return '£15,000 - £50,000';
    }
};

/**
 * Adjust funding amount ranges based on location size
 */
export const adjustAmountForLocation = (baseAmount: string, population?: string): string => {
    if (!population) return baseAmount;

    const popValue = parseInt(population.replace(/[^0-9]/g, ''));

    // Extract numbers from base amount
    const matches = baseAmount.match(/£([\d,]+)\s*-\s*£([\d,]+)/);
    if (!matches) return baseAmount;

    let lower = parseInt(matches[1].replace(/,/g, ''));
    let upper = parseInt(matches[2].replace(/,/g, ''));

    // Adjust based on population
    if (popValue > 500000) {
        lower = Math.round(lower * 1.5);
        upper = Math.round(upper * 1.5);
    } else if (popValue < 50000) {
        lower = Math.round(lower * 0.7);
        upper = Math.round(upper * 0.7);
    }

    return `£${lower.toLocaleString()} - £${upper.toLocaleString()}`;
};

/**
 * Select appropriate funding product based on business types
 */
export const selectFundingProduct = (businessTypes: string[]): string => {
    const primary = businessTypes[0]?.toLowerCase() || '';

    if (primary.includes('retail') || primary.includes('e-commerce')) {
        return 'Asset Finance';
    } else if (primary.includes('hospitality') || primary.includes('restaurant')) {
        return 'Merchant Cash Advance';
    } else if (primary.includes('professional') || primary.includes('services')) {
        return 'Unsecured Business Loan';
    } else if (primary.includes('manufacturing') || primary.includes('construction')) {
        return 'Invoice Finance';
    } else {
        return 'Business Loan';
    }
};

/**
 * Generate a location descriptor based on context
 */
export const generateLocationDescriptor = (town: Town, county: County): string => {
    const context = town.generationContext;

    if (context?.uniqueCharacteristic) {
        return context.uniqueCharacteristic;
    }

    // Fallback based on population
    if (town.population) {
        const popValue = parseInt(town.population.replace(/[^0-9]/g, ''));
        if (popValue > 500000) {
            return 'major business hub';
        } else if (popValue > 200000) {
            return 'thriving business community';
        } else if (popValue > 100000) {
            return 'diverse business landscape';
        } else {
            return 'growing business environment';
        }
    }

    return 'dynamic business community';
};

/**
 * Format a list of items with proper grammar
 */
export const formatList = (items: string[]): string => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;

    const allButLast = items.slice(0, -1).join(', ');
    const last = items[items.length - 1];
    return `${allButLast}, and ${last}`;
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generate a unique identifier for tracking
 */
export const generateTimestamp = (): string => {
    return new Date().toISOString();
};

/**
 * Check if content appears to be duplicate/templated
 */
export const checkForDuplicatePhrases = (text: string): string[] => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const duplicates: string[] = [];
    const seen = new Set<string>();

    sentences.forEach(sentence => {
        const normalized = sentence.trim().toLowerCase();
        if (seen.has(normalized) && normalized.length > 20) {
            duplicates.push(sentence.trim());
        }
        seen.add(normalized);
    });

    return duplicates;
};

/**
 * Get economic context phrase based on trend
 */
export const getEconomicContextPhrase = (trend?: 'growing' | 'stable' | 'transforming' | 'emerging'): string => {
    switch (trend) {
        case 'growing':
            return 'experiencing robust economic growth';
        case 'stable':
            return 'maintaining a stable business environment';
        case 'transforming':
            return 'undergoing significant economic transformation';
        case 'emerging':
            return 'emerging as a key business location';
        default:
            return 'developing its business ecosystem';
    }
};

/**
 * Get cost context phrase
 */
export const getCostContextPhrase = (costContext?: 'low' | 'moderate' | 'high' | 'premium'): string => {
    switch (costContext) {
        case 'low':
            return 'competitive operating costs';
        case 'moderate':
            return 'moderate business costs';
        case 'high':
            return 'premium business location';
        case 'premium':
            return 'high-value business district';
        default:
            return 'balanced cost structure';
    }
};
