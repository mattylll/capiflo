import type { ArticleContent } from '@/data/content-types';
import { guideContent } from '@/content/guides';

export type GuideCategory = 'getting-funded' | 'invoice-finance' | 'property-finance' | 'cash-flow';

export type Guide = {
    slug: string;
    category: GuideCategory;
    /** On-page H1 (carries the head keyword). */
    h1: string;
    /** SEO <title>, deliberately different from the H1. */
    metaTitle: string;
    metaDescription: string;
    excerpt: string;
    keywords: string[];
    publishedAt: string;
    updatedAt: string;
    relatedCalculator?: string;
    relatedFunding?: string;
    relatedGuides?: string[];
};

export const guideCategories: Record<GuideCategory, { label: string; description: string }> = {
    'getting-funded': {
        label: 'Getting funded',
        description: 'How to qualify for and secure business finance in the UK.'
    },
    'invoice-finance': {
        label: 'Invoice finance',
        description: 'Releasing cash from your sales ledger.'
    },
    'property-finance': {
        label: 'Property finance',
        description: 'Commercial mortgages, bridging and development funding.'
    },
    'cash-flow': {
        label: 'Cash flow & working capital',
        description: 'Smoothing cash flow and funding day-to-day operations.'
    }
};

export const guides: Guide[] = [
    {
        slug: 'how-to-get-a-business-loan-uk',
        category: 'getting-funded',
        h1: 'How to Get a Business Loan in the UK',
        metaTitle: 'How to Get a Business Loan: Steps, Eligibility & Tips | Capiflo',
        metaDescription:
            'A step-by-step guide to getting a UK business loan: eligibility, what lenders check, the documents you need, and how to improve your chances of approval.',
        excerpt:
            'What lenders look for, the documents to prepare, and the steps to a stronger UK business loan application.',
        keywords: ['how to get a business loan', 'business loan eligibility uk', 'qualify for a business loan'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'business-loan-repayment',
        relatedFunding: 'business-loans',
        relatedGuides: ['business-loan-credit-score', 'what-is-working-capital-finance']
    },
    {
        slug: 'what-is-invoice-finance',
        category: 'invoice-finance',
        h1: 'What Is Invoice Finance?',
        metaTitle: 'What Is Invoice Finance? How It Works, Costs & Types | Capiflo',
        metaDescription:
            'Invoice finance releases cash tied up in unpaid invoices. Learn how it works, what it costs, the difference between factoring and discounting, and who it suits.',
        excerpt:
            'How invoice finance unlocks cash from unpaid invoices, what it costs, and when it beats an overdraft.',
        keywords: ['what is invoice finance', 'invoice finance uk', 'how does invoice finance work'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'invoice-finance',
        relatedFunding: 'invoice-finance',
        relatedGuides: ['invoice-finance-vs-factoring', 'what-is-working-capital-finance']
    },
    {
        slug: 'invoice-finance-vs-factoring',
        category: 'invoice-finance',
        h1: 'Invoice Discounting vs Factoring',
        metaTitle: 'Invoice Discounting vs Factoring: Key Differences | Capiflo',
        metaDescription:
            'Invoice discounting and factoring both release cash from invoices, but differ on credit control, confidentiality and cost. Compare the two and see which fits.',
        excerpt:
            'The practical differences between invoice discounting and factoring, and how to choose between them.',
        keywords: ['invoice discounting vs factoring', 'invoice factoring vs discounting', 'difference between factoring and invoice discounting'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'invoice-finance',
        relatedFunding: 'invoice-finance',
        relatedGuides: ['what-is-invoice-finance', 'what-is-working-capital-finance']
    },
    {
        slug: 'business-loan-credit-score',
        category: 'getting-funded',
        h1: 'Business Loans and Your Credit Score',
        metaTitle: 'What Credit Score Do You Need for a Business Loan? | Capiflo',
        metaDescription:
            'How personal and business credit scores affect a UK business loan, what lenders accept, and practical ways to strengthen your profile before you apply.',
        excerpt:
            'How credit scores shape a business loan decision, and the steps that strengthen a thin or adverse file.',
        keywords: ['business loan credit score', 'credit score for business loan uk', 'business loan bad credit'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'business-borrowing-power',
        relatedFunding: 'business-loans',
        relatedGuides: ['how-to-get-a-business-loan-uk', 'merchant-cash-advance-vs-loan']
    },
    {
        slug: 'what-is-a-bridging-loan',
        category: 'property-finance',
        h1: 'What Is a Bridging Loan?',
        metaTitle: 'What Is a Bridging Loan? How They Work, Costs & Uses | Capiflo',
        metaDescription:
            'A bridging loan is short-term, property-secured finance. Learn how bridging loans work, what they cost, the role of the exit, and when they make sense.',
        excerpt:
            'How short-term bridging finance works, what it costs, and why the exit matters most.',
        keywords: ['what is a bridging loan', 'bridging loan uk', 'how do bridging loans work'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'bridging-development',
        relatedFunding: 'property-backed',
        relatedGuides: ['commercial-mortgage-deposit', 'what-is-working-capital-finance']
    },
    {
        slug: 'commercial-mortgage-deposit',
        category: 'property-finance',
        h1: 'Commercial Mortgage Deposits Explained',
        metaTitle: 'Commercial Mortgage Deposit: How Much Do You Need? | Capiflo',
        metaDescription:
            'How much deposit do you need for a commercial mortgage? Typical loan-to-value limits, what affects the deposit, and where the money can come from.',
        excerpt:
            'Typical deposit and loan-to-value limits on a commercial mortgage, and how to fund the deposit.',
        keywords: ['commercial mortgage deposit', 'commercial mortgage deposit uk', 'how much deposit for commercial mortgage'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'commercial-mortgage',
        relatedFunding: 'property-backed',
        relatedGuides: ['what-is-a-bridging-loan', 'how-to-get-a-business-loan-uk']
    },
    {
        slug: 'what-is-working-capital-finance',
        category: 'cash-flow',
        h1: 'What Is Working Capital Finance?',
        metaTitle: 'Working Capital Finance: Types, Uses & How It Works | Capiflo',
        metaDescription:
            'Working capital finance funds the day-to-day running of a business. Learn the main types, how each works, what they cost, and how to choose the right one.',
        excerpt:
            'The main types of working capital finance, what each is for, and how to pick the right facility.',
        keywords: ['working capital finance', 'what is working capital finance', 'working capital loan uk'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'vat-loan',
        relatedFunding: 'business-loans',
        relatedGuides: ['what-is-invoice-finance', 'how-to-get-a-business-loan-uk']
    },
    {
        slug: 'merchant-cash-advance-vs-loan',
        category: 'cash-flow',
        h1: 'Merchant Cash Advance vs Business Loan',
        metaTitle: 'Merchant Cash Advance vs Loan: Which Suits Your SME? | Capiflo',
        metaDescription:
            'Compare a merchant cash advance with a traditional business loan: repayment structure, cost, speed, eligibility and when each option makes sense for UK SMEs.',
        excerpt:
            'Repayment structure, cost and speed compared, so you know when an advance beats a loan.',
        keywords: ['merchant cash advance vs loan', 'merchant cash advance vs business loan', 'is a merchant cash advance a loan'],
        publishedAt: '2026-06-03',
        updatedAt: '2026-06-03',
        relatedCalculator: 'merchant-cash-advance',
        relatedFunding: 'merchant-cash-advance',
        relatedGuides: ['business-loan-credit-score', 'what-is-working-capital-finance']
    }
];

export const guideBySlug = (slug: string): Guide | undefined => guides.find((g) => g.slug === slug);

export const getGuideContent = (slug: string): ArticleContent | undefined => guideContent[slug];

export const guidesByCategory = (category: GuideCategory): Guide[] =>
    guides.filter((g) => g.category === category);
