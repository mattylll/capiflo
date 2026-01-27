import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight, MapPin } from 'lucide-react';

import { counties, getCountiesByRegion } from '@/data/locations/counties';
import { regionNames } from '@/data/locations';
import { getTownCountByCounty } from '@/data/locations/towns';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Business Loans by Location | UK Counties & Towns | Capiflo',
    description:
        'Find business loans in your local area. Capiflo connects UK SMEs across every county and town with 120+ lenders. Get funding tailored to your location.',
    keywords: [
        'uk business loans by location',
        'local business funding',
        'business loans near me',
        'county business loans',
        'town business funding uk'
    ]
};

const regions = [
    'north-west',
    'north-east',
    'yorkshire-humber',
    'east-midlands',
    'west-midlands',
    'east-of-england',
    'london',
    'south-east',
    'south-west',
    'wales',
    'scotland',
    'northern-ireland'
] as const;

const LocationsPage = () => {
    const totalTowns = counties.reduce((acc, county) => acc + getTownCountByCounty(county.slug), 0);

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
                                UK Locations
                            </p>
                            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                                Business loans across the UK.
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                Find funding solutions for your business, wherever you&apos;re located.
                                We connect SMEs in every UK county and town with the right lenders
                                who understand local markets.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                                    asChild>
                                    <Link href="/contact">Get Funding Options</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                    <a href="#all-locations">Browse All Locations</a>
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700">
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">{counties.length}</p>
                                <p className="mt-1 text-sm text-muted-foreground">UK counties covered</p>
                            </Card>
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">{totalTowns}+</p>
                                <p className="mt-1 text-sm text-muted-foreground">Towns and cities</p>
                            </Card>
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">120+</p>
                                <p className="mt-1 text-sm text-muted-foreground">UK lenders in network</p>
                            </Card>
                            <Card className="rounded-2xl border-border/50 p-5">
                                <p className="text-3xl font-semibold text-foreground">24-48h</p>
                                <p className="mt-1 text-sm text-muted-foreground">Typical decision time</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Regions */}
            <section id="all-locations" className="scroll-mt-24 px-4 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-16">
                    {regions.map((region) => {
                        const regionCounties = getCountiesByRegion(region);
                        if (regionCounties.length === 0) return null;

                        return (
                            <div key={region} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="mb-6">
                                    <Badge variant="outline" className="text-xs uppercase tracking-widest">
                                        <MapPin className="mr-1 h-3 w-3" />
                                        {regionNames[region] || region}
                                    </Badge>
                                    <h2 className="mt-3 text-2xl font-semibold text-foreground">
                                        Business Loans in {regionNames[region] || region}
                                    </h2>
                                    <p className="mt-1 text-muted-foreground">
                                        {regionCounties.length} counties · Find funding near you
                                    </p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {regionCounties.map((county, index) => {
                                        const townCount = getTownCountByCounty(county.slug);
                                        return (
                                            <Link
                                                key={county.slug}
                                                href={`/locations/${county.slug}`}
                                                className="group">
                                                <Card
                                                    className="h-full rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500"
                                                    style={{ animationDelay: `${index * 50}ms` }}>
                                                    <div className="mb-2 inline-flex rounded-xl bg-primary/15 p-2.5">
                                                        <MapPin className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {county.name}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {townCount} towns · {county.businessCount || 'Multiple'} businesses
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-1">
                                                        {county.keyIndustries.slice(0, 2).map((industry) => (
                                                            <span
                                                                key={industry}
                                                                className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                                                {industry}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-3 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                                        View county
                                                        <ArrowRight className="h-3 w-3" />
                                                    </div>
                                                </Card>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <Card className="rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <h2 className="text-3xl font-semibold text-foreground">
                            Ready to find funding in your area?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            Capiflo connects local businesses with 120+ UK lenders who understand
                            regional markets. Get matched with the right funding for your needs.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                                <Link href="/sectors">Browse Industry Sectors</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default LocationsPage;
