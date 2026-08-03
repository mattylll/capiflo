import type { Metadata } from 'next';
import Link from 'next/link';

import {
    ArrowRight,
    Banknote,
    Building2,
    Calculator,
    CreditCard,
    FileText,
    Landmark,
    PoundSterling,
    Receipt,
    TrendingUp
} from 'lucide-react';

import { calculators } from '@/data/calculators';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Business Funding Calculators | Capiflo',
    description:
        "Free UK business funding calculators: work out loan repayments, borrowing power, invoice finance advances, asset finance, merchant cash advances, VAT loans, commercial mortgages and bridging.",
    keywords: [
        'business funding calculator',
        'business loan calculator uk',
        'invoice finance calculator',
        'asset finance calculator',
        'merchant cash advance calculator uk',
        'commercial mortgage calculator',
        'bridging loan calculator'
    ],
    alternates: { canonical: '/calculators' }
};

const CALCULATOR_ICONS: Record<string, typeof Calculator> = {
    repayment: TrendingUp,
    'loan-range': Banknote,
    invoice: FileText,
    asset: Calculator,
    mca: CreditCard,
    vat: Receipt,
    property: Landmark,
    bridging: Building2
};

const CalculatorsPage = () => {
    return (
        <div className='space-y-20 pb-24 md:space-y-24'>
            {/* Hero */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>Calculators</p>
                        <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                            Plan funding with real numbers before you apply.
                        </h1>
                        <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                            Each calculator mirrors what lenders request during underwriting. Plug in turnover, invoices,
                            card takings or an HMRC bill to uncover borrowing power, repayments and the true cost of finance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator directory */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {calculators.map((calc, index) => {
                        const Icon = CALCULATOR_ICONS[calc.id] || Calculator;
                        return (
                            <Link
                                key={calc.slug}
                                href={`/calculators/${calc.slug}`}
                                className='group flex flex-col rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover'
                                style={{ animationDelay: `${index * 50}ms` }}>
                                <div className='inline-flex w-fit rounded-xl bg-primary/15 p-3'>
                                    <Icon className='h-6 w-6 text-primary' />
                                </div>
                                <h2 className='mt-5 text-xl font-semibold text-foreground'>{calc.shortName}</h2>
                                <p className='mt-2 flex-1 text-sm leading-relaxed text-muted-foreground'>
                                    {calc.description}
                                </p>
                                <span className='mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary'>
                                    Open calculator
                                    <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-3xl font-semibold text-foreground'>Ready for real numbers?</h2>
                        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
                            Share your details and our team will run personalised calculations against 120+ UK lenders. Get
                            actual quotes, not just estimates.
                        </p>
                        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Button size='lg' className='h-12 px-8 text-base shadow-lg shadow-primary/25' asChild>
                                <Link href='/contact'>
                                    Get Real Quotes
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Link>
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/guides'>Read the Funding Guides</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default CalculatorsPage;
