import type { CalculatorEngine } from '@/lib/calculators/engine';

export type CalcFieldType = 'currency' | 'number' | 'percent' | 'select';

export type CalcField = {
    id: string;
    label: string;
    type: CalcFieldType;
    default: number | string;
    min?: number;
    max?: number;
    step?: number;
    suffix?: string;
    options?: { label: string; value: string }[];
    help?: string;
};

export type CalculatorBlock = {
    /** Short id used by the hub icon map and in-page anchors. */
    id: string;
    /** URL segment: /calculators/<slug>. */
    slug: string;
    engine: CalculatorEngine;
    /** Hub card label. */
    shortName: string;
    /** On-page H1 (carries the head keyword). */
    h1: string;
    /** SEO <title>, deliberately different from the H1. */
    metaTitle: string;
    metaDescription: string;
    title: string;
    keywords: string[];
    description: string;
    fields: CalcField[];
    /** Disclaimer rendered beneath the live results. */
    resultsNote: string;
    /** Slug of the funding product page this calculator supports. */
    relatedFunding?: string;
    /** Slug of the in-depth guide for this topic. */
    relatedGuide?: string;
    cta: string;
};

export const calculators: CalculatorBlock[] = [
    {
        id: 'repayment',
        slug: 'business-loan-repayment',
        engine: 'loan-repayment',
        shortName: 'Business loan repayments',
        h1: 'Business Loan Calculator UK',
        metaTitle: 'Business Loan Repayment Calculator | Monthly Cost & Total | Capiflo',
        metaDescription:
            'Work out monthly repayments, total interest and total repayable on a UK business loan. Adjust amount, term and rate to test affordability before you apply.',
        title: 'Business loan repayment calculator UK',
        keywords: ['business loan calculator uk', 'business loan repayment calculator', 'business funding calculator'],
        description:
            'Model monthly repayments and total repayable amounts for unsecured or secured business loans using typical UK rate bands.',
        fields: [
            { id: 'amount', label: 'Loan amount', type: 'currency', default: 50000, min: 1000, max: 500000, step: 1000 },
            { id: 'termMonths', label: 'Term', type: 'number', default: 36, min: 6, max: 84, step: 1, suffix: 'months' },
            { id: 'rate', label: 'Interest rate', type: 'percent', default: 12.9, min: 3, max: 30, step: 0.1, help: 'Typical unsecured SME rates run from about 8% to 20%.' }
        ],
        resultsNote: 'Indicative only. Repayments assume a fixed annual rate on a capital-and-interest basis. Your rate depends on credit profile, security and lender.',
        relatedFunding: 'business-loans',
        relatedGuide: 'how-to-get-a-business-loan-uk',
        cta: 'Use this before submitting any business loan enquiry to benchmark fair offers.'
    },
    {
        id: 'loan-range',
        slug: 'business-borrowing-power',
        engine: 'borrowing-power',
        shortName: 'How much can I borrow',
        h1: 'Business Funding Calculator',
        metaTitle: 'How Much Can My Business Borrow? Funding Calculator | Capiflo',
        metaDescription:
            'Estimate how much your UK business could borrow from turnover, profitability and years trading, plus an indicative monthly repayment and likely product fit.',
        title: 'Business funding calculator',
        keywords: ['business funding calculator', 'how much can my business borrow', 'business loans uk'],
        description:
            'Estimate borrowing power for UK SMEs from turnover, profitability and years trading, then see likely product fit and a headline repayment.',
        fields: [
            { id: 'turnover', label: 'Annual turnover', type: 'currency', default: 250000, min: 10000, max: 10000000, step: 10000 },
            { id: 'yearsTrading', label: 'Years trading', type: 'number', default: 3, min: 0, max: 40, step: 1, suffix: 'years' },
            { id: 'monthlyProfit', label: 'Monthly net profit', type: 'currency', default: 5000, min: 0, max: 500000, step: 500, help: 'Average monthly profit after costs, before drawings.' }
        ],
        resultsNote: 'Indicative only. The range is a guide to unsecured appetite; secured facilities can be larger. Actual offers depend on accounts, sector and credit profile.',
        relatedFunding: 'business-loans',
        relatedGuide: 'how-to-get-a-business-loan-uk',
        cta: 'Benchmark your borrowing power before approaching lenders.'
    },
    {
        id: 'invoice',
        slug: 'invoice-finance',
        engine: 'invoice-finance',
        shortName: 'Invoice finance',
        h1: 'Invoice Finance Calculator',
        metaTitle: 'Invoice Finance Calculator | Advance & True Cost | Capiflo',
        metaDescription:
            'See how much cash an invoice releases, the reserve held back, service and discount fees, and the effective annualised cost of invoice finance in the UK.',
        title: 'Invoice finance calculator',
        keywords: ['invoice finance calculator', 'invoice discounting calculator', 'invoice factoring calculator uk'],
        description:
            'Understand upfront cash, service and discount fees, and the true annualised cost of invoice discounting or factoring against your debtor days.',
        fields: [
            { id: 'invoiceAmount', label: 'Invoice value', type: 'currency', default: 50000, min: 1000, max: 1000000, step: 1000 },
            { id: 'advancePct', label: 'Advance rate', type: 'percent', default: 85, min: 50, max: 95, step: 1 },
            { id: 'serviceFeePct', label: 'Service fee', type: 'percent', default: 1.5, min: 0.1, max: 4, step: 0.1, help: 'Percentage of invoice value for managing the facility.' },
            { id: 'discountRate', label: 'Discount rate (annual)', type: 'percent', default: 7.5, min: 2, max: 18, step: 0.1 },
            { id: 'debtorDays', label: 'Debtor days', type: 'number', default: 45, min: 7, max: 120, step: 1, suffix: 'days' }
        ],
        resultsNote: 'Indicative only. Factoring includes credit control; discounting keeps collections in-house. Fees vary by turnover, debtor quality and sector.',
        relatedFunding: 'invoice-finance',
        relatedGuide: 'what-is-invoice-finance',
        cta: 'Prove why invoice finance beats an overdraft for your debtor book.'
    },
    {
        id: 'asset',
        slug: 'asset-finance',
        engine: 'asset-finance',
        shortName: 'Asset finance',
        h1: 'Asset Finance Calculator',
        metaTitle: 'Asset Finance Calculator | Equipment & Vehicle Repayments | Capiflo',
        metaDescription:
            'Calculate hire purchase repayments on equipment, machinery or vehicles. Adjust deposit, balloon, term and rate to see the monthly cost and total cost of finance.',
        title: 'Asset finance calculator',
        keywords: ['asset finance calculator', 'equipment lease calculator', 'hire purchase calculator'],
        description:
            'Compare hire purchase repayments when buying vehicles, machinery or technology, including deposit and balloon options.',
        fields: [
            { id: 'assetCost', label: 'Asset cost', type: 'currency', default: 40000, min: 1000, max: 2000000, step: 1000 },
            { id: 'depositPct', label: 'Deposit', type: 'percent', default: 10, min: 0, max: 50, step: 1 },
            { id: 'balloon', label: 'Balloon / final payment', type: 'currency', default: 0, min: 0, max: 500000, step: 500, help: 'Optional lump sum at the end of the agreement.' },
            { id: 'termMonths', label: 'Term', type: 'number', default: 48, min: 12, max: 84, step: 1, suffix: 'months' },
            { id: 'rate', label: 'Interest rate', type: 'percent', default: 9.5, min: 3, max: 20, step: 0.1 }
        ],
        resultsNote: 'Indicative only. Hire purchase transfers ownership at the end; a finance lease does not. Rates depend on asset type, age and your credit profile.',
        relatedFunding: 'asset-finance',
        relatedGuide: 'how-to-get-a-business-loan-uk',
        cta: 'Check repayments before committing to a supplier.'
    },
    {
        id: 'mca',
        slug: 'merchant-cash-advance',
        engine: 'merchant-cash-advance',
        shortName: 'Merchant cash advance',
        h1: 'Merchant Cash Advance Calculator',
        metaTitle: 'Merchant Cash Advance Calculator UK | Payback & Cost | Capiflo',
        metaDescription:
            'Forecast total repayable, cost and payback period of a merchant cash advance from your monthly card takings, factor rate and holdback percentage.',
        title: 'Merchant cash advance calculator UK',
        keywords: ['merchant cash advance calculator uk', 'mca calculator', 'merchant cash advance vs loan'],
        description:
            'Forecast the payback period and total cost of a merchant cash advance based on card takings, factor rate and holdback.',
        fields: [
            { id: 'monthlyCardRevenue', label: 'Monthly card takings', type: 'currency', default: 30000, min: 1000, max: 1000000, step: 1000 },
            { id: 'advanceAmount', label: 'Advance amount', type: 'currency', default: 30000, min: 1000, max: 500000, step: 1000 },
            { id: 'factorRate', label: 'Factor rate', type: 'number', default: 1.2, min: 1.05, max: 1.5, step: 0.01, help: 'A 1.2 factor on £30,000 repays £36,000.' },
            { id: 'holdbackPct', label: 'Holdback', type: 'percent', default: 15, min: 5, max: 30, step: 1, help: 'Share of daily card takings used to repay.' }
        ],
        resultsNote: 'Indicative only. A merchant cash advance is not a loan and uses a factor rate, not APR. Payback flexes with card sales, so the period is an estimate.',
        relatedFunding: 'merchant-cash-advance',
        relatedGuide: 'merchant-cash-advance-vs-loan',
        cta: 'Ideal for hospitality and retail planning seasonal stock or refits.'
    },
    {
        id: 'vat',
        slug: 'vat-loan',
        engine: 'vat-loan',
        shortName: 'VAT & tax loan',
        h1: 'VAT Loan Calculator',
        metaTitle: 'VAT Loan Calculator | Spread Your HMRC Bill | Capiflo',
        metaDescription:
            'Spread a VAT or corporation tax bill over 3 to 12 months. Calculate the monthly repayment and total cost of financing your HMRC liability.',
        title: 'VAT loan calculator',
        keywords: ['vat loan calculator', 'tax loan calculator', 'spread my vat bill'],
        description:
            'Spread VAT or corporation tax bills over 3 to 12 months to protect working capital while staying compliant with HMRC.',
        fields: [
            { id: 'liability', label: 'HMRC liability', type: 'currency', default: 25000, min: 1000, max: 1000000, step: 1000 },
            { id: 'termMonths', label: 'Term', type: 'number', default: 3, min: 3, max: 12, step: 1, suffix: 'months' },
            { id: 'rate', label: 'Interest rate', type: 'percent', default: 12, min: 5, max: 20, step: 0.1 }
        ],
        resultsNote: 'Indicative only. VAT and corporation tax loans are short-term facilities paid to you or direct to HMRC. Rates depend on size, term and trading history.',
        relatedFunding: 'vat-loans',
        relatedGuide: 'what-is-working-capital-finance',
        cta: 'Plan ahead of your VAT quarter or corporation tax deadline.'
    },
    {
        id: 'property',
        slug: 'commercial-mortgage',
        engine: 'commercial-mortgage',
        shortName: 'Commercial mortgage',
        h1: 'Commercial Mortgage Calculator',
        metaTitle: 'Commercial Mortgage Calculator | Repayments & Deposit | Capiflo',
        metaDescription:
            'Calculate commercial mortgage repayments, loan-to-value and the deposit needed. Compare capital-and-interest with interest-only across the term.',
        title: 'Commercial mortgage calculator',
        keywords: ['commercial mortgage calculator', 'commercial mortgage calculator uk', 'commercial mortgage rates'],
        description:
            'Preview monthly repayments, loan-to-value and the deposit needed for an owner-occupied or investment commercial mortgage.',
        fields: [
            { id: 'propertyValue', label: 'Property value', type: 'currency', default: 500000, min: 50000, max: 20000000, step: 10000 },
            { id: 'depositPct', label: 'Deposit', type: 'percent', default: 30, min: 20, max: 60, step: 1, help: 'Most lenders want 25% to 40% for commercial property.' },
            { id: 'rate', label: 'Interest rate', type: 'percent', default: 7.5, min: 4, max: 12, step: 0.1 },
            { id: 'termYears', label: 'Term', type: 'number', default: 20, min: 5, max: 30, step: 1, suffix: 'years' },
            {
                id: 'repaymentType',
                label: 'Repayment type',
                type: 'select',
                default: 'repayment',
                options: [
                    { label: 'Capital and interest', value: 'repayment' },
                    { label: 'Interest only', value: 'interest-only' }
                ]
            }
        ],
        resultsNote: 'Indicative only. Commercial mortgage rates are usually priced over base rate and set per deal. Interest-only leaves the capital outstanding at term end.',
        relatedFunding: 'property-backed',
        relatedGuide: 'commercial-mortgage-deposit',
        cta: 'Model the deposit and repayments before you offer on a property.'
    },
    {
        id: 'bridging',
        slug: 'bridging-development',
        engine: 'bridging',
        shortName: 'Bridging finance',
        h1: 'Bridging Loan Calculator',
        metaTitle: 'Bridging Loan Calculator | Monthly Interest & Exit Cost | Capiflo',
        metaDescription:
            'Calculate monthly interest, rolled-up interest at exit, arrangement fees and the total to repay on a UK bridging or development finance loan.',
        title: 'Bridging & development finance calculator',
        keywords: ['bridging loan calculator', 'bridging finance calculator uk', 'development finance calculator'],
        description:
            'Preview monthly interest, rolled-up totals and the exit cost for property-backed bridging and development finance.',
        fields: [
            { id: 'loanAmount', label: 'Loan amount', type: 'currency', default: 250000, min: 25000, max: 25000000, step: 5000 },
            { id: 'monthlyRate', label: 'Monthly interest rate', type: 'percent', default: 0.85, min: 0.4, max: 2, step: 0.05, help: 'Bridging is priced per month, often 0.5% to 1.5%.' },
            { id: 'termMonths', label: 'Term', type: 'number', default: 12, min: 1, max: 24, step: 1, suffix: 'months' },
            { id: 'arrangementFeePct', label: 'Arrangement fee', type: 'percent', default: 2, min: 0.5, max: 3, step: 0.1 }
        ],
        resultsNote: 'Indicative only. Bridging interest is often rolled up and repaid at exit alongside fees. A clear exit, sale or refinance, is essential before you borrow.',
        relatedFunding: 'property-backed',
        relatedGuide: 'what-is-a-bridging-loan',
        cta: 'Keep stakeholders aligned before an auction or planning submission.'
    }
];

export const calculatorBySlug = (slug: string): CalculatorBlock | undefined =>
    calculators.find((c) => c.slug === slug);
