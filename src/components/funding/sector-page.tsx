import Link from 'next/link';

import { RichText } from '@/components/content/rich-text';
import FundingCalculatorCard, { type CalculatorVariant } from '@/components/funding/calculator-card';
import type { FundingSector } from '@/data/funding';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

import { ArrowRight, CheckCircle2 } from 'lucide-react';

type Props = {
    sector: FundingSector;
};

const SectorPage = ({ sector }: Props) => {
    return (
        <div className='space-y-20 pb-24 md:space-y-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='from-primary/30 via-primary/20 absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16'>
                        <div className='animate-in fade-in slide-in-from-bottom-6 flex flex-col justify-center duration-700'>
                            <div className='flex flex-wrap items-center gap-3'>
                                <Badge variant='outline' className='text-xs tracking-widest uppercase'>
                                    Funding guide
                                </Badge>
                                <span className='text-muted-foreground text-sm'>Updated for 2025 · UK SMEs</span>
                            </div>
                            <h1 className='text-foreground mt-6 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl'>
                                {sector.title}
                            </h1>
                            <p className='text-muted-foreground mt-4 text-xl'>{sector.hero}</p>
                            <p className='text-muted-foreground mt-4'>{sector.description}</p>
                            <div className='mt-6 flex flex-wrap gap-2'>
                                {sector.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className='border-border text-muted-foreground rounded-full border px-3 py-1 text-xs'>
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                                <Button
                                    size='lg'
                                    className='shadow-primary/25 hover:shadow-primary/30 h-12 px-8 text-base shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl'
                                    asChild>
                                    <Link href='/contact'>Get Started</Link>
                                </Button>
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <a href={`#calculator`}>Try Calculator</a>
                                </Button>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <Card className='border-border/50 animate-in fade-in slide-in-from-bottom-8 rounded-3xl p-6 delay-150 duration-700'>
                            <h3 className='text-primary text-sm font-semibold tracking-wider uppercase'>Key stats</h3>
                            <div className='mt-6 space-y-4'>
                                {sector.stats.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className='border-border/50 bg-muted/30 animate-in fade-in slide-in-from-bottom-4 rounded-2xl border p-4 duration-500'
                                        style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                        <p className='text-muted-foreground text-xs tracking-widest uppercase'>
                                            {stat.label}
                                        </p>
                                        <p className='text-foreground mt-1 text-2xl font-semibold'>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='border-border/50 mt-6 border-t pt-6'>
                                <p className='text-muted-foreground text-xs tracking-widest uppercase'>
                                    Recommended tool
                                </p>
                                <p className='text-foreground mt-2 font-semibold'>{sector.calculator.name}</p>
                                <p className='text-muted-foreground mt-1 text-sm'>{sector.calculator.description}</p>
                                <Link
                                    href={`/calculators#${sector.calculator.anchor}`}
                                    className='text-primary mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline'>
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
                        <Card className='border-border/50 animate-in fade-in slide-in-from-bottom-6 rounded-3xl p-8 duration-500'>
                            <h2 className='text-foreground text-2xl font-semibold'>What is it?</h2>
                            <p className='text-muted-foreground mt-4'>
                                <RichText text={sector.whatItIs} />
                            </p>
                        </Card>
                        <Card className='border-border/50 animate-in fade-in slide-in-from-bottom-6 rounded-3xl p-8 delay-100 duration-500'>
                            <h2 className='text-foreground text-2xl font-semibold'>Who it suits</h2>
                            <ul className='mt-4 space-y-3'>
                                {sector.whoItsFor.map((item) => (
                                    <li key={item} className='flex items-start gap-3'>
                                        <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
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
                    <div className='animate-in fade-in slide-in-from-bottom-6 mb-8 duration-700'>
                        <p className='text-primary text-sm font-medium tracking-widest uppercase'>Requirements</p>
                        <h2 className='text-foreground mt-2 text-2xl font-semibold'>Typical criteria</h2>
                    </div>
                    <Card className='border-border/50 animate-in fade-in slide-in-from-bottom-6 rounded-3xl p-8 duration-500'>
                        <ul className='grid gap-4 md:grid-cols-2'>
                            {sector.criteria.map((item, index) => (
                                <li
                                    key={item}
                                    className='animate-in fade-in slide-in-from-bottom-4 flex items-start gap-3 duration-500'
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
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
                    <div className='animate-in fade-in slide-in-from-bottom-6 mb-8 duration-700'>
                        <p className='text-primary text-sm font-medium tracking-widest uppercase'>Applications</p>
                        <h2 className='text-foreground mt-2 text-2xl font-semibold'>Use cases</h2>
                    </div>
                    <div className='grid gap-4 md:grid-cols-3'>
                        {sector.useCases.map((item, index) => (
                            <Card
                                key={item}
                                className='border-border/50 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 rounded-3xl p-6 transition-all duration-300 duration-500 hover:-translate-y-1'
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
                    <div className='animate-in fade-in slide-in-from-bottom-6 mb-8 duration-700'>
                        <p className='text-primary text-sm font-medium tracking-widest uppercase'>Questions</p>
                        <h2 className='text-foreground mt-2 text-2xl font-semibold'>Frequently asked questions</h2>
                    </div>
                    <div className='space-y-4'>
                        {sector.faqs.map((faq, index) => (
                            <Card
                                key={faq.question}
                                className='border-border/50 animate-in fade-in slide-in-from-bottom-6 rounded-3xl p-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <h3 className='text-foreground text-lg font-semibold'>{faq.question}</h3>
                                <p className='text-muted-foreground mt-3'>{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='border-primary/20 from-primary/10 via-primary/5 animate-in fade-in slide-in-from-bottom-6 rounded-3xl bg-gradient-to-br to-transparent p-8 duration-700 md:p-12'>
                        <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                            <div>
                                <h2 className='text-foreground text-3xl font-semibold'>Talk to a specialist</h2>
                                <p className='text-muted-foreground mt-4'>
                                    We benchmark lenders daily so you can compare options without repeating yourself.
                                    Get matched with the right {sector.title.toLowerCase()} providers for your business.
                                </p>
                                <ul className='text-muted-foreground mt-6 space-y-2 text-sm'>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='text-primary h-4 w-4' />
                                        Dedicated UK broker network and lender partners
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='text-primary h-4 w-4' />
                                        Structured data capture for higher approval odds
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='text-primary h-4 w-4' />
                                        CRM-ready summaries for your team
                                    </li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-4 sm:flex-row lg:justify-end'>
                                <Button
                                    size='lg'
                                    className='shadow-primary/25 hover:shadow-primary/30 h-12 px-8 text-base shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl'
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
