// UK Location Types and Exports
// Hierarchical structure: Region > County > Town

export type UKRegion =
    | 'north-west'
    | 'north-east'
    | 'yorkshire-humber'
    | 'east-midlands'
    | 'west-midlands'
    | 'east-of-england'
    | 'london'
    | 'south-east'
    | 'south-west'
    | 'wales'
    | 'scotland'
    | 'northern-ireland';

export const regionNames: Record<UKRegion, string> = {
    'north-west': 'North West England',
    'north-east': 'North East England',
    'yorkshire-humber': 'Yorkshire and the Humber',
    'east-midlands': 'East Midlands',
    'west-midlands': 'West Midlands',
    'east-of-england': 'East of England',
    'london': 'London',
    'south-east': 'South East England',
    'south-west': 'South West England',
    'wales': 'Wales',
    'scotland': 'Scotland',
    'northern-ireland': 'Northern Ireland'
};

export type County = {
    slug: string;
    name: string;
    region: UKRegion;
    description: string;
    overview: string;
    population?: string;
    businessCount?: string;
    keyIndustries: string[];
    economicHighlights: string[];
    fundingTypes?: {
        name: string;
        slug: string;
    }[];
    stats?: {
        label: string;
        value: string;
    }[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    image?: string;
};

export type TownCaseStudy = {
    title: string;
    businessType: string;
    location: string; // e.g., "Canary Wharf" or "Brick Lane"
    challenge: string;
    solution: string;
    fundingType: string;
    amount: string;
    result: string;
    timeframe?: string;
};

export type TownFundingScenario = {
    title: string;
    description: string;
    typicalAmount: string;
    commonUses: string[];
};

export type Town = {
    slug: string;
    name: string;
    countySlug: string;
    region?: UKRegion;
    postcode?: string;
    population?: string;
    description: string;
    overview: string;
    // Extended content sections for rich SEO
    extendedOverview?: string; // 400-600 words of genuine local content
    businessDemographics?: string; // Local business statistics and trends
    economicContext?: string; // Planning trends, business rates, local challenges
    localEconomy: string;
    businessTypes: string[];
    nearbyTowns?: string[];
    fundingHighlights?: string[];
    // New: specific funding scenarios for this location
    fundingScenarios?: TownFundingScenario[];
    fundingTypes?: {
        name: string;
        slug: string;
    }[];
    stats?: {
        label: string;
        value: string;
        description?: string; // Added for richer context
    }[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    // New: anonymised case study
    caseStudy?: TownCaseStudy;
    image?: string;
    // SEO metadata
    seoTitle?: string;
    seoDescription?: string;
    // Business hours (for enhanced schema markup)
    businessHours?: {
        opens: string;
        closes: string;
        dayOfWeek: string[];
    };
    // Location-specific rating (only use real, verifiable data)
    localRating?: {
        ratingValue: number;
        reviewCount: number;
        source: string; // 'google', 'trustpilot', etc.
    };
    // Content generation context (for automated content generation)
    generationContext?: {
        keyFeatures: string[]; // e.g., ["financial district", "creative quarter"]
        uniqueCharacteristic: string; // e.g., "diverse business landscape"
        proximityAdvantages: string[]; // e.g., ["M1 corridor access"]
        costContext: 'low' | 'moderate' | 'high' | 'premium';
        demographicProfile: string; // e.g., "young professionals"
        economicTrend: 'growing' | 'stable' | 'transforming' | 'emerging';
        primaryBusinessDistrict?: string;
        landmarkReferences: string[];
    };
    // Content generation tracking (internal use)
    _generated?: {
        extendedOverview?: boolean;
        faqs?: boolean;
        fundingScenarios?: boolean;
        caseStudy?: boolean;
        generatedAt?: string;
    };
};

// Import data
import { counties } from './counties';
import { towns } from './towns';

// Re-export data arrays
export { counties, towns };

// Lookup maps for efficient access
export const countyMap = new Map<string, County>(
    counties.map((c) => [c.slug, c])
);

export const townMap = new Map<string, Town>(
    towns.map((t) => [`${t.countySlug}/${t.slug}`, t])
);

// Towns grouped by county
export const townsByCounty = new Map<string, Town[]>(
    counties.map((c) => [c.slug, towns.filter((t) => t.countySlug === c.slug)])
);

// Counties grouped by region
export const countiesByRegion = new Map<UKRegion, County[]>(
    (Object.keys(regionNames) as UKRegion[]).map((region) => [
        region,
        counties.filter((c) => c.region === region)
    ])
);

// Helper functions
export const getCountyBySlug = (slug: string): County | undefined =>
    countyMap.get(slug);

export const getTownBySlug = (
    countySlug: string,
    townSlug: string
): Town | undefined => townMap.get(`${countySlug}/${townSlug}`);

export const getTownsByCounty = (countySlug: string): Town[] =>
    townsByCounty.get(countySlug) || [];

export const getCountiesByRegion = (region: UKRegion): County[] =>
    countiesByRegion.get(region) || [];

// Default funding types for locations (commonly used across all)
export const defaultFundingTypes = [
    { name: 'Business Loans', slug: 'business-loans' },
    { name: 'Invoice Finance', slug: 'invoice-finance' },
    { name: 'Asset Finance', slug: 'asset-finance' },
    { name: 'Merchant Cash Advance', slug: 'merchant-cash-advance' }
];

// Generate SEO-friendly title
export const getCountyTitle = (county: County): string =>
    `Business Loans in ${county.name} | UK SME Funding | Capiflo`;

export const getTownTitle = (town: Town, county: County): string =>
    `Business Loans in ${town.name}, ${county.name} | Capiflo`;

// Generate meta description
export const getCountyDescription = (county: County): string =>
    county.description ||
    `Apply for business loans in ${county.name}. Get matched with 120+ UK lenders. Fast decisions, flexible terms for SMEs across ${county.name}.`;

export const getTownDescription = (town: Town, county: County): string =>
    town.description ||
    `Business loans in ${town.name}, ${county.name}. Compare funding options from 120+ lenders. Quick approval for local SMEs.`;
