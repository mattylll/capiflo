/**
 * Content Templates
 *
 * Template definitions for generating location-specific content
 */

import type { Town, County, TownFundingScenario, TownCaseStudy } from '@/data/locations';
import {
    formatList,
    generateLocationDescriptor,
    getEconomicContextPhrase,
    getCostContextPhrase
} from './utils';

/**
 * Extended Overview Templates
 * Generates 400-600 word overviews for town pages
 */
export const extendedOverviewTemplates = {
    /**
     * Introduction paragraph
     */
    intro: (town: Town, county: County): string => {
        const descriptor = generateLocationDescriptor(town, county);
        const keyFeatures = town.generationContext?.keyFeatures || [];

        if (keyFeatures.length >= 2) {
            return `${town.name} presents a ${descriptor} for businesses seeking finance, combining ${keyFeatures[0]} with ${keyFeatures[1]}. As a key location within ${county.name}, ${town.name} businesses benefit from a diverse lending landscape that understands the unique characteristics of the local market.`;
        }

        return `${town.name} offers a ${descriptor} within ${county.name}, providing businesses with access to a wide range of funding solutions tailored to local market conditions. The town's business landscape creates unique opportunities for growth-focused enterprises seeking flexible finance.`;
    },

    /**
     * Business landscape analysis
     */
    businessLandscape: (town: Town, county: County): string => {
        const businessTypes = town.businessTypes.slice(0, 4);
        const population = town.population;

        let content = `The business landscape in ${town.name} is characterized by strong representation across ${formatList(businessTypes.slice(0, 3))} sectors.`;

        if (town.businessDemographics) {
            content += ` ${town.businessDemographics}`;
        } else if (population) {
            content += ` With a population of ${population}, the local economy supports a diverse mix of enterprises, from established SMEs to innovative startups.`;
        }

        content += ` This sectoral diversity means lenders offering finance in ${town.name} have developed expertise across multiple business models, creating competitive options for borrowers.`;

        return content;
    },

    /**
     * Sector-specific analysis
     */
    sectorAnalysis: (town: Town): string => {
        const primarySector = town.businessTypes[0];
        const secondarySector = town.businessTypes[1];
        const tertiarySector = town.businessTypes[2];

        let content = `${primarySector} businesses in ${town.name} typically require funding for working capital, expansion, and equipment finance.`;

        if (secondarySector) {
            content += ` The ${secondarySector.toLowerCase()} sector often seeks merchant cash advances and revenue-based finance solutions that align with cash flow patterns.`;
        }

        if (tertiarySector) {
            content += ` Meanwhile, ${tertiarySector.toLowerCase()} enterprises frequently utilize invoice finance and asset finance products.`;
        }

        content += ` Lenders active in ${town.name} understand these sector-specific requirements and structure products accordingly.`;

        return content;
    },

    /**
     * Funding patterns and local economy
     */
    fundingPatterns: (town: Town, county: County): string => {
        const trend = town.generationContext?.economicTrend;
        const trendPhrase = getEconomicContextPhrase(trend);

        let content = `${town.name} is ${trendPhrase}, which influences the funding products available and their terms.`;

        if (town.localEconomy) {
            content += ` ${town.localEconomy}`;
        }

        if (town.fundingHighlights && town.fundingHighlights.length > 0) {
            content += ` Popular funding solutions in ${town.name} include ${formatList(town.fundingHighlights.slice(0, 3))}.`;
        } else {
            content += ` Businesses commonly access unsecured loans, asset finance, and merchant cash advances tailored to local trading conditions.`;
        }

        return content;
    },

    /**
     * Operating context
     */
    operatingContext: (town: Town, county: County): string => {
        const costContext = town.generationContext?.costContext;
        const costPhrase = getCostContextPhrase(costContext);

        let content = `Operating in ${town.name} involves ${costPhrase}, which lenders factor into affordability assessments.`;

        if (town.economicContext) {
            content += ` ${town.economicContext}`;
        } else {
            content += ` Local business rates, property costs, and wage levels all influence the quantum of funding sustainable for ${town.name} businesses.`;
        }

        content += ` Experienced finance brokers working in ${town.name} understand these local cost dynamics and present funding applications in context, often securing better terms than national-only applications.`;

        return content;
    },

    /**
     * Conclusion with regional context
     */
    conclusion: (town: Town, county: County): string => {
        const proximityAdvantages = town.generationContext?.proximityAdvantages || [];
        const nearbyTowns = town.nearbyTowns?.slice(0, 2) || [];

        let content = `${town.name}'s position within ${county.name}`;

        if (proximityAdvantages.length > 0) {
            content += `, combined with ${formatList(proximityAdvantages)},`;
        }

        content += ` makes it an attractive location for businesses across multiple sectors.`;

        if (nearbyTowns.length > 0) {
            const nearbyNames = nearbyTowns.map(slug => {
                const townName = slug.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                return townName;
            });
            content += ` Businesses serving ${town.name} often also operate in nearby ${formatList(nearbyNames)}, creating opportunities for multi-location funding strategies.`;
        }

        content += ` Whether you're seeking growth capital, acquisition finance, or working capital solutions, ${town.name}'s diverse lender base ensures competitive options are available.`;

        return content;
    }
};

