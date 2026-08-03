import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { guideCategories, guides, guidesByCategory, type GuideCategory } from '@/data/guides';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Business Finance Guides | Capiflo',
    description:
        'Plain-English guides to UK business finance: how to get a business loan, invoice finance, bridging loans, commercial mortgage deposits, working capital and more.',
    keywords: [
        'business finance guides',
        'how to get a business loan',
        'what is invoice finance',
        'what is a bridging loan',
        'working capital finance'
    ],
    alternates: { canonical: '/guides' }
};

const CATEGORY_ORDER: GuideCategory[] = ['getting-funded', 'invoice-finance', 'property-finance', 'cash-flow'];

const GuidesPage = () => {
    return (
        <div className='space-y-20 pb-24 md:space-y-24'>
            {/* Hero */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>
                <div className='mx-auto max-w-6xl'>
                    <div className='max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>Guides</p>
                        <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                            Business finance, explained without the jargon.
                        </h1>
                        <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                            We arrange funding for UK SMEs every day. These guides distil what lenders actually look for, what
                            each product costs, and how to choose between them, so you approach finance with the full picture.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            {CATEGORY_ORDER.map((category) => {
                const items = guidesByCategory(category);
                if (!items.length) return null;
                const meta = guideCategories[category];

                return (
                    <section key={category} className='px-4 lg:px-8'>
                        <div className='mx-auto max-w-6xl'>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{meta.label}</h2>
                                <p className='text-muted-foreground'>{meta.description}</p>
                            </div>
                            <div className='mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                                {items.map((guide) => (
                                    <Link key={guide.slug} href={`/guides/${guide.slug}`} className='group'>
                                        <Card className='flex h-full flex-col rounded-3xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover'>
                                            <h3 className='text-lg font-semibold text-foreground'>{guide.h1}</h3>
                                            <p className='mt-2 flex-1 text-sm leading-relaxed text-muted-foreground'>
                                                {guide.excerpt}
                                            </p>
                                            <span className='mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary'>
                                                Read guide
                                                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                                            </span>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            <p className='sr-only'>{guides.length} business finance guides.</p>
        </div>
    );
};

export default GuidesPage;
