import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
    ArrowRight,
    Building2,
    Factory,
    Hammer,
    Heart,
    Laptop,
    Palette,
    Scissors,
    ShoppingBag,
    Store,
    Tractor,
    Truck,
    Warehouse,
    Car,
    GraduationCap,
    Briefcase,
    UtensilsCrossed
} from 'lucide-react';

import { sectors, tierOneSectors, tierTwoSectors, tierThreeSectors } from '@/data/sectors';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Business Sectors | UK SME Funding by Industry | Capiflo',
    description:
        'Find business funding tailored to your industry. Capiflo helps UK SMEs in construction, retail, hospitality, manufacturing, healthcare and more access the right finance.',
    keywords: [
        'uk business sectors',
        'sme funding by industry',
        'construction business loans',
        'retail finance uk',
        'hospitality funding',
        'manufacturing business loans',
        'healthcare finance uk'
    ]
};

const SECTOR_ICONS: Record<string, typeof Building2> = {
    construction: Hammer,
    retail: ShoppingBag,
    'professional-services': Briefcase,
    hospitality: UtensilsCrossed,
    manufacturing: Factory,
    healthcare: Heart,
    transport: Truck,
    technology: Laptop,
    wholesale: Warehouse,
    agriculture: Tractor,
    'beauty-wellness': Scissors,
    automotive: Car,
    education: GraduationCap,
    'real-estate': Building2,
    creative: Palette
};

const SectorsPage = () => {
    return (
        <div className="space-y-20 md:space-y-24 lg:space-y-32 pb-24">
            {/* Hero Section */}
            <section className="relative px-4 pt-20 lg:px-8 lg:pt-24">
                <div className="absolute inset-0 -z-10 opacity-60 blur-3xl">
                    <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <p className="text-sm font-medium uppercase tracking-widest text-primary">
                                Industry Sectors
                            </p>
                            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                                Funding tailored to your industry.
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                Every sector has unique challenges and opportunities. Explore our
                                industry-specific guides to understand which funding options work best
                                for businesses like yours.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                                    asChild>
                                    <Link href="/contact">Get Funding Advice</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                    <a href="#all-sectors">View All Sectors</a>
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700">
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">15</p>
                                <p className="mt-1 text-sm text-muted-foreground">Industry sectors covered</p>
                            </Card>
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">120+</p>
                                <p className="mt-1 text-sm text-muted-foreground">UK lenders in network</p>
                            </Card>
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">85%</p>
                                <p className="mt-1 text-sm text-muted-foreground">Average approval rate</p>
                            </Card>
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">24-48h</p>
                                <p className="mt-1 text-sm text-muted-foreground">Typical decision time</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Sectors (Tier 1) */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <Badge variant="outline" className="text-xs uppercase tracking-widest">
                            Popular
                        </Badge>
                        <h2 className="mt-4 text-2xl font-semibold text-foreground">
                            Most Common Sectors
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            High-demand industries where UK SMEs frequently seek funding
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tierOneSectors.map((sector, index) => {
                            const Icon = SECTOR_ICONS[sector.slug] || Building2;
                            return (
                                <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="group">
                                    <Card
                                        className="h-full overflow-hidden rounded-3xl border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                        style={{ animationDelay: `${index * 100}ms` }}>
                                        {sector.image && (
                                            <div className="relative h-40 w-full">
                                                <Image
                                                    src={sector.image}
                                                    alt={sector.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="inline-flex rounded-xl bg-primary/15 p-2.5">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {sector.title}
                                                </h3>
                                            </div>
                                            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                                                {sector.hero}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {sector.fundingTypes.slice(0, 2).map((type) => (
                                                    <span
                                                        key={type.slug}
                                                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                                                        {type.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                                                Learn more
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Specialist Sectors (Tier 2) */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <Badge variant="outline" className="text-xs uppercase tracking-widest">
                            Specialist
                        </Badge>
                        <h2 className="mt-4 text-2xl font-semibold text-foreground">
                            Growing Sectors
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Specialist industries with tailored funding solutions
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {tierTwoSectors.map((sector, index) => {
                            const Icon = SECTOR_ICONS[sector.slug] || Building2;
                            return (
                                <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="group">
                                    <Card
                                        className="h-full rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className="mb-3 inline-flex rounded-xl bg-primary/15 p-2.5">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {sector.title.replace(' Finance', '').replace(' Business', '')}
                                        </h3>
                                        <div className="mt-3 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                            View guide
                                            <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Niche Sectors (Tier 3) */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <Badge variant="outline" className="text-xs uppercase tracking-widest">
                            Niche
                        </Badge>
                        <h2 className="mt-4 text-2xl font-semibold text-foreground">
                            Specialist Industries
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Niche sectors with specific funding requirements
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {tierThreeSectors.map((sector, index) => {
                            const Icon = SECTOR_ICONS[sector.slug] || Building2;
                            return (
                                <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="group">
                                    <Card
                                        className="h-full rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className="mb-3 inline-flex rounded-xl bg-primary/15 p-2.5">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {sector.title.replace(' Finance', '').replace(' Business', '')}
                                        </h3>
                                        <div className="mt-3 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                            View guide
                                            <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* All Sectors Directory */}
            <section id="all-sectors" className="scroll-mt-24 px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <p className="text-sm font-medium uppercase tracking-widest text-primary">
                            Complete Directory
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-foreground">
                            All Business Sectors
                        </h2>
                    </div>
                    <Card className="rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sectors.map((sector, index) => {
                                const Icon = SECTOR_ICONS[sector.slug] || Building2;
                                return (
                                    <Link
                                        key={sector.slug}
                                        href={`/sectors/${sector.slug}`}
                                        className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50"
                                        style={{ animationDelay: `${index * 30}ms` }}>
                                        <div className="inline-flex shrink-0 rounded-lg bg-primary/15 p-2">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                {sector.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {sector.stats[0]?.value} businesses
                                            </p>
                                        </div>
                                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                    </Link>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <Card className="rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <h2 className="text-3xl font-semibold text-foreground">
                            Not sure which funding suits your sector?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            Our team understands the unique challenges of different industries. Share
                            your details and get matched with funding options that work for your
                            business.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                                asChild>
                                <Link href="/contact">
                                    Get Matched
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                <Link href="/funding">Browse Funding Types</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default SectorsPage;
