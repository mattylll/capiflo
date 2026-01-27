export type CalculatorBlock = {
    id: string;
    title: string;
    keywords: string[];
    description: string;
    inputs: string[];
    outputs: string[];
    cta: string;
};

export const calculators: CalculatorBlock[] = [
    {
        id: 'loan-range',
        title: 'Business funding calculator',
        keywords: ['business funding calculator', 'business loans uk', 'how much can my business borrow'],
        description:
            'Estimate borrowing power for UK SMEs based on turnover, profitability, years trading, and credit profile. Helps compare business loans London, Manchester, Leeds, and nationwide.',
        inputs: ['Annual turnover', 'Years trading', 'Profit or EBITDA', 'Purpose and use of funds'],
        outputs: ['Estimated borrowing range', 'Likely product fit (unsecured loan, secured, working capital)', 'Indicative rate band'],
        cta: 'Use this before submitting any business loan enquiry to benchmark fair offers.'
    },
    {
        id: 'repayment',
        title: 'Business loan repayment calculator UK',
        keywords: ['business loan repayment calculator', 'business loan calculator uk', 'sme loan repayment estimate'],
        description:
            'Model monthly repayments and total repayable amounts for unsecured or secured loans using rate bands from UK lenders.',
        inputs: ['Loan amount', 'Term length', 'Interest rate or rate band'],
        outputs: ['Monthly repayment', 'Total repayable', 'Impact on cash flow'],
        cta: 'Share repayment outputs with directors or investors to align on affordability.'
    },
    {
        id: 'invoice',
        title: 'Invoice finance calculator',
        keywords: ['invoice finance calculator', 'invoice discounting calculator', 'invoice factoring calculator uk'],
        description:
            'Understand upfront cash, service fees, and the true cost of invoice discounting or factoring for UK debtors.',
        inputs: ['Invoice amount', 'Advance percentage', 'Service fee / discount fee', 'Debtor days'],
        outputs: ['Upfront cash released', 'Fee structure and reserve', 'Effective annualised cost'],
        cta: 'Use with procurement or finance teams to prove why invoice finance beats overdrafts.'
    },
    {
        id: 'asset',
        title: 'Asset finance calculator',
        keywords: ['asset finance calculator', 'equipment lease calculator', 'machinery finance'],
        description:
            'Compare hire purchase vs. finance lease repayments when buying vehicles, machinery, or technology for your business.',
        inputs: ['Asset cost', 'Deposit percentage', 'Residual value', 'Term length'],
        outputs: ['Monthly repayments', 'Total interest/fees', 'Ownership or return options'],
        cta: 'Share with operational teams before committing to suppliers.'
    },
    {
        id: 'mca',
        title: 'Merchant cash advance calculator',
        keywords: ['merchant cash advance calculator uk', 'cash advance repayment calculator', 'merchant cash advance vs loan'],
        description:
            'Forecast the payback period of a merchant cash advance based on average monthly card takings and holdback percentages.',
        inputs: ['Monthly card revenue', 'Advance size', 'Factor rate', 'Holdback percentage'],
        outputs: ['Estimated repayment timeline', 'Daily deduction', 'Total cost vs. traditional loan'],
        cta: 'Ideal for hospitality and retail brands planning seasonal inventory or upgrades.'
    },
    {
        id: 'vat',
        title: 'VAT loan calculator',
        keywords: ['vat loan calculator', 'tax funding', 'finance my tax bill calculator'],
        description:
            'Spread VAT or corporation tax bills over 3–12 months to protect working capital while staying compliant with HMRC.',
        inputs: ['HMRC liability amount', 'Term length', 'Interest rate / fee'],
        outputs: ['Monthly repayment', 'Total cost compared to overdraft', 'Payment schedule'],
        cta: 'Share with finance teams ahead of VAT quarter deadlines.'
    },
    {
        id: 'corp-tax',
        title: 'Corporation tax funding calculator',
        keywords: ['corporation tax loan calculator', 'business tax funding', 'fund corporation tax quickly'],
        description: 'Plan how to finance upcoming corporation tax payments without halting projects or hiring.',
        inputs: ['Corporation tax due', 'Desired term', 'Security available'],
        outputs: ['Monthly repayment', 'Interest vs. early payment discount', 'Impact on cash buffer'],
        cta: 'Combine with VAT calculator when planning all HMRC obligations.'
    },
    {
        id: 'property',
        title: 'Bridging & development finance calculator',
        keywords: ['bridging loans uk', 'commercial loan interest calculator', 'development finance uk'],
        description:
            'Preview monthly interest, rolled-up totals, and exit requirements for property-backed bridging and development finance.',
        inputs: ['Property value / GDV', 'Loan-to-value', 'Interest rate per month', 'Term'],
        outputs: ['Monthly interest', 'Rolled-up balance at exit', 'Equity required'],
        cta: 'Use before auctions or planning submissions to keep stakeholders aligned.'
    }
];
