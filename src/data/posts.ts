export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    keywords: string[];
    content: {
        heading: string;
        body: string[];
    }[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'what-is-invoice-finance',
        title: 'What is Invoice Finance? Guide for UK Businesses',
        excerpt:
            'Invoice finance lets you unlock up to 90% of unpaid invoices. Learn the difference between factoring and discounting, fees, and when to use it.',
        publishedAt: '2025-11-10',
        keywords: ['what is invoice finance', 'invoice finance uk', 'invoice factoring uk', 'invoice discounting uk'],
        content: [
            {
                heading: 'How invoice finance works',
                body: [
                    'Invoice finance advances cash tied up in unpaid invoices. A lender releases up to 90% of its value within 24 hours, then pays the balance when your customer settles.',
                    'Invoice factoring includes credit control services, whereas invoice discounting keeps collections in-house.'
                ]
            },
            {
                heading: 'Costs and eligibility',
                body: [
                    'Expect a service fee (percentage of turnover) plus a discount fee (interest on amounts drawn).',
                    'Most providers want £250k+ turnover, clean debtor books, and UK-based customers.'
                ]
            },
            {
                heading: 'When to use it',
                body: [
                    'Invoice finance suits agencies, wholesalers, and logistics firms with long payment terms.',
                    'Compare the total facility cost with overdrafts or short-term loans so your finance team understands the trade-offs.'
                ]
            }
        ]
    },
    {
        slug: 'business-loan-calculator-uk',
        title: 'Business Loan Calculator UK: Work Out Repayments',
        excerpt:
            'Before applying for a business loan, use a calculator to test repayment options, affordability, and total repayable amounts.',
        publishedAt: '2025-11-05',
        keywords: ['business loan calculator uk', 'business loan repayment calculator', 'business funding calculator'],
        content: [
            {
                heading: 'Why model repayments first',
                body: [
                    'Lenders assess DSCR (debt service coverage ratio) and affordability. If you know your numbers first, you can request suitable terms.',
                    'Scenario modelling highlights how rate bands and term lengths impact monthly outgoings.'
                ]
            },
            {
                heading: 'Inputs to gather',
                body: [
                    'Loan amount, desired term, and a realistic rate band based on credit profile.',
                    'Latest filed accounts or management information to evidence profits.'
                ]
            },
            {
                heading: 'Next steps',
                body: [
                    'Share your repayment modelling with Capiflo so we can benchmark it against lenders nationwide.',
                    'If repayments look tight, consider invoice finance or merchant cash advance as alternatives.'
                ]
            }
        ]
    },
    {
        slug: 'merchant-cash-advance-vs-loan',
        title: 'Merchant Cash Advance vs Loan: Which is Right for UK SMEs?',
        excerpt:
            'Understand the pros, cons, and costs of merchant cash advances compared with traditional business loans.',
        publishedAt: '2025-11-01',
        keywords: ['merchant cash advance uk', 'merchant cash advance vs loan', 'fast business loans uk'],
        content: [
            {
                heading: 'Repayment structure',
                body: [
                    'Cash advances take a percentage of card sales, so payments flex with turnover.',
                    'Loans have fixed monthly repayments regardless of sales volume.'
                ]
            },
            {
                heading: 'Cost comparison',
                body: [
                    'Advances use factor rates (e.g., 1.25x). Translate this to APR for apples-to-apples comparisons.',
                    'Loans may be cheaper but require stronger credit and security.'
                ]
            },
            {
                heading: 'When to choose each option',
                body: [
                    'Choose merchant cash advances when sales fluctuate or you need approvals within 72 hours.',
                    'Choose loans for larger sums, lower costs, or when you can offer collateral.'
                ]
            }
        ]
    }
];
