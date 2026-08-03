import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TownPage from '@/components/locations/town-page';
import { counties, countyMap } from '@/data/locations/counties';
import { towns, townMap, getTownsByCounty } from '@/data/locations/towns';
import { townVariants } from '@/lib/seo/entity-variants';

type Params = Promise<{ county: string; town: string }>;

export const dynamicParams = false;

// Fully static: content is deterministic (computed from slug hashes at build
// time), and the Cloudflare deployment has no ISR incremental cache. A
// `revalidate` export here makes OpenNext treat these as ISR pages and they
// 404 on Workers instead of serving from static assets.

export const generateStaticParams = () => {
    // In development, only generate a subset for faster iteration
    if (process.env.NODE_ENV === 'development') {
        const params: { county: string; town: string }[] = [];
        // Generate only first 10 town pages in development
        let count = 0;
        for (const county of counties) {
            const countyTowns = getTownsByCounty(county.slug);
            for (const town of countyTowns) {
                params.push({
                    county: county.slug,
                    town: town.slug
                });
                count++;
                if (count >= 10) break;
            }
            if (count >= 10) break;
        }
        return params;
    }

    // In production, generate all pages
    const params: { county: string; town: string }[] = [];
    counties.forEach((county) => {
        const countyTowns = getTownsByCounty(county.slug);
        countyTowns.forEach((town) => {
            params.push({
                county: county.slug,
                town: town.slug
            });
        });
    });

    return params;
};

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { county: countySlug, town: townSlug } = await params;
    const county = countyMap.get(countySlug);
    const town = townMap.get(townSlug);

    if (!county || !town || town.countySlug !== countySlug) {
        return {};
    }

    // Entity-variant title is deliberately distinct from the on-page H1
    // (Bradley-Benner: title ≠ H1). See seo/ENTITY-BRIEF.md §7.
    const v = townVariants(town, county);
    const t = town.name.toLowerCase();
    const description =
        town.seoDescription ||
        town.description ||
        `Compare business loans, asset finance and invoice finance for ${town.name} SMEs from 120+ UK lenders. Fast decisions with Capiflo.`;

    return {
        title: v.seoTitle,
        description,
        alternates: { canonical: v.url },
        openGraph: {
            title: v.seoTitle,
            description,
            url: v.url,
            type: 'website'
        },
        keywords: [
            `business loans ${t}`,
            `${t} business funding`,
            `sme loans ${t}`,
            `${t} commercial finance`,
            `${county.name.toLowerCase()} business loans`
        ]
    };
};

const TownPageRoute = async ({ params }: { params: Params }) => {
    const { county: countySlug, town: townSlug } = await params;
    const county = countyMap.get(countySlug);
    const town = townMap.get(townSlug);

    if (!county || !town || town.countySlug !== countySlug) {
        notFound();
    }

    // Get nearby towns
    const nearbyTowns = (town.nearbyTowns || [])
        .map((slug) => townMap.get(slug))
        .filter((t): t is NonNullable<typeof t> => t !== undefined)
        .slice(0, 4);

    return <TownPage town={town} county={county} nearbyTowns={nearbyTowns} />;
};

export default TownPageRoute;
