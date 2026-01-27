/**
 * Content Validation
 *
 * Quality checks for generated content
 */

import type { Town } from '@/data/locations';
import {
    countWords,
    countOccurrences,
    calculateKeywordDensity,
    checkForDuplicatePhrases
} from './utils';

export type ValidationResult = {
    valid: boolean;
    errors: string[];
    warnings: string[];
    metrics?: {
        wordCount?: number;
        keywordDensity?: number;
        townMentions?: number;
    };
};

/**
 * Validate extended overview content
 */
export function validateExtendedOverview(town: Town): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!town.extendedOverview) {
        errors.push('No extended overview found');
        return { valid: false, errors, warnings };
    }

    const content = town.extendedOverview;
    const wordCount = countWords(content);
    const townMentions = countOccurrences(content, town.name);
    const keywordDensity = calculateKeywordDensity(content, town.name);

    // Word count validation
    if (wordCount < 400) {
        errors.push(`Extended overview too short (${wordCount} words, minimum 400)`);
    } else if (wordCount < 450) {
        warnings.push(`Extended overview slightly short (${wordCount} words, target 400-600)`);
    }

    if (wordCount > 700) {
        warnings.push(`Extended overview quite long (${wordCount} words, target 400-600)`);
    } else if (wordCount > 600) {
        warnings.push(`Extended overview slightly long (${wordCount} words, target 400-600)`);
    }

    // Town name mentions
    if (townMentions < 3) {
        warnings.push(`Town name mentioned infrequently (${townMentions} times, target 5-8)`);
    } else if (townMentions > 15) {
        warnings.push(`Town name overused (${townMentions} times, target 5-8)`);
    }

    // Keyword density (should be 1-2% for SEO)
    if (keywordDensity < 0.5) {
        warnings.push(`Low keyword density (${keywordDensity.toFixed(2)}%, target 1-2%)`);
    } else if (keywordDensity > 3) {
        warnings.push(`High keyword density (${keywordDensity.toFixed(2)}%, target 1-2%) - may appear spammy`);
    }

    // Check for duplicate phrases
    const duplicates = checkForDuplicatePhrases(content);
    if (duplicates.length > 0) {
        warnings.push(`Found ${duplicates.length} duplicate phrases`);
    }

    // Check for minimum number of paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    if (paragraphs.length < 4) {
        warnings.push(`Only ${paragraphs.length} paragraphs found, consider 5-6 for better readability`);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        metrics: {
            wordCount,
            townMentions,
            keywordDensity: parseFloat(keywordDensity.toFixed(2))
        }
    };
}

/**
 * Validate FAQs
 */
