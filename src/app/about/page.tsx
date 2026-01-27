import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'About Capiflo | UK Business Finance',
    description:
        'Capiflo is a UK SME finance platform helping founders compare business loans, invoice finance, and property-backed facilities with transparent calculators and routing notes.',
    keywords: ['uk business finance', 'commercial finance brokers uk', 'SME business funding UK']
};

const TIMELINE = [
    {
        year: '2023',
        title: 'Research',
        summary: 'Interviewed 150 UK SMEs about funding friction and slow lender responses.'
    },
    {
        year: '2024',
        title: 'MVP release',
        summary: 'Launched calculator suite and broker-led routing for national partners.'
    },
    {
        year: '2025',
        title: 'Intelligence layer',
        summary: 'Added AI summarisation, CRM-ready payloads, and knowledge centre expansions.'
    }
];

const VALUES = [
    {
        icon: Zap,
        title: 'Speed without shortcuts',
        description: 'We move fast but never skip proper due diligence or lender matching.'
    },
    {
        icon: Users,
        title: 'Human-first support',
        description: 'Real UK-based specialists guide you through every stage of funding.'
    },
    {
        icon: TrendingUp,
        title: 'Data-led decisions',
        description: 'Our tools benchmark your business against lender criteria before you apply.'
    }
];

const STATS = [
    { value: '120+', label: 'Active lender relationships' },
    { value: '95%', label: 'Submissions with full docs' },
    { value: '5,000+', label: 'UK SMEs funded' },
    { value: '24hrs', label: 'Typical decision time' }
];

const AboutPage = () => {
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
                                About Capiflo
                            </p>
                            <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                                Commercial finance without the guesswork.
                            </h1>
                            <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                                We are a distributed UK team of finance brokers, data analysts, and product
                                builders. Our mission is to make it simple for SMEs to compare business loans,
                                invoice finance, asset finance, and property-backed facilities in one place.
                            </p>
                            <p className='mt-4 text-muted-foreground'>
                                No jargon, no hidden fees, just a structured experience built for busy founders.
                            </p>
                        </div>

                        <div className='relative animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700'>
                            <div className='relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-elevated'>
                                <div className='relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10'>
                                    <Image
                                        src='/images/Coffee Shop Business Loans.jpeg'
                                        alt='Small business owner'
                                        fill
                                        className='object-cover'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                        {STATS.map((stat, index) => (
                            <Card
                                key={stat.label}
                                className='rounded-3xl border-border/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <p className='text-4xl font-semibold text-primary'>{stat.value}</p>
                                <p className='mt-2 text-sm text-muted-foreground'>{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Work Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            How we work
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            A structured approach to funding.
                        </h2>
                        <p className='mt-4 text-lg text-muted-foreground'>
                            We combine technology with human expertise to get you the best possible outcome.
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        <Card className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'>
                            <h3 className='text-2xl font-semibold text-foreground'>Our process</h3>
                            <ul className='mt-6 space-y-4'>
                                {[
                                    'Map your funding requirement to a calculator + short intake form.',
                                    'Score the opportunity using lender-grade criteria and keyword-rich guidance.',
                                    'Package to lending partners using CRM webhooks and shared dashboards.'
                                ].map((item, index) => (
                                    <li key={index} className='flex items-start gap-3'>
                                        <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                        <span className='text-muted-foreground'>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 delay-100 duration-500'>
                            <h3 className='text-2xl font-semibold text-foreground'>What we cover</h3>
                            <ul className='mt-6 space-y-4'>
                                {[
                                    'Business loans UK (unsecured, secured, growth, working capital)',
                                    'Invoice finance, discounting, factoring, and invoice finance calculators',
                                    'Asset finance, VAT loans, corporation tax loans, bridging + development finance'
                                ].map((item, index) => (
                                    <li key={index} className='flex items-start gap-3'>
                                        <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                        <span className='text-muted-foreground'>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Our values
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            Built on trust, powered by data.
                        </h2>
                    </div>

                    <div className='grid gap-6 md:grid-cols-3'>
                        {VALUES.map((value, index) => (
                            <Card
                                key={value.title}
                                className='rounded-3xl border-border/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <div className='mb-4 inline-flex rounded-xl bg-primary/15 p-3'>
                                    <value.icon className='h-6 w-6 text-primary' />
                                </div>
                                <h3 className='text-xl font-semibold text-foreground'>{value.title}</h3>
                                <p className='mt-3 text-muted-foreground'>{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Our journey
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            Building the future of SME finance.
                        </h2>
                    </div>

                    <div className='grid gap-6 md:grid-cols-3'>
                        {TIMELINE.map((item, index) => (
                            <Card
                                key={item.year}
                                className='group relative rounded-3xl border-border/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <span className='absolute right-6 top-6 text-5xl font-bold text-muted/30'>
                                    {item.year}
                                </span>
                                <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                    {item.year}
                                </p>
                                <h3 className='mt-4 text-xl font-semibold text-foreground'>{item.title}</h3>
                                <p className='mt-3 text-muted-foreground'>{item.summary}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='overflow-hidden rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                            <div>
                                <h2 className='text-3xl font-semibold text-foreground sm:text-4xl'>
                                    Ready to find your funding route?
                                </h2>
                                <p className='mt-4 text-lg text-muted-foreground'>
                                    Join thousands of UK SMEs who found clarity with Capiflo. Get matched with
                                    the right lenders in minutes, not weeks.
                                </p>
                                <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                                    <Button
                                        size='lg'
                                        className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                        asChild>
                                        <Link href='/contact'>
                                            Get Started
                                            <ArrowRight className='ml-2 h-5 w-5' />
                                        </Link>
                                    </Button>
                                    <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                        <Link href='/calculators'>Explore Calculators</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className='relative hidden lg:block'>
                                <div className='relative overflow-hidden rounded-2xl'>
                                    <Image
                                        src='/images/IT Support Business Loans.jpeg'
                                        alt='Business team'
                                        width={500}
                                        height={350}
                                        className='rounded-2xl object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
