export type FundingSector = {
    slug: string;
    title: string;
    hero: string;
    description: string;
    keywords: string[];
    whatItIs: string;
    whoItsFor: string[];
    criteria: string[];
    calculator: {
        name: string;
        description: string;
        anchor: string;
    };
    useCases: string[];
    faqs: {
        question: string;
        answer: string;
    }[];
    stats: {
        label: string;
        value: string;
    }[];
};

export const fundingSectors: FundingSector[] = [
    {
        slug: 'business-loans',
        title: 'Business Loans UK',
        hero: 'Flexible unsecured and secured business loans for SMEs trading in the UK.',
        description:
            'Compare high-street lenders, specialist funds, and alternative business finance options. Borrow between £25k and £5m with terms from 12 to 72 months and rapid underwriting for established firms.',
        keywords: ['business loans uk', 'uk business finance', 'compare business loans uk', 'best small business loans uk'],
        whatItIs:
            'Traditional and alternative business loans that support growth, cash flow, projects, and refinancing. Choices include unsecured loans, secured lending, and cash-flow backed facilities.',
        whoItsFor: [
            'Limited companies and LLPs with £75k–£20m turnover',
            'SMEs seeking business expansion funding or working capital',
            'Borrowers who want an alternative to banks or faster approval'
        ],
        criteria: [
            '12+ months trading preferred, 6 months considered',
            'Turnover 1.5x the requested loan amount',
            'Director guarantees for unsecured lending',
            'Filed accounts or up-to-date management information'
        ],
        calculator: {
            name: 'Business funding calculator',
            description: 'Estimate borrowing capacity and headline repayments using revenue, profitability, and credit strength.',
            anchor: 'loan-range'
        },
        useCases: ['Refinance short-term business loans', 'Fund new hires or marketing', 'Bridge VAT or corporation tax bills'],
        faqs: [
            {
                question: 'How fast can I receive funds?',
                answer: 'Fast business loans can complete within 48 hours once underwriting receives bank statements and ID.'
            },
            {
                question: 'Do I need security?',
                answer: 'Unsecured business loans UK wide usually rely on personal guarantees. Secured loans offer higher limits with property or assets.'
            }
        ],
        stats: [
            { label: 'Rates from', value: '8.9% APR' },
            { label: 'Terms', value: '12–72 months' },
            { label: 'Typical approval', value: '< 3 days' }
        ]
    },
    {
        slug: 'merchant-cash-advance',
        title: 'Merchant Cash Advance UK',
        hero: 'Repay as a percentage of daily card takings with a UK merchant cash advance.',
        description:
            'Ideal for card-heavy sectors such as hospitality and retail. Fund £5k–£500k with repayments linked to PDQ or e-commerce sales.',
        keywords: ['merchant cash advance uk', 'card machine loans uk', 'cash advance for SMEs', 'merchant cash advance vs loan'],
        whatItIs:
            'A flexible funding facility where Capiflo advances a lump sum and recovers it via an agreed percentage of future card revenue.',
        whoItsFor: ['Hospitality, retail, and e-commerce brands', 'Businesses with £5k+ monthly card volume', 'Owners wanting repayments that flex with sales'],
        criteria: ['3+ months trading with card terminals', 'Consistent monthly revenue', 'Card processor statements'],
        calculator: {
            name: 'Merchant cash advance calculator UK',
            description: 'Model payback time based on card turnover and factor rates.',
            anchor: 'mca'
        },
        useCases: ['Seasonal stock purchases', 'Fit-outs and refurbishments', 'Marketing pushes tied to card sales'],
        faqs: [
            {
                question: 'Is there a fixed term?',
                answer: 'No. Repayments flex with sales, so slower months take longer and busy seasons settle sooner.'
            },
            {
                question: 'Will this hurt my credit?',
                answer: 'Providers run soft checks. Repayment performance builds alternative data for future funding.'
            }
        ],
        stats: [
            { label: 'Advance sizes', value: '£5k – £500k' },
            { label: 'Holdback rate', value: '8% – 20%' },
            { label: 'Average completion', value: '72 hours' }
        ]
    },
    {
        slug: 'invoice-finance',
        title: 'Invoice Finance UK',
        hero: 'Release up to 90% of outstanding invoices within 24 hours.',
        description:
            'Combine invoice discounting or factoring to stabilise cash flow, pay suppliers sooner, and fund growth without extra debt.',
        keywords: ['invoice finance uk', 'invoice discounting uk', 'invoice factoring uk', 'what is invoice finance'],
        whatItIs:
            'A revolving facility that advances cash against approved invoices. Choose confidential invoice discounting or full-service factoring.',
        whoItsFor: ['B2B companies invoicing on credit terms', 'Agencies, wholesalers, logistics firms', 'Businesses waiting 30–90 days for payment'],
        criteria: ['Minimum £250k annual turnover', 'Creditworthy debtors', 'Robust invoicing practices'],
        calculator: {
            name: 'Invoice finance calculator',
            description: 'Enter invoice value, advance %, and service fees to view upfront cash and total cost.',
            anchor: 'invoice'
        },
        useCases: ['Bridge long payment terms', 'Fund larger contracts without overdrafts', 'Support rapid hiring after big wins'],
        faqs: [
            {
                question: 'Invoice factoring vs discounting?',
                answer: 'Factoring includes credit control support. Discounting lets you retain debtor management but requires stronger finance teams.'
            },
            {
                question: 'Will clients know?',
                answer: 'Confidential facilities hide lender involvement; disclosed factoring communicates through managed trust accounts.'
            }
        ],
        stats: [
            { label: 'Advance rate', value: 'Up to 90%' },
            { label: 'Facility start', value: '£50k' },
            { label: 'Set-up time', value: '5–10 days' }
        ]
    },
    {
        slug: 'asset-finance',
        title: 'Asset Finance',
        hero: 'Lease or hire purchase equipment, vehicles, or machinery without draining cash reserves.',
        description:
            'Unlock equipment financing solutions that spread payments and keep capital free for hiring, R&D, or marketing.',
        keywords: ['asset finance', 'equipment financing', 'machinery finance', 'how does asset finance work'],
        whatItIs: 'Funding structured around the asset you are buying. Includes hire purchase, finance lease, and operating lease.',
        whoItsFor: ['Manufacturing, construction, transport, healthcare', 'SMEs upgrading kit without large deposits', 'Businesses wanting predictable payments'],
        criteria: ['Asset located in the UK', 'Deposit 5–10%', 'Equipment age less than 7 years', 'Clean credit or additional security'],
        calculator: {
            name: 'Asset finance calculator',
            description: 'Predict lease or hire purchase repayments using amount, deposit, and term.',
            anchor: 'asset'
        },
        useCases: ['Vehicle fleets', 'CNC and fabrication machinery', 'Medical or dental equipment'],
        faqs: [
            {
                question: 'What happens at term end?',
                answer: 'Hire purchase transfers ownership. Operating leases allow returns or upgrades. Finance leases can continue at peppercorn rent.'
            },
            {
                question: 'Can I finance used equipment?',
                answer: 'Yes, depending on valuation and remaining useful life.'
            }
        ],
        stats: [
            { label: 'Terms', value: '12–84 months' },
            { label: 'Deposits', value: 'From 5%' },
            { label: 'Ticket size', value: '£25k – £1m+' }
        ]
    },
    {
        slug: 'vat-loans',
        title: 'VAT Loans UK',
        hero: 'Spread quarterly VAT bills over predictable instalments.',
        description:
            'Use tax funding facilities to protect cash flow, avoid HMRC penalties, and invest in growth during peak tax periods.',
        keywords: ['vat loans uk', 'vat loan calculator', 'fund vat bills', 'best loan for vat bill uk'],
        whatItIs: 'Short-term business loans tailored to HMRC liabilities. Funds are paid directly to HMRC or to the business to settle upcoming VAT.',
        whoItsFor: ['Product businesses with seasonal spikes', 'Companies facing large VAT on imports', 'Fast-growing digital agencies'],
        criteria: ['Proof of VAT liability', 'Next return due within 60 days', 'Director guarantee'],
        calculator: {
            name: 'VAT loan calculator',
            description: 'Show repayments for 3–12 month VAT finance options.',
            anchor: 'vat'
        },
        useCases: ['Cover VAT on equipment purchases', 'Smooth cash flow during slower quarters', 'Avoid dipping into overdrafts'],
        faqs: [
            {
                question: 'Will you pay HMRC directly?',
                answer: 'Yes, most lenders send funds directly to HMRC once agreements are signed.'
            },
            {
                question: 'Is there an arrangement fee?',
                answer: 'Expect 2–4% of the loan plus interest depending on term.'
            }
        ],
        stats: [
            { label: 'Terms', value: '3–12 months' },
            { label: 'Amounts', value: '£20k – £2m' },
            { label: 'Decision time', value: '24–72 hours' }
        ]
    },
    {
        slug: 'corporation-tax-loans',
        title: 'Corporation Tax Loans UK',
        hero: 'Finance your corporation tax bill to keep growth plans on track.',
        description:
            'Corporation tax funding lets SMEs pay HMRC on time while preserving cash for payroll, stock, or acquisitions.',
        keywords: ['corporation tax loans uk', 'tax funding', 'finance my tax bill calculator', 'business tax funding'],
        whatItIs: 'Short-term loan tailored to upcoming corporation tax, repaid over 3–12 months.',
        whoItsFor: ['Profitable SMEs hit by lumpy tax payments', 'Companies with long debtor cycles', 'Businesses investing in expansion'],
        criteria: ['Confirmed tax liability with HMRC reference', 'Up-to-date accounts', 'Director guarantees'],
        calculator: {
            name: 'Corporation tax funding calculator',
            description: 'Model the cost of financing HMRC payments vs. using overdrafts.',
            anchor: 'corp-tax'
        },
        useCases: ['Offset project delays', 'Cover tax when profits spike', 'Fund acquisitions without draining cash'],
        faqs: [
            {
                question: 'Can you refinance overdue tax?',
                answer: 'Yes, but lenders may require time-to-pay agreements or additional fees.'
            },
            {
                question: 'Does HMRC allow this?',
                answer: 'Yes. Many lenders wire funds directly to HMRC referencing your UTR.'
            }
        ],
        stats: [
            { label: 'Terms', value: '3–12 months' },
            { label: 'Amounts', value: '£30k – £5m' },
            { label: 'Fees', value: 'From 2%' }
        ]
    },
    {
        slug: 'start-up-loans',
        title: 'Start-up Finance',
        hero: 'Funding options for new businesses, including Start Up Loans, revenue finance, and alternative lenders.',
        description:
            'Move beyond bank declines with UK government-backed programs, angel-friendly debt, and crowdfunding style facilities.',
        keywords: ['start-up finance', 'funding for new businesses', 'loans for new company uk', 'start-up loans uk'],
        whatItIs: 'Blended finance options aimed at companies trading under three years: Start Up Loans, secured lending, merchant cash, and revenue-share.',
        whoItsFor: ['Newly incorporated firms with viable plans', 'Companies needing fast approval after bank declines', 'Entrepreneurs with minimal assets'],
        criteria: ['Robust business plan and forecasts', 'Directors based in the UK', 'Personal credit review'],
        calculator: {
            name: 'How much can my business borrow?',
            description: 'Simple borrowing capacity estimate for early-stage founders.',
            anchor: 'startup'
        },
        useCases: ['Launch marketing campaigns', 'Purchase initial stock', 'Hire key team members'],
        faqs: [
            {
                question: 'Can I borrow with limited trading history?',
                answer: 'Yes. Start Up Loans and specialist lenders look at forecasts and director income.'
            },
            {
                question: 'Do I need security?',
                answer: 'Not always, but personal guarantees are standard.'
            }
        ],
        stats: [
            { label: 'Amounts', value: '£10k – £500k' },
            { label: 'Approval time', value: '1–3 weeks' },
            { label: 'Interest', value: '6% – 15%' }
        ]
    },
    {
        slug: 'property-backed',
        title: 'Property-Backed Funding',
        hero: 'Use commercial or investment property to access bridging or development finance.',
        description:
            'Short-term bridging loans, development finance, and property investment facilities for acquisitions, refurbishments, or ground-up schemes.',
        keywords: ['bridging loans uk', 'commercial bridging loans', 'development finance uk', 'property investment loans uk'],
        whatItIs: 'Fast, asset-backed lending secured against residential, commercial, or mixed-use property, often interest-rollup.',
        whoItsFor: ['Developers needing quick completions', 'Businesses purchasing premises', 'Investors refinancing existing sites'],
        criteria: ['Property with UK title', 'Exit strategy (sale/refinance)', 'Valuation report', 'Planning consent for development'],
        calculator: {
            name: 'Bridging loan calculator',
            description: 'Review monthly interest, rolled-up cost, and exit requirements.',
            anchor: 'property'
        },
        useCases: ['Auction purchases', 'Heavy refurbishments', 'Development drawdowns'],
        faqs: [
            {
                question: 'How fast can bridging complete?',
                answer: 'As little as 7–10 days with valuations and legal packs ready.'
            },
            {
                question: 'What LTV is available?',
                answer: 'Up to 75% of value, higher with additional security.'
            }
        ],
        stats: [
            { label: 'Loan size', value: '£100k – £15m' },
            { label: 'Terms', value: '3–24 months' },
            { label: 'Interest', value: '0.55%+ per month' }
        ]
    },
    {
        slug: 'recovery',
        title: 'Recovery & Turnaround Finance',
        hero: 'Specialist support for businesses facing cash flow stress, arrears, or urgent liabilities.',
        description:
            'Combine emergency business funding, restructuring partners, and alternative lenders to stabilise trading and protect jobs.',
        keywords: ['business struggling with cash flow', 'emergency business funding uk', 'declined business loan options uk', 'business rejected for loan'],
        whatItIs: 'Short-term bridge loans, secured facilities, and structured turnaround plans.',
        whoItsFor: ['Companies with pressing HMRC or supplier arrears', 'Businesses rejected by mainstream banks', 'Directors seeking breathing space'],
        criteria: ['Realistic turnaround plan', 'Visibility on debtor pipeline', 'Security or guarantees'],
        calculator: {
            name: 'Working capital calculator',
            description: 'Estimate the cash gap and funding needed to stabilise trading.',
            anchor: 'recovery'
        },
        useCases: ['Cover payroll during restructures', 'Pay down critical suppliers', 'Execute Company Voluntary Arrangements'],
        faqs: [
            {
                question: 'Can you help with HMRC Time To Pay?',
                answer: 'Yes, we coordinate TTP plus funding to clear arrears.'
            },
            {
                question: 'What if my credit is poor?',
                answer: 'Specialist lenders focus on assets and turnaround potential rather than historic scores.'
            }
        ],
        stats: [
            { label: 'Urgent completion', value: '24–72 hours' },
            { label: 'Funding types', value: 'Secured, unsecured, invoice, bridging' },
            { label: 'Support', value: 'Dedicated turnaround team' }
        ]
    },
    {
        slug: 'growth',
        title: 'Growth & Expansion Finance',
        hero: 'Scale faster with working capital loans, revenue finance, and strategic credit lines.',
        description:
            'Blend unsecured loans, revolving credit, and non-dilutive funding to fuel marketing, hiring, or acquisitions.',
        keywords: ['business growth loans', 'working capital loans uk', 'scale up funding', 'small business funding uk'],
        whatItIs: 'Flexible growth loans tailored to high-performing SMEs needing capital for expansion.',
        whoItsFor: ['Scale-ups with recurring revenue', 'Regional businesses opening new locations', 'Companies seeking quick funding for campaigns'],
        criteria: ['Consistent revenue and margins', 'Growth plan and KPIs', 'Directors with UK residency'],
        calculator: {
            name: 'Business growth calculator',
            description: 'Project the ROI of funding vs. organic growth pace.',
            anchor: 'growth'
        },
        useCases: ['Launch new markets', 'Acquire competitors', 'Invest in technology or automation'],
        faqs: [
            {
                question: 'Is there revenue-based finance?',
                answer: 'Yes, we structure repayments as a share of monthly revenue for e-commerce and SaaS firms.'
            },
            {
                question: 'Do you work with investors?',
                answer: 'We collaborate with VC/PE to layer debt alongside equity.'
            }
        ],
        stats: [
            { label: 'Facilities', value: '£50k – £5m' },
            { label: 'Revolving lines', value: 'Up to 110% of MRR' },
            { label: 'Approval', value: 'Underwriting in 3 days' }
        ]
    }
];

export const fundingSectorMap = fundingSectors.reduce<Record<string, FundingSector>>((acc, sector) => {
    acc[sector.slug] = sector;
    return acc;
}, {});
