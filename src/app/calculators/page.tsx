import type { Metadata } from 'next';
import Link from 'next/link';

import {
    ArrowRight,
    Banknote,
    Building2,
    Calculator,
    CreditCard,
    FileText,
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
        "Use Capiflo's UK business funding calculators to benchmark borrowing capacity, repayments, invoice finance advances, asset finance costs, merchant cash advances, and tax funding.",
    keywords: [
        'business funding calculator',
        'business loan calculator uk',
        'invoice finance calculator',
        'asset finance calculator',
        'merchant cash advance calculator uk',
        'vat loan calculator'
    ]
};

const CALCULATOR_ICONS: Record<string, typeof Calculator> = {
    'loan-range': Banknote,
    'repayment': TrendingUp,
    'invoice': FileText,
    'asset': Calculator,
    'mca': CreditCard,
    'vat': Receipt,
    'corp-tax': PoundSterling,
    'property': Building2
};

const CalculatorsPage = () => {
    return (
        <div className='space-y-20 md:space-y-24 lg:space-y-32 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-12 lg:grid-cols-2 lg:gap-16'>
                        <div className='flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                            <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                Calculators
                            </p>
                            <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                                Plan funding with real numbers before you apply.
                            </h1>
                            <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                                Each calculator mirrors what lenders request during underwriting. Plug in
                                turnover, revenue, invoices, or HMRC bills to uncover borrowing power,
                                repayments, and cash impact.
                            </p>
                            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                                <Button
                                    size='lg'
                                    className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                    asChild>
                                    <a href='#loan-range'>Start with Borrowing Power</a>
                                </Button>
                            </div>
                        </div>

                        {/* Quick links */}
                        <div className='grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700'>
                            {calculators.slice(0, 6).map((calc, index) => {
                                const Icon = CALCULATOR_ICONS[calc.id] || Calculator;
                                return (
                                    <a
                                        key={calc.id}
                                        href={`#${calc.id}`}
                                        className='group rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover'
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className='mb-2 inline-flex rounded-xl bg-primary/15 p-2.5'>
                                            <Icon className='h-5 w-5 text-primary' />
                                        </div>
                                        <p className='text-sm font-semibold text-foreground'>
                                            {calc.title.replace(' calculator', '').replace(' UK', '')}
                                        </p>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculators List */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl space-y-12'>
                    {calculators.map((calculator, index) => {
                        const Icon = CALCULATOR_ICONS[calculator.id] || Calculator;
                        return (
                            <Card
                                key={calculator.id}
                                id={calculator.id}
                                className='scroll-mt-24 overflow-hidden rounded-3xl border-border/50 animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 50}ms` }}>
                                <div className='grid lg:grid-cols-[1fr_1.2fr]'>
                                    {/* Left: Info */}
                                    <div className='border-b border-border/50 p-8 lg:border-b-0 lg:border-r'>
                                        <div className='flex flex-wrap items-center gap-3'>
                                            <div className='inline-flex rounded-xl bg-primary/15 p-3'>
                                                <Icon className='h-6 w-6 text-primary' />
                                            </div>
                                            <div className='flex flex-wrap gap-2'>
                                                {calculator.keywords.slice(0, 2).map((keyword) => (
                                                    <span
                                                        key={keyword}
                                                        className='rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground'>
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <h2 className='mt-6 text-2xl font-semibold text-foreground'>
                                            {calculator.title}
                                        </h2>
                                        <p className='mt-4 text-muted-foreground'>{calculator.description}</p>
                                        <p className='mt-6 text-sm font-medium text-primary'>{calculator.cta}</p>
                                    </div>

                                    {/* Right: Inputs/Outputs */}
                                    <div className='bg-muted/30 p-8'>
                                        <div className='grid gap-8 sm:grid-cols-2'>
                                            <div>
                                                <h3 className='text-sm font-semibold uppercase tracking-wider text-foreground'>
                                                    Inputs
                                                </h3>
                                                <ul className='mt-4 space-y-2'>
                                                    {calculator.inputs.map((input) => (
                                                        <li
                                                            key={input}
                                                            className='flex items-start gap-2 text-sm text-muted-foreground'>
                                                            <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50' />
                                                            {input}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className='text-sm font-semibold uppercase tracking-wider text-foreground'>
                                                    Outputs
                                                </h3>
                                                <ul className='mt-4 space-y-2'>
                                                    {calculator.outputs.map((output) => (
                                                        <li
                                                            key={output}
                                                            className='flex items-start gap-2 text-sm text-muted-foreground'>
                                                            <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
                                                            {output}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='mt-8'>
                                            <Button className='w-full sm:w-auto' asChild>
                                                <Link href='/contact'>
                                                    Get Personalized Results
                                                    <ArrowRight className='ml-2 h-4 w-4' />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-3xl font-semibold text-foreground'>
                            Ready for real numbers?
                        </h2>
                        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
                            Share your details and our team will run personalised calculations against
                            120+ UK lenders. Get actual quotes, not just estimates.
                        </p>
                        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <Link href='/contact'>
                                    Get Real Quotes
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Link>
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/funding'>Explore Funding Options</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default CalculatorsPage;
