import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CountyPage from '@/components/locations/county-page';
import { counties, countyMap } from '@/data/locations/counties';
import { getTownsByCounty } from '@/data/locations/towns';
import { countyVariants } from '@/lib/seo/entity-variants';

type Params = Promise<{ county: string }>;

export const dynamicParams = false;

// Fully static: content is deterministic (computed from slug hashes at build
// time), and the Cloudflare deployment has no ISR incremental cache. A
// `revalidate` export here makes OpenNext treat these as ISR pages and they
// 404 on Workers instead of serving from static assets.

export const generateStaticParams = () => counties.map((county) => ({ county: county.slug }));

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { county: countySlug } = await params;
    const county = countyMap.get(countySlug);
    if (!county) {
        return {};
    }
    // Entity-variant title distinct from the on-page H1 (Benner).
    const v = countyVariants(county);
    return {
        title: v.seoTitle,
        description: county.description,
        alternates: { canonical: v.url },
        openGraph: {
            title: v.seoTitle,
            description: county.description,
            url: v.url,
            type: 'website'
        },
        keywords: [
            `business loans ${county.name.toLowerCase()}`,
            `${county.name.toLowerCase()} business funding`,
            `sme loans ${county.name.toLowerCase()}`,
            `${county.name.toLowerCase()} commercial finance`,
            ...county.keyIndustries.map(i => `${i.toLowerCase()} finance ${county.name.toLowerCase()}`)
        ]
    };
};

const CountyPageRoute = async ({ params }: { params: Params }) => {
    const { county: countySlug } = await params;
    const county = countyMap.get(countySlug);
    if (!county) {
        notFound();
    }

    const towns = getTownsByCounty(countySlug);

    return <CountyPage county={county} towns={towns} />;
};

export default CountyPageRoute;
