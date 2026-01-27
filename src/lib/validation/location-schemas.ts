/**
 * Location Data Validation Schemas
 *
 * Zod schemas for runtime validation of location data
 */

import { z } from 'zod';
import { seoConfig } from '@/config/seo';

/**
 * UK Region enum
 */
export const ukRegionSchema = z.enum([
    'north-west',
    'north-east',
    'yorkshire-humber',
    'east-midlands',
    'west-midlands',
    'east-of-england',
    'london',
    'south-east',
    'south-west',
    'wales',
    'scotland',
    'northern-ireland'
]);

/**
 * Funding Type schema
 */
export const fundingTypeSchema = z.object({
    name: z.string().min(3).max(100),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens')
});

/**
 * Statistic schema
 */
export const statSchema = z.object({
    label: z.string().min(3).max(50),
    value: z.string().min(1).max(50),
    description: z.string().max(200).optional()
});

/**
 * FAQ schema
 */
export const faqSchema = z.object({
    question: z
        .string()
        .min(seoConfig.content.faqs.questionMinLength)
        .max(seoConfig.content.faqs.questionMaxLength),
    answer: z
        .string()
        .min(seoConfig.content.faqs.answerMinLength)
        .max(seoConfig.content.faqs.answerMaxLength)
});

/**
 * Town Funding Scenario schema
 */
export const townFundingScenarioSchema = z.object({
    title: z.string().min(10).max(150),
    description: z
        .string()
        .min(seoConfig.content.fundingScenarios.descriptionMinLength)
        .max(seoConfig.content.fundingScenarios.descriptionMaxLength),
    typicalAmount: z.string().regex(/£[\d,]+ - £[\d,]+/, 'Must be in format £X - £Y'),
    commonUses: z
        .array(z.string().min(3).max(100))
        .min(seoConfig.content.fundingScenarios.commonUsesMin)
        .max(seoConfig.content.fundingScenarios.commonUsesMax)
});

/**
 * Town Case Study schema
 */
export const townCaseStudySchema = z.object({
    title: z.string().min(10).max(200),
    businessType: z.string().min(3).max(100),
    location: z.string().min(3).max(100),
    challenge: z.string().min(seoConfig.content.caseStudy.challengeMinLength).max(1000),
    solution: z.string().min(seoConfig.content.caseStudy.solutionMinLength).max(1000),
    fundingType: z.string().min(3).max(100),
    amount: z.string().regex(/£[\d,]+/, 'Must be in format £X'),
    result: z.string().min(seoConfig.content.caseStudy.resultMinLength).max(1000),
    timeframe: z.string().max(100).optional()
});

/**
 * Generation Context schema
 */
export const generationContextSchema = z.object({
    keyFeatures: z.array(z.string()).min(2).max(5),
    uniqueCharacteristic: z.string().min(10).max(200),
    proximityAdvantages: z.array(z.string()).max(5),
    costContext: z.enum(['low', 'moderate', 'high', 'premium']),
    demographicProfile: z.string().min(5).max(200),
    economicTrend: z.enum(['growing', 'stable', 'transforming', 'emerging']),
    primaryBusinessDistrict: z.string().max(100).optional(),
    landmarkReferences: z.array(z.string()).max(10)
});

/**
 * Business Hours schema
 */
export const businessHoursSchema = z.object({
    opens: z.string().regex(/^\d{2}:\d{2}$/, 'Must be in format HH:MM'),
    closes: z.string().regex(/^\d{2}:\d{2}$/, 'Must be in format HH:MM'),
    dayOfWeek: z.array(
        z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    )
});

/**
 * Local Rating schema
 */
export const localRatingSchema = z.object({
    ratingValue: z.number().min(1).max(5),
    reviewCount: z.number().int().min(1),
    source: z.string().min(3).max(50)
});

/**
 * Generation Tracking schema
 */
export const generationTrackingSchema = z.object({
    extendedOverview: z.boolean().optional(),
    faqs: z.boolean().optional(),
    fundingScenarios: z.boolean().optional(),
    caseStudy: z.boolean().optional(),
    generatedAt: z.string().datetime().optional()
});

/**
 * County schema
 */