/**
 * FAQ Templates
 * Standard questions with location customization
 */
export const faqTemplates = [
    {
        id: 'available-loans',
        generateQuestion: (town: Town): string =>
            `What business loans are available in ${town.name}?`,
        generateAnswer: (town: Town, county: County): string => {
            const topSectors = town.businessTypes.slice(0, 3);
            return `${town.name} businesses can access unsecured business loans from £5,000 to £500,000, merchant cash advances based on card turnover, asset finance for equipment and vehicles, and invoice finance to release cash from unpaid invoices. Given ${town.name}'s strong ${topSectors[0]?.toLowerCase() || 'business'} presence, lenders have developed products specifically suited to these trading patterns. We compare options from 120+ UK lenders to find the best rates for your specific situation in ${town.name}.`;
        }
    },
    {
        id: 'funding-speed',
        generateQuestion: (town: Town): string =>
            `How quickly can ${town.name} businesses get funding?`,
        generateAnswer: (town: Town): string =>
            `Many funding solutions can be approved within 24-48 hours, with funds available within 3-5 working days for ${town.name} businesses. Some products like merchant cash advances can fund even faster. We work with lenders who understand the ${town.name} market and can move quickly when time is critical. For more complex funding requirements or larger amounts, the process may take 1-2 weeks to ensure optimal terms.`
    },
    {
        id: 'eligibility',
        generateQuestion: (town: Town): string =>
            `What are the eligibility requirements for business finance in ${town.name}?`,
        generateAnswer: (town: Town): string =>
            `Most ${town.name} businesses need at least 6 months trading history, a UK business bank account, and minimum monthly revenue of £5,000+. Requirements vary by lender and product - some lenders work with newer businesses or those with less-than-perfect credit. We'll help find the right match for your ${town.name} business circumstances, whether you're an established enterprise or a growing startup.`
    },
    {
        id: 'security-requirements',
        generateQuestion: (town: Town): string =>
            `Do I need to provide security for a business loan in ${town.name}?`,
        generateAnswer: (town: Town): string =>
            `Not necessarily. ${town.name} businesses can access unsecured loans up to £500,000 without requiring property as security. Unsecured loans rely on business performance and director guarantees rather than assets. For larger amounts or specific products like asset finance, security may be required, but this often secures better rates. We'll explain all options available to your ${town.name} business.`
    },
    {
        id: 'startup-funding',
        generateQuestion: (town: Town): string =>
            `Can startups in ${town.name} get business funding?`,
        generateAnswer: (town: Town, county: County): string =>
            `Yes, ${town.name} startups with 6+ months trading history can typically access funding. Newer businesses may qualify for startup loans, merchant cash advances (if accepting card payments), or alternative finance options. ${town.name}'s position within ${county.name} provides access to lenders experienced with early-stage businesses. We'll identify the most suitable options for your startup's stage and revenue profile.`
    },
    {
        id: 'documentation',
        generateQuestion: (town: Town): string =>
            `What documentation do I need to apply for business funding in ${town.name}?`,
        generateAnswer: (town: Town): string =>
            `Typically you'll need 3-6 months of business bank statements, proof of trading (invoices, contracts), and details of business directors. ${town.name} businesses may also need to provide VAT returns if registered, and proof of business address. Requirements vary by lender and loan amount, but we'll guide you through exactly what's needed for your specific application.`
    },
    {
        id: 'rates-comparison',
        generateQuestion: (town: Town): string =>
            `How do business loan rates in ${town.name} compare?`,
        generateAnswer: (town: Town, county: County): string =>
            `Business loan rates in ${town.name} are competitive with ${county.name} averages, typically ranging from 6% to 35% APR depending on loan type, amount, term, and business profile. Unsecured loans generally carry higher rates than secured options, while merchant cash advances use factor rates rather than APR. We compare rates from 120+ lenders to ensure your ${town.name} business gets market-leading terms.`
    },
    {
        id: 'costs',
        generateQuestion: (town: Town): string =>
            `Are there any fees for your service in ${town.name}?`,
        generateAnswer: (town: Town): string =>
            `No, our service is completely free for ${town.name} businesses. We're paid a commission by lenders when we successfully arrange funding. This means we're incentivized to find you the best deal - the better the terms for your ${town.name} business, the more likely you are to proceed, and the more likely we are to be paid. There are no upfront fees or charges.`
    }
];

