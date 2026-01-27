import { Calculator, PieChart, Zap } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

const CALC_ENTRIES = [
    {
        icon: Calculator,
        label: 'How Much Can I Borrow?',
        description:
            'Turnover, profit, and trading history produce an instant borrowing range and likely product routes.',
        href: '/calculators#loan-range'
    },
    {
        icon: PieChart,
        label: 'Estimate My Repayments',
        description:
            'Adjust loan amount, rates, and terms to understand monthly cashflow impact in real time.',
        href: '/calculators#repayment'
    }
];

const CalculatorEntries = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto flex max-w-6xl flex-col gap-10'>
                {/* Header */}
                <div className='flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                        Calculator suite
                    </p>
                    <h2 className='max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl'>
                        Instant tools to plan your funding.
                    </h2>
                    <p className='max-w-2xl text-muted-foreground'>
                        Each calculator mirrors underwriting questions so founders can share accurate
                        numbers with brokers or lenders instantly.
                    </p>
                </div>

                {/* Calculator cards */}
                <div className='grid gap-6 md:grid-cols-2'>
                    {CALC_ENTRIES.map((entry, index) => (
                        <Card
                            key={entry.label}
                            className='group rounded-3xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'
                            style={{ animationDelay: `${index * 100 + 100}ms` }}>
                            <Link href={entry.href} className='flex flex-col'>
                                {/* Icon */}
                                <div className='mb-4 inline-flex rounded-xl bg-primary/15 p-3'>
                                    <entry.icon className='h-6 w-6 text-primary' />
                                </div>

                                {/* Content */}
                                <h3 className='text-2xl font-semibold text-foreground'>
                                    {entry.label}
                                </h3>
                                <p className='mt-3 text-muted-foreground'>{entry.description}</p>

                                {/* Link */}
                                <div className='mt-6 flex items-center gap-2 text-sm font-medium text-primary'>
                                    <span>Launch calculator</span>
                                    <span className='transition-transform group-hover:translate-x-1'>
                                        →
                                    </span>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>

                {/* Dynamic preview card (relocated from hero) */}
                <Card className='rounded-3xl border-border/50 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 delay-300 duration-700'>
                    <div className='grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center'>
                        {/* Left: Content */}
                        <div>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-medium text-primary'>
                                <Zap className='h-4 w-4' />
                                AI-powered matching
                            </div>
                            <h3 className='mt-6 text-2xl font-semibold text-foreground'>
                                Dynamic funding preview
                            </h3>
                            <p className='mt-4 text-muted-foreground'>
                                Capiflo combines calculator inputs, business data, and AI routing to
                                produce pre-packaged, lender-ready summaries — giving SMEs clarity
                                before they apply.
                            </p>
                            <Button className='mt-6' asChild>
                                <Link href='/calculators'>Try it now</Link>
                            </Button>
                        </div>

                        {/* Right: Preview card */}
                        <div className='rounded-2xl border border-border bg-muted/30 p-6'>
                            <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                                Borrowing Power Example
                            </p>
                            <p className='mt-2 text-xl font-semibold text-foreground'>
                                Dynamic preview
                            </p>
                            <div className='mt-6 space-y-3'>
                                {[
                                    { label: 'Sector', value: 'Digital Agency · £2.4m turnover' },
                                    { label: 'Likely routes', value: 'Invoice Finance + VAT Bridge' },
                                    { label: 'Estimated range', value: '£250k – £420k' }
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className='flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3'>
                                        <span className='text-sm font-medium text-foreground'>
                                            {item.label}
                                        </span>
                                        <span className='text-sm text-muted-foreground'>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default CalculatorEntries;