export const countySchema = z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(2).max(100),
    region: ukRegionSchema,
    description: z
        .string()
        .min(seoConfig.meta.descriptionMinLength)
        .max(seoConfig.meta.descriptionMaxLength),
    overview: z.string().min(50),
    population: z.string().optional(),
    businessCount: z.string().optional(),
    keyIndustries: z.array(z.string()).min(1).max(15),
    economicHighlights: z.array(z.string()).min(1).max(10),
    fundingTypes: z.array(fundingTypeSchema).optional(),
    stats: z.array(statSchema).max(10).optional(),
    faqs: z.array(faqSchema).optional(),
    image: z.string().url().optional()
});

/**
 * Town schema
 */
export const townSchema = z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(2).max(100),
    countySlug: z.string().regex(/^[a-z0-9-]+$/),
    region: ukRegionSchema.optional(),
    postcode: z.string().max(10).optional(),
    population: z.string().optional(),
    description: z
        .string()
        .min(seoConfig.meta.descriptionMinLength)
        .max(seoConfig.meta.descriptionMaxLength),
    overview: z.string().min(50),
    // Extended content sections
    extendedOverview: z
        .string()
        .min(seoConfig.content.extendedOverview.minWords * 5) // Rough char estimate
        .max(seoConfig.content.extendedOverview.maxWords * 7)
        .optional(),
    businessDemographics: z.string().optional(),
    economicContext: z.string().optional(),
    localEconomy: z.string().min(50),
    businessTypes: z.array(z.string()).min(1).max(20),
    nearbyTowns: z.array(z.string()).max(10).optional(),
    fundingHighlights: z.array(z.string()).max(10).optional(),
    fundingScenarios: z
        .array(townFundingScenarioSchema)
        .min(seoConfig.content.fundingScenarios.min)
        .max(seoConfig.content.fundingScenarios.max)
        .optional(),
    fundingTypes: z.array(fundingTypeSchema).optional(),
    stats: z.array(statSchema).max(10).optional(),
    faqs: z
        .array(faqSchema)
        .min(seoConfig.content.faqs.min)
        .max(seoConfig.content.faqs.max)
        .optional(),
    caseStudy: townCaseStudySchema.optional(),
    image: z.string().url().optional(),
    // SEO metadata
    seoTitle: z
        .string()
        .min(seoConfig.meta.titleMinLength)
        .max(seoConfig.meta.titleMaxLength)
        .optional(),
    seoDescription: z
        .string()
        .min(seoConfig.meta.descriptionMinLength)
        .max(seoConfig.meta.descriptionMaxLength)
        .optional(),
    // Schema enhancement fields
    businessHours: businessHoursSchema.optional(),
    localRating: localRatingSchema.optional(),
    generationContext: generationContextSchema.optional(),
    _generated: generationTrackingSchema.optional()
});

/**
 * Type exports inferred from Zod schemas
 */
export type ValidatedCounty = z.infer<typeof countySchema>;
export type ValidatedTown = z.infer<typeof townSchema>;
export type ValidatedFAQ = z.infer<typeof faqSchema>;
export type ValidatedFundingScenario = z.infer<typeof townFundingScenarioSchema>;
export type ValidatedCaseStudy = z.infer<typeof townCaseStudySchema>;

/**
 * Validation helper functions
 */

/**
 * Validate a county object
 */
export function validateCounty(data: unknown): { success: boolean; data?: ValidatedCounty; errors?: string[] } {
    const result = countySchema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        errors: result.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`)
    };
}

/**
 * Validate a town object
 */
export function validateTown(data: unknown): { success: boolean; data?: ValidatedTown; errors?: string[] } {
    const result = townSchema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        errors: result.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`)
    };
}

/**
 * Validate an array of counties
 */
export function validateCounties(
    data: unknown[]
): { valid: ValidatedCounty[]; invalid: Array<{ index: number; errors: string[] }> } {
    const valid: ValidatedCounty[] = [];
    const invalid: Array<{ index: number; errors: string[] }> = [];

    data.forEach((item, index) => {
        const result = validateCounty(item);
        if (result.success && result.data) {
            valid.push(result.data);
        } else if (result.errors) {
            invalid.push({ index, errors: result.errors });
        }
    });

    return { valid, invalid };
}

/**
 * Validate an array of towns
 */
export function validateTowns(
    data: unknown[]
): { valid: ValidatedTown[]; invalid: Array<{ index: number; errors: string[] }> } {
    const valid: ValidatedTown[] = [];
    const invalid: Array<{ index: number; errors: string[] }> = [];

    data.forEach((item, index) => {
        const result = validateTown(item);
        if (result.success && result.data) {
            valid.push(result.data);
        } else if (result.errors) {
            invalid.push({ index, errors: result.errors });
        }
    });

    return { valid, invalid };
}
