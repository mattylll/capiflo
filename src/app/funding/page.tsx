import type { Metadata } from 'next';
import Image from 'next/image';
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
    Rocket,
    ShieldAlert,
    Sparkles
} from 'lucide-react';

import { fundingSectors } from '@/data/funding';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Funding Routes | Capiflo',
    description:
        'Explore business loans, merchant cash advances, invoice finance, VAT loans, corporation tax loans, asset finance, property-backed funding, recovery support, and growth finance with Capiflo.',
    keywords: [
        'business loans uk',
        'merchant cash advance uk',
        'invoice finance uk',
        'vat loans uk',
        'corporation tax loans uk',
        'asset finance',
        'bridging loans uk',
        'growth finance'
    ]
};

const SECTOR_ICONS: Record<string, typeof Banknote> = {
    'business-loans': Banknote,
    'merchant-cash-advance': CreditCard,
    'invoice-finance': FileText,
    'asset-finance': Calculator,
    'vat-loans': Receipt,
    'corporation-tax-loans': PoundSterling,
    'start-up-loans': Sparkles,
    'property-backed': Building2,
    'recovery': ShieldAlert,
    'growth': Rocket
};

const SECTOR_IMAGES: Record<string, string> = {
    'business-loans': '/images/Coffee Shop Business Loans.jpeg',
    'invoice-finance': '/images/Book Shop Business Loans.jpeg',
    'asset-finance': '/images/Carpentry Business Loans.jpeg',
    'merchant-cash-advance': '/images/Bakery Business Loans.jpeg'
};

const FundingIndexPage = () => {
    const featuredSectors = fundingSectors.slice(0, 4);
    const allSectors = fundingSectors;

    return (
        <div className='space-y-20 md:space-y-24 lg:space-y-32 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Funding routes
                        </p>
                        <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                            Compare every major UK SME finance product.
                        </h1>
                        <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                            Choose a route below to view eligibility, criteria, calculators, example
                            scenarios, and FAQs. Each page links directly to the relevant calculator or
                            60-second intake wizard.
                        </p>
                        <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <Link href='/contact'>Find Your Best Option</Link>
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/calculators'>Try Calculators First</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Sectors Grid */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Popular routes
                        </p>
                        <h2 className='mt-2 text-2xl font-semibold text-foreground'>
                            Most requested funding types
                        </h2>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        {featuredSectors.map((sector, index) => {
                            const Icon = SECTOR_ICONS[sector.slug] || Banknote;
                            const image = SECTOR_IMAGES[sector.slug];
                            return (
                                <Card
                                    key={sector.slug}
                                    className='group overflow-hidden rounded-3xl border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                    style={{ animationDelay: `${index * 100}ms` }}>
                                    <Link href={`/funding/${sector.slug}`} className='flex flex-col'>
                                        {image && (
                                            <div className='relative aspect-[16/9] overflow-hidden'>
                                                <Image
                                                    src={image}
                                                    alt={sector.title}
                                                    fill
                                                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                                                />
                                                <div className='absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent' />
                                                <div className='absolute bottom-4 left-4'>
                                                    <div className='inline-flex rounded-xl bg-primary/90 p-2.5'>
                                                        <Icon className='h-5 w-5 text-primary-foreground' />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className='p-6'>
                                            {!image && (
                                                <div className='mb-4 inline-flex rounded-xl bg-primary/15 p-3'>
                                                    <Icon className='h-6 w-6 text-primary' />
                                                </div>
                                            )}
                                            <h3 className='text-xl font-semibold text-foreground'>
                                                {sector.title}
                                            </h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                {sector.hero}
                                            </p>
                                            <div className='mt-4 flex flex-wrap gap-2'>
                                                {sector.keywords.slice(0, 3).map((keyword) => (
                                                    <span
                                                        key={keyword}
                                                        className='rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground'>
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className='mt-4 flex items-center gap-2 text-sm font-medium text-primary'>
                                                <span>View guide</span>
                                                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* All Funding Routes */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            All options
                        </p>
                        <h2 className='mt-2 text-2xl font-semibold text-foreground'>
                            Complete funding directory
                        </h2>
                    </div>

                    <div className='space-y-4'>
                        {allSectors.map((sector, index) => {
                            const Icon = SECTOR_ICONS[sector.slug] || Banknote;
                            return (
                                <Card
                                    key={sector.slug}
                                    className='group rounded-3xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <Link
                                        href={`/funding/${sector.slug}`}
                                        className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                                        <div className='flex items-start gap-4'>
                                            <div className='inline-flex rounded-xl bg-primary/15 p-3'>
                                                <Icon className='h-5 w-5 text-primary' />
                                            </div>
                                            <div className='flex-1'>
                                                <h3 className='text-lg font-semibold text-foreground'>
                                                    {sector.title}
                                                </h3>
                                                <p className='mt-1 text-sm text-muted-foreground'>
                                                    {sector.hero}
                                                </p>
                                                <div className='mt-3 flex flex-wrap gap-2'>
                                                    {sector.stats.slice(0, 3).map((stat) => (
                                                        <span
                                                            key={stat.label}
                                                            className='rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground'>
                                                            {stat.label}: <span className='font-medium text-foreground'>{stat.value}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm font-medium text-primary md:shrink-0'>
                                            <span>Open guide</span>
                                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                        </div>
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-3xl font-semibold text-foreground'>
                            Not sure which route fits?
                        </h2>
                        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
                            Share your situation and our team will recommend the best options from our
                            network of 120+ UK lenders. No commitment, no hard credit check.
                        </p>
                        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <Link href='/contact'>
                                    Get Matched
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Link>
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/calculators'>Try Calculators</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default FundingIndexPage;
