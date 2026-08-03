import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

const CALC_ENTRIES = [
    {
        code: 'CALC 01',
        label: 'How much can I borrow?',
        description:
            'Turnover, profit and trading history produce an instant borrowing range and likely product routes.',
        href: '/calculators#loan-range'
    },
    {
        code: 'CALC 02',
        label: 'Estimate my repayments',
        description: 'Adjust loan amount, rates and terms to understand the monthly cashflow impact in real time.',
        href: '/calculators#repayment'
    }
];

const CalculatorEntries = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <p className='ledger-eyebrow'>Calculators</p>
                <div className='mt-6 flex flex-wrap items-end justify-between gap-6'>
                    <h2 className='font-display text-foreground max-w-2xl text-3xl font-semibold sm:text-4xl'>
                        Rather run the numbers yourself first? Most people would.
                    </h2>
                    <Link
                        href='/calculators'
                        className='text-primary hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm font-medium tracking-wider uppercase transition-colors'>
                        All calculators
                        <ArrowUpRight className='h-4 w-4' />
                    </Link>
                </div>
                <p className='text-muted-foreground mt-4 max-w-2xl'>
                    No form, no sign-up, no one ringing you afterwards. They ask the same questions an
                    underwriter would, so the numbers you leave with are the ones lenders expect to see.
                </p>

                <div className='mt-10 grid gap-6 md:grid-cols-2'>
                    {CALC_ENTRIES.map((entry) => (
                        <Link
                            key={entry.code}
                            href={entry.href}
                            className='group border-border bg-card hover:border-primary border p-8 transition-colors'>
                            <p className='text-brass font-mono text-xs font-medium tracking-wider uppercase'>
                                {entry.code}
                            </p>
                            <h3 className='text-foreground mt-4 text-2xl font-semibold'>{entry.label}</h3>
                            <p className='text-muted-foreground mt-3 leading-relaxed'>{entry.description}</p>
                            <p className='text-primary mt-6 inline-flex items-center gap-1.5 font-mono text-sm font-medium tracking-wider uppercase'>
                                Launch calculator
                                <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CalculatorEntries;
