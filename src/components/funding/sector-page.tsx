import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import FundingCalculatorCard, { type CalculatorVariant } from '@/components/funding/calculator-card';
import type { FundingSector } from '@/data/funding';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

type Props = {
    sector: FundingSector;
};

const SectorPage = ({ sector }: Props) => {
    return (
        <div className='space-y-20 md:space-y-24 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16'>
                        <div className='flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                            <div className='flex flex-wrap items-center gap-3'>
                                <Badge variant='outline' className='text-xs uppercase tracking-widest'>
                                    Funding guide
                                </Badge>
                                <span className='text-sm text-muted-foreground'>
                                    Updated for 2025 · UK SMEs
                                </span>
                            </div>
                            <h1 className='mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                                {sector.title}
                            </h1>
                            <p className='mt-4 text-xl text-muted-foreground'>{sector.hero}</p>
                            <p className='mt-4 text-muted-foreground'>{sector.description}</p>
                            <div className='mt-6 flex flex-wrap gap-2'>
                                {sector.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className='rounded-full border border-border px-3 py-1 text-xs text-muted-foreground'>
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                                <Button
                                    size='lg'
                                    className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                    asChild>
                                    <Link href='/contact'>Get Started</Link>
                                </Button>
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <a href={`#calculator`}>Try Calculator</a>
                                </Button>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <Card className='rounded-3xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700'>
                            <h3 className='text-sm font-semibold uppercase tracking-wider text-primary'>
                                Key stats
                            </h3>
                            <div className='mt-6 space-y-4'>
                                {sector.stats.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className='rounded-2xl border border-border/50 bg-muted/30 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                        style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                        <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                            {stat.label}
                                        </p>
                                        <p className='mt-1 text-2xl font-semibold text-foreground'>
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-6 border-t border-border/50 pt-6'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                    Recommended tool
                                </p>
                                <p className='mt-2 font-semibold text-foreground'>{sector.calculator.name}</p>
                                <p className='mt-1 text-sm text-muted-foreground'>
                                    {sector.calculator.description}
                                </p>
                                <Link
                                    href={`/calculators#${sector.calculator.anchor}`}
                                    className='mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'>
                                    Jump to calculator
                                    <ArrowRight className='h-4 w-4' />
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* What It Is / Who It's For */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-6 lg:grid-cols-2'>
                        <Card className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'>
                            <h2 className='text-2xl font-semibold text-foreground'>What is it?</h2>
                            <p className='mt-4 text-muted-foreground'>{sector.whatItIs}</p>
                        </Card>
                        <Card className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 delay-100 duration-500'>
                            <h2 className='text-2xl font-semibold text-foreground'>Who it suits</h2>
                            <ul className='mt-4 space-y-3'>
                                {sector.whoItsFor.map((item) => (
                                    <li key={item} className='flex items-start gap-3'>
                                        <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                        <span className='text-muted-foreground'>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Calculator */}
            <section id='calculator' className='scroll-mt-24 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <FundingCalculatorCard
                        title={sector.calculator.name}
                        description={sector.calculator.description}
                        variant={calculatorVariantForAnchor(sector.calculator.anchor)}
                    />
                </div>
            </section>

            {/* Criteria */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Requirements
                        </p>
                        <h2 className='mt-2 text-2xl font-semibold text-foreground'>Typical criteria</h2>
                    </div>
                    <Card className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'>
                        <ul className='grid gap-4 md:grid-cols-2'>
                            {sector.criteria.map((item, index) => (
                                <li
                                    key={item}
                                    className='flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                    <span className='text-muted-foreground'>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </section>

            {/* Use Cases */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Applications
                        </p>
                        <h2 className='mt-2 text-2xl font-semibold text-foreground'>Use cases</h2>
                    </div>
                    <div className='grid gap-4 md:grid-cols-3'>
                        {sector.useCases.map((item, index) => (
                            <Card
                                key={item}
                                className='rounded-3xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <p className='text-foreground'>{item}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Questions
                        </p>
                        <h2 className='mt-2 text-2xl font-semibold text-foreground'>
                            Frequently asked questions
                        </h2>
                    </div>
                    <div className='space-y-4'>
                        {sector.faqs.map((faq, index) => (
                            <Card
                                key={faq.question}
                                className='rounded-3xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <h3 className='text-lg font-semibold text-foreground'>{faq.question}</h3>
                                <p className='mt-3 text-muted-foreground'>{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                            <div>
                                <h2 className='text-3xl font-semibold text-foreground'>
                                    Talk to a specialist
                                </h2>
                                <p className='mt-4 text-muted-foreground'>
                                    We benchmark lenders daily so you can compare options without repeating
                                    yourself. Get matched with the right {sector.title.toLowerCase()} providers
                                    for your business.
                                </p>
                                <ul className='mt-6 space-y-2 text-sm text-muted-foreground'>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='h-4 w-4 text-primary' />
                                        Dedicated UK broker network and lender partners
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='h-4 w-4 text-primary' />
                                        Structured data capture for higher approval odds
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='h-4 w-4 text-primary' />
                                        CRM-ready summaries for your team
                                    </li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-4 sm:flex-row lg:justify-end'>
                                <Button
                                    size='lg'
                                    className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                    asChild>
                                    <Link href='/contact'>
                                        Send My Application
                                        <ArrowRight className='ml-2 h-5 w-5' />
                                    </Link>
                                </Button>
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <Link href='/calculators'>Explore Calculators</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default SectorPage;

const calculatorVariantForAnchor = (anchor: string): CalculatorVariant => {
    switch (anchor) {
        case 'invoice':
            return 'invoice';
        case 'mca':
            return 'mca';
        case 'asset':
            return 'asset';
        case 'vat':
            return 'vat';
        case 'corp-tax':
            return 'corp';
        case 'property':
            return 'property';
        default:
            return 'loan';
    }
};