/**
 * Funding Scenario Templates
 * Mapped to common business types
 */
export const fundingScenarioTemplates: Record<string, Omit<TownFundingScenario, 'title'> & { titleTemplate: (town: Town) => string }> = {
    'Retail & E-commerce': {
        titleTemplate: (town: Town) => `${town.name} Retail Stock Finance`,
        description: 'Seasonal inventory purchases, shop fit-outs, and working capital for retail businesses navigating peak trading periods and expansion opportunities.',
        typicalAmount: '£15,000 - £75,000',
        commonUses: ['Stock purchases', 'Seasonal inventory', 'Shop fit-out', 'POS systems', 'E-commerce platform upgrades']
    },
    'Hospitality': {
        titleTemplate: (town: Town) => `${town.name} Restaurant & Hospitality Finance`,
        description: 'Kitchen equipment, refurbishment, and working capital for restaurants, cafes, pubs, and hotels managing seasonal demand and growth.',
        typicalAmount: '£20,000 - £100,000',
        commonUses: ['Kitchen equipment', 'Interior refurbishment', 'Working capital', 'Expansion', 'Outdoor seating areas']
    },
    'Professional Services': {
        titleTemplate: (town: Town) => `${town.name} Professional Services Growth Capital`,
        description: 'Expansion capital, recruitment funding, and cash flow management for professional service firms including legal, accounting, consulting, and marketing agencies.',
        typicalAmount: '£30,000 - £150,000',
        commonUses: ['Staff recruitment', 'Office space', 'Technology systems', 'Marketing campaigns', 'Working capital']
    },
    'Manufacturing': {
        titleTemplate: (town: Town) => `${town.name} Manufacturing Equipment Finance`,
        description: 'Machinery purchases, factory equipment, and production capacity expansion for manufacturing businesses seeking to scale operations.',
        typicalAmount: '£50,000 - £250,000',
        commonUses: ['Machinery purchase', 'Factory equipment', 'Warehouse expansion', 'Production line upgrades', 'Raw material stock']
    },
    'Construction': {
        titleTemplate: (town: Town) => `${town.name} Construction Project Finance`,
        description: 'Project funding, vehicle finance, and working capital for construction firms managing contract delivery and growth opportunities.',
        typicalAmount: '£25,000 - £150,000',
        commonUses: ['Plant & machinery', 'Vehicle purchases', 'Project working capital', 'Materials advance', 'Wage cover']
    },
    'Technology & Software': {
        titleTemplate: (town: Town) => `${town.name} Tech Company Growth Funding`,
        description: 'Development funding, team expansion, and runway extension for technology companies, software firms, and digital agencies.',
        typicalAmount: '£25,000 - £200,000',
        commonUses: ['Developer recruitment', 'Infrastructure costs', 'Marketing spend', 'Product development', 'Working capital runway']
    },
    'Healthcare': {
        titleTemplate: (town: Town) => `${town.name} Healthcare Equipment Finance`,
        description: 'Medical equipment purchases, practice expansion, and working capital for healthcare providers including clinics, dentists, and care facilities.',
        typicalAmount: '£30,000 - £150,000',
        commonUses: ['Medical equipment', 'Practice fit-out', 'Staff recruitment', 'Facility expansion', 'Technology upgrades']
    }
};

