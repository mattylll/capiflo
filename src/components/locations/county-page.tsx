import Link from 'next/link';
import Script from 'next/script';

import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle2,
    ChevronRight,
    HelpCircle,
    MapPin,
    TrendingUp,
    Users
} from 'lucide-react';

import type { County } from '@/data/locations';
import type { Town } from '@/data/locations';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';
import {
    generateBreadcrumbSchema,
    generateFAQSchema
} from '@/lib/schema-generators';

type Props = {
    county: County;
    towns: Town[];
};

const CountyPage = ({ county, towns }: Props) => {
    const faqs = [
        {
            question: `What business loans are available in ${county.name}?`,
            answer: `${county.name} businesses can access unsecured business loans, merchant cash advances, asset finance, invoice finance, and more. Loan amounts typically range from £5,000 to £500,000 depending on your business requirements and trading history.`
        },
        {
            question: `How quickly can ${county.name} businesses get funding?`,
            answer: `Many funding solutions can be approved within 24-48 hours, with funds available within 3-5 working days. For more complex funding requirements, the process may take slightly longer to ensure the best match.`
        },
        {
            question: `What documentation do I need to apply?`,
            answer: `Typically you'll need 3-6 months of business bank statements, proof of trading, and details of business directors. Requirements vary by lender and loan amount, but we'll guide you through what's needed.`
        },
        {
            question: `Can startups in ${county.name} get business loans?`,
            answer: `Yes, startups with a trading history of 6 months or more can typically access funding. Newer businesses may qualify for startup loans or alternative finance options like merchant cash advances if you have card payment turnover.`
        }
    ];

    // Schema markup
    const breadcrumbSchema = generateBreadcrumbSchema(county);
    const faqSchema = generateFAQSchema(faqs);

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

            <div className="space-y-20 md:space-y-24 pb-24">
            {/* Breadcrumbs */}
            <div className="px-4 pt-8 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/locations" className="hover:text-foreground transition-colors">
                            Locations
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">{county.name}</span>
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
                                    {county.region.replace('-', ' ')}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    Updated for 2025 · UK SMEs
                                </span>
                            </div>
                            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                                Business Loans in {county.name}
                            </h1>
                            <p className="mt-4 text-xl text-muted-foreground">{county.description}</p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {county.keyIndustries.slice(0, 4).map((industry) => (
                                    <span
                                        key={industry}
                                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                                        {industry}
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
                                    <a href="#towns">View Towns in {county.name}</a>
                                </Button>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <Card className="rounded-3xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                                {county.name} at a Glance
                            </h3>
                            <div className="mt-6 space-y-4">
                                {county.population && (
                                    <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-primary" />
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                Population
                                            </p>
                                        </div>
                                        <p className="mt-1 text-2xl font-semibold text-foreground">
                                            {county.population}
                                        </p>
                                    </div>
                                )}
                                {county.businessCount && (
                                    <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-primary" />
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                Businesses
                                            </p>
                                        </div>
                                        <p className="mt-1 text-2xl font-semibold text-foreground">
                                            {county.businessCount}
                                        </p>
                                    </div>
                                )}
                                <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                            Towns Covered
                                        </p>
                                    </div>
                                    <p className="mt-1 text-2xl font-semibold text-foreground">
                                        {towns.length}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                    Overview
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                    About {county.name}
                                </h2>
                            </div>
                            <div>
                                <p className="text-lg leading-relaxed text-muted-foreground">
                                    {county.overview}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Key Industries & Economic Highlights */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Key Industries */}
                        <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                            <div className="flex items-center gap-3">
                                <div className="inline-flex rounded-xl bg-primary/15 p-3">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground">
                                    Key Industries
                                </h2>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {county.keyIndustries.map((industry, index) => (
                                    <li
                                        key={industry}
                                        className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                        <span className="text-muted-foreground">{industry}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Economic Highlights */}
                        <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 delay-100 duration-500">
                            <div className="flex items-center gap-3">
                                <div className="inline-flex rounded-xl bg-primary/15 p-3">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground">
                                    Economic Highlights
                                </h2>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {county.economicHighlights.map((highlight, index) => (
                                    <li
                                        key={highlight}
                                        className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                        <span className="text-muted-foreground">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Towns Directory */}
            <section id="towns" className="scroll-mt-24 px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <p className="text-sm font-medium uppercase tracking-widest text-primary">
                            Locations
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-foreground">
                            Towns in {county.name}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Find business funding solutions for your specific location
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {towns.map((town, index) => (
                            <Link
                                key={town.slug}
                                href={`/locations/${county.slug}/${town.slug}`}
                                className="group">
                                <Card
                                    className="h-full rounded-2xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="mb-3 inline-flex rounded-xl bg-primary/15 p-2.5">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {town.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                        {town.description}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                                        View funding options
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Funding Types */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <p className="text-sm font-medium uppercase tracking-widest text-primary">
                            Solutions
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-foreground">
                            Funding Types Available in {county.name}
                        </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: 'Business Loans', slug: 'business-loans', desc: 'Unsecured funding from £5k-£500k' },
                            { name: 'Merchant Cash Advance', slug: 'merchant-cash-advance', desc: 'Flexible repayment based on sales' },
                            { name: 'Asset Finance', slug: 'asset-finance', desc: 'Fund equipment and vehicles' },
                            { name: 'Invoice Finance', slug: 'invoice-finance', desc: 'Release cash from unpaid invoices' }
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
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card
                                key={faq.question}
                                className="rounded-3xl border-border/50 p-6 animate-in fade-in slide-in-from-bottom-6 duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}>
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

            {/* CTA */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <Card className="rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                            <div>
                                <h2 className="text-3xl font-semibold text-foreground">
                                    Ready to explore funding options in {county.name}?
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    Capiflo connects {county.name} businesses with 120+ UK lenders.
                                    Get matched with the right funding for your needs.
                                </p>
                                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        No obligation comparison
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        Soft credit check only
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        Decisions within 24-48 hours
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

export default CountyPage;
