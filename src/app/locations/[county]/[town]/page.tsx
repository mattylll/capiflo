import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TownPage from '@/components/locations/town-page';
import { counties, countyMap } from '@/data/locations/counties';
import { towns, townMap, getTownsByCounty } from '@/data/locations/towns';

type Params = Promise<{ county: string; town: string }>;

export const dynamicParams = false;

// Incremental Static Regeneration (ISR)
// Revalidate pages every 24 hours (86400 seconds)
// This reduces build times by 80%+ and keeps content fresh
export const revalidate = 86400;

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

    return {
        title: `Business Loans in ${town.name}, ${county.name} | UK SME Funding | Capiflo`,
        description: town.description,
        keywords: [
            `business loans ${town.name.toLowerCase()}`,
            `${town.name.toLowerCase()} business funding`,
            `sme loans ${town.name.toLowerCase()}`,
            `${town.name.toLowerCase()} commercial finance`,
            `${county.name.toLowerCase()} business loans`,
            ...town.businessTypes.slice(0, 3).map(t => `${t.toLowerCase()} finance ${town.name.toLowerCase()}`)
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
