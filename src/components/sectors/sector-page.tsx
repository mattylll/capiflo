import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import { RichText } from '@/components/content/rich-text';
import { BreadcrumbJsonLd, FAQJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';
import type { BusinessSector } from '@/data/sectors';
import { sectorMap } from '@/data/sectors';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

import {
    AlertTriangle,
    ArrowRight,
    BadgeCheck,
    BookOpen,
    CheckCircle2,
    Clock,
    FileText,
    HelpCircle,
    Lightbulb,
    PoundSterling,
    Shield,
    Star,
    TrendingUp,
    Users
} from 'lucide-react';

type Props = {
    sector: BusinessSector;
};

function formatDate(dateString?: string): string {
    if (!dateString) return 'January 2025';
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

// Helper to check if useCase is detailed object or simple string
function isDetailedUseCase(
    useCase: string | { title: string; description: string; outcome?: string }
): useCase is { title: string; description: string; outcome?: string } {
    return typeof useCase === 'object' && 'title' in useCase;
}

// FinancialProduct Schema Component
function FinancialProductJsonLd({ sector }: { sector: BusinessSector }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: sector.title,
        description: sector.description,
        provider: {
            '@type': 'FinancialService',
            name: 'Capiflo',
            url: 'https://capiflo.co.uk',
            areaServed: {
                '@type': 'Country',
                name: 'United Kingdom'
            }
        },
        category: 'Business Finance',
        url: `https://capiflo.co.uk/sectors/${sector.slug}`,
        ...(sector.trustSignals?.averageRating && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: sector.trustSignals.averageRating,
                reviewCount: sector.trustSignals.totalReviews || 50,
                bestRating: 5,
                worstRating: 1
            }
        })
    };

    return (
        <Script
            id='financial-product-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

const SectorPage = ({ sector }: Props) => {
    // Get related sectors for internal linking
    const relatedSectorData = (sector.relatedSectors || [])
        .map((slug) => sectorMap.get(slug))
        .filter(Boolean) as BusinessSector[];

    // Check if we have enhanced content
    const hasEnhancedContent = Boolean(sector.overviewExtended || sector.eligibility || sector.applicationProcess);

    return (
        <div className='pb-24'>
            {/* JSON-LD Structured Data */}
            <FAQJsonLd faqs={sector.faqs} />
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', href: '/' },
                    { name: 'Sectors', href: '/sectors' },
                    { name: sector.title, href: `/sectors/${sector.slug}` }
                ]}
            />
            <ServiceJsonLd name={sector.title} description={sector.description} url={`/sectors/${sector.slug}`} />
            <FinancialProductJsonLd sector={sector} />

            {/* Hero Section with H1 */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='from-primary/30 via-primary/20 absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16'>
                        <div className='flex flex-col justify-center'>
                            {/* Trust badges */}
                            <div className='flex flex-wrap items-center gap-3'>
                                <Badge variant='secondary' className='text-xs'>
                                    <Shield className='mr-1 h-3 w-3' />
                                    Not FCA Regulated
                                </Badge>
                                {sector.trustSignals?.accreditations?.map((acc) => (
                                    <Badge key={acc} variant='outline' className='text-xs'>
                                        {acc}
                                    </Badge>
                                ))}
                                <span className='text-muted-foreground text-sm'>
                                    Last reviewed: {formatDate(sector.lastReviewed)}
                                </span>
                            </div>

                            {/* H1 - Main Page Title */}
                            <h1 className='text-foreground mt-6 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
                                {sector.title}
                            </h1>
                            <p className='text-muted-foreground mt-4 text-xl lg:text-2xl'>{sector.hero}</p>

                            {/* Trust indicators */}
                            {sector.trustSignals?.averageRating && (
                                <div className='mt-4 flex items-center gap-2'>
                                    <div className='flex'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(sector.trustSignals!.averageRating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className='text-sm font-medium'>{sector.trustSignals.averageRating}/5</span>
                                    <span className='text-muted-foreground text-sm'>
                                        ({sector.trustSignals.totalReviews}+ reviews)
                                    </span>
                                </div>
                            )}

                            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                                <Button
                                    size='lg'
                                    className='shadow-primary/25 hover:shadow-primary/30 h-12 px-8 text-base shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl'
                                    asChild>
                                    <Link href='/contact'>Get Funding Options</Link>
                                </Button>
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <a href='#compare-funding'>Compare Funding Types</a>
                                </Button>
                            </div>
                        </div>

                        {/* Key Statistics Card */}
                        <Card className='border-border/50 rounded-3xl p-6'>
                            <h2 className='text-primary text-sm font-semibold tracking-wider uppercase'>
                                Key Statistics for UK {sector.title.replace(' Finance', '').replace(' Business', '')}{' '}
                                SMEs
                            </h2>
                            <div className='mt-6 space-y-4'>
                                {sector.stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className='border-border/50 bg-muted/30 rounded-2xl border p-4'>
                                        <p className='text-muted-foreground text-xs tracking-widest uppercase'>
                                            {stat.label}
                                        </p>
                                        <p className='text-foreground mt-1 text-2xl font-semibold'>{stat.value}</p>
                                        {stat.source && (
                                            <p className='text-muted-foreground/70 mt-1 text-xs'>
                                                Source: {stat.source}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Hero Image */}
            {sector.image && (
                <section className='mt-16 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <div className='relative h-[300px] w-full overflow-hidden rounded-3xl md:h-[400px]'>
                            <Image
                                src={sector.image}
                                alt={sector.imageAlt || `${sector.title} - UK business funding solutions from Capiflo`}
                                fill
                                className='object-cover'
                                priority
                            />
                            <div className='from-background/80 via-background/20 absolute inset-0 bg-gradient-to-t to-transparent' />
                        </div>
                    </div>
                </section>
            )}

            {/* Overview Section */}
            <section className='mt-20 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8'>
                        <h2 className='text-foreground text-3xl font-semibold'>
                            Understanding {sector.title.replace(' Finance', '')} Funding
                        </h2>
                    </div>
                    <div className='prose prose-lg text-muted-foreground max-w-none'>
                        <p className='text-lg leading-relaxed'>
                            <RichText text={sector.overview} />
                        </p>
                        {sector.overviewExtended?.map((paragraph, index) => (
                            <p key={index} className='mt-4 text-base leading-relaxed'>
                                <RichText text={paragraph} />
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges & Solutions */}
            <section className='mt-20 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-6 lg:grid-cols-2'>
                        {/* Challenges */}
                        <Card className='border-border/50 rounded-3xl p-8'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-destructive/15 inline-flex rounded-xl p-3'>
                                    <AlertTriangle className='text-destructive h-6 w-6' />
                                </div>
                                <h2 className='text-foreground text-2xl font-semibold'>Common Cash Flow Challenges</h2>
                            </div>
                            <ul className='mt-6 space-y-3'>
                                {sector.challenges.map((challenge) => (
                                    <li key={challenge} className='flex items-start gap-3'>
                                        <span className='bg-destructive/50 mt-2 h-1.5 w-1.5 shrink-0 rounded-full' />
                                        <span className='text-muted-foreground'>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Solutions */}
                        <Card className='border-border/50 rounded-3xl p-8'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-primary/15 inline-flex rounded-xl p-3'>
                                    <Lightbulb className='text-primary h-6 w-6' />
                                </div>
                                <h2 className='text-foreground text-2xl font-semibold'>Finance Solutions Available</h2>
                            </div>
                            <ul className='mt-6 space-y-3'>
                                {sector.solutions.map((solution) => (
                                    <li key={solution} className='flex items-start gap-3'>
                                        <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
                                        <span className='text-muted-foreground'>{solution}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Funding Types Comparison Table */}
            <section id='compare-funding' className='mt-20 scroll-mt-24 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8'>
                        <h2 className='text-foreground text-3xl font-semibold'>
                            Compare {sector.title.split(' ')[0]} Funding Options
                        </h2>
                        <p className='text-muted-foreground mt-2'>
                            Side-by-side comparison of finance products suitable for{' '}
                            {sector.title.toLowerCase().replace(' finance', '')} businesses
                        </p>
                    </div>

                    {/* Comparison Table - Desktop */}
                    <div className='hidden lg:block'>
                        <Card className='border-border/50 overflow-hidden rounded-2xl'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-border/50 bg-muted/30 border-b'>
                                        <th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
                                            Funding Type
                                        </th>
                                        <th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
                                            Typical Amount
                                        </th>
                                        <th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
                                            Indicative Rate
                                        </th>
                                        <th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
                                            Speed
                                        </th>
                                        <th className='text-foreground px-6 py-4 text-left text-sm font-semibold'>
                                            Best For
                                        </th>
                                        <th className='text-foreground px-6 py-4 text-right text-sm font-semibold'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sector.fundingTypes.map((fundingType, index) => (
                                        <tr
                                            key={fundingType.slug}
                                            className={`border-border/30 border-b ${index % 2 === 0 ? '' : 'bg-muted/10'}`}>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='bg-primary/15 rounded-lg p-2'>
                                                        <TrendingUp className='text-primary h-4 w-4' />
                                                    </div>
                                                    <div>
                                                        <p className='text-foreground font-semibold'>
                                                            {fundingType.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-muted-foreground px-6 py-4 text-sm'>
                                                {fundingType.typicalAmount || '£10k - £500k'}
                                            </td>
                                            <td className='text-muted-foreground px-6 py-4 text-sm'>
                                                {fundingType.indicativeRate || 'Variable'}
                                            </td>
                                            <td className='text-muted-foreground px-6 py-4 text-sm'>
                                                <div className='flex items-center gap-1'>
                                                    <Clock className='h-4 w-4' />
                                                    {fundingType.speed || '24-72 hrs'}
                                                </div>
                                            </td>
                                            <td className='text-muted-foreground max-w-[200px] px-6 py-4 text-sm'>
                                                {fundingType.benefit || 'Working capital and growth'}
                                            </td>
                                            <td className='px-6 py-4 text-right'>
                                                <Button variant='outline' size='sm' asChild>
                                                    <Link href={`/funding/${fundingType.slug}`}>
                                                        Learn more
                                                        <ArrowRight className='ml-1 h-3 w-3' />
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>

                    {/* Mobile Cards */}
                    <div className='grid gap-4 lg:hidden'>
                        {sector.fundingTypes.map((fundingType) => (
                            <Card key={fundingType.slug} className='border-border/50 rounded-2xl p-6'>
                                <div className='mb-4 flex items-center gap-3'>
                                    <div className='bg-primary/15 rounded-lg p-2'>
                                        <TrendingUp className='text-primary h-5 w-5' />
                                    </div>
                                    <h3 className='text-foreground font-semibold'>{fundingType.name}</h3>
                                </div>
                                <div className='space-y-2 text-sm'>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>Amount:</span>
                                        <span className='font-medium'>
                                            {fundingType.typicalAmount || '£10k - £500k'}
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>Rate:</span>
                                        <span className='font-medium'>{fundingType.indicativeRate || 'Variable'}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>Speed:</span>
                                        <span className='font-medium'>{fundingType.speed || '24-72 hrs'}</span>
                                    </div>
                                </div>
                                <p className='text-muted-foreground mt-4 text-sm'>{fundingType.benefit}</p>
                                <Button variant='outline' size='sm' className='mt-4 w-full' asChild>
                                    <Link href={`/funding/${fundingType.slug}`}>
                                        View {fundingType.name} details
                                        <ArrowRight className='ml-1 h-3 w-3' />
                                    </Link>
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Funding Type Descriptions */}
            {sector.fundingTypes.some((ft) => ft.description) && (
                <section className='mt-20 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <div className='mb-8'>
                            <h2 className='text-foreground text-3xl font-semibold'>
                                {sector.title.split(' ')[0]} Finance Options Explained
                            </h2>
                        </div>
                        <div className='space-y-8'>
                            {sector.fundingTypes
                                .filter((ft) => ft.description)
                                .map((fundingType) => (
                                    <Card key={fundingType.slug} className='border-border/50 rounded-2xl p-6 lg:p-8'>
                                        <h3 className='text-foreground text-xl font-semibold'>
                                            {fundingType.name} for {sector.title.split(' ')[0]} Businesses
                                        </h3>
                                        <p className='text-muted-foreground mt-4 leading-relaxed'>
                                            {fundingType.description}
                                        </p>
                                        <div className='mt-6 flex flex-wrap gap-4'>
                                            <div className='flex items-center gap-2 text-sm'>
                                                <PoundSterling className='text-primary h-4 w-4' />
                                                <span className='text-muted-foreground'>
                                                    {fundingType.typicalAmount || '£10k+'}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2 text-sm'>
                                                <Clock className='text-primary h-4 w-4' />
                                                <span className='text-muted-foreground'>
                                                    {fundingType.speed || '24-72 hours'}
                                                </span>
                                            </div>
                                        </div>
                                        <Button className='mt-6' asChild>
                                            <Link href={`/funding/${fundingType.slug}`}>
                                                Explore {fundingType.name}
                                                <ArrowRight className='ml-2 h-4 w-4' />
                                            </Link>
                                        </Button>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Eligibility Section */}
            {sector.eligibility && (
                <section className='mt-20 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <Card className='border-border/50 rounded-3xl p-8'>
                            <div className='mb-6 flex items-center gap-3'>
                                <div className='bg-primary/15 inline-flex rounded-xl p-3'>
                                    <FileText className='text-primary h-6 w-6' />
                                </div>
                                <h2 className='text-foreground text-2xl font-semibold'>Eligibility Criteria</h2>
                            </div>
                            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                {sector.eligibility.minTurnover && (
                                    <div className='bg-muted/30 rounded-xl p-4'>
                                        <p className='text-muted-foreground text-xs tracking-wider uppercase'>
                                            Minimum Turnover
                                        </p>
                                        <p className='text-foreground mt-1 font-medium'>
                                            {sector.eligibility.minTurnover}
                                        </p>
                                    </div>
                                )}
                                {sector.eligibility.minTradingHistory && (
                                    <div className='bg-muted/30 rounded-xl p-4'>
                                        <p className='text-muted-foreground text-xs tracking-wider uppercase'>
                                            Trading History
                                        </p>
                                        <p className='text-foreground mt-1 font-medium'>
                                            {sector.eligibility.minTradingHistory}
                                        </p>
                                    </div>
                                )}
                                {sector.eligibility.creditRequirements && (
                                    <div className='bg-muted/30 rounded-xl p-4'>
                                        <p className='text-muted-foreground text-xs tracking-wider uppercase'>
                                            Credit Requirements
                                        </p>
                                        <p className='text-foreground mt-1 font-medium'>
                                            {sector.eligibility.creditRequirements}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {sector.eligibility.otherRequirements &&
                                sector.eligibility.otherRequirements.length > 0 && (
                                    <div className='mt-6'>
                                        <p className='text-foreground mb-3 font-medium'>Other Requirements:</p>
                                        <ul className='grid gap-2 md:grid-cols-2'>
                                            {sector.eligibility.otherRequirements.map((req) => (
                                                <li
                                                    key={req}
                                                    className='text-muted-foreground flex items-start gap-2 text-sm'>
                                                    <CheckCircle2 className='text-primary mt-0.5 h-4 w-4 shrink-0' />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        </Card>
                    </div>
                </section>
            )}

            {/* Application Process */}
            {sector.applicationProcess && sector.applicationProcess.length > 0 && (
                <section className='mt-20 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <div className='mb-8'>
                            <h2 className='text-foreground text-3xl font-semibold'>
                                How to Apply for {sector.title.split(' ')[0]} Finance
                            </h2>
                            <p className='text-muted-foreground mt-2'>Simple four-step process to access funding</p>
                        </div>
                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                            {sector.applicationProcess.map((step) => (
                                <Card key={step.step} className='border-border/50 relative rounded-2xl p-6'>
                                    <div className='bg-primary text-primary-foreground absolute -top-3 left-6 rounded-full px-3 py-1 text-sm font-semibold'>
                                        Step {step.step}
                                    </div>
                                    <h3 className='text-foreground mt-4 text-lg font-semibold'>{step.title}</h3>
                                    <p className='text-muted-foreground mt-2 text-sm'>{step.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Use Cases / Case Studies */}
            <section className='mt-20 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8'>
                        <h2 className='text-foreground text-3xl font-semibold'>Illustrative Use Cases</h2>
                        <p className='text-muted-foreground mt-2'>
                            Example scenarios showing how {sector.title.toLowerCase().replace(' finance', '')}{' '}
                            businesses use funding. Illustrative, not completed transactions.
                        </p>
                    </div>
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {sector.useCases.map((useCase, index) => (
                            <Card
                                key={index}
                                className='border-border/50 hover:shadow-card-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1'>
                                {isDetailedUseCase(useCase) ? (
                                    <div>
                                        <h3 className='text-foreground font-semibold'>{useCase.title}</h3>
                                        <p className='text-muted-foreground mt-3 text-sm'>{useCase.description}</p>
                                        {useCase.outcome && (
                                            <div className='bg-primary/10 mt-4 rounded-lg p-3'>
                                                <p className='text-primary text-xs font-medium tracking-wider uppercase'>
                                                    Illustrative outcome
                                                </p>
                                                <p className='text-foreground mt-1 text-sm'>{useCase.outcome}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='flex items-start gap-3'>
                                        <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
                                        <p className='text-foreground'>{useCase}</p>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className='mt-20 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-8'>
                        <h2 className='text-foreground text-3xl font-semibold'>Frequently Asked Questions</h2>
                        <p className='text-muted-foreground mt-2'>
                            Common questions about {sector.title.toLowerCase()}
                        </p>
                    </div>
                    <div className='space-y-4'>
                        {sector.faqs.map((faq, index) => (
                            <Card key={faq.question} className='border-border/50 rounded-2xl p-6'>
                                <div className='flex items-start gap-3'>
                                    <div className='bg-primary/15 inline-flex shrink-0 rounded-xl p-2'>
                                        <HelpCircle className='text-primary h-5 w-5' />
                                    </div>
                                    <div>
                                        <h3 className='text-foreground text-lg font-semibold'>{faq.question}</h3>
                                        <p className='text-muted-foreground mt-3 leading-relaxed'>{faq.answer}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Glossary */}
            {sector.glossary && sector.glossary.length > 0 && (
                <section className='mt-20 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <Card className='border-border/50 rounded-3xl p-8'>
                            <div className='mb-6 flex items-center gap-3'>
                                <div className='bg-primary/15 inline-flex rounded-xl p-3'>
                                    <BookOpen className='text-primary h-6 w-6' />
                                </div>
                                <h2 className='text-foreground text-2xl font-semibold'>
                                    {sector.title.split(' ')[0]} Finance Glossary
                                </h2>
                            </div>
                            <div className='grid gap-4 md:grid-cols-2'>
                                {sector.glossary.map((item) => (
                                    <div key={item.term} className='bg-muted/30 rounded-xl p-4'>
                                        <dt className='text-foreground font-semibold'>{item.term}</dt>
                                        <dd className='text-muted-foreground mt-1 text-sm'>{item.definition}</dd>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Related Sectors */}
            {relatedSectorData.length > 0 && (
                <section className='mt-20 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <div className='mb-8'>
                            <h2 className='text-foreground text-2xl font-semibold'>Related Industries</h2>
                            <p className='text-muted-foreground mt-2'>Explore funding options for similar sectors</p>
                        </div>
                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            {relatedSectorData.map((related) => (
                                <Link key={related.slug} href={`/sectors/${related.slug}`} className='group'>
                                    <Card className='border-border/50 hover:border-primary/40 hover:shadow-card-hover h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1'>
                                        <h3 className='text-foreground group-hover:text-primary font-semibold transition-colors'>
                                            {related.title}
                                        </h3>
                                        <p className='text-muted-foreground mt-2 line-clamp-2 text-sm'>
                                            {related.hero}
                                        </p>
                                        <div className='text-primary mt-4 flex items-center gap-2 text-sm font-medium'>
                                            View {related.title.split(' ')[0].toLowerCase()} finance guide
                                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Trust Signals Bar */}
            {sector.trustSignals && (
                <section className='mt-20 px-4 lg:px-8'>
                    <div className='mx-auto max-w-6xl'>
                        <Card className='border-border/50 bg-muted/30 rounded-2xl p-6'>
                            <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-8 text-sm'>
                                <div className='flex items-center gap-2'>
                                    <Shield className='text-primary h-5 w-5' />
                                    <span>Not FCA Regulated</span>
                                </div>
                                {sector.trustSignals.accreditations?.map((acc) => (
                                    <div key={acc} className='flex items-center gap-2'>
                                        <BadgeCheck className='text-primary h-5 w-5' />
                                        <span>{acc}</span>
                                    </div>
                                ))}
                                <div className='flex items-center gap-2'>
                                    <Users className='text-primary h-5 w-5' />
                                    <span>120+ Lender Panel</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className='mt-20 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='border-primary/20 from-primary/10 via-primary/5 rounded-3xl bg-gradient-to-br to-transparent p-8 md:p-12'>
                        <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                            <div>
                                <h2 className='text-foreground text-3xl font-semibold'>
                                    Ready to explore {sector.title.toLowerCase().replace(' finance', '')} funding
                                    options?
                                </h2>
                                <p className='text-muted-foreground mt-4'>
                                    Capiflo connects {sector.title.toLowerCase().replace(' finance', '')} businesses
                                    with 120+ UK lenders. Get matched with the right funding for your needs.
                                </p>
                                <ul className='text-muted-foreground mt-6 space-y-2 text-sm'>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='text-primary h-4 w-4' />
                                        No obligation comparison
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='text-primary h-4 w-4' />
                                        Soft credit check only
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='text-primary h-4 w-4' />
                                        Decisions within 24-48 hours
                                    </li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-4 sm:flex-row lg:justify-end'>
                                <Button
                                    size='lg'
                                    className='shadow-primary/25 hover:shadow-primary/30 h-12 px-8 text-base shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl'
                                    asChild>
                                    <Link href='/contact'>
                                        Get {sector.title.split(' ')[0]} Funding
                                        <ArrowRight className='ml-2 h-5 w-5' />
                                    </Link>
                                </Button>
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <Link href='/calculators'>Try Calculators</Link>
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
