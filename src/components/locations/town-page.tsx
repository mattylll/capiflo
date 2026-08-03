import Link from 'next/link';
import Script from 'next/script';

import {
    ArrowRight,
    Award,
    Briefcase,
    Building2,
    CheckCircle2,
    ChevronRight,
    Clock,
    FileText,
    HelpCircle,
    Lightbulb,
    MapPin,
    PoundSterling,
    Quote,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';

import type { County } from '@/data/locations';
import type { Town } from '@/data/locations';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';
import {
    generateFAQSchema,
    generateLocalBusinessSchema,
    generateServiceSchema,
    generateBreadcrumbSchema
} from '@/lib/schema-generators';
import { townVariants } from '@/lib/seo/entity-variants';
import { generateExtendedOverview } from '@/lib/content-generation/generators/extended-overview';

type Props = {
    town: Town;
    county: County;
    nearbyTowns: Town[];
};

// Schema generation functions are now imported from @/lib/schema-generators

const TownPage = ({ town, county, nearbyTowns }: Props) => {
    const defaultFaqs = [
        {
            question: `What business loans are available in ${town.name}?`,
            answer: `${town.name} businesses can access unsecured business loans from £5,000 to £500,000, merchant cash advances based on card turnover, asset finance for equipment and vehicles, and invoice finance to release cash from unpaid invoices. We compare options from 120+ UK lenders to find the best rates for your specific situation.`
        },
        {
            question: `How quickly can ${town.name} businesses get funding?`,
            answer: `Many funding solutions can be approved within 24-48 hours, with funds available within 3-5 working days for ${town.name} businesses. Some products like merchant cash advances can fund even faster. We work with lenders who understand the local market and can move quickly when time is critical.`
        },
        {
            question: `What are the eligibility requirements for business finance in ${town.name}?`,
            answer: `Most ${town.name} businesses need at least 6 months trading history, a UK business bank account, and minimum monthly revenue of £5,000+. Requirements vary by lender and product - some lenders work with newer businesses or those with less-than-perfect credit. We'll help find the right match for your circumstances.`
        },
        {
            question: `Do I need security or a personal guarantee for a business loan in ${town.name}?`,
            answer: `Not always. Unsecured business loans up to £500,000 are available without property security. Most lenders require a personal guarantee from directors, but the level of guarantee varies. We can explain the options and find lenders with terms that suit your risk appetite.`
        },
        {
            question: `Can startups in ${town.name} get business funding?`,
            answer: `Yes, though options are more limited for very new businesses. Start Up Loans (government-backed) are available for businesses under 2 years old. Some lenders will consider businesses with just 3-6 months trading history if card sales or revenue is strong. We specialise in finding solutions for newer ${town.name} businesses.`
        },
        {
            question: `What documents do ${town.name} businesses need for a loan application?`,
            answer: `Typically you'll need: 3-6 months of business bank statements, recent accounts or management information, proof of identity for directors, and details of what the funding is for. For faster products like merchant cash advances, you may only need bank statements and card processing history.`
        },
        {
            question: `How do business loan rates compare for ${town.name} companies?`,
            answer: `Rates vary significantly based on your business profile, loan amount, and term. Typical APRs range from 7% for strong applicants to 30%+ for higher-risk profiles. We compare rates across 120+ lenders to ensure you get competitive terms. There's no cost to compare - we're paid by lenders, not you.`
        },
        {
            question: `Is there a cost to use Capiflo's business finance service in ${town.name}?`,
            answer: `No, our service is completely free for ${town.name} businesses. We're paid a commission by lenders when we successfully arrange funding. This means we're incentivised to find you the best deal - the better the terms, the more likely you are to proceed, and the more likely we are to be paid.`
        }
    ];

    const faqs = town.faqs && town.faqs.length >= 8 ? town.faqs : defaultFaqs;

    // Entity-variant slots (Bradley-Benner: URL ≠ title ≠ H1 ≠ each H2) and a
    // deterministic, entity-engineered overview so every town has rich, varied
    // prose with semantic triples even without hand-written content.
    const v = townVariants(town, county);
    const overview = town.extendedOverview || generateExtendedOverview(town, county);

    // Schema markup - using centralized schema generators
    const faqSchema = generateFAQSchema(faqs);
    const localBusinessSchema = generateLocalBusinessSchema(town, county);
    const serviceSchema = generateServiceSchema(town, county);
    const breadcrumbSchema = generateBreadcrumbSchema(county, town);

    return (
        <>
            {/* Structured Data - JSON-LD Schema Markup */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <div className="space-y-20 md:space-y-24 pb-24">
                {/* Breadcrumbs */}
                <div className="px-4 pt-8 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                            <Link href="/" className="hover:text-foreground transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link href="/locations" className="hover:text-foreground transition-colors">
                                Locations
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link href={`/locations/${county.slug}`} className="hover:text-foreground transition-colors">
                                {county.name}
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-foreground">{town.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative px-4 lg:px-8">
                    <div className="absolute inset-0 -z-10 opacity-60 blur-3xl">
                        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />
                    </div>

                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                            <div className="flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge variant="outline" className="text-xs uppercase tracking-widest">
                                        <MapPin className="mr-1 h-3 w-3" />
                                        {county.name}
                                    </Badge>
                                    {town.postcode && (
                                        <span className="text-sm text-muted-foreground">
                                            Postcode area: {town.postcode}
                                        </span>
                                    )}
                                </div>
                                <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                                    {v.h1}
                                </h1>
                                <p className="mt-4 text-xl text-muted-foreground">{town.description}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {town.businessTypes.slice(0, 4).map((type) => (
                                        <span
                                            key={type}
                                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                    <Button
                                        size="lg"
                                        className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                                        asChild>
                                        <Link href="/contact">Get Funding Options</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                        <a href="#funding-solutions">View Funding Solutions</a>
                                    </Button>
                                </div>
                            </div>

                            {/* Stats Card - Enhanced with custom stats */}
                            <Card className="rounded-3xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                                    {town.name} at a Glance
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {town.stats && town.stats.length > 0 ? (
                                        town.stats.slice(0, 4).map((stat) => (
                                            <div key={stat.label} className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                    {stat.label}
                                                </p>
                                                <p className="mt-1 text-2xl font-semibold text-foreground">
                                                    {stat.value}
                                                </p>
                                                {stat.description && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {stat.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            {town.population && (
                                                <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-primary" />
                                                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                            Population
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-semibold text-foreground">
                                                        {town.population}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 text-primary" />
                                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                        County
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/locations/${county.slug}`}
                                                    className="mt-1 text-xl font-semibold text-foreground hover:text-primary transition-colors">
                                                    {county.name}
                                                </Link>
                                            </div>
                                            <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4 text-primary" />
                                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                        Key Sectors
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xl font-semibold text-foreground">
                                                    {town.businessTypes.length}+ industries
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Extended Overview Section - entity-engineered local content */}
                <section className="px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <Card className="rounded-3xl border-border/50 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
                            <div className="max-w-4xl">
                                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                    Local Business Finance Guide
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                    {v.h2Funding}
                                </h2>
                                <div className="mt-6 prose prose-gray dark:prose-invert max-w-none">
                                    <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                                        {overview}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Business Demographics Section */}
                {town.businessDemographics && (
                    <section className="px-4 lg:px-8">
                        <div className="mx-auto max-w-6xl">
                            <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="inline-flex rounded-xl bg-primary/15 p-3">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-foreground">
                                        {town.name} Business Demographics
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {town.businessDemographics}
                                </p>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Economic Context Section */}
                {town.economicContext && (
                    <section className="px-4 lg:px-8">
                        <div className="mx-auto max-w-6xl">
                            <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="inline-flex rounded-xl bg-primary/15 p-3">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-foreground">
                                        Economic Context & Funding Opportunities
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {town.economicContext}
                                </p>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Local Economy & Business Types */}
                <section className="px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Local Economy */}
                            <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex rounded-xl bg-primary/15 p-3">
                                        <TrendingUp className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-foreground">
                                        {v.h2Economy}
                                    </h2>
                                </div>
                                <p className="mt-6 text-muted-foreground leading-relaxed">
                                    {town.localEconomy}
                                </p>
                                {town.fundingHighlights && town.fundingHighlights.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-sm font-medium text-primary mb-3">Funding Highlights</p>
                                        <ul className="space-y-2">
                                            {town.fundingHighlights.map((highlight) => (
                                                <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Card>

                            {/* Business Types */}
                            <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 delay-100 duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex rounded-xl bg-primary/15 p-3">
                                        <Briefcase className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-foreground">
                                        {v.h2Sectors}
                                    </h2>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    We help businesses across these sectors in {town.name}:
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {town.businessTypes.map((type, index) => (
                                        <li
                                            key={type}
                                            className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
                                            style={{ animationDelay: `${index * 50}ms` }}>
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                            <span className="text-muted-foreground">{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Funding Scenarios Section */}
                {town.fundingScenarios && town.fundingScenarios.length > 0 && (
                    <section className="px-4 lg:px-8">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                    Common Scenarios
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                    How {town.name} Businesses Use Funding
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    Real funding scenarios we see from {town.name} businesses
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {town.fundingScenarios.map((scenario, index) => (
                                    <Card
                                        key={scenario.title}
                                        className="rounded-2xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-6 duration-500"
                                        style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="inline-flex rounded-xl bg-primary/15 p-2">
                                                <Lightbulb className="h-5 w-5 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                                        <div className="flex items-center gap-2 text-sm mb-3">
                                            <PoundSterling className="h-4 w-4 text-primary" />
                                            <span className="font-medium text-foreground">Typical amount: {scenario.typicalAmount}</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {scenario.commonUses.map((use) => (
                                                <li key={use} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                    <CheckCircle2 className="h-3 w-3 shrink-0 text-primary mt-0.5" />
                                                    {use}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Case Study Section */}
                {town.caseStudy && (
                    <section className="px-4 lg:px-8">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                    Success Story
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                    {town.name} Business Case Study
                                </h2>
                            </div>
                            <Card className="rounded-3xl border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
                                <div className="grid gap-8 lg:grid-cols-[1fr_0.4fr]">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Quote className="h-8 w-8 text-primary opacity-50" />
                                            <div>
                                                <h3 className="text-xl font-semibold text-foreground">
                                                    {town.caseStudy.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {town.caseStudy.businessType} • {town.caseStudy.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mt-6">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-widest text-primary mb-2">
                                                    The Challenge
                                                </p>
                                                <p className="text-muted-foreground">{town.caseStudy.challenge}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-widest text-primary mb-2">
                                                    Our Solution
                                                </p>
                                                <p className="text-muted-foreground">{town.caseStudy.solution}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-widest text-primary mb-2">
                                                    The Result
                                                </p>
                                                <p className="text-muted-foreground">{town.caseStudy.result}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-2xl border border-primary/20 bg-background/50 p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <PoundSterling className="h-4 w-4 text-primary" />
                                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                    Funding Amount
                                                </p>
                                            </div>
                                            <p className="text-2xl font-semibold text-foreground">
                                                {town.caseStudy.amount}
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-primary/20 bg-background/50 p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="h-4 w-4 text-primary" />
                                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                    Product
                                                </p>
                                            </div>
                                            <p className="text-lg font-semibold text-foreground">
                                                {town.caseStudy.fundingType}
                                            </p>
                                        </div>
                                        {town.caseStudy.timeframe && (
                                            <div className="rounded-2xl border border-primary/20 bg-background/50 p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                        Timeframe
                                                    </p>
                                                </div>
                                                <p className="text-lg font-semibold text-foreground">
                                                    {town.caseStudy.timeframe}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="mt-6 text-xs text-muted-foreground italic">
                                    * Case study anonymised to protect client confidentiality. Details representative of actual funding arranged.
                                </p>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Funding Solutions */}
                <section id="funding-solutions" className="scroll-mt-24 px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                Solutions
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                Funding Options for {town.name} Businesses
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Compare business finance products available to {town.name} companies
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { name: 'Business Loans', slug: 'business-loans', desc: 'Unsecured funding from £5k-£500k for any business purpose. Fixed monthly repayments over 1-5 years.' },
                                { name: 'Merchant Cash Advance', slug: 'merchant-cash-advance', desc: 'Advance on future card sales. Repay as a percentage of daily takings - ideal for retail and hospitality.' },
                                { name: 'Asset Finance', slug: 'asset-finance', desc: 'Spread the cost of equipment, vehicles, and machinery. Preserve working capital while acquiring assets.' },
                                { name: 'Invoice Finance', slug: 'invoice-finance', desc: 'Release up to 90% of invoice values within 24 hours. Improve cash flow without waiting for customers to pay.' }
                            ].map((fundingType, index) => (
                                <Link
                                    key={fundingType.slug}
                                    href={`/funding/${fundingType.slug}`}
                                    className="group">
                                    <Card
                                        className="h-full rounded-2xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                        style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className="mb-3 inline-flex rounded-xl bg-primary/15 p-2.5">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {fundingType.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {fundingType.desc}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                                            Learn more
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                Questions
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                Frequently Asked Questions About Business Loans in {town.name}
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Common questions from {town.name} business owners about funding
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <Card
                                    key={faq.question}
                                    className="rounded-3xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-6 duration-500"
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="flex items-start gap-3">
                                        <div className="inline-flex shrink-0 rounded-xl bg-primary/15 p-2">
                                            <HelpCircle className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {faq.question}
                                            </h3>
                                            <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trust Signals */}
                <section className="px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { icon: Building2, label: '120+ UK Lenders', desc: 'Access to the whole market' },
                                { icon: Clock, label: '24-48hr Decisions', desc: 'Fast turnaround times' },
                                { icon: Award, label: 'Broker, Not a Lender', desc: 'We arrange, lenders lend' },
                                { icon: Users, label: 'Free Service', desc: 'No cost to compare' }
                            ].map((item, index) => (
                                <Card
                                    key={item.label}
                                    className="rounded-2xl border-border/50 p-5 text-center animate-in fade-in slide-in-from-bottom-6 duration-500"
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="mx-auto inline-flex rounded-xl bg-primary/15 p-3">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="mt-3 font-semibold text-foreground">{item.label}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Nearby Towns */}
                {nearbyTowns.length > 0 && (
                    <section className="px-4 lg:px-8">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                    Nearby
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                    Business Finance in Areas Near {town.name}
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {nearbyTowns.map((nearbyTown, index) => (
                                    <Link
                                        key={nearbyTown.slug}
                                        href={`/locations/${nearbyTown.countySlug}/${nearbyTown.slug}`}
                                        className="group">
                                        <Card
                                            className="h-full rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                            style={{ animationDelay: `${index * 100}ms` }}>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {nearbyTown.name}
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Business loans in {nearbyTown.name}
                                            </p>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Sectors */}
                <section className="px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                Industries
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                Industry-Specific Funding
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Explore funding tailored to your sector
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { name: 'Construction Finance', slug: 'construction' },
                                { name: 'Retail Finance', slug: 'retail' },
                                { name: 'Hospitality Finance', slug: 'hospitality' },
                                { name: 'Professional Services', slug: 'professional-services' },
                                { name: 'Manufacturing Finance', slug: 'manufacturing' },
                                { name: 'Healthcare Finance', slug: 'healthcare' }
                            ].map((sector, index) => (
                                <Link
                                    key={sector.slug}
                                    href={`/sectors/${sector.slug}`}
                                    className="group">
                                    <Card
                                        className="rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {sector.name}
                                            </h3>
                                            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-4 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <Card className="rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                                <div>
                                    <h2 className="text-3xl font-semibold text-foreground">
                                        Ready to explore funding for your {town.name} business?
                                    </h2>
                                    <p className="mt-4 text-muted-foreground">
                                        Capiflo connects {town.name} businesses with 120+ UK lenders.
                                        Get matched with the right funding for your needs - completely free.
                                    </p>
                                    <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            No obligation, free comparison
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            Soft credit check only - no impact on credit score
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            Decisions typically within 24-48 hours
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            Dedicated support throughout the process
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                                    <Button
                                        size="lg"
                                        className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                                        asChild>
                                        <Link href="/contact">
                                            Get Started
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                        <Link href="/calculators">Try Calculators</Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TownPage;