/**
 * Case Study Templates
 */
export const caseStudyTemplates: Record<string, {
    titleTemplate: (town: Town, businessType: string) => string;
    businessType: string;
    challengeTemplate: string;
    solutionTemplate: string;
    fundingType: string;
    resultTemplate: string;
    timeframe?: string;
}> = {
    'Retail & E-commerce': {
        titleTemplate: (town: Town, businessType: string) => `${town.name} Retailer Secures Growth Capital`,
        businessType: 'Independent Retailer',
        challengeTemplate: 'Needed to purchase stock for peak season but had exhausted existing credit facilities. Traditional bank unwilling to provide additional funding without property security.',
        solutionTemplate: 'Arranged unsecured business loan with flexible repayment terms aligned to seasonal trading patterns.',
        fundingType: 'Unsecured Business Loan',
        resultTemplate: 'Successfully stocked for peak season, achieving 45% revenue increase. Repaid facility comfortably from seasonal sales and retained for future use.',
        timeframe: '72 hours to approval, funds within 5 days'
    },
    'Hospitality': {
        titleTemplate: (town: Town, businessType: string) => `${town.name} Restaurant Expansion Success`,
        businessType: 'Independent Restaurant',
        challengeTemplate: 'Opportunity to acquire adjacent premises for expansion but needed quick funding decision. Traditional finance too slow for property opportunity timeframe.',
        solutionTemplate: 'Structured merchant cash advance based on card turnover, providing immediate capital with manageable daily repayments.',
        fundingType: 'Merchant Cash Advance',
        resultTemplate: 'Secured property, completed refurbishment, and doubled covers. Increased revenue easily accommodated repayments, facility cleared within 10 months.',
        timeframe: '24-hour approval, funds within 3 days'
    },
    'Professional Services': {
        titleTemplate: (town: Town, businessType: string) => `${town.name} Agency Funds Major Contract`,
        businessType: 'Marketing Agency',
        challengeTemplate: 'Won significant contract requiring team expansion and technology investment before revenue commenced. Cash flow gap threatened contract delivery.',
        solutionTemplate: 'Combination of invoice finance for existing receivables and unsecured loan for team recruitment.',
        fundingType: 'Invoice Finance + Business Loan',
        resultTemplate: 'Delivered contract successfully, expanded team by 8 staff, and established blueprint for future growth. Now uses invoice finance permanently for cash flow smoothing.',
        timeframe: '5 days to full facility setup'
    },
    'Manufacturing': {
        titleTemplate: (town: Town, businessType: string) => `${town.name} Manufacturer Acquires New Equipment`,
        businessType: 'Manufacturing Business',
        challengeTemplate: 'Needed to upgrade production equipment to fulfill large order but lacked capital. Equipment supplier required deposit before manufacturing.',
        solutionTemplate: 'Asset finance structured over 5 years, preserving working capital while acquiring essential equipment.',
        fundingType: 'Asset Finance',
        resultTemplate: 'Fulfilled major order, increased production capacity by 60%, and achieved payback within 18 months from additional contracts.',
        timeframe: '1 week to approval and completion'
    }
};
