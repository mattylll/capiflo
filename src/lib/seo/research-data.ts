/**
 * Research-derived entity & PAA data (DataForSEO, 2026-06-02, UK).
 *
 * Hand-curated from seo/keyword-research/2026-06-02.md + seo/serp-research/paa.json
 * so the content engine can reference real People-Also-Ask questions and the
 * topic co-occurrence entity set at render time without filesystem access.
 *
 * See seo/ENTITY-BRIEF.md for the strategy these values encode.
 */

/** Co-occurrence entities that pin a page to the SME-lending topic (Brief §3). */
export const TOPIC_ENTITIES: string[] = [
    'business loan',
    'SME',
    'commercial finance',
    'broker',
    'lender',
    'unsecured loan',
    'secured loan',
    'working capital',
    'cash flow',
    'asset finance',
    'hire purchase',
    'invoice finance',
    'factoring',
    'merchant cash advance',
    'commercial mortgage',
    'APR',
    'repayment',
    'turnover',
    'eligibility'
];

export type ProductKey =
    | 'business-loans'
    | 'asset-finance'
    | 'invoice-finance'
    | 'merchant-cash-advance'
    | 'commercial-mortgage'
    | 'vat-loans'
    | 'start-up-loans'
    | 'working-capital';

/**
 * Real People-Also-Ask questions per product (deduped from live SERP).
 * Used to source/seed location-FAQ wording so FAQs answer genuine queries.
 */
export const PAA_BANK: Record<ProductKey, string[]> = {
    'business-loans': [
        'What is the easiest business loan to get approved for?',
        'Am I eligible for a business loan?',
        'Can I borrow money to start up a business?',
        'How hard is it to get approved for a business loan?',
        'How much is the monthly payment on a £50,000 business loan?',
        'Which lenders give a business loan without collateral?'
    ],
    'asset-finance': [
        'What is the meaning of asset finance?',
        'Is it easy to get asset finance?',
        'What can asset finance be used for?',
        'What is the difference between hire purchase and leasing?'
    ],
    'invoice-finance': [
        'What is invoice finance?',
        'Is invoice finance a good idea?',
        'What is an example of invoice finance?',
        'Is invoice finance debt?'
    ],
    'merchant-cash-advance': [
        'How does a merchant cash advance work?',
        'Is a merchant cash advance a good idea?',
        "What happens if I can't pay back a merchant cash advance?",
        'How much does a merchant cash advance cost?'
    ],
    'commercial-mortgage': [
        'Is it difficult to get a commercial mortgage?',
        'How much deposit do you need for a commercial mortgage?',
        'Can I get a 100% commercial mortgage?',
        'What are commercial mortgage rates?'
    ],
    'vat-loans': [
        'How does a VAT loan work?',
        "What can I do if I can't afford my VAT bill?",
        'Can you spread the cost of a VAT bill?'
    ],
    'start-up-loans': [
        'Is a start-up loan a good idea?',
        'Can I get a loan to start up a business?',
        'How do you borrow money for a start-up?',
        'Do you have to pay back a start-up loan?'
    ],
    'working-capital': [
        'What is a working capital loan?',
        'Can you get a loan for working capital?',
        'What can you use a working capital loan for?',
        'Who is eligible for a working capital loan?'
    ]
};

/** Head search volume per product (UK/mo) — informs sitemap/priority weighting. */
export const PRODUCT_VOLUME: Record<ProductKey, number> = {
    'business-loans': 27100,
    'start-up-loans': 8100,
    'commercial-mortgage': 4400,
    'working-capital': 4400,
    'asset-finance': 1900,
    'invoice-finance': 1900,
    'merchant-cash-advance': 1300,
    'vat-loans': 480
};
