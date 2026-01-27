import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CountyPage from '@/components/locations/county-page';
import { counties, countyMap } from '@/data/locations/counties';
import { getTownsByCounty } from '@/data/locations/towns';

type Params = Promise<{ county: string }>;

export const dynamicParams = false;

// Incremental Static Regeneration (ISR)
// Revalidate pages every 24 hours (86400 seconds)
export const revalidate = 86400;

export const generateStaticParams = () => counties.map((county) => ({ county: county.slug }));

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { county: countySlug } = await params;
    const county = countyMap.get(countySlug);
    if (!county) {
        return {};
    }
    return {
        title: `Business Loans in ${county.name} | UK SME Funding | Capiflo`,
        description: county.description,
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