export function validateFAQs(town: Town): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!town.faqs || town.faqs.length === 0) {
        errors.push('No FAQs found');
        return { valid: false, errors, warnings };
    }

    // Check FAQ count
    if (town.faqs.length < 8) {
        errors.push(`Insufficient FAQs (${town.faqs.length}, minimum 8)`);
    } else if (town.faqs.length > 12) {
        warnings.push(`Many FAQs (${town.faqs.length}, consider limiting to 12)`);
    }

    // Validate each FAQ
    town.faqs.forEach((faq, index) => {
        // Question validation
        if (!faq.question || faq.question.length < 20) {
            errors.push(`FAQ ${index + 1}: Question too short`);
        }

        if (!faq.question.includes('?')) {
            warnings.push(`FAQ ${index + 1}: Question doesn't end with question mark`);
        }

        // Answer validation
        if (!faq.answer || faq.answer.length < 100) {
            errors.push(`FAQ ${index + 1}: Answer too short (minimum 100 characters)`);
        }

        const answerWords = countWords(faq.answer);
        if (answerWords > 150) {
            warnings.push(`FAQ ${index + 1}: Answer quite long (${answerWords} words)`);
        }

        // Check if answer mentions town name
        if (!faq.answer.includes(town.name)) {
            warnings.push(`FAQ ${index + 1}: Answer doesn't mention ${town.name}`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validate funding scenarios
 */
export function validateFundingScenarios(town: Town): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!town.fundingScenarios || town.fundingScenarios.length === 0) {
        errors.push('No funding scenarios found');
        return { valid: false, errors, warnings };
    }

    // Check scenario count
    if (town.fundingScenarios.length < 4) {
        warnings.push(`Only ${town.fundingScenarios.length} funding scenarios (target 4)`);
    }

    // Validate each scenario
    town.fundingScenarios.forEach((scenario, index) => {
        if (!scenario.title) {
            errors.push(`Scenario ${index + 1}: Missing title`);
        } else if (!scenario.title.includes(town.name)) {
            warnings.push(`Scenario ${index + 1}: Title doesn't mention ${town.name}`);
        }

        if (!scenario.description || scenario.description.length < 50) {
            errors.push(`Scenario ${index + 1}: Description too short`);
        }

        if (!scenario.typicalAmount || !scenario.typicalAmount.includes('£')) {
            errors.push(`Scenario ${index + 1}: Invalid or missing amount`);
        }

        if (!scenario.commonUses || scenario.commonUses.length < 2) {
            errors.push(`Scenario ${index + 1}: Need at least 2 common uses`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validate case study
 */
export function validateCaseStudy(town: Town): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!town.caseStudy) {
        errors.push('No case study found');
        return { valid: false, errors, warnings };
    }

    const cs = town.caseStudy;

    // Required fields
    if (!cs.title) errors.push('Case study missing title');
    if (!cs.businessType) errors.push('Case study missing business type');
    if (!cs.challenge) errors.push('Case study missing challenge');
    if (!cs.solution) errors.push('Case study missing solution');
    if (!cs.result) errors.push('Case study missing result');
    if (!cs.fundingType) errors.push('Case study missing funding type');
    if (!cs.amount) errors.push('Case study missing amount');

    // Length validation
    if (cs.challenge && cs.challenge.length < 50) {
        warnings.push('Case study challenge description quite short');
    }

    if (cs.solution && cs.solution.length < 50) {
        warnings.push('Case study solution description quite short');
    }

    if (cs.result && cs.result.length < 50) {
        warnings.push('Case study result description quite short');
    }

    // Check for location mention
    if (cs.location && !cs.location.includes(town.name)) {
        warnings.push('Case study location doesn\'t mention town name');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validate all generated content for a town
 */
export function validateTownContent(town: Town): {
    overall: boolean;
    extendedOverview: ValidationResult;
    faqs: ValidationResult;
    fundingScenarios: ValidationResult;
    caseStudy: ValidationResult;
} {
    const extendedOverview = validateExtendedOverview(town);
    const faqs = validateFAQs(town);
    const fundingScenarios = validateFundingScenarios(town);
    const caseStudy = validateCaseStudy(town);

    const overall =
        extendedOverview.valid &&
        faqs.valid &&
        fundingScenarios.valid &&
        caseStudy.valid;

    return {
        overall,
        extendedOverview,
        faqs,
        fundingScenarios,
        caseStudy
    };
}

/**
 * Generate a validation report
 */
export function generateValidationReport(
    towns: Town[]
): {
    totalTowns: number;
    validTowns: number;
    invalidTowns: number;
    errorCount: number;
    warningCount: number;
    details: Array<{
        town: string;
        valid: boolean;
        errors: string[];
        warnings: string[];
    }>;
} {
    let validCount = 0;
    let errorCount = 0;
    let warningCount = 0;
    const details: Array<{ town: string; valid: boolean; errors: string[]; warnings: string[] }> = [];

    towns.forEach(town => {
        const validation = validateTownContent(town);
        const allErrors = [
            ...validation.extendedOverview.errors,
            ...validation.faqs.errors,
            ...validation.fundingScenarios.errors,
            ...validation.caseStudy.errors
        ];
        const allWarnings = [
            ...validation.extendedOverview.warnings,
            ...validation.faqs.warnings,
            ...validation.fundingScenarios.warnings,
            ...validation.caseStudy.warnings
        ];

        if (validation.overall) {
            validCount++;
        }

        errorCount += allErrors.length;
        warningCount += allWarnings.length;

        if (allErrors.length > 0 || allWarnings.length > 0) {
            details.push({
                town: town.name,
                valid: validation.overall,
                errors: allErrors,
                warnings: allWarnings
            });
        }
    });

    return {
        totalTowns: towns.length,
        validTowns: validCount,
        invalidTowns: towns.length - validCount,
        errorCount,
        warningCount,
        details
    };
}
