import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

// The product ledger: every facility we arrange, as ruled rows rather than
// marketing cards. Reference codes are the real ledger index for the range.
const PRODUCTS = [
    {
        code: 'BL',
        title: 'Business Loans',
        description:
            'The workhorse. £25k to £5m, secured or unsecured, and usually the first quote we go and get.',
        href: '/funding/business-loans'
    },
    {
        code: 'MCA',
        title: 'Merchant Cash Advance',
        description:
            'Repayments track your card takings, so a quiet week costs you less. Popular with cafes, salons and online shops.',
        href: '/funding/merchant-cash-advance'
    },
    {
        code: 'IF',
        title: 'Invoice Finance',
        description: 'Your unpaid invoices become cash this week instead of in 60 days.',
        href: '/funding/invoice-finance'
    },
    {
        code: 'AF',
        title: 'Asset Finance',
        description: 'Vans, machines, kit and fit-out, spread over the working life of the asset.',
        href: '/funding/asset-finance'
    },
    {
        code: 'VAT',
        title: 'VAT Loans',
        description:
            'The quarterly VAT bill has a habit of landing the same week as payroll. This spreads it out.',
        href: '/funding/vat-loans'
    },
    {
        code: 'CT',
        title: 'Corporation Tax Loans',
        description: 'Pay HMRC over 6 to 12 months instead of in one painful lump.',
        href: '/funding/corporation-tax-loans'
    },
    {
        code: 'PB',
        title: 'Property-Backed Finance',
        description: 'Bridging, development finance and commercial mortgages, secured on property.',
        href: '/funding/property-backed'
    },
    {
        code: 'GF',
        title: 'Growth Finance',
        description:
            'For the step changes: an acquisition, an MBO, a second site, or a bigger contract than you have ever taken on.',
        href: '/funding/growth'
    }
];

const BentoGrid = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <p className='ledger-eyebrow'>What we arrange</p>
                <div className='mt-6 flex flex-wrap items-end justify-between gap-6'>
                    <h2 className='font-display text-foreground max-w-2xl text-3xl font-semibold sm:text-4xl'>
                        Eight ways to fund a business
                    </h2>
                    <Link
                        href='/funding'
                        className='text-primary hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm font-medium tracking-wider uppercase transition-colors'>
                        All products
                        <ArrowUpRight className='h-4 w-4' />
                    </Link>
                </div>
                <p className='text-muted-foreground mt-4 max-w-3xl'>
                    Most businesses only ever hear about the first one. Half the job of a decent broker is
                    knowing when one of the other seven fits better. Each page below has the eligibility
                    criteria, a calculator and real costs.
                </p>

                <div className='border-border mt-10 grid border-t sm:grid-cols-2'>
                    {PRODUCTS.map((product) => (
                        <Link
                            key={product.code}
                            href={product.href}
                            className='group border-border hover:bg-accent grid grid-cols-[3.5rem_1fr_auto] items-start gap-4 border-b px-2 py-6 transition-colors sm:odd:border-r sm:odd:pr-8 sm:even:pl-8'>
                            <span className='text-brass font-mono text-xs font-medium tracking-wider uppercase'>
                                {product.code}
                            </span>
                            <span>
                                <span className='text-foreground block text-lg font-semibold'>{product.title}</span>
                                <span className='text-muted-foreground mt-1 block text-sm leading-relaxed'>
                                    {product.description}
                                </span>
                            </span>
                            <ArrowUpRight className='text-muted-foreground group-hover:text-primary mt-1 h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
