/**
 * Metadata Generator Utilities
 *
 * Centralized metadata generation for SEO optimization
 */

import type { Metadata } from 'next';
import type { Town, County } from '@/data/locations';
import { seoConfig, getCanonicalUrl, getRobotsMeta } from '@/config/seo';

/**
 * Generate metadata for town pages
 */
export function generateTownMetadata(town: Town, county: County): Metadata {
    const title = town.seoTitle || `Business Loans in ${town.name}, ${county.name}`;
    const description =
        town.seoDescription ||
        town.description ||
        `Get business loans in ${town.name}, ${county.name}. Compare funding options from 120+ UK lenders. Fast approval for local SMEs.`;

    // Generate concise keywords (max 5)
    const keywords = generateTownKeywords(town, county);

    // Canonical URL
    const canonicalUrl = getCanonicalUrl(`/locations/${county.slug}/${town.slug}`);

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl
        },
        robots: getRobotsMeta(),
        openGraph: {
            title,
            description,
            type: seoConfig.openGraph.type as 'website',
            url: canonicalUrl,
            siteName: seoConfig.openGraph.siteName,
            locale: seoConfig.openGraph.locale,
            images: [
                {
                    url: town.image || seoConfig.openGraph.images.default,
                    width: seoConfig.openGraph.images.width,
                    height: seoConfig.openGraph.images.height,
                    alt: `Business loans in ${town.name}`
                }
            ]
        },
        twitter: {
            card: seoConfig.twitter.card,
            title,
            description,
            images: [town.image || seoConfig.openGraph.images.default],
            site: seoConfig.twitter.site,
            creator: seoConfig.twitter.creator
        }
    };
}

/**
 * Generate metadata for county pages
 */
export function generateCountyMetadata(county: County): Metadata {
    const title = `Business Loans in ${county.name}`;
    const description =
        county.description ||
        `Apply for business loans in ${county.name}. Get matched with 120+ UK lenders. Fast decisions, flexible terms for SMEs across ${county.name}.`;

    // Generate concise keywords (max 5)
    const keywords = generateCountyKeywords(county);

    // Canonical URL
    const canonicalUrl = getCanonicalUrl(`/locations/${county.slug}`);

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl
        },
        robots: getRobotsMeta(),
        openGraph: {
            title,
            description,
            type: seoConfig.openGraph.type as 'website',
            url: canonicalUrl,
            siteName: seoConfig.openGraph.siteName,
            locale: seoConfig.openGraph.locale,
            images: [
                {
                    url: county.image || seoConfig.openGraph.images.default,
                    width: seoConfig.openGraph.images.width,
                    height: seoConfig.openGraph.images.height,
                    alt: `Business loans in ${county.name}`
                }
            ]
        },
        twitter: {
            card: seoConfig.twitter.card,
            title,
            description,
            images: [county.image || seoConfig.openGraph.images.default],
            site: seoConfig.twitter.site,
            creator: seoConfig.twitter.creator
        }
    };
}

/**
 * Generate strategic keywords for town pages (max 5)
 */
function generateTownKeywords(town: Town, county: County): string[] {
    const keywords: string[] = [];

    // Primary keyword - town specific
    keywords.push(`business loans ${town.name.toLowerCase()}`);

    // Secondary keyword - funding variation
    keywords.push(`${town.name.toLowerCase()} business funding`);

    // Tertiary - county context
    keywords.push(`${county.name.toLowerCase()} sme finance`);

    // Top business type (if available)
    if (town.businessTypes.length > 0) {
        const topType = town.businessTypes[0].toLowerCase();
        keywords.push(`${topType} funding ${town.name.toLowerCase()}`);
    }

    // Commercial finance variation
    if (keywords.length < 5) {
        keywords.push(`${town.name.toLowerCase()} commercial finance`);
    }

    return keywords.slice(0, seoConfig.meta.keywordsRecommended);
}

/**
 * Generate strategic keywords for county pages (max 5)
 */
function generateCountyKeywords(county: County): string[] {
    const keywords: string[] = [];

    // Primary keyword
    keywords.push(`business loans ${county.name.toLowerCase()}`);

    // Secondary keyword
    keywords.push(`${county.name.toLowerCase()} business funding`);

    // SME variation
    keywords.push(`sme loans ${county.name.toLowerCase()}`);

    // Top industry (if available)
    if (county.keyIndustries.length > 0) {
        const topIndustry = county.keyIndustries[0].toLowerCase();
        keywords.push(`${topIndustry} finance ${county.name.toLowerCase()}`);
    }

    // Commercial finance
    if (keywords.length < 5) {
        keywords.push(`${county.name.toLowerCase()} commercial finance`);
    }

    return keywords.slice(0, seoConfig.meta.keywordsRecommended);
}

/**
 * Validate metadata meets SEO requirements
 */
export function validateMetadata(metadata: Metadata): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Title validation
    if (metadata.title) {
        const titleStr = typeof metadata.title === 'string' ? metadata.title : metadata.title.toString();
        const titleLength = titleStr.length;

        if (titleLength < seoConfig.meta.titleMinLength) {
            errors.push(`Title too short (${titleLength} chars, minimum ${seoConfig.meta.titleMinLength})`);
        } else if (titleLength > seoConfig.meta.titleMaxLength) {
            errors.push(`Title too long (${titleLength} chars, maximum ${seoConfig.meta.titleMaxLength})`);
        }

        if (titleLength > 55) {
            warnings.push(`Title may be truncated in search results (${titleLength} chars, recommended <55)`);
        }
    } else {
        errors.push('Title is required');
    }

    // Description validation
    if (metadata.description) {
        const descLength = metadata.description.length;

        if (descLength < seoConfig.meta.descriptionMinLength) {
            errors.push(
                `Description too short (${descLength} chars, minimum ${seoConfig.meta.descriptionMinLength})`
            );
        } else if (descLength > seoConfig.meta.descriptionMaxLength) {
            errors.push(
                `Description too long (${descLength} chars, maximum ${seoConfig.meta.descriptionMaxLength})`
            );
        }

        if (descLength > 155) {
            warnings.push(`Description may be truncated (${descLength} chars, recommended <155)`);
        }
    } else {
        errors.push('Description is required');
    }

    // Keywords validation
    if (metadata.keywords) {
        const keywordCount = Array.isArray(metadata.keywords)
            ? metadata.keywords.length
            : metadata.keywords.split(',').length;

        if (keywordCount > seoConfig.meta.keywordsMax) {
            warnings.push(
                `Too many keywords (${keywordCount}, recommended ${seoConfig.meta.keywordsRecommended})`
            );
        }

        if (keywordCount < 3) {
            warnings.push(`Few keywords (${keywordCount}, recommended ${seoConfig.meta.keywordsRecommended})`);
        }
    }

    // OpenGraph validation
    if (!metadata.openGraph) {
        warnings.push('OpenGraph metadata missing - affects social sharing');
    }

    // Twitter Card validation
    if (!metadata.twitter) {
        warnings.push('Twitter Card metadata missing - affects Twitter sharing');
    }

    // Canonical URL validation
    if (!metadata.alternates?.canonical) {
        warnings.push('Canonical URL missing - important for SEO');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Generate structured data (JSON-LD) for a page
 * This can be used alongside schema-generators for additional context
 */
export function generatePageJsonLd(page: {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: page.url,
        datePublished: page.datePublished || new Date().toISOString(),
        dateModified: page.dateModified || new Date().toISOString(),
        publisher: {
            '@type': 'Organization',
            name: seoConfig.siteName,
            url: seoConfig.siteUrl
        }
    };
}
