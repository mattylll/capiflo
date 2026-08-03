/**
 * SEO Configuration
 *
 * Centralized configuration for all SEO-related settings
 */

export const seoConfig = {
    // Site Information
    siteName: 'Capiflo',
    siteUrl: 'https://capiflo.co.uk',
    defaultTitle: 'Business Loans UK | SME Funding | Capiflo',
    titleTemplate: '%s | Capiflo',

    // Meta Configuration
    meta: {
        titleMaxLength: 60,
        titleMinLength: 30,
        descriptionMaxLength: 160,
        descriptionMinLength: 120,
        keywordsMax: 10,
        keywordsRecommended: 5
    },

    // Content Requirements
    content: {
        extendedOverview: {
            minWords: 400,
            maxWords: 700,
            targetWords: 550,
            paragraphs: 5,
            paragraphMinWords: 80,
            paragraphMaxWords: 150
        },
        faqs: {
            min: 8,
            max: 12,
            recommended: 10,
            questionMinLength: 20,
            questionMaxLength: 150,
            answerMinWords: 80,
            answerMaxWords: 150,
            answerMinLength: 100,
            answerMaxLength: 500
        },
        fundingScenarios: {
            min: 4,
            max: 6,
            recommended: 4,
            descriptionMinLength: 50,
            descriptionMaxLength: 300,
            commonUsesMin: 2,
            commonUsesMax: 6
        },
        caseStudy: {
            challengeMinLength: 50,
            solutionMinLength: 50,
            resultMinLength: 50
        }
    },

    // Keyword Optimization
    keywords: {
        densityMin: 0.5, // 0.5% minimum
        densityMax: 3.0, // 3.0% maximum
        densityTarget: 1.5, // 1.5% target
        mentionsMin: 3,
        mentionsMax: 15,
        mentionsTarget: 6
    },

    // Schema Configuration
    schema: {
        includeOrganization: true,
        includeBreadcrumbs: true,
        includeLocalBusiness: true,
        includeFAQ: true,
        includeService: true,
        includeArticle: false // Optional for content pages
    },

    // Sitemap Configuration
    sitemap: {
        changeFrequency: {
            homepage: 'daily' as const,
            locations: 'weekly' as const,
            counties: 'weekly' as const,
            towns: 'monthly' as const,
            products: 'monthly' as const,
            guides: 'weekly' as const
        },
        priority: {
            homepage: 1.0,
            mainLocations: 0.9,
            counties: 0.8,
            townsRichContent: 0.7, // Manually written content
            townsGeneratedContent: 0.6, // Auto-generated content
            products: 0.8,
            guides: 0.7
        }
    },

    // Open Graph Defaults
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        siteName: 'Capiflo',
        images: {
            default: '/og-image.png',
            width: 1200,
            height: 630
        }
    },

    // Twitter Card Defaults
    twitter: {
        card: 'summary_large_image' as const,
        site: '@capiflo', // Update with real Twitter handle
        creator: '@capiflo'
    },

    // Robots Configuration
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1
        }
    },

    // Canonical URLs
    canonical: {
        trailingSlash: false,
        lowercase: true
    },

    // Local SEO
    localSeo: {
        enableGeoCoordinates: false, // Enable when real coordinates available
        enableOpeningHours: false, // Enable when business hours available
        enableLocalRatings: false, // Enable when real ratings available
        napConsistency: true // Name, Address, Phone consistency
    },

    // Content Generation
    generation: {
        trackGenerated: true, // Track which content is auto-generated
        preferManual: true, // Manual content takes precedence
        validateOnGenerate: true, // Run validation after generation
        minQualityScore: 0.8 // Minimum quality threshold (0-1)
    }
};

/**
 * Helper function to get page title
 */
export const getPageTitle = (title: string): string => {
    return seoConfig.titleTemplate.replace('%s', title);
};

/**
 * Helper function to validate title length
 */
export const isValidTitleLength = (title: string): boolean => {
    return (
        title.length >= seoConfig.meta.titleMinLength &&
        title.length <= seoConfig.meta.titleMaxLength
    );
};

/**
 * Helper function to validate description length
 */
export const isValidDescriptionLength = (description: string): boolean => {
    return (
        description.length >= seoConfig.meta.descriptionMinLength &&
        description.length <= seoConfig.meta.descriptionMaxLength
    );
};

/**
 * Helper function to get canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
    let url = `${seoConfig.siteUrl}${path}`;

    if (seoConfig.canonical.lowercase) {
        url = url.toLowerCase();
    }

    if (!seoConfig.canonical.trailingSlash && url.endsWith('/') && url !== seoConfig.siteUrl + '/') {
        url = url.slice(0, -1);
    }

    return url;
};

/**
 * Helper function to generate robots meta
 */
export const getRobotsMeta = (): string => {
    const parts: string[] = [];

    if (seoConfig.robots.index) {
        parts.push('index');
    } else {
        parts.push('noindex');
    }

    if (seoConfig.robots.follow) {
        parts.push('follow');
    } else {
        parts.push('nofollow');
    }

    return parts.join(', ');
};

export default seoConfig;
